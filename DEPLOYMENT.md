# 🚀 MemeMint Deployment Guide

This guide covers how to deploy MemeMint to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Phantom wallet for testing

## 🎯 Vercel Deployment (Recommended)

### 1. Prepare Your Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your MemeMint repository
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

### 3. Environment Variables

No environment variables are required for basic functionality.

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## 🌐 Netlify Deployment

### 1. Build Locally

```bash
npm run build
```

### 2. Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag and drop your `out` folder or connect your Git repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

## 🐳 Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Build and Run

```bash
# Build the image
docker build -t mememint .

# Run the container
docker run -p 3000:3000 mememint
```

## 🔧 Local Production Build

### 1. Build the Application

```bash
npm run build
```

### 2. Start Production Server

```bash
npm start
```

## 🌍 Environment Configuration

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## 📊 Performance Optimization

### 1. Enable Compression

Add to `next.config.ts`:

```typescript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
};
```

### 2. Optimize Images

Use Next.js Image component for automatic optimization.

### 3. Enable Caching

Add cache headers in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 🔒 Security Considerations

### 1. Content Security Policy

Add CSP headers in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

### 2. HTTPS Only

Ensure your hosting provider supports HTTPS.

## 🧪 Testing Before Deployment

### 1. Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test wallet connection
# Test form validation
# Test token creation flow
```

### 2. Production Build Testing

```bash
# Build the application
npm run build

# Start production server
npm start

# Test all functionality
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Wallet Connection Issues**
   - Ensure Phantom wallet is installed
   - Check network configuration
   - Verify wallet adapter setup

3. **Transaction Failures**
   - Check Solana network status
   - Verify wallet has sufficient SOL
   - Check transaction logs

### Debug Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📈 Monitoring

### 1. Vercel Analytics

Enable Vercel Analytics in your dashboard.

### 2. Error Tracking

Consider adding Sentry or similar error tracking.

### 3. Performance Monitoring

Use Vercel's built-in performance monitoring.

## 🎯 Post-Deployment Checklist

- [ ] Test wallet connection
- [ ] Test token creation flow
- [ ] Verify form validation
- [ ] Check mobile responsiveness
- [ ] Test authority revocation options
- [ ] Verify success page functionality
- [ ] Test sharing features
- [ ] Check console for errors
- [ ] Verify Solana network connectivity

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review the console for errors
3. Test on different browsers
4. Verify wallet compatibility
5. Check Solana network status

---

**Happy Deploying! 🚀** 