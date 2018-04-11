const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
/*
webpack基本配置
 */
// __dirname: 当前文件所在目录的绝对路径
function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  // 入口
  entry: {
    app: './src/index.js',
  },
  // 出口
  output: {
    path: resolve('dist')
  },
  // 模块加载器
  module: {
    rules: [
      // es6-->es5
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')]
      },
      // img
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000, // 进行图片base64编码处理的文件最大值
          name: 'static/img/[name].[hash:8].[ext]' // 生成的文件路径和文件名
        }
      }
    ]
  },
  // 插件
  plugins: [
    // 生成html
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ]

}
