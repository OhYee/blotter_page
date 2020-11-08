import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { guessPath } from '@/utils/redirect';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    if (!!ctx.req) {
      const path = guessPath(ctx.req.url);
      if (path !== '') {
        console.log(`301 ${ctx.req.url} ==> ${path}`);
        ctx.res.writeHead(301, {
          Location: path,
        });
        ctx.res.end();
      }
    }

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta content="utf-8" httpEquiv="encoding" />
          <meta name="theme-color" content="#1565c0" />
          <meta name="msapplication-TileColor" content="#1565c0" />
          <meta name="msapplication-TileImage" content="/static/img/logo_196x196.png" />
          <link rel="shortcut icon" href="/static/img/favicon.ico"></link>
        </Head>
        <body>
          <Main />
          <div id="portals"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
