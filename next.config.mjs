import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPWAConfig(nextConfig);
