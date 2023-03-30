import alchemy from '../../lib/alchemy';
import Heading from './heading';
import List from './list';

const Transaction = async ({ hash }: { hash: string }) => {
  const [tx, txReceipt] = await Promise.all([
    alchemy.core.getTransaction(hash),
    alchemy.core.getTransactionReceipt(hash),
  ]);
  if (!tx || !txReceipt) {
    return null;
  }
  const block = await alchemy.core.getBlock(txReceipt.blockNumber);
  return (
    <div className="m-4">
      <Heading />
      <List tx={tx} txReceipt={txReceipt} block={block} />
    </div>
  );
};

export default Transaction;
