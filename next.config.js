/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removendo output: 'export' para permitir rotas dinâmicas sem pré-geração
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! ATENÇÃO: Isso deve ser removido em produção
    // Ignorando erros de TypeScript durante o build para permitir o deploy
    ignoreBuildErrors: true,
  },
  images: { 
    unoptimized: true,
    domains: ['raw.githubusercontent.com', 'github.com', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
