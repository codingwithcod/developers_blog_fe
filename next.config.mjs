/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
      },
      {
        hostname: "madewithreact.com",
      },
    ],
  },
};

export default nextConfig;
