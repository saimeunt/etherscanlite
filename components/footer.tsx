import Link from 'next/link';

import { truncateAddress } from '../lib/utils';

const Footer = () => {
  const address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
  return (
    <footer className="mx-4 flex justify-between border-t border-gray-200 py-5">
      <p className="text-xs text-gray-900">EtherscanLite © {new Date().getFullYear()}</p>
      <p className="text-xs text-gray-900">
        Donations:{' '}
        <Link href={`/address/${address}`} className="text-indigo-600 hover:text-indigo-900">
          {truncateAddress(address)}
        </Link>{' '}
        ❤️
      </p>
    </footer>
  );
};

export default Footer;
