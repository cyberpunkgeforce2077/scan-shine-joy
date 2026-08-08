export function CelebrationModal({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs rounded-3xl border border-border bg-card p-8 text-center shadow-2xl"
      >
        <div className="text-7xl">👍</div>
        <h2 className="mt-4 text-xl font-bold text-foreground">{title}</h2>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
        >
          Nice!
        </button>
      </div>
    </div>
  );
}
