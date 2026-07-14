import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#fff1cc]/18 bg-[linear-gradient(145deg,rgba(28,34,51,0.96),rgba(12,15,25,0.94))] p-5 shadow-[0_0_0_1px_rgba(255,241,204,0.05),6px_6px_0_rgba(248,97,74,0.18),0_22px_60px_rgba(0,0,0,0.38)] backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
