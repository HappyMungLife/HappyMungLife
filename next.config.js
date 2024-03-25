/** @type {import('next').NextConfig} */
const nextConfig = { logging: { fetches: { fullUrl: true } } };

module.exports = {
  images: {
    domains: ['cdn.pixabay.com', 'sxnugjzhqmefhmbwwxlr.supabase.co']
  }
};
