'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
// Removed unused imports
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {

  return (
    <div className="min-h-screen dark-theme relative overflow-hidden">
      {/* Empty space at top for fixed header */}
      <div className="h-32"></div>
      
      {/* Main Container with Perfect Centering */}
      <div className="w-full">
        {/* Professional Pill Navigation - Fixed Header */}
        <header className="fixed top-0 w-full z-50 py-8">
          <div className="flex justify-center">
                    <div className="nav-glass flex justify-between items-center">
                      <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
            <Image
              src="/assets/FINAL MEMEMINT LOGO.png"
              alt="MemeMint Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
                          <span className="text-lg font-bold gradient-text">MemeMint</span>
            </Link>
              <WalletMultiButton className="btn-primary" />
            </div>
          </div>
        </header>

        {/* Hero Section - Perfectly Centered */}
        <main className="relative z-10 pt-8">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 px-20 py-6 rounded-full mb-8 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">#1</span>
                <span className="text-sm font-normal text-white">The leading Memecoin Launcher</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-center">
                Mint your Solana Memecoin<br />
                in{' '}
                <span className="gradient-text font-medium">seconds</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
                No code. No hustle. Just money earnt.
              </p>
            </motion.div>

            {/* Earnings Screenshot with Fixed 3D Coins Around It */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative flex justify-center items-center mb-16"
            >
              {/* 3D Coins - Only Left and Right Sides (2 on each side) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Left side - top coin */}
                <div className="absolute top-1/4 -left-16 transform -translate-y-1/2">
                  <Image
                    src="/assets/Solana 3d coin image.png"
                    alt="Solana Coin"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
                {/* Left side - bottom coin */}
                <div className="absolute top-3/4 -left-16 transform -translate-y-1/2">
                  <Image
                    src="/assets/bonk 3d image.webp"
                    alt="Bonk"
                    width={75}
                    height={75}
                    className="w-19 h-19"
                  />
                </div>
                {/* Right side - top coin */}
                <div className="absolute top-1/4 -right-16 transform -translate-y-1/2">
                  <Image
                    src="/assets/Shina Inu 3d image.webp"
                    alt="Shina Inu"
                    width={70}
                    height={70}
                    className="w-18 h-18"
                  />
                </div>
                {/* Right side - bottom coin */}
                <div className="absolute top-3/4 -right-16 transform -translate-y-1/2">
                  <Image
                    src="/assets/Solana 3d coin image.png"
                    alt="Solana Coin"
                    width={65}
                    height={65}
                    className="w-16 h-16"
                  />
                </div>
              </div>
              
              <Image
                src="/assets/EarningsScreenshotmememint.png"
                alt="MemeMint Earnings"
                width={600}
                height={320}
                className="relative z-10"
              />
            </motion.div>

            {/* Get Started Button - Same width as earnings image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center items-center"
            >
              <motion.a
                href="/launch"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 h-16 flex items-center overflow-hidden group"
                style={{ width: '600px' }}
              >
                <motion.div
                  className="absolute left-3 top-3 bottom-3 bg-white rounded-full flex items-center justify-center shadow-lg w-10"
                  whileHover={{ x: 530 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Get Started</span>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </main>

        {/* Bottom Section */}
        <section className="relative z-10 px-4" style={{ marginTop: '65px' }}>
          {/* Description Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex justify-center"
            style={{ marginBottom: '65px' }}
          >
            <div className="text-center max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-normal text-white" style={{ marginBottom: '50px' }}>
                What is <span className="gradient-text">MemeMint</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                MemeMint is the world's most advanced no-code Solana token launcher. Create, deploy, and manage your memecoin empire with just a few clicks. No technical knowledge required – just pure creative energy and entrepreneurial spirit.
              </p>
            </div>
          </motion.div>

          {/* Stats Section - Centered and Simple */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex justify-center mb-64"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
              {/* Tokens Launched */}
              <div className="space-y-8">
                <div className="text-5xl font-light gradient-text">15,000+</div>
                <div className="text-xl font-medium text-white">Tokens Launched</div>
                <div className="text-gray-400 font-light">Successful memecoins created by our community</div>
              </div>

              {/* Money Made */}
              <div className="space-y-8">
                <div className="text-5xl font-light gradient-text">$250M+</div>
                <div className="text-xl font-medium text-white">Total Market Cap</div>
                <div className="text-gray-400 font-light">Combined value of all launched tokens</div>
              </div>

              {/* Active Users */}
              <div className="space-y-8">
                <div className="text-5xl font-light gradient-text">50K+</div>
                <div className="text-xl font-medium text-white">Active Creators</div>
                <div className="text-gray-400 font-light">Entrepreneurs building their crypto empire</div>
              </div>
            </div>
          </motion.div>

          {/* Comparison Section - Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full flex justify-center"
            style={{ marginTop: '65px', marginBottom: '65px' }}
          >
            <div className="max-w-6xl w-full px-4">
              {/* Comparison Image */}
              <div className="flex justify-center">
                <Image
                  src="/assets/comparison.png"
                  alt="MemeMint Platform Comparison"
                  width={1200}
                  height={600}
                  className="w-full max-w-5xl h-auto rounded-2xl"
                />
              </div>

              {/* Call to Action Text */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16"
              >
                <p className="text-2xl md:text-3xl text-white font-bold">
                  So start today, and get <span className="gradient-text">fuck you money</span> rich.
                </p>
              </motion.div>
            </div>
          </motion.div>



          
        </section>
      </div>

      {/* Footer - Minimal */}
      <footer className="py-8 relative z-10 mt-24">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/FINAL MEMEMINT LOGO.png"
              alt="MemeMint Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-gray-400 text-sm">© MemeMint 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
