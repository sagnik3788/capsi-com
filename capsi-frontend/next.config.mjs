/** @type {import('next').NextConfig} */

const serverConfigs = {
  apiUrl: `https://wis-ai-backend-1.onrender.com/`,
};
const nextConfig = {
  distDir: process.env.BUILD_DIR || ".next",
  serverRuntimeConfig: {
    // Will only be available on the server-side
    // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
    apiUrl: serverConfigs.apiUrl,
  },
  // reactStrictMode: true, // Will cause double rendering evreytime in dev mode. see more here: https://github.com/react-bootstrap/react-bootstrap/issues/6084#issuecomment-938898791
  compiler: {},

  experimental: {
    proxyTimeout: 100000 * 120,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `/api/:path*`,
      },
      {
        source: "/api/auth/:path*",
        destination: `/auth/:path*`,
        // Redirect next auth to auth path in app directory
      },
      {
        source: "/api/:path*",
        destination: `${serverConfigs.apiUrl}/api/:path*`, // Redirect all the API requests to API server
      },
    ];
  },
};

export default nextConfig;
