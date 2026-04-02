/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.motorcycle.com' },
      { protocol: 'https', hostname: 'cdn-fastly.motorcycle.com' },
      { protocol: 'https', hostname: 'ridermagazine.com' },
      { protocol: 'https', hostname: 'powersportsbusiness.com' },
      { protocol: 'https', hostname: 'motorcyclenews.com' },
      { protocol: 'https', hostname: 'cloudfront-us-east-1.images.arcpublishing.com' },
      { protocol: 'https', hostname: 'yplehzgtdgyygywbmldy.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};

export default nextConfig;
