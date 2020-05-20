import { FC } from 'react';
import Link from 'next/link';
import { PAGES } from '~/constants';
import { url } from '~/utils';
import styles from './index.module.scss';

type Props = {};

const SiteFooter: FC<Props> = () => (
  <footer className={styles.siteFooter}>
    <div className={styles.container}>
      <div className={styles.ga}>
        このサイトはGoogleアナリティクスを使用しています。
        <br/>
        <a className={styles.link} href="https://support.google.com/analytics/answer/4597324" target="_blank" rel="noopener noreferrer">Googleアナリティクスポリシー</a>
      </div>
      <small className={styles.copyright}>
        &copy; 2020 simochee
      </small>
      <div className={styles.version}>v{process.env.VERSION}</div>
      <Link href={url(PAGES.DIARY_POSTS, { page: 1 })}>
        <a className={styles.link}>Diary</a>
      </Link>
    </div>
  </footer>
);

export default SiteFooter;
