(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var bodyElement = document.querySelector('body'); //Mobile Nav Toggle

var mobileNav = function mobileNav() {
  var $siteWrap = document.querySelector('.site-wrap');
  var $burgerBtn = document.querySelector('.js-nav-btn');
  $siteWrap.addEventListener('click', function (evt) {
    var target = evt.target;

    if (!target.classList.contains('header__nav--active') && target.classList.contains('site-wrap--overlay')) {
      toggleMenu($burgerBtn);
    }
  });
  $burgerBtn.addEventListener('click', function () {
    toggleMenu(this);
  });

  function toggleMenu(elem) {
    elem.classList.toggle('active');
    elem.nextElementSibling.classList.toggle('header__nav--active');
    $siteWrap.classList.toggle('site-wrap--overlay');
  }
}; //Modals


var modal = bodyElement.querySelector('.js-modal');
var modalParent = modal.parentElement;
var MODAL_OPEN = 'modal-open';
var myModal = {
  init: function init() {
    var _this = this;

    bodyElement.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.dataset.modal) {
        _this.open(target.dataset.modal);
      }

      if (target.classList.contains('modal-overlay') || target.classList.contains('js-modal__close')) {
        _this.close();
      }
    });
  },
  open: function open(id) {
    //============ OPEN
    var temp = document.querySelector(id);
    var modalClass = temp.dataset.parentclass || '';
    bodyElement.classList.add(MODAL_OPEN);
    var newContent = temp.content.cloneNode(true);

    if (modalClass !== '') {
      modal.classList.add(modalClass);
      modal.dataset.modalclass = modalClass || '';
    }

    this.setContent(newContent);
    modalParent.classList.add('fadeOut');
    modal.classList.add('fadeOut');
  },
  setContent: function setContent(html) {
    var content = document.querySelector('[data-setcontent]');
    content.innerHTML = '';
    content.appendChild(html);
  },
  close: function close() {
    //============ CLOSE
    bodyElement.classList.remove(MODAL_OPEN);
    modalParent.classList.remove('fadeOut');
    modal.classList.remove('fadeOut');
    modal.dataset.modalclass ? modal.classList.remove(modal.dataset.modalclass) : null;
    modal.dataset.modalclass = '';
  }
}; //Check Field Length

var lengthFilter = function lengthFilter(elem) {
  elem.addEventListener('submit', function () {
    var innerElem = elem.querySelector('.input-search');

    if (innerElem.value.length < 2) {
      innerElem.classList.add('error');
    } else {
      innerElem.value = '';
      innerElem.classList.remove('error');
    }
  });
}; //Tabs


function tabs() {
  var bindAll = function bindAll() {
    var menuElements = document.querySelectorAll('[data-tab]');

    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener('click', change);
    }
  };

  var clear = function clear() {
    var menuElements = bodyElement.querySelectorAll('[data-tab]');

    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].classList.remove('active');
      var id = menuElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active');
    }
  };

  var change = function change(e) {
    e.preventDefault();
    clear();
    e.target.classList.add('active');
    var id = e.currentTarget.getAttribute('data-tab');
    document.getElementById(id).classList.add('active');
  };

  bindAll();
} //Select


bodyElement.querySelectorAll('.select').forEach(function (select) {
  var selectCurrent = select.querySelector('.select__current'),
      selectList = select.querySelector('.select__list'),
      selectInput = select.querySelector('.select__input'),
      selectItem = select.querySelectorAll('.select__item');
  selectCurrent.addEventListener('click', function () {
    selectList.classList.toggle('select__list--show');
  });
  selectItem.forEach(function (item) {
    item.addEventListener('click', function () {
      var itemValue = item.getAttribute('data-value');
      var itemText = item.textContent;
      selectInput.value = itemValue;
      selectCurrent.textContent = itemText;
      selectListHide();
    });
  });

  var selectListHide = function selectListHide() {
    selectList.classList.remove('select__list--show');
  };

  document.addEventListener('mouseup', function (e) {
    if (!select.contains(e.target)) selectListHide();
  });
}); //Clear Selects

var resetFilters = function resetFilters(reset, elem) {
  reset = bodyElement.querySelector('.js-reset-filters');
  reset.addEventListener('click', function () {
    elem = bodyElement.querySelectorAll('.select').forEach(function (item) {
      var defaultVal = item.querySelector('.select__current').dataset.default,
          selectCurrent = item.querySelector('.select__current'),
          selectInput = item.querySelector('.select__input');
      selectCurrent.innerHTML = defaultVal;
      selectInput.value = defaultVal;
    });
  });
};

resetFilters();
var compareData = [];
var $compares = Array.from(bodyElement.querySelectorAll('.js-compare'));
var $compareState = bodyElement.querySelector('.js-state-compare');

function compare($el) {
  var $parent = $el.parentElement;
  var id = +$parent.dataset.product;
  var textWrap = $el.querySelector('button > span');
  $el.classList.toggle('active');

  if ($el.classList.contains('active')) {
    textWrap.textContent = 'В сравнении';
    compareData.push(id);
  } else {
    textWrap.textContent = 'Сравнить товар';
    compareData = compareData.filter(function (num) {
      return num !== id;
    });
  }

  $compareState.textContent = '' + compareData.length;
}

if ($compares.length) {
  $compares.forEach(function (el) {
    el.addEventListener('click', function () {
      compare(el);
    });
  });
} // Favorite


var favoriteData = [];
var $favorites = Array.from(bodyElement.querySelectorAll('.js-favorite'));
var $favoriteState = bodyElement.querySelector('.js-state-favorite');

function favorite($el) {
  var $parent = $el.parentElement;
  var id = +$parent.dataset.product;
  var textWrap = $el.querySelector('button > span');
  $el.classList.toggle('active');

  if ($el.classList.contains('active')) {
    textWrap.textContent = 'В избранном';
    favoriteData.push(id);
  } else {
    textWrap.textContent = 'В избранное';
    favoriteData = favoriteData.filter(function (num) {
      return num !== id;
    });
  }

  $favoriteState.textContent = '' + favoriteData.length;
}

if ($favorites.length) {
  $favorites.forEach(function (el) {
    el.addEventListener('click', function () {
      favorite(el);
    });
  });
}

var plugins = {
  modal: bodyElement.querySelectorAll('.js-modal'),
  mobileNav: bodyElement.querySelectorAll('.js-nav-btn'),
  tabs: bodyElement.querySelectorAll('[data-tab]'),
  filter: bodyElement.querySelector('.form-search')
}; // Modal

if (plugins.modal.length) {
  myModal.init();
} //Mobile Nav


if (plugins.mobileNav.length) {
  mobileNav();
} //Tabs


if (plugins.tabs.length) {
  tabs();
} //Filter


if (plugins.filter.length) {
  lengthFilter(plugins.filter);
}

},{}],2:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

document.addEventListener('DOMContentLoaded', function () {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./core'));
  });
});

},{"./core":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jb3JlLmpzIiwianMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEIsQyxDQUVBOztBQUNBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxHQUFVO0FBQzNCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLENBQWxCO0FBQ0EsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQSxFQUFBLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFVLEdBQVYsRUFBZTtBQUNsRCxRQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBakI7O0FBRUEsUUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLHFCQUExQixDQUFELElBQXFELE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLG9CQUExQixDQUF6RCxFQUEwRztBQUN6RyxNQUFBLFVBQVUsQ0FBRSxVQUFGLENBQVY7QUFDQTtBQUNELEdBTkQ7QUFRQSxFQUFBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFZO0FBQ2hELElBQUEsVUFBVSxDQUFFLElBQUYsQ0FBVjtBQUNBLEdBRkQ7O0FBSUEsV0FBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3pCLElBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFFBQXRCO0FBQ0EsSUFBQSxJQUFJLENBQUMsa0JBQUwsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsQ0FBeUMscUJBQXpDO0FBQ0EsSUFBQSxTQUFTLENBQUMsU0FBVixDQUFvQixNQUFwQixDQUEyQixvQkFBM0I7QUFDQTtBQUNELENBcEJELEMsQ0FzQkE7OztBQUNB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QUtBOztBQUlELElBQUksT0FBTyxHQUFHO0FBQ2IsRUFBQSxLQUFLLEVBQUUsV0FBVyxDQUFDLGdCQUFaLENBQTZCLFdBQTdCLENBRE07QUFFYixFQUFBLFNBQVMsRUFBRSxXQUFXLENBQUMsZ0JBQVosQ0FBNkIsYUFBN0IsQ0FGRTtBQUdiLEVBQUEsSUFBSSxFQUFFLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixZQUE3QixDQUhPO0FBSWIsRUFBQSxNQUFNLEVBQUUsV0FBVyxDQUFDLGFBQVosQ0FBMEIsY0FBMUI7QUFKSyxDQUFkLEMsQ0FRQTs7QUFDQSxJQUFHLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBakIsRUFBd0I7QUFDdkIsRUFBQSxPQUFPLENBQUMsSUFBUjtBQUNBLEMsQ0FDRDs7O0FBQ0EsSUFBRyxPQUFPLENBQUMsU0FBUixDQUFrQixNQUFyQixFQUE0QjtBQUMzQixFQUFBLFNBQVM7QUFDVCxDLENBQ0Q7OztBQUNBLElBQUcsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFoQixFQUF1QjtBQUN0QixFQUFBLElBQUk7QUFDSixDLENBQ0Q7OztBQUNBLElBQUcsT0FBTyxDQUFDLE1BQVIsQ0FBZSxNQUFsQixFQUF5QjtBQUN4QixFQUFBLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBVCxDQUFaO0FBQ0E7OztBQ3hQRDs7Ozs7Ozs7QUFFQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDdkQ7QUFBQSwyQ0FBTyxRQUFQO0FBQUE7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4vL01vYmlsZSBOYXYgVG9nZ2xlXHJcbmNvbnN0IG1vYmlsZU5hdiA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgJHNpdGVXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtd3JhcCcpO1xyXG5cdGNvbnN0ICRidXJnZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbmF2LWJ0bicpO1xyXG5cdCRzaXRlV3JhcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdGxldCB0YXJnZXQgPSBldnQudGFyZ2V0O1xyXG5cclxuXHRcdGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGVhZGVyX19uYXYtLWFjdGl2ZScpICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpdGUtd3JhcC0tb3ZlcmxheScpKSB7XHJcblx0XHRcdHRvZ2dsZU1lbnUoICRidXJnZXJCdG4gKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JGJ1cmdlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdHRvZ2dsZU1lbnUoIHRoaXMgKTtcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gdG9nZ2xlTWVudShlbGVtKSB7XHJcblx0XHRlbGVtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0ZWxlbS5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19uYXYtLWFjdGl2ZScpO1xyXG5cdFx0JHNpdGVXcmFwLmNsYXNzTGlzdC50b2dnbGUoJ3NpdGUtd3JhcC0tb3ZlcmxheScpO1xyXG5cdH1cclxufVxyXG5cclxuLy9Nb2RhbHNcclxuY29uc3QgbW9kYWwgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbW9kYWwnKTtcclxuY29uc3QgbW9kYWxQYXJlbnQgPSBtb2RhbC5wYXJlbnRFbGVtZW50O1xyXG5jb25zdCBNT0RBTF9PUEVOID0gJ21vZGFsLW9wZW4nO1xyXG5cclxuY29uc3QgbXlNb2RhbCA9IHtcclxuXHRpbml0KCkge1xyXG5cdFx0Ym9keUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAodGFyZ2V0LmRhdGFzZXQubW9kYWwpIHtcclxuXHRcdFx0XHR0aGlzLm9wZW4odGFyZ2V0LmRhdGFzZXQubW9kYWwpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1vdmVybGF5JykgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtbW9kYWxfX2Nsb3NlJykpIHtcclxuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0b3BlbihpZCkgeyAvLz09PT09PT09PT09PSBPUEVOXHJcblx0XHRjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XHJcblx0XHRjb25zdCBtb2RhbENsYXNzID0gdGVtcC5kYXRhc2V0LnBhcmVudGNsYXNzIHx8ICcnO1xyXG5cdFx0Ym9keUVsZW1lbnQuY2xhc3NMaXN0LmFkZChNT0RBTF9PUEVOKTtcclxuXHRcdGNvbnN0IG5ld0NvbnRlbnQgPSB0ZW1wLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0aWYobW9kYWxDbGFzcyAhPT0gJycpe1xyXG5cdFx0XHRtb2RhbC5jbGFzc0xpc3QuYWRkKG1vZGFsQ2xhc3MpXHJcblx0XHRcdG1vZGFsLmRhdGFzZXQubW9kYWxjbGFzcyA9IG1vZGFsQ2xhc3MgfHwgJyc7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0Q29udGVudChuZXdDb250ZW50KTtcclxuXHRcdG1vZGFsUGFyZW50LmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXQnKTtcclxuXHRcdG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXQnKTtcclxuXHR9LFxyXG5cclxuXHRzZXRDb250ZW50KGh0bWwpIHtcclxuXHRcdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZXRjb250ZW50XScpO1xyXG5cdFx0Y29udGVudC5pbm5lckhUTUwgPSAnJztcclxuXHRcdGNvbnRlbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2UoKSB7IC8vPT09PT09PT09PT09IENMT1NFXHJcblx0XHRib2R5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1PREFMX09QRU4pO1xyXG5cdFx0bW9kYWxQYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZU91dCcpO1xyXG5cdFx0bW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZU91dCcpO1xyXG5cdFx0bW9kYWwuZGF0YXNldC5tb2RhbGNsYXNzID8gbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShtb2RhbC5kYXRhc2V0Lm1vZGFsY2xhc3MpIDogbnVsbDtcclxuXHRcdG1vZGFsLmRhdGFzZXQubW9kYWxjbGFzcyA9ICcnO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuLy9DaGVjayBGaWVsZCBMZW5ndGhcclxubGV0IGxlbmd0aEZpbHRlciA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcblx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGZ1bmN0aW9uICgpIHtcclxuXHRcdGxldCBpbm5lckVsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1zZWFyY2gnKTtcclxuXHRcdGlmKGlubmVyRWxlbS52YWx1ZS5sZW5ndGggPCAyKXtcclxuXHRcdFx0aW5uZXJFbGVtLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aW5uZXJFbGVtLnZhbHVlID0gJyc7XHJcblx0XHRcdGlubmVyRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcblxyXG5cclxuLy9UYWJzXHJcbmZ1bmN0aW9uIHRhYnMoKSB7XHJcblx0bGV0IGJpbmRBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBtZW51RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdJyk7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbWVudUVsZW1lbnRzLmxlbmd0aCA7IGkrKykge1xyXG5cdFx0XHRtZW51RWxlbWVudHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGFuZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRsZXQgY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBtZW51RWxlbWVudHMgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdJyk7XHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbWVudUVsZW1lbnRzLmxlbmd0aCA7IGkrKykge1xyXG5cdFx0XHRtZW51RWxlbWVudHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdGxldCBpZCA9IG1lbnVFbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGxldCBjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdGNsZWFyKCk7XHJcblx0XHRlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdGxldCBpZCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0fVxyXG5cdGJpbmRBbGwoKTtcclxufVxyXG5cclxuXHJcbi8vU2VsZWN0XHJcbmJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QnKS5mb3JFYWNoKHNlbGVjdCA9PiB7XHJcblx0bGV0IHNlbGVjdEN1cnJlbnQgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fY3VycmVudCcpLFxyXG5cdFx0c2VsZWN0TGlzdCA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19saXN0JyksXHJcblx0XHRzZWxlY3RJbnB1dCA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19pbnB1dCcpLFxyXG5cdFx0c2VsZWN0SXRlbSA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0X19pdGVtJyk7XHJcblxyXG5cdHNlbGVjdEN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRzZWxlY3RMaXN0LmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdF9fbGlzdC0tc2hvdycpO1xyXG5cdH0pXHJcblxyXG5cdHNlbGVjdEl0ZW0uZm9yRWFjaChpdGVtID0+e1xyXG5cdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcblxyXG5cdFx0XHRsZXQgaXRlbVZhbHVlID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKVxyXG5cdFx0XHRsZXQgaXRlbVRleHQgPSBpdGVtLnRleHRDb250ZW50O1xyXG5cdFx0XHRzZWxlY3RJbnB1dC52YWx1ZSA9IGl0ZW1WYWx1ZTtcclxuXHRcdFx0c2VsZWN0Q3VycmVudC50ZXh0Q29udGVudCA9IGl0ZW1UZXh0O1xyXG5cdFx0XHRzZWxlY3RMaXN0SGlkZSgpO1xyXG5cdFx0fSlcclxuXHR9KVxyXG5cdGxldCBzZWxlY3RMaXN0SGlkZSA9ICgpID0+IHtcclxuXHRcdHNlbGVjdExpc3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X19saXN0LS1zaG93JylcclxuXHR9XHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT57XHJcblx0XHRpZiAoIXNlbGVjdC5jb250YWlucyhlLnRhcmdldCkpXHRzZWxlY3RMaXN0SGlkZSgpXHJcblx0fSlcclxufSlcclxuXHJcbi8vQ2xlYXIgU2VsZWN0c1xyXG5sZXQgcmVzZXRGaWx0ZXJzICA9IGZ1bmN0aW9uKHJlc2V0LGVsZW0pIHtcclxuXHRyZXNldCA9IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZXNldC1maWx0ZXJzJyk7XHJcblxyXG5cdHJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG5cdFx0ZWxlbSA9IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QnKS5mb3JFYWNoKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdGxldCBkZWZhdWx0VmFsID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19jdXJyZW50JykuZGF0YXNldC5kZWZhdWx0LFxyXG5cdFx0XHRcdFx0c2VsZWN0Q3VycmVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fY3VycmVudCcpLFxyXG5cdFx0XHRcdFx0c2VsZWN0SW5wdXQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2lucHV0Jyk7XHJcblxyXG5cdFx0XHRcdHNlbGVjdEN1cnJlbnQuaW5uZXJIVE1MID0gZGVmYXVsdFZhbDtcclxuXHRcdFx0XHRzZWxlY3RJbnB1dC52YWx1ZSA9IGRlZmF1bHRWYWw7XHJcblx0XHR9KVxyXG5cdH0pXHJcbn1cclxucmVzZXRGaWx0ZXJzKCk7XHJcblxyXG5cclxubGV0IGNvbXBhcmVEYXRhID0gW107XHJcbmNvbnN0ICRjb21wYXJlcyA9IEFycmF5LmZyb20oYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWNvbXBhcmUnKSk7XHJcbmNvbnN0ICRjb21wYXJlU3RhdGUgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc3RhdGUtY29tcGFyZScpO1xyXG5cclxuZnVuY3Rpb24gY29tcGFyZSgkZWwpIHtcclxuXHRjb25zdCAkcGFyZW50ID0gJGVsLnBhcmVudEVsZW1lbnQ7XHJcblx0Y29uc3QgaWQgPSArJHBhcmVudC5kYXRhc2V0LnByb2R1Y3Q7XHJcblx0Y29uc3QgdGV4dFdyYXAgPSAkZWwucXVlcnlTZWxlY3RvcignYnV0dG9uID4gc3BhbicpO1xyXG5cdCRlbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9CSINGB0YDQsNCy0L3QtdC90LjQuCc7XHJcblx0XHRjb21wYXJlRGF0YS5wdXNoKGlkKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGV4dFdyYXAudGV4dENvbnRlbnQgPSAn0KHRgNCw0LLQvdC40YLRjCDRgtC+0LLQsNGAJztcclxuXHRcdGNvbXBhcmVEYXRhID0gY29tcGFyZURhdGEuZmlsdGVyKCBudW0gPT4gbnVtICE9PSAgaWQgKTtcclxuXHR9XHJcblx0JGNvbXBhcmVTdGF0ZS50ZXh0Q29udGVudCA9ICcnICsgKGNvbXBhcmVEYXRhLmxlbmd0aCk7XHJcbn1cclxuXHJcbmlmICgkY29tcGFyZXMubGVuZ3RoKSB7XHJcblx0JGNvbXBhcmVzLmZvckVhY2goIGVsID0+IHtcclxuXHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRjb21wYXJlKGVsKTtcclxuXHRcdH0pXHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIEZhdm9yaXRlXHJcbmxldCBmYXZvcml0ZURhdGEgPSBbXTtcclxuY29uc3QgJGZhdm9yaXRlcyA9IEFycmF5LmZyb20oYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZhdm9yaXRlJykpO1xyXG5jb25zdCAkZmF2b3JpdGVTdGF0ZSA9IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zdGF0ZS1mYXZvcml0ZScpO1xyXG5cclxuZnVuY3Rpb24gIGZhdm9yaXRlKCRlbCkge1xyXG5cdGNvbnN0ICRwYXJlbnQgPSAkZWwucGFyZW50RWxlbWVudDtcclxuXHRjb25zdCBpZCA9ICskcGFyZW50LmRhdGFzZXQucHJvZHVjdDtcclxuXHRjb25zdCB0ZXh0V3JhcCA9ICRlbC5xdWVyeVNlbGVjdG9yKCdidXR0b24gPiBzcGFuJyk7XHJcblx0JGVsLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdGlmICgkZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG5cdFx0dGV4dFdyYXAudGV4dENvbnRlbnQgPSAn0JIg0LjQt9Cx0YDQsNC90L3QvtC8JztcclxuXHRcdGZhdm9yaXRlRGF0YS5wdXNoKGlkKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGV4dFdyYXAudGV4dENvbnRlbnQgPSAn0JIg0LjQt9Cx0YDQsNC90L3QvtC1JztcclxuXHRcdGZhdm9yaXRlRGF0YSA9IGZhdm9yaXRlRGF0YS5maWx0ZXIoIG51bSA9PiBudW0gIT09ICBpZCApO1xyXG5cdH1cclxuXHQkZmF2b3JpdGVTdGF0ZS50ZXh0Q29udGVudCA9ICcnICsgKGZhdm9yaXRlRGF0YS5sZW5ndGgpO1xyXG59XHJcblxyXG5pZiAoJGZhdm9yaXRlcy5sZW5ndGgpIHtcclxuXHQkZmF2b3JpdGVzLmZvckVhY2goIGVsID0+IHtcclxuXHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRmYXZvcml0ZShlbCk7XHJcblx0XHR9KVxyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuXHJcbmxldCBwbHVnaW5zID0ge1xyXG5cdG1vZGFsOiBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbW9kYWwnKSxcclxuXHRtb2JpbGVOYXY6IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1uYXYtYnRuJyksXHJcblx0dGFiczogYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpLFxyXG5cdGZpbHRlcjogYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tc2VhcmNoJyksXHJcbn1cclxuXHJcblxyXG4vLyBNb2RhbFxyXG5pZihwbHVnaW5zLm1vZGFsLmxlbmd0aCl7XHJcblx0bXlNb2RhbC5pbml0KCk7XHJcbn1cclxuLy9Nb2JpbGUgTmF2XHJcbmlmKHBsdWdpbnMubW9iaWxlTmF2Lmxlbmd0aCl7XHJcblx0bW9iaWxlTmF2KCk7XHJcbn1cclxuLy9UYWJzXHJcbmlmKHBsdWdpbnMudGFicy5sZW5ndGgpe1xyXG5cdHRhYnMoKTtcclxufVxyXG4vL0ZpbHRlclxyXG5pZihwbHVnaW5zLmZpbHRlci5sZW5ndGgpe1xyXG5cdGxlbmd0aEZpbHRlcihwbHVnaW5zLmZpbHRlcik7XHJcbn1cclxuXHJcblxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgaW1wb3J0KCcuL2NvcmUnKTtcclxufSk7XHJcblxyXG4iXX0=
