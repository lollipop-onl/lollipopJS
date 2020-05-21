import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Entry } from 'contentful';
import cn from 'classnames';
import SiteLayout from '~/components/SiteLayout';
import { ContentfulContentType, PAGES } from '~/constants';
import { DiaryPost } from '~/types';
import { contentful, getTitle, url } from '~/utils';
import styles from './[page].module.scss';

type Props = {
  entries: Entry<DiaryPost>[]
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { items: entries } = await contentful.client.getEntries<DiaryPost>({
    content_type: ContentfulContentType.DIARY_POST,
  });

  return {
    props: {
      entries,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { page: '1' } },
  ],
  fallback: false,
});

const DiaryPostPage: FC<Props> = ({ entries }) => (
  <SiteLayout>
    <Head>
      <title>{getTitle('Diary')}</title>
    </Head>
    <div className={styles.diaryPostsPage}>
      <ol className={cn(styles.diaryPosts, styles.posts)}>
        {entries.map((entry) => {
          const { id } = entry.sys;
          const { title } = entry.fields;
          const postLink = url(PAGES.DIARY_POST, { id });

          return (
            <li key={id} className={styles.post}>
              <Link href={postLink}><a>{title}</a></Link>
            </li>
          );
        })}
      </ol>
    </div>
  </SiteLayout>
);

export default DiaryPostPage;
