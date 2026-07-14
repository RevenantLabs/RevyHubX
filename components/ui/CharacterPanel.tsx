import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CharacterTone = "star" | "moon" | "rocket" | "faucet" | "detective" | "wallet" | "trust";

interface CharacterPanelProps {
  tone: CharacterTone;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

const toneStyles: Record<CharacterTone, { face: string; hat: string; shadow: string }> = {
  star: { face: "bg-[#fff1cc]", hat: "bg-[#54d2ff]", shadow: "shadow-[7px_7px_0_#f8614a]" },
  moon: { face: "bg-[#f7deb0]", hat: "bg-[#8b5cf6]", shadow: "shadow-[7px_7px_0_rgba(84,210,255,0.45)]" },
  rocket: { face: "bg-[#54d2ff]", hat: "bg-[#f8614a]", shadow: "shadow-[7px_7px_0_#fff1cc]" },
  faucet: { face: "bg-[#62d79b]", hat: "bg-[#54d2ff]", shadow: "shadow-[7px_7px_0_#f6c85f]" },
  detective: { face: "bg-[#f6c85f]", hat: "bg-[#1a2034]", shadow: "shadow-[7px_7px_0_#8b5cf6]" },
  wallet: { face: "bg-[#8b5cf6]", hat: "bg-[#fff1cc]", shadow: "shadow-[7px_7px_0_#54d2ff]" },
  trust: { face: "bg-[#f8614a]", hat: "bg-[#fff1cc]", shadow: "shadow-[7px_7px_0_#62d79b]" }
};

export function CharacterPanel({ tone, eyebrow, title, description, children }: CharacterPanelProps) {
  const styles = toneStyles[tone];

  return (
    <div className="grid gap-5 rounded-lg border border-[#fff1cc]/18 bg-[linear-gradient(135deg,rgba(28,34,51,0.96),rgba(11,13,22,0.95))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.32)] sm:grid-cols-[auto_1fr] sm:items-center">
      <div className={cn("relative h-24 w-24 rounded-xl border-4 border-[#0b0d16]", styles.face, styles.shadow)}>
        <span className={cn("absolute -top-3 left-5 h-6 w-14 rounded-t-full", styles.hat)} />
        <span className="absolute left-6 top-9 h-3 w-3 rounded-full bg-[#080912]" />
        <span className="absolute right-6 top-9 h-3 w-3 rounded-full bg-[#080912]" />
        <span className="absolute bottom-6 left-1/2 h-4 w-8 -translate-x-1/2 rounded-b-full border-b-4 border-[#080912]" />
        <span className="absolute -right-2 bottom-5 h-6 w-3 rounded-full bg-[#080912]" />
      </div>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide text-[#f7deb0]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black tracking-normal text-white">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </div>
  );
}
