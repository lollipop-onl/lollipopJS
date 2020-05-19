import Contentful from './Contentful';

const contentful = new Contentful(
  process.env.CONTENTFUL_SPACE_ID,
  process.env.CONTENTFUL_ACCESS_TOKEN,
);

export { contentful };
