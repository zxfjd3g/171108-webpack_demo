// 检查node和npm的版本, 如果过低直接退出
require('./check-versions')()
// 指定当前环境为生产环境
process.env.NODE_ENV = 'production'
// 用来显示node.js 命令行环境的 loading效果的工具包
var ora = require('ora')
// 用来删除文件的工具包
var rm = require('rimraf')
// 用来操作文件路径信息的node内置工具包
var path = require('path')
// 用来定制控制台日志的输入样式的工具包
var chalk = require('chalk') // chalk粉笔
// 引入用于编译的webpack包
var webpack = require('webpack')
// 引入config配置
var config = require('../config')
// 引入webpack生产环境配置
var webpackConfig = require('./webpack.prod.conf')
// 输出正在打包中的提示信息
var spinner = ora('building for production...')
// 开始loading动画
spinner.start()
// 删除打包生成的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 根据配置打包项目: 相当于执行了webpack命令
  webpack(webpackConfig, function (err, stats) { // 编译结束的回调
    // 停止loading动画
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 如果编译出错, 以红色输出编译失败的信息, 并结束进程
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 蓝色输出编译成功
    console.log(chalk.cyan('  Build complete.\n'))
    // 黄色输出提示文本
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
