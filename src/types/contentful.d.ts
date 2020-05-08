import { Asset, Entry } from 'contentful';

export type BlogCategory = {
  name: string;
  slug: string;
};

export type BlogTag = {
  name: string;
  slug: string;
};

export type BlogPost = {
  body: string;
  category: Entry<BlogCategory>;
  image: Asset;
  publishDate: string;
  slug: string;
  tags: Entry<BlogTag>;
  title: string;
};

export type ContentfulEntry = BlogCategory | BlogTag | BlogPost;
