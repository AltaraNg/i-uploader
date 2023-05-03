/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["tailwindui.com", "altara-staging.s3.amazonaws.com", "altaraone.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa")({
//   dest: "public",
// });

// module.exports = withPWA({
//   experimental: {
//     appDir: true,
//   },
//   images: {
//     domains: ["tailwindui.com", "altara-staging.s3.amazonaws.com", "altaraone.s3.amazonaws.com"],
//   },
// });
