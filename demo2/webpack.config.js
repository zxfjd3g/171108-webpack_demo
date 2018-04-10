const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

// 根据文件夹名得到其对应的绝对路径
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    filename: 'bundle.js',
    path: resolve('dist') // 所有打包生成的文件的基础路径
  },
  // 模块加载器
  module: {
    rules: [
      // 将es6编译为es5
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      // 加载css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']  // style(css(css文件))  css文件-->js文件-->html文件<style>
      },
      // 加载img
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: 'file-loader'
      }

    ]
  },
  // 插件
  plugins: [
    new HtmlPlugin({
      template: 'index.html', // 在执行命令所在目录查找
      filename: 'index.html', // 在output.path指定的输出目录中生成
      inject: true // 向页面中自动引入打包生成的js/css
    })
  ]
}