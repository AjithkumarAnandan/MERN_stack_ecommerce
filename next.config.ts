import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, 
   experimental: {
    nextScriptWorkers: false,
    scrollRestoration: false,
  },
  typescript:{
  ignoreBuildErrors:true,
  },
  async rewrites() {
    return [
      {
        source:'/',
        destination:'/login'
      }
    ]
  }

};

export default nextConfig;
