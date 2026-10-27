/** @type {import('next').NextConfig} */
const nextConfig = {
  // English lives at the root URL; /en/* stays reachable and is canonicalised to /
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/work/:slug", destination: "/en/work/:slug" },
    ];
  },
  async redirects() {
    return [{ source: "/en", destination: "/", permanent: true }];
  },
};

export default nextConfig;
