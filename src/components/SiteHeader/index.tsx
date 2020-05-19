import { FC } from 'react';
import styles from './index.module.scss';

type Props = {};

const SiteHeader: FC<Props> = () => (
  <div className={styles.siteHeader}>
    <div className={styles.container}>
      hello,
    </div>
  </div>
);

export default SiteHeader;
