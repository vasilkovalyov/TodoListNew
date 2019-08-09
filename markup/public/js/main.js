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
	var leftLIST = []; // array for event who else not complete
	var removedLIST = []; // array for removed event items
	var completeLIST = []; // array for completed event items
	var i = 0;
	
	input.addEventListener('keyup', function () {
	    event.keyCode == 13 ? create() : 0;
	});
	addTodoItem.addEventListener('click', create);
	
	todoWrapper.addEventListener('click', function (e) {
	    var item = e.target.closest('.todo-item');
	    var dataType = e.target.getAttribute('data-type');
	    var dataIdRemove = e.target.getAttribute('remove-item');
	    var dataIdCheck = e.target.getAttribute('complete-item');
	
	    switch (dataType) {
	        case 'remove':
	            trashEventFromArray(dataIdRemove); // change flag on props trash
	            removedLIST = LIST.filter(function (item) {
	                return item.todoItemObject.trash == true;
	            });
	            LIST = LIST.filter(function (item) {
	                return item.todoItemObject.trash == false;
	            });
	            todoList.removeChild(item); // remove eventItem from DOM
	            setCounter(LIST); // counter for trash
	            break;
	        case 'complate':
	            item.classList.toggle('complate');
	            checkEventFromArray(dataIdCheck, item.classList.contains('complate') ? true : false);
	            completeLIST = LIST.filter(function (item) {
	                return item.todoItemObject.complete == true;
	            });
	            setCounter(LIST); // counter for events
	            break;
	        default:
	            break;
	    }
	});
	
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
	        setCounter(LIST); // counter for events
	        checkOnItem(); // visual check event
	        i++;
	    }
	}
	
	function setCounter(array) {
	    counterLeftTodoItems.innerText = array.length;
	}
	
	function checkOnItem() {
	    var items = document.querySelectorAll('.todo-item');
	    items ? todoWrapper.classList.add('show') : todoWrapper.classList.remove('show');
	}
	
	function checkEventFromArray(id, flag) {
	    for (var _i = 0; _i <= LIST.length - 1; _i++) {
	        if (LIST[_i].todoItemObject.id == id) {
	            flag ? LIST[_i].todoItemObject.complete = flag : LIST[_i].todoItemObject.complete = flag;
	        }
	    }
	}
	
	function trashEventFromArray(id) {
	    for (var _i2 = 0; _i2 <= LIST.length - 1; _i2++) {
	        if (LIST[_i2].todoItemObject.id == id) {
	            LIST[_i2].todoItemObject.trash = true;
	        }
	    }
	}
	
	function removeEventFromArray(id) {
	    for (var _i3 = 0; _i3 <= LIST.length - 1; _i3++) {
	        if (LIST[_i3].todoItemObject.id = id) {
	            LIST.splice(LIST[_i3], 1);
	        }
	    }
	}
	
	// function removeEventFromArray(id,toArray) {
	//     for (let i = 0; i <= LIST.length - 1; i++) {
	//         if (LIST[i].todoItemObject.id = id) {
	
	//             toArray.push(LIST[i]);
	//             break;
	//         }
	//     }
	// }

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
	        var todoContent = '\n            <label>\n                <input type="checkbox">\n                <span class="todo-item-check" complete-item=\'' + _this.id + '\' data-type=\'complate\'></span>\n            </label>\n            <span class="todo-item-text">' + _this.text + '</span>\n            <span class="todo-item-remove" remove-item=\'' + _this.id + '\' data-type=\'remove\'></span>\n        ';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmQ3MGU2MDliYTY2NTAyMmM5YzMiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9tYWluLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyJdLCJuYW1lcyI6WyJhZGRUb2RvSXRlbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbXBsZXRlVG9kb0l0ZW0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY291bnRlckxlZnRUb2RvSXRlbXMiLCJyZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcyIsInRvZG9MaXN0IiwiaW5wdXQiLCJ0b2RvV3JhcHBlciIsImZpbHRlckxpc3QiLCJMSVNUIiwibGVmdExJU1QiLCJyZW1vdmVkTElTVCIsImNvbXBsZXRlTElTVCIsImkiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJrZXlDb2RlIiwiY3JlYXRlIiwiZSIsIml0ZW0iLCJ0YXJnZXQiLCJjbG9zZXN0IiwiZGF0YVR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJkYXRhSWRSZW1vdmUiLCJkYXRhSWRDaGVjayIsInRyYXNoRXZlbnRGcm9tQXJyYXkiLCJmaWx0ZXIiLCJ0b2RvSXRlbU9iamVjdCIsInRyYXNoIiwicmVtb3ZlQ2hpbGQiLCJzZXRDb3VudGVyIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiY2hlY2tFdmVudEZyb21BcnJheSIsImNvbnRhaW5zIiwiY29tcGxldGUiLCJ2YWx1ZSIsImFsZXJ0IiwiVG9kb0l0ZW0iLCJhcHBlbmRDaGlsZCIsInJlbmRlclRvZG9JdGVtIiwicHVzaCIsImNoZWNrT25JdGVtIiwiYXJyYXkiLCJpbm5lclRleHQiLCJsZW5ndGgiLCJpdGVtcyIsImFkZCIsInJlbW92ZSIsImlkIiwiZmxhZyIsInJlbW92ZUV2ZW50RnJvbUFycmF5Iiwic3BsaWNlIiwidGV4dCIsImxpIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInRvZG9D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OztBQUFBLFVBUXRCYixjQVJzQixHQVFMLFlBQU07QUFDbkIsYUFBTWMsS0FBS3hELFNBQVN5RCxhQUFULENBQXVCLElBQXZCLENBQVg7QUFDQUQsWUFBR0UsWUFBSCxDQUFnQixJQUFoQixFQUFzQixNQUFLUCxFQUEzQjtBQUNBSyxZQUFHdkIsU0FBSCxDQUFhZ0IsR0FBYixDQUFpQixXQUFqQjtBQUNBLGFBQU1VLGlKQUdpRCxNQUFLUixFQUh0RCwwR0FLNkIsTUFBS0ksSUFMbEMsMEVBTTRDLE1BQUtKLEVBTmpELDhDQUFOO0FBUUFLLFlBQUdJLGtCQUFILENBQXNCLFlBQXRCLEVBQW9DRCxXQUFwQzs7QUFFQSxnQkFBT0gsRUFBUDtBQUNILE1BdkJxQjs7QUFDbEIsVUFBS0wsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsVUFBS0ksSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS2xCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxVQUFLUCxLQUFMLEdBQWEsS0FBYjtBQUNILEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJkNzBlNjA5YmE2NjUwMjJjOWMzIiwiaW1wb3J0IHsgVG9kb0l0ZW0gfSBmcm9tICcuL2NvbXBvbmVudHMvVG9kb0l0ZW0nO1xyXG5cclxuY29uc3QgYWRkVG9kb0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtaG9sZGVyIC5idG4nKTtcclxuXHJcbmNvbnN0IGNvbXBsZXRlVG9kb0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtLWNoZWNrJyk7XHJcbmNvbnN0IGNvdW50ZXJMZWZ0VG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtaXRlbXMgLmNvdW50ZXInKTtcclxuY29uc3QgcmVtb3ZlQWxsQ29tcGxldGVUb2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXItYWxsJyk7XHJcbmNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xyXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuY29uc3QgdG9kb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10b2RvLXdyYXBwZXInKTtcclxuY29uc3QgZmlsdGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWItbGlzdC1saW5rcycpO1xyXG5cclxubGV0IExJU1QgPSBbXTsgLy8gYXJyYXkgZm9yIGV2ZW50IGl0ZW1zXHJcbmxldCBsZWZ0TElTVCA9IFtdOyAvLyBhcnJheSBmb3IgZXZlbnQgd2hvIGVsc2Ugbm90IGNvbXBsZXRlXHJcbmxldCByZW1vdmVkTElTVCA9IFtdOyAvLyBhcnJheSBmb3IgcmVtb3ZlZCBldmVudCBpdGVtc1xyXG5sZXQgY29tcGxldGVMSVNUID0gW107IC8vIGFycmF5IGZvciBjb21wbGV0ZWQgZXZlbnQgaXRlbXNcclxubGV0IGkgPSAwO1xyXG5cclxuXHJcbmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4geyBldmVudC5rZXlDb2RlID09IDEzID8gY3JlYXRlKCkgOiAwIH0pXHJcbmFkZFRvZG9JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlKTtcclxuXHJcblxyXG50b2RvV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0gZS50YXJnZXQuY2xvc2VzdCgnLnRvZG8taXRlbScpO1xyXG4gICAgY29uc3QgZGF0YVR5cGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpO1xyXG4gICAgY29uc3QgZGF0YUlkUmVtb3ZlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdyZW1vdmUtaXRlbScpO1xyXG4gICAgY29uc3QgZGF0YUlkQ2hlY2sgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NvbXBsZXRlLWl0ZW0nKTtcclxuXHJcbiAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgY2FzZSAncmVtb3ZlJzpcclxuICAgICAgICAgICAgdHJhc2hFdmVudEZyb21BcnJheShkYXRhSWRSZW1vdmUpOyAvLyBjaGFuZ2UgZmxhZyBvbiBwcm9wcyB0cmFzaFxyXG4gICAgICAgICAgICByZW1vdmVkTElTVCA9IExJU1QuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRvZG9JdGVtT2JqZWN0LnRyYXNoID09IHRydWUpO1xyXG4gICAgICAgICAgICBMSVNUID0gTElTVC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udG9kb0l0ZW1PYmplY3QudHJhc2ggPT0gZmFsc2UpO1xyXG4gICAgICAgICAgICB0b2RvTGlzdC5yZW1vdmVDaGlsZChpdGVtKTsgLy8gcmVtb3ZlIGV2ZW50SXRlbSBmcm9tIERPTVxyXG4gICAgICAgICAgICBzZXRDb3VudGVyKExJU1QpOyAvLyBjb3VudGVyIGZvciB0cmFzaFxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjb21wbGF0ZSc6XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnY29tcGxhdGUnKTtcclxuICAgICAgICAgICAgY2hlY2tFdmVudEZyb21BcnJheShkYXRhSWRDaGVjaywgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBsYXRlJykgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZUxJU1QgPSBMSVNULmZpbHRlcigoaXRlbSkgPT4gaXRlbS50b2RvSXRlbU9iamVjdC5jb21wbGV0ZSA9PSB0cnVlKTtcclxuICAgICAgICAgICAgc2V0Q291bnRlcihMSVNUKTsgLy8gY291bnRlciBmb3IgZXZlbnRzXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59KVxyXG5cclxuXHJcbmZpbHRlckxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGFUeXBlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpO1xyXG5cclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgaWYgKGlucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgIGFsZXJ0KCdpbnB1dCBpcyBlbXB0eScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbU9iamVjdCA9IG5ldyBUb2RvSXRlbShpLCBpbnB1dC52YWx1ZSwgZmFsc2UpOyAvLyBjcmVhdGUgZXZlbnQgb2JqZWN0XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbU9iamVjdC5yZW5kZXJUb2RvSXRlbSgpKTsgLy8gYWRkIGV2ZW50IGluIERPTSBldmVudHMgbGlzdFxyXG4gICAgICAgIExJU1QucHVzaCh7IGksIHRvZG9JdGVtT2JqZWN0IH0pO1xyXG4gICAgICAgIHNldENvdW50ZXIoTElTVCkgLy8gY291bnRlciBmb3IgZXZlbnRzXHJcbiAgICAgICAgY2hlY2tPbkl0ZW0oKTsgLy8gdmlzdWFsIGNoZWNrIGV2ZW50XHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDb3VudGVyKGFycmF5KSB7XHJcbiAgICBjb3VudGVyTGVmdFRvZG9JdGVtcy5pbm5lclRleHQgPSBhcnJheS5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrT25JdGVtKCkge1xyXG4gICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8taXRlbScpO1xyXG4gICAgKGl0ZW1zKSA/IHRvZG9XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKSA6IHRvZG9XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tFdmVudEZyb21BcnJheShpZCwgZmxhZykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gTElTVC5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICBpZiAoTElTVFtpXS50b2RvSXRlbU9iamVjdC5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICBmbGFnID8gTElTVFtpXS50b2RvSXRlbU9iamVjdC5jb21wbGV0ZSA9IGZsYWcgOiBMSVNUW2ldLnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlID0gZmxhZ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdHJhc2hFdmVudEZyb21BcnJheShpZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gTElTVC5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICBpZiAoTElTVFtpXS50b2RvSXRlbU9iamVjdC5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICBMSVNUW2ldLnRvZG9JdGVtT2JqZWN0LnRyYXNoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUV2ZW50RnJvbUFycmF5KGlkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBMSVNULmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChMSVNUW2ldLnRvZG9JdGVtT2JqZWN0LmlkID0gaWQpIHtcclxuICAgICAgICAgICAgTElTVC5zcGxpY2UoTElTVFtpXSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiByZW1vdmVFdmVudEZyb21BcnJheShpZCx0b0FycmF5KSB7XHJcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBMSVNULmxlbmd0aCAtIDE7IGkrKykge1xyXG4vLyAgICAgICAgIGlmIChMSVNUW2ldLnRvZG9JdGVtT2JqZWN0LmlkID0gaWQpIHtcclxuXHJcbi8vICAgICAgICAgICAgIHRvQXJyYXkucHVzaChMSVNUW2ldKTtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvbWFpbi5qcyIsImV4cG9ydCBjbGFzcyBUb2RvSXRlbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgdGV4dCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyYXNoID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlbmRlclRvZG9JdGVtID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pZCk7XHJcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtJyk7XHJcbiAgICAgICAgY29uc3QgdG9kb0NvbnRlbnQgPSBgXHJcbiAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1pdGVtLWNoZWNrXCIgY29tcGxldGUtaXRlbT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdjb21wbGF0ZSc+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS10ZXh0XCI+JHt0aGlzLnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8taXRlbS1yZW1vdmVcIiByZW1vdmUtaXRlbT0nJHt0aGlzLmlkfScgZGF0YS10eXBlPSdyZW1vdmUnPjwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHRvZG9Db250ZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2L2pzL2VzNi9jb21wb25lbnRzL1RvZG9JdGVtLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==