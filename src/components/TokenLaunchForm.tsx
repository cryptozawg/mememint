'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Upload, X, Copy, ExternalLink, Shield, Lock, Unlock, ArrowLeft, Rocket, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface TokenFormData {
  name: string;
  symbol: string;
  supply: number;
  description: string;
  creator: string;
  website: string;
  telegram: string;
  twitter: string;
  logo: File | null;
  revokeFreeze: boolean;
  revokeMint: boolean;
  revokeUpdate: boolean;
  revokeAll: boolean;
}

interface TokenLaunchFormProps {
  onSuccess: (data: any) => void;
}

export default function TokenLaunchForm({ onSuccess }: TokenLaunchFormProps) {
  const { connected } = useWallet();
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    supply: 1000000,
    description: '',
    creator: '',
    website: '',
    telegram: '',
    twitter: '',
    logo: null,
    revokeFreeze: false,
    revokeMint: false,
    revokeUpdate: false,
    revokeAll: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof TokenFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, logo: null }));
    setLogoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const calculateTotalCost = () => {
    let cost = 0.01; // Base cost
    if (formData.revokeFreeze) cost += 0.005;
    if (formData.revokeMint) cost += 0.005;
    if (formData.revokeUpdate) cost += 0.005;
    if (formData.revokeAll) cost += 0.01;
    return cost;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }
    
    setIsLoading(true);
    // TODO: Implement actual token creation logic
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful token creation
      onSuccess({
        name: formData.name,
        symbol: formData.symbol,
        address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        transactionId: '5KKs8UQKqH1GUkoh5LueNGWDiVq1uD4gqjJTb4rrfU3x',
        logo: logoPreview
      });
    }, 3000);
  };

  return (
    <div id="launch-form" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6">
            <Image
              src="/assets/FINAL MEMEMINT LOGO.png"
              alt="MemeMint Logo"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Token Creation</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Launch Your Memecoin</h1>
          <p className="text-xl text-gray-600">Fill in the details and launch your token in seconds</p>
        </motion.div>

        {!connected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modern-card p-6 mb-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-gray-600 mb-4">Connect your Phantom wallet to get started</p>
            <WalletMultiButton className="btn-primary" />
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="modern-card p-8 shadow-xl"
        >
          {/* Basic Token Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Rocket className="w-6 h-6 mr-3 text-purple-600" />
              Token Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Token Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  placeholder="e.g., DogeMoon"
                  required
                />
              </div>
              <div>
                <label className="form-label">Token Symbol *</label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  className="form-input"
                  placeholder="e.g., DOGE"
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <label className="form-label">Total Supply *</label>
                <input
                  type="number"
                  value={formData.supply}
                  onChange={(e) => handleInputChange('supply', parseInt(e.target.value))}
                  className="form-input"
                  placeholder="1000000"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="form-input"
                  placeholder="Tell us about your token..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-3 text-purple-600" />
              Token Logo
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors">
              {logoPreview ? (
                <div className="space-y-4">
                  <img src={logoPreview} alt="Logo preview" className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg" />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="btn-secondary"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove Logo
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-gray-600 mb-4">Upload your token logo</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary"
                  >
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Optional Metadata */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <ExternalLink className="w-6 h-6 mr-3 text-purple-600" />
              Optional Metadata
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Creator Info</label>
                <input
                  type="text"
                  value={formData.creator}
                  onChange={(e) => handleInputChange('creator', e.target.value)}
                  className="form-input"
                  placeholder="Your name or handle"
                />
              </div>
              <div>
                <label className="form-label">Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="form-input"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label className="form-label">Telegram</label>
                <input
                  type="text"
                  value={formData.telegram}
                  onChange={(e) => handleInputChange('telegram', e.target.value)}
                  className="form-input"
                  placeholder="@yourchannel"
                />
              </div>
              <div>
                <label className="form-label">X (Twitter)</label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="form-input"
                  placeholder="@yourhandle"
                />
              </div>
            </div>
          </div>

          {/* Authority Options */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-purple-600" />
              Security Options
            </h2>
            <div className="space-y-4">
              <div className="modern-card p-6 modern-card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Revoke Freeze Authority</h3>
                      <p className="text-sm text-gray-600">Prevent anyone from freezing your token</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">+0.005 SOL</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.revokeFreeze}
                        onChange={(e) => handleInputChange('revokeFreeze', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modern-card p-6 modern-card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Unlock className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Revoke Mint Authority</h3>
                      <p className="text-sm text-gray-600">Prevent additional tokens from being created</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">+0.005 SOL</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.revokeMint}
                        onChange={(e) => handleInputChange('revokeMint', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modern-card p-6 modern-card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Revoke Update Authority</h3>
                      <p className="text-sm text-gray-600">Lock metadata permanently</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">+0.005 SOL</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.revokeUpdate}
                        onChange={(e) => handleInputChange('revokeUpdate', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modern-card p-6 modern-card-hover bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Revoke All Authorities</h3>
                      <p className="text-sm text-gray-600">Maximum security - revoke all authorities at once</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">+0.01 SOL</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={formData.revokeAll}
                        onChange={(e) => handleInputChange('revokeAll', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="mb-8 modern-card p-6 bg-gradient-to-r from-gray-50 to-blue-50">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Cost Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base token creation:</span>
                <span>0.01 SOL</span>
              </div>
              {formData.revokeFreeze && (
                <div className="flex justify-between">
                  <span>Revoke freeze authority:</span>
                  <span>+0.005 SOL</span>
                </div>
              )}
              {formData.revokeMint && (
                <div className="flex justify-between">
                  <span>Revoke mint authority:</span>
                  <span>+0.005 SOL</span>
                </div>
              )}
              {formData.revokeUpdate && (
                <div className="flex justify-between">
                  <span>Revoke update authority:</span>
                  <span>+0.005 SOL</span>
                </div>
              )}
              {formData.revokeAll && (
                <div className="flex justify-between">
                  <span>Revoke all authorities:</span>
                  <span>+0.01 SOL</span>
                </div>
              )}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Cost:</span>
                  <span className="gradient-text">{calculateTotalCost().toFixed(3)} SOL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!connected || isLoading}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Launching Token...
              </span>
            ) : (
              <>
                <Rocket className="w-5 h-5 mr-2" />
                Launch My Token
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
} 