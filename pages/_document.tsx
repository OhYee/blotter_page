import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#1565c0" />
          <meta name="msapplication-TileColor" content="#1565c0" />
          <meta name="msapplication-TileImage" content="/static/img/logo_196x196.png" />
          <link rel="shortcut icon" href="/static/img/favicon.ico"></link>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
            integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
            crossOrigin="anonymous"
          ></link>
          {/* 百度自动推送 */}
          <script
            dangerouslySetInnerHTML={{
              __html: `// 百度自动推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?9f114bc8c6227268e6d0e44abd656932";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
