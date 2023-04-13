import { AssetTransfersCategory } from 'alchemy-sdk';
import { constants, utils } from 'ethers';
import { sortBy } from 'lodash';

import alchemy from '../../lib/alchemy';
import TransactionsList from '../lib/transactions-list';

const AddressToken = async ({ address }: { address: string }) => {
  const category = [
    AssetTransfersCategory.EXTERNAL,
    AssetTransfersCategory.INTERNAL,
    AssetTransfersCategory.ERC20,
    AssetTransfersCategory.ERC721,
    AssetTransfersCategory.ERC1155,
  ];
  const [transfersFrom, transfersTo] = await Promise.all([
    alchemy.core.getAssetTransfers({
      fromAddress: address,
      category,
    }),
    alchemy.core.getAssetTransfers({
      toAddress: address,
      category,
    }),
  ]);
  const transfers = [...transfersFrom.transfers, ...transfersTo.transfers];
  const tokenTransfers = transfers.filter(({ category }) => category === 'erc20');
  const tokenTxs = tokenTransfers.map((transfer) => ({
    uniqueId: transfer.uniqueId,
    hash: transfer.hash,
    blockNumber: Number.parseInt(transfer.blockNum, 16),
    from: transfer.from,
    to: transfer.to || constants.AddressZero,
    value: transfer.value
      ? utils.parseEther(transfer.value.toFixed(18).toString()).toString()
      : '0',
    asset: transfer.asset || '',
  }));
  return (
    <TransactionsList
      txs={sortBy(tokenTxs, 'blockNumber').reverse()}
      withBlock={false}
      withTimestamp={false}
      withFee={false}
      withToken={true}
    />
  );
};

export default AddressToken;
