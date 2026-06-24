import { Badge } from "@/components/ui/Badge";
import { truncateMiddle } from "@/lib/utils";

export interface TransactionSummary {
  hash: string;
  ledger: number;
  sourceAccount: string;
  feeCharged: string;
  createdAt: string;
  successful: boolean;
  operationCount?: number;
}

export function TransactionDetails({ transaction }: { transaction: TransactionSummary }) {
  const rows = [
    ["Hash", truncateMiddle(transaction.hash, 10)],
    ["Ledger", String(transaction.ledger)],
    ["Source account", truncateMiddle(transaction.sourceAccount)],
    ["Fee charged", transaction.feeCharged],
    ["Created at", new Date(transaction.createdAt).toLocaleString()],
    ["Operations", String(transaction.operationCount ?? "Not loaded")]
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Transaction result</p>
        <Badge tone={transaction.successful ? "success" : "warning"}>
          {transaction.successful ? "Successful" : "Failed"}
        </Badge>
      </div>
      <dl className="divide-y divide-white/10 rounded-lg border border-white/10 bg-surface-950">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="break-words text-sm text-slate-200 sm:col-span-2">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
