/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://thesmrz.cz',
  generateRobotsTxt: true,
  trailingSlash: true,
  // Runs automatically after `next build` via the postbuild script
};

module.exports = config;
