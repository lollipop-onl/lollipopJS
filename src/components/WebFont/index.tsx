import { FC } from 'react';
import WebFontLoader from 'webfontloader';

type Props = {};

const WebFont: FC<Props> = () => {
  WebFontLoader.load({
    google: {
      families: ['DM+Mono:ital,wght@0,300;0,500;1,300;1,500', 'Noto+Sans+JP:wght@300;700', 'Quicksand:wght@500;700'],
    },
  });

  return null;
};

export default WebFont;
