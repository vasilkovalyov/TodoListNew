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
	
	var addTodoItem = document.querySelector('.input-holder .btn');
	
	var completeTodoItem = document.querySelectorAll('.todo-item-check');
	var counterLeftTodoItems = document.querySelector('.left-items .counter');
	var removeAllCompleteTodoItems = document.querySelector('.clear-all');
	var todoList = document.querySelector('.todo-list');
	var input = document.querySelector('.input-holder input[type="text"]');
	var todoWrapper = document.querySelector('.main-todo-wrapper');
	var filterList = document.querySelector('.tab-list-links');
	
	var LIST = []; // array for event items
	var removedLIST = []; // array for removed event items
	var completeLIST = []; // array for completed event items
	var notCompleteLIST = []; // array for not completed event items
	var i = 0;
	
	input.addEventListener('keyup', function () {
	    event.keyCode == 13 ? create() : 0;
	});
	addTodoItem.addEventListener('click', create);
	
	todoWrapper.addEventListener('click', function (e) {
	    var item = e.target.closest('.todo-item');
	    var dataType = e.target.getAttribute('data-type');
	
	    var keyTodoItem = e.target.getAttribute('data-key');
	    var eventObject = getTodoObjectById(keyTodoItem, LIST);
	
	    switch (dataType) {
	        case 'remove':
	            eventObject.todoItemObject.trash = true;
	
	            if (!eventObject.todoItemObject.complete) {
	                removedLIST = LIST.filter(function (item) {
	                    return item.todoItemObject.trash == true;
	                });
	            } else {
	                var todoEventInCompleteList = getTodoObjectById(keyTodoItem, completeLIST);
	                completeLIST = removeFromArray(keyTodoItem, completeLIST);
	                removedLIST.push(todoEventInCompleteList);
	            }
	
	            notCompleteLIST = LIST.filter(function (item) {
	                return item.todoItemObject.trash == false;
	            });
	            todoList.removeChild(item);
	            setCounter(LIST); // counter for remaining events
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
	            completeLIST = LIST.filter(function (item) {
	                return item.todoItemObject.complete == true && item.todoItemObject.trash == false;
	            });
	            // get item with props complete = false and put to removedLIST
	            notCompleteLIST = LIST.filter(function (item) {
	                return item.todoItemObject.complete == false && item.todoItemObject.trash == false;
	            });
	
	            setCounter(LIST); // counter for remaining events
	
	            break;
	
	        default:
	
	            break;
	    }
	});
	
	function removeFromArray(id, array) {
	    for (var _i = 0; _i < array.length; _i++) {
	        if (array[_i].todoItemObject.id == id) {
	            array.splice(array[_i], 1);
	        }
	    }
	    return array;
	}
	
	function getTodoObjectById(id, array) {
	    for (var _i2 = 0; _i2 <= array.length - 1; _i2++) {
	        if (array[_i2].todoItemObject.id == id) {
	            return array[_i2];
	        }
	    }
	}
	
	filterList.addEventListener('click', function (e) {
	    var dataType = e.target.getAttribute('data-active');
	});
	
	function create() {
	    if (input.value === '') {
	        alert('input is empty');
	    } else {
	        var todoItemObject = new _TodoItem.TodoItem(i, input.value, false); // create event object
	        input.value = '';
	        todoList.appendChild(todoItemObject.renderTodoItem()); // add event in DOM events list
	        LIST.push({ i: i, todoItemObject: todoItemObject });
	        setCounter(LIST); // counter for remaining events
	        checkOnItem(); // visual check event
	        i++;
	    }
	}
	
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzBjZWIxNDAwYTk3NzRhZGNlNmIiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9tYWluLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyJdLCJuYW1lcyI6WyJhZGRUb2RvSXRlbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbXBsZXRlVG9kb0l0ZW0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY291bnRlckxlZnRUb2RvSXRlbXMiLCJyZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcyIsInRvZG9MaXN0IiwiaW5wdXQiLCJ0b2RvV3JhcHBlciIsImZpbHRlckxpc3QiLCJMSVNUIiwicmVtb3ZlZExJU1QiLCJjb21wbGV0ZUxJU1QiLCJub3RDb21wbGV0ZUxJU1QiLCJpIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwia2V5Q29kZSIsImNyZWF0ZSIsImUiLCJpdGVtIiwidGFyZ2V0IiwiY2xvc2VzdCIsImRhdGFUeXBlIiwiZ2V0QXR0cmlidXRlIiwia2V5VG9kb0l0ZW0iLCJldmVudE9iamVjdCIsImdldFRvZG9PYmplY3RCeUlkIiwidG9kb0l0ZW1PYmplY3QiLCJ0cmFzaCIsImNvbXBsZXRlIiwiZmlsdGVyIiwidG9kb0V2ZW50SW5Db21wbGV0ZUxpc3QiLCJyZW1vdmVGcm9tQXJyYXkiLCJwdXNoIiwicmVtb3ZlQ2hpbGQiLCJzZXRDb3VudGVyIiwiY2hlY2tPbkl0ZW0iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJpZCIsImFycmF5IiwibGVuZ3RoIiwic3BsaWNlIiwidmFsdWUiLCJhbGVydCIsIlRvZG9JdGVtIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJUb2RvSXRlbSIsImxhdGVzdFRvZG9JdGVtcyIsImlubmVyVGV4dCIsIml0ZW1zIiwidGV4dCIsImxpIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInRvZG9Db250ZW50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QUZ1QixDQUF4Qjs7QUFJQXpCLDBCQUFxQitDLFNBQXJCLEdBQWlDRCxnQkFBZ0JQLE1BQWpEO0FBQ0g7O0FBRUQsVUFBU04sV0FBVCxHQUF1QjtBQUNuQixTQUFJZSxRQUFRcEQsU0FBU0csZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBWjtBQUNDaUQsV0FBTVQsTUFBTixHQUFlLENBQWhCLEdBQXFCbkMsWUFBWThCLFNBQVosQ0FBc0JFLEdBQXRCLENBQTBCLE1BQTFCLENBQXJCLEdBQXlEaEMsWUFBWThCLFNBQVosQ0FBc0JDLE1BQXRCLENBQTZCLE1BQTdCLENBQXpEO0FBQ0gsRTs7Ozs7Ozs7Ozs7Ozs7S0MzSFlRLFEsV0FBQUEsUSxHQUNULGtCQUFZTixFQUFaLEVBQWdCWSxJQUFoQixFQUFzQjtBQUFBOztBQUFBOztBQUFBLFVBUXRCSixjQVJzQixHQVFMLFlBQU07QUFDbkIsYUFBTUssS0FBS3RELFNBQVN1RCxhQUFULENBQXVCLElBQXZCLENBQVg7QUFDQUQsWUFBR0UsWUFBSCxDQUFnQixJQUFoQixFQUFzQixNQUFLZixFQUEzQjtBQUNBYSxZQUFHaEIsU0FBSCxDQUFhRSxHQUFiLENBQWlCLFdBQWpCO0FBQ0EsYUFBTWlCLDRJQUc0QyxNQUFLaEIsRUFIakQsMEdBSzZCLE1BQUtZLElBTGxDLHVFQU15QyxNQUFLWixFQU45Qyw4Q0FBTjtBQVFBYSxZQUFHSSxrQkFBSCxDQUFzQixZQUF0QixFQUFvQ0QsV0FBcEM7O0FBRUEsZ0JBQU9ILEVBQVA7QUFDSCxNQXZCcUI7O0FBQ2xCLFVBQUtiLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFVBQUtZLElBQUwsR0FBWUEsSUFBWjtBQUNBLFVBQUt2QixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsVUFBS0QsS0FBTCxHQUFhLEtBQWI7QUFDSCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjMGNlYjE0MDBhOTc3NGFkY2U2YiIsImltcG9ydCB7IFRvZG9JdGVtIH0gZnJvbSAnLi9jb21wb25lbnRzL1RvZG9JdGVtJztcclxuXHJcbmNvbnN0IGFkZFRvZG9JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWhvbGRlciAuYnRuJyk7XHJcblxyXG5jb25zdCBjb21wbGV0ZVRvZG9JdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbS1jaGVjaycpO1xyXG5jb25zdCBjb3VudGVyTGVmdFRvZG9JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0LWl0ZW1zIC5jb3VudGVyJyk7XHJcbmNvbnN0IHJlbW92ZUFsbENvbXBsZXRlVG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyLWFsbCcpO1xyXG5jb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcclxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbmNvbnN0IHRvZG9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tdG9kby13cmFwcGVyJyk7XHJcbmNvbnN0IGZpbHRlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiLWxpc3QtbGlua3MnKTtcclxuXHJcbmxldCBMSVNUID0gW107IC8vIGFycmF5IGZvciBldmVudCBpdGVtc1xyXG5sZXQgcmVtb3ZlZExJU1QgPSBbXTsgLy8gYXJyYXkgZm9yIHJlbW92ZWQgZXZlbnQgaXRlbXNcclxubGV0IGNvbXBsZXRlTElTVCA9IFtdOyAvLyBhcnJheSBmb3IgY29tcGxldGVkIGV2ZW50IGl0ZW1zXHJcbmxldCBub3RDb21wbGV0ZUxJU1QgPSBbXTsgLy8gYXJyYXkgZm9yIG5vdCBjb21wbGV0ZWQgZXZlbnQgaXRlbXNcclxubGV0IGkgPSAwO1xyXG5cclxuXHJcbmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4geyBldmVudC5rZXlDb2RlID09IDEzID8gY3JlYXRlKCkgOiAwIH0pXHJcbmFkZFRvZG9JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlKTtcclxuXHJcblxyXG50b2RvV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0gZS50YXJnZXQuY2xvc2VzdCgnLnRvZG8taXRlbScpO1xyXG4gICAgY29uc3QgZGF0YVR5cGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpO1xyXG5cclxuICAgIGNvbnN0IGtleVRvZG9JdGVtID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpO1xyXG4gICAgY29uc3QgZXZlbnRPYmplY3QgPSBnZXRUb2RvT2JqZWN0QnlJZChrZXlUb2RvSXRlbSxMSVNUKTtcclxuXHJcbiAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgY2FzZSAncmVtb3ZlJzpcclxuICAgICAgICAgICAgZXZlbnRPYmplY3QudG9kb0l0ZW1PYmplY3QudHJhc2ggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYoIWV2ZW50T2JqZWN0LnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlKXtcclxuICAgICAgICAgICAgICAgIHJlbW92ZWRMSVNUID0gTElTVC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udG9kb0l0ZW1PYmplY3QudHJhc2ggPT0gdHJ1ZSk7IFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9FdmVudEluQ29tcGxldGVMaXN0ID0gZ2V0VG9kb09iamVjdEJ5SWQoa2V5VG9kb0l0ZW0sY29tcGxldGVMSVNUKTtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlTElTVCA9IHJlbW92ZUZyb21BcnJheShrZXlUb2RvSXRlbSxjb21wbGV0ZUxJU1QpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlZExJU1QucHVzaCh0b2RvRXZlbnRJbkNvbXBsZXRlTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vdENvbXBsZXRlTElTVCA9IExJU1QuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRvZG9JdGVtT2JqZWN0LnRyYXNoID09IGZhbHNlKTtcclxuICAgICAgICAgICAgdG9kb0xpc3QucmVtb3ZlQ2hpbGQoaXRlbSk7IFxyXG4gICAgICAgICAgICBzZXRDb3VudGVyKExJU1QpOyAvLyBjb3VudGVyIGZvciByZW1haW5pbmcgZXZlbnRzXHJcbiAgICAgICAgICAgIGNoZWNrT25JdGVtKCk7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnY29tcGxhdGUnOlxyXG4gICAgICAgICAgICBpZihldmVudE9iamVjdC50b2RvSXRlbU9iamVjdC5jb21wbGV0ZSl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsYXRlJyk7XHJcbiAgICAgICAgICAgICAgICBldmVudE9iamVjdC50b2RvSXRlbU9iamVjdC5jb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnY29tcGxhdGUnKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50T2JqZWN0LnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZ2V0IGl0ZW0gd2l0aCBwcm9wcyBjb21wbGV0ZSA9IHRydWUgYW5kIHB1dCB0byByZW1vdmVkTElTVFxyXG4gICAgICAgICAgICBjb21wbGV0ZUxJU1QgPSBMSVNULmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udG9kb0l0ZW1PYmplY3QuY29tcGxldGUgPT0gdHJ1ZSAmJiBpdGVtLnRvZG9JdGVtT2JqZWN0LnRyYXNoID09IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBnZXQgaXRlbSB3aXRoIHByb3BzIGNvbXBsZXRlID0gZmFsc2UgYW5kIHB1dCB0byByZW1vdmVkTElTVFxyXG4gICAgICAgICAgICBub3RDb21wbGV0ZUxJU1QgPSBMSVNULmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udG9kb0l0ZW1PYmplY3QuY29tcGxldGUgPT0gZmFsc2UgJiYgaXRlbS50b2RvSXRlbU9iamVjdC50cmFzaCA9PSBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNldENvdW50ZXIoTElTVCk7IC8vIGNvdW50ZXIgZm9yIHJlbWFpbmluZyBldmVudHNcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiByZW1vdmVGcm9tQXJyYXkoaWQsYXJyYXkpe1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBpZihhcnJheVtpXS50b2RvSXRlbU9iamVjdC5pZCA9PSBpZCl7XHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShhcnJheVtpXSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvZG9PYmplY3RCeUlkKGlkLCBhcnJheSl7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnJheS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyYXlbaV0udG9kb0l0ZW1PYmplY3QuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZmlsdGVyTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YVR5cGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJyk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgaWYgKGlucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgIGFsZXJ0KCdpbnB1dCBpcyBlbXB0eScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbU9iamVjdCA9IG5ldyBUb2RvSXRlbShpLCBpbnB1dC52YWx1ZSwgZmFsc2UpOyAvLyBjcmVhdGUgZXZlbnQgb2JqZWN0XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbU9iamVjdC5yZW5kZXJUb2RvSXRlbSgpKTsgLy8gYWRkIGV2ZW50IGluIERPTSBldmVudHMgbGlzdFxyXG4gICAgICAgIExJU1QucHVzaCh7IGksIHRvZG9JdGVtT2JqZWN0IH0pO1xyXG4gICAgICAgIHNldENvdW50ZXIoTElTVCkgLy8gY291bnRlciBmb3IgcmVtYWluaW5nIGV2ZW50c1xyXG4gICAgICAgIGNoZWNrT25JdGVtKCk7IC8vIHZpc3VhbCBjaGVjayBldmVudFxyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q291bnRlcihhcnJheSkge1xyXG4gICAgY29uc3QgbGF0ZXN0VG9kb0l0ZW1zID0gYXJyYXkuZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0udG9kb0l0ZW1PYmplY3QuY29tcGxldGUgPT0gZmFsc2UgJiYgaXRlbS50b2RvSXRlbU9iamVjdC50cmFzaCA9PSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvdW50ZXJMZWZ0VG9kb0l0ZW1zLmlubmVyVGV4dCA9IGxhdGVzdFRvZG9JdGVtcy5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrT25JdGVtKCkge1xyXG4gICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xyXG4gICAgKGl0ZW1zLmxlbmd0aCA+IDApID8gdG9kb1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpIDogdG9kb1dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2L2pzL2VzNi9tYWluLmpzIiwiZXhwb3J0IGNsYXNzIFRvZG9JdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCB0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJhc2ggPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVuZGVyVG9kb0l0ZW0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmlkKTtcclxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nKTtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGVudCA9IGBcclxuICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWl0ZW0tY2hlY2tcIiBkYXRhLWtleT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdjb21wbGF0ZSc+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS10ZXh0XCI+JHt0aGlzLnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS1yZW1vdmVcIiBkYXRhLWtleT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdyZW1vdmUnPjwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHRvZG9Db250ZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9JdGVtLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==