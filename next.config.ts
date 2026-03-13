import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Правильная настройка для изображений (замена устаревшего domains)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lhysguzndraiqvrffixl.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Другие настройки можно добавить здесь
  // (удаляем устаревший блок eslint)
}

export default nextConfig