/** Downloads the printed invitation card (public/Sankar-Silpa-Wedding-Invitation.jpg). */
export const INVITE_FILE = '/Sankar-Silpa-Wedding-Invitation.jpg'

export default function InviteDownload({ className = 'btn btn-ghost', children = 'Download Invitation Card', ...props }) {
  return (
    <a className={className} href={INVITE_FILE} download="Sankar-Silpa-Wedding-Invitation.jpg" {...props}>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d="M12 3v11.2l3.6-3.6L17 12l-5 5-5-5 1.4-1.4 3.6 3.6V3h0zM5 19h14v2H5z" />
      </svg>
      {children}
    </a>
  )
}
