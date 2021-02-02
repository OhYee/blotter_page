<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const prod = process.env.NODE_ENV === 'production';

module.exports = {
=======
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

<<<<<<< HEAD
// const withAntdTheme = generateTheme({
//   antDir: path.join(__dirname, './node_modules/antd'),
//   stylesDir: path.join(__dirname, './theme'),
//   varFile: path.join(__dirname, './theme/vars.less'),
//   outputFilePath: path.join(__dirname, './.next/static/color.less'),
// });

// with ant design
// https://juejin.im/post/5cc74b925188252e741cce09
withAntd = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    cssModules: true,
    cssLoaderOptions: {
      camelCase: true,
      localIdentName: '[local]___[hash:base64:5]',
      getLocalIdent: (context, localIdentName, localName, options) => {
        let hz = context.resourcePath.replace(context.rootContext, '');
        if (/node_modules/.test(hz)) {
          return localName;
        } else {
          return cssLoaderGetLocalIdent(context, localIdentName, localName, options);
        }
      },
    },
    webpack(config, options) {
      if (config.externals) {
        const includes = [/antd/];
        config.externals = config.externals.map((external) => {
          if (typeof external !== 'function') return external;
          return (ctx, req, cb) => {
            return includes.find((include) =>
              req.startsWith('.') ? include.test(path.resolve(ctx, req)) : include.test(req),
            )
              ? cb()
              : external(ctx, req, cb);
          };
        });
      }

      return typeof nextConfig.webpack === 'function'
        ? nextConfig.webpack(config, options)
        : config;
    },
  });
};

<<<<<<< HEAD
module.exports = withPlugins([withAntd, withTM, withLess, withCss, withSass, withAntdTheme], {
>>>>>>> Update gh-pages to output generated at dac18c8
=======
module.exports = withPlugins([withAntd, withTM, withLess, withCss, withSass], {
>>>>>>> Update gh-pages to output generated at 9d66009
=======
module.exports = withPlugins([withLess, withCss], {
>>>>>>> Update gh-pages to output generated at a4a5ace
=======
const prod = process.env.NODE_ENV === 'production';

module.exports = {
>>>>>>> Update gh-pages to output generated at c905054
=======
const prod = process.env.NODE_ENV === 'production';

module.exports = {
>>>>>>> 2ff1061ef... Update gh-pages to output generated at ab9ff6d
  serverRuntimeConfig: {
    //这里的配置项只能在服务端获取到，在浏览器端是获取不到的
  },
  publicRuntimeConfig: {
    //这里的配置既可以服务端获取到，也可以在浏览器端获取到
<<<<<<< HEAD
<<<<<<< HEAD
    version: Date.now(),
  },
};
=======
  },
<<<<<<< HEAD
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    localIdentName: '[local]___[hash:base64:5]',
  },
  webpack: (config, options) => {
    // TODO: Remove after next.js update
    // https://github.com/zeit/next.js/issues/7779
    config.resolve.alias['@'] = path.resolve(__dirname, '.');

    return config;
  },
});
>>>>>>> Update gh-pages to output generated at dac18c8
=======
};
>>>>>>> Update gh-pages to output generated at c905054
=======
  },
};
>>>>>>> 2ff1061ef... Update gh-pages to output generated at ab9ff6d
