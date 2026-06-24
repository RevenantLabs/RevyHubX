import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "Stellar DevTools Hub",
  description: "Open-source developer utilities for Stellar testnet workflows.",
  icons: {
    icon: "/devtool-profile.png",
    apple: "/devtool-profile.png"
  },
  openGraph: {
    title: "Stellar DevTools Hub",
    description: "Open-source developer utilities for Stellar testnet workflows.",
    images: ["/devtool-profile.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
