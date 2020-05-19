import { FC } from 'react';
import Link from 'next/link';
import { PAGES } from '~/constants';
import { url } from '~/utils';
import styles from './index.module.scss';

type Props = {};

const SiteFooter: FC<Props> = () => (
  <footer className={styles.siteFooter}>
    <div className={styles.container}>
      <small className={styles.copyright}>
        &copy; 2020 simochee
      </small>
      <Link href={url(PAGES.DIARY_POSTS, { page: 1 })}>
        <a className={styles.link}>Diary</a>
      </Link>
    </div>
  </footer>
);

export default SiteFooter;
