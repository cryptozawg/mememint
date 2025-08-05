import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemeMint - Launch Your Solana Memecoin in 30 Seconds",
  description: "The ultimate no-code Solana memecoin launcher. No coding required. Just vibes.",
  keywords: ["solana", "memecoin", "token", "launcher", "crypto", "blockchain"],
  authors: [{ name: "MemeMint Team" }],
  icons: {
    icon: '/assets/FINAL MEMEMINT LOGO.png',
    shortcut: '/assets/FINAL MEMEMINT LOGO.png',
    apple: '/assets/FINAL MEMEMINT LOGO.png',
  },
  openGraph: {
    title: "MemeMint - Launch Your Solana Memecoin",
    description: "The ultimate no-code Solana memecoin launcher",
    type: "website",
    url: "https://mememint.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "MemeMint - Launch Your Solana Memecoin",
    description: "The ultimate no-code Solana memecoin launcher",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
