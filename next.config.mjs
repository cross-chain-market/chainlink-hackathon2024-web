import "dotenv/config";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
<<<<<<< HEAD
    marketplace_avalanche_fuji_contract_address: process.env.marketplace_avalanche_fuji_contract_address,
    collectionsFactory_avalanche_fuji_contract_address: process.env.collectionsFactory_avalanche_fuji_contract_address,
    priceFeed_avalanche_fuji_contract_address: '0x1b78029aEe9D5A168b165A8089294505D4ee27A1',
    WORKING_ENV: process.env.WORKING_ENV
=======
    marketplace_avalanche_fuji_contract_address:
      process.env.marketplace_avalanche_fuji_contract_address,
    collectionsFactory_avalanche_fuji_contract_address:
      process.env.collectionsFactory_avalanche_fuji_contract_address,
    priceFeed_avalanche_fuji_contract_address:
      process.env.priceFeed_avalanche_fuji_contract_address,
    WORKING_ENV: process.env.WORKING_ENV,
>>>>>>> 13e7e984d874f7ed5584003aa59c8f5629794701
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
