import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lhysguzndraiqvrffixl.supabase.co',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
}

export default nextConfig