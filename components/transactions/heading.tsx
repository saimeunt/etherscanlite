import { BlockWithTransactions } from 'alchemy-sdk';
import Link from 'next/link';

const Heading = ({ block }: { block: BlockWithTransactions }) => (
  <div className="border-b border-gray-200 pb-5">
    <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
    <p className="mt-2 text-sm text-gray-700">
      For Block{' '}
      <Link href={`/block/${block.number}`} className="text-indigo-600 hover:text-indigo-900">
        {block.number}
      </Link>
    </p>
    <p className="mt-2 text-sm text-gray-700">
      A total of {block.transactions.length} transaction
      {block.transactions.length === 1 ? '' : 's'} found
    </p>
  </div>
);

export default Heading;
