/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          port: '',
          pathname: '/**',
        },
      ],
    },
    // ... any other existing configuration
  };
  
  export default nextConfig;
