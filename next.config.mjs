/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone'
};

module.exports = {
      env: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
    };

export default nextConfig;
