require('dotenv').config();

const packageJson = require('./package.json');

module.exports = {
  env: {
    VERSION: packageJson.version,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  exportTrailingSlash: true,
  exportPathMap: () => {
    return {
      '/404.html': { page: '/404' },
    };
  },
};
