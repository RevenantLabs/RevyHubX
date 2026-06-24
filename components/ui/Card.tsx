import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-[#fff1cc]/18 bg-[#151723]/88 p-5 shadow-[0_0_0_1px_rgba(255,241,204,0.05),7px_7px_0_rgba(248,97,74,0.16),0_22px_60px_rgba(0,0,0,0.32)] backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
