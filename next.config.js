/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // enables React Strict Mode
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

module.exports = nextConfig;
