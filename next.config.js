const prod = process.env.NODE_ENV === 'production';

module.exports = {
  serverRuntimeConfig: {
    //这里的配置项只能在服务端获取到，在浏览器端是获取不到的
  },
  publicRuntimeConfig: {
    //这里的配置既可以服务端获取到，也可以在浏览器端获取到
  },
};
