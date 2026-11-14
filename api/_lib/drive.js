/**
 * Google Drive folder -> photo list. Server-side only: the API key never
 * reaches the browser. (Files under api/_lib are not exposed as endpoints.)
 *
 * Folder layout:
 *   <shared folder>/            photos here show under "All"
 *   <shared folder>/Haldi/      each direct subfolder becomes a filter tab
 *   <shared folder>/Wedding/
 *
 * Images are served by Google's image CDN (lh3.googleusercontent.com), which
 * resizes on the fly (`=w800`), so the grid never loads full-resolution files.
 */

const API = 'https://www.googleapis.com/drive/v3/files'
const FOLDER_MIME = 'application/vnd.google-apps.folder'
const MAX_FILES = 5000 // safety cap for one listing

// Google's thumbnailer converts all of these to web-friendly JPEG/WebP.
const IMAGE_MIMES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif',
  'image/heic', 'image/heif', 'image/bmp', 'image/tiff',
]

/** Accepts a share link (any of Drive's URL shapes) or a bare folder ID. */
export function parseFolderId(input) {
  const s = String(input || '').trim()
  if (!s) return null
  const m =
    s.match(/\/folders\/([A-Za-z0-9_-]+)/) ||
    s.match(/[?&]id=([A-Za-z0-9_-]+)/) ||
    s.match(/^([A-Za-z0-9_-]+)$/)
  const id = m?.[1]
  return id && id.length >= 10 ? id : null
}

export class DriveError extends Error {
  constructor(code, status, detail) {
    super(detail || code)
    this.code = code
    this.status = status
  }
}

/** Map Google's error payload onto a small set of codes the UI understands. */
function toDriveError(status, body) {
  const reason = body?.error?.errors?.[0]?.reason || body?.error?.status || ''
  const msg = body?.error?.message || ''
  if (/keyInvalid|API_KEY_INVALID/i.test(reason) || /API key not valid/i.test(msg))
    return new DriveError('invalid_key', 500, msg)
  if (/accessNotConfigured|SERVICE_DISABLED/i.test(reason) || /has not been used|is disabled/i.test(msg))
    return new DriveError('api_disabled', 500, msg)
  if (status === 429 || /rateLimitExceeded|userRateLimitExceeded|dailyLimitExceeded|quotaExceeded|RESOURCE_EXHAUSTED/i.test(reason))
    return new DriveError('quota', 503, msg)
  if (status === 404 || status === 403)
    return new DriveError('folder_private', 404, msg)
  return new DriveError('drive_error', 502, msg || `Drive responded ${status}`)
}

async function driveGet(url, key) {
  url.searchParams.set('key', key)
  url.searchParams.set('supportsAllDrives', 'true')
  let res
  try {
    res = await fetch(url, { headers: { Accept: 'application/json' } })
  } catch (e) {
    throw new DriveError('network', 502, e.message)
  }
  const body = await res.json().catch(() => null)
  if (!res.ok) throw toDriveError(res.status, body)
  return body
}

/** Every page of a files.list query (Drive returns at most 1000 per page). */
async function listAll(q, fields, key) {
  const out = []
  let pageToken = ''
  do {
    const url = new URL(API)
    url.searchParams.set('q', q)
    url.searchParams.set('fields', `nextPageToken,files(${fields})`)
    url.searchParams.set('pageSize', '1000')
    url.searchParams.set('orderBy', 'name_natural')
    url.searchParams.set('includeItemsFromAllDrives', 'true')
    if (pageToken) url.searchParams.set('pageToken', pageToken)
    const page = await driveGet(url, key)
    out.push(...(page.files || []))
    pageToken = page.nextPageToken
  } while (pageToken && out.length < MAX_FILES)
  return out.slice(0, MAX_FILES)
}

const prettify = (name) => name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()

export async function listPhotos(folderInput, key) {
  if (!key || !folderInput) throw new DriveError('not_configured', 503)
  const root = parseFolderId(folderInput)
  if (!root) throw new DriveError('invalid_folder', 500, 'GOOGLE_DRIVE_FOLDER is not a valid folder link or ID')

  // 1. the folder itself: proves it exists, is shared publicly and is a folder
  const meta = new URL(`${API}/${root}`)
  meta.searchParams.set('fields', 'id,name,mimeType')
  const folder = await driveGet(meta, key)
  if (folder.mimeType !== FOLDER_MIME) throw new DriveError('invalid_folder', 500, 'The link points to a file, not a folder')

  // 2. direct subfolders -> categories
  const subs = await listAll(`'${root}' in parents and mimeType = '${FOLDER_MIME}' and trashed = false`, 'id,name', key)
  const catOf = new Map(subs.map((f) => [f.id, prettify(f.name)]))

  // 3. images in the root and every subfolder. One query per folder: with an
  //    API key, Drive rejects `'a' in parents or 'b' in parents` (403).
  const mimes = IMAGE_MIMES.map((m) => `mimeType = '${m}'`).join(' or ')
  const perFolder = await Promise.all(
    [root, ...subs.map((f) => f.id)].map((id) =>
      listAll(
        `'${id}' in parents and (${mimes}) and trashed = false`,
        'id,name,parents,description,imageMediaMetadata(width,height,rotation)',
        key
      )
    )
  )
  const files = perFolder.flat().slice(0, MAX_FILES)

  const photos = files.map((f) => {
    const m = f.imageMediaMetadata || {}
    const turned = m.rotation % 2 === 1 // thumbnails come out upright, so swap
    return {
      id: f.id,
      w: (turned ? m.height : m.width) || 4,
      h: (turned ? m.width : m.height) || 5,
      cat: catOf.get(f.parents?.[0]) || '',
      cap: f.description?.trim() || '',
    }
  })

  return {
    folder: folder.name,
    categories: subs.map((f) => prettify(f.name)).filter((c) => photos.some((p) => p.cat === c)),
    photos,
  }
}
