import { FC } from 'react';
import SiteHeader from '~/components/SiteHeader';
import styles from './index.module.scss';

type Props = {};

const SiteLayout: FC<Props> = ({ children }) => (
  <div>
    <SiteHeader />
    hello,
    {children}
  </div>
);

export default SiteLayout;
