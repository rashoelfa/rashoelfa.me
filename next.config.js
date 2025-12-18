/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  output: "standalone",
  turbopack: {},
  webpack: (config, { dev }) => {
    if (!dev) {
      const path = require("path");

      const hashOnlyIdent = (context, _, exportName) => {
        const crypto = require("crypto");
        const content = `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, "/")}#className:${exportName}`;

        return crypto
          .createHash("sha256")
          .update(content)
          .digest("base64")
          .replace(/[^a-zA-Z0-9-_]/g, "_")
          .replace(/^(-?\d|--)/, "_$1")
          .substring(0, 6);
      };

      const rules = config.module.rules
        .find((rule) => typeof rule.oneOf === "object")
        .oneOf.filter((rule) => Array.isArray(rule.use));

      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes("css-loader") &&
            !moduleLoader.loader?.includes("postcss-loader") &&
            moduleLoader.options?.modules
          ) {
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
          }
        });
      });
    }

    return config;
  },
};

module.exports = nextConfig;
