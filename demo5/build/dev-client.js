/* eslint-disable */
// 引入兼容包(低版本的firfox)
require('eventsource-polyfill')
// 引入whm包用来实现HMR
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 发布订阅: 如果是reload事件, 刷新页面 (不进行HMR, 而是live-reload)
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
