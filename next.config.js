/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.pixabay.com",
      "lh3.googleusercontent.com",
      "cdn.jsdelivr.net",
    ],
    typescript: {
      ignoreBuildErros: true,
    },
  },
};

module.exports = nextConfig;
