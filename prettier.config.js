// eslint-disable-next-line import/no-extraneous-dependencies
const tailwindPrettierPlugin = require('prettier-plugin-tailwindcss');

module.exports = {
  printWidth: 80,
  trailingComma: 'all',
  singleQuote: true,
  plugins: [tailwindPrettierPlugin],
};
