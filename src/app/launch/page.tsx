'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import TokenLaunchForm from '../../components/TokenLaunchForm';
import SuccessNotification from '../../components/SuccessNotification';
import ClientOnly from '../../components/ClientOnly';
import Link from 'next/link';

export default function LaunchPage() {
  const [tokenData, setTokenData] = useState<{
    address: string;
    name: string;
    symbol: string;
    transactionId: string;
    logo?: string;
  } | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleTokenSuccess = (data: {
    address: string;
    name: string;
    symbol: string;
    transactionId: string;
    logo?: string;
  }) => {
    console.log('Token creation successful:', data);
    setTokenData(data);
    setShowSuccessNotification(true);
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
  };

  return (
    <div className="dark-theme relative overflow-hidden min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 py-8">
        <div className="flex justify-center">
          <div className="nav-glass flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
              <img
                src="/assets/FINAL MEMEMINT LOGO.png"
                alt="MemeMint Logo"
                className="w-8 h-8"
              />
              <span className="text-lg font-bold gradient-text">MemeMint</span>
            </Link>
            <ClientOnly>
              <WalletMultiButton className="btn-primary" />
            </ClientOnly>
          </div>
        </div>
      </header>



      <div className="h-32"></div>

      <main className="relative z-10 pt-8">
        <div className="flex justify-center items-start min-h-[calc(100vh-8rem)]">
          <ClientOnly>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TokenLaunchForm onSuccess={handleTokenSuccess} />
            </motion.div>
          </ClientOnly>
        </div>
      </main>

      <AnimatePresence>
        {showSuccessNotification && tokenData && (
          <SuccessNotification
            tokenData={tokenData}
            onClose={handleCloseNotification}
          />
        )}
      </AnimatePresence>

      {/* Footer - Same as homepage */}
      <footer className="py-8 relative z-10 mt-24">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/FINAL MEMEMINT LOGO.png"
              alt="MemeMint Logo"
              className="w-6 h-6"
            />
            <span className="text-gray-400 text-sm">© MemeMint 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 