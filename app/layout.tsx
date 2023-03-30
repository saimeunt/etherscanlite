import { ReactNode } from 'react';
import 'tailwindcss/tailwind.css';

import Providers from '../components/lib/providers';
import Header from '../components/header';
import Footer from '../components/footer';
import Web3Modal from '../components/lib/web3modal';

const title = 'EtherscanLite';
const description = 'EtherscanLite - Simple Block Explorer';
const scheme = `http${process.env.NODE_ENV !== 'production' ? '' : 's'}`;
const metaImageUrl = `${scheme}://${process.env.VERCEL_URL}/img/meta-image.jpg`;

export const metadata = {
  title,
  description,
  icons: { icon: { url: '/img/favicon.png', sizes: '128x128', type: 'image/png' } },
  openGraph: {
    title,
    description,
    url: 'https://etherscanlite.vercel.app/',
    type: 'website',
    images: [metaImageUrl],
  },
  twitter: { card: 'summary_large_image', title, description, images: [metaImageUrl] },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className="overflow-x-hidden bg-slate-50">
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
      <Web3Modal />
    </body>
  </html>
);

export const dynamic = 'force-dynamic';

export default RootLayout;
