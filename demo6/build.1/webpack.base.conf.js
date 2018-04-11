const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  // 入口
  entry: {
    app: './src/main.js'
  },
  // 出口
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  // 模块加载器
  module: {
    rules: [
      // 代码检查
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre', // previous
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },

      // 加载js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },

      // 加载图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      },
      // 加载字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ],

  // 解析
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: { // 路径别名
      '@': resolve('src'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages')
    }
  }
}