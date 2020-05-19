import React from 'react';
import styles from './index.module.scss';

const IndexPage: React.FC<{}> = () => (
  <div className={styles.indexPage}>
    This is home page.
    <span className={styles.foo}>
      <span className={[styles.message, styles.Variant].join(' ')}>
        This is variant
      </span>
      Hello you.
    </span>
  </div>
);

export default IndexPage;
