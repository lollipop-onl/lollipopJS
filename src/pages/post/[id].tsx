import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Entry } from 'contentful';
import dayjs from 'dayjs';
import cn from 'classnames';
import SiteLayout from '~/components/SiteLayout';
import HeadMeta from '~/components/HeadMeta';
import { ContentfulContentType, PAGES } from '~/constants';
import { BlogPost } from '~/types';
import { contentful, getTitle, url } from '~/utils';
import styles from './[id].module.scss';

const AppMarkdown = dynamic(import('~/components/AppMarkdown'));

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
  const router = useRouter();
  const {
    title, image, category, body,
  } = entry.fields;
  const d = dayjs(new Date(entry.sys.updatedAt));
  const categoryLink = url(PAGES.CATEGORY_POSTS, { id: category.sys.id, page: 1 });

  return (
    <SiteLayout>
      <Head>
        <title>{getTitle(title)}</title>
        <HeadMeta
          title={getTitle(title)}
          path={router.asPath}
          image={image.fields.file.url}
        />
      </Head>
      <div className={styles.postPage}>
        <h1 className={styles.title}>
          <span className={styles.inner}>{title}</span>
        </h1>
        <div className={cn(styles.postMeta, styles.meta)}>
          <Link href={categoryLink}>
            <a className={styles.category}>{category.fields.name}</a>
          </Link>
          <time dateTime={d.toISOString()} className={styles.date}>{d.format('YYYY/MM/DD h:mm A')}</time>
        </div>
        <img className={styles.thumbnail} src={image.fields.file.url} alt={image.fields.title} />
        <AppMarkdown className={styles.body} source={body} />
      </div>
    </SiteLayout>
  );
};

export default PostPage;
