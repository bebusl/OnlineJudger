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
      "k.kakaocdn.net",
      "asset.programmers.co.kr",
      "brillbeimages.s3.ap-northeast-2.amazonaws.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
