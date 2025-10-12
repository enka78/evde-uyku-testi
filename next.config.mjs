/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["your-domain.com"], // Gerekirse değiştir
  },
  turbopack: true, // Turbopack dev için doğru anahtar
};

export default nextConfig;
