const styleInject = {
  'style-resources-loader': {
    preProcessor: 'less',
    patterns: [
      './src/styles/common/_variable.less'
    ]
  }
}

module.exports = {
  // 自动化导入文件mixin到SFC
  pluginOptions: {
    ...styleInject
  }
}
