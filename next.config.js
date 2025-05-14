/** @type {import('next').NextConfig} */

const nextConfig = {
  optimizeFonts: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "inredd.com.br",
      },
    ],
  },
};

module.exports = nextConfig;
