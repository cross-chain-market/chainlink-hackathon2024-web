import 'dotenv/config'
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        my_env: process.env.WORKING_ENV
    }
};

export default nextConfig;
