"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-surface-950/44 lg:block">
      <nav className="sticky top-16 space-y-2 p-4">
        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Tools</p>
        {tools.map((tool) => {
          const Icon = tool.icon;
          const active = pathname === tool.href;

          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition",
                active ? "bg-stellar-cyan/14 text-stellar-cyan" : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {tool.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
