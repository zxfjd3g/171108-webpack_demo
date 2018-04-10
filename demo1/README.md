# webpack快速入门
## 1. 目标
    1). 理解项目的模块化打包
        模块化
        打包
    2). 学会webpack的基本使用
        配置
        命令
    3). 理解webpack的相关概念
        entry
        output
        module
        bundle/chunk
           
## 2. 初始化项目
    创建空应用: demo1
    npm init -y
    
## 3. 下载webpack
    npm install webpack -g   //全局下载webpack
    npm install webpack --save-dev  //下载webpack为开发依赖
    
## 4. 编码
    1). bar.js
      export default function bar() {
        console.log('bar()')
      }
    2). app.js
      import bar from './bar'
      bar()
      document.getElementById('app').innerHTML = 'Hello, webpack'
    3). page.html
      <html>
        <head>
          <title>Hello webpack</title>
        </head>
        <body>
          <div id="app"></div>
          <script src="bundle.js"></script>
        </body>
      </html>
      
## 5. 使用webpack打包项目
### 5.1. 方式一: 纯命令实现模块化打包
	webpack app.js bundle.js
### 5.2. 方式二: 配置+命令实现模块化打包
    1). webpack配置: wbpack.config.js
      module.exports = {
        // 入口
        entry: './app.js',
        // 出口
        output: {
          filename: 'bundle.js'
        }
      }
    2). 编译打包
      webpack
### 5.3. 浏览器打开page.html, 查看运行效果

## 6. 总结
    1). webpack中的四个概念(非常重要)
        entry: webpack打包的入口
        output: webpack打包生成什么
        module: 模块文件
        bundle/chunk: webpack打包n个关联的module生成的文件
    2). webpack模块化打包的基本流程(非常重要)
		1> 连接: webpack从入口JS开始, 递归查找出所有相关联的模块, 并`连接`起来形成一个图(网)的结构
        2> 编译: 将JS模块中的模块化语法`编译`为浏览器可以直接运行的模块语法(当然其它类型资源也会处理)
		3> 合并: 将图中所有编译过的模块`合并`成一个或少量几个bundle文件, 而浏览器运行是打包生成的bundle文件
    3). webpack的基本配置和命令
        1> 默认配置文件为: webpack.config.js
            module.exports = {
              entry: '入口js',
              output: {
                filename: '打包生成的bundle'
              }
            }
        2> 打包命令
            webpack

## 7. 待解决问题
    1). webpack本身只能打包JS, 而项目中的css/img等资源如何打包?
    2). 页面能不能自动引入动态生成的打包JS/CSS 