import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Настройка изображений
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
  
  // Важно для правильной маршрутизации на Vercel
  trailingSlash: true,
  
  // Настройка для статической генерации
  output: 'standalone',
  
  // Отключаем проверку типов при сборке (если нужно)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Отключаем линтинг при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig