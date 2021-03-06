import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SITE_TITLE, PAGES } from '~/constants';
import styles from './index.module.scss';

type Props = {};

const SiteHeader: FC<Props> = () => (
  <header className={styles.siteHeader}>
    <div className={styles.container}>
      <Link href={PAGES.TOP}>
        <a className={styles.siteHeaderLogo}>
          <span className={styles.logo}>{SITE_TITLE}</span>
        </a>
      </Link>
      <ul className={cn(styles.siteHeaderMenu, styles.menu)}>
        <li className={styles.item}><a href="https://twitter.com/lollipop_onl" className={styles.link}>Twitter</a></li>
        <li className={styles.item}><a href="https://qiita.com/simochee" className={styles.link}>Qiita</a></li>
      </ul>
    </div>
  </header>
);

export default SiteHeader;
