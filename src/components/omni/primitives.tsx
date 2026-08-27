import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card that gently expands and lifts as it scrolls into view / on hover. */
export function PlushCard({
  children,
  className,
  interactive = true,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26, scale: 0.965 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={interactive ? { y: -6, scale: 1.015 } : {}}
      className={cn("plush p-5 transition-shadow hover:shadow-[var(--shadow-plush-lg)]", className)}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <span className="inline-flex rounded-full bg-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-container-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

export function PillButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "tonal" | "ghost" | "outline";
}) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-[var(--shadow-plush)] hover:brightness-105",
    tonal: "bg-primary-container text-primary-container-foreground hover:brightness-[1.03]",
    ghost: "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
    outline: "border border-border bg-card/70 text-foreground hover:bg-surface-2",
  } as const;
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function StatusChip({ label = "100% In-Browser & Private" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-sage/25 px-3 py-1.5 text-[11px] font-semibold text-sage-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
      </span>
      {label}
    </span>
  );
}

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-32 pt-28 sm:px-6 sm:pt-32">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-4">
          <StatusChip />
        </div>
      </motion.header>
      {children}
    </div>
  );
}
