import { notFound } from 'next/navigation';

import alchemy from '../../lib/alchemy';
import { getBlockReward } from '../../lib/utils';
import Heading from './heading';
import List from './list';

const Block = async ({ number }: { number: number }) => {
  const [response, block] = await Promise.all([
    fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [`0x${number.toString(16)}`, false],
      }),
    }),
    alchemy.core.getBlockWithTransactions(number),
  ]);
  if (!block) {
    notFound();
  }
  const [responseJson, blockReward] = await Promise.all([response.json(), getBlockReward(block)]);
  const {
    result: { totalDifficulty, size },
  } = responseJson as { result: { totalDifficulty: string; size: string } };
  return (
    <main className="m-4">
      <Heading number={number} />
      <List
        block={block}
        blockReward={blockReward}
        totalDifficulty={BigInt(totalDifficulty)}
        size={BigInt(size)}
      />
    </main>
  );
};

export default Block;
