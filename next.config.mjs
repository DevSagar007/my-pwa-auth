import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in all environments for testing
  sw: "sw.js", // Specify the service worker file
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPWAConfig(nextConfig);
