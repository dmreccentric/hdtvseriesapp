/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // enables React Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // allow TMDB poster paths
      },
    ],
  },
};

module.exports = nextConfig;
