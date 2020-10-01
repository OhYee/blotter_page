// const withLess = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

module.exports = withPlugins([], {
  serverRuntimeConfig: {
    //这里的配置项只能在服务端获取到，在浏览器端是获取不到的
  },
  publicRuntimeConfig: {
    //这里的配置既可以服务端获取到，也可以在浏览器端获取到
  },
  //   lessLoaderOptions: {
  //     javascriptEnabled: true,
  //   },
  //   cssModules: true,
  //   cssLoaderOptions: {
  //     camelCase: true,
  //     localIdentName: '[local]___[hash:base64:5]',
  //   },
  webpack: (config, options) => {
    // TODO: Remove after next.js update
    // https://github.com/zeit/next.js/issues/7779
    config.resolve.alias['@'] = path.resolve(__dirname, '.');

    return config;
  },
});
