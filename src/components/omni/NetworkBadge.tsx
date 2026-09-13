import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { toast } from "sonner";

export function NetworkBadge({ className = "" }: { className?: string }) {
  const { isOnline, isChecking, checkConnection } = useNetworkStatus();

  const handleTap = async () => {
    const status = await checkConnection();
    if (status) {
      toast.success("Online: connected to OmniSuite cloud services");
    } else {
      toast.info("Offline: running in on-device local mode");
    }
  };

  return (
    <button
      type="button"
      onClick={handleTap}
      title={isOnline ? "Online — click to test" : "Offline — click to reconnect"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer active:scale-95 ${
        isOnline
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
          : "bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 animate-pulse"
      } ${className}`}
    >
      {isChecking ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : isOnline ? (
        <Wifi className="h-3 w-3 text-emerald-400" />
      ) : (
        <WifiOff className="h-3 w-3 text-amber-400" />
      )}
      <span>{isOnline ? "Online" : "Offline"}</span>
    </button>
  );
}
