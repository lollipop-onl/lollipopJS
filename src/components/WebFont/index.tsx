import { FC, useEffect } from 'react';
import WebFontLoader from 'webfontloader';

type Props = {};

const WebFont: FC<Props> = () => {
  WebFontLoader.load({
    google: {
      families: ['DM+Mono', 'Noto+Sans+JP:wght@300;700', 'Quicksand:wght@500;700'],
    },
  });

  return null;
};

export default WebFont;
