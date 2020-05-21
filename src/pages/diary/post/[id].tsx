import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { Entry } from 'contentful';
import dayjs from 'dayjs';
import SiteLayout from '~/components/SiteLayout';
import AppMarkdown from '~/components/AppMarkdown';
import { ContentfulContentType } from '~/constants';
import { DiaryPost } from '~/types';
import { contentful, getTitle } from '~/utils';
import styles from './[id].module.scss';

type Props = {
  entry: Entry<DiaryPost>
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const entry = await contentful.client.getEntry<DiaryPost>(id);

  return {
    props: {
      entry,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { items: entries } = await contentful.client.getEntries<DiaryPost>({
    content_type: ContentfulContentType.DIARY_POST,
  });

  return ({
    paths: entries.map((entry) => ({ params: { id: entry.sys.id } })),
    fallback: false,
  });
};

const DiaryPostPage: FC<Props> = ({ entry }) => {
  const { title, body } = entry.fields;
  const d = dayjs(entry.sys.createdAt);

  return (
    <SiteLayout>
      <Head>
        <title>{getTitle(title)}</title>
      </Head>
      <div className={styles.diaryPost}>
        <h1 className={styles.title}>{title}</h1>
        <time className={styles.date} dateTime={d.toISOString()}>{d.format('YYYY/MM/DD h:mm A')}</time>
        <AppMarkdown className={styles.body} source={body} />
      </div>
    </SiteLayout>
  );
};

export default DiaryPostPage;
