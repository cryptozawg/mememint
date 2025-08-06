import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemeMint - Launch Your Solana Memecoin in Seconds",
  description: "🚀 The leading no-code Solana memecoin launcher. Create and deploy SPL tokens instantly with professional-grade features.",
  keywords: ["solana", "memecoin", "token", "launcher", "crypto", "blockchain", "SPL", "defi"],
  authors: [{ name: "MemeMint Team" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: "MemeMint - Launch Your Solana Memecoin",
    description: "🚀 The leading no-code Solana memecoin launcher",
    type: "website",
    url: "https://mememint.vercel.app",
    images: ['/icon.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "MemeMint - Launch Your Solana Memecoin",
    description: "🚀 The leading no-code Solana memecoin launcher",
    images: ['/icon.png'],
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
