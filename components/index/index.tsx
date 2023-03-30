import alchemy from '../../lib/alchemy';
import Heading from './heading';
import LatestBlocks from './latest-blocks';
import LatestTransactions from './latest-transactions';
import { getBlockReward } from '../../lib/utils';

const Index = async () => {
  const latestBlock = await alchemy.core.getBlockWithTransactions('latest');
  const latestBlocks = await Promise.all(
    [1, 2, 3, 4, 5].map((index) =>
      alchemy.core.getBlockWithTransactions(latestBlock.number - index),
    ),
  );
  const blocks = [latestBlock, ...latestBlocks];
  const blockRewards = await Promise.all(blocks.map((block) => getBlockReward(block)));
  return (
    <div className="m-4">
      <Heading />
      <div className="mt-8 flex">
        <div className="mr-2 flex-1">
          <LatestBlocks blocks={blocks} blockRewards={blockRewards} />
        </div>
        <div className="ml-2 flex-1">
          <LatestTransactions block={latestBlock} />
        </div>
      </div>
    </div>
  );
};

export default Index;
