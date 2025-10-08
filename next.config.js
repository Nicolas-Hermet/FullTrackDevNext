/* eslint-disable  @typescript-eslint/no-require-imports */

const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
};

module.exports = withMDX(nextConfig);
/* eslint-enable  @typescript-eslint/no-require-imports */
