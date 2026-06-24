import {
  BadgeCheck,
  CircleDollarSign,
  Droplets,
  Landmark,
  QrCode,
  Search,
  ShieldCheck,
  WalletCards
} from "lucide-react";

export type ToolStatus = "Working" | "MVP" | "Coming Soon";

export const tools = [
  {
    title: "Address Validator",
    description: "Validate Stellar public keys and explain address format issues.",
    href: "/tools/address-validator",
    status: "Working" as ToolStatus,
    icon: ShieldCheck
  },
  {
    title: "Balance Viewer",
    description: "Inspect testnet account balances through Horizon.",
    href: "/tools/balance-viewer",
    status: "Working" as ToolStatus,
    icon: CircleDollarSign
  },
  {
    title: "Trustline Checker",
    description: "Check whether an account trusts a specific issued asset.",
    href: "/tools/trustline-checker",
    status: "MVP" as ToolStatus,
    icon: BadgeCheck
  },
  {
    title: "Payment QR Generator",
    description: "Create demo Stellar payment request QR codes.",
    href: "/tools/payment-qr",
    status: "Working" as ToolStatus,
    icon: QrCode
  },
  {
    title: "Transaction Lookup",
    description: "Look up testnet transactions by hash.",
    href: "/tools/transaction-lookup",
    status: "MVP" as ToolStatus,
    icon: Search
  },
  {
    title: "Freighter Connect",
    description: "Try a browser wallet connection example.",
    href: "/tools/freighter-connect",
    status: "MVP" as ToolStatus,
    icon: WalletCards
  },
  {
    title: "Testnet Faucet Helper",
    description: "Fund a testnet account with Friendbot.",
    href: "/tools/testnet-faucet",
    status: "Working" as ToolStatus,
    icon: Droplets
  }
];

export const projectLinks = [
  {
    title: "GrantFox-ready MVP",
    description: "Built for a focused open-source Stellar project application.",
    icon: Landmark
  }
];
