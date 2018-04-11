const webpack = require('webpack')
const express = require('express')
const wdm = require('webpack-dev-middleware')
const whm = require('webpack-hot-middleware')
const opn = require('opn')
const webpackConfig = require('./webpack.dev.conf')
// 创建服务器
const app = express()

const router = express.Router()
const compiler = webpack(webpackConfig) // 读取配置, 生成用于打包的编译对象(还没有进行打包)

// 1). 复用compiler在内存中生成打包文件, 返回一个express中间件函数
// 2). 将资源挂载到express上
const devMiddleware = wdm(compiler, {
    quiet: true // 处理过程不输出任何信息
})  // function(req, res, next) {}
app.use(devMiddleware)
/* app.use(function (req, res, next) {
    
}) */

// 挂载用于HMR的服务中间件
const hotMiddleware = whm(compiler, {

})
app.use(hotMiddleware)

// 将应用static下的静态资源挂载到服务器的/static下
const staticMiddleware = express.static('./static')
app.use('/static', staticMiddleware)


// 启动服务: 监听指定的端口
const port = '8083'
app.listen(port)

// 打开浏览器访问应用主页
opn(`http://localhost:${port}`)
