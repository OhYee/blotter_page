// require('regenerator-runtime/runtime');
const server = require('umi-server');
const http = require('http');
const { createReadStream } = require('fs');
const { join, extname } = require('path');
const { getTitle } = require('./src/utils/prerender');

const root = join(__dirname, 'dist');
const render = server({
  root,
  postProcessHtml: [
    ($, path) => {
      const title = getTitle();
      if (title) {
        $('title').html()
          ? $('title').text(title)
          : $('html head').prepend(`<title>${title}</title>`);
      }
      return $;
    },
  ],
});
const headerMap = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/jpeg',
};

http
  .createServer(async (req, res) => {
    const ext = extname(req.url);
    const header = {
      'Content-Type': headerMap[ext] || 'text/html',
    };
    res.writeHead(200, header);

    if (!ext) {
      // url render
      const ctx = {
        req,
        res,
      };
      const { ssrHtml } = await render(ctx);
      res.write(ssrHtml);
      res.end();
    } else {
      // static file url
      if (process.env.NODE_ENV === 'development') {
        var sreq = http.request(
          {
            hostname: '127.0.0.1',
            method: 'GET',
            port: 50001,
            path: req.url,
          },
          function(sres) {
            sres.pipe(res);
            sres.on('end', function() {
              //   console.log('done');
            });
          },
        );
        if (/POST|PUT/i.test(req.method)) {
          req.pipe(sreq);
        } else {
          sreq.end();
        }
      } else {
        const path = join(root, req.url);
        const stream = createReadStream(path);
        stream.on('error', error => {
          res.writeHead(404, 'Not Found');
          res.end();
        });
        stream.pipe(res);
      }
    }
  })
  .listen(50002);

console.log('http://localhost:50002');
