import { BlockWithTransactions } from 'alchemy-sdk';
import Link from 'next/link';
import { CubeIcon } from '@heroicons/react/24/outline';
import { fromUnixTime, formatDistance } from 'date-fns';
import { utils } from 'ethers';

import { truncateAddress, formatEther } from '../../lib/utils';

const LatestBlocks = ({
  blocks,
  blockRewards,
}: {
  blocks: BlockWithTransactions[];
  blockRewards: { blockReward: bigint; sumMinerTips: bigint; burnedFee: bigint }[];
}) => (
  <div className="flow-root">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  colSpan={3}
                >
                  Latest Blocks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {blocks.map((block, index) => (
                <tr key={block.hash}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <div className="flex items-center">
                      <div className="flex flex h-10 w-10 flex-shrink-0 items-center justify-center bg-gray-100">
                        <CubeIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <Link
                          className="font-medium text-indigo-600 hover:text-indigo-900"
                          href={`/block/${block.number}`}
                        >
                          {block.number}
                        </Link>
                        <div className="text-gray-500">
                          {formatDistance(fromUnixTime(block.timestamp), new Date(), {
                            includeSeconds: true,
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div>
                      Fee Recipient{' '}
                      <a
                        className="text-indigo-600 hover:text-indigo-900"
                        href={`/address/${block.miner}`}
                      >
                        {truncateAddress(block.miner)}
                      </a>
                    </div>
                    <Link
                      className="text-indigo-600 hover:text-indigo-900"
                      href={`/block/${block.number}/txs`}
                    >
                      {block.transactions.length} txn{block.transactions.length === 1 ? '' : 's'}
                    </Link>{' '}
                    in 12 secs
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {formatEther(Number(utils.formatEther(blockRewards[index].blockReward)), 5)}{' '}
                      Eth
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default LatestBlocks;
