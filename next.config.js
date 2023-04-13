// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   images: {
//     domains: ["tailwindui.com"],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["tailwindui.com"],
  },
});
