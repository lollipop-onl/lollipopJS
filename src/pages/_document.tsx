import Document, { Head, Main, NextScript } from 'next/document';
import { SITE_GA_TRACKING_ID } from '~/constants';

class MyDocument extends Document {
  render() {
    return (
      <html lang="ja">
        <Head>
          {this.props.isDevelopment ? (
            <>
              <script src={`https://www.googletagmanager.com/gtag/js?id=${SITE_GA_TRACKING_ID}`} async />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${SITE_GA_TRACKING_ID}', {
    page_path: window.location.pathname,
  });
                  `,
                }}
              />
            </>
          ) : null}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://kit.fontawesome.com/502adee0f5.js" crossOrigin="anonymous" />
        </body>
      </html>
    );
  }
}

export default MyDocument;
