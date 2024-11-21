import path from "path";

const nextConfig = {
  output: "standalone",
  assetPrefix: "./",
  async rewrites() {
    return [
      {
        source: "/external_contents/:path*",
        destination: "/api/external/:path*", // Map to the new API route
      },
    ];
  },
};

export default nextConfig;
