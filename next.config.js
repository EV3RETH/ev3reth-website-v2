/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "ev3reth.s3.us-west-2.amazonaws.com", "ipfs.fleek.co", "gateway.ipfs.io"]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

module.exports = nextConfig
