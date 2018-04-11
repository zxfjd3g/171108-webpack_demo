// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // production 环境配置
  build: {
    // 使用 config/prod.env.js 中定义的编译环境
    env: require('./prod.env'),
    // 编译输入的 index.html 文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // 编译输出的静态资源根路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 编译输出的二级目录
    assetsSubDirectory: 'static',
    // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // 是否开启 cssSourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 是否开启 gzip
    productionGzip: false,
    // 需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 是否开启打包分析导出
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // develop 环境
  dev: {
    // 使用 config/dev.env.js 中定义的编译环境
    env: require('./dev.env'),
    // 运行测试页面的端口
    port: 8080,
    // 是否自动打开浏览器: 是
    autoOpenBrowser: true,
    // 编译输出的二级目录
    assetsSubDirectory: 'static',
    // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // 需要 proxyTable 代理的接口（可跨域）
    proxyTable: {},
    // 是否开启 cssSourceMap: 不
    cssSourceMap: false
  }
}
