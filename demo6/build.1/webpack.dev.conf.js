const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')


function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

// var hotClient = require('webpack-hot-middleware/client')
// 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  // 模块加载器
  module: {
    rules: [
      // 加载 css
      {
        test: /.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      // 加载 styl
      {
        test: /.styl$/,
        use: ['vue-style-loader', 'css-loader', "stylus-loader"],
      },
      // 加载vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', 'css-loader'],
            styl: ['vue-style-loader', 'css-loader', "stylus-loader"],
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
    ],
  },

  // 调试
  devtool: 'cheap-module-eval-source-map',

  // 插件
  plugins: [
    // 保存一个标识当前开发环境的变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // HMR
    new webpack.HotModuleReplacementPlugin()
  ]
})