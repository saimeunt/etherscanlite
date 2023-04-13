import { AssetTransfersCategory, NftMetadataBatchToken, NftTokenType } from 'alchemy-sdk';
import { constants, utils } from 'ethers';
import { sortBy } from 'lodash';

import alchemy from '../../lib/alchemy';
import TransactionsList from '../lib/transactions-list';

const AddressNft = async ({ address }: { address: string }) => {
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
  const rawNftTransfers = transfers.filter(({ category }) =>
    ['erc721', 'erc1155'].includes(category),
  );
  const nftMetadataToken: NftMetadataBatchToken[] = rawNftTransfers.map((transfer) => ({
    contractAddress: transfer.rawContract.address || '',
    tokenId:
      transfer.tokenId || (transfer.erc1155Metadata ? transfer.erc1155Metadata[0].tokenId : '1'),
    tokenType: transfer.category === 'erc721' ? NftTokenType.ERC721 : NftTokenType.ERC1155,
  }));
  const nftMetadata =
    nftMetadataToken.length > 0 ? await alchemy.nft.getNftMetadataBatch(nftMetadataToken) : [];
  const nftTransfers = rawNftTransfers
    .map((transfer, index) => ({
      ...transfer,
      nft: nftMetadata[index],
    }))
    .filter((transfer) => transfer.nft && transfer.nft.media.length > 0);
  const nftTxs = nftTransfers.map((transfer) => ({
    uniqueId: transfer.uniqueId,
    hash: transfer.hash,
    blockNumber: Number.parseInt(transfer.blockNum, 16),
    from: transfer.from,
    to: transfer.to || constants.AddressZero,
    value: transfer.value
      ? utils.parseEther(transfer.value.toFixed(18).toString()).toString()
      : '0',
    type: transfer.category === 'erc721' ? 'ERC-721' : 'ERC-1155',
    item: {
      title:
        transfer.category === 'erc721'
          ? `${transfer.nft.contract.name}#${transfer.nft.tokenId}`
          : transfer.nft.title,
      collection: transfer.nft.contract.name || '',
      thumbnail: transfer.nft.media[0].thumbnail || '',
    },
  }));
  return (
    <TransactionsList
      txs={sortBy(nftTxs, 'blockNumber').reverse()}
      withBlock={false}
      withTimestamp={false}
      withFee={false}
      withNFT={true}
    />
  );
};

export default AddressNft;
