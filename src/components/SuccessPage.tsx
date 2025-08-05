'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, ExternalLink, Share2, CheckCircle, Rocket, Star, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TokenData {
  name: string;
  symbol: string;
  address: string;
  transactionId: string;
  logo?: string;
}

interface SuccessPageProps {
  tokenData: TokenData;
}

export default function SuccessPage({ tokenData }: SuccessPageProps) {
  const [copied, setCopied] = useState('');
  const [shareUrl] = useState(`https://solscan.io/token/${tokenData.address}?cluster=devnet`);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToTwitter = () => {
    const text = `🚀 Just launched ${tokenData.symbol} ($${tokenData.symbol}) on Solana using @MemeMint! 
    
🎯 Token: ${tokenData.name}
💎 Symbol: $${tokenData.symbol}
⚡ Network: Solana
🔥 Built with: MemeMint.app

#Solana #Memecoin #Crypto #DeFi`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Success Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 px-6 py-3 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-semibold">Token Launched Successfully!</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-green-200 to-emerald-300 bg-clip-text text-transparent"
          >
            Your Memecoin is Live!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Your token is now live on Solana Devnet and ready for trading
          </motion.p>
        </motion.div>

        {/* Token Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 backdrop-blur-md"
        >
          <div className="text-center mb-8">
            {tokenData.logo && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                src={tokenData.logo}
                alt={tokenData.name}
                className="w-32 h-32 mx-auto rounded-3xl mb-6 shadow-2xl border-4 border-white/20"
              />
            )}
            <h2 className="text-4xl font-bold mb-2 text-white">{tokenData.name}</h2>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              ${tokenData.symbol}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Token Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <Rocket className="w-5 h-5 mr-2 text-purple-400" />
                Token Address
              </h3>
              <div className="flex items-center space-x-3">
                <code className="bg-black/30 px-4 py-3 rounded-xl text-sm flex-1 break-all font-mono text-green-300 border border-white/10">
                  {tokenData.address}
                </code>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(tokenData.address, 'address')}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 p-3 rounded-xl transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-5 h-5 text-green-400" />
                </motion.button>
              </div>
              {copied === 'address' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-2 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Copied to clipboard!
                </motion.p>
              )}
            </motion.div>

            {/* Transaction ID */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <ExternalLink className="w-5 h-5 mr-2 text-purple-400" />
                Transaction ID
              </h3>
              <div className="flex items-center space-x-3">
                <code className="bg-black/30 px-4 py-3 rounded-xl text-sm flex-1 break-all font-mono text-green-300 border border-white/10">
                  {tokenData.transactionId}
                </code>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(tokenData.transactionId, 'transaction')}
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 p-3 rounded-xl transition-colors"
                  title="Copy transaction ID"
                >
                  <Copy className="w-5 h-5 text-green-400" />
                </motion.button>
              </div>
              {copied === 'transaction' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-2 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Copied to clipboard!
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 backdrop-blur-md"
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-white">Share Your Token</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={shareToTwitter}
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl transition-all duration-300"
            >
              <Share2 className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">Share on X</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => copyToClipboard(shareUrl, 'link')}
              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl transition-all duration-300"
            >
              <Copy className="w-6 h-6 text-green-400" />
              <span className="text-white font-semibold">
                {copied === 'link' ? 'Copied!' : 'Copy Link'}
              </span>
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl transition-all duration-300"
            >
              <ExternalLink className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">View on Solscan</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
        >
          <Link href="/launch">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-green-500/30 transition-all duration-300 flex items-center space-x-3"
            >
              <Rocket className="w-6 h-6" />
              <span className="text-lg">Launch Another Token</span>
            </motion.button>
          </Link>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-3"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="text-center bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
          >
            <Star className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">100%</div>
            <div className="text-gray-400 font-medium">Success Rate</div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="text-center bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
          >
            <Rocket className="w-12 h-12 mx-auto text-purple-400 mb-4" />
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">30s</div>
            <div className="text-gray-400 font-medium">Average Time</div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="text-center bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
          >
            <CheckCircle className="w-12 h-12 mx-auto text-green-400 mb-4" />
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">1000+</div>
            <div className="text-gray-400 font-medium">Tokens Launched</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 