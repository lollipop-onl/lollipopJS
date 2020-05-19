import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import './_app.scss';

const WebFont = dynamic(import('../components/WebFont'), { ssr: false });

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <WebFont />
    <Component {...pageProps} />
  </>
);

export default App;
