/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем проверку типов при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
  // Отключаем линтинг при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Разрешаем изображения из Supabase
  images: {
    domains: ['lhysguzndraiqvrffixl.supabase.co'],
  },
  // Настройка статической генерации
  output: 'standalone',
  // Убираем экспериментальные функции
  experimental: {},
}

module.exports = nextConfig