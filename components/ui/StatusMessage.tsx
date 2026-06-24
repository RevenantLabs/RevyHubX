import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = "success" | "error" | "warning" | "info";

interface StatusMessageProps {
  type: StatusType;
  title: string;
  description?: string;
}

const statusStyles: Record<StatusType, string> = {
  success: "border-stellar-green/30 bg-stellar-green/10 text-stellar-green",
  error: "border-red-400/30 bg-red-500/10 text-red-200",
  warning: "border-stellar-amber/30 bg-stellar-amber/10 text-stellar-amber",
  info: "border-stellar-cyan/30 bg-stellar-cyan/10 text-stellar-cyan"
};

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info
};

export function StatusMessage({ type, title, description }: StatusMessageProps) {
  const Icon = icons[type];

  return (
    <div className={cn("flex gap-3 rounded-lg border p-4", statusStyles[type])}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        {description ? <p className="mt-1 text-sm text-slate-300">{description}</p> : null}
      </div>
    </div>
  );
}
