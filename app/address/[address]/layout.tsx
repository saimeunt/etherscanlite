import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { uniqBy } from 'lodash';
import { JSDOM } from 'jsdom';
import { AssetTransfersCategory } from 'alchemy-sdk';
import { utils } from 'ethers';

import alchemy from '../../../lib/alchemy';
import Heading from '../../../components/address/heading';
import Stats from '../../../components/address/stats';
import Tabs from '../../../components/address/tabs';

const getEtherPrice = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?ids=ethereum&vs_currency=usd',
  );
  if (response.status === 429) {
    return 2000;
  }
  const responseJson = await response.json();
  const [{ current_price: currentPrice }] = responseJson as [{ current_price: number }];
  return currentPrice;
};

const getMultiChainAddresses = async (address: string) => {
  const response = await fetch(`https://blockscan.com/address/${address}`);
  const responseText = await response.text();
  const dom = new JSDOM(responseText);
  const searchResults = dom.window.document.querySelectorAll('.search-result');
  return searchResults.length - 1;
};

const AddressLayout = async ({
  params: { address },
  children,
}: {
  params: { address: string };
  children: ReactNode;
}) => {
  const isAddress = utils.isAddress(address);
  if (!isAddress) {
    notFound();
  }
  const category = [
    AssetTransfersCategory.EXTERNAL,
    AssetTransfersCategory.INTERNAL,
    AssetTransfersCategory.ERC20,
    AssetTransfersCategory.ERC721,
    AssetTransfersCategory.ERC1155,
  ];
  const [balance, etherPrice, multiChainAddresses, transfersFrom, transfersTo] = await Promise.all([
    alchemy.core.getBalance(address),
    getEtherPrice(),
    getMultiChainAddresses(address),
    alchemy.core.getAssetTransfers({
      fromAddress: address,
      category,
    }),
    alchemy.core.getAssetTransfers({
      toAddress: address,
      category,
    }),
  ]);
  const transfersFromExternal = transfersFrom.transfers.filter(
    ({ category }) => category === 'external',
  );
  const firstTx = transfersFromExternal[0];
  const lastTx = transfersFromExternal[transfersFromExternal.length - 1];
  const [firstTxBlock, lastTxBlock] = await Promise.all([
    firstTx && alchemy.core.getBlock(firstTx.blockNum),
    lastTx && alchemy.core.getBlock(lastTx.blockNum),
  ]);
  const transfers = [...transfersFrom.transfers, ...transfersTo.transfers];
  const allTransfers = uniqBy(transfers, 'hash');
  const internalTransfers = transfers.filter(({ category }) => category === 'internal');
  const tokenTransfers = transfers.filter(({ category }) => category === 'erc20');
  const rawNftTransfers = transfers.filter(({ category }) =>
    ['erc721', 'erc1155'].includes(category),
  );
  return (
    <main className="m-4">
      <Heading address={address} />
      <Stats
        address={address}
        balance={balance.toBigInt()}
        etherPrice={etherPrice}
        lastTxHash={transfersFromExternal.length > 0 ? lastTx.hash : undefined}
        lastTxTimestamp={transfersFromExternal.length > 0 ? lastTxBlock.timestamp : 0}
        firstTxHash={transfersFromExternal.length > 0 ? firstTx.hash : undefined}
        firstTxTimestamp={transfersFromExternal.length > 0 ? firstTxBlock.timestamp : 0}
        multiChainAddresses={multiChainAddresses}
      />
      <Tabs
        address={address}
        allTransfersCount={allTransfers.length}
        internalTransfersCount={internalTransfers.length}
        tokenTransfersCount={tokenTransfers.length}
        nftTransfersCount={rawNftTransfers.length}
      />
      {children}
    </main>
  );
};

export default AddressLayout;
