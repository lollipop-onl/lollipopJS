import { FC } from 'react';
import SiteHeader from '~/components/SiteHeader';
import SiteFooter from '~/components/SiteFooter';
import styles from './index.module.scss';

type Props = {};

const SiteLayout: FC<Props> = ({ children }) => (
  <div className={styles.siteLayout}>
    <SiteHeader />
    {children}
    <div className={styles.footer}>
      <SiteFooter />
    </div>
  </div>
);

export default SiteLayout;
