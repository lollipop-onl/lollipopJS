import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { EntryCollection, Entry } from 'contentful';
import SiteLayout from '~/components/SiteLayout';
import { ContentfulContentType, PAGES } from '~/constants';
import { BlogPost } from '~/types';
import { contentful, url } from '~/utils';
import styles from './index.module.scss';

type Props = {
  entries: Entry<BlogPost>[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogEntries = await contentful.client.getEntries<EntryCollection<BlogPost>>({});
  const entries = contentful.filterEntries<BlogPost>(ContentfulContentType.BLOG_POST, blogEntries);

  return {
    props: {
      entries,
    },
  };
};

const IndexPage: React.FC<Props> = ({ entries }) => (
  <SiteLayout>
    <Head>
      <title>lollipopJS</title>
    </Head>
    <div className={styles.indexPage}>
      <ol className={styles.entryList}>
        {entries.map((entry) => {
          const { slug, title, category } = entry.fields;
          const postLink = url(PAGES.BLOG_POST, { slug });
          const categoryLink = url(PAGES.CATEGORY_POSTS, { slug: category.fields.slug, page: 1 });

          return (
            <li key={entry.sys.id} className={styles.item}>
              <div className="date">{entry.sys.createdAt}</div>
              <Link href={categoryLink}>
                <a className="category">{category.fields.name}</a>
              </Link>
              <Link href={postLink}>
                <a className="title">{title}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  </SiteLayout>
);

export default IndexPage;
