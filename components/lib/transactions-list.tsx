import Link from 'next/link';
import Image from 'next/image';
import { Utils } from 'alchemy-sdk';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

import { formatTimestamp, truncateAddress, truncateHash, formatEther } from '../../lib/utils';

type Transaction = {
  uniqueId: string;
  hash: string;
  blockNumber: number;
  blockTimestamp?: number;
  from: string;
  to: string;
  value: string;
  fee?: string;
  asset?: string;
  type?: string;
  item?: { title: string; collection: string; thumbnail: string };
};

const TransactionsList = ({
  txs,
  withBlock = true,
  withTimestamp = true,
  withFee = true,
  withToken = false,
  withNFT = false,
}: {
  txs: Transaction[];
  withBlock?: boolean;
  withTimestamp?: boolean;
  withFee?: boolean;
  withToken?: boolean;
  withNFT?: boolean;
}) => (
  <div className="mt-8 flow-root">
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {withNFT ? 'Transaction Info' : 'Txn Hash'}
                </th>
                {/* <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Method
                </th> */}
                {withBlock && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Block
                  </th>
                )}
                {withTimestamp && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Age
                  </th>
                )}
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  From
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                />
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  To
                </th>
                {!withNFT && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Value
                  </th>
                )}
                {withFee && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Txn Fee
                  </th>
                )}
                {withToken && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Token
                  </th>
                )}
                {withNFT && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                )}
                {withNFT && (
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Item
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {txs.map((tx) => (
                <tr key={tx.uniqueId}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <Link href={`/tx/${tx.hash}`} className="text-indigo-600 hover:text-indigo-900">
                      {truncateHash(tx.hash)}
                    </Link>
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Transfer
                    </span>
                  </td> */}
                  {withBlock && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <Link
                        href={`/block/${tx.blockNumber}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {tx.blockNumber}
                      </Link>
                    </td>
                  )}
                  {tx.blockTimestamp && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {formatTimestamp(tx.blockTimestamp, false)}
                    </td>
                  )}
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <Link
                      href={`/address/${tx.from}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {truncateAddress(tx.from)}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <ArrowRightCircleIcon
                      className="h-6 w-6 flex-shrink-0 text-green-400"
                      aria-hidden="true"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <Link
                      href={`/address/${tx.to}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {truncateAddress(tx.to)}
                    </Link>
                  </td>
                  {!withNFT && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {formatEther(Number(Utils.formatEther(tx.value)), 8)} {withToken ? '' : 'ETH'}
                    </td>
                  )}
                  {tx.fee && (
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                      {formatEther(Number(Utils.formatEther(tx.fee)), 8)}
                    </td>
                  )}
                  {tx.asset && <td className="whitespace-nowrap px-3 py-4 text-sm">{tx.asset}</td>}
                  {withNFT && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {tx.type}
                      </span>
                    </td>
                  )}
                  {tx.item && (
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            className="h-10 w-10 rounded-md"
                            src={tx.item.thumbnail}
                            alt={tx.item.title}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{tx.item.title}</div>
                          <div className="text-gray-500">{tx.item.collection}</div>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default TransactionsList;
