const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const webpackConfig = merge(baseConfig, {

  // 出口
  output: {
    filename: 'static/js/[name].[chunkhash].js'
  },

  // 模块加载器
  module: {
    rules: [
      // 加载样式: css
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"]
        })
      },
      // 加载样式: styl
      {
        test: /.styl$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "stylus-loader"] // 必须此顺序
        })
      },
      // 加载vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: "css-loader",
              fallback: 'vue-style-loader'
            }),
            stylus: ExtractTextPlugin.extract({
              use: ["css-loader", "stylus-loader"],
              fallback: 'vue-style-loader'
            })
          },
          // 声明在解析到指定标签的特定属性时转换为require引入相关模块
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      }
    ]
  },

  plugins: [
    // 用来清除指定的文件/夹
    new CleanPlugin(['dist'], {
      root: resolve('')
    }),
    // 用来从js中分离出css并单独打包
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    // 复制静态资源
    new CopyPlugin([
      {
        from: resolve('static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    // 压缩css, 重复的样式也会被移除
    new OptimizeCssPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 测试发现不使用此插件, mint-ui库引用有问题
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 根据代码内容生成hash作为模块的id(默认是下标)
    new webpack.HashedModuleIdsPlugin(),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
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
    // 将webpack的runtime和manifest代码单独打包到manifest.js中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'] // 从vendor中抽取
    })
  ]
})

if (true) {
  // 将打包分析的插件添加到配置的插件列表中
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig