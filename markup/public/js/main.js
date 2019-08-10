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
	
	var completeTodoItem = document.querySelectorAll('.todo-item-check');
	var counterLeftTodoItems = document.querySelector('.left-items .counter');
	var removeAllCompleteTodoItems = document.querySelector('.clear-all');
	var todoList = document.querySelector('.todo-list');
	var input = document.querySelector('.input-holder input[type="text"]');
	var todoWrapper = document.querySelector('.main-todo-wrapper');
	var filterList = document.querySelector('.tab-list-links');
	
	var todoListObject = new _TodoList.TodoList(); // object for all array todo items
	var todoEventObject = new _TodoEvents.TodoEvents(); // object for event todo items
	
	var counterTodoEvent = 0;
	
	input.addEventListener('keyup', function (e) {
	    return e.keyCode == 13 ? create() : -1;
	});
	addTodoItem.addEventListener('click', function () {
	    return create();
	});
	
	function create() {
	    if (input.value === '') {
	        alert('input is empty');
	    } else {
	        var todoItemObject = new _TodoItem.TodoItem(counterTodoEvent, input.value, false); // create event object
	        input.value = '';
	        todoList.appendChild(todoItemObject.renderTodoItem()); // add event in DOM events list
	        todoListObject.LIST.push({ counterTodoEvent: counterTodoEvent, todoItemObject: todoItemObject });
	        setCounter(todoListObject.LIST); // counter for remaining events
	        checkOnItem(); // visual check event
	        counterTodoEvent++;
	    }
	}
	
	todoWrapper.addEventListener('click', function (e) {
	    var item = e.target.closest('.todo-item');
	    var dataType = e.target.getAttribute('data-type');
	    var keyTodoItem = e.target.getAttribute('data-key');
	
	    var eventObject = todoListObject.getTodoObjectById(keyTodoItem, todoListObject.LIST);
	
	    switch (dataType) {
	        case 'remove':
	            eventObject.todoItemObject.trash = true;
	
	            console.log(todoListObject);
	            if (!eventObject.todoItemObject.complete) {
	                todoListObject.removedLIST = todoListObject.LIST.filter(function (item) {
	                    return item.todoItemObject.trash == true;
	                });
	            } else {
	                var todoEventInCompleteList = todoListObject.getTodoObjectById(keyTodoItem, todoListObject.completeLIST);
	                todoListObject.completeLIST = todoListObject.removeFromArray(keyTodoItem, todoListObject.completeLIST);
	                todoListObject.removedLIST.push(todoEventInCompleteList);
	            }
	
	            todoListObject.notCompleteLIST = todoListObject.LIST.filter(function (item) {
	                return item.todoItemObject.trash == false;
	            });
	            todoList.removeChild(item);
	            setCounter(todoListObject.LIST); // counter for remaining events
	            checkOnItem();
	
	            break;
	        case 'complate':
	            if (eventObject.todoItemObject.complete) {
	                item.classList.remove('complate');
	                eventObject.todoItemObject.complete = false;
	            } else {
	                item.classList.add('complate');
	                eventObject.todoItemObject.complete = true;
	            }
	
	            // get item with props complete = true and put to removedLIST
	            todoListObject.completeLIST = todoListObject.LIST.filter(function (item) {
	                return item.todoItemObject.complete == true && item.todoItemObject.trash == false;
	            });
	            // get item with props complete = false and put to removedLIST
	            todoListObject.notCompleteLIST = todoListObject.LIST.filter(function (item) {
	                return item.todoItemObject.complete == false && item.todoItemObject.trash == false;
	            });
	
	            setCounter(todoListObject.LIST); // counter for remaining events
	            break;
	        default:
	            break;
	    }
	});
	
	function setCounter(array) {
	    var latestTodoItems = array.filter(function (item) {
	        return item.todoItemObject.complete == false && item.todoItemObject.trash == false;
	    });
	    counterLeftTodoItems.innerText = latestTodoItems.length;
	}
	
	function checkOnItem() {
	    var items = document.querySelectorAll('.todo-item');
	    items.length > 0 ? todoWrapper.classList.add('show') : todoWrapper.classList.remove('show');
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TodoItem = exports.TodoItem = function TodoItem(id, text) {
	    var _this = this;
	
	    _classCallCheck(this, TodoItem);
	
	    this.renderTodoItem = function () {
	        var li = document.createElement('li');
	        li.setAttribute('id', _this.id);
	        li.classList.add('todo-item');
	        var todoContent = '\n            <label>\n                <input type="checkbox">\n                <span class="todo-item-check" data-key=\'' + _this.id + '\' data-type=\'complate\'></span>\n            </label>\n            <span class="todo-item-text">' + _this.text + '</span>\n            <span class="todo-item-remove" data-key=\'' + _this.id + '\' data-type=\'remove\'></span>\n        ';
	        li.insertAdjacentHTML('afterbegin', todoContent);
	
	        return li;
	    };
	
	    this.id = id;
	    this.text = text;
	    this.complete = false;
	    this.trash = false;
	};

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
	
	        this.LIST = [];
	        this.removedLIST = [];
	        this.completeLIST = [];
	        this.notCompleteLIST = [];
	    }
	
	    _createClass(TodoList, [{
	        key: 'getTodoObjectById',
	        value: function getTodoObjectById(id, array) {
	            for (var i = 0; i <= array.length - 1; i++) {
	                if (array[i].todoItemObject.id == id) {
	                    return array[i];
	                }
	            }
	        }
	    }, {
	        key: 'removeFromArray',
	        value: function removeFromArray(id, array) {
	            for (var i = 0; i < array.length; i++) {
	                if (array[i].todoItemObject.id == id) {
	                    array.splice(array[i], 1);
	                }
	            }
	            return array;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWY5YmMzOWM0NDc3ZjUyMWY1OTYiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9tYWluLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9FdmVudHMuanMiXSwibmFtZXMiOlsiaW5wdXRIb2xkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRUb2RvSXRlbSIsImNvbXBsZXRlVG9kb0l0ZW0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY291bnRlckxlZnRUb2RvSXRlbXMiLCJyZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcyIsInRvZG9MaXN0IiwiaW5wdXQiLCJ0b2RvV3JhcHBlciIsImZpbHRlckxpc3QiLCJ0b2RvTGlzdE9iamVjdCIsIlRvZG9MaXN0IiwidG9kb0V2ZW50T2JqZWN0IiwiVG9kb0V2ZW50cyIsImNvdW50ZXJUb2RvRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJjcmVhdGUiLCJ2YWx1ZSIsImFsZXJ0IiwidG9kb0l0ZW1PYmplY3QiLCJUb2RvSXRlbSIsImFwcGVuZENoaWxkIiwicmVuZGVyVG9kb0l0ZW0iLCJMSVNUIiwicHVzaCIsInNldENvdW50ZXIiLCJjaGVja09uSXRlbSIsIml0ZW0iLCJ0YXJnZXQiLCJjbG9zZXN0IiwiZGF0YVR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJrZXlUb2RvSXRlbSIsImV2ZW50T2JqZWN0IiwiZ2V0VG9kb09iamVjdEJ5SWQiLCJ0cmFzaCIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0ZSIsInJlbW92ZWRMSVNUIiwiZmlsdGVyIiwidG9kb0V2ZW50SW5Db21wbGV0ZUxpc3QiLCJjb21wbGV0ZUxJU1QiLCJyZW1vdmVGcm9tQXJyYXkiLCJub3RDb21wbGV0ZUxJU1QiLCJyZW1vdmVDaGlsZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImFycmF5IiwibGF0ZXN0VG9kb0l0ZW1zIiwiaW5uZXJUZXh0IiwibGVuZ3RoIiwiaXRlbXMiLCJpZCIsInRleHQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJ0b2RvQ29udGVudCIsImluc2VydEFkamFjZW50SFRNTCIsImkiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7O0FBQ0E7O0FBQ0E7O0FBRUEsS0FBTUEsY0FBY0MsU0FBU0MsYUFBVCxDQUF1QixlQUF2QixDQUFwQjtBQUNBLEtBQU1DLGNBQWNGLFNBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXBCOztBQUVBLEtBQU1FLG1CQUFtQkgsU0FBU0ksZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQXpCO0FBQ0EsS0FBTUMsdUJBQXVCTCxTQUFTQyxhQUFULENBQXVCLHNCQUF2QixDQUE3QjtBQUNBLEtBQU1LLDZCQUE2Qk4sU0FBU0MsYUFBVCxDQUF1QixZQUF2QixDQUFuQztBQUNBLEtBQU1NLFdBQVdQLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBakI7QUFDQSxLQUFNTyxRQUFRUixTQUFTQyxhQUFULENBQXVCLGtDQUF2QixDQUFkO0FBQ0EsS0FBTVEsY0FBY1QsU0FBU0MsYUFBVCxDQUF1QixvQkFBdkIsQ0FBcEI7QUFDQSxLQUFNUyxhQUFhVixTQUFTQyxhQUFULENBQXVCLGlCQUF2QixDQUFuQjs7QUFHQSxLQUFNVSxpQkFBaUIsSUFBSUMsa0JBQUosRUFBdkIsQyxDQUF1QztBQUN2QyxL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QkEsS0FBS1osTUFBTUcsTUFBTixHQUFlLENBQXBDLEVBQXVDUyxHQUF2QyxFQUE0QztBQUN4QyxxQkFBSVosTUFBTVksQ0FBTixFQUFTMUMsY0FBVCxDQUF3Qm1DLEVBQXhCLElBQThCQSxFQUFsQyxFQUFzQztBQUNsQyw0QkFBT0wsTUFBTVksQ0FBTixDQUFQO0FBQ0g7QUFDSjtBQUNKOzs7eUNBRWVQLEUsRUFBR0wsSyxFQUFNO0FBQ3JCLGtCQUFJLElBQUlZLElBQUksQ0FBWixFQUFlQSxJQUFJWixNQUFNRyxNQUF6QixFQUFpQ1MsR0FBakMsRUFBcUM7QUFDakMscUJBQUdaLE1BQU1ZLENBQU4sRUFBUzFDLGNBQVQsQ0FBd0JtQyxFQUF4QixJQUE4QkEsRUFBakMsRUFBb0M7QUFDaENMLDJCQUFNYSxNQUFOLENBQWFiLE1BQU1ZLENBQU4sQ0FBYixFQUFzQixDQUF0QjtBQUNIO0FBQ0o7QUFDRCxvQkFBT1osS0FBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCTDs7QUFDQTs7OztLQUVhdEMsVSxXQUFBQSxVLEdBQ1Qsc0JBQWE7QUFBQTtBQUVaLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDVmOWJjMzljNDQ3N2Y1MjFmNTk2IiwiaW1wb3J0IHsgVG9kb0l0ZW0gfSBmcm9tICcuL2NvbXBvbmVudHMvVG9kb0l0ZW0nO1xyXG5pbXBvcnQge1RvZG9MaXN0fSBmcm9tICcuL2NvbXBvbmVudHMvVG9kb0xpc3QnO1xyXG5pbXBvcnQge1RvZG9FdmVudHN9IGZyb20gJy4vY29tcG9uZW50cy9Ub2RvRXZlbnRzJztcclxuXHJcbmNvbnN0IGlucHV0SG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWhvbGRlcicpO1xyXG5jb25zdCBhZGRUb2RvSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgLmJ0bicpO1xyXG5cclxuY29uc3QgY29tcGxldGVUb2RvSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWl0ZW0tY2hlY2snKTtcclxuY29uc3QgY291bnRlckxlZnRUb2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdC1pdGVtcyAuY291bnRlcicpO1xyXG5jb25zdCByZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhci1hbGwnKTtcclxuY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XHJcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWhvbGRlciBpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG5jb25zdCB0b2RvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRvZG8td3JhcHBlcicpO1xyXG5jb25zdCBmaWx0ZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYi1saXN0LWxpbmtzJyk7XHJcblxyXG5cclxuY29uc3QgdG9kb0xpc3RPYmplY3QgPSBuZXcgVG9kb0xpc3QoKTsgLy8gb2JqZWN0IGZvciBhbGwgYXJyYXkgdG9kbyBpdGVtc1xyXG5jb25zdCB0b2RvRXZlbnRPYmplY3QgPSBuZXcgVG9kb0V2ZW50cygpOyAvLyBvYmplY3QgZm9yIGV2ZW50IHRvZG8gaXRlbXNcclxuXHJcbmxldCBjb3VudGVyVG9kb0V2ZW50ID0gMDtcclxuXHJcblxyXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiBlLmtleUNvZGUgPT0gMTMgPyBjcmVhdGUoKSA6IC0xKTtcclxuYWRkVG9kb0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjcmVhdGUoKSk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoKXtcclxuICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBhbGVydCgnaW5wdXQgaXMgZW1wdHknKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW1PYmplY3QgPSBuZXcgVG9kb0l0ZW0oY291bnRlclRvZG9FdmVudCwgaW5wdXQudmFsdWUsIGZhbHNlKTsgLy8gY3JlYXRlIGV2ZW50IG9iamVjdFxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0l0ZW1PYmplY3QucmVuZGVyVG9kb0l0ZW0oKSk7IC8vIGFkZCBldmVudCBpbiBET00gZXZlbnRzIGxpc3RcclxuICAgICAgICB0b2RvTGlzdE9iamVjdC5MSVNULnB1c2goeyBjb3VudGVyVG9kb0V2ZW50LCB0b2RvSXRlbU9iamVjdCB9KTtcclxuICAgICAgICBzZXRDb3VudGVyKHRvZG9MaXN0T2JqZWN0LkxJU1QpIC8vIGNvdW50ZXIgZm9yIHJlbWFpbmluZyBldmVudHNcclxuICAgICAgICBjaGVja09uSXRlbSgpOyAvLyB2aXN1YWwgY2hlY2sgZXZlbnRcclxuICAgICAgICBjb3VudGVyVG9kb0V2ZW50Kys7XHJcbiAgICB9XHJcbn1cclxuXHJcbnRvZG9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGNvbnN0IGl0ZW0gPSBlLnRhcmdldC5jbG9zZXN0KCcudG9kby1pdGVtJyk7XHJcbiAgICBjb25zdCBkYXRhVHlwZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XHJcbiAgICBjb25zdCBrZXlUb2RvSXRlbSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcclxuXHJcbiAgICBjb25zdCBldmVudE9iamVjdCA9IHRvZG9MaXN0T2JqZWN0LmdldFRvZG9PYmplY3RCeUlkKGtleVRvZG9JdGVtLCB0b2RvTGlzdE9iamVjdC5MSVNUKTtcclxuXHJcbiAgICBzd2l0Y2goZGF0YVR5cGUpe1xyXG4gICAgICAgIGNhc2UgJ3JlbW92ZSc6XHJcbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnRvZG9JdGVtT2JqZWN0LnRyYXNoID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0T2JqZWN0KTtcclxuICAgICAgICAgICAgaWYoIWV2ZW50T2JqZWN0LnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlKXtcclxuICAgICAgICAgICAgICAgIHRvZG9MaXN0T2JqZWN0LnJlbW92ZWRMSVNUID0gdG9kb0xpc3RPYmplY3QuTElTVC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udG9kb0l0ZW1PYmplY3QudHJhc2ggPT0gdHJ1ZSk7IFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9FdmVudEluQ29tcGxldGVMaXN0ID0gdG9kb0xpc3RPYmplY3QuZ2V0VG9kb09iamVjdEJ5SWQoa2V5VG9kb0l0ZW0sdG9kb0xpc3RPYmplY3QuY29tcGxldGVMSVNUKTtcclxuICAgICAgICAgICAgICAgIHRvZG9MaXN0T2JqZWN0LmNvbXBsZXRlTElTVCA9IHRvZG9MaXN0T2JqZWN0LnJlbW92ZUZyb21BcnJheShrZXlUb2RvSXRlbSx0b2RvTGlzdE9iamVjdC5jb21wbGV0ZUxJU1QpO1xyXG4gICAgICAgICAgICAgICAgdG9kb0xpc3RPYmplY3QucmVtb3ZlZExJU1QucHVzaCh0b2RvRXZlbnRJbkNvbXBsZXRlTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRvZG9MaXN0T2JqZWN0Lm5vdENvbXBsZXRlTElTVCA9IHRvZG9MaXN0T2JqZWN0LkxJU1QuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRvZG9JdGVtT2JqZWN0LnRyYXNoID09IGZhbHNlKTtcclxuICAgICAgICAgICAgdG9kb0xpc3QucmVtb3ZlQ2hpbGQoaXRlbSk7IFxyXG4gICAgICAgICAgICBzZXRDb3VudGVyKHRvZG9MaXN0T2JqZWN0LkxJU1QpOyAvLyBjb3VudGVyIGZvciByZW1haW5pbmcgZXZlbnRzXHJcbiAgICAgICAgICAgIGNoZWNrT25JdGVtKCk7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjb21wbGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBpZihldmVudE9iamVjdC50b2RvSXRlbU9iamVjdC5jb21wbGV0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50T2JqZWN0LnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsYXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRPYmplY3QudG9kb0l0ZW1PYmplY3QuY29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgaXRlbSB3aXRoIHByb3BzIGNvbXBsZXRlID0gdHJ1ZSBhbmQgcHV0IHRvIHJlbW92ZWRMSVNUXHJcbiAgICAgICAgICAgICAgICB0b2RvTGlzdE9iamVjdC5jb21wbGV0ZUxJU1QgPSB0b2RvTGlzdE9iamVjdC5MSVNULmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlID09IHRydWUgJiYgaXRlbS50b2RvSXRlbU9iamVjdC50cmFzaCA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgaXRlbSB3aXRoIHByb3BzIGNvbXBsZXRlID0gZmFsc2UgYW5kIHB1dCB0byByZW1vdmVkTElTVFxyXG4gICAgICAgICAgICAgICAgdG9kb0xpc3RPYmplY3Qubm90Q29tcGxldGVMSVNUID0gdG9kb0xpc3RPYmplY3QuTElTVC5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50b2RvSXRlbU9iamVjdC5jb21wbGV0ZSA9PSBmYWxzZSAmJiBpdGVtLnRvZG9JdGVtT2JqZWN0LnRyYXNoID09IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgc2V0Q291bnRlcih0b2RvTGlzdE9iamVjdC5MSVNUKTsgLy8gY291bnRlciBmb3IgcmVtYWluaW5nIGV2ZW50c1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIHNldENvdW50ZXIoYXJyYXkpIHtcclxuICAgIGNvbnN0IGxhdGVzdFRvZG9JdGVtcyA9IGFycmF5LmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlID09IGZhbHNlICYmIGl0ZW0udG9kb0l0ZW1PYmplY3QudHJhc2ggPT0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGNvdW50ZXJMZWZ0VG9kb0l0ZW1zLmlubmVyVGV4dCA9IGxhdGVzdFRvZG9JdGVtcy5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrT25JdGVtKCkge1xyXG4gICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xyXG4gICAgKGl0ZW1zLmxlbmd0aCA+IDApID8gdG9kb1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpIDogdG9kb1dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2L2pzL2VzNi9tYWluLmpzIiwiZXhwb3J0IGNsYXNzIFRvZG9JdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCB0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJhc2ggPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVuZGVyVG9kb0l0ZW0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmlkKTtcclxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nKTtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGVudCA9IGBcclxuICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWl0ZW0tY2hlY2tcIiBkYXRhLWtleT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdjb21wbGF0ZSc+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS10ZXh0XCI+JHt0aGlzLnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS1yZW1vdmVcIiBkYXRhLWtleT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdyZW1vdmUnPjwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHRvZG9Db250ZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9JdGVtLmpzIiwiaW1wb3J0IHtUb2RvSXRlbX0gZnJvbSAnLi9Ub2RvSXRlbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9kb0xpc3R7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuTElTVCA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlZExJU1QgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlTElTVCA9IFtdO1xyXG4gICAgICAgIHRoaXMubm90Q29tcGxldGVMSVNUID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9kb09iamVjdEJ5SWQoaWQsIGFycmF5KXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnJheS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5W2ldLnRvZG9JdGVtT2JqZWN0LmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRnJvbUFycmF5KGlkLGFycmF5KXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihhcnJheVtpXS50b2RvSXRlbU9iamVjdC5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoYXJyYXlbaV0sMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0xpc3QuanMiLCJpbXBvcnQge1RvZG9MaXN0fSBmcm9tICcuL1RvZG9MaXN0JztcclxuaW1wb3J0IHtUb2RvSXRlbX0gZnJvbSAnLi9Ub2RvSXRlbSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9kb0V2ZW50cyB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXYvanMvZXM2L2NvbXBvbmVudHMvVG9kb0V2ZW50cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=