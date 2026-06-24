import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "success" | "info" | "warning" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  success: "border-[#62d79b]/45 bg-[#62d79b]/12 text-[#9ff0c3]",
  info: "border-[#54d2ff]/45 bg-[#54d2ff]/12 text-[#8fe3ff]",
  warning: "border-[#f6c85f]/45 bg-[#f6c85f]/12 text-[#ffe097]",
  muted: "border-[#fff1cc]/20 bg-[#fff1cc]/8 text-[#f7deb0]"
};

export function Badge({ className, tone = "muted", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
