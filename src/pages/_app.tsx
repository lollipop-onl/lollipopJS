import { useEffect } from 'react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { debounce } from 'throttle-debounce';
import './_app.scss';

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

  return (
    <>
      <WebFont />
      <Component {...pageProps} />
    </>
  );
};

export default App;
