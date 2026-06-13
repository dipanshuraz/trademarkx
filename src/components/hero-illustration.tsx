export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="absolute -inset-4 rounded-[2rem] bg-[#ab8001]/10 blur-2xl" />
      <svg viewBox="0 0 480 420" fill="none" className="relative w-full drop-shadow-[0_24px_48px_rgba(17,34,64,0.12)]">
        <rect x="40" y="48" width="400" height="324" rx="24" fill="#ffffff" stroke="#E5E7EB" strokeWidth="1.5" />
        <rect x="40" y="48" width="400" height="4" rx="2" fill="#AB8001" />
        <rect x="64" y="80" width="160" height="12" rx="6" fill="#F8F9FB" />
        <rect x="64" y="104" width="240" height="8" rx="4" fill="#F8F9FB" />
        <rect x="64" y="124" width="200" height="8" rx="4" fill="#F8F9FB" />
        <circle cx="360" cy="108" r="36" fill="#F8F9FB" stroke="#AB8001" strokeWidth="2" />
        <path d="M360 88v12l8 8" stroke="#AB8001" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="64" y="168" width="352" height="168" rx="16" fill="#F8F9FB" stroke="#E5E7EB" />
        <path d="M120 248l48-40 40 32 56-72 80 80" stroke="#AB8001" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="168" cy="208" r="6" fill="#AB8001" />
        <circle cx="256" cy="240" r="6" fill="#AB8001" />
        <circle cx="312" cy="200" r="6" fill="#112240" />
        <circle cx="392" cy="280" r="6" fill="#112240" />
        <g transform="translate(88, 300)">
          <path d="M48 0L56 16H40L48 0Z" fill="#112240" />
          <rect x="20" y="16" width="56" height="8" rx="4" fill="#112240" />
          <ellipse cx="48" cy="36" rx="32" ry="8" fill="#112240" opacity="0.15" />
        </g>
        <rect x="280" y="300" width="120" height="36" rx="12" fill="#AB8001" />
        <rect x="296" y="312" width="88" height="12" rx="6" fill="#ffffff" opacity="0.95" />
      </svg>
    </div>
  );
}
