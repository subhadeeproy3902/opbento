/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "*"
      }
    ]
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
