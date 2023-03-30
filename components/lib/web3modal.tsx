'use client';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { createClient } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { providers } from 'ethers';

const chains = [mainnet];

const connectors = w3mConnectors({
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  version: 1,
  chains,
});

export const wagmiClient = () => {
  /* const { provider } = configureChains(chains, [
    w3mProvider({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID }),
  ]); */
  // const provider = alchemy.config.getProvider();
  const provider = new providers.AlchemyProvider(mainnet.network, process.env.ALCHEMY_API_KEY);
  return createClient({
    autoConnect: true,
    connectors,
    provider,
  });
};

const CustomWeb3Modal = () => (
  <Web3Modal
    projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
    themeMode="light"
    ethereumClient={new EthereumClient(wagmiClient(), chains)}
  />
);

export default CustomWeb3Modal;
