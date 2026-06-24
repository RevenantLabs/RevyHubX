import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ToolStatus } from "@/lib/constants";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  status: ToolStatus;
  icon: React.ComponentType<{ className?: string }>;
}

const statusTone: Record<ToolStatus, "success" | "info" | "warning"> = {
  Working: "success",
  MVP: "info",
  "Coming Soon": "warning"
};

export function ToolCard({ title, description, href, status, icon: Icon }: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition hover:-translate-y-0.5 hover:border-stellar-cyan/40">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-stellar-cyan/12 text-stellar-cyan">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <Badge tone={statusTone[status]}>{status}</Badge>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stellar-cyan">
          Open tool
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
        </span>
      </Card>
    </Link>
  );
}
