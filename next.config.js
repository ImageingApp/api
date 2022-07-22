/** @type {import('next').NextConfig} */
const path = require("path");
const redirects = require("./redirects.json");

module.exports = {
  images: {
    domains: ["cdn.discordapp.com"]
  },
  async redirects() {
    return redirects;
  }
};
