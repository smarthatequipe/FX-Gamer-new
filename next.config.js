/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removendo output: 'export' para permitir rotas dinâmicas sem pré-geração
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
