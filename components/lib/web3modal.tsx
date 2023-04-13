import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { createClient, configureChains } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { indigo } from 'tailwindcss/colors';

const chains = [mainnet];

const connectors = w3mConnectors({
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  version: 2,
  chains,
});

export const wagmiClient = () => {
  const { provider } = configureChains(chains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  ]);
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
    themeVariables={{ '--w3m-accent-color': indigo[600], '--w3m-background-color': indigo[600] }}
    ethereumClient={new EthereumClient(wagmiClient(), chains)}
  />
);

export default CustomWeb3Modal;
