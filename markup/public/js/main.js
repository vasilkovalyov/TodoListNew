/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _TodoItem = __webpack_require__(1);
	
	var _TodoList = __webpack_require__(2);
	
	var _TodoEvents = __webpack_require__(3);
	
	var inputHolder = document.querySelector('.input-holder');
	var addTodoItem = document.querySelector('.input-holder .btn');
	var counterLeftTodoItems = document.querySelector('.left-items .counter');
	var removeAllCompleteTodoItems = document.querySelector('.clear-all');
	var input = document.querySelector('.input-holder input[type="text"]');
	var filterList = document.querySelector('.tab-list-links');
	
	var todoListObject = new _TodoList.TodoList(); // object for all array todo items
	var todoEventObject = new _TodoEvents.TodoEvents(); // object for event todo items
	
	
	input.addEventListener('keyup', function (e) {
	    return e.keyCode == 13 ? create() : -1;
	});
	addTodoItem.addEventListener('click', function () {
	    return create();
	});
	
	removeAllCompleteTodoItems.addEventListener('click', function () {
	    todoListObject.removeAllComplateEvents();
	});
	
	function create() {
	    if (input.value === '') {
	        alert('input is empty');
	    } else {
	        todoListObject.createTodoEvent();
	        var btnRemove = document.querySelector('.todo-item-remove');
	        var btnComplate = document.querySelector('.todo-item-check');
	        counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
	
	        btnRemove.addEventListener('click', function () {
	            remove(this.closest('li.todo-item'));
	        });
	
	        btnComplate.addEventListener('click', function () {
	            complate(this.closest('li.todo-item'));
	        });
	    }
	}
	
	function remove(target) {
	    var id = target.getAttribute('id');
	    var todoObject = todoListObject.getObjectById(id, todoListObject.LIST);
	    todoObject.Trash = true;
	
	    if (todoObject.Complate == true) {
	        todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.removedLIST);
	        todoListObject.removeFormArrayById(id, todoListObject.complateLIST);
	    } else {
	        todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.removedLIST);
	    }
	
	    todoListObject.removeFormArrayById(id, todoListObject.LIST);
	    counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
	    todoListObject.removeFromDomList(target);
	    todoListObject.checkOnItem();
	}
	
	function complate(target) {
	    var id = target.getAttribute('id');
	    var todoObject = todoListObject.getObjectById(id, todoListObject.LIST);
	
	    if (todoObject.Complate) {
	        todoObject.Complate = false;
	        todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.LIST);
	        target.classList.remove('complate');
	    } else {
	        todoObject.Complate = true;
	        todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.complateLIST);
	        target.classList.add('complate');
	    }
	
	    counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TodoItem = exports.TodoItem = function () {
	    function TodoItem(id, text) {
	        var _this = this;
	
	        _classCallCheck(this, TodoItem);
	
	        this.renderTodoItem = function () {
	            var li = "\n            <li id=" + _this.id + " class='todo-item'>\n                <label>\n                    <input type=\"checkbox\">\n                    <span class=\"todo-item-check\" data-key='" + _this.id + "' data-type='complate' complate-btn></span>\n                </label>\n                <span class=\"todo-item-text\">" + _this.text + "</span>\n                <span class=\"todo-item-remove\" data-key='" + _this.id + "' data-type='remove' remove-btn></span>\n            </li>\n        ";
	            return li;
	        };
	
	        this.id = id;
	        this.text = text;
	        this.complate = false;
	        this.trash = false;
	    }
	
	    _createClass(TodoItem, [{
	        key: "Id",
	        get: function get() {
	            return this.id;
	        }
	    }, {
	        key: "Complate",
	        get: function get() {
	            return this.complate;
	        },
	        set: function set(value) {
	            this.complate = value;
	        }
	    }, {
	        key: "Trash",
	        get: function get() {
	            return this.trash;
	        },
	        set: function set(value) {
	            this.trash = value;
	        }
	    }]);

	    return TodoItem;
	}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TodoList = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _TodoItem = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TodoList = exports.TodoList = function () {
	    function TodoList() {
	        _classCallCheck(this, TodoList);
	
	        this.LIST = new Map();
	        this.removedLIST = new Map();
	        this.complateLIST = new Map();
	        this.notComplateLIST = new Map();
	        this.input = document.querySelector('.input-holder input[type="text"]');
	        this.todoWrapper = document.querySelector('.main-todo-wrapper');
	        this.todoList = document.querySelector('.todo-list');
	        this.counter = 0;
	    }
	
	    _createClass(TodoList, [{
	        key: 'createTodoEvent',
	        value: function createTodoEvent() {
	            var counter = this.counter;
	            var todoItemObject = new _TodoItem.TodoItem(this.counter, this.input.value, false);
	            this.input.value = '';
	            this.todoList.insertAdjacentHTML("afterbegin", todoItemObject.renderTodoItem()); // add event in DOM events list
	            this.LIST.set(counter, todoItemObject); // add event to map array
	            this.counter++;
	            this.checkOnItem(); // visual check event
	        }
	    }, {
	        key: 'getObjectById',
	        value: function getObjectById(id, mapArray) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = mapArray.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;
	
	                    if (item[0] == id) {
	                        return mapArray.get(item[0]);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'removeFormArrayById',
	        value: function removeFormArrayById(id, mapArray) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = mapArray.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var key = _step2.value;
	
	                    if (key == id) {
	                        mapArray.delete(key);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'movingThroughArraysById',
	        value: function movingThroughArraysById(id, oldArrayMap, newArrayMap) {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = oldArrayMap.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var item = _step3.value;
	
	                    var key = item[0];
	                    var object = item[1];
	                    if (key == id) {
	                        newArrayMap.set(key, object);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'removeAllComplateEvents',
	        value: function removeAllComplateEvents() {
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = this.complateLIST.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var item = _step4.value;
	
	                    var key = item[0];
	                    var object = item[1];
	
	                    if (object.Complate) {
	                        this.removedLIST.set(key, object);
	                        this.LIST.delete(key);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	
	            this.complateLIST.clear();
	            this.removeTodoListFromDom();
	        }
	    }, {
	        key: 'removeTodoListFromDom',
	        value: function removeTodoListFromDom() {
	            var todoItem = document.querySelectorAll('.todo-item.complate');
	            for (var i = 0; i <= todoItem.length - 1; i++) {
	                var item = todoItem[i];
	                this.todoList.removeChild(item);
	            }
	        }
	    }, {
	        key: 'checkOnItem',
	        value: function checkOnItem() {
	            var items = document.querySelectorAll('.todo-item');
	            items.length > 0 ? this.todoWrapper.classList.add('show') : this.todoWrapper.classList.remove('show');
	        }
	    }, {
	        key: 'removeFromDomList',
	        value: function removeFromDomList(object) {
	            this.todoList.removeChild(object);
	        }
	    }, {
	        key: 'getCouterLatestEvents',
	        value: function getCouterLatestEvents() {
	            var latestArray = new Map();
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = this.LIST.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var item = _step5.value;
	
	                    var key = item[0];
	                    var object = item[1];
	                    if (!object.Complate) {
	                        latestArray.set(key, object);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            return latestArray.size;
	        }
	    }, {
	        key: 'Counter',
	        get: function get() {
	            return this.counter;
	        },
	        set: function set(value) {
	            this.counter = value;
	        }
	    }]);

	    return TodoList;
	}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TodoEvents = undefined;
	
	var _TodoList = __webpack_require__(2);
	
	var _TodoItem = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TodoEvents = exports.TodoEvents = function TodoEvents() {
	    _classCallCheck(this, TodoEvents);
	};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDhjZWM3N2JmOGE2ZjU0M2ViOWQiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9tYWluLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9FdmVudHMuanMiXSwibmFtZXMiOlsiaW5wdXRIb2xkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRUb2RvSXRlbSIsImNvdW50ZXJMZWZ0VG9kb0l0ZW1zIiwicmVtb3ZlQWxsQ29tcGxldGVUb2RvSXRlbXMiLCJpbnB1dCIsImZpbHRlckxpc3QiLCJ0b2RvTGlzdE9iamVjdCIsIlRvZG9MaXN0IiwidG9kb0V2ZW50T2JqZWN0IiwiVG9kb0V2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Q29kZSIsImNyZWF0ZSIsInJlbW92ZUFsbENvbXBsYXRlRXZlbnRzIiwidmFsdWUiLCJhbGVydCIsImNyZWF0ZVRvZG9FdmVudCIsImJ0blJlbW92ZSIsImJ0bkNvbXBsYXRlIiwiaW5uZXJUZXh0IiwiZ2V0Q291dGVyTGF0ZXN0RXZlbnRzIiwicmVtb3ZlIiwiY2xvc2VzdCIsImNvbXBsYXRlIiwidGFyZ2V0IiwiaWQiLCJnZXRBdHRyaWJ1dGUiLCJ0b2RvT2JqZWN0IiwiZ2V0T2JqZWN0QnlJZCIsIkxJU1QiLCJUcmFzaCIsIkNvbXBsYXRlIiwibW92aW5nVGhyb3VnaEFycmF5c0J5SWQiLCJjb21wbGF0ZUxJU1QiLCJyZW1vdmVkTElTVCIsInJlbW92ZUZvcm1BcnJheUJ5SWQiLCJyZW1vdmVGcm9tRG9tTGlzdCIsImNoZWNrT25JdGVtIiwiY2xhc3NMaXN0IiwiYWRkIiwiVG9kb0l0ZW0iLCJ0ZXh0IiwicmVuZGVyVG9kb0l0ZW0iLCJsaSIsInRyYXNoIiwiTWFwIiwibm90Q29tcGxhdGVMSVNUIiwidG9kb1dyYXBwZXIiLCJ0b2RvTGlzdCIsImNvdW50ZXIiLCJ0b2RvSXRlbU9iamVjdCIsImluc2VydEFkamFjZW50SFRNTCIsInNldCIsIm1hcEFycmF5IiwiZW50cmllcyIsIml0ZW0iLCJnZXQiLCJrZXlzIiwia2V5IiwiZGVsZXRlIiwib2xkQXJyYXlNYXAiLCJuZXdBcnJheU1hcCIsIm9iamVjdCIsImNsZWFyIiwicmVtb3ZlVG9kb0xpc3RGcm9tRG9tIiwidG9kb0l0ZW0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImxlbmd0aCIsInJlbW92ZUNoaWxkIiwiaXRlbXMiLCJsYXRlc3RBcnJheSIsInNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7O0FBQ0E7O0FBQ0E7O0FBRUEsS0FBTUEsY0FBY0MsU0FBU0MsYUFBVCxDQUF1QixlQUF2QixDQUFwQjtBQUNBLEtBQU1DLGNBQWNGLFNBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXBCO0FBQ0EsS0FBTUUsdUJBQXVCSCxTQUFTQyxhQUFULENBQXVCLHNCQUF2QixDQUE3QjtBQUNBLEtBQU1HLDZCQUE2QkosU0FBU0MsYUFBVCxDQUF1QixZQUF2QixDQUFuQztBQUNBLEtBQU1JLFFBQVFMLFNBQVNDLGFBQVQsQ0FBdUIsa0NBQXZCLENBQWQ7QUFDQSxLQUFNSyxhQUFhTixTQUFTQyxhQUFULENBQXVCLGlCQUF2QixDQUFuQjs7QUFHQSxLQUFNTSxpQkFBaUIsSUFBSUMsa0JBQUosRUFBdkIsQyxDQUF1QztBQUN2QyxLQUFNQyxrQkFBa0IsSUFBSUMsc0JBQUosRUFBeEIsQyxDQUEwQzs7O0FB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O0FBQUE7QUFBQTtBQUFBOztBQVNuQixvQkFBT1MsWUFBWUMsSUFBbkI7QUFDSDs7OzZCQXRGWTtBQUNULG9CQUFPLEtBQUt2QixPQUFaO0FBQ0gsVTsyQkFFV25DLEssRUFBTTtBQUNkLGtCQUFLbUMsT0FBTCxHQUFlbkMsS0FBZjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCTDs7QUFDQTs7OztLQUVhTixVLFdBQUFBLFUsR0FDVCxzQkFBYTtBQUFBO0FBRVosRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDhjZWM3N2JmOGE2ZjU0M2ViOWQiLCJpbXBvcnQgeyBUb2RvSXRlbSB9IGZyb20gJy4vY29tcG9uZW50cy9Ub2RvSXRlbSc7XHJcbmltcG9ydCB7VG9kb0xpc3R9IGZyb20gJy4vY29tcG9uZW50cy9Ub2RvTGlzdCc7XHJcbmltcG9ydCB7VG9kb0V2ZW50c30gZnJvbSAnLi9jb21wb25lbnRzL1RvZG9FdmVudHMnO1xyXG5cclxuY29uc3QgaW5wdXRIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtaG9sZGVyJyk7XHJcbmNvbnN0IGFkZFRvZG9JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWhvbGRlciAuYnRuJyk7XHJcbmNvbnN0IGNvdW50ZXJMZWZ0VG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtaXRlbXMgLmNvdW50ZXInKTtcclxuY29uc3QgcmVtb3ZlQWxsQ29tcGxldGVUb2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXItYWxsJyk7XHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWhvbGRlciBpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG5jb25zdCBmaWx0ZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYi1saXN0LWxpbmtzJyk7XHJcblxyXG5cclxuY29uc3QgdG9kb0xpc3RPYmplY3QgPSBuZXcgVG9kb0xpc3QoKTsgLy8gb2JqZWN0IGZvciBhbGwgYXJyYXkgdG9kbyBpdGVtc1xyXG5jb25zdCB0b2RvRXZlbnRPYmplY3QgPSBuZXcgVG9kb0V2ZW50cygpOyAvLyBvYmplY3QgZm9yIGV2ZW50IHRvZG8gaXRlbXNcclxuXHJcblxyXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiBlLmtleUNvZGUgPT0gMTMgPyBjcmVhdGUoKSA6IC0xKTtcclxuYWRkVG9kb0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjcmVhdGUoKSk7XHJcblxyXG5yZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHRvZG9MaXN0T2JqZWN0LnJlbW92ZUFsbENvbXBsYXRlRXZlbnRzKCk7XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoKXtcclxuICAgIGlmKGlucHV0LnZhbHVlID09PSAnJyl7XHJcbiAgICAgICAgYWxlcnQoJ2lucHV0IGlzIGVtcHR5Jyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB0b2RvTGlzdE9iamVjdC5jcmVhdGVUb2RvRXZlbnQoKTtcclxuICAgICAgICBjb25zdCBidG5SZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1pdGVtLXJlbW92ZScpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkNvbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8taXRlbS1jaGVjaycpO1xyXG4gICAgICAgIGNvdW50ZXJMZWZ0VG9kb0l0ZW1zLmlubmVyVGV4dCA9IHRvZG9MaXN0T2JqZWN0LmdldENvdXRlckxhdGVzdEV2ZW50cygpO1xyXG5cclxuICAgICAgICBidG5SZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmVtb3ZlKHRoaXMuY2xvc2VzdCgnbGkudG9kby1pdGVtJykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBidG5Db21wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb21wbGF0ZSh0aGlzLmNsb3Nlc3QoJ2xpLnRvZG8taXRlbScpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlKHRhcmdldCl7XHJcbiAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICBjb25zdCB0b2RvT2JqZWN0ID0gdG9kb0xpc3RPYmplY3QuZ2V0T2JqZWN0QnlJZChpZCwgdG9kb0xpc3RPYmplY3QuTElTVCk7XHJcbiAgICB0b2RvT2JqZWN0LlRyYXNoID0gdHJ1ZTtcclxuXHJcbiAgICBpZih0b2RvT2JqZWN0LkNvbXBsYXRlID09IHRydWUpe1xyXG4gICAgICAgIHRvZG9MaXN0T2JqZWN0Lm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUxJU1QsIHRvZG9MaXN0T2JqZWN0LnJlbW92ZWRMSVNUKTtcclxuICAgICAgICB0b2RvTGlzdE9iamVjdC5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUxJU1QpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgdG9kb0xpc3RPYmplY3QubW92aW5nVGhyb3VnaEFycmF5c0J5SWQoaWQsIHRvZG9MaXN0T2JqZWN0LkxJU1QsIHRvZG9MaXN0T2JqZWN0LnJlbW92ZWRMSVNUKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2RvTGlzdE9iamVjdC5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5MSVNUKTtcclxuICAgIGNvdW50ZXJMZWZ0VG9kb0l0ZW1zLmlubmVyVGV4dCA9IHRvZG9MaXN0T2JqZWN0LmdldENvdXRlckxhdGVzdEV2ZW50cygpO1xyXG4gICAgdG9kb0xpc3RPYmplY3QucmVtb3ZlRnJvbURvbUxpc3QodGFyZ2V0KTtcclxuICAgIHRvZG9MaXN0T2JqZWN0LmNoZWNrT25JdGVtKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBsYXRlKHRhcmdldCl7XHJcbiAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICBjb25zdCB0b2RvT2JqZWN0ID0gdG9kb0xpc3RPYmplY3QuZ2V0T2JqZWN0QnlJZChpZCwgdG9kb0xpc3RPYmplY3QuTElTVCk7XHJcblxyXG4gICAgaWYodG9kb09iamVjdC5Db21wbGF0ZSl7XHJcbiAgICAgICAgdG9kb09iamVjdC5Db21wbGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRvZG9MaXN0T2JqZWN0Lm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUxJU1QsIHRvZG9MaXN0T2JqZWN0LkxJU1QpO1xyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGF0ZScpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgdG9kb09iamVjdC5Db21wbGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdG9kb0xpc3RPYmplY3QubW92aW5nVGhyb3VnaEFycmF5c0J5SWQoaWQsIHRvZG9MaXN0T2JqZWN0LkxJU1QsIHRvZG9MaXN0T2JqZWN0LmNvbXBsYXRlTElTVCk7XHJcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NvbXBsYXRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRlckxlZnRUb2RvSXRlbXMuaW5uZXJUZXh0ID0gdG9kb0xpc3RPYmplY3QuZ2V0Q291dGVyTGF0ZXN0RXZlbnRzKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXYvanMvZXM2L21haW4uanMiLCJleHBvcnQgY2xhc3MgVG9kb0l0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IoaWQsIHRleHQpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLmNvbXBsYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50cmFzaCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBJZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBDb21wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgQ29tcGxhdGUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBsYXRlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFRyYXNoKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhc2g7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFRyYXNoKHZhbHVlKXtcclxuICAgICAgICB0aGlzLnRyYXNoID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVG9kb0l0ZW0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBgXHJcbiAgICAgICAgICAgIDxsaSBpZD0ke3RoaXMuaWR9IGNsYXNzPSd0b2RvLWl0ZW0nPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS1jaGVja1wiIGRhdGEta2V5PScke3RoaXMuaWR9JyBkYXRhLXR5cGU9J2NvbXBsYXRlJyBjb21wbGF0ZS1idG4+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1pdGVtLXRleHRcIj4ke3RoaXMudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS1yZW1vdmVcIiBkYXRhLWtleT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdyZW1vdmUnIHJlbW92ZS1idG4+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0l0ZW0uanMiLCJpbXBvcnQge1RvZG9JdGVtfSBmcm9tICcuL1RvZG9JdGVtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUb2RvTGlzdHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5MSVNUID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlZExJU1QgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5jb21wbGF0ZUxJU1QgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5ub3RDb21wbGF0ZUxJU1QgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgICAgICB0aGlzLnRvZG9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdG9kby13cmFwcGVyJyk7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcclxuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBDb3VudGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgQ291bnRlcih2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVG9kb0V2ZW50KCl7XHJcbiAgICAgICAgY29uc3QgY291bnRlciA9IHRoaXMuY291bnRlcjtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbU9iamVjdCA9IG5ldyBUb2RvSXRlbSh0aGlzLmNvdW50ZXIsIHRoaXMuaW5wdXQudmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIHRvZG9JdGVtT2JqZWN0LnJlbmRlclRvZG9JdGVtKCkpOyAvLyBhZGQgZXZlbnQgaW4gRE9NIGV2ZW50cyBsaXN0XHJcbiAgICAgICAgdGhpcy5MSVNULnNldCggY291bnRlciwgdG9kb0l0ZW1PYmplY3QgKTsgLy8gYWRkIGV2ZW50IHRvIG1hcCBhcnJheVxyXG4gICAgICAgIHRoaXMuY291bnRlcisrO1xyXG4gICAgICAgIHRoaXMuY2hlY2tPbkl0ZW0oKTsgLy8gdmlzdWFsIGNoZWNrIGV2ZW50XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldE9iamVjdEJ5SWQoaWQsIG1hcEFycmF5KXtcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgbWFwQXJyYXkuZW50cmllcygpKXtcclxuICAgICAgICAgICAgaWYoaXRlbVswXSA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwQXJyYXkuZ2V0KGl0ZW1bMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZvcm1BcnJheUJ5SWQoaWQsbWFwQXJyYXkpe1xyXG4gICAgICAgIGZvcihsZXQga2V5IG9mIG1hcEFycmF5LmtleXMoKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICBtYXBBcnJheS5kZWxldGUoa2V5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCBvbGRBcnJheU1hcCwgbmV3QXJyYXlNYXApe1xyXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBvbGRBcnJheU1hcC5lbnRyaWVzKCkpe1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gaXRlbVswXTtcclxuICAgICAgICAgICAgbGV0IG9iamVjdCA9IGl0ZW1bMV07XHJcbiAgICAgICAgICAgIGlmKGtleSA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICBuZXdBcnJheU1hcC5zZXQoa2V5LG9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQ29tcGxhdGVFdmVudHMoKXtcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5jb21wbGF0ZUxJU1QuZW50cmllcygpKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgIGxldCBvYmplY3QgPSBpdGVtWzFdO1xyXG5cclxuICAgICAgICAgICAgaWYob2JqZWN0LkNvbXBsYXRlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlZExJU1Quc2V0KGtleSxvYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MSVNULmRlbGV0ZShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbXBsYXRlTElTVC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlVG9kb0xpc3RGcm9tRG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9kb0xpc3RGcm9tRG9tKCl7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtLmNvbXBsYXRlJyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8PSB0b2RvSXRlbS5sZW5ndGggLSAxOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRvZG9JdGVtW2ldO1xyXG4gICAgICAgICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZUNoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja09uSXRlbSgpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtJyk7XHJcbiAgICAgICAgKGl0ZW1zLmxlbmd0aCA+IDApID8gdGhpcy50b2RvV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdzaG93JykgOiB0aGlzLnRvZG9XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tRG9tTGlzdChvYmplY3Qpe1xyXG4gICAgICAgIHRoaXMudG9kb0xpc3QucmVtb3ZlQ2hpbGQob2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb3V0ZXJMYXRlc3RFdmVudHMoKXtcclxuICAgICAgICBsZXQgbGF0ZXN0QXJyYXkgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuTElTVC5lbnRyaWVzKCkpe1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gaXRlbVswXTtcclxuICAgICAgICAgICAgbGV0IG9iamVjdCA9IGl0ZW1bMV07XHJcbiAgICAgICAgICAgIGlmKCFvYmplY3QuQ29tcGxhdGUpe1xyXG4gICAgICAgICAgICAgICAgbGF0ZXN0QXJyYXkuc2V0KGtleSwgb2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGF0ZXN0QXJyYXkuc2l6ZTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvTGlzdC5qcyIsImltcG9ydCB7VG9kb0xpc3R9IGZyb20gJy4vVG9kb0xpc3QnO1xyXG5pbXBvcnQge1RvZG9JdGVtfSBmcm9tICcuL1RvZG9JdGVtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUb2RvRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvRXZlbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==