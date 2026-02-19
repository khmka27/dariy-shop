"use client";

import { useEffect, useState } from "react";
import { useToastStore } from "@/features/toast/toastStore";
import { cn } from "@/lib/utils";

const TOAST_DURATION = 2500;
const EXIT_DURATION = 300;

export function Toast() {
  const message = useToastStore((s) => s.message);
  const clear = useToastStore((s) => s.clear);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!message) {
      setExiting(false);
      return;
    }
    setExiting(false);
    const hideTimer = window.setTimeout(() => setExiting(true), TOAST_DURATION);
    const clearTimer = window.setTimeout(() => clear(), TOAST_DURATION + EXIT_DURATION);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(clearTimer);
    };
  }, [message, clear]);

  if (!message) return null;

  return (
    <div
      className={cn(
        "fixed right-4 top-20 z-[100] min-w-[200px] max-w-[90vw] rounded-2xl border-2 border-[#8d021e] bg-white px-4 py-3.5 text-sm font-medium text-gray-900 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] md:right-6 md:top-24",
        exiting ? "toast-slide-out" : "toast-slide-in"
      )}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
