"use client";

import QRCode from "qrcode";
import { Copy } from "lucide-react";
import { useState } from "react";
import { AddressInput } from "@/components/stellar/AddressInput";
import { QRPreview } from "@/components/stellar/QRPreview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { createPaymentUri } from "@/lib/stellar/paymentUri";

export default function PaymentQrPage() {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState<"XLM" | "USDC" | "CUSTOM">("XLM");
  const [memo, setMemo] = useState("");
  const [uri, setUri] = useState("");
  const [qr, setQr] = useState("");
  const [message, setMessage] = useState({ type: "info" as "info" | "success" | "warning" | "error", text: "Generate a demo payment URI. Verify all details before using it." });

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const nextUri = createPaymentUri({ destination, amount, asset, memo });
      const nextQr = await QRCode.toDataURL(nextUri, { margin: 1, width: 256 });
      setUri(nextUri);
      setQr(nextQr);
      setMessage({ type: "success", text: "Payment QR generated." });
    } catch (error) {
      setUri("");
      setQr("");
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unexpected error." });
    }
  }

  async function copyUri() {
    if (!uri) return;
    await navigator.clipboard.writeText(uri);
    setMessage({ type: "success", text: "Payment URI copied to clipboard." });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Payment QR Generator</h1>
        <p className="mt-2 text-slate-400">Create a demo Stellar payment request QR code for test workflows.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <form onSubmit={handleGenerate} className="space-y-5">
            <AddressInput value={destination} onChange={setDestination} label="Destination address" />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Amount</span>
              <Input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="10" inputMode="decimal" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Asset</span>
              <select
                value={asset}
                onChange={(event) => setAsset(event.target.value as "XLM" | "USDC" | "CUSTOM")}
                className="min-h-11 w-full rounded-md border border-white/10 bg-surface-950 px-3 text-sm text-white outline-none focus:border-stellar-cyan"
              >
                <option value="XLM">XLM</option>
                <option value="USDC">USDC placeholder</option>
                <option value="CUSTOM">Custom asset placeholder</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Memo optional</span>
              <Input value={memo} onChange={(event) => setMemo(event.target.value)} placeholder="Invoice 1001" />
            </label>
            <Button type="submit">Generate QR</Button>
          </form>
        </Card>
        <div className="space-y-4">
          <StatusMessage type={message.type} title="QR status" description={message.text} />
          {qr ? <QRPreview dataUrl={qr} /> : null}
          {uri ? (
            <Card className="space-y-3">
              <p className="break-all text-xs text-slate-300">{uri}</p>
              <Button type="button" variant="secondary" onClick={copyUri}>
                <Copy className="h-4 w-4" aria-hidden />
                Copy URI
              </Button>
            </Card>
          ) : null}
          <StatusMessage type="warning" title="Demo warning" description="This tool does not submit payments. Users must verify destination, amount, asset, and memo in their wallet." />
        </div>
      </div>
    </div>
  );
}
