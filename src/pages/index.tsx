import React from 'react';
import Head from 'next/head';
import SiteLayout from '~/components/SiteLayout';
import styles from './index.module.scss';

const IndexPage: React.FC<{}> = () => (
  <SiteLayout>
    <Head>
      <title>lollipopJS</title>
    </Head>
    <div className={styles.indexPage}>This is home page.</div>
  </SiteLayout>
);

export default IndexPage;
