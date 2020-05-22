import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Entry } from 'contentful';
import dayjs from 'dayjs';
import HeadMeta from '~/components/HeadMeta';
import SiteLayout from '~/components/SiteLayout';
import { ContentfulContentType } from '~/constants';
import { DiaryPost } from '~/types';
import { contentful, getTitle } from '~/utils';
import styles from './[id].module.scss';

const AppMarkdown = dynamic(import('~/components/AppMarkdown'));

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
  const router = useRouter();
  const { title, body } = entry.fields;
  const d = dayjs(entry.sys.createdAt).utcOffset(9);

  console.log(router);

  return (
    <SiteLayout>
      <Head>
        <title>{getTitle(title)}</title>
        <HeadMeta
          title={getTitle(title)}
          path={router.asPath}
          image=""
        />
      </Head>
      <div className={styles.diaryPost}>
        <h1 className={styles.title}>{title}</h1>
        <time className={styles.date} dateTime={d.toISOString()}>{d.format('YYYY/MM/DD H:mm')} JST</time>
        <AppMarkdown className={styles.body} source={body} />
      </div>
    </SiteLayout>
  );
};

export default DiaryPostPage;
