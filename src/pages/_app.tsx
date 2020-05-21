import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { debounce } from 'throttle-debounce';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import './_app.scss';

dayjs.extend(utc);

const WebFont = dynamic(import('../components/WebFont'), { ssr: false });

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

  useEffect(() => {
    const handleRouteChange = (url) => {
      try {
        // @ts-ignore
        window.gtag.pageview(url);
      } catch (err) {
        // do nothing.
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <WebFont />
      <Component {...pageProps} />
    </>
  );
};

export default App;
