/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.weatherapi.com"],
  },
  env: {
    API_KEY: process.env.REACT_APP_API_KEY,
  },
  experimental: {
    fontLoaders: [
      { loader: "next/font/google", options: { subsets: ["latin"] } },
    ],
  },
};

module.exports = nextConfig;
