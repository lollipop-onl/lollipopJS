import { FC } from 'react';
import Link from 'next/link';
import * as C from '~/constants';
import styles from './index.module.scss';

type Props = {};

const SiteHeader: FC<Props> = () => (
  <div className={styles.siteHeader}>
    <div className={styles.container}>
      <Link href={C.PAGES.TOP}>
        <a className={styles.siteHeaderLogo}>
          <span className={styles.logo}>{C.SITE_TITLE}</span>
        </a>
      </Link>
    </div>
  </div>
);

export default SiteHeader;
