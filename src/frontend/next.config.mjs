/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "./",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/uploads/**",
      }
    ]
  }
};

module.exports = nextConfig;
