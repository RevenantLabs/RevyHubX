import { Badge } from "@/components/ui/Badge";
import { truncateMiddle } from "@/lib/utils";

export interface DisplayBalance {
  assetCode: string;
  issuer?: string;
  amount: string;
}

export function BalanceList({ balances }: { balances: DisplayBalance[] }) {
  return (
    <div className="space-y-3">
      {balances.map((balance) => (
        <div
          key={`${balance.assetCode}-${balance.issuer ?? "native"}`}
          className="rounded-lg border border-white/10 bg-surface-950 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{balance.assetCode}</p>
              <p className="mt-1 text-xs text-slate-500">
                {balance.issuer ? truncateMiddle(balance.issuer) : "Native Stellar asset"}
              </p>
            </div>
            <Badge tone="info">{balance.amount}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
