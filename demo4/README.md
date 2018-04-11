# 1. 目标
    通过分析打包文件结构, 加深对webpack打包的理解

# 2. 编码
    1. src/a.js
        export default {
            name: 'a'
        }
    
    2. src/b.js
        export default {
            name: 'b'
        }
    
    3. src/c.js
        import b from './b'
        console.log(`b.name: ${b.name}`)
        export const c1 = {
            name: 'c1'
        }
        export const c2 = {
            name: 'c2'
        }
        export const c3 = {
            name: 'c3'
        }
    
    4. src/index.js
        import a from './a'
        import {c1, c2} from './c'
        
        console.log(`a.name: ${a.name}`)
        console.log(`c1.name: ${c1.name}; c2.name: ${c2.name}`)
    
# 3. 配置(webpack.config.js)
    const path = require('path');
    
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    };
    
# 4. 打包
    执行打包: webpack
    打包输出信息:
        Hash: 1834503c2acd2d3f31a2     //根据内容生成的标识名
        Version: webpack 3.6.0         // 当前webpack的版本
        Time: 74ms                     // 编译打包消耗时间
            Asset     Size  Chunks             Chunk Names
        bundle.js  3.94 kB       0 [emitted]   main    // 生成的主包
           [0] ./src/index.js 125 bytes {0} [built]    // 构建的第1个模块
           [1] ./src/a.js 32 bytes {0} [built]         // 构建的第2个模块
           [2] ./src/c.js 156 bytes {0} [built]        // 构建的第3个模块
           [3] ./src/b.js 32 bytes {0} [built]         // 构建的第4个模块
    

# 5. bundle文件分析
## 1). 文件整体结构
    (function(modules) {
        // modules中的所有模块进行整合执行
    })([
    /* 0 */
        (function(module, __webpack_exports__, __webpack_require__) { //包含index.js代码}),
    /* 1 */
        (function(module, __webpack_exports__, __webpack_require__) { //包含a.js代码 }),
    /* 2 */
        (function(module, __webpack_exports__, __webpack_require__) { //包含c.js代码 }),
    /* 3 */
        (function(module, __webpack_exports__, __webpack_require__) { //包含b.js代码 })
     ]);
    
    说明: 
        每个JS模块的代码都被包含在一个函数中, 我们可以称它为webpack模块函数
        整体是一个IIFE: 将包含所有webpack模块函数的数组作为参数传入, 并在函数体中对所有模块进行整合处理
        
## 2). 立即执行函数的整体流程
    第1步: 创建用来保存已安装模块的对象容器: installedModules
    第2步: 定义用来加载模块的函数:__webpack_require__, 作用类似于import/require()
    第3步: 给__webpack_require__函数对象添加一些属性/方法。
    第4步: 调用__webpack_require__函数, 从入口模块开始安装所有模块  

## 3). __webpack_require__函数执行流程
    第1步: 
        根据传入的moduleId来判断模块是否已经安装过, 
        如果安装过, 直接返回模块的exports属性
    第2步:
        如果没有安装过，定义一个webpack模块对象, 并注册到installModules上
        webpack模块对象包含3个属性
            i： 模块 ID moduleID （ id 的简写）
            l： 模块是否已注册（初始为 false，loaded的简写）
            exprots： 模块的输出（初始为空对象）
    第3步: 
        执行moduleId对应的webpack模块函数, 加载对应的模块
        传入3个参数:
            参数1: webpack模块对象
            参数2: 模块的输出对象
            参数3: __webpack_require__函数
    第4步: 
        将 module.l 设为 true 表示已加载
    第5步: 
        最后返回module.exports 属性
    
## 4). __webpack_require__函数对象的属性和方法
    1). m: modules，数组，所有的模块函数
    2). c: cache，对象，所有已安装的模块
    
## 5). webpack模块函数
	1. 以c.js对应的webpack模块函数为例说明
	    /* 2 */
		(function(module, __webpack_exports__, __webpack_require__) {
         
         "use strict";
         /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__b__ = __webpack_require__(3);
         
         console.log(`b.name: ${__WEBPACK_IMPORTED_MODULE_0__b__["a" /* default */].name}`)
         const c1 = {
           name: 'c1'
         }
         /* harmony export (immutable) */ __webpack_exports__["a"] = c1;
         
         const c2 = {
           name: 'c2'
         }
         /* harmony export (immutable) */ __webpack_exports__["b"] = c2;
         
         const c3 = {
           name: 'c3'
         }
         /* unused harmony export c3 */
         
         /***/ })
	2. 执行分析
	    此函数是在主函数中通过__webpack_require__(0)执行来递归加载所有相关webpack模块函数
	    import 替换为 __webpack_require__ 就可以导入模块
	    export 替换为__webpack_exports__["a"] = xxx
	    每个模块都有id, 默认是在数组中的下标