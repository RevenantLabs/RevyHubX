"use client";

import { useState } from "react";
import { AddressInput } from "@/components/stellar/AddressInput";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { fundTestnetAccount } from "@/lib/stellar/friendbot";

export default function TestnetFaucetPage() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "info" as "info" | "success" | "warning" | "error", text: "Friendbot funds accounts only on Stellar testnet." });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await fundTestnetAccount(address);
      setMessage({ type: "success", text: "Friendbot request completed for this testnet account." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unexpected error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Testnet Faucet Helper</h1>
        <p className="mt-2 text-slate-400">Fund Stellar testnet accounts with Friendbot. No real funds are involved.</p>
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <AddressInput value={address} onChange={setAddress} />
          <Button type="submit" disabled={loading}>
            {loading ? "Requesting..." : "Fund testnet account"}
          </Button>
        </form>
      </Card>
      <StatusMessage type={message.type} title="Friendbot status" description={message.text} />
      <StatusMessage type="warning" title="Testnet only" description="Friendbot resets and testnet XLM have no market value." />
    </div>
  );
}
