'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, ExternalLink, CheckCircle, X } from 'lucide-react';

interface TokenData {
  name: string;
  symbol: string;
  address: string;
  transactionId: string;
  logo?: string;
}

interface SuccessNotificationProps {
  tokenData: TokenData;
  onClose: () => void;
}

export default function SuccessNotification({ tokenData, onClose }: SuccessNotificationProps) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      />

      {/* Notification Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-8 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-3xl z-50 bg-white/10 border border-white/20 rounded-3xl backdrop-blur-md p-12 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-green-200 to-emerald-300 bg-clip-text text-transparent">
            Your Memecoin is Live!
          </h2>
          <p className="text-gray-300 text-xl mb-12">
            Your token is now live on Solana Devnet and ready for trading
          </p>
          
          <div className="text-center flex flex-col items-center">
            {tokenData.logo && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                src={tokenData.logo}
                alt={tokenData.name}
                className="w-24 h-24 rounded-2xl mb-6 shadow-2xl border-2 border-white/20"
              />
            )}
            <h3 className="text-3xl font-bold text-white mb-4">{tokenData.name}</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              ${tokenData.symbol}
            </p>
          </div>
        </motion.div>

        {/* Token Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h4 className="text-white font-semibold mb-6 text-xl">Token Address</h4>
          <div className="flex items-center space-x-4">
            <code className="bg-black/30 px-6 py-4 rounded-xl text-base flex-1 break-all font-mono text-green-300 border border-white/10">
              {tokenData.address}
            </code>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(tokenData.address, 'address')}
              className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 p-4 rounded-xl transition-colors shrink-0"
              title="Copy address"
            >
              <Copy className="w-6 h-6 text-green-400" />
            </motion.button>
          </div>
          {copied === 'address' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-base mt-4 flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Copied to clipboard!
            </motion.p>
          )}
        </motion.div>

        {/* Transaction ID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h4 className="text-white font-semibold mb-6 text-xl">Transaction ID</h4>
          <div className="flex items-center space-x-4">
            <code className="bg-black/30 px-6 py-4 rounded-xl text-base flex-1 break-all font-mono text-green-300 border border-white/10">
              {tokenData.transactionId}
            </code>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(tokenData.transactionId, 'transaction')}
              className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 p-4 rounded-xl transition-colors shrink-0"
              title="Copy transaction ID"
            >
              <Copy className="w-6 h-6 text-green-400" />
            </motion.button>
          </div>
          {copied === 'transaction' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-base mt-4 flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Copied to clipboard!
            </motion.p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={`https://solscan.io/token/${tokenData.address}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/40 flex items-center justify-center space-x-3 py-4 px-8 rounded-2xl transition-all duration-300 text-white"
          >
            <ExternalLink className="w-6 h-6 text-gray-300" />
            <span className="font-semibold text-lg">View on Solscan</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </>
  );
} 