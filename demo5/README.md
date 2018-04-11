# 1. 目标
	1). 梳理vue脚手架项目的配置结构
	2). 进一步理解工程化webpack配置

# 2. 配置文件组成
![](https://i.imgur.com/4ggGUSk.jpg)

# 3. 配置文件整体组织结构
![](https://i.imgur.com/bSKLTYC.png)

# 4. build下配置分析
## 4.1. build/dev-server.js
    开发环境打包运行的入口配置
    1). 检查node和npm的版本、引入相关插件和配置
    2). webpack对源码进行编译打包并返回compiler对象
    3). 创建express服务器
    4). 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
    5). 挂载代理服务和中间件
    6). 配置静态资源
    7). 启动服务器监听特定端口（8080）
    8). 自动打开浏览器并打开特定网址（localhost:8080）

## 4.2. build/webpack.base.conf.js
    开发/生产环境配置的基础配置
    1). 配置webpack编译入口
    2). 配置webpack输出路径和命名规则
    3). 配置模块resolve规则
    4). 配置不同类型模块的处理规则
    
## 4.3. build/webpack.dev.conf.js
    开发环境配置
    1). 将webpack的热重载客户端代码添加到每个entry对应的应用
    2). 合并基础的webpack配置
    3). 配置样式文件的处理规则，styleLoaders
    4). 配置Source Maps
    5). 配置webpack插件
    
## 4.4. build/utils.js
    utils提供工具函数，包括生成处理各种样式语言的loader，获取资源文件存放路径的工具函数。 
    1). 计算资源文件存放路径 
    2). 生成cssLoaders用于加载.vue文件中的样式 
    3). 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件
    
## 4.5. vue-loader.conf.js
    vue-loader需要的配置

## 4.6. dev-client.js
    主要写了浏览器端代码，用于实现webpack的热更新
    
## 4.7. build.js
    生产环境打包的入口配置
    1). loading动画
    2). 删除目标文件夹
    3). 执行webpack构建
    4). 输出信息
    
## 4.8. webpack.prod.conf.js
    生产环境配置
    1). 合并基础的webpack配置
    2). 配置样式文件的处理规则，styleLoaders
    3). 配置webpack的输出
    4). 配置webpack插件
    5). gzip模式下的webpack插件配置
    6). webpack-bundle分析
    
## 4.9. build/check-versions.js
    对node和npm的版本检测
    
# 5. config下配置分析
## 5.1. config/index.js
    开发和构建两种环境下的配置信息

## 5.1. config/dev.env.js
    设置环境变量为开发

## 5.1. config/prod.env.js
    设置了环境变量为生产