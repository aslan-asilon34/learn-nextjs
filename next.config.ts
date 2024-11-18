import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug',
        destination: 'http://localhost:8000/api/v1/produk/:slug',
      },
    ];
  },
  images: {
    domains: ['example.com', 'cdn.example.com', 'pagedone.io', 'umedalife.jp', 'fakestoreapi.com'],  // Menambahkan domain tempat gambar Anda berasal
  },
};

export default nextConfig;
