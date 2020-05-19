import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Entry } from 'contentful';
import SiteLayout from '~/components/SiteLayout';
import { ContentfulContentType, SITE_TITLE } from '~/constants';
import { BlogPost } from '~/types';
import { contentful, getTitle } from '~/utils';
import styles from './[id].scss';

type Props = {
  entry: Entry<BlogPost>
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const entry = await contentful.client.getEntry<BlogPost>(id);

  return {
    props: {
      entry,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { items: entries } = await contentful.client.getEntries<BlogPost>({
    content_type: ContentfulContentType.BLOG_POST,
  });

  return ({
    paths: entries.map((entry) => ({ params: { id: entry.sys.id } })),
    fallback: false,
  });
};

const PostPage: FC<Props> = ({ entry }) => {
  const { title } = entry.fields;

  return (
    <SiteLayout>
      <Head>
        <title>{getTitle(title)}</title>
      </Head>
      <h1>{title}</h1>
    </SiteLayout>
  );
};

export default PostPage;
