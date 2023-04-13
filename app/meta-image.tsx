import { ImageResponse } from 'next/server';

export const size = { width: 1200, height: 630 };
export const alt = 'EtherscanLite';
export const contentType = 'image/png';

const handler = () => {
  // const scheme = `http${process.env.NODE_ENV !== 'production' ? '' : 's'}`;
  // const logoUrl = `${scheme}://${process.env.VERCEL_URL}/img/etherscan-logo.png`;
  return new ImageResponse(
    (
      <div
        tw={`flex flex-col justify-center items-center w-[${size.width}px] h-[${size.height}px]`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://etherscanlite.vercel.app/img/etherscan-logo.png"
          alt={alt}
          width={815}
          height={183}
        />
        <h1 tw="text-8xl font-bold tracking-tight" style={{ color: '#21325b' }}>
          Simple Block Explorer
        </h1>
      </div>
    ),
    size,
  );
};

export default handler;
