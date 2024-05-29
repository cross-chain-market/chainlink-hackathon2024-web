import "dotenv/config";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    marketplace_43113: process.env.marketplace_43113,
    marketplace_80002: process.env.marketplace_80002,
    
    collectionsFactory_43113: process.env.collectionsFactory_43113,
    collectionsFactory_80002: process.env.collectionsFactory_80002,
    
    priceFeed_43113: process.env.priceFeed_43113,
    priceFeed_80002: process.env.priceFeed_80002,
    
    avalanacheFujiEndpoint: process.env.avalanacheFujiEndpoint,
    polygonAmoyEndpoint: process.env.polygonAmoyEndpoint,
    
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
