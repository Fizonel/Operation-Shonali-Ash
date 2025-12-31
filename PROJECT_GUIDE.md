# ShonaliChain - স্বচ্ছ কৃষি সরবরাহ চেইন 🌾

## Transparent Agricultural Supply Chain for Bangladesh

A blockchain-based supply chain solution for agricultural products (Jute & Potato) from Bogura and Munshiganj regions, built for BlockChain Bangladesh 2025 Hackathon.

---

## 🎯 Problem Statement

- **Middlemen exploitation**: Farmers receive unfair prices
- **Hoarding**: Artificial price inflation by wholesalers
- **Lack of transparency**: Consumers can't verify product origin
- **Payment risks**: No secure escrow for transactions

## ✨ Our Solution

ShonaliChain provides:
- **Blockchain transparency**: Immutable supply chain records
- **Anti-hoarding detection**: Flags batches held > 3 days
- **Escrow payments**: Funds released only after delivery confirmation
- **Origin traceability**: QR code-based tracking from farm to consumer
- **Fair pricing**: Direct farmer-to-market connection

---

## 🏗️ Tech Stack

### Backend (Smart Contracts)
- **Solidity** ^0.8.28
- **Hardhat** ^2.19.0
- **OpenZeppelin Contracts** (Ownable, Security)
- **TypeScript** for deployment scripts

### Frontend
- **Next.js** 14.2.0 (App Router)
- **React** 18.x
- **TypeScript**
- **Tailwind CSS** for styling
- **RainbowKit** ^2.2.10 (Wallet connection)
- **Wagmi** ^2.19.5 (Web3 hooks)
- **Viem** ^2.43.3 (Ethereum interactions)
- **Lucide React** (Modern icons)

---

## 📦 Project Structure

```
Operation Shonali Ash/
├── contracts/
│   ├── ShonaliChain.sol       # Main supply chain contract
│   └── Lock.sol                # Sample contract (generated)
├── client/
│   └── src/
│       ├── app/
│       │   ├── page.tsx        # Landing page
│       │   └── dashboard/
│       │       ├── farmer/     # Farmer dashboard
│       │       ├── wholesaler/ # Wholesaler dashboard
│       │       └── consumer/   # Consumer dashboard
│       ├── components/
│       │   └── Timeline.tsx    # Supply chain timeline
│       ├── providers/
│       │   └── Web3Provider.tsx # RainbowKit setup
│       └── lib/
│           └── constants.ts    # Mock data (Bogura/Munshiganj)
├── ignition/
│   └── modules/               # Deployment scripts
├── test/                      # Contract tests
├── hardhat.config.ts
└── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet

### 1. Clone the Repository
```bash
cd "c:\Users\Seam\Desktop\L4 T1\Hackathon\BlockChain\Operation Shonali Ash"
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
```

### 4. Configure Environment Variables

Create `.env` in the root directory:
```env
# For testnet deployment (optional)
PRIVATE_KEY=your_private_key_here
POLYGONSCAN_API_KEY=your_api_key_here
```

---

## 🔧 Usage

### Backend (Smart Contracts)

#### Compile Contracts
```bash
npx hardhat compile
```

#### Run Tests
```bash
npx hardhat test
```

#### Deploy to Local Network
```bash
npx hardhat node
# In another terminal:
npx hardhat run scripts/deploy.ts --network localhost
```

#### Deploy to Polygon Amoy Testnet
```bash
npx hardhat run scripts/deploy.ts --network polygonAmoy
```

### Frontend (Next.js Client)

#### Development Server
```bash
cd client
npm run dev
```

Visit: `http://localhost:3000`

#### Production Build
```bash
npm run build
npm run start
```

---

## 📱 Features by Dashboard

### 👨‍🌾 Farmer Dashboard (`/dashboard/farmer`)
- Register new harvests (Jute/Potato)
- Select district (Bogura/Munshiganj) and specific locations
- Set quantity and price
- Track all created batches
- **Bangla UI** for ease of use

### 🏪 Wholesaler Dashboard (`/dashboard/wholesaler`)
- View available batches in table format
- Price trend charts (Jute vs Potato)
- Hoarding status alerts (⚠️ if > 3 days)
- Complete supply chain timeline view
- Create escrow purchases

### 🛒 Consumer Dashboard (`/dashboard/consumer`)
- **QR Code scanning** (simulated)
- Manual batch ID entry
- Complete origin tracking
- Quality score display
- Certification badges (Organic, Pesticide-free)
- Visual timeline from farm to shop

---

## 🔐 Smart Contract Functions

### Core Functions

#### `registerUser(name, location, role)`
Register as Farmer (0), Transporter (1), Wholesaler (2), or Retailer (3)

#### `mintHarvest(cropType, quantity, price)`
Create a new batch of agricultural products

#### `transferBatch(batchId, newHandler)`
Transfer batch ownership in the supply chain

#### `createEscrow(batchId)` (payable)
Buyer locks funds for a batch purchase

#### `confirmReceipt(batchId)`
Buyer confirms delivery, releases payment to seller

#### `checkHoardingStatus(batchId)`
Returns `true` if batch held > 3 days (anti-hoarding)

### View Functions

#### `getBatch(batchId)`
Get complete batch details

#### `getUser(address)`
Get user information and reputation

---

## 🎨 UI Highlights

### Design Features
- **Green theme**: Agriculture-focused color palette
- **Bangla language support**: User-friendly for local farmers
- **Responsive design**: Mobile and desktop optimized
- **Modern animations**: Hover effects, transitions
- **Icon-rich interface**: Lucide React icons

### Timeline Component
- Vertical progress visualization
- Animated checkmarks for completed steps
- Gradient green line connecting steps
- Bangla + English labels
- Real-time timestamp formatting

---

## 🌐 Blockchain Networks

### Supported Networks
- **Hardhat Local** (Development)
- **Polygon Amoy** (Testnet)
- **Polygon Mainnet** (Production-ready)

### RainbowKit Configuration
Located in: `client/src/providers/Web3Provider.tsx`
- Custom green theme (#22c55e)
- Multiple wallet support
- Auto-connection persistence

---

## 📊 Mock Data

### Districts
- বগুড়া (Bogura) - 12 sub-districts
- মুন্সীগঞ্জ (Munshiganj) - 6 sub-districts

### Crops
- পাট (Jute) 🌿
- আলু (Potato) 🥔
- ধান (Rice) 🌾
- গম (Wheat) 🌾

### Sample Farmers
- Abdul Karim - Bogura Sadar (Jute specialist)
- Rahima Khatun - Munshiganj Sadar (Potato specialist)

---

## 🧪 Testing Guide

### Manual Testing Flow

1. **Start Local Blockchain**
   ```bash
   npx hardhat node
   ```

2. **Deploy Contract**
   ```bash
   npx hardhat ignition deploy ./ignition/modules/ShonaliChain.ts --network localhost
   ```

3. **Run Frontend**
   ```bash
   cd client
   npm run dev
   ```

4. **Connect Wallet** (MetaMask)
   - Network: Localhost (http://127.0.0.1:8545)
   - Chain ID: 31337

5. **Test Flow**
   - Register as Farmer → Mint harvest
   - Register as Wholesaler → View batches → Create escrow
   - Register as Consumer → Scan QR/Enter ID → View timeline

---

## 🏆 Hackathon Scoring Alignment

### Innovation (25%)
- ✅ Anti-hoarding detection system
- ✅ Escrow payment mechanism
- ✅ QR code traceability

### Smart Contract Logic (25%)
- ✅ Multiple user roles with access control
- ✅ Batch minting and ownership transfer
- ✅ Escrow with buyer protection
- ✅ View functions for transparency

### Frontend & Integration (25%)
- ✅ Professional RainbowKit wallet connection
- ✅ Role-specific dashboards
- ✅ Bangla language support
- ✅ Modern Timeline component
- ✅ Mock data for Bogura/Munshiganj

### Presentation (25%)
- ✅ Clear problem statement
- ✅ Live demo-ready
- ✅ Visual supply chain tracking
- ✅ Bangladesh-specific use case

---

## 🐛 Troubleshooting

### Common Issues

**"Hydration Error" in Next.js**
- Ensure all wallet-connected components use `'use client'` directive
- Web3Provider is client-side only

**MetaMask Connection Failed**
- Check network configuration matches Hardhat
- Ensure localhost:8545 is running

**Contract Not Found**
- Re-deploy contract after starting Hardhat node
- Update contract address in frontend

**Icons Not Loading**
- Verify `lucide-react` is installed: `npm install lucide-react`

---

## 📝 Future Enhancements

- [ ] IoT sensor integration for quality monitoring
- [ ] Multi-language support (Bengali, English, Hindi)
- [ ] Mobile app (React Native)
- [ ] IPFS for product images/certificates
- [ ] Reputation system with penalties
- [ ] Integration with government agriculture databases
- [ ] Real QR code generation and scanning
- [ ] SMS notifications for farmers

---

## 👥 Team

Built for BlockChain Bangladesh 2025 Hackathon 🇧🇩

---

## 📄 License

MIT License

---

## 🔗 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [Wagmi Docs](https://wagmi.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

---

## 💡 Quick Start Commands

```bash
# Backend
npm install
npx hardhat compile
npx hardhat node

# Frontend (new terminal)
cd client
npm install
npm run dev

# Deploy (new terminal)
npx hardhat run scripts/deploy.ts --network localhost
```

**Demo Time!** 🎉 Open http://localhost:3000 and connect your wallet!

---

Made with 💚 for transparent agriculture in Bangladesh
