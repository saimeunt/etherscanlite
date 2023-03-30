import Link from 'next/link';
import { Utils, BlockWithTransactions } from 'alchemy-sdk';
import { utils } from 'ethers';
import { ClockIcon } from '@heroicons/react/24/outline';

import ListItem from '../lib/list-item';
import { truncateAddress, formatTimestamp } from '../../lib/utils';

const formatBigInt = (bigint: bigint) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(bigint)
    .replace('$', '')
    .replace('.00', '');

const formatPercent = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(number);

const List = ({
  block,
  blockReward,
  totalDifficulty,
  size,
}: {
  block: BlockWithTransactions;
  blockReward: { blockReward: bigint; sumMinerTips: bigint; burnedFee: bigint };
  totalDifficulty: bigint;
  size: bigint;
}) => (
  <div className="mt-8 overflow-hidden bg-white shadow sm:rounded-lg">
    <div className="px-4 py-5 sm:p-0">
      <dl className="sm:divide- sm:divide-gray-20">
        <ListItem title="Block Height">{block.number}</ListItem>
        <ListItem title="Timestamp">
          <ClockIcon className="mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          {formatTimestamp(block.timestamp)}
        </ListItem>
        <ListItem title="Transactions">
          <Link
            href={`/block/${block.number}/txs`}
            className="mr-1 text-indigo-600 hover:text-indigo-900"
          >
            {block.transactions.length} transaction{block.transactions.length === 1 ? '' : 's'}
          </Link>{' '}
          in this block
        </ListItem>
        <ListItem title="Fee Recipient" border>
          <a
            className="mr-1 text-indigo-600 hover:text-indigo-900"
            href={`/address/${block.miner}`}
          >
            {truncateAddress(block.miner)}
          </a>
          in 12 secs
        </ListItem>
        <ListItem title="Block Reward">
          {Utils.formatEther(blockReward.blockReward)} ETH (0 +{' '}
          {Utils.formatEther(blockReward.sumMinerTips)} - {Utils.formatEther(blockReward.burnedFee)}
          )
        </ListItem>
        <ListItem title="Total Difficulty">{formatBigInt(totalDifficulty)}</ListItem>
        <ListItem title="Size">{formatBigInt(size)} bytes</ListItem>
        <ListItem title="Gas Used" border>
          {formatBigInt(block.gasUsed.toBigInt())} (
          {formatPercent(block.gasUsed.toNumber() / 30000000)})
        </ListItem>
        <ListItem title="Gas Limit">{formatBigInt(block.gasLimit.toBigInt())}</ListItem>
        <ListItem title="Base Fee Per Gas">
          {Utils.formatEther(block.baseFeePerGas || 0)} ETH
          <div className="ml-1 text-gray-500">
            ({Utils.formatUnits(block.baseFeePerGas || 0, 'gwei')} Gwei)
          </div>
        </ListItem>
        <ListItem title="Burnt Fees">🔥 {Utils.formatEther(blockReward.burnedFee)} ETH</ListItem>
        <ListItem title="Extra Data">
          {utils.parseBytes32String(block.extraData.padEnd(66, '0'))} (Hex: {block.extraData})
        </ListItem>
      </dl>
    </div>
  </div>
);

export default List;
