import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-md border border-white/10 bg-surface-950 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-stellar-cyan focus:ring-2 focus:ring-stellar-cyan/20",
        className
      )}
      {...props}
    />
  );
}
