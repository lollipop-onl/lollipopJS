import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SiteLayout from '~/components/SiteLayout';
import { PAGES} from '~/constants';
import { getTitle } from '~/utils';
import styles from './404.module.scss';

type Props = {};

const NotFoundPage: FC<Props> = () => (
  <SiteLayout>
    <Head>
      <title>{getTitle('Page Not Found')}</title>
    </Head>
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.message}>お探しのページは存在しないか、URLが変更になりました。</p>
      <Link href={PAGES.TOP}><a className={styles.link}>Back to Top</a></Link>
    </div>
  </SiteLayout>
);

export default NotFoundPage;
