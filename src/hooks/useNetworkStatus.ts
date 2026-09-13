import { useState, useEffect, useCallback } from "react";

export interface NetworkStatus {
  isOnline: boolean;
  isChecking: boolean;
  checkConnection: () => Promise<boolean>;
  lastChecked: number | null;
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator !== "undefined") {
      return navigator.onLine;
    }
    return true;
  });
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<number | null>(null);

  const checkConnection = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") return true;

    // Fast check with navigator.onLine
    if (!navigator.onLine) {
      setIsOnline(false);
      setLastChecked(Date.now());
      return false;
    }

    setIsChecking(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      // Ping a reliable local/cached asset or favicon with cache busting
      const response = await fetch(`/robots.txt?_t=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const online = response.ok || response.status === 304 || response.status === 200;
      setIsOnline(online);
      setLastChecked(Date.now());
      window.dispatchEvent(
        new CustomEvent("omni-network-status", { detail: { isOnline: online } }),
      );
      return online;
    } catch {
      clearTimeout(timeoutId);
      // If the fetch fails, check navigator.onLine as fallback
      const fallback = navigator.onLine;
      setIsOnline(fallback);
      setLastChecked(Date.now());
      return fallback;
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOnline(true);
      void checkConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setLastChecked(Date.now());
    };

    const handleCustomStatus = (e: Event) => {
      const custom = e as CustomEvent<{ isOnline: boolean }>;
      if (typeof custom.detail?.isOnline === "boolean") {
        setIsOnline(custom.detail.isOnline);
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("omni-network-status", handleCustomStatus);

    // Periodic check every 30 seconds
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        void checkConnection();
      }
    }, 30000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("omni-network-status", handleCustomStatus);
      clearInterval(interval);
    };
  }, [checkConnection]);

  return { isOnline, isChecking, checkConnection, lastChecked };
}
