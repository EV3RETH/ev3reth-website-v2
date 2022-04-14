/** @type {import('next').NextConfig} */
const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: true,
  ...withImages()
}

module.exports = nextConfig
