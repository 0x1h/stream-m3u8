/** @type {import('tailwindcss').Config} */

const config = require("@stream-m3u8/ui/tailwind.config")

module.exports = {
  ...config,
  content: [
    "./**/*.{ts,tsx}",
  ],};
