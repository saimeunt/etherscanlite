import { constants } from 'ethers';

import alchemy from '../../lib/alchemy';
import Heading from './heading';
import TransactionsList from '../lib/transactions-list';

const Transactions = async ({ number }: { number: string }) => {
  const block = await alchemy.core.getBlockWithTransactions(Number(number));
  const { receipts } = await alchemy.core.getTransactionReceipts({
    blockHash: block.hash,
  });
  if (!receipts) {
    return null;
  }
  const receiptsReversed = receipts.reverse();
  const txs = block.transactions.reverse().map((tx, index) => ({
    uniqueId: tx.hash,
    hash: tx.hash,
    blockNumber: block.number,
    blockTimestamp: block.timestamp,
    from: tx.from,
    to: tx.to || constants.AddressZero,
    value: tx.value.toBigInt().toString(),
    fee: (
      BigInt(receiptsReversed[index].gasUsed as unknown as string) *
      BigInt(receiptsReversed[index].effectiveGasPrice as unknown as string)
    ).toString(),
  }));
  return (
    <div className="m-4">
      <Heading block={block} />
      <TransactionsList txs={txs} />
    </div>
  );
};

export default Transactions;
