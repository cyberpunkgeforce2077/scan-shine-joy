export function GeminiStar({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gemini-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
        fill="url(#gemini-star-grad)"
      />
    </svg>
  );
}

export function GeminiMenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h12" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function StudioMark({ className = "h-5 w-5" }: { className?: string }) {
  return <GeminiStar className={className} />;
}

/* Backward-compatible alias for existing imports */
export const Sparkle = GeminiStar;

export function OmniLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#1e1f20] text-primary shadow-xs">
        <GeminiStar className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate font-sans text-[15px] font-semibold leading-tight tracking-tight text-[#e3e3e3]">
            Assistant
          </span>
          <span className="block truncate text-[10px] font-medium tracking-[0.05em] text-[#c4c7c5]">
            Assistant
          </span>
        </span>
      )}
    </div>
  );
}
