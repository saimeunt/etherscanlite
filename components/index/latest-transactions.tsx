import Link from 'next/link';
import { BlockWithTransactions, Utils } from 'alchemy-sdk';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { fromUnixTime, formatDistance } from 'date-fns';
import { constants } from 'ethers';

import { truncateAddress, truncateHash, formatEther } from '../../lib/utils';

const LatestTransactions = ({ block }: { block: BlockWithTransactions }) => (
  <div className="flow-root">
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                  Latest Transactions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {block.transactions
                .reverse()
                .slice(0, 6)
                .map((transaction) => (
                  <tr key={transaction.hash}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <div className="flex items-center">
                        <div className="flex flex h-10 w-10 flex-shrink-0 items-center justify-center bg-gray-100">
                          <DocumentTextIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <Link
                            className="font-medium text-indigo-600 hover:text-indigo-900"
                            href={`/tx/${transaction.hash}`}
                          >
                            {truncateHash(transaction.hash)}
                          </Link>
                          <div className="text-gray-500">
                            {formatDistance(fromUnixTime(block.timestamp || 0), new Date(), {
                              includeSeconds: true,
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div>
                        From{' '}
                        <a
                          className="text-indigo-600 hover:text-indigo-900"
                          href={`/address/${transaction.from}`}
                        >
                          {truncateAddress(transaction.from)}
                        </a>
                      </div>
                      To{' '}
                      <a
                        className="text-indigo-600 hover:text-indigo-900"
                        href={`/address/${transaction.to}`}
                      >
                        {truncateAddress(transaction.to || constants.AddressZero)}
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {formatEther(Number(Utils.formatEther(transaction.value)), 5)} Eth
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

export default LatestTransactions;
