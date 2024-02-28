/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    domains: ['spar.openg2p.my'], 
    path: '/_next/image',
    loader: 'default',
  },
  
};

module.exports = withNextIntl(nextConfig);
