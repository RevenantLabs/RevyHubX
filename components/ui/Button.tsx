import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#fff1cc] text-surface-950 shadow-[4px_4px_0_#f8614a,0_0_26px_rgba(84,210,255,0.16)] hover:bg-white",
  secondary: "bg-[#26364e] text-white shadow-[4px_4px_0_rgba(84,210,255,0.34)] hover:bg-[#334764]",
  ghost: "bg-transparent text-[#f7deb0] hover:bg-[#fff1cc]/10",
  danger: "bg-[#f8614a] text-white shadow-[4px_4px_0_rgba(255,241,204,0.22)] hover:bg-[#ff725f]"
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-black/10 px-4 py-2 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
