import { FC, useRef, useEffect } from 'react';
import cn from 'classnames';
import markdown from './markdown';
import styles from './index.module.scss';

type Props = {
  className?: string;
  source: string;
};

const AppMarkdown: FC<Props> = ({ className, source }) => {
  const sectionRef = useRef<HTMLSelectElement>(null);
  const html = markdown(source);

  useEffect(() => {
    const { current } = sectionRef;

    if (current == null) {
      return;
    }

    const youtubeVideoElements = current.getElementsByClassName('youtubeVideo');

    for (let i = youtubeVideoElements.length - 1; i >= 0; i -= 1) {
      const youtubeVideo = youtubeVideoElements.item(i);
      const videoId = youtubeVideo.getAttribute('data-video-id');

      if (videoId == null) {
        continue;
      }

      const iframeElement = document.createElement('iframe');

      iframeElement.classList.add('iframe');
      iframeElement.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}`);
      iframeElement.setAttribute('frameborder', '0');
      iframeElement.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      iframeElement.setAttribute('allowfullscreen', '');

      youtubeVideo.appendChild(iframeElement);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(styles.appMarkdown, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default AppMarkdown;
