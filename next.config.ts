import type { NextConfig } from "next";

const repo = "dariy-shop";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
