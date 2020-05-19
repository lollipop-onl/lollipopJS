import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { debounce } from 'throttle-debounce';
import './_app.scss';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const handleResize = debounce(50, () => {
      const vh = window.innerHeight * 0.01;
      const { documentElement } = document;

      documentElement.style.setProperty('--vh', `${vh}px`);
    });

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="//fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,500;1,300;1,500&family=Noto+Sans+JP:wght@300;700&family=Quicksand:wght@400;700&display=swap" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
