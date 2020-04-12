const webpack = require('webpack')
const AutoUpload = require('@minjs/cdn-node-ssh')
const pkg = require('./package.json')
const APP_NAME = pkg.name.split('-')[0]

const styleInject = {
  'style-resources-loader': {
    preProcessor: 'less',
    patterns: [
      './src/styles/common/_variable.less'
    ]
  }
}

const isProd = process.env.NODE_ENV === 'production'
const publicPath = 'http://' + process.env.CDN_HOST + '/' + APP_NAME

const localDir = process.env.LOCAL_DIR

const plugins = []

module.exports = {
  devServer: {
    port: process.env.SERVER_PORT,
    // 自动调用默认浏览器打开
    open: true,
    proxy: {
      '/api': {
        target: 'http://' + process.env.PROXY_HOST,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 输出目录
  outputDir: localDir,
  // 资源根目录
  publicPath: isProd ? publicPath : './',
  // 自动化导入文件mixin到SFC
  pluginOptions: {
    ...styleInject
  },
  configureWebpack: {
    plugins: isProd ? plugins.concat([
      new webpack.BannerPlugin({
        banner: `@bundleinfo-${(new Date()).toLocaleString()}`
      }),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('Upload files', compilation => {
            const config = require('../config/cdn.config')
            config.remote += `/${APP_NAME}`
            config.local = localDir

            const upload = new AutoUpload(config)

            upload.start()
          })
        }
      }
    ]) : plugins
  }
}
