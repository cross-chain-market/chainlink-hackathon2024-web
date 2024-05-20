import "dotenv/config";
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    my_env: process.env.WORKING_ENV,
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
};

export default nextConfig;
