const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

webpack(webpackConfig, function (error, status) {
    console.log('打包结束!')
})