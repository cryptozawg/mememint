# 🚀 MemeMint - Solana Memecoin Launcher

The ultimate no-code Solana memecoin launcher. Launch your memecoin in 30 seconds with zero coding required.

## ✨ Features

- **No-Code Token Creation**: Create Solana tokens without any programming knowledge
- **Phantom Wallet Integration**: Seamless wallet connection and transaction signing
- **Professional UI/UX**: Modern, responsive design with smooth animations
- **Authority Management**: Optional authority revocation for enhanced security
- **Metadata Support**: Full token metadata with logos and descriptions
- **Instant Deployment**: Tokens are live on Solana in seconds
- **Shareable Links**: Easy sharing and verification on Solscan

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Animations**: Framer Motion
- **Wallet**: @solana/wallet-adapter (Phantom support)
- **Blockchain**: @solana/web3.js, @solana/spl-token
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Phantom wallet browser extension

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mememint
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 How to Use

### 1. Connect Your Wallet
- Click "Connect Wallet" in the top navigation
- Select Phantom wallet from the modal
- Approve the connection

### 2. Fill Token Details
- **Token Name**: Your token's full name (e.g., "DogeMoon")
- **Token Symbol**: 3-5 character ticker (e.g., "DOGE")
- **Total Supply**: Number of tokens to create
- **Description**: Brief description of your token
- **Logo**: Upload your token logo (optional)

### 3. Optional Metadata
- **Creator Info**: Your name or handle
- **Website**: Your project website
- **Telegram**: Your Telegram channel
- **Twitter**: Your X/Twitter handle

### 4. Authority Options
- **Revoke Freeze Authority**: Prevents freezing tokens (+0.005 SOL)
- **Revoke Mint Authority**: Prevents creating more tokens (+0.005 SOL)
- **Revoke Update Authority**: Locks metadata permanently (+0.005 SOL)
- **Revoke All**: Maximum security (+0.01 SOL)

### 5. Launch Your Token
- Review the cost summary
- Click "Launch My Token"
- Approve the transaction in Phantom
- Wait for confirmation

### 6. Success!
- View your token address and transaction ID
- Share on social media
- View on Solscan
- Launch another token

## 🔧 Development

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with wallet providers
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── WalletProvider.tsx # Solana wallet integration
│   ├── TokenLaunchForm.tsx # Main token creation form
│   └── SuccessPage.tsx   # Success page after token creation
└── services/             # Business logic
    └── tokenService.ts   # Solana token creation service
```

### Key Components

- **WalletProvider**: Manages Solana wallet connections
- **TokenLaunchForm**: Main form for token creation with validation
- **SuccessPage**: Displays token details and sharing options
- **TokenService**: Handles blockchain interactions

### Styling

The app uses TailwindCSS with custom gradients and animations:

- **Gradients**: Purple to blue theme matching Solana
- **Animations**: Framer Motion for smooth interactions
- **Responsive**: Mobile-first design
- **Custom Classes**: `.btn-primary`, `.card-hover`, `.text-gradient`

## 🔒 Security Features

- **Authority Revocation**: Optional security features
- **Transaction Validation**: Proper error handling
- **Wallet Integration**: Secure wallet connection
- **Input Validation**: Form validation and sanitization

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables

No environment variables required for basic functionality.

## 📊 Cost Breakdown

- **Base Token Creation**: 0.01 SOL
- **Revoke Freeze Authority**: +0.005 SOL
- **Revoke Mint Authority**: +0.005 SOL  
- **Revoke Update Authority**: +0.005 SOL
- **Revoke All Authorities**: +0.01 SOL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: Open an issue on GitHub
- **Discord**: Join our community

## 🎯 Roadmap

- [ ] Liquidity pool creation
- [ ] Presale functionality
- [ ] Airdrop tools
- [ ] Token analytics
- [ ] Multi-chain support
- [ ] Advanced metadata options

---

**Built with ❤️ for the Solana community**
