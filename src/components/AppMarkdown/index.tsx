import { FC } from 'react';
import cn from 'classnames';
import markdown from './markdown';
import styles from './index.module.scss';

type Props = {
  className?: string;
  source: string;
};

const AppMarkdown: FC<Props> = ({ className, source }) => {
  const html = markdown(source);

  return <section className={cn(styles.appMarkdown, className)} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default AppMarkdown;
