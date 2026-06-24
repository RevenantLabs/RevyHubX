"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { AddressInput } from "@/components/stellar/AddressInput";
import { BalanceList, type DisplayBalance } from "@/components/stellar/BalanceList";
import { getAccountBalances } from "@/lib/stellar/account";

export default function BalanceViewerPage() {
  const [address, setAddress] = useState("");
  const [balances, setBalances] = useState<DisplayBalance[]>([]);
  const [message, setMessage] = useState<{ type: "info" | "success" | "error"; text: string }>({
    type: "info",
    text: "Enter a funded testnet account address to inspect balances."
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setBalances([]);

    try {
      const nextBalances = await getAccountBalances(address);
      setBalances(nextBalances);
      setMessage({ type: "success", text: "Balances loaded from Stellar testnet Horizon." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unexpected error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Balance Viewer</h1>
        <p className="mt-2 text-slate-400">Fetch native and issued asset balances from testnet Horizon.</p>
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <AddressInput value={address} onChange={setAddress} />
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Load balances"}
          </Button>
        </form>
      </Card>
      <StatusMessage type={message.type} title={message.type === "success" ? "Account loaded" : "Balance status"} description={message.text} />
      {balances.length > 0 ? <BalanceList balances={balances} /> : null}
    </div>
  );
}
