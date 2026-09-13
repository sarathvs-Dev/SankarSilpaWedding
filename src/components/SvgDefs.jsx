export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="rough" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="rough-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="paint-blob" x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        <symbol id="lotus" viewBox="0 0 100 40">
          <path d="M50 4c3 8 10 13 20 14-8 4-13 9-14 16-1-7-6-12-14-16 10-1 17-6 20-14z" fill="none" stroke="var(--gold)" strokeWidth="1.1" transform="translate(-20,0)" />
          <path d="M50 2c3.5 9 12 15 24 16-9 4.5-15 10.5-16 18-1.5-8-8-14-16-18 12-1 20.5-7 24-16z" fill="none" stroke="var(--gold-deep)" strokeWidth="1.3" />
          <path d="M50 4c3 8 10 13 20 14-8 4-13 9-14 16-1-7-6-12-14-16 10-1 17-6 20-14z" fill="none" stroke="var(--gold)" strokeWidth="1.1" transform="translate(20,0)" />
          <circle cx="50" cy="24" r="2" fill="var(--gold-deep)" />
        </symbol>

        <symbol id="corner-flourish" viewBox="0 0 40 40">
          <path d="M2 38V10c0-4 4-8 8-8h28" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
          <path d="M2 38c8-1 14-4 17-11" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <circle cx="10" cy="10" r="2" fill="var(--gold-deep)" />
        </symbol>

        <symbol id="brass-lamp" viewBox="0 0 60 90">
          <ellipse cx="30" cy="84" rx="20" ry="4" fill="none" stroke="var(--gold-deep)" strokeWidth="1.2" />
          <path d="M14 84c0-10 6-10 6-18 0-4-2-6-2-11 0-9 5-15 12-15s12 6 12 15c0 5-2 7-2 11 0 8 6 8 6 18" fill="none" stroke="var(--gold-deep)" strokeWidth="1.2" />
          <path d="M22 40c0-9 3.5-16 8-16s8 7 8 16" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <line x1="30" y1="24" x2="30" y2="14" stroke="var(--gold-deep)" strokeWidth="1.2" />
          <path
            className="flame-deco"
            d="M30 14c2.2 2.6 2.8 4.6 1.4 6.6-.5.7-1.5.6-1.6-.3-.1-.6.2-.9 0-1.5-.6 1.1-1.2 2-.8 3.2.3.8 1.2 1.1 1.9.7 1.7-1 2-3.3.8-5.4-.5-1.1-1.1-2.2-1.7-3.3z"
            fill="var(--gold)"
          />
        </symbol>

        <symbol id="temple-silhouette" viewBox="0 0 220 180">
          <path d="M110 6 90 34h40L110 6z" fill="var(--maroon)" opacity="0.85" />
          <rect x="96" y="34" width="28" height="10" fill="var(--gold-deep)" />
          <path d="M60 60c10-16 26-24 50-24s40 8 50 24l6 12H54l6-12z" fill="var(--maroon)" />
          <path d="M60 60c10-16 26-24 50-24s40 8 50 24" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <rect x="40" y="72" width="140" height="14" fill="var(--gold-deep)" />
          <rect x="30" y="86" width="160" height="70" fill="var(--ivory-deep)" stroke="var(--gold-deep)" strokeWidth="1.4" />
          <rect x="98" y="122" width="24" height="34" fill="var(--maroon)" />
          <rect x="46" y="100" width="16" height="24" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <rect x="158" y="100" width="16" height="24" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <line x1="30" y1="156" x2="190" y2="156" stroke="var(--gold-deep)" strokeWidth="2" />
          <circle cx="30" cy="164" r="4" fill="var(--gold)" />
          <circle cx="190" cy="164" r="4" fill="var(--gold)" />
        </symbol>

        <symbol id="mandala" viewBox="0 0 100 100">
          <g fill="none" stroke="var(--gold)" strokeWidth="0.6">
            <circle cx="50" cy="50" r="46" />
            <circle cx="50" cy="50" r="36" />
            <circle cx="50" cy="50" r="26" />
            <g stroke="var(--gold-deep)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <path
                  key={deg}
                  d="M50 4c4 10 4 18 0 22-4-4-4-12 0-22z"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
            </g>
          </g>
        </symbol>

        <symbol id="house-silhouette" viewBox="0 0 220 150">
          <path d="M20 70 110 18l90 52" fill="none" stroke="var(--gold-deep)" strokeWidth="2" />
          <path d="M32 74 110 30l78 44v6H32z" fill="var(--maroon)" opacity="0.88" />
          <rect x="46" y="80" width="128" height="58" fill="var(--ivory-deep)" stroke="var(--gold-deep)" strokeWidth="1.4" />
          <rect x="96" y="104" width="28" height="34" fill="var(--maroon)" />
          <rect x="58" y="92" width="18" height="20" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <rect x="144" y="92" width="18" height="20" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <line x1="20" y1="138" x2="200" y2="138" stroke="var(--gold-deep)" strokeWidth="1.6" />
        </symbol>
      </defs>
    </svg>
  )
}
