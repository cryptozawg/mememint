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

      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/20 via-transparent to-green-600/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-green-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-green-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

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
    </div>
  );
} 