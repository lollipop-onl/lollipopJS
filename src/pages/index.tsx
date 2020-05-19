import React from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

const IndexPage: React.FC<{}> = () => (
  <div className={styles.indexPage}>
    This is home page.
    <span className={styles.foo}>
      <span className={cn(styles.message, styles.Variant)}>
        This is variant
      </span>
      Hello you.
    </span>
  </div>
);

export default IndexPage;
