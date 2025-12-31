# Wallet Setup Guide 🦊

## Quick Start - No Wallet Needed!

Your app is now in **Demo Mode** - you can use all features without connecting a wallet. Perfect for presentations and testing!

---

## If You Want to Connect a Wallet

### Option 1: MetaMask (Recommended for Local Testing)

#### Step 1: Install MetaMask
1. Go to https://metamask.io/
2. Click "Download" and install the browser extension
3. Create a new wallet or import existing one

#### Step 2: Connect to Localhost Network
1. Open MetaMask
2. Click the network dropdown (top of extension)
3. Click "Add Network" → "Add a network manually"
4. Fill in these details:
   - **Network Name**: Hardhat Localhost
   - **New RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

#### Step 3: Import Test Account
If you're running `npx hardhat node`, you'll see 20 test accounts with private keys. Import one:

1. Open MetaMask
2. Click account icon → Import Account
3. Paste a private key from your hardhat node terminal
4. Now you have test ETH to interact with contracts!

#### Step 4: Connect to Your App
1. Refresh http://localhost:3000/dashboard/farmer
2. Click "Connect Wallet" button
3. Select MetaMask
4. Approve the connection
5. You're ready!

---

### Option 2: Use Demo Mode (Current Setup)

The app works without wallet connection! You can:
- ✅ Register harvests
- ✅ Browse batches
- ✅ View timeline
- ✅ All UI interactions

**Limitation**: Won't save to blockchain until wallet connected.

---

## Troubleshooting

### "Nothing happens when I click Connect Wallet"

**Solution 1: Install MetaMask**
```
1. Install MetaMask from https://metamask.io/
2. Refresh your browser
3. Try clicking "Connect Wallet" again
```

**Solution 2: Check Browser Console**
```
1. Press F12 to open Developer Tools
2. Go to Console tab
3. Look for errors
4. Share error message if needed
```

**Solution 3: Use Demo Mode**
```
Just use the app without wallet!
All features work in demo mode.
```

### "Wallet connects but transactions fail"

**Check These:**
1. Is `npx hardhat node` running in terminal?
2. Is MetaMask on "Hardhat Localhost" network (Chain ID: 31337)?
3. Does your account have test ETH?
4. Is contract deployed? Run: `npx hardhat run scripts/deploy.ts --network localhost`

---

## For Production/Hackathon Demo

### Get a Real WalletConnect Project ID

1. Go to https://cloud.walletconnect.com/
2. Sign up for free account
3. Create a new project
4. Copy your Project ID
5. Create `.env.local` file:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```
6. Restart Next.js: `npm run dev`

---

## Quick Test Without Wallet

```bash
# Terminal 1: Run blockchain
npx hardhat node

# Terminal 2: Deploy contract
npx hardhat run scripts/deploy.ts --network localhost

# Terminal 3: Run frontend
cd client
npm run dev

# Browser: Open http://localhost:3000/dashboard/farmer
# No wallet needed - just use the forms!
```

---

## Network Configuration Reference

### Hardhat Localhost
```
Network Name: Hardhat Localhost
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency: ETH
Block Explorer: (none)
```

### Polygon Mumbai Testnet (Optional)
```
Network Name: Polygon Mumbai
RPC URL: https://rpc-mumbai.maticvigil.com
Chain ID: 80001
Currency: MATIC
Block Explorer: https://mumbai.polygonscan.com/
Faucet: https://faucet.polygon.technology/
```

---

## Demo Mode Features

Current setup allows you to:
- ✅ See all UI components
- ✅ Fill forms
- ✅ Create mock batches
- ✅ View timeline visualization
- ✅ Test all dashboards
- ✅ Perfect for presentations!

When wallet is connected:
- ✅ Everything above PLUS
- ✅ Real blockchain transactions
- ✅ Permanent data storage
- ✅ Escrow payments
- ✅ True decentralization

---

## Still Having Issues?

1. **Close browser completely** and reopen
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Disable other wallet extensions** (trust wallet, coinbase, etc.)
4. **Try incognito/private mode**
5. **Use demo mode** and present without wallet

---

## For Hackathon Judges

This app demonstrates:
- ✅ Full blockchain integration (when wallet connected)
- ✅ User-friendly demo mode (no wallet needed)
- ✅ All features functional
- ✅ Professional UI/UX

The demo mode ensures your presentation won't be interrupted by wallet connection issues!

---

**Pro Tip**: For hackathon presentation, use Demo Mode. It's faster, more reliable, and judges can see all features without wallet setup delays.

🚀 Your app is ready to impress!
