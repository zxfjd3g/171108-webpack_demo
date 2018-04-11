# day01
## 1. 项目优化
    缓存路由组件对象
    路由懒加载(code split)
    图片懒加载: vue-lazyload
    UI组件库: mint-ui
    
## 2. 构建工具理解
    构建工具的功能:
        代码转换：ES6编译成ES5、SCSS 编译成 CSS 等。
        文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
        模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
        代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
        自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
        代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
    常用构建工具:
        grunt/gulp/fis3: 本身是非模块化打包, 但可以通过插件实现模块化打包
        webpack: 本身就可以进行模块化打包, 再借助loader和plugin实现强大的项目打包能力

## 3. webpack的基本使用
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

## 4. webpack打包不同类型的资源
    1). 使用loader打包各种类型的模块: babel-loader/css-loader/style-loader/file-loader
    2). 使用plugin打包html(引入js/css)
    3). webpack配置文件编写(结构): entry/output/module/plugins
    4). 项目的打包和发布