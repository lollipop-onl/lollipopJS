import { AppProps } from 'next/app';
import Index from '~/components/AppLayout';
import './_app.scss';

const App = ({ Component, pageProps }: AppProps) => <Index><Component {...pageProps} /></Index>;

export default App;
