"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusMessage } from "@/components/ui/StatusMessage";

declare global {
  interface Window {
    freighterApi?: {
      isConnected?: () => Promise<boolean>;
      getPublicKey?: () => Promise<string>;
    };
  }
}

export default function FreighterConnectPage() {
  const [available, setAvailable] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState({ type: "info" as "info" | "success" | "warning" | "error", text: "Detecting Freighter in this browser." });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const detected = Boolean(window.freighterApi);
      setAvailable(detected);
      setMessage({
        type: detected ? "info" : "warning",
        text: detected
          ? "Freighter appears to be installed. You can request the public key."
          : "Freighter was not detected. Install the extension to try wallet connection examples."
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function connect() {
    if (!window.freighterApi?.getPublicKey) {
      setMessage({ type: "warning", text: "Freighter API is not available in this browser." });
      return;
    }

    try {
      const key = await window.freighterApi.getPublicKey();
      setPublicKey(key);
      setMessage({ type: "success", text: "Freighter public key connected." });
    } catch {
      setMessage({ type: "error", text: "Connection request was rejected or could not be completed." });
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Freighter Connect</h1>
        <p className="mt-2 text-slate-400">A minimal wallet detection and public key connection example.</p>
      </div>
      <Card className="space-y-5">
        <Button type="button" onClick={connect} disabled={!available}>
          Connect Freighter Wallet
        </Button>
        {publicKey ? (
          <div className="rounded-lg border border-white/10 bg-surface-950 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Connected public key</p>
            <p className="mt-2 break-all text-sm text-slate-200">{publicKey}</p>
          </div>
        ) : null}
        <a
          href="https://www.freighter.app/"
          className="inline-flex text-sm font-semibold text-stellar-cyan hover:text-cyan-200"
        >
          Install Freighter
        </a>
      </Card>
      <StatusMessage type={message.type} title="Wallet status" description={message.text} />
      <StatusMessage
        type="info"
        title="Contributor TODO"
        description="Future issues can add network detection, sign transaction demo, and a send test payment demo."
      />
      {/* TODO(issue): Improve Freighter connection handling and network mismatch warnings. */}
    </div>
  );
}
