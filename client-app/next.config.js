const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({ reactStrictMode: true });

// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// };
