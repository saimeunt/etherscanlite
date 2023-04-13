import Link from 'next/link';
import { ClockIcon } from '@heroicons/react/24/outline';
import { TransactionReceipt, TransactionResponse, Block } from 'alchemy-sdk';
import { utils } from 'ethers';

import ListItem from '../lib/list-item';
import { formatTimestamp } from '../../lib/utils';

const List = ({
  tx,
  txReceipt,
  block,
}: {
  tx: TransactionResponse;
  txReceipt: TransactionReceipt;
  block: Block;
}) => (
  <div className="mt-8 overflow-hidden bg-white shadow sm:rounded-lg">
    <div className="px-4 py-5 sm:p-0">
      <dl className="sm:divide- sm:divide-gray-20">
        <ListItem title="Transaction Hash">{tx.hash}</ListItem>
        <ListItem title="Block">
          <Link
            href={`/block/${txReceipt.blockNumber}`}
            className="mr-1 text-indigo-600 hover:text-indigo-900"
          >
            {txReceipt.blockNumber}
          </Link>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {txReceipt.confirmations} Block Confirmations
          </span>
        </ListItem>
        <ListItem title="Timestamp">
          <ClockIcon className="mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          {formatTimestamp(block.timestamp)}
        </ListItem>
        <ListItem title="From" border>
          <Link
            href={`/address/${txReceipt.from}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            {txReceipt.from}
          </Link>
        </ListItem>
        <ListItem title="To">
          <Link href={`/address/${txReceipt.to}`} className="text-indigo-600 hover:text-indigo-900">
            {txReceipt.to}
          </Link>
        </ListItem>
        <ListItem title="Value" border>
          {utils.formatEther(tx.value)} ETH
        </ListItem>
        <ListItem title="Transaction Fee">
          {utils.formatEther(txReceipt.gasUsed.toBigInt() * txReceipt.effectiveGasPrice.toBigInt())}{' '}
          ETH
        </ListItem>
        <ListItem title="Gas Price">
          {utils.formatUnits(tx.gasPrice || 0, 'gwei')} Gwei
          <div className="ml-1 text-gray-500">({utils.formatEther(tx.gasPrice || 0)} ETH)</div>
        </ListItem>
      </dl>
    </div>
  </div>
);

export default List;
