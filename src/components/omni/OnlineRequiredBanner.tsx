import { Link } from "@tanstack/react-router";
import { WifiOff, RefreshCw, Loader2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { toast } from "sonner";

interface OnlineRequiredBannerProps {
  featureName: string;
  description?: string;
  compact?: boolean;
  className?: string;
  onRetrySuccess?: () => void;
}

export function OnlineRequiredBanner({
  featureName,
  description,
  compact = false,
  className = "",
  onRetrySuccess,
}: OnlineRequiredBannerProps) {
  const { isChecking, checkConnection } = useNetworkStatus();

  const handleRetry = async () => {
    const online = await checkConnection();
    if (online) {
      toast.success("Connection restored! You are back online.");
      onRetrySuccess?.();
    } else {
      toast.error("Still offline. Please check your Wi-Fi or mobile data.");
    }
  };

  if (compact) {
    return (
      <div
        className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-surface-1 border border-amber-500/30 text-xs text-foreground ${className}`}
      >
        <div className="flex items-center gap-2">
          <WifiOff className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300">Offline:</strong> {featureName} requires an internet
            connection.
          </span>
        </div>
        <button
          type="button"
          onClick={handleRetry}
          disabled={isChecking}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-foreground font-medium transition active:scale-95 disabled:opacity-50"
        >
          {isChecking ? (
            <Loader2 className="h-3 w-3 animate-spin text-amber-400" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl bg-surface-1 border border-amber-500/30 p-6 sm:p-8 text-foreground shadow-xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <WifiOff className="h-7 w-7 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">Internet connection required</h3>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
              Offline
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {description ||
              `${featureName} connects to cloud intelligence and requires an active internet connection.`}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-black/10 dark:border-white/10">
        <button
          type="button"
          onClick={handleRetry}
          disabled={isChecking}
          className="flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-background px-5 py-2.5 text-sm font-semibold transition active:scale-95 disabled:opacity-60"
        >
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Check connection
        </button>

        <Link
          to="/"
          className="flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 px-4 py-2.5 text-sm font-medium text-foreground transition active:scale-95"
        >
          <span>Explore offline tools</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="ml-auto text-xs text-muted-foreground hidden md:flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Local tools (QR, Scanner, OCR) remain fully functional</span>
        </div>
      </div>
    </div>
  );
}
