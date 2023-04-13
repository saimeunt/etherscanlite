import { AssetTransfersCategory } from 'alchemy-sdk';
import { constants, utils } from 'ethers';
import { uniqBy, sortBy } from 'lodash';

import alchemy from '../../lib/alchemy';
import TransactionsList from '../lib/transactions-list';

const AddressIndex = async ({ address }: { address: string }) => {
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
  const allTransfers = uniqBy(transfers, 'hash');
  const allTxs = allTransfers.map((transfer) => ({
    uniqueId: transfer.uniqueId,
    hash: transfer.hash,
    blockNumber: Number.parseInt(transfer.blockNum, 16),
    from: transfer.from,
    to: transfer.to || constants.AddressZero,
    value: transfer.value
      ? transfer.asset === 'ETH'
        ? utils.parseEther(transfer.value.toFixed(18).toString()).toString()
        : '0'
      : '0',
  }));
  return (
    <TransactionsList
      txs={sortBy(allTxs, 'blockNumber').reverse()}
      withTimestamp={false}
      withFee={false}
    />
  );
};

export default AddressIndex;
