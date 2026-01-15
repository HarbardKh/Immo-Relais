/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ne pas bloquer le build en production si des erreurs ESLint mineures
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Ne pas bloquer le build en production si des erreurs TypeScript mineures
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        // Appliquer les headers de sécurité à toutes les routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

