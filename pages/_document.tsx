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
