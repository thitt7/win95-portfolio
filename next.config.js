/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
    
      eslint: {
        ignoreDuringBuilds: true,
      },
      
      typescript: {
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
