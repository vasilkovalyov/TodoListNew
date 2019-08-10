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
	                // get item with props trash = true and put to removedLIST
	                removedLIST = LIST.filter(function (item) {
	                    return item.todoItemObject.trash == true;
	                });
	            } else {
	                var eventObjectInCompleteList = getTodoObjectById(keyTodoItem, completeLIST);
	                completeLIST = removeFromArray(keyTodoItem, completeLIST);
	                removedLIST.push(eventObjectInCompleteList);
	            }
	
	            notCompleteLIST = LIST.filter(function (item) {
	                return item.todoItemObject.trash == false;
	            });
	
	            todoList.removeChild(item); // remove eventItem from DOM
	            setCounter(notCompleteLIST); // counter for complete events
	
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
	
	            setCounter(notCompleteLIST);
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODk5YmM2OTQ3YzQ1ZTQyMjEyNWUiLCJ3ZWJwYWNrOi8vLy4vZGV2L2pzL2VzNi9tYWluLmpzIiwid2VicGFjazovLy8uL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyJdLCJuYW1lcyI6WyJhZGRUb2RvSXRlbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbXBsZXRlVG9kb0l0ZW0iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY291bnRlckxlZnRUb2RvSXRlbXMiLCJyZW1vdmVBbGxDb21wbGV0ZVRvZG9JdGVtcyIsInRvZG9MaXN0IiwiaW5wdXQiLCJ0b2RvV3JhcHBlciIsImZpbHRlckxpc3QiLCJMSVNUIiwibGVmdExJU1QiLCJyZW1vdmVkTElTVCIsImNvbXBsZXRlTElTVCIsIm5vdENvbXBsZXRlTElTVCIsImkiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJrZXlDb2RlIiwiY3JlYXRlIiwiZSIsIml0ZW0iLCJ0YXJnZXQiLCJjbG9zZXN0IiwiZGF0YVR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJrZXlUb2RvSXRlbSIsImV2ZW50T2JqZWN0IiwiZ2V0VG9kb09iamVjdEJ5SWQiLCJ0b2RvSXRlbU9iamVjdCIsInRyYXNoIiwiY29tcGxldGUiLCJmaWx0ZXIiLCJldmVudE9iamVjdEluQ29tcGxldGVMaXN0IiwicmVtb3ZlRnJvbUFycmF5IiwicHVzaCIsInJlbW92ZUNoaWxkIiwic2V0Q291bnRlciIsImNoZWNrT25JdGVtIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaWQiLCJhcnJheSIsImxlbmd0aCIsInNwbGljZSIsInZhbHVlIiwiYWxlcnQiLCJUb2RvSXRlbSIsImFwcGVuZENoaWxkIiwicmVuZGVyVG9kb0l0ZW0iLCJpbm5lclRleHQiLCJpdGVtcyIsInRleHQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJ0b2RvQ29udGVudCIsImluc2VydEFkamFjZW50SFRNTCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFFQSxLQUFNQSxjQUFjQyxTQUFTQyxhQUFULENBQXVCLG9CQUF2QixDQUFwQjs7QUFFQSxLQUFNQyxtQkFBbUJGLFNBQVNHLGdCQUFULENBQTBCLGtCQUExQixDQUF6QjtBQUNBLEtBQU1DLHVCQUF1QkosU0FBU0MsYUFBVCxDQUF1QixzQkFBdkIsQ0FBN0I7QUFDQSxLQUFNSSw2QkFBNkJMLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbkM7QUFDQSxLQUFNSyxXQUFXTixTQUFTQyxhQUFULENBQXVCLFlBQXZCLENBQWpCO0FBQ0EsS0FBTU0sUUFBUVAsU0FBU0MsYUFBVCxDQUF1QixrQ0FBdkIsQ0FBZDtBQUNBLEtBQU1PLGNBQWNSLFNBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXBCO0FBQ0EsS0FBTVEsYUFBYVQsU0FBU0MsYUFBVCxDQUF1QixpQkFBdkIsQ0FBbkI7O0FBRUEsS0FBSVMsT0FBTyxFQUFYLEMsQ0FBZTtBQUNmLEtBQUlDLFdBQVcsRUFBZixDLENBQW1CO0FBQ25CLEtBQUlDLGNBQWMsRUFBbEIsQyxDQUFzQjtBQUN0QixLQUFJQyxlQUFlLEVBQW5CLEMsQ0FBdUI7QUFDdkIsS0FBSUMsa0JBQWtCLEVBQXRCLEMsQ0FBMEI7QUFDMUIsS0FBSUMsSUFBSSxDQUFSOztBQUdBUixPQUFNUyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxZQUFNO0FBQUVDLFdBQU1DLE9BQU4sSUFBaUIsRUFBakIsR0FBc0JDLFFBQXRCLEdBQWlDLENBQWpDO0FBQW9DLEVBQTVFO0FBQ0FwQixhQUFZaUIsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0NHLE1BQXRDOztBQUdBWCxhQUFZUSxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxVQUFDSSxDQUFELEVBQU87QUFDekMsU0FBTUMsT0FBT0QsRUFBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCLFlBQWpCLENBQWI7QUFDQSxTQUFNQyxXQUFXSixFQUFFRSxNQUFGLENBQVNHLFlBQVQsQ0FBc0IsV0FBdEIsQ0FBakI7O0FBRUEsU0FBTUMsY0FBY04sRUFBRUUsTUFBRixDQUFTRyxZQUFULENBQXNCLFVBQXRCLENBQXBCO0FBQ0EsU0FBTUUsY0FBY0Msa0JBQWtCRixXQUFsQixFQUE4QmhCLElBQTlCLENBQXBCOztBQUVBLGFBQVFjLFFBQVI7QUFDSSxjQUFLLFFBQUw7QUFDSUcseUJBQVlFLGNBQVosQ0FBMkJDLEtBQTNCLEdBQW1DLElBQW5DOztBQUVBLGlCQUFHLENBQUNILFlBQVlFLGNBQVosQ0FBMkJFLFFBQS9CLEVBQXdDO0FBQ3BDO0FBQ0FuQiwrQkFBY0YsS0FBS3NCLE1BQUwsQ0FBWSxVQUFDWCxJQUFEO0FBQUEsNEJBQVVBLEtBQUtRLGNBQUwsQ0FBb0JDLEtBQXBCLElBQTZCLElBQXZDO0FBQUEsa0JBQVosQ0FBZDtBQUNILGNBSEQsTUFHSztBQUNELHFCQUFNRyw0QkFBNEJMLGtCQUFrQkYsV0FBbEIsRUFBOEJiLFlBQTlCLENBQWxDO0FBQ0FBLGdDQUFlcUIsZ0JBQWdCUixXQUFoQixFQUE0QmIsWUFBNUIsQ0FBZjtBQUNBRCw2QkFBWXVCLElBQVosQ0FBaUJGLHlCQUFqQjtBQUNIOztBQUVEbkIsK0JBQWtCSixLQUFLc0IsTUFBTCxDQUFZLFVBQUNYLElBQUQ7QUFBQSx3QkFBVUEsS0FBS1EsY0FBTCxDQUFvQkMsS0FBcEIsSUFBNkIsS0FBdkM7QUFBQSxjQUFaLENBQWxCOztBQUVBeEIsc0JBQVM4QixXQUFULENBQXFCZixJQUFyQixFQWRKLENBY2dDO0FBQzVCZ0Isd0JBQVd2QixlQUFYLEVBZkosQ0FlaUM7O0FBRTdCd0I7O0FBRUE7O0FBRUosY0FBSyxVQUFMO0FBQ0ksaUJBQUdYLFlBQVlFLGNBQVosQ0FBMkJFLFFBQTlCLEVBQXVDO0FBQ25DVixzQkFBS2tCLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixVQUF0QjtBQUNBYiw2QkFBWUUsY0FBWixDQUEyQkUsUUFBM0IsR0FBc0MsS0FBdEM7QUFDSCxjQUhELE1BR0s7QUFDRFYsc0JBQUtrQixTQUFMLENBQWVFLEdBQWYsQ0FBbUIsVUFBbkI7QUFDQWQsNkJBQVlFLGNBQVosQ0FBMkJFLFFBQTNCLEdBQXNDLElBQXRDO0FBQ0g7O0FBRUQ7QUFDQWxCLDRCQUFlSCxLQUFLc0IsTUFBTCxDQUFZLFVBQUNYLElBQUQsRUFBVTtBQUNqQyx3QkFBT0EsS0FBS1EsY0FBTCxDQUFvQkUsUUFBcEIsSUFBZ0MsSUFBaEMsSUFBd0NWLEtBQUtRLGNBQUwsQ0FBb0JDLEtBQXBCLElBQTZCLEtBQTVFO0FBQ0gsY0FGYyxDQUFmO0FBR0E7QUFDQWhCLCtCQUFrQkosS0FBS3NCLE1BQUwsQ0FBWSxVQUFDWCxJQUFELEVBQVU7QUFDcEMsd0JBQU9BLEtBQUtRLGNBQUwsQ0FBb0JFLFFBQXBCLElBQWdDLEtBQWhDLElBQXlDVixLQUFLUSxjQUFMLENBQW9CQyxLQUFwQixJQUE2QixLQUE3RTtBQUNILGNBRmlCLENBQWxCOztBQUlBTyx3QkFBV3ZCLGVBQVg7O0FBRUE7O0FBRUo7O0FBRUk7QUE5Q1I7QUFnREgsRUF2REQ7O0FBeURBLFVBQVNvQixlQUFULENBQXlCUSxFQUF6QixFQUE0QkMsS0FBNUIsRUFBa0M7QUFDOUIsVUFBSSxJQUFJNUIsS0FBSSxDQUFaLEVBQWVBLEtBQUk0QixNQUFNQyxNQUF6QixFQUFpQzdCLElBQWpDLEVBQXFDO0FBQ2pDLGFBQUc0QixNQUFNNUIsRUFBTixFQUFTYyxjQUFULENBQXdCYSxFQUF4QixJQUE4QkEsRUFBakMsRUFBb0M7QUFDaENDLG1CQUFNRSxNQUFOLENBQWFGLE1BQU01QixFQUFOLENBQWIsRUFBc0IsQ0FBdEI7QUFDSDtBQUNKO0FBQ0QsWUFBTzRCLEtBQVA7QUFDSDs7QUFFRCxVQUFTZixpQkFBVCxDQUEyQmMsRUFBM0IsRUFBK0JDLEtBQS9CLEVBQXFDO0FBQ2pDLFVBQUssSUFBSTVCLE1BQUksQ0FBYixFQUFnQkEsT0FBSzRCLE1BQU1DLE1BQU4sR0FBZSxDQUFwQyxFQUF1QzdCLEtBQXZDLEVBQTRDO0FBQ3hDLGFBQUk0QixNQUFNNUIsR0FBTixFQUFTYyxjQUFULENBQXdCYSxFQUF4QixJQUE4QkEsRUFBbEMsRUFBc0M7QUFDbEMsb0JBQU9DLE1BQU01QixHQUFOLENBQVA7QUFDSDtBQUNKO0FBQ0o7O0FBRUROLFlBQVdPLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFVBQUNJLENBQUQsRUFBTztBQUN4QyxTQUFJSSxXQUFXSixFQUFFRSxNQUFGLENBQVNHLFlBQVQsQ0FBc0IsYUFBdEIsQ0FBZjtBQUNILEVBRkQ7O0FBSUEsVUFBU04sTUFBVCxHQUFrQjtBQUNkLFNBQUlaLE1BQU11QyxLQUFOLEtBQWdCLEVBQXBCLEVBQXdCO0FBQ3BCQyxlQUFNLGdCQUFOO0FBQ0gsTUFGRCxNQUVPO0FBQ0gsYUFBTWxCLGlCQUFpQixJQUFJbUIsa0JBQUosQ0FBYWpDLENBQWIsRUFBZ0JSLE1BQU11QyxLQUF0QixFQUE2QixLQUE3QixDQUF2QixDQURHLENBQ3lEO0FBQzVEdkMsZUFBTXVDLEtBQU4sR0FBYyxFQUFkO0FBQ0F4QyxrQkFBUzJDLFdBQVQsQ0FBcUJwQixlQUFlcUIsY0FBZixFQUFyQixFQUhHLENBR29EO0FBQ3ZEeEMsY0FBS3lCLElBQUwsQ0FBVSxFQUFFcEIsSUFBRixFQUFLYyw4QkFBTCxFQUFWO0FBQ0FRLG9CQUFXM0IsSUFBWCxFQUxHLENBS2M7QUFDakI0Qix1QkFORyxDQU1ZOztBQUVmdkI7QUFDSDtBQUNKOztBQUVELFVBQVNzQixVQUFULENBQW9CTSxLQUFwQixFQUEyQjtBQUN2QnZDLDBCQUFxQitDLFNBQXJCLEdBQWlDUixNQUFNQyxNQUF2QztBQUNIOztBQUVELFVBQVNOLFdBQVQsR0FBdUI7QUFDbkIsU0FBSWMsUUFBUXBELFNBQVNHLGdCQUFULENBQTBCLFlBQTFCLENBQVo7QUFDQ2lELFdBQU1SLE1BQU4sR0FBZSxDQUFoQixHQUFxQnBDLFlBQVkrQixTQUFaLENBQXNCRSxHQUF0QixDQUEwQixNQUExQixDQUFyQixHQUF5RGpDLFlBQVkrQixTQUFaLENBQXNCQyxNQUF0QixDQUE2QixNQUE3QixDQUF6RDtBQUNILEU7Ozs7Ozs7Ozs7Ozs7O0tDNUhZUSxRLFdBQUFBLFEsR0FDVCxrQkFBWU4sRUFBWixFQUFnQlcsSUFBaEIsRUFBc0I7QUFBQTs7QUFBQTs7QUFBQSxVQVF0QkgsY0FSc0IsR0FRTCxZQUFNO0FBQ25CLGFBQU1JLEtBQUt0RCxTQUFTdUQsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0FELFlBQUdFLFlBQUgsQ0FBZ0IsSUFBaEIsRUFBc0IsTUFBS2QsRUFBM0I7QUFDQVksWUFBR2YsU0FBSCxDQUFhRSxHQUFiLENBQWlCLFdBQWpCO0FBQ0EsYUFBTWdCLDRJQUc0QyxNQUFLZixFQUhqRCwwR0FLNkIsTUFBS1csSUFMbEMsdUVBTXlDLE1BQUtYLEVBTjlDLDhDQUFOO0FBUUFZLFlBQUdJLGtCQUFILENBQXNCLFlBQXRCLEVBQW9DRCxXQUFwQzs7QUFFQSxnQkFBT0gsRUFBUDtBQUNILE1BdkJxQjs7QUFDbEIsVUFBS1osRUFBTCxHQUFVQSxFQUFWO0FBQ0EsVUFBS1csSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS3RCLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxVQUFLRCxLQUFMLEdBQWEsS0FBYjtBQUNILEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg5OWJjNjk0N2M0NWU0MjIxMjVlIiwiaW1wb3J0IHsgVG9kb0l0ZW0gfSBmcm9tICcuL2NvbXBvbmVudHMvVG9kb0l0ZW0nO1xyXG5cclxuY29uc3QgYWRkVG9kb0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtaG9sZGVyIC5idG4nKTtcclxuXHJcbmNvbnN0IGNvbXBsZXRlVG9kb0l0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1pdGVtLWNoZWNrJyk7XHJcbmNvbnN0IGNvdW50ZXJMZWZ0VG9kb0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtaXRlbXMgLmNvdW50ZXInKTtcclxuY29uc3QgcmVtb3ZlQWxsQ29tcGxldGVUb2RvSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXItYWxsJyk7XHJcbmNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xyXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuY29uc3QgdG9kb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi10b2RvLXdyYXBwZXInKTtcclxuY29uc3QgZmlsdGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWItbGlzdC1saW5rcycpO1xyXG5cclxubGV0IExJU1QgPSBbXTsgLy8gYXJyYXkgZm9yIGV2ZW50IGl0ZW1zXHJcbmxldCBsZWZ0TElTVCA9IFtdOyAvLyBhcnJheSBmb3IgZXZlbnQgd2hvIGVsc2Ugbm90IGNvbXBsZXRlXHJcbmxldCByZW1vdmVkTElTVCA9IFtdOyAvLyBhcnJheSBmb3IgcmVtb3ZlZCBldmVudCBpdGVtc1xyXG5sZXQgY29tcGxldGVMSVNUID0gW107IC8vIGFycmF5IGZvciBjb21wbGV0ZWQgZXZlbnQgaXRlbXNcclxubGV0IG5vdENvbXBsZXRlTElTVCA9IFtdOyAvLyBhcnJheSBmb3Igbm90IGNvbXBsZXRlZCBldmVudCBpdGVtc1xyXG5sZXQgaSA9IDA7XHJcblxyXG5cclxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7IGV2ZW50LmtleUNvZGUgPT0gMTMgPyBjcmVhdGUoKSA6IDAgfSlcclxuYWRkVG9kb0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGUpO1xyXG5cclxuXHJcbnRvZG9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGNvbnN0IGl0ZW0gPSBlLnRhcmdldC5jbG9zZXN0KCcudG9kby1pdGVtJyk7XHJcbiAgICBjb25zdCBkYXRhVHlwZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XHJcblxyXG4gICAgY29uc3Qga2V5VG9kb0l0ZW0gPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XHJcbiAgICBjb25zdCBldmVudE9iamVjdCA9IGdldFRvZG9PYmplY3RCeUlkKGtleVRvZG9JdGVtLExJU1QpO1xyXG5cclxuICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcclxuICAgICAgICBjYXNlICdyZW1vdmUnOlxyXG4gICAgICAgICAgICBldmVudE9iamVjdC50b2RvSXRlbU9iamVjdC50cmFzaCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZighZXZlbnRPYmplY3QudG9kb0l0ZW1PYmplY3QuY29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGl0ZW0gd2l0aCBwcm9wcyB0cmFzaCA9IHRydWUgYW5kIHB1dCB0byByZW1vdmVkTElTVFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlZExJU1QgPSBMSVNULmZpbHRlcigoaXRlbSkgPT4gaXRlbS50b2RvSXRlbU9iamVjdC50cmFzaCA9PSB0cnVlKTsgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRPYmplY3RJbkNvbXBsZXRlTGlzdCA9IGdldFRvZG9PYmplY3RCeUlkKGtleVRvZG9JdGVtLGNvbXBsZXRlTElTVCk7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUxJU1QgPSByZW1vdmVGcm9tQXJyYXkoa2V5VG9kb0l0ZW0sY29tcGxldGVMSVNUKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZWRMSVNULnB1c2goZXZlbnRPYmplY3RJbkNvbXBsZXRlTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vdENvbXBsZXRlTElTVCA9IExJU1QuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRvZG9JdGVtT2JqZWN0LnRyYXNoID09IGZhbHNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRvZG9MaXN0LnJlbW92ZUNoaWxkKGl0ZW0pOyAvLyByZW1vdmUgZXZlbnRJdGVtIGZyb20gRE9NXHJcbiAgICAgICAgICAgIHNldENvdW50ZXIobm90Q29tcGxldGVMSVNUKTsgLy8gY291bnRlciBmb3IgY29tcGxldGUgZXZlbnRzXHJcblxyXG4gICAgICAgICAgICBjaGVja09uSXRlbSgpO1xyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2NvbXBsYXRlJzpcclxuICAgICAgICAgICAgaWYoZXZlbnRPYmplY3QudG9kb0l0ZW1PYmplY3QuY29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRPYmplY3QudG9kb0l0ZW1PYmplY3QuY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsYXRlJyk7XHJcbiAgICAgICAgICAgICAgICBldmVudE9iamVjdC50b2RvSXRlbU9iamVjdC5jb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGdldCBpdGVtIHdpdGggcHJvcHMgY29tcGxldGUgPSB0cnVlIGFuZCBwdXQgdG8gcmVtb3ZlZExJU1RcclxuICAgICAgICAgICAgY29tcGxldGVMSVNUID0gTElTVC5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlID09IHRydWUgJiYgaXRlbS50b2RvSXRlbU9iamVjdC50cmFzaCA9PSBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gZ2V0IGl0ZW0gd2l0aCBwcm9wcyBjb21wbGV0ZSA9IGZhbHNlIGFuZCBwdXQgdG8gcmVtb3ZlZExJU1RcclxuICAgICAgICAgICAgbm90Q29tcGxldGVMSVNUID0gTElTVC5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnRvZG9JdGVtT2JqZWN0LmNvbXBsZXRlID09IGZhbHNlICYmIGl0ZW0udG9kb0l0ZW1PYmplY3QudHJhc2ggPT0gZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZXRDb3VudGVyKG5vdENvbXBsZXRlTElTVCk7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5KGlkLGFycmF5KXtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgaWYoYXJyYXlbaV0udG9kb0l0ZW1PYmplY3QuaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoYXJyYXlbaV0sMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycmF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb2RvT2JqZWN0QnlJZChpZCwgYXJyYXkpe1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFycmF5W2ldLnRvZG9JdGVtT2JqZWN0LmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZpbHRlckxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGFUeXBlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBhbGVydCgnaW5wdXQgaXMgZW1wdHknKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW1PYmplY3QgPSBuZXcgVG9kb0l0ZW0oaSwgaW5wdXQudmFsdWUsIGZhbHNlKTsgLy8gY3JlYXRlIGV2ZW50IG9iamVjdFxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0l0ZW1PYmplY3QucmVuZGVyVG9kb0l0ZW0oKSk7IC8vIGFkZCBldmVudCBpbiBET00gZXZlbnRzIGxpc3RcclxuICAgICAgICBMSVNULnB1c2goeyBpLCB0b2RvSXRlbU9iamVjdCB9KTtcclxuICAgICAgICBzZXRDb3VudGVyKExJU1QpIC8vIGNvdW50ZXIgZm9yIGV2ZW50c1xyXG4gICAgICAgIGNoZWNrT25JdGVtKCk7IC8vIHZpc3VhbCBjaGVjayBldmVudFxyXG4gICAgICAgIFxyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q291bnRlcihhcnJheSkge1xyXG4gICAgY291bnRlckxlZnRUb2RvSXRlbXMuaW5uZXJUZXh0ID0gYXJyYXkubGVuZ3RoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja09uSXRlbSgpIHtcclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWl0ZW0nKTtcclxuICAgIChpdGVtcy5sZW5ndGggPiAwKSA/IHRvZG9XcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKSA6IHRvZG9XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvbWFpbi5qcyIsImV4cG9ydCBjbGFzcyBUb2RvSXRlbSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgdGV4dCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyYXNoID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlbmRlclRvZG9JdGVtID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pZCk7XHJcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtJyk7XHJcbiAgICAgICAgY29uc3QgdG9kb0NvbnRlbnQgPSBgXHJcbiAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1pdGVtLWNoZWNrXCIgZGF0YS1rZXk9JyR7dGhpcy5pZH0nIGRhdGEtdHlwZT0nY29tcGxhdGUnPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWl0ZW0tdGV4dFwiPiR7dGhpcy50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWl0ZW0tcmVtb3ZlXCIgZGF0YS1rZXk9JyR7dGhpcy5pZH0nIGRhdGEtdHlwZT0ncmVtb3ZlJz48L3NwYW4+XHJcbiAgICAgICAgYDtcclxuICAgICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCB0b2RvQ29udGVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Rldi9qcy9lczYvY29tcG9uZW50cy9Ub2RvSXRlbS5qcyJdLCJzb3VyY2VSb290IjoiIn0=