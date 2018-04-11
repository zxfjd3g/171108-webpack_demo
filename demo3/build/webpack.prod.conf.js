/*
webpack生产环境配置
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

// __dirname: 当前文件所在目录的绝对路径
function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {

  // 入口
  entry: {
    // 指定第三方模块包含哪些
    vendor: ["jquery"]
  },

  // 出口
  output: {
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/' // 所有引用的虚拟路径前都添加上此值
  },


  // 模块
  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"]
        })
      },
    ]
  },

  plugins: [
    // 抽取所有css到指定文件
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),

    // 清理dist文件夹
    new CleanPlugin(['dist'], {
      root: resolve('')
    }),

    // 第三方包模块单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将webpack模板代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    // 压缩css
    new OptimizeCssPlugin(),
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {  //压缩配置
        warnings: false  // 不显示警告
      }
    })
  ]
})
