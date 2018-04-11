/*
webpack开发环境配置
 */
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  // 出口
  output: {
    filename: '[name].js'
  },
  // 模块
  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  // 开启开发环境下的: sourceMap调试
  devtool: 'cheap-module-eval-source-map',
})
