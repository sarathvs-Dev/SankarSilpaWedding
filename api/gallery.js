import { listPhotos, DriveError } from './_lib/drive.js'

/**
 * GET /api/gallery -> { folder, categories, photos: [{ id, w, h, cat, cap }] }
 *
 * Vercel Function. Env vars (Vercel -> Settings -> Environment Variables):
 *   GOOGLE_DRIVE_API_KEY    Google Cloud API key with the Drive API enabled
 *   GOOGLE_DRIVE_FOLDER     the folder's share link, or just its ID
 *   GALLERY_CACHE_SECONDS   optional, default 300 (how fast new photos appear)
 *
 * Caching: Vercel's CDN keeps the listing for GALLERY_CACHE_SECONDS and then
 * refreshes it in the background, so Drive is asked at most once per period
 * no matter how many guests visit. A warm function also reuses its last result.
 */
let memo = { at: 0, data: null }

export default async function handler(req, res) {
  const ttl = Math.max(30, Number(process.env.GALLERY_CACHE_SECONDS) || 300)
  const send = (status, body, cache) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', cache)
    res.end(JSON.stringify(body))
  }

  try {
    if (!memo.data || Date.now() - memo.at > ttl * 1000) {
      memo = {
        at: Date.now(),
        data: await listPhotos(process.env.GOOGLE_DRIVE_FOLDER, process.env.GOOGLE_DRIVE_API_KEY),
      }
    }
    send(200, memo.data, `public, max-age=60, s-maxage=${ttl}, stale-while-revalidate=86400`)
  } catch (e) {
    const err = e instanceof DriveError ? e : new DriveError('server_error', 500, e?.message)
    if (err.code !== 'not_configured') console.error('[gallery]', err.code, err.message)
    // short cache on quota errors so a traffic spike doesn't keep hammering Drive
    send(err.status, { error: err.code }, err.code === 'quota' ? 'public, s-maxage=60' : 'no-store')
  }
}
