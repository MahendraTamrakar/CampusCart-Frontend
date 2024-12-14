/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['campuscartbackend.onrender.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  };
  
  export default nextConfig;
  