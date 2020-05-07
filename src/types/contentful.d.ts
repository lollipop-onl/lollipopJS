import { Asset, Entry } from 'contentful';

export type BlogTag = {
  name: string;
  slug: string;
};

export type BlogPost = {
  body: string;
  image: Asset;
  publishDate: string;
  slug: string;
  tags: Entry<BlogTag>;
  title: string;
};
