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
        var width = target.dataset.modalWidth || '400';

        _this.open(target.dataset.modal, width);
      }

      if (target.classList.contains('modal-overlay') || target.classList.contains('js-modal__close')) {
        _this.close();
      }
    });
  },
  open: function open(id, width) {
    //============ OPEN
    var temp = document.querySelector(id);
    var modalClass = temp.dataset.parentclass;
    bodyElement.classList.add(MODAL_OPEN);
    var newContent = temp.content.cloneNode(true);

    if (modalClass !== '') {
      modal.classList.add(modalClass);
      modal.dataset.modalclass = modalClass || '';
    }

    if (width) {
      modal.style.maxWidth = width + 'px';
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
    modal.removeAttribute("style");
    modal.classList.remove(modal.dataset.modalclass);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jb3JlLmpzIiwianMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEIsQyxDQUVBOztBQUNBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxHQUFVO0FBQzNCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLENBQWxCO0FBQ0EsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQSxFQUFBLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFVLEdBQVYsRUFBZTtBQUNsRCxRQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBakI7O0FBRUEsUUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLHFCQUExQixDQUFELElBQXFELE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLG9CQUExQixDQUF6RCxFQUEwRztBQUN6RyxNQUFBLFVBQVUsQ0FBRSxVQUFGLENBQVY7QUFDQTtBQUNELEdBTkQ7QUFRQSxFQUFBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFZO0FBQ2hELElBQUEsVUFBVSxDQUFFLElBQUYsQ0FBVjtBQUNBLEdBRkQ7O0FBSUEsV0FBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3pCLElBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFFBQXRCO0FBQ0EsSUFBQSxJQUFJLENBQUMsa0JBQUwsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsQ0FBeUMscUJBQXpDO0FBQ0EsSUFBQSxTQUFTLENBQUMsU0FBVixDQUFvQixNQUFwQixDQUEyQixvQkFBM0I7QUFDQTtBQUNELENBcEJELEMsQ0FzQkE7OztBQUNB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QUN0QixFQUFBLFVBQVUsQ0FBQyxPQUFYLENBQW9CLFVBQUEsRUFBRSxFQUFJO0FBQ3pCLElBQUEsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQVk7QUFDeEMsTUFBQSxRQUFRLENBQUMsRUFBRCxDQUFSO0FBQ0EsS0FGRDtBQUdBLEdBSkQ7QUFLQTs7QUFJRCxJQUFJLE9BQU8sR0FBRztBQUNiLEVBQUEsS0FBSyxFQUFFLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixXQUE3QixDQURNO0FBRWIsRUFBQSxTQUFTLEVBQUUsV0FBVyxDQUFDLGdCQUFaLENBQTZCLGFBQTdCLENBRkU7QUFHYixFQUFBLElBQUksRUFBRSxXQUFXLENBQUMsZ0JBQVosQ0FBNkIsWUFBN0IsQ0FITztBQUliLEVBQUEsTUFBTSxFQUFFLFdBQVcsQ0FBQyxhQUFaLENBQTBCLGNBQTFCO0FBSkssQ0FBZCxDLENBUUE7O0FBQ0EsSUFBRyxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWpCLEVBQXdCO0FBQ3ZCLEVBQUEsT0FBTyxDQUFDLElBQVI7QUFDQSxDLENBQ0Q7OztBQUNBLElBQUcsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsTUFBckIsRUFBNEI7QUFDM0IsRUFBQSxTQUFTO0FBQ1QsQyxDQUNEOzs7QUFDQSxJQUFHLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBaEIsRUFBdUI7QUFDdEIsRUFBQSxJQUFJO0FBQ0osQyxDQUNEOzs7QUFDQSxJQUFHLE9BQU8sQ0FBQyxNQUFSLENBQWUsTUFBbEIsRUFBeUI7QUFDeEIsRUFBQSxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQVQsQ0FBWjtBQUNBOzs7QUM3UEQ7Ozs7Ozs7O0FBRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3ZEO0FBQUEsMkNBQU8sUUFBUDtBQUFBO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuLy9Nb2JpbGUgTmF2IFRvZ2dsZVxyXG5jb25zdCBtb2JpbGVOYXYgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnN0ICRzaXRlV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLXdyYXAnKTtcclxuXHRjb25zdCAkYnVyZ2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW5hdi1idG4nKTtcclxuXHQkc2l0ZVdyYXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcclxuXHJcblx0XHRpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hlYWRlcl9fbmF2LS1hY3RpdmUnKSAmJiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaXRlLXdyYXAtLW92ZXJsYXknKSkge1xyXG5cdFx0XHR0b2dnbGVNZW51KCAkYnVyZ2VyQnRuICk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCRidXJnZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHR0b2dnbGVNZW51KCB0aGlzICk7XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIHRvZ2dsZU1lbnUoZWxlbSkge1xyXG5cdFx0ZWxlbS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRcdGVsZW0ubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fbmF2LS1hY3RpdmUnKTtcclxuXHRcdCRzaXRlV3JhcC5jbGFzc0xpc3QudG9nZ2xlKCdzaXRlLXdyYXAtLW92ZXJsYXknKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vTW9kYWxzXHJcbmNvbnN0IG1vZGFsID0gYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsJyk7XHJcbmNvbnN0IG1vZGFsUGFyZW50ID0gbW9kYWwucGFyZW50RWxlbWVudDtcclxuY29uc3QgTU9EQUxfT1BFTiA9ICdtb2RhbC1vcGVuJztcclxuXHJcbmNvbnN0IG15TW9kYWwgPSB7XHJcblx0aW5pdCgpIHtcclxuXHRcdGJvZHlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xyXG5cdFx0XHRjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0O1xyXG5cclxuXHRcdFx0aWYgKHRhcmdldC5kYXRhc2V0Lm1vZGFsKSB7XHJcblx0XHRcdFx0Y29uc3Qgd2lkdGggPSB0YXJnZXQuZGF0YXNldC5tb2RhbFdpZHRoIHx8ICc0MDAnO1xyXG5cdFx0XHRcdHRoaXMub3Blbih0YXJnZXQuZGF0YXNldC5tb2RhbCwgd2lkdGgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1vdmVybGF5JykgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtbW9kYWxfX2Nsb3NlJykpIHtcclxuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0b3BlbihpZCwgd2lkdGgpIHsgLy89PT09PT09PT09PT0gT1BFTlxyXG5cdFx0Y29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG5cdFx0Y29uc3QgbW9kYWxDbGFzcyA9IHRlbXAuZGF0YXNldC5wYXJlbnRjbGFzcztcclxuXHRcdGJvZHlFbGVtZW50LmNsYXNzTGlzdC5hZGQoTU9EQUxfT1BFTik7XHJcblx0XHRjb25zdCBuZXdDb250ZW50ID0gdGVtcC5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdGlmKG1vZGFsQ2xhc3MgIT09ICcnKXtcclxuXHRcdFx0bW9kYWwuY2xhc3NMaXN0LmFkZChtb2RhbENsYXNzKVxyXG5cdFx0XHRtb2RhbC5kYXRhc2V0Lm1vZGFsY2xhc3MgPSBtb2RhbENsYXNzIHx8ICcnO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHdpZHRoKSB7XHJcblx0XHRcdG1vZGFsLnN0eWxlLm1heFdpZHRoID0gd2lkdGggKyAncHgnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0Q29udGVudChuZXdDb250ZW50KTtcclxuXHRcdG1vZGFsUGFyZW50LmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXQnKTtcclxuXHRcdG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXQnKTtcclxuXHR9LFxyXG5cclxuXHRzZXRDb250ZW50KGh0bWwpIHtcclxuXHRcdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZXRjb250ZW50XScpO1xyXG5cdFx0Y29udGVudC5pbm5lckhUTUwgPSAnJztcclxuXHRcdGNvbnRlbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2UoKSB7IC8vPT09PT09PT09PT09IENMT1NFXHJcblx0XHRib2R5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1PREFMX09QRU4pO1xyXG5cdFx0bW9kYWxQYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZU91dCcpO1xyXG5cdFx0bW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZU91dCcpO1xyXG5cdFx0bW9kYWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XHJcblx0XHRtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKG1vZGFsLmRhdGFzZXQubW9kYWxjbGFzcyk7XHJcblx0XHRtb2RhbC5kYXRhc2V0Lm1vZGFsY2xhc3MgPSAnJztcclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcbi8vQ2hlY2sgRmllbGQgTGVuZ3RoXHJcbmxldCBsZW5ndGhGaWx0ZXIgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG5cdGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgaW5uZXJFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtc2VhcmNoJyk7XHJcblx0XHRpZihpbm5lckVsZW0udmFsdWUubGVuZ3RoIDwgMil7XHJcblx0XHRcdGlubmVyRWxlbS5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGlubmVyRWxlbS52YWx1ZSA9ICcnO1xyXG5cdFx0XHRpbm5lckVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuXHJcbi8vVGFic1xyXG5mdW5jdGlvbiB0YWJzKCkge1xyXG5cdGxldCBiaW5kQWxsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgbWVudUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG1lbnVFbGVtZW50cy5sZW5ndGggOyBpKyspIHtcclxuXHRcdFx0bWVudUVsZW1lbnRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0bGV0IGNsZWFyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgbWVudUVsZW1lbnRzID0gYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG1lbnVFbGVtZW50cy5sZW5ndGggOyBpKyspIHtcclxuXHRcdFx0bWVudUVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRsZXQgaWQgPSBtZW51RWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsZXQgY2hhbmdlID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRjbGVhcigpO1xyXG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRsZXQgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdH1cclxuXHRiaW5kQWxsKCk7XHJcbn1cclxuXHJcblxyXG4vL1NlbGVjdFxyXG5ib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaChzZWxlY3QgPT4ge1xyXG5cdGxldCBzZWxlY3RDdXJyZW50ID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2N1cnJlbnQnKSxcclxuXHRcdHNlbGVjdExpc3QgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fbGlzdCcpLFxyXG5cdFx0c2VsZWN0SW5wdXQgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faW5wdXQnKSxcclxuXHRcdHNlbGVjdEl0ZW0gPSBzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9faXRlbScpO1xyXG5cclxuXHRzZWxlY3RDdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0c2VsZWN0TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RfX2xpc3QtLXNob3cnKTtcclxuXHR9KVxyXG5cclxuXHRzZWxlY3RJdGVtLmZvckVhY2goaXRlbSA9PntcclxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG5cclxuXHRcdFx0bGV0IGl0ZW1WYWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJylcclxuXHRcdFx0bGV0IGl0ZW1UZXh0ID0gaXRlbS50ZXh0Q29udGVudDtcclxuXHRcdFx0c2VsZWN0SW5wdXQudmFsdWUgPSBpdGVtVmFsdWU7XHJcblx0XHRcdHNlbGVjdEN1cnJlbnQudGV4dENvbnRlbnQgPSBpdGVtVGV4dDtcclxuXHRcdFx0c2VsZWN0TGlzdEhpZGUoKTtcclxuXHRcdH0pXHJcblx0fSlcclxuXHRsZXQgc2VsZWN0TGlzdEhpZGUgPSAoKSA9PiB7XHJcblx0XHRzZWxlY3RMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9fbGlzdC0tc2hvdycpXHJcblx0fVxyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+e1xyXG5cdFx0aWYgKCFzZWxlY3QuY29udGFpbnMoZS50YXJnZXQpKVx0c2VsZWN0TGlzdEhpZGUoKVxyXG5cdH0pXHJcbn0pXHJcblxyXG4vL0NsZWFyIFNlbGVjdHNcclxubGV0IHJlc2V0RmlsdGVycyAgPSBmdW5jdGlvbihyZXNldCxlbGVtKSB7XHJcblx0cmVzZXQgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVzZXQtZmlsdGVycycpO1xyXG5cclxuXHRyZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuXHRcdGVsZW0gPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaCggKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRsZXQgZGVmYXVsdFZhbCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fY3VycmVudCcpLmRhdGFzZXQuZGVmYXVsdCxcclxuXHRcdFx0XHRcdHNlbGVjdEN1cnJlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2N1cnJlbnQnKSxcclxuXHRcdFx0XHRcdHNlbGVjdElucHV0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RDdXJyZW50LmlubmVySFRNTCA9IGRlZmF1bHRWYWw7XHJcblx0XHRcdFx0c2VsZWN0SW5wdXQudmFsdWUgPSBkZWZhdWx0VmFsO1xyXG5cdFx0fSlcclxuXHR9KVxyXG59XHJcbnJlc2V0RmlsdGVycygpO1xyXG5cclxuXHJcbmxldCBjb21wYXJlRGF0YSA9IFtdO1xyXG5jb25zdCAkY29tcGFyZXMgPSBBcnJheS5mcm9tKGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jb21wYXJlJykpO1xyXG5jb25zdCAkY29tcGFyZVN0YXRlID0gYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXN0YXRlLWNvbXBhcmUnKTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmUoJGVsKSB7XHJcblx0Y29uc3QgJHBhcmVudCA9ICRlbC5wYXJlbnRFbGVtZW50O1xyXG5cdGNvbnN0IGlkID0gKyRwYXJlbnQuZGF0YXNldC5wcm9kdWN0O1xyXG5cdGNvbnN0IHRleHRXcmFwID0gJGVsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiA+IHNwYW4nKTtcclxuXHQkZWwuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0aWYgKCRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHR0ZXh0V3JhcC50ZXh0Q29udGVudCA9ICfQkiDRgdGA0LDQstC90LXQvdC40LgnO1xyXG5cdFx0Y29tcGFyZURhdGEucHVzaChpZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9Ch0YDQsNCy0L3QuNGC0Ywg0YLQvtCy0LDRgCc7XHJcblx0XHRjb21wYXJlRGF0YSA9IGNvbXBhcmVEYXRhLmZpbHRlciggbnVtID0+IG51bSAhPT0gIGlkICk7XHJcblx0fVxyXG5cdCRjb21wYXJlU3RhdGUudGV4dENvbnRlbnQgPSAnJyArIChjb21wYXJlRGF0YS5sZW5ndGgpO1xyXG59XHJcblxyXG5pZiAoJGNvbXBhcmVzLmxlbmd0aCkge1xyXG5cdCRjb21wYXJlcy5mb3JFYWNoKCBlbCA9PiB7XHJcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29tcGFyZShlbCk7XHJcblx0XHR9KVxyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBGYXZvcml0ZVxyXG5sZXQgZmF2b3JpdGVEYXRhID0gW107XHJcbmNvbnN0ICRmYXZvcml0ZXMgPSBBcnJheS5mcm9tKGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mYXZvcml0ZScpKTtcclxuY29uc3QgJGZhdm9yaXRlU3RhdGUgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc3RhdGUtZmF2b3JpdGUnKTtcclxuXHJcbmZ1bmN0aW9uICBmYXZvcml0ZSgkZWwpIHtcclxuXHRjb25zdCAkcGFyZW50ID0gJGVsLnBhcmVudEVsZW1lbnQ7XHJcblx0Y29uc3QgaWQgPSArJHBhcmVudC5kYXRhc2V0LnByb2R1Y3Q7XHJcblx0Y29uc3QgdGV4dFdyYXAgPSAkZWwucXVlcnlTZWxlY3RvcignYnV0dG9uID4gc3BhbicpO1xyXG5cdCRlbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9CSINC40LfQsdGA0LDQvdC90L7QvCc7XHJcblx0XHRmYXZvcml0ZURhdGEucHVzaChpZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9CSINC40LfQsdGA0LDQvdC90L7QtSc7XHJcblx0XHRmYXZvcml0ZURhdGEgPSBmYXZvcml0ZURhdGEuZmlsdGVyKCBudW0gPT4gbnVtICE9PSAgaWQgKTtcclxuXHR9XHJcblx0JGZhdm9yaXRlU3RhdGUudGV4dENvbnRlbnQgPSAnJyArIChmYXZvcml0ZURhdGEubGVuZ3RoKTtcclxufVxyXG5cclxuaWYgKCRmYXZvcml0ZXMubGVuZ3RoKSB7XHJcblx0JGZhdm9yaXRlcy5mb3JFYWNoKCBlbCA9PiB7XHJcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZmF2b3JpdGUoZWwpO1xyXG5cdFx0fSlcclxuXHR9KTtcclxufVxyXG5cclxuXHJcblxyXG5sZXQgcGx1Z2lucyA9IHtcclxuXHRtb2RhbDogYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW1vZGFsJyksXHJcblx0bW9iaWxlTmF2OiBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbmF2LWJ0bicpLFxyXG5cdHRhYnM6IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKSxcclxuXHRmaWx0ZXI6IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNlYXJjaCcpLFxyXG59XHJcblxyXG5cclxuLy8gTW9kYWxcclxuaWYocGx1Z2lucy5tb2RhbC5sZW5ndGgpe1xyXG5cdG15TW9kYWwuaW5pdCgpO1xyXG59XHJcbi8vTW9iaWxlIE5hdlxyXG5pZihwbHVnaW5zLm1vYmlsZU5hdi5sZW5ndGgpe1xyXG5cdG1vYmlsZU5hdigpO1xyXG59XHJcbi8vVGFic1xyXG5pZihwbHVnaW5zLnRhYnMubGVuZ3RoKXtcclxuXHR0YWJzKCk7XHJcbn1cclxuLy9GaWx0ZXJcclxuaWYocGx1Z2lucy5maWx0ZXIubGVuZ3RoKXtcclxuXHRsZW5ndGhGaWx0ZXIocGx1Z2lucy5maWx0ZXIpO1xyXG59XHJcblxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gIGltcG9ydCgnLi9jb3JlJyk7XHJcbn0pO1xyXG5cclxuIl19
