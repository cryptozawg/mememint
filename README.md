# 🚀 MemeMint - Solana Memecoin Launcher

The leading no-code Solana memecoin launcher. Create and deploy SPL tokens in seconds with a beautiful, professional interface.

## ✨ Features

- 🎯 **No-Code Token Creation** - Launch Solana tokens without coding
- 🔗 **Phantom Wallet Integration** - Seamless wallet connection
- 💰 **Authority Revocation Options** - Professional token controls
- 🎨 **Modern UI/UX** - Clean, dark theme with green accents
- ⚡ **Instant Deployment** - Deploy to Solana Devnet in 2 transactions
- 🔍 **Solscan Integration** - Direct blockchain verification links

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Blockchain**: Solana Web3.js, SPL Token
- **Wallet**: Solana Wallet Adapter (Phantom)

## 🚀 Quick Deploy

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy automatically!

3. **Add Custom Domain:**
   - In Vercel dashboard → Settings → Domains
   - Add your domain (e.g., `mememint.xyz`)
   - Follow DNS instructions

### Option 2: Netlify

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - "New site from Git"
   - Connect GitHub repo

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 3: Self-Hosted

1. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

2. **Docker Deployment:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

## 💰 Suggested Domains

- `mememint.com` / `.io` / `.xyz`
- `solanamint.com`
- `tokenlauncher.io`
- `memecoinmaker.xyz`

## 🔧 Configuration

### Environment Variables (Optional)
Create `.env.local`:
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PAYMENT_WALLET=543pQyP9nm3XYkUFDYKxCKUkWFeu1dud7eV5nexuvKgq
```

### Network Settings
- Currently configured for **Solana Devnet**
- Payment wallet: `543pQyP9nm3XYkUFDYKxCKUkWFeu1dud7eV5nexuvKgq`
- Base token creation fee: **0.07 SOL**
- Authority revocation: **+0.01 SOL each**

## 📱 Production Checklist

- ✅ Build successful
- ✅ Wallet integration tested
- ✅ Token creation functional
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Success notifications

## 🎯 Next Steps

1. **Deploy to Production**
2. **Set up Custom Domain**
3. **Add Analytics** (Google Analytics, Plausible)
4. **Add SEO Optimization**
5. **Consider Mainnet Migration**

## 🔒 Security Notes

- All transactions require user wallet approval
- No private keys stored
- Client-side only wallet interactions
- Payment wallet configured for fee collection

## 📞 Support

For deployment issues or questions:
- Check build logs
- Verify wallet connections
- Test on Devnet first
- Monitor Solscan for transactions

---

**Ready for Launch!** 🚀 Your memecoin empire awaits!
