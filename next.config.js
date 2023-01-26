const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
          port: "",
          pathname: "/u/**",
        },
      ],
    },

    webpack(config) {
        config.plugins.push(
          new CopyPlugin({
            patterns: [
              {
                from: path.resolve(path.dirname(require.resolve("shiki")), ".."),
                to: "static/shiki/",
              },
            ],
          })
        );
      
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        
        return config;
    }
};
