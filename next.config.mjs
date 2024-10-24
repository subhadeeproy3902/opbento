/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.map$/,
      use: 'raw-loader',
      type: 'asset/resource'
    });
    return config;
  }
};

export default nextConfig;
