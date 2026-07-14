import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-12 w-full rounded-md border border-[#fff1cc]/18 bg-[#070910]/92 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-stellar-cyan/70 focus:ring-2 focus:ring-stellar-cyan/20",
        className
      )}
      {...props}
    />
  );
}
