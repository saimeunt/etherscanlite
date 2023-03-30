'use client';
import { ReactNode } from 'react';
import { WagmiConfig } from 'wagmi';

import { wagmiClient } from './web3modal';

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiConfig client={wagmiClient()}>{children}</WagmiConfig>
);

export default Providers;
