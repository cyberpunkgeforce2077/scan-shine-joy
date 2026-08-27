export function Sparkle({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="omni-sparkle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="45%" stopColor="var(--color-rose)" />
          <stop offset="100%" stopColor="var(--color-amber)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#omni-sparkle)"
        d="M12 1.6c.35 4.2 1.9 6.9 4.3 8.4 1.2.75 2.6 1.2 4.1 1.4v1.2c-1.5.2-2.9.65-4.1 1.4-2.4 1.5-3.95 4.2-4.3 8.4-.35-4.2-1.9-6.9-4.3-8.4-1.2-.75-2.6-1.2-4.1-1.4v-1.2c1.5-.2 2.9-.65 4.1-1.4C10.1 8.5 11.65 5.8 12 1.6Z"
      />
      <path
        fill="url(#omni-sparkle)"
        opacity="0.75"
        d="M19.4 2.2c.2 1.9 1 3 2.6 3.4-1.6.4-2.4 1.5-2.6 3.4-.2-1.9-1-3-2.6-3.4 1.6-.4 2.4-1.5 2.6-3.4Z"
      />
    </svg>
  );
}

export function OmniLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-container shadow-[var(--shadow-plush)]">
        <Sparkle className="h-5.5 w-5.5" />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-extrabold leading-tight tracking-tight text-foreground">
            OmniSuite
          </span>
          <span className="block truncate text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            In-browser toolkit
          </span>
        </span>
      )}
    </div>
  );
}
