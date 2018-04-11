const webpack = require('webpack')
const express = require('express')
const wdm = require('webpack-dev-middleware')
const whm = require('webpack-hot-middleware')
const opn = require('opn')

const webpackConfig = require('./webpack.dev.conf')

// 通过webpack加载配置
const compiler = webpack(webpackConfig)  // 现在并没有打包
// 产生一个应用对象
const app = express()

// 在内存中打包应用, 并通过中间件挂载到express上
const devMiddleware = wdm(compiler, {
 quiet: true
})
app.use(devMiddleware)

// 挂载实现HMR的中间件
const hotMiddleware = whm(compiler, {

})
app.use(hotMiddleware)

// 将应用static下的静态资源的中间件载到express上
const staticMiddle = express.static('./static')
app.use('/static', staticMiddle)

// 启动监听指定端口的服务器
const port = '8083'
app.listen(port)

//打开浏览器
opn(`http://localhost:${port}`)


