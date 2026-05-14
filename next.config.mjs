const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com'
      }
    ]
  },
  experimental: {
    turbo: {}
  }
};

export default nextConfig;
