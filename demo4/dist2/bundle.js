/******/ (function(modules) { // 用来安装所有模块的启动函数
          // 1. 创建用来保存已安装模块的对象容器: installedModules
              // 属性名为, 属性值为webpack模块对象
/******/ 	var installedModules = {};
/******/
          // 2. 定义用来加载模块的函数:__webpack_require__, 作用类似于import/require()
/******/ 	function __webpack_require__(moduleId) {
/******/
            // 1). 判断 installModules 中是否已经注册过这个模块（installModules 的属性 moduleId 是否存在）
/******/ 		if(installedModules[moduleId]) {
              // 1). 如果注册过，直接返回已注册模块的 exports 属性（模块的输出）
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
          // 3. 给__webpack_require__函数对象添加一些属性/方法
          // 1). m: modules，数组，所有的模块函数
/******/ 	__webpack_require__.m = modules;
          // 2). c: cache，对象，所有已安装的模块
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
          // 4. 调用__webpack_require__函数, 从入口模块开始安装所有模块
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__a__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__c__ = __webpack_require__(2);



console.log(`a.name: ${__WEBPACK_IMPORTED_MODULE_0__a__["a" /* default */].name}`)
console.log(`c1.name: ${__WEBPACK_IMPORTED_MODULE_1__c__["a" /* c1 */].name}; c2.name: ${__WEBPACK_IMPORTED_MODULE_1__c__["b" /* c2 */].name}`)

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'a'
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'b'
});

/***/ })
/******/ ]);


