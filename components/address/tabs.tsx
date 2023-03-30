'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Tabs = ({
  address,
  allTransfersCount,
  internalTransfersCount,
  tokenTransfersCount,
  nftTransfersCount,
}: {
  address: string;
  allTransfersCount: number;
  internalTransfersCount: number;
  tokenTransfersCount: number;
  nftTransfersCount: number;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const tabs = [
    { name: 'Transactions', href: `/address/${address}`, count: allTransfersCount },
    {
      name: 'Internal Transactions',
      href: `/address/${address}/internal`,
      count: internalTransfersCount,
    },
    {
      name: 'Token Transfers (ERC-20)',
      href: `/address/${address}/token`,
      count: tokenTransfersCount,
    },
    { name: 'NFT Transfers', href: `/address/${address}/nft`, count: nftTransfersCount },
  ];
  return (
    <div className="mt-8 sm:mt-0">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => router.push(event.target.value)}
          defaultValue={pathname}
        >
          {tabs
            .filter(({ count }) => count > 0)
            .map((tab) => (
              <option key={tab.name} value={tab.href}>
                {tab.name} ({tab.count})
              </option>
            ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs
              .filter(({ count }) => count > 0)
              .map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.href === pathname
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                    'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                  )}
                  aria-current={tab.href === pathname ? 'page' : undefined}
                >
                  {tab.name}
                  <span
                    className={classNames(
                      tab.href === pathname
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block',
                    )}
                  >
                    {tab.count}
                  </span>
                </Link>
              ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
