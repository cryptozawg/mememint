'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Upload, X, Shield } from 'lucide-react';

interface TokenFormData {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  description: string;
  creator: string;
  website: string;
  telegram: string;
  twitter: string;
  logo: File | null;
  revokeFreeze: boolean;
  revokeMint: boolean;
  // Note: revokeUpdate removed - not applicable to SPL tokens
  revokeAll: boolean;
}

interface TokenLaunchFormProps {
  onSuccess: (data: any) => void;
}

export default function TokenLaunchForm({ onSuccess }: TokenLaunchFormProps) {
  const { connected, wallet, publicKey, sendTransaction, signTransaction, signAllTransactions, connect } = useWallet();
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    decimals: 9,
    supply: 1000000000,
    description: '',
    creator: '',
    website: '',
    telegram: '',
    twitter: '',
    logo: null,
    revokeFreeze: false,
    revokeMint: false,
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
    let cost = 0.07; // Base cost updated to 0.07 SOL
    if (formData.revokeFreeze) cost += 0.01;
    if (formData.revokeMint) cost += 0.01;
    // Note: revokeUpdate is not applicable to SPL tokens
    return cost;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
          console.log('Wallet state:', { 
        connected, 
        publicKey: publicKey?.toString(), 
        wallet: !!wallet,
        sendTransaction: !!sendTransaction,
        signTransaction: !!signTransaction 
      });
    
    if (!connected || !publicKey) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!sendTransaction) {
      alert('Wallet does not support required functionality. Please try reconnecting.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Import the token service
      const { TokenService } = await import('@/services/tokenService');
      const tokenService = new TokenService();
      
      // Create a wallet adapter object with all required methods
      const walletAdapter = {
        publicKey,
        sendTransaction,
        signTransaction,
        signAllTransactions
      };
      
      // Create the token
      const result = await tokenService.createToken(walletAdapter, {
        ...formData,
        logo: formData.logo || undefined
      });
      
      // Success - call the onSuccess callback
      onSuccess({
        name: formData.name,
        symbol: formData.symbol,
        address: result.tokenAddress,
        transactionId: result.transactionId,
        logo: logoPreview
      });
    } catch (error) {
      console.error('Token creation failed:', error);
      console.error('Full error object:', error);
      
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      alert(`Token creation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Connect Your Wallet</h3>
          <p className="text-gray-400 mb-8 text-lg">Connect your Phantom wallet to start creating your token</p>
          <WalletMultiButton className="btn-primary !py-4 !px-8 !text-lg" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          {/* Basic Token Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{marginBottom: '30px'}}>
            {/* Token Name */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Token Name*</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="Luna Coin"
                  required
                />
              </div>
              <p className="text-gray-500 text-sm font-light text-center" style={{marginTop: '30px'}}>Max 32 characters in your name</p>
            </div>

            {/* Token Symbol */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Token Symbol*</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="Ex: SOL"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Decimals */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Decimals*</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="number"
                  value={formData.decimals}
                  onChange={(e) => handleInputChange('decimals', parseInt(e.target.value))}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="9"
                  min="0"
                  max="9"
                  required
                />
              </div>
              <p className="text-gray-500 text-sm font-light text-center" style={{marginTop: '30px'}}>Change the number of decimals for your token</p>
            </div>

            {/* Supply */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Supply*</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="number"
                  value={formData.supply}
                  onChange={(e) => handleInputChange('supply', parseInt(e.target.value))}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="1 000 000 000"
                  min="1"
                  required
                />
              </div>
              <p className="text-gray-500 text-sm font-light text-center" style={{marginTop: '30px'}}>The initial number of available tokens that will be created in your wallet</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col items-center" style={{marginBottom: '30px'}}>
            <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Description</label>
            <div className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-center">
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none resize-none text-center"
                placeholder="Tell the world about your amazing token..."
                rows={4}
              />
            </div>
          </div>

          {/* Creator Info and Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{marginBottom: '30px'}}>
            {/* Creator Info */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Creator Info</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="text"
                  value={formData.creator}
                  onChange={(e) => handleInputChange('creator', e.target.value)}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="Your name or handle"
                />
              </div>
            </div>

            {/* Website */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Website URL</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Telegram */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Telegram</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="text"
                  value={formData.telegram}
                  onChange={(e) => handleInputChange('telegram', e.target.value)}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="@yourchannel"
                />
              </div>
            </div>

            {/* Twitter */}
            <div className="flex flex-col items-center">
              <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>X (Twitter)</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-center">
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="w-full bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none text-center"
                  placeholder="@yourhandle"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col items-center" style={{marginBottom: '30px'}}>
            <label className="block text-white text-lg font-normal text-center" style={{marginBottom: '30px'}}>Token Logo (Optional)</label>
            <div className="w-full border-2 border-dashed border-white/20 rounded-3xl p-16 text-center hover:border-green-500/50 transition-colors">
              {logoPreview ? (
                <div className="space-y-6">
                  <img src={logoPreview} alt="Logo preview" className="w-32 h-32 mx-auto rounded-3xl object-cover" />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center justify-center mx-auto text-lg"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Remove Logo
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center mb-6">
                    <Upload className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-400 mb-6 text-xl">Upload your token logo</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl transition-colors text-lg"
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



          {/* Revoke Authorities Section */}
          <div style={{marginTop: '30px'}}>
            <h2 className="text-2xl font-normal text-white" style={{marginBottom: '30px'}}>Revoke Authorities (Investor's Booster)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{marginBottom: '30px'}}>
              {/* Revoke Freeze */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between" style={{marginBottom: '30px'}}>
                  <h3 className="text-lg font-normal text-white">Revoke Freeze</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={formData.revokeFreeze}
                      onChange={(e) => handleInputChange('revokeFreeze', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p className="text-gray-400 text-sm font-light" style={{marginBottom: '30px'}}>No one will be able to freeze holders' token accounts anymore</p>
                <span className="text-lg text-white font-normal">+0.01 SOL</span>
              </div>

              {/* Revoke Mint */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between" style={{marginBottom: '30px'}}>
                  <h3 className="text-lg font-normal text-white">Revoke Mint</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={formData.revokeMint}
                      onChange={(e) => handleInputChange('revokeMint', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <p className="text-gray-400 text-sm font-light" style={{marginBottom: '30px'}}>No one will be able to create more tokens anymore</p>
                <span className="text-lg text-white font-normal">+0.01 SOL</span>
              </div>
            </div>

            <p className="text-gray-400 text-center text-base font-light" style={{marginBottom: '30px'}}>
              Solana Token has 3 authorities: Freeze Authority, Mint Authority, and Update Authority. Revoke them to attract more investors.
            </p>
          </div>

          {/* Cost Summary */}
          <div className="bg-white/5 border border-white/10 rounded-3xl px-16 py-12" style={{marginTop: '30px'}}>
            <h3 className="text-2xl font-normal text-white text-center" style={{marginBottom: '30px'}}>Cost Summary</h3>
            <div className="text-lg font-light px-4">
              <div className="flex justify-between text-gray-300" style={{marginBottom: '30px'}}>
                <span>Base token creation:</span>
                <span className="font-normal">0.07 SOL</span>
              </div>
              {formData.revokeFreeze && (
                <div className="flex justify-between text-gray-300" style={{marginBottom: '30px'}}>
                  <span>Revoke freeze authority:</span>
                  <span className="font-normal">+0.01 SOL</span>
                </div>
              )}
              {formData.revokeMint && (
                <div className="flex justify-between text-gray-300" style={{marginBottom: '30px'}}>
                  <span>Revoke mint authority:</span>
                  <span className="font-normal">+0.01 SOL</span>
                </div>
              )}

              <div className="border-t border-white/20" style={{paddingTop: '30px', marginTop: '30px'}}>
                <div className="flex justify-between font-normal text-2xl">
                  <span className="text-white">Total Cost:</span>
                  <span className="gradient-text">{calculateTotalCost().toFixed(2)} SOL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Button - Matching Homepage Style */}
          <div className="flex justify-center mb-32" style={{marginTop: '50px'}}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 h-16 flex items-center overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ width: '400px' }}
            >
              <motion.div
                className="absolute left-3 top-3 bottom-3 bg-white rounded-full flex items-center justify-center shadow-lg w-10"
                whileHover={{ x: isLoading ? 0 : 330 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {isLoading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Token...
                    </span>
                  ) : (
                    'Launch My Token'
                  )}
                </span>
              </div>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
} 