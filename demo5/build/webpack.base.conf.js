// 使用 NodeJS 自带的文件路径插件
var path = require('path')
// 引入一些小工具函数
var utils = require('./utils')
// 引入 config/index.js
var config = require('../config')
// 引入vue-loader的配置文件
var vueLoaderConfig = require('./vue-loader.conf')

// 得到指定目录的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  // 入口
  entry: {
    app: './src/main.js'
  },
  // 出口
  output: {
    // 编译输出的根路径
    path: config.build.assetsRoot,
    // 编译输出的文件名
    filename: '[name].js',
    // 正式发布环境下编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 可以省略的文件后缀
    extensions: ['.js', '.vue', '.json'],
    // 路径别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@comp': resolve('src/components'),
    }
  },
  // 指定不同类型模块的加载规则
  module: {
    rules: [
      // 使用eslint对js/vue文件进行前置检查
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // 使用vue-loader加载vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 使用babel-loader对js文件进行处理
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // 使用url-loader对图片文件进行处理
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 使用url-loader对音视频文件进行处理
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      // 使用url-loader对字体文件进行处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
