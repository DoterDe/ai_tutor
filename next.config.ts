/** @type {import('next').NextConfig} */
const nextConfig = {
  // Разрешаем доступ с других устройств в локальной сети
  serverExternalPackages: [],
  experimental: {
    allowedDevOrigins: ['192.168.1.70', 'localhost:3000'],
  },
};

export default nextConfig;