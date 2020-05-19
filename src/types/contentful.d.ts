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

export type DiaryPost = {
  title: string;
  image: Asset;
  body: string;
  publishDate: string;
};

export type ContentfulEntry = BlogCategory | BlogTag | BlogPost | DiaryPost;

export type BlogPostArchive = {
  year: number;
  month: number;
  count: number;
}
