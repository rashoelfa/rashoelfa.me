/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://rashoelfa.me',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,

    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  }