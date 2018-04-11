// 使用内置的路径操作工具包
var path = require('path')
// 使用一些小工具
var utils = require('./utils')
// 加载 webpack
var webpack = require('webpack')
// 加载 confi.index.js
var config = require('../config')
// 加载 webpack 配置合并工具
var merge = require('webpack-merge')
// 加载 webpack.base.conf.js
var baseWebpackConfig = require('./webpack.base.conf')
// 加载用来拷贝static下的静态资源文件的webpack插件
var CopyWebpackPlugin = require('copy-webpack-plugin')
// 加载生成主html页面的webpack插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 加载用来将css单独打包的webpack插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 加载压缩css文件的webpack插件
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 从配置中得到生产环境标识
var env = config.build.env

// 合并配置
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 所有的css相关的模块loader规则
    rules: utils.styleLoaders({
      sourceMap: true, // 生成css sourcemap
      extract: true // 抽取css到单独文件
    })
  },
  // 是否使用 #source-map 开发工具
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    // 编译输出目录
    path: config.build.assetsRoot,
    // 编译输出文件名
    // 我们可以在 hash 后加 :6 决定使用几位 hash 值
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // definePlugin 接收字符串插入到代码当中
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩 js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // 将css抽取到单独的文件中
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // 压缩css, 重复的样式也会被移除
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 生成主html页面
    new HtmlWebpackPlugin({
      // 生成的目标文件完整路径
      filename: config.build.index,
      // 模板文件
      template: 'index.html',
      // 注入js/css
      inject: true,
      // 压缩html
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // 此插件根据代码内容生成hash作为模块的id(默认是下标): 实现vender包在不变化下不重新打包
    new webpack.HashedModuleIdsPlugin(),
    // 此插件将第三方模块单独打包到vendor.js中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // 任何引入的node_modules下的模块都打包到vendor中
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // 将webpack的runtime和manifest代码单独打包到manifest.js中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'] // 从vendor中抽取
    }),
    // copy custom static assets
    //将项目下static下的静态资源直接拷贝到dist/static/下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
// 如果开启了gzip
if (config.build.productionGzip) {
  // 此插件能够将资源文件压缩为.gz文件,并且根据客户端的需求按需加载
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  // 将gzip压缩插件对象添加到配置的插件列表中
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// 是否开启了打包分析
// if (config.build.bundleAnalyzerReport) {
if (true) {
  // 将打包分析的插件添加到配置的插件列表中
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

// 向外暴露整个配置对象
module.exports = webpackConfig
