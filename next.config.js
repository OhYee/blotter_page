const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const path = require('path');
const withTM = require('next-transpile-modules');
const cssLoaderGetLocalIdent = require('css-loader/lib/getLocalIdent.js');
// const generateTheme = require('next-dynamic-antd-theme/plugin');

// =================================
const fs = require('fs');
const { generateTheme, getLessVars } = require('antd-theme-generator');

class Plugin {
  constructor(generator) {
    this.generator = generator;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('NextDynamicAntDesignPlugin', async (compilation, callback) => {
      this.generator();
      callback();
    });
  }
}

function generateTheme2(themeOptions) {
  var {
    antDir = path.join('node_modules/antd'),
    antdStylesDir = path.join(antDir, 'lib'),
    stylesDir,
    varFile,
    outputFilePath,
    cssModules,
    themeVariables,
    customColorRegexArray = [],
  } = themeOptions;

  // read themes
  var themes = {};
  const files = fs.readdirSync(path.join(antdStylesDir, 'style/themes'));
  const reg = /(.*)\.less/;
  files.map((file) => {
    const res = reg.exec(file);
    if (!!res && res[1] !== 'index') {
      const name = res[1];
      const filepath = path.join(antdStylesDir, 'style/themes', file);
      themes[name] = getLessVars(filepath);
    }
  });
  if (!themeVariables) {
    themeVariables = Object.keys(themes.dark);
    // themeVariables = Array.from(
    //   new Set(
    //     Object.values(themes)
    //       .map((item) => Object.keys(item))
    //       .reduce((a, b) => a.concat(b)),
    //   ),
    // );
  }
  console.log(themeVariables);
  const generator = async () => {
    try {
      const dir = path.dirname(themeOptions.outputFilePath);
      if (!(await fs.existsSync(dir))) {
        await fs.mkdirSync(dir);
      }

      await generateTheme({
        antDir,
        antdStylesDir,
        stylesDir,
        varFile,
        outputFilePath,
        cssModules,
        themeVariables,
        customColorRegexArray,
      });
    } catch (e) {
      console.log('Error', e);
    }
  };
  console.log(themes);
  return (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      publicRuntimeConfig: {
        // Will be available on both server and client
        ...nextConfig.publicRuntimeConfig,
        next_dynamic_antd_themes: themes,
      },
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
      webpack(config, options) {
        // config.node = { fs: 'empty' };
        config.plugins.push(new Plugin(generator));

        return typeof nextConfig.webpack === 'function'
          ? nextConfig.webpack(config, options)
          : config;
      },
    });
  };
}
// ==============================
//==========================

const prod = process.env.NODE_ENV === 'production';

const withAntdTheme = generateTheme2({
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './theme'),
  varFile: path.join(__dirname, './theme/vars.less'),
  mainLessFile: path.join(__dirname, './theme/main.less'),
  outputFilePath: path.join(__dirname, './.next/static/color.less'),
});

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

module.exports = withPlugins([withAntd, withTM, withLess, withCss, withSass, withAntdTheme], {
  serverRuntimeConfig: {
    //这里的配置项只能在服务端获取到，在浏览器端是获取不到的
  },
  publicRuntimeConfig: {
    //这里的配置既可以服务端获取到，也可以在浏览器端获取到
  },
  webpack: (config, options) => {
    // TODO: Remove after next.js update
    // https://github.com/zeit/next.js/issues/7779
    config.resolve.alias['@'] = path.resolve(__dirname, '.');

    // TypeScript check
    // config.plugins.push(
    //   new ForkTsCheckerWebpackPlugin({
    //     tsconfig: './tsconfig.json',
    //   }),
    // );

    return config;
  },
});
