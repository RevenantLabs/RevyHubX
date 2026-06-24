import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "success" | "info" | "warning" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  success: "border-stellar-green/40 bg-stellar-green/10 text-stellar-green",
  info: "border-stellar-cyan/40 bg-stellar-cyan/10 text-stellar-cyan",
  warning: "border-stellar-amber/40 bg-stellar-amber/10 text-stellar-amber",
  muted: "border-white/10 bg-white/5 text-slate-300"
};

export function Badge({ className, tone = "muted", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
