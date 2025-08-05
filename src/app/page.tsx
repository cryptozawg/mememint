'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Rocket, Crown } from 'lucide-react';
import TokenLaunchForm from '@/components/TokenLaunchForm';
import SuccessPage from '@/components/SuccessPage';
import Image from 'next/image';

export default function Home() {
  const { connected } = useWallet();
  const [showLaunchForm, setShowLaunchForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tokenData, setTokenData] = useState<any>(null);

  const scrollToLaunch = () => {
    setShowLaunchForm(true);
    setTimeout(() => {
      const element = document.getElementById('launch-form');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLaunchSuccess = (data: any) => {
    setTokenData(data);
    setShowSuccess(true);
  };

  const handleLaunchAnother = () => {
    setShowSuccess(false);
    setShowLaunchForm(false);
    setTokenData(null);
  };

  if (showSuccess && tokenData) {
    return <SuccessPage tokenData={tokenData} onLaunchAnother={handleLaunchAnother} />;
  }

  if (showLaunchForm) {
    return <TokenLaunchForm onSuccess={handleLaunchSuccess} />;
  }

  return (
    <div className="min-h-screen dark-theme relative overflow-hidden">
      {/* Floating 3D Coins - Top Layer */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="floating-coin absolute top-32 left-16"
        >
          <Image
            src="/assets/Solana 3d coin image.png"
            alt="Solana Coin"
            width={120}
            height={120}
            className="w-30 h-30"
          />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="floating-coin absolute top-48 right-20"
        >
          <Image
            src="/assets/Shina Inu 3d image.webp"
            alt="Shina Inu"
            width={100}
            height={100}
            className="w-25 h-25"
          />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="floating-coin absolute bottom-32 left-24"
        >
          <Image
            src="/assets/bonk 3d image.webp"
            alt="Bonk"
            width={110}
            height={110}
            className="w-28 h-28"
          />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 35, 0],
            rotate: [0, -12, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="floating-coin absolute bottom-48 right-16"
        >
          <Image
            src="/assets/Solana 3d coin image.png"
            alt="Solana Coin"
            width={90}
            height={90}
            className="w-23 h-23"
          />
        </motion.div>
      </div>

      {/* Professional Pill Navigation - Full Width */}
      <nav className="fixed top-0 w-full z-40">
        <div className="nav-glass max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/FINAL MEMEMINT LOGO.png"
              alt="MemeMint Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-bold gradient-text">MemeMint</span>
          </div>
          <WalletMultiButton className="btn-primary !py-2 !px-4 !text-sm" />
        </div>
      </nav>

      {/* Hero Section - Perfectly Centered */}
      <section className="pt-32 pb-12 px-4 relative z-10">
        <div className="w-full max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 px-6 py-3 rounded-full mb-8 backdrop-blur-sm">
              <Crown className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">The number 1 memecoin launcher</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-normal mb-6 leading-tight text-center">
              Mint your Solana Memecoin in{' '}
              <span className="gradient-text font-medium">seconds</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed text-center">
              No code. No hustle. Just money earnt.
            </p>
          </motion.div>

          {/* Earnings Screenshot - Perfectly Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full flex justify-center mb-16"
          >
            <Image
              src="/assets/EarningsScreenshotmememint.png"
              alt="MemeMint Earnings"
              width={600}
              height={320}
              className="rounded-2xl shadow-2xl mx-auto"
            />
          </motion.div>

          {/* Frosted Pill Slider Button - Longer and Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToLaunch}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 w-80 h-16 flex items-center justify-between overflow-hidden group"
            >
              <motion.div
                className="absolute left-2 top-2 bottom-2 bg-white rounded-full flex items-center justify-center px-8 shadow-lg"
                whileHover={{ x: 120 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="text-black font-semibold">Get Started</span>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 font-medium text-lg">Get Started</span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-darker py-16 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Image
                src="/assets/FINAL MEMEMINT LOGO.png"
                alt="MemeMint Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-3xl font-bold gradient-text">MemeMint</span>
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              The number 1 memecoin launcher on Solana
            </p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
