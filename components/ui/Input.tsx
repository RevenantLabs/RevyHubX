import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-12 w-full rounded-[0.95rem] border border-[#fff1cc]/16 bg-[#0b0d16] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#fff1cc]/70 focus:ring-2 focus:ring-[#f8614a]/28",
        className
      )}
      {...props}
    />
  );
}
