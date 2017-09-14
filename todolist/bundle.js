/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _leancloudStorage = __webpack_require__(4);

var _leancloudStorage2 = _interopRequireDefault(_leancloudStorage);

var _style = __webpack_require__(5);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_ID = 'bOVGbcb9kXOqatTjMdljoUSY-gzGzoHsz';
var APP_KEY = 'WIDiOtVcxeep47n5EuSVFC6a';
_leancloudStorage2.default.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new _vue2.default({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null
    },
    methods: {
        fetchTodos: function fetchTodos() {
            var _this = this;

            //登陆后读取数据
            if (this.currentUser) {
                console.log('this.currentUser is:');
                console.log(this.currentUser);
                var query = new _leancloudStorage2.default.Query('AllTodos');
                query.find().then(function (todos) {
                    var avAllTodos = todos[0];
                    var id = avAllTodos.id;
                    console.log('当前id：' + id);
                    _this.todoList = JSON.parse(avAllTodos.attributes.content);
                    _this.todoList.id = id;
                }, function (error) {
                    console.log(error);
                });
            }
        },
        updateTodos: function updateTodos() {
            var dataString = JSON.stringify(this.todoList);
            var avTodos = _leancloudStorage2.default.Object.createWithoutData('AllTodos', this.todoList.id);
            console.log('update:' + this.todoList.id);
            avTodos.set('content', dataString);
            avTodos.save().then(function () {
                console.log('更新成功!');
            });
        },
        saveTodos: function saveTodos() {
            var _this2 = this;

            var dataString = JSON.stringify(this.todoList);
            var AVTodos = _leancloudStorage2.default.Object.extend('AllTodos');
            var avTodos = new AVTodos();
            var acl = new _leancloudStorage2.default.ACL();
            acl.setReadAccess(_leancloudStorage2.default.User.current(), true); //只有这个用户能读
            acl.setWriteAccess(_leancloudStorage2.default.User.current(), true); //只有这个用户能写

            avTodos.set('content', dataString);
            avTodos.setACL(acl); //设置访问权限
            avTodos.save().then(function (todo) {
                _this2.todoList.id = todo.id;
                console.log('保存成功!');
            }, function (error) {
                console.log('保存失败!');
            });
        },
        saveOrUpdateTodos: function saveOrUpdateTodos() {
            if (this.todoList.id) {
                this.updateTodos();
            } else {
                this.saveTodos();
            }
        },
        addTodo: function addTodo() {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                done: false
            });
            this.newTodo = '';
            this.saveOrUpdateTodos();
        },
        removeTodo: function removeTodo(todo) {
            var index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
            this.saveOrUpdateTodos();
        },
        signUp: function signUp() {
            var _this3 = this;

            var user = new _leancloudStorage2.default.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then(function (loginedUser) {
                _this3.currentUser = _this3.getCurrentUser();
            }, function (error) {
                alert('注册失败!');
            });
        },
        login: function login() {
            var _this4 = this;

            _leancloudStorage2.default.User.logIn(this.formData.username, this.formData.password).then(function (loginedUser) {
                _this4.currentUser = _this4.getCurrentUser();
                _this4.fetchTodos();
            }, function (error) {
                alert('登录失败!');
            });
        },
        getCurrentUser: function getCurrentUser() {
            var current = _leancloudStorage2.default.User.current();
            if (current) {
                var id = current.id,
                    createdAt = current.createdAt,
                    username = current.attributes.username;

                console.log({ id: id, username: username, createdAt: createdAt });
                return { id: id, username: username, createdAt: createdAt };
            } else {
                return null;
            }
        },
        logout: function logout() {
            _leancloudStorage2.default.User.logOut();
            this.currentUser = null;
            window.location.reload();
        }
    },
    created: function created() {
        this.currentUser = this.getCurrentUser();
        this.fetchTodos();
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'E:\\git\\Vue-app\\todolist\\node_modules\\vue\\dist\\vue.common.js'\n    at Error (native)");

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'E:\\git\\Vue-app\\todolist\\node_modules\\leancloud-storage\\dist\\av-min.js'\n    at Error (native)");

/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);