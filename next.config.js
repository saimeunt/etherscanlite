/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: false,
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    domains: ['effigy.im', 'res.cloudinary.com'],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /canvas/, contextRegExp: /jsdom$/ }),
    );
    return config;
  },
};
