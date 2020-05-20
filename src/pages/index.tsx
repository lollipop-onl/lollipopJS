import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Entry } from 'contentful';
import dayjs from 'dayjs';
import SiteLayout from '~/components/SiteLayout';
import { ContentfulContentType, PAGES } from '~/constants';
import { BlogPost } from '~/types';
import { contentful, getTitle, url } from '~/utils';
import styles from './index.module.scss';

type Props = {
  entries: Entry<BlogPost>[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { items: entries } = await contentful.client.getEntries<BlogPost>({
    content_type: ContentfulContentType.BLOG_POST,
  });

  return {
    props: {
      entries,
    },
  };
};

const IndexPage: FC<Props> = ({ entries }) => (
  <SiteLayout>
    <Head>
      <title>{getTitle()}</title>
    </Head>
    <div className={styles.indexPage}>
      <ol className={styles.entryList}>
        {entries.map((entry) => {
          const { id } = entry.sys;
          const { title, category } = entry.fields;
          const d = dayjs(new Date(entry.sys.updatedAt));
          const postLink = url(PAGES.BLOG_POST, { id });
          const categoryLink = url(PAGES.CATEGORY_POSTS, { id: category.sys.id, page: 1 });

          return (
            <li key={id} className={styles.item}>
              <time dateTime={d.toISOString()} className={styles.date}>{d.format('YYYY/MM/DD')}</time>
              <Link href={categoryLink}>
                <a className={styles.category}>{category.fields.name}</a>
              </Link>
              <Link href={postLink}>
                <a className={styles.title}>{title}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  </SiteLayout>
);

export default IndexPage;
