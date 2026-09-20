/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/it-servis/:mesto(rozhovice|hrochuv-tynec|nove-mesto-nad-metuji)',
        destination: '/it-servis',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'petrvurm.cz',
      },
    ],
  },
};

export default nextConfig;
