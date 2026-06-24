"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { AddressInput } from "@/components/stellar/AddressInput";
import { validatePublicKey } from "@/lib/stellar/validateAddress";

export default function AddressValidatorPage() {
  const [address, setAddress] = useState("");
  const result = useMemo(() => validatePublicKey(address), [address]);
  const hasInput = address.trim().length > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Address Validator</h1>
        <p className="mt-2 text-slate-400">
          Validate Stellar public addresses locally with the Stellar SDK StrKey checksum rules.
        </p>
      </div>
      <Card className="space-y-5">
        <AddressInput value={address} onChange={setAddress} />
        {hasInput ? (
          <StatusMessage
            type={result.valid ? "success" : "error"}
            title={result.valid ? "Valid public address" : "Invalid public address"}
            description={result.message}
          />
        ) : (
          <StatusMessage
            type="info"
            title="Enter a public key"
            description="Stellar public keys normally start with G. Never enter a secret key or seed phrase."
          />
        )}
      </Card>
    </div>
  );
}
