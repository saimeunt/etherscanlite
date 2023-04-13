import Link from 'next/link';
import { utils } from 'ethers';

import { formatTimestamp, truncateHash } from '../../lib/utils';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

const Stats = ({
  address,
  balance,
  etherPrice,
  lastTxHash,
  lastTxTimestamp,
  firstTxHash,
  firstTxTimestamp,
  multiChainAddresses,
}: {
  address: string;
  balance: bigint;
  etherPrice: number;
  lastTxHash?: string;
  lastTxTimestamp: number;
  firstTxHash?: string;
  firstTxTimestamp: number;
  multiChainAddresses: number;
}) => (
  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <div className="font-semibold">Overview</div>
      <dt className="mt-4 text-sm text-gray-500">ETH BALANCE</dt>
      <dd className="mt-1 text-sm tracking-tight text-gray-900">
        {utils.formatEther(balance)} ETH
      </dd>
      <dt className="mt-2 text-sm text-gray-500">ETH VALUE</dt>
      <dd className="mt-1 text-sm tracking-tight text-gray-900">
        {formatPrice(etherPrice * Number(utils.formatEther(balance)))}{' '}
        <span className="text-xs">(@ {formatPrice(etherPrice)}/ETH)</span>
      </dd>
    </div>
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <div className="font-semibold">More info</div>
      {lastTxHash && (
        <>
          <dt className="mt-4 text-sm text-gray-500">LAST TXN SENT</dt>
          <dd className="mt-1 text-sm tracking-tight text-gray-900">
            <Link href={`/tx/${lastTxHash}`} className="text-indigo-600 hover:text-indigo-900">
              {truncateHash(lastTxHash)}
            </Link>{' '}
            from {formatTimestamp(lastTxTimestamp, false)}
          </dd>
        </>
      )}
      {firstTxHash && (
        <>
          <dt className="mt-2 text-sm text-gray-500">FIRST TXN SENT</dt>
          <dd className="mt-1 text-sm tracking-tight text-gray-900">
            <Link href={`/tx/${firstTxHash}`} className="text-indigo-600 hover:text-indigo-900">
              {truncateHash(firstTxHash)}
            </Link>{' '}
            from {formatTimestamp(firstTxTimestamp, false)}
          </dd>
        </>
      )}
    </div>
    {multiChainAddresses >= 1 && (
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <div className="font-semibold">Multi Chain</div>
        <dt className="mt-4 text-sm text-gray-500">MULTICHAIN ADDRESSES</dt>
        <dd className="mt-1 text-sm tracking-tight text-gray-900">
          <a
            href={`https://blockscan.com/address/${address}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            {multiChainAddresses} address{multiChainAddresses === 1 ? '' : 'es'} found via Blockscan
          </a>
        </dd>
      </div>
    )}
  </dl>
);

export default Stats;
