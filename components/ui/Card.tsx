import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/80 bg-white/75 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.72),6px_6px_0_rgba(255,139,122,0.18),0_22px_60px_rgba(84,102,136,0.16)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
