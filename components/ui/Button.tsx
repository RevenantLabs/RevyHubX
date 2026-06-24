import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#fff1cc] text-surface-950 shadow-[4px_4px_0_#f8614a] hover:bg-white",
  secondary: "bg-[#253047] text-white shadow-[4px_4px_0_rgba(84,210,255,0.32)] hover:bg-[#31405f]",
  ghost: "bg-transparent text-[#f7deb0] hover:bg-[#fff1cc]/10",
  danger: "bg-[#f8614a] text-white shadow-[4px_4px_0_rgba(255,241,204,0.22)] hover:bg-[#ff725f]"
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.9rem] border border-black/10 px-4 py-2 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
