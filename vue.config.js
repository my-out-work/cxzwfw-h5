const webpack = require('webpack')
const AutoUpload = require('@minjs/cdn-node-ssh')

const styleInject = {
  'style-resources-loader': {
    preProcessor: 'less',
    patterns: [
      './src/styles/common/_variable.less'
    ]
  }
}

const isProd = process.env.NODE_ENV === 'production'

const plugins = []

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'http://cdn.minjs.cn/cxzwfw' : './',
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
            config.remote += '/cxzwfw'
            config.local = 'dist'

            const upload = new AutoUpload(config)

            upload.start()
          })
        }
      }
    ]) : plugins
  }
}
