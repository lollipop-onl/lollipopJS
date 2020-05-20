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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;1,400&family=Noto+Sans+JP:wght@300;700&family=Quicksand:wght@400;700&display=swap" />
          <script src="https://kit.fontawesome.com/502adee0f5.js" crossOrigin="anonymous" />
        </body>
      </html>
    );
  }
}

export default MyDocument;
