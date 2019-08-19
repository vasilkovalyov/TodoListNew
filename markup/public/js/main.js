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
	
	var addTodoItem = document.querySelector('.input-holder .btn');
	var removeAllCompleteTodoItems = document.querySelector('.clear-all');
	var input = document.querySelector('.input-holder input[type="text"]');
	var filterList = document.querySelector('.tab-list-links');
	var todoList = document.querySelector('.todo-list');
	
	var todoListObject = new _TodoList.TodoList(); // object for all array todo items
	var todoEventObject = new _TodoEvents.TodoEvents(); // object for event todo items
	
	
	input.addEventListener('keyup', function (e) {
	    return e.keyCode == 13 ? create() : -1;
	});
	addTodoItem.addEventListener('click', function () {
	    return create();
	});
	
	todoList.addEventListener('click', function (e) {
	    var type = e.target.getAttribute('data-type');
	    var target = e.target.closest('li.todo-item');
	
	    switch (type) {
	        case 'complate':
	            todoListObject.complateEvent(target);
	            break;
	        case 'remove':
	            todoListObject.removeEvent(target);
	            break;
	        default:
	            break;
	    }
	});
	
	function create() {
	    !input.value ? alert('input is empty') : todoListObject.createTodoEvent(input.value);
	
	    input.value = '';
	};
	
	removeAllCompleteTodoItems.addEventListener('click', function () {
	    todoListObject.removeAllComplateEvents();
	});
	
	filterList.addEventListener('click', function (e) {
	    var filterItem = e.target.getAttribute('data-active');
	    switch (filterItem) {
	        case 'all':
	            todoListObject.filterEventsByType(todoListObject.LIST);
	            break;
	        case 'active':
	            todoListObject.filterEventsByType(todoListObject.notComplateLIST);
	            break;
	        case 'complated':
	            todoListObject.filterEventsByType(todoListObject.complateLIST);
	            break;
	    }
	});

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
	            var li = "\n            <li id=" + _this.id + " class='todo-item'>\n                <span class=\"todo-item-check\" data-key='" + _this.id + "' data-type='complate' complate-btn></span>\n                <span class=\"todo-item-text\">" + _this.text + "</span>\n                <span class=\"todo-item-remove\" data-key='" + _this.id + "' data-type='remove' remove-btn></span>\n            </li>\n        ";
	
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
	        this.todoList = document.querySelector('.todo-list');
	        this.counterLeftTodoItems = document.querySelector('.left-items .counter');
	        this.counter = 0;
	    }
	
	    _createClass(TodoList, [{
	        key: 'createTodoEvent',
	        value: function createTodoEvent(inputValue) {
	            var counter = this.counter;
	            var todoItemObject = new _TodoItem.TodoItem(this.counter, inputValue, false);
	            this.todoList.insertAdjacentHTML("afterbegin", todoItemObject.renderTodoItem());
	            this.LIST.set(counter, todoItemObject);
	            this.notComplateLIST.set(counter, todoItemObject);
	            this.counter++;
	            this.checkOnItem();
	            this.setCounterEvents(this.getCouterLatestEvents());
	        }
	    }, {
	        key: 'removeEvent',
	        value: function removeEvent(target) {
	            var id = target.getAttribute('id');
	            var object = this.getObjectById(id, this.LIST);
	            object.Trash = true;
	
	            if (object.Complate) {
	                this.movingThroughArraysById(id, this.complateLIST, this.removedLIST);
	                this.removeFormArrayById(id, this.complateLIST);
	            } else {
	                this.movingThroughArraysById(id, this.LIST, this.removedLIST);
	            }
	
	            this.removeFormArrayById(id, this.LIST);
	            this.removeFormArrayById(id, this.notComplateLIST);
	            this.setCounterEvents(this.getCouterLatestEvents());
	            this.removeFromDomList(target);
	            this.checkOnItem();
	        }
	    }, {
	        key: 'complateEvent',
	        value: function complateEvent(target) {
	            var id = target.getAttribute('id');
	            var object = this.getObjectById(id, this.LIST);
	
	            if (object.Complate) {
	                object.Complate = false;
	                this.movingThroughArraysById(id, this.complateLIST, this.notComplateLIST);
	                this.removeFormArrayById(id, this.complateLIST);
	                target.classList.remove('complate');
	            } else {
	                object.Complate = true;
	                this.movingThroughArraysById(id, this.LIST, this.complateLIST);
	                this.removeFormArrayById(id, this.notComplateLIST);
	                target.classList.add('complate');
	            }
	
	            this.setCounterEvents(this.getCouterLatestEvents());
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
	            var todoWrapper = document.querySelector('.main-todo-wrapper');
	
	            var items = document.querySelectorAll('.todo-item');
	            items.length > 0 ? todoWrapper.classList.add('show') : todoWrapper.classList.remove('show');
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
	        key: 'filterEventsByType',
	        value: function filterEventsByType(mapArray) {
	            this.removeAllChildren();
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = mapArray.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var item = _step6.value;
	
	                    this.todoList.insertAdjacentHTML("afterbegin", item[1].renderTodoItem());
	                    var check = document.querySelector('.todo-item');
	                    if (item[1].Complate) {
	                        check.classList.add('complate');
	                    }
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'removeAllChildren',
	        value: function removeAllChildren() {
	            while (this.todoList.firstChild) {
	                this.todoList.removeChild(this.todoList.firstChild);
	            }
	        }
	    }, {
	        key: 'setCounterEvents',
	        value: function setCounterEvents(counter) {
	            this.counterLeftTodoItems.innerHTML = counter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTJhMGNkMjM0ZDMzMWYxZTM2ZmEiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9tYWluLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9FdmVudHMuanMiXSwibmFtZXMiOlsiYWRkVG9kb0l0ZW0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcyIsImlucHV0IiwiZmlsdGVyTGlzdCIsInRvZG9MaXN0IiwidG9kb0xpc3RPYmplY3QiLCJUb2RvTGlzdCIsInRvZG9FdmVudE9iamVjdCIsIlRvZG9FdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJjcmVhdGUiLCJ0eXBlIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiY2xvc2VzdCIsImNvbXBsYXRlRXZlbnQiLCJyZW1vdmVFdmVudCIsInZhbHVlIiwiYWxlcnQiLCJjcmVhdGVUb2RvRXZlbnQiLCJyZW1vdmVBbGxDb21wbGF0ZUV2ZW50cyIsImZpbHRlckl0ZW0iLCJmaWx0ZXJFdmVudHNCeVR5cGUiLCJMSVNUIiwibm90Q29tcGxhdGVMSVNUIiwiY29tcGxhdGVMSVNUIiwiVG9kb0l0ZW0iLCJpZCIsInRleHQiLCJyZW5kZXJUb2RvSXRlbSIsImxpIiwiY29tcGxhdGUiLCJ0cmFzaCIsIk1hcCIsInJlbW92ZWRMSVNUIiwiY291bnRlckxlZnRUb2RvSXRlbXMiLCJjb3VudGVyIiwiaW5wdXRWYWx1ZSIsInRvZG9JdGVtT2JqZWN0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic2V0IiwiY2hlY2tPbkl0ZW0iLCJzZXRDb3VudGVyRXZlbnRzIiwiZ2V0Q291dGVyTGF0ZXN0RXZlbnRzIiwib2JqZWN0IiwiZ2V0T2JqZWN0QnlJZCIsIlRyYXNoIiwiQ29tcGxhdGUiLCJtb3ZpbmdUaHJvdWdoQXJyYXlzQnlJZCIsInJlbW92ZUZvcm1BcnJheUJ5SWQiLCJyZW1vdmVGcm9tRG9tTGlzdCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsIm1hcEFycmF5IiwiZW50cmllcyIsIml0ZW0iLCJnZXQiLCJrZXlzIiwia2V5IiwiZGVsZXRlIiwib2xkQXJyYXlNYXAiLCJuZXdBcnJheU1hcCIsImNsZWFyIiwicmVtb3ZlVG9kb0xpc3RGcm9tRG9tIiwidG9kb0l0ZW0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImxlbmd0aCIsInJlbW92ZUNoaWxkIiwidG9kb1dyYXBwZXIiLCJpdGVtcyIsImxhdGVzdEFycmF5Iiwic2l6ZSIsInJlbW92ZUFsbENoaWxkcmVuIiwiY2hlY2siLCJmaXJzdENoaWxkIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUVBLEtBQU1BLGNBQWNDLFNBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXBCO0FBQ0EsS0FBTUMsNkJBQTZCRixTQUFTQyxhQUFULENBQXVCLFlBQXZCLENBQW5DO0FBQ0EsS0FBTUUsUUFBUUgsU0FBU0MsYUFBVCxDQUF1QixrQ0FBdkIsQ0FBZDtBQUNBLEtBQU1HLGFBQWFKLFNBQVNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQW5CO0FBQ0EsS0FBTUksV0FBV0wsU0FBU0MsYUFBVCxDQUF1QixZQUF2QixDQUFqQjs7QUFHQSxLQUFNSyxpQkFBaUIsSUFBSUMsa0JBQUosRUFBdkIsQyxDQUF1QztBQUN2QyxL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LFFBQUwsQ0FBYzBFLFVBQXJCLEVBQWlDO0FBQzdCLHNCQUFLMUUsUUFBTCxDQUFjbUUsV0FBZCxDQUEyQixLQUFLbkUsUUFBTCxDQUFjMEUsVUFBekM7QUFDSDtBQUNKOzs7MENBRWdCeEMsTyxFQUFRO0FBQ3JCLGtCQUFLRCxvQkFBTCxDQUEwQjBDLFNBQTFCLEdBQXNDekMsT0FBdEM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSkw7O0FBQ0E7Ozs7S0FFYTlCLFUsV0FBQUEsVSxHQUNULHNCQUFhO0FBQUE7QUFFWixFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMmEwY2QyMzRkMzMxZjFlMzZmYSIsImltcG9ydCB7IFRvZG9JdGVtIH0gZnJvbSAnLi9jb21wb25lbnRzL1RvZG9JdGVtJztcclxuaW1wb3J0IHtUb2RvTGlzdH0gZnJvbSAnLi9jb21wb25lbnRzL1RvZG9MaXN0JztcclxuaW1wb3J0IHtUb2RvRXZlbnRzfSBmcm9tICcuL2NvbXBvbmVudHMvVG9kb0V2ZW50cyc7XHJcblxyXG5jb25zdCBhZGRUb2RvSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgLmJ0bicpO1xyXG5jb25zdCByZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhci1hbGwnKTtcclxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbmNvbnN0IGZpbHRlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiLWxpc3QtbGlua3MnKTtcclxuY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XHJcblxyXG5cclxuY29uc3QgdG9kb0xpc3RPYmplY3QgPSBuZXcgVG9kb0xpc3QoKTsgLy8gb2JqZWN0IGZvciBhbGwgYXJyYXkgdG9kbyBpdGVtc1xyXG5jb25zdCB0b2RvRXZlbnRPYmplY3QgPSBuZXcgVG9kb0V2ZW50cygpOyAvLyBvYmplY3QgZm9yIGV2ZW50IHRvZG8gaXRlbXNcclxuXHJcblxyXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiBlLmtleUNvZGUgPT0gMTMgPyBjcmVhdGUoKSA6IC0xKTtcclxuYWRkVG9kb0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjcmVhdGUoKSk7XHJcblxyXG50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgY29uc3QgdHlwZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdsaS50b2RvLWl0ZW0nKTtcclxuXHJcbiAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgY2FzZSAnY29tcGxhdGUnOlxyXG4gICAgICAgICAgICB0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUV2ZW50KHRhcmdldCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3JlbW92ZSc6XHJcbiAgICAgICAgICAgIHRvZG9MaXN0T2JqZWN0LnJlbW92ZUV2ZW50KHRhcmdldCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpe1xyXG4gICAgIWlucHV0LnZhbHVlID8gYWxlcnQoJ2lucHV0IGlzIGVtcHR5JykgOiB0b2RvTGlzdE9iamVjdC5jcmVhdGVUb2RvRXZlbnQoaW5wdXQudmFsdWUpO1xyXG5cclxuICAgIGlucHV0LnZhbHVlID0gJyc7XHJcbn07XHJcblxyXG5yZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHRvZG9MaXN0T2JqZWN0LnJlbW92ZUFsbENvbXBsYXRlRXZlbnRzKCk7XHJcbn0pXHJcblxyXG5maWx0ZXJMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGNvbnN0IGZpbHRlckl0ZW0gPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJyk7XHJcbiAgICBzd2l0Y2goZmlsdGVySXRlbSl7XHJcbiAgICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICAgICAgdG9kb0xpc3RPYmplY3QuZmlsdGVyRXZlbnRzQnlUeXBlKHRvZG9MaXN0T2JqZWN0LkxJU1QpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdhY3RpdmUnOlxyXG4gICAgICAgICAgICB0b2RvTGlzdE9iamVjdC5maWx0ZXJFdmVudHNCeVR5cGUodG9kb0xpc3RPYmplY3Qubm90Q29tcGxhdGVMSVNUKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29tcGxhdGVkJzpcclxuICAgICAgICAgICAgdG9kb0xpc3RPYmplY3QuZmlsdGVyRXZlbnRzQnlUeXBlKHRvZG9MaXN0T2JqZWN0LmNvbXBsYXRlTElTVCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXYvanMvZXM2L21haW4uanMiLCJleHBvcnQgY2xhc3MgVG9kb0l0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IoaWQsIHRleHQpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLmNvbXBsYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50cmFzaCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBJZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBDb21wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgQ29tcGxhdGUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNvbXBsYXRlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFRyYXNoKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhc2g7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFRyYXNoKHZhbHVlKXtcclxuICAgICAgICB0aGlzLnRyYXNoID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVG9kb0l0ZW0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBgXHJcbiAgICAgICAgICAgIDxsaSBpZD0ke3RoaXMuaWR9IGNsYXNzPSd0b2RvLWl0ZW0nPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWl0ZW0tY2hlY2tcIiBkYXRhLWtleT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdjb21wbGF0ZScgY29tcGxhdGUtYnRuPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1pdGVtLXRleHRcIj4ke3RoaXMudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS1yZW1vdmVcIiBkYXRhLWtleT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdyZW1vdmUnIHJlbW92ZS1idG4+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIHJldHVybiBsaTtcclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9JdGVtLmpzIiwiaW1wb3J0IHtUb2RvSXRlbX0gZnJvbSAnLi9Ub2RvSXRlbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9kb0xpc3R7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuTElTVCA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZWRMSVNUID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuY29tcGxhdGVMSVNUID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMubm90Q29tcGxhdGVMSVNUID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyTGVmdFRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0LWl0ZW1zIC5jb3VudGVyJyk7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUb2RvRXZlbnQoaW5wdXRWYWx1ZSl7XHJcbiAgICAgICAgY29uc3QgY291bnRlciA9IHRoaXMuY291bnRlcjtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbU9iamVjdCA9IG5ldyBUb2RvSXRlbSh0aGlzLmNvdW50ZXIsIGlucHV0VmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnRvZG9MaXN0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgdG9kb0l0ZW1PYmplY3QucmVuZGVyVG9kb0l0ZW0oKSk7XHJcbiAgICAgICAgdGhpcy5MSVNULnNldCggY291bnRlciwgdG9kb0l0ZW1PYmplY3QgKTtcclxuICAgICAgICB0aGlzLm5vdENvbXBsYXRlTElTVC5zZXQoIGNvdW50ZXIsIHRvZG9JdGVtT2JqZWN0ICk7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyKys7XHJcbiAgICAgICAgdGhpcy5jaGVja09uSXRlbSgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q291bnRlckV2ZW50cyh0aGlzLmdldENvdXRlckxhdGVzdEV2ZW50cygpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVFdmVudCh0YXJnZXQpe1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLmdldE9iamVjdEJ5SWQoaWQsdGhpcy5MSVNUKTtcclxuICAgICAgICBvYmplY3QuVHJhc2ggPSB0cnVlO1xyXG5cclxuICAgICAgICBpZihvYmplY3QuQ29tcGxhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLmNvbXBsYXRlTElTVCwgdGhpcy5yZW1vdmVkTElTVCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRm9ybUFycmF5QnlJZChpZCwgdGhpcy5jb21wbGF0ZUxJU1QpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLkxJU1QsIHRoaXMucmVtb3ZlZExJU1QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0aGlzLkxJU1QpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRm9ybUFycmF5QnlJZChpZCwgdGhpcy5ub3RDb21wbGF0ZUxJU1QpO1xyXG4gICAgICAgIHRoaXMuc2V0Q291bnRlckV2ZW50cyh0aGlzLmdldENvdXRlckxhdGVzdEV2ZW50cygpKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUZyb21Eb21MaXN0KHRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jaGVja09uSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBsYXRlRXZlbnQodGFyZ2V0KXtcclxuICAgICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5nZXRPYmplY3RCeUlkKGlkLHRoaXMuTElTVCk7XHJcblxyXG4gICAgICAgIGlmKG9iamVjdC5Db21wbGF0ZSl7XHJcbiAgICAgICAgICAgIG9iamVjdC5Db21wbGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLmNvbXBsYXRlTElTVCwgdGhpcy5ub3RDb21wbGF0ZUxJU1QpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZvcm1BcnJheUJ5SWQoaWQsIHRoaXMuY29tcGxhdGVMSVNUKTtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsYXRlJyk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBvYmplY3QuQ29tcGxhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLkxJU1QsIHRoaXMuY29tcGxhdGVMSVNUKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0aGlzLm5vdENvbXBsYXRlTElTVCk7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdjb21wbGF0ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRDb3VudGVyRXZlbnRzKHRoaXMuZ2V0Q291dGVyTGF0ZXN0RXZlbnRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE9iamVjdEJ5SWQoaWQsIG1hcEFycmF5KXtcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgbWFwQXJyYXkuZW50cmllcygpKXtcclxuICAgICAgICAgICAgaWYoaXRlbVswXSA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwQXJyYXkuZ2V0KGl0ZW1bMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZvcm1BcnJheUJ5SWQoaWQsIG1hcEFycmF5KXtcclxuICAgICAgICBmb3IobGV0IGtleSBvZiBtYXBBcnJheS5rZXlzKCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgbWFwQXJyYXkuZGVsZXRlKGtleSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZpbmdUaHJvdWdoQXJyYXlzQnlJZChpZCwgb2xkQXJyYXlNYXAsIG5ld0FycmF5TWFwKXtcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2Ygb2xkQXJyYXlNYXAuZW50cmllcygpKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgIGxldCBvYmplY3QgPSBpdGVtWzFdO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgbmV3QXJyYXlNYXAuc2V0KGtleSxvYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbENvbXBsYXRlRXZlbnRzKCl7XHJcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuY29tcGxhdGVMSVNULmVudHJpZXMoKSl7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBpdGVtWzBdO1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0ID0gaXRlbVsxXTtcclxuXHJcbiAgICAgICAgICAgIGlmKG9iamVjdC5Db21wbGF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWRMSVNULnNldChrZXksb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTElTVC5kZWxldGUoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb21wbGF0ZUxJU1QuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZVRvZG9MaXN0RnJvbURvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG9MaXN0RnJvbURvbSgpe1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbS5jb21wbGF0ZScpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPD0gdG9kb0l0ZW0ubGVuZ3RoIC0gMTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0b2RvSXRlbVtpXTtcclxuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5yZW1vdmVDaGlsZChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tPbkl0ZW0oKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10b2RvLXdyYXBwZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtJyk7XHJcbiAgICAgICAgKGl0ZW1zLmxlbmd0aCA+IDApID8gdG9kb1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpIDogdG9kb1dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21Eb21MaXN0KG9iamVjdCl7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdC5yZW1vdmVDaGlsZChvYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvdXRlckxhdGVzdEV2ZW50cygpe1xyXG4gICAgICAgIGxldCBsYXRlc3RBcnJheSA9IG5ldyBNYXAoKTtcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5MSVNULmVudHJpZXMoKSl7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBpdGVtWzBdO1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0ID0gaXRlbVsxXTtcclxuICAgICAgICAgICAgaWYoIW9iamVjdC5Db21wbGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBsYXRlc3RBcnJheS5zZXQoa2V5LCBvYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYXRlc3RBcnJheS5zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckV2ZW50c0J5VHlwZShtYXBBcnJheSl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiBtYXBBcnJheS5lbnRyaWVzKCkpe1xyXG4gICAgICAgICAgICB0aGlzLnRvZG9MaXN0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaXRlbVsxXS5yZW5kZXJUb2RvSXRlbSgpKTtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1pdGVtJyk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW1bMV0uQ29tcGxhdGUpe1xyXG4gICAgICAgICAgICAgICAgY2hlY2suY2xhc3NMaXN0LmFkZCgnY29tcGxhdGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxDaGlsZHJlbigpe1xyXG4gICAgICAgIHdoaWxlICh0aGlzLnRvZG9MaXN0LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5yZW1vdmVDaGlsZCggdGhpcy50b2RvTGlzdC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q291bnRlckV2ZW50cyhjb3VudGVyKXtcclxuICAgICAgICB0aGlzLmNvdW50ZXJMZWZ0VG9kb0l0ZW1zLmlubmVySFRNTCA9IGNvdW50ZXI7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0xpc3QuanMiLCJpbXBvcnQge1RvZG9MaXN0fSBmcm9tICcuL1RvZG9MaXN0JztcclxuaW1wb3J0IHtUb2RvSXRlbX0gZnJvbSAnLi9Ub2RvSXRlbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9kb0V2ZW50cyB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0V2ZW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=