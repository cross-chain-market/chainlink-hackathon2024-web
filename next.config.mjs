import "dotenv/config";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    marketplace_avalanche_fuji_contract_address:
      process.env.marketplace_avalanche_fuji_contract_address,
    collectionsFactory_avalanche_fuji_contract_address:
      process.env.collectionsFactory_avalanche_fuji_contract_address,
    priceFeed_avalanche_fuji_contract_address:
      process.env.priceFeed_avalanche_fuji_contract_address,
    WORKING_ENV: process.env.WORKING_ENV,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
