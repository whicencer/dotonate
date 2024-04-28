const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEV_BOT_TOKEN: process.env.DEV_BOT_TOKEN,
    BOT_TOKEN: process.env.BOT_TOKEN,
    MODE: process.env.MODE,
  }
};

module.exports = withBundleAnalyzer(nextConfig);