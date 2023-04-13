'use client';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';
import Web3Modal from './web3modal';

import { wagmiClient } from './web3modal';

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiConfig client={wagmiClient()}>
    {children}
    <Web3Modal />
  </WagmiConfig>
);

export default Providers;
