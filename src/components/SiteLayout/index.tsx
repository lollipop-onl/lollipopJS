import { FC } from 'react';
import SiteHeader from '~/components/SiteHeader';
import styles from './index.module.scss';

type Props = {};

const SiteLayout: FC<Props> = ({ children }) => (
  <div className={styles.siteLayout}>
    <SiteHeader />
    {children}
  </div>
);

export default SiteLayout;
