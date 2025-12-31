# ShonaliChain Contract Integration Guide

## Contract Address
```
After deployment, save your contract address here:
Contract Address: 0x... (from deployment script output)
```

## Quick Integration for Frontend

### 1. Install Contract Types
The contract is already compiled with TypeChain types in `typechain-types/`.

### 2. Import in Frontend
```typescript
// In your React component
import { ethers } from 'ethers';
import ShonaliChainABI from '../../../artifacts/contracts/ShonaliChain.sol/ShonaliChain.json';

const CONTRACT_ADDRESS = '0x...'; // Your deployed address

// Get contract instance
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  ShonaliChainABI.abi,
  signer
);
```

### 3. Call Contract Functions

#### Register User
```typescript
const registerUser = async (name: string, location: string, role: number) => {
  try {
    const tx = await contract.registerUser(name, location, role);
    await tx.wait();
    console.log('User registered!');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Usage
await registerUser('আব্দুল করিম', 'Bogura Sadar', 0); // 0 = Farmer
```

#### Mint Harvest
```typescript
const mintHarvest = async (
  cropType: string,
  quantity: number,
  price: number
) => {
  try {
    // Price in wei (1 Taka = 10^18 wei for simulation)
    const priceInWei = ethers.parseEther(price.toString());
    
    const tx = await contract.mintHarvest(cropType, quantity, priceInWei);
    const receipt = await tx.wait();
    
    // Get batch ID from event
    const event = receipt.logs.find((log: any) => 
      log.eventName === 'HarvestMinted'
    );
    const batchId = event?.args?.batchId;
    
    console.log('Batch created:', batchId);
    return batchId;
  } catch (error) {
    console.error('Minting failed:', error);
  }
};

// Usage
await mintHarvest('Jute', 5000, 45);
```

#### Create Escrow
```typescript
const createEscrow = async (batchId: number, price: bigint) => {
  try {
    const tx = await contract.createEscrow(batchId, { value: price });
    await tx.wait();
    console.log('Escrow created!');
  } catch (error) {
    console.error('Escrow creation failed:', error);
  }
};

// Usage
const batch = await contract.getBatch(1);
await createEscrow(1, batch.price);
```

#### Check Hoarding Status
```typescript
const checkHoarding = async (batchId: number) => {
  try {
    const isHoarding = await contract.checkHoardingStatus(batchId);
    return isHoarding;
  } catch (error) {
    console.error('Hoarding check failed:', error);
    return false;
  }
};

// Usage
const hoarding = await checkHoarding(1);
console.log('Is hoarding?', hoarding);
```

#### Get Batch Movements
```typescript
const getBatchMovements = async (batchId: number) => {
  try {
    const movements = await contract.getBatchMovements(batchId);
    
    // Format for Timeline component
    return movements.map((m: any) => ({
      location: m.location,
      timestamp: Number(m.timestamp),
      handler: m.handler,
      role: getRoleName(Number(m.role)),
      completed: true
    }));
  } catch (error) {
    console.error('Failed to get movements:', error);
    return [];
  }
};

// Helper
const getRoleName = (role: number) => {
  const roles = ['Farmer', 'Transporter', 'Wholesaler', 'Retailer'];
  return roles[role];
};

// Usage
const movements = await getBatchMovements(1);
// Pass to Timeline component
<Timeline steps={movements} />
```

---

## Complete React Hook Example

```typescript
// hooks/useShonaliChain.ts
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import ShonaliChainABI from '../artifacts/contracts/ShonaliChain.sol/ShonaliChain.json';

const CONTRACT_ADDRESS = '0x...'; // Your deployed address

export function useShonaliChain() {
  const { address } = useAccount();
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.getSigner().then(signer => {
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          ShonaliChainABI.abi,
          signer
        );
        setContract(contractInstance);
      });
    }
  }, [address]);

  const registerUser = async (name: string, location: string, role: number) => {
    if (!contract) throw new Error('Contract not initialized');
    setLoading(true);
    try {
      const tx = await contract.registerUser(name, location, role);
      await tx.wait();
      return true;
    } finally {
      setLoading(false);
    }
  };

  const mintHarvest = async (cropType: string, quantity: number, price: number) => {
    if (!contract) throw new Error('Contract not initialized');
    setLoading(true);
    try {
      const priceInWei = ethers.parseEther(price.toString());
      const tx = await contract.mintHarvest(cropType, quantity, priceInWei);
      const receipt = await tx.wait();
      
      // Extract batch ID from event
      const event = receipt.logs.find((log: any) => 
        log.fragment?.name === 'HarvestMinted'
      );
      return event?.args?.batchId;
    } finally {
      setLoading(false);
    }
  };

  const getBatch = async (batchId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    return await contract.getBatch(batchId);
  };

  const getBatchMovements = async (batchId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    const movements = await contract.getBatchMovements(batchId);
    return movements.map((m: any) => ({
      location: m.location,
      timestamp: Number(m.timestamp),
      handler: m.handler,
      role: ['Farmer', 'Transporter', 'Wholesaler', 'Retailer'][Number(m.role)],
      completed: true
    }));
  };

  const createEscrow = async (batchId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    setLoading(true);
    try {
      const batch = await contract.getBatch(batchId);
      const tx = await contract.createEscrow(batchId, { value: batch.price });
      await tx.wait();
      return true;
    } finally {
      setLoading(false);
    }
  };

  const confirmReceipt = async (batchId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    setLoading(true);
    try {
      const tx = await contract.confirmReceipt(batchId);
      await tx.wait();
      return true;
    } finally {
      setLoading(false);
    }
  };

  const checkHoarding = async (batchId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    return await contract.checkHoardingStatus(batchId);
  };

  return {
    contract,
    loading,
    registerUser,
    mintHarvest,
    getBatch,
    getBatchMovements,
    createEscrow,
    confirmReceipt,
    checkHoarding,
  };
}
```

---

## Usage in Components

```typescript
// In your Farmer Dashboard
import { useShonaliChain } from '@/hooks/useShonaliChain';

export default function FarmerDashboard() {
  const { registerUser, mintHarvest, loading } = useShonaliChain();

  const handleMint = async () => {
    try {
      const batchId = await mintHarvest('Jute', 5000, 45);
      alert(`Batch created! ID: ${batchId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleMint} disabled={loading}>
      {loading ? 'Processing...' : 'Mint Harvest'}
    </button>
  );
}
```

---

## Contract Functions Reference

### Write Functions (Require Gas)

| Function | Parameters | Description |
|----------|------------|-------------|
| `registerUser` | `name, location, role` | Register new user |
| `mintHarvest` | `cropType, quantity, price` | Create new batch |
| `transferBatch` | `batchId, newHandler` | Transfer ownership |
| `createEscrow` | `batchId` (payable) | Create escrow |
| `confirmReceipt` | `batchId` | Confirm & release funds |
| `cancelEscrow` | `batchId` | Cancel & refund |

### Read Functions (Free)

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `users` | `address` | `User` | Get user details |
| `batches` | `uint256` | `Batch` | Get batch details |
| `getBatch` | `batchId` | `Batch` | Get batch (struct) |
| `getUser` | `address` | `User` | Get user (struct) |
| `getBatchMovements` | `batchId` | `Movement[]` | Get all movements |
| `getMovementCount` | `batchId` | `uint256` | Count movements |
| `checkHoardingStatus` | `batchId` | `bool` | Check hoarding |
| `batchCounter` | - | `uint256` | Total batches |

---

## Events to Listen

```typescript
// Listen for HarvestMinted events
contract.on('HarvestMinted', (batchId, producer, cropType, quantity, timestamp) => {
  console.log('New harvest!', {
    batchId: batchId.toString(),
    producer,
    cropType,
    quantity: quantity.toString(),
    timestamp: timestamp.toString()
  });
});

// Listen for OwnershipTransferred
contract.on('OwnershipTransferred', (batchId, from, to) => {
  console.log('Batch transferred!', {
    batchId: batchId.toString(),
    from,
    to
  });
});

// Listen for EscrowCreated
contract.on('EscrowCreated', (batchId, buyer, amount) => {
  console.log('Escrow created!', {
    batchId: batchId.toString(),
    buyer,
    amount: ethers.formatEther(amount)
  });
});
```

---

## Error Handling

```typescript
try {
  const tx = await contract.mintHarvest('Jute', 5000, price);
  await tx.wait();
} catch (error: any) {
  if (error.code === 'ACTION_REJECTED') {
    alert('Transaction rejected by user');
  } else if (error.reason) {
    alert(`Error: ${error.reason}`);
  } else if (error.message.includes('User not registered')) {
    alert('Please register first!');
  } else {
    console.error('Unknown error:', error);
  }
}
```

---

## Testing with Hardhat Console

```bash
npx hardhat console --network localhost
```

```javascript
const ShonaliChain = await ethers.getContractFactory("ShonaliChain");
const contract = await ShonaliChain.attach("0x..."); // Your deployed address

// Register user
await contract.registerUser("Test Farmer", "Bogura", 0);

// Mint harvest
const tx = await contract.mintHarvest("Jute", 5000, ethers.parseEther("45"));
await tx.wait();

// Get batch
const batch = await contract.getBatch(0);
console.log(batch);

// Check hoarding
const isHoarding = await contract.checkHoardingStatus(0);
console.log("Hoarding:", isHoarding);

// Get movements
const movements = await contract.getBatchMovements(0);
console.log("Movements:", movements);
```

---

## Environment Variables (.env.local)

```bash
# Frontend
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=31337

# For production
NEXT_PUBLIC_POLYGON_RPC=https://polygon-mumbai.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_CONTRACT_ADDRESS_MUMBAI=0x...
```

---

## Additional Resources

- **Ethers.js Docs**: https://docs.ethers.org/v6/
- **Hardhat Docs**: https://hardhat.org/docs
- **RainbowKit Docs**: https://www.rainbowkit.com/docs
- **Wagmi Docs**: https://wagmi.sh/

---

Your contract is production-ready! 🚀
