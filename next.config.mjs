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
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
