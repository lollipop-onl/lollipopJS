import { FC } from 'react';
import urlJoin from 'url-join';
import { SITE_BASE_URL, SITE_TWITTER_ID } from '~/constants';

type Props = {
  title: string;
  image: string;
  path: string;
};

const HeadMeta: FC<Props> = ({
  title, image, path,
}) => {
  const url = urlJoin(SITE_BASE_URL, path);
  const imageUrl = image.startsWith('https:') ? image : `https:${image}`;

  return (
    <>
      <meta name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={url} />
      <meta name="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_TWITTER_ID} />
      <meta name="twitter:creator" content={SITE_TWITTER_ID} />
    </>
  );
};

export default HeadMeta;
