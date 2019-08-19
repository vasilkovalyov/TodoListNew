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
	    !input.value ? alert('input is empty') : todoListObject.createTodoEvent();
	};
	
	removeAllCompleteTodoItems.addEventListener('click', function () {
	    todoListObject.removeAllComplateEvents();
	});
	
	// function remove(target){
	//     const id = target.getAttribute('id');
	//     const todoObject = todoListObject.getObjectById(id, todoListObject.LIST);
	//     todoObject.Trash = true;
	
	//     if(todoObject.Complate == true){
	//         todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.removedLIST);
	//         todoListObject.removeFormArrayById(id, todoListObject.complateLIST);
	//     }else{
	//         todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.removedLIST);
	//     }
	
	//     todoListObject.removeFormArrayById(id, todoListObject.LIST);
	//     counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
	//     todoListObject.removeFromDomList(target);
	//     todoListObject.checkOnItem();
	// }
	
	// function complate(target){
	//     const id = target.getAttribute('id');
	//     const todoObject = todoListObject.getObjectById(id, todoListObject.LIST);
	
	//     if(todoObject.Complate){
	//         todoObject.Complate = false;
	//         todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.LIST);
	//         target.classList.remove('complate');
	//     }else{
	//         todoObject.Complate = true;
	//         todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.complateLIST);
	//         target.classList.add('complate');
	//     }
	
	//     counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
	// }
	
	function filterTodoList() {
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
	}
	
	filterTodoList();

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
	
	        this.input = document.querySelector('.input-holder input[type="text"]');
	        this.todoWrapper = document.querySelector('.main-todo-wrapper');
	        this.todoList = document.querySelector('.todo-list');
	        this.counter = 0;
	
	        this.counterLeftTodoItems = document.querySelector('.left-items .counter');
	    }
	
	    _createClass(TodoList, [{
	        key: 'createTodoEvent',
	        value: function createTodoEvent() {
	            var counter = this.counter;
	            var todoItemObject = new _TodoItem.TodoItem(this.counter, this.input.value, false);
	            this.input.value = '';
	            this.todoList.insertAdjacentHTML("afterbegin", todoItemObject.renderTodoItem()); // add event in DOM events list
	            this.LIST.set(counter, todoItemObject);
	            this.notComplateLIST.set(counter, todoItemObject);
	            this.counter++;
	            this.checkOnItem(); // visual check event
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWMxMzU2NGNhNGI5OGJjNjcxZDYiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9tYWluLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9FdmVudHMuanMiXSwibmFtZXMiOlsiaW5wdXRIb2xkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRUb2RvSXRlbSIsImNvdW50ZXJMZWZ0VG9kb0l0ZW1zIiwicmVtb3ZlQWxsQ29tcGxldGVUb2RvSXRlbXMiLCJpbnB1dCIsImZpbHRlckxpc3QiLCJ0b2RvTGlzdCIsInRvZG9MaXN0T2JqZWN0IiwiVG9kb0xpc3QiLCJ0b2RvRXZlbnRPYmplY3QiLCJUb2RvRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlDb2RlIiwiY3JlYXRlIiwidHlwZSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImNsb3Nlc3QiLCJjb21wbGF0ZUV2ZW50IiwicmVtb3ZlRXZlbnQiLCJ2YWx1ZSIsImFsZXJ0IiwiY3JlYXRlVG9kb0V2ZW50IiwicmVtb3ZlQWxsQ29tcGxhdGVFdmVudHMiLCJmaWx0ZXJUb2RvTGlzdCIsImZpbHRlckl0ZW0iLCJmaWx0ZXJFdmVudHNCeVR5cGUiLCJMSVNUIiwibm90Q29tcGxhdGVMSVNUIiwiY29tcGxhdGVMSVNUIiwiVG9kb0l0ZW0iLCJpZCIsInRleHQiLCJyZW5kZXJUb2RvSXRlbSIsImxpIiwiY29tcGxhdGUiLCJ0cmFzaCIsIk1hcCIsInJlbW92ZWRMSVNUIiwidG9kb1dyYXBwZXIiLCJjb3VudGVyIiwidG9kb0l0ZW1PYmplY3QiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzZXQiLCJjaGVja09uSXRlbSIsInNldENvdW50ZXJFdmVudHMiLCJnZXRDb3V0ZXJMYXRlc3RFdmVudHMiLCJvYmplY3QiLCJnZXRPYmplY3RCeUlkIiwiVHJhc2giLCJDb21wbGF0ZSIsIm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkIiwicmVtb3ZlRm9ybUFycmF5QnlJZCIsInJlbW92ZUZyb21Eb21MaXN0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwibWFwQXJyYXkiLCJlbnRyaWVzIiwiaXRlbSIsImdldCIsImtleXMiLCJrZXkiLCJkZWxldGUiLCJvbGRBcnJheU1hcCIsIm5ld0FycmF5TWFwIiwiY2xlYXIiLCJyZW1vdmVUb2RvTGlzdEZyb21Eb20iLCJ0b2RvSXRlbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuZ3RoIiwicmVtb3ZlQ2hpbGQiLCJpdGVtcyIsImxhdGVzdEFycmF5Iiwic2l6ZSIsInJlbW92ZUFsbENoaWxkcmVuIiwiY2hlY2siLCJmaXJzdENoaWxkIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUNBOztBQUVBLEtBQU1BLGNBQWNDLFNBQVNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBcEI7QUFDQSxLQUFNQyxjQUFjRixTQUFTQyxhQUFULENBQXVCLG9CQUF2QixDQUFwQjtBQUNBLEtBQU1FLHVCQUF1QkgsU0FBU0MsYUFBVCxDQUF1QixzQkFBdkIsQ0FBN0I7QUFDQSxLQUFNRyw2QkFBNkJKLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbkM7QUFDQSxLQUFNSSxRQUFRTCxTQUFTQyxhQUFULENBQXVCLGtDQUF2QixDQUFkO0FBQ0EsS0FBTUssYUFBYU4sU0FBU0MsYUFBVCxDQUF1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LGlCQUFMO0FBRHdCO0FBQUE7QUFBQTs7QUFBQTtBQUV4Qix1Q0FBZ0JuQixTQUFTQyxPQUFULEVBQWhCLG1JQUFtQztBQUFBLHlCQUEzQkMsSUFBMkI7O0FBQy9CLDBCQUFLdEQsUUFBTCxDQUFjcUMsa0JBQWQsQ0FBaUMsWUFBakMsRUFBK0NpQixLQUFLLENBQUwsRUFBUTFCLGNBQVIsRUFBL0M7QUFDQSx5QkFBTTRDLFFBQVEvRSxTQUFTQyxhQUFULENBQXVCLFlBQXZCLENBQWQ7QUFDQSx5QkFBRzRELEtBQUssQ0FBTCxFQUFRVCxRQUFYLEVBQW9CO0FBQ2hCMkIsK0JBQU12QixTQUFOLENBQWdCRSxHQUFoQixDQUFvQixVQUFwQjtBQUNIO0FBQ0o7QUFSdUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVMzQjs7OzZDQUVrQjtBQUNmLG9CQUFPLEtBQUtuRCxRQUFMLENBQWN5RSxVQUFyQixFQUFpQztBQUM3QixzQkFBS3pFLFFBQUwsQ0FBY21FLFdBQWQsQ0FBMkIsS0FBS25FLFFBQUwsQ0FBY3lFLFVBQXpDO0FBQ0g7QUFDSjs7OzBDQUVnQnRDLE8sRUFBUTtBQUNyQixrQkFBS3ZDLG9CQUFMLENBQTBCOEUsU0FBMUIsR0FBc0N2QyxPQUF0QztBQUNIOzs7NkJBckpZO0FBQ1Qsb0JBQU8sS0FBS0EsT0FBWjtBQUNILFU7MkJBRVdwQixLLEVBQU07QUFDZCxrQkFBS29CLE9BQUwsR0FBZXBCLEtBQWY7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Qkw7O0FBQ0E7Ozs7S0FFYVgsVSxXQUFBQSxVLEdBQ1Qsc0JBQWE7QUFBQTtBQUVaLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFjMTM1NjRjYTRiOThiYzY3MWQ2IiwiaW1wb3J0IHsgVG9kb0l0ZW0gfSBmcm9tICcuL2NvbXBvbmVudHMvVG9kb0l0ZW0nO1xyXG5pbXBvcnQge1RvZG9MaXN0fSBmcm9tICcuL2NvbXBvbmVudHMvVG9kb0xpc3QnO1xyXG5pbXBvcnQge1RvZG9FdmVudHN9IGZyb20gJy4vY29tcG9uZW50cy9Ub2RvRXZlbnRzJztcclxuXHJcbmNvbnN0IGlucHV0SG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWhvbGRlcicpO1xyXG5jb25zdCBhZGRUb2RvSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgLmJ0bicpO1xyXG5jb25zdCBjb3VudGVyTGVmdFRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0LWl0ZW1zIC5jb3VudGVyJyk7XHJcbmNvbnN0IHJlbW92ZUFsbENvbXBsZXRlVG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyLWFsbCcpO1xyXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuY29uc3QgZmlsdGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWItbGlzdC1saW5rcycpO1xyXG5jb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcclxuXHJcblxyXG5jb25zdCB0b2RvTGlzdE9iamVjdCA9IG5ldyBUb2RvTGlzdCgpOyAvLyBvYmplY3QgZm9yIGFsbCBhcnJheSB0b2RvIGl0ZW1zXHJcbmNvbnN0IHRvZG9FdmVudE9iamVjdCA9IG5ldyBUb2RvRXZlbnRzKCk7IC8vIG9iamVjdCBmb3IgZXZlbnQgdG9kbyBpdGVtc1xyXG5cclxuXHJcbmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IGUua2V5Q29kZSA9PSAxMyA/IGNyZWF0ZSgpIDogLTEpO1xyXG5hZGRUb2RvSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNyZWF0ZSgpKTtcclxuXHJcbnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBjb25zdCB0eXBlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnKTtcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2xpLnRvZG8taXRlbScpO1xyXG5cclxuICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICBjYXNlICdjb21wbGF0ZSc6XHJcbiAgICAgICAgICAgIHRvZG9MaXN0T2JqZWN0LmNvbXBsYXRlRXZlbnQodGFyZ2V0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncmVtb3ZlJzpcclxuICAgICAgICAgICAgdG9kb0xpc3RPYmplY3QucmVtb3ZlRXZlbnQodGFyZ2V0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCl7XHJcbiAgICAhaW5wdXQudmFsdWUgPyBhbGVydCgnaW5wdXQgaXMgZW1wdHknKSA6IHRvZG9MaXN0T2JqZWN0LmNyZWF0ZVRvZG9FdmVudCgpO1xyXG59O1xyXG5cclxucmVtb3ZlQWxsQ29tcGxldGVUb2RvSXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0b2RvTGlzdE9iamVjdC5yZW1vdmVBbGxDb21wbGF0ZUV2ZW50cygpO1xyXG59KVxyXG5cclxuLy8gZnVuY3Rpb24gcmVtb3ZlKHRhcmdldCl7XHJcbi8vICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbi8vICAgICBjb25zdCB0b2RvT2JqZWN0ID0gdG9kb0xpc3RPYmplY3QuZ2V0T2JqZWN0QnlJZChpZCwgdG9kb0xpc3RPYmplY3QuTElTVCk7XHJcbi8vICAgICB0b2RvT2JqZWN0LlRyYXNoID0gdHJ1ZTtcclxuXHJcbi8vICAgICBpZih0b2RvT2JqZWN0LkNvbXBsYXRlID09IHRydWUpe1xyXG4vLyAgICAgICAgIHRvZG9MaXN0T2JqZWN0Lm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUxJU1QsIHRvZG9MaXN0T2JqZWN0LnJlbW92ZWRMSVNUKTtcclxuLy8gICAgICAgICB0b2RvTGlzdE9iamVjdC5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUxJU1QpO1xyXG4vLyAgICAgfWVsc2V7XHJcbi8vICAgICAgICAgdG9kb0xpc3RPYmplY3QubW92aW5nVGhyb3VnaEFycmF5c0J5SWQoaWQsIHRvZG9MaXN0T2JqZWN0LkxJU1QsIHRvZG9MaXN0T2JqZWN0LnJlbW92ZWRMSVNUKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICB0b2RvTGlzdE9iamVjdC5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5MSVNUKTtcclxuLy8gICAgIGNvdW50ZXJMZWZ0VG9kb0l0ZW1zLmlubmVyVGV4dCA9IHRvZG9MaXN0T2JqZWN0LmdldENvdXRlckxhdGVzdEV2ZW50cygpO1xyXG4vLyAgICAgdG9kb0xpc3RPYmplY3QucmVtb3ZlRnJvbURvbUxpc3QodGFyZ2V0KTtcclxuLy8gICAgIHRvZG9MaXN0T2JqZWN0LmNoZWNrT25JdGVtKCk7XHJcbi8vIH1cclxuXHJcbi8vIGZ1bmN0aW9uIGNvbXBsYXRlKHRhcmdldCl7XHJcbi8vICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbi8vICAgICBjb25zdCB0b2RvT2JqZWN0ID0gdG9kb0xpc3RPYmplY3QuZ2V0T2JqZWN0QnlJZChpZCwgdG9kb0xpc3RPYmplY3QuTElTVCk7XHJcblxyXG4vLyAgICAgaWYodG9kb09iamVjdC5Db21wbGF0ZSl7XHJcbi8vICAgICAgICAgdG9kb09iamVjdC5Db21wbGF0ZSA9IGZhbHNlO1xyXG4vLyAgICAgICAgIHRvZG9MaXN0T2JqZWN0Lm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUxJU1QsIHRvZG9MaXN0T2JqZWN0LkxJU1QpO1xyXG4vLyAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGF0ZScpO1xyXG4vLyAgICAgfWVsc2V7XHJcbi8vICAgICAgICAgdG9kb09iamVjdC5Db21wbGF0ZSA9IHRydWU7XHJcbi8vICAgICAgICAgdG9kb0xpc3RPYmplY3QubW92aW5nVGhyb3VnaEFycmF5c0J5SWQoaWQsIHRvZG9MaXN0T2JqZWN0LkxJU1QsIHRvZG9MaXN0T2JqZWN0LmNvbXBsYXRlTElTVCk7XHJcbi8vICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NvbXBsYXRlJyk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgY291bnRlckxlZnRUb2RvSXRlbXMuaW5uZXJUZXh0ID0gdG9kb0xpc3RPYmplY3QuZ2V0Q291dGVyTGF0ZXN0RXZlbnRzKCk7XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlclRvZG9MaXN0KCl7XHJcbiAgICBmaWx0ZXJMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCBmaWx0ZXJJdGVtID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpO1xyXG4gICAgICAgIHN3aXRjaChmaWx0ZXJJdGVtKXtcclxuICAgICAgICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICAgICAgICAgIHRvZG9MaXN0T2JqZWN0LmZpbHRlckV2ZW50c0J5VHlwZSh0b2RvTGlzdE9iamVjdC5MSVNUKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhY3RpdmUnOlxyXG4gICAgICAgICAgICAgICAgdG9kb0xpc3RPYmplY3QuZmlsdGVyRXZlbnRzQnlUeXBlKHRvZG9MaXN0T2JqZWN0Lm5vdENvbXBsYXRlTElTVCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY29tcGxhdGVkJzpcclxuICAgICAgICAgICAgICAgIHRvZG9MaXN0T2JqZWN0LmZpbHRlckV2ZW50c0J5VHlwZSh0b2RvTGlzdE9iamVjdC5jb21wbGF0ZUxJU1QpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZpbHRlclRvZG9MaXN0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2L2pzL2VzNi9tYWluLmpzIiwiZXhwb3J0IGNsYXNzIFRvZG9JdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCB0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5jb21wbGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJhc2ggPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgSWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQ29tcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IENvbXBsYXRlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5jb21wbGF0ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBUcmFzaCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBUcmFzaCh2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy50cmFzaCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclRvZG9JdGVtID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpID0gYFxyXG4gICAgICAgICAgICA8bGkgaWQ9JHt0aGlzLmlkfSBjbGFzcz0ndG9kby1pdGVtJz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1pdGVtLWNoZWNrXCIgZGF0YS1rZXk9JyR7dGhpcy5pZH0nIGRhdGEtdHlwZT0nY29tcGxhdGUnIGNvbXBsYXRlLWJ0bj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS10ZXh0XCI+JHt0aGlzLnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWl0ZW0tcmVtb3ZlXCIgZGF0YS1rZXk9JyR7dGhpcy5pZH0nIGRhdGEtdHlwZT0ncmVtb3ZlJyByZW1vdmUtYnRuPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gbGk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsImltcG9ydCB7VG9kb0l0ZW19IGZyb20gJy4vVG9kb0l0ZW0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRvZG9MaXN0e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLkxJU1QgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVkTElTVCA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmNvbXBsYXRlTElTVCA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLm5vdENvbXBsYXRlTElTVCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgICAgICB0aGlzLnRvZG9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdG9kby13cmFwcGVyJyk7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcclxuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmNvdW50ZXJMZWZ0VG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtaXRlbXMgLmNvdW50ZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQ291bnRlcigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IENvdW50ZXIodmFsdWUpe1xyXG4gICAgICAgIHRoaXMuY291bnRlciA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRvZG9FdmVudCgpe1xyXG4gICAgICAgIGNvbnN0IGNvdW50ZXIgPSB0aGlzLmNvdW50ZXI7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW1PYmplY3QgPSBuZXcgVG9kb0l0ZW0odGhpcy5jb3VudGVyLCB0aGlzLmlucHV0LnZhbHVlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIHRoaXMudG9kb0xpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCB0b2RvSXRlbU9iamVjdC5yZW5kZXJUb2RvSXRlbSgpKTsgLy8gYWRkIGV2ZW50IGluIERPTSBldmVudHMgbGlzdFxyXG4gICAgICAgIHRoaXMuTElTVC5zZXQoIGNvdW50ZXIsIHRvZG9JdGVtT2JqZWN0ICk7XHJcbiAgICAgICAgdGhpcy5ub3RDb21wbGF0ZUxJU1Quc2V0KCBjb3VudGVyLCB0b2RvSXRlbU9iamVjdCApO1xyXG4gICAgICAgIHRoaXMuY291bnRlcisrO1xyXG4gICAgICAgIHRoaXMuY2hlY2tPbkl0ZW0oKTsgLy8gdmlzdWFsIGNoZWNrIGV2ZW50XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q291bnRlckV2ZW50cyh0aGlzLmdldENvdXRlckxhdGVzdEV2ZW50cygpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVFdmVudCh0YXJnZXQpe1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLmdldE9iamVjdEJ5SWQoaWQsdGhpcy5MSVNUKTtcclxuICAgICAgICBvYmplY3QuVHJhc2ggPSB0cnVlO1xyXG5cclxuICAgICAgICBpZihvYmplY3QuQ29tcGxhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLmNvbXBsYXRlTElTVCwgdGhpcy5yZW1vdmVkTElTVCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRm9ybUFycmF5QnlJZChpZCwgdGhpcy5jb21wbGF0ZUxJU1QpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLkxJU1QsIHRoaXMucmVtb3ZlZExJU1QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0aGlzLkxJU1QpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRm9ybUFycmF5QnlJZChpZCwgdGhpcy5ub3RDb21wbGF0ZUxJU1QpO1xyXG4gICAgICAgIHRoaXMuc2V0Q291bnRlckV2ZW50cyh0aGlzLmdldENvdXRlckxhdGVzdEV2ZW50cygpKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUZyb21Eb21MaXN0KHRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jaGVja09uSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBsYXRlRXZlbnQodGFyZ2V0KXtcclxuICAgICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5nZXRPYmplY3RCeUlkKGlkLHRoaXMuTElTVCk7XHJcblxyXG4gICAgICAgIGlmKG9iamVjdC5Db21wbGF0ZSl7XHJcbiAgICAgICAgICAgIG9iamVjdC5Db21wbGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLmNvbXBsYXRlTElTVCwgdGhpcy5ub3RDb21wbGF0ZUxJU1QpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZvcm1BcnJheUJ5SWQoaWQsIHRoaXMuY29tcGxhdGVMSVNUKTtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsYXRlJyk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBvYmplY3QuQ29tcGxhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Rocm91Z2hBcnJheXNCeUlkKGlkLCB0aGlzLkxJU1QsIHRoaXMuY29tcGxhdGVMSVNUKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGb3JtQXJyYXlCeUlkKGlkLCB0aGlzLm5vdENvbXBsYXRlTElTVCk7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdjb21wbGF0ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRDb3VudGVyRXZlbnRzKHRoaXMuZ2V0Q291dGVyTGF0ZXN0RXZlbnRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE9iamVjdEJ5SWQoaWQsIG1hcEFycmF5KXtcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgbWFwQXJyYXkuZW50cmllcygpKXtcclxuICAgICAgICAgICAgaWYoaXRlbVswXSA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwQXJyYXkuZ2V0KGl0ZW1bMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZvcm1BcnJheUJ5SWQoaWQsIG1hcEFycmF5KXtcclxuICAgICAgICBmb3IobGV0IGtleSBvZiBtYXBBcnJheS5rZXlzKCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgbWFwQXJyYXkuZGVsZXRlKGtleSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZpbmdUaHJvdWdoQXJyYXlzQnlJZChpZCwgb2xkQXJyYXlNYXAsIG5ld0FycmF5TWFwKXtcclxuICAgICAgICBmb3IobGV0IGl0ZW0gb2Ygb2xkQXJyYXlNYXAuZW50cmllcygpKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgIGxldCBvYmplY3QgPSBpdGVtWzFdO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgbmV3QXJyYXlNYXAuc2V0KGtleSxvYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbENvbXBsYXRlRXZlbnRzKCl7XHJcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuY29tcGxhdGVMSVNULmVudHJpZXMoKSl7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBpdGVtWzBdO1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0ID0gaXRlbVsxXTtcclxuXHJcbiAgICAgICAgICAgIGlmKG9iamVjdC5Db21wbGF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZWRMSVNULnNldChrZXksb2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTElTVC5kZWxldGUoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb21wbGF0ZUxJU1QuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZVRvZG9MaXN0RnJvbURvbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG9MaXN0RnJvbURvbSgpe1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbS5jb21wbGF0ZScpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPD0gdG9kb0l0ZW0ubGVuZ3RoIC0gMTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0b2RvSXRlbVtpXTtcclxuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5yZW1vdmVDaGlsZChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tPbkl0ZW0oKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xyXG4gICAgICAgIChpdGVtcy5sZW5ndGggPiAwKSA/IHRoaXMudG9kb1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpIDogdGhpcy50b2RvV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRnJvbURvbUxpc3Qob2JqZWN0KXtcclxuICAgICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZUNoaWxkKG9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q291dGVyTGF0ZXN0RXZlbnRzKCl7XHJcbiAgICAgICAgbGV0IGxhdGVzdEFycmF5ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLkxJU1QuZW50cmllcygpKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgIGxldCBvYmplY3QgPSBpdGVtWzFdO1xyXG4gICAgICAgICAgICBpZighb2JqZWN0LkNvbXBsYXRlKXtcclxuICAgICAgICAgICAgICAgIGxhdGVzdEFycmF5LnNldChrZXksIG9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhdGVzdEFycmF5LnNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyRXZlbnRzQnlUeXBlKG1hcEFycmF5KXtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIG1hcEFycmF5LmVudHJpZXMoKSl7XHJcbiAgICAgICAgICAgIHRoaXMudG9kb0xpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBpdGVtWzFdLnJlbmRlclRvZG9JdGVtKCkpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWl0ZW0nKTtcclxuICAgICAgICAgICAgaWYoaXRlbVsxXS5Db21wbGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5jbGFzc0xpc3QuYWRkKCdjb21wbGF0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbENoaWxkcmVuKCl7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMudG9kb0xpc3QuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZUNoaWxkKCB0aGlzLnRvZG9MaXN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDb3VudGVyRXZlbnRzKGNvdW50ZXIpe1xyXG4gICAgICAgIHRoaXMuY291bnRlckxlZnRUb2RvSXRlbXMuaW5uZXJIVE1MID0gY291bnRlcjtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvTGlzdC5qcyIsImltcG9ydCB7VG9kb0xpc3R9IGZyb20gJy4vVG9kb0xpc3QnO1xyXG5pbXBvcnQge1RvZG9JdGVtfSBmcm9tICcuL1RvZG9JdGVtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUb2RvRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvRXZlbnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==