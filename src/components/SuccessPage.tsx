'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, ExternalLink, Share2, CheckCircle, Rocket, Star, Sparkles } from 'lucide-react';

interface TokenData {
  name: string;
  symbol: string;
  address: string;
  transactionId: string;
  logo?: string;
}

interface SuccessPageProps {
  tokenData: TokenData;
  onLaunchAnother: () => void;
}

export default function SuccessPage({ tokenData, onLaunchAnother }: SuccessPageProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl] = useState(`https://solscan.io/token/${tokenData.address}`);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToTwitter = () => {
    const text = `🚀 Just launched ${tokenData.symbol} on Solana! Check it out: ${shareUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Token Launched Successfully!</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-green-600">Your Memecoin is Live!</h1>
          <p className="text-xl text-gray-600">Your token is now live on Solana and ready for trading</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="modern-card p-8 mb-8 shadow-xl"
        >
          <div className="text-center mb-8">
            {tokenData.logo && (
              <img src={tokenData.logo} alt={tokenData.name} className="w-24 h-24 mx-auto rounded-2xl mb-4 shadow-lg" />
            )}
            <h2 className="text-3xl font-bold mb-2">{tokenData.name}</h2>
            <p className="text-2xl font-semibold gradient-text mb-4">{tokenData.symbol}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="modern-card p-6 bg-gradient-to-r from-gray-50 to-blue-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-purple-600" />
                Token Address
              </h3>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-3 py-2 rounded-lg text-sm flex-1 break-all font-mono">
                  {tokenData.address}
                </code>
                <button
                  onClick={() => copyToClipboard(tokenData.address)}
                  className="btn-secondary p-2"
                  title="Copy address"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="modern-card p-6 bg-gradient-to-r from-gray-50 to-blue-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-purple-600" />
                Transaction ID
              </h3>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-3 py-2 rounded-lg text-sm flex-1 break-all font-mono">
                  {tokenData.transactionId}
                </code>
                <button
                  onClick={() => copyToClipboard(tokenData.transactionId)}
                  className="btn-secondary p-2"
                  title="Copy transaction ID"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {copied && (
                <span className="text-green-600 font-medium">✓ Copied to clipboard!</span>
              )}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="modern-card p-8 mb-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Share Your Token</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={shareToTwitter}
              className="btn-secondary flex items-center justify-center space-x-2 modern-card-hover"
            >
              <Share2 className="w-5 h-5" />
              <span>Share on X</span>
            </button>
            <button
              onClick={() => copyToClipboard(shareUrl)}
              className="btn-secondary flex items-center justify-center space-x-2 modern-card-hover"
            >
              <Copy className="w-5 h-5" />
              <span>Copy Link</span>
            </button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center space-x-2 modern-card-hover"
            >
              <ExternalLink className="w-5 h-5" />
              <span>View on Solscan</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={onLaunchAnother}
            className="btn-primary text-lg px-8 py-4 shadow-lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Launch Another Token
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center modern-card p-6 modern-card-hover">
            <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
            <div className="text-2xl font-bold gradient-text">100%</div>
            <div className="text-gray-600 font-medium">Success Rate</div>
          </div>
          <div className="text-center modern-card p-6 modern-card-hover">
            <Rocket className="w-8 h-8 mx-auto text-purple-500 mb-2" />
            <div className="text-2xl font-bold gradient-text">30s</div>
            <div className="text-gray-600 font-medium">Average Time</div>
          </div>
          <div className="text-center modern-card p-6 modern-card-hover">
            <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <div className="text-2xl font-bold gradient-text">1000+</div>
            <div className="text-gray-600 font-medium">Tokens Launched</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 