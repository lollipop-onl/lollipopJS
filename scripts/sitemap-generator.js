const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const urlJoin = require('url-join');
const { js2xml } = require('xml-js');

const { OUTPUT_DIR = 'dist' } = process.env;
const BASE_URL = 'https://js.lollipop.onl';
const DIST_DIR = path.join(__dirname, '..', OUTPUT_DIR);

const htmlFiles = fg.sync(path.join(DIST_DIR, '**/*.html'))
  .map((path) => path.replace(DIST_DIR, ''))
  .filter((path) => /index\.html$/.test(path))
  .map((path) => path.replace(/index\.html$/, ''));

/** @type import('xml-js').ElementCompact */
const sitemapXml = {
  _declaration: {
    _attributes: {
      version: '1.0',
      encoding: 'utf-8',
    },
  },
  urlset: {
    _attributes: {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    },
    url: htmlFiles.map((path) => {
      return {
        loc: urlJoin(BASE_URL, path),
      };
    }),
  },
};

const xml = js2xml(sitemapXml, {
  compact: true,
  spaces: 2,
});

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml,'utf8');
