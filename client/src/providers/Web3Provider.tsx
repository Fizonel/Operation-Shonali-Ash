'use client';

import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, polygonAmoy, hardhat } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// WalletConnect Project ID from cloud.walletconnect.com
const config = getDefaultConfig({
  appName: 'ShonaliChain - Supply Chain Transparency',
  projectId: '5f56885336473c16e9853ac9ec096959', // Operation_Shunali_Ash
  chains: [hardhat, polygonAmoy, polygon, mainnet],
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  // Debug: Check if wallet is available
  if (typeof window !== 'undefined') {
    console.log('🦊 MetaMask detected:', !!window.ethereum);
    console.log('🔗 Available wallets:', window.ethereum ? 'Yes' : 'Install MetaMask from https://metamask.io/');
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#7c3aed', // Premium purple for blockchain
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
