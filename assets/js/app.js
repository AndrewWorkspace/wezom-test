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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jb3JlLmpzIiwianMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEIsQyxDQUVBOztBQUNBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxHQUFVO0FBQzNCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLENBQWxCO0FBQ0EsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQSxFQUFBLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFVLEdBQVYsRUFBZTtBQUNsRCxRQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBakI7O0FBRUEsUUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLHFCQUExQixDQUFELElBQXFELE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLG9CQUExQixDQUF6RCxFQUEwRztBQUN6RyxNQUFBLFVBQVUsQ0FBRSxVQUFGLENBQVY7QUFDQTtBQUNELEdBTkQ7QUFRQSxFQUFBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFZO0FBQ2hELElBQUEsVUFBVSxDQUFFLElBQUYsQ0FBVjtBQUNBLEdBRkQ7O0FBSUEsV0FBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3pCLElBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFFBQXRCO0FBQ0EsSUFBQSxJQUFJLENBQUMsa0JBQUwsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsQ0FBeUMscUJBQXpDO0FBQ0EsSUFBQSxTQUFTLENBQUMsU0FBVixDQUFvQixNQUFwQixDQUEyQixvQkFBM0I7QUFDQTtBQUNELENBcEJELEMsQ0FzQkE7OztBQUNB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LENBQUMsZ0JBQVosQ0FBNkIsV0FBN0IsQ0FETTtBQUViLEVBQUEsU0FBUyxFQUFFLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixhQUE3QixDQUZFO0FBR2IsRUFBQSxJQUFJLEVBQUUsV0FBVyxDQUFDLGdCQUFaLENBQTZCLFlBQTdCLENBSE87QUFJYixFQUFBLE1BQU0sRUFBRSxXQUFXLENBQUMsYUFBWixDQUEwQixjQUExQjtBQUpLLENBQWQsQyxDQVFBOztBQUNBLElBQUcsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFqQixFQUF3QjtBQUN2QixFQUFBLE9BQU8sQ0FBQyxJQUFSO0FBQ0EsQyxDQUNEOzs7QUFDQSxJQUFHLE9BQU8sQ0FBQyxTQUFSLENBQWtCLE1BQXJCLEVBQTRCO0FBQzNCLEVBQUEsU0FBUztBQUNULEMsQ0FDRDs7O0FBQ0EsSUFBRyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWhCLEVBQXVCO0FBQ3RCLEVBQUEsSUFBSTtBQUNKLEMsQ0FDRDs7O0FBQ0EsSUFBRyxPQUFPLENBQUMsTUFBUixDQUFlLE1BQWxCLEVBQXlCO0FBQ3hCLEVBQUEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFULENBQVo7QUFDQTs7O0FDeFBEOzs7Ozs7OztBQUVBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN2RDtBQUFBLDJDQUFPLFFBQVA7QUFBQTtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBib2R5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbi8vTW9iaWxlIE5hdiBUb2dnbGVcclxuY29uc3QgbW9iaWxlTmF2ID0gZnVuY3Rpb24oKXtcclxuXHRjb25zdCAkc2l0ZVdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS13cmFwJyk7XHJcblx0Y29uc3QgJGJ1cmdlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1uYXYtYnRuJyk7XHJcblx0JHNpdGVXcmFwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0bGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XHJcblxyXG5cdFx0aWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoZWFkZXJfX25hdi0tYWN0aXZlJykgJiYgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2l0ZS13cmFwLS1vdmVybGF5JykpIHtcclxuXHRcdFx0dG9nZ2xlTWVudSggJGJ1cmdlckJ0biApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkYnVyZ2VyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0dG9nZ2xlTWVudSggdGhpcyApO1xyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiB0b2dnbGVNZW51KGVsZW0pIHtcclxuXHRcdGVsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0XHRlbGVtLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX25hdi0tYWN0aXZlJyk7XHJcblx0XHQkc2l0ZVdyYXAuY2xhc3NMaXN0LnRvZ2dsZSgnc2l0ZS13cmFwLS1vdmVybGF5Jyk7XHJcblx0fVxyXG59XHJcblxyXG4vL01vZGFsc1xyXG5jb25zdCBtb2RhbCA9IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tb2RhbCcpO1xyXG5jb25zdCBtb2RhbFBhcmVudCA9IG1vZGFsLnBhcmVudEVsZW1lbnQ7XHJcbmNvbnN0IE1PREFMX09QRU4gPSAnbW9kYWwtb3Blbic7XHJcblxyXG5jb25zdCBteU1vZGFsID0ge1xyXG5cdGluaXQoKSB7XHJcblx0XHRib2R5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcclxuXHJcblx0XHRcdGlmICh0YXJnZXQuZGF0YXNldC5tb2RhbCkge1xyXG5cdFx0XHRcdHRoaXMub3Blbih0YXJnZXQuZGF0YXNldC5tb2RhbClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLW92ZXJsYXknKSB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1tb2RhbF9fY2xvc2UnKSkge1xyXG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRvcGVuKGlkKSB7IC8vPT09PT09PT09PT09IE9QRU5cclxuXHRcdGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcclxuXHRcdGNvbnN0IG1vZGFsQ2xhc3MgPSB0ZW1wLmRhdGFzZXQucGFyZW50Y2xhc3MgfHwgJyc7XHJcblx0XHRib2R5RWxlbWVudC5jbGFzc0xpc3QuYWRkKE1PREFMX09QRU4pO1xyXG5cdFx0Y29uc3QgbmV3Q29udGVudCA9IHRlbXAuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHRpZihtb2RhbENsYXNzICE9PSAnJyl7XHJcblx0XHRcdG1vZGFsLmNsYXNzTGlzdC5hZGQobW9kYWxDbGFzcylcclxuXHRcdFx0bW9kYWwuZGF0YXNldC5tb2RhbGNsYXNzID0gbW9kYWxDbGFzcyB8fCAnJztcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGhpcy5zZXRDb250ZW50KG5ld0NvbnRlbnQpO1xyXG5cdFx0bW9kYWxQYXJlbnQuY2xhc3NMaXN0LmFkZCgnZmFkZU91dCcpO1xyXG5cdFx0bW9kYWwuY2xhc3NMaXN0LmFkZCgnZmFkZU91dCcpO1xyXG5cdH0sXHJcblxyXG5cdHNldENvbnRlbnQoaHRtbCkge1xyXG5cdFx0Y29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNldGNvbnRlbnRdJyk7XHJcblx0XHRjb250ZW50LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0Y29udGVudC5hcHBlbmRDaGlsZChodG1sKTtcclxuXHR9LFxyXG5cclxuXHRjbG9zZSgpIHsgLy89PT09PT09PT09PT0gQ0xPU0VcclxuXHRcdGJvZHlFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoTU9EQUxfT1BFTik7XHJcblx0XHRtb2RhbFBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlT3V0Jyk7XHJcblx0XHRtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlT3V0Jyk7XHJcblx0XHRtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKG1vZGFsLmRhdGFzZXQubW9kYWxjbGFzcyk7XHJcblx0XHRtb2RhbC5kYXRhc2V0Lm1vZGFsY2xhc3MgPSAnJztcclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcbi8vQ2hlY2sgRmllbGQgTGVuZ3RoXHJcbmxldCBsZW5ndGhGaWx0ZXIgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG5cdGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgaW5uZXJFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtc2VhcmNoJyk7XHJcblx0XHRpZihpbm5lckVsZW0udmFsdWUubGVuZ3RoIDwgMil7XHJcblx0XHRcdGlubmVyRWxlbS5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGlubmVyRWxlbS52YWx1ZSA9ICcnO1xyXG5cdFx0XHRpbm5lckVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuXHJcbi8vVGFic1xyXG5mdW5jdGlvbiB0YWJzKCkge1xyXG5cdGxldCBiaW5kQWxsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgbWVudUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG1lbnVFbGVtZW50cy5sZW5ndGggOyBpKyspIHtcclxuXHRcdFx0bWVudUVsZW1lbnRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0bGV0IGNsZWFyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgbWVudUVsZW1lbnRzID0gYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG1lbnVFbGVtZW50cy5sZW5ndGggOyBpKyspIHtcclxuXHRcdFx0bWVudUVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRsZXQgaWQgPSBtZW51RWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsZXQgY2hhbmdlID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRjbGVhcigpO1xyXG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRsZXQgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdH1cclxuXHRiaW5kQWxsKCk7XHJcbn1cclxuXHJcblxyXG4vL1NlbGVjdFxyXG5ib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaChzZWxlY3QgPT4ge1xyXG5cdGxldCBzZWxlY3RDdXJyZW50ID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2N1cnJlbnQnKSxcclxuXHRcdHNlbGVjdExpc3QgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fbGlzdCcpLFxyXG5cdFx0c2VsZWN0SW5wdXQgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faW5wdXQnKSxcclxuXHRcdHNlbGVjdEl0ZW0gPSBzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9faXRlbScpO1xyXG5cclxuXHRzZWxlY3RDdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0c2VsZWN0TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RfX2xpc3QtLXNob3cnKTtcclxuXHR9KVxyXG5cclxuXHRzZWxlY3RJdGVtLmZvckVhY2goaXRlbSA9PntcclxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG5cclxuXHRcdFx0bGV0IGl0ZW1WYWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJylcclxuXHRcdFx0bGV0IGl0ZW1UZXh0ID0gaXRlbS50ZXh0Q29udGVudDtcclxuXHRcdFx0c2VsZWN0SW5wdXQudmFsdWUgPSBpdGVtVmFsdWU7XHJcblx0XHRcdHNlbGVjdEN1cnJlbnQudGV4dENvbnRlbnQgPSBpdGVtVGV4dDtcclxuXHRcdFx0c2VsZWN0TGlzdEhpZGUoKTtcclxuXHRcdH0pXHJcblx0fSlcclxuXHRsZXQgc2VsZWN0TGlzdEhpZGUgPSAoKSA9PiB7XHJcblx0XHRzZWxlY3RMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9fbGlzdC0tc2hvdycpXHJcblx0fVxyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+e1xyXG5cdFx0aWYgKCFzZWxlY3QuY29udGFpbnMoZS50YXJnZXQpKVx0c2VsZWN0TGlzdEhpZGUoKVxyXG5cdH0pXHJcbn0pXHJcblxyXG4vL0NsZWFyIFNlbGVjdHNcclxubGV0IHJlc2V0RmlsdGVycyAgPSBmdW5jdGlvbihyZXNldCxlbGVtKSB7XHJcblx0cmVzZXQgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVzZXQtZmlsdGVycycpO1xyXG5cclxuXHRyZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuXHRcdGVsZW0gPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaCggKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRsZXQgZGVmYXVsdFZhbCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fY3VycmVudCcpLmRhdGFzZXQuZGVmYXVsdCxcclxuXHRcdFx0XHRcdHNlbGVjdEN1cnJlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2N1cnJlbnQnKSxcclxuXHRcdFx0XHRcdHNlbGVjdElucHV0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RDdXJyZW50LmlubmVySFRNTCA9IGRlZmF1bHRWYWw7XHJcblx0XHRcdFx0c2VsZWN0SW5wdXQudmFsdWUgPSBkZWZhdWx0VmFsO1xyXG5cdFx0fSlcclxuXHR9KVxyXG59XHJcbnJlc2V0RmlsdGVycygpO1xyXG5cclxuXHJcbmxldCBjb21wYXJlRGF0YSA9IFtdO1xyXG5jb25zdCAkY29tcGFyZXMgPSBBcnJheS5mcm9tKGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jb21wYXJlJykpO1xyXG5jb25zdCAkY29tcGFyZVN0YXRlID0gYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXN0YXRlLWNvbXBhcmUnKTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmUoJGVsKSB7XHJcblx0Y29uc3QgJHBhcmVudCA9ICRlbC5wYXJlbnRFbGVtZW50O1xyXG5cdGNvbnN0IGlkID0gKyRwYXJlbnQuZGF0YXNldC5wcm9kdWN0O1xyXG5cdGNvbnN0IHRleHRXcmFwID0gJGVsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiA+IHNwYW4nKTtcclxuXHQkZWwuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0aWYgKCRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHR0ZXh0V3JhcC50ZXh0Q29udGVudCA9ICfQkiDRgdGA0LDQstC90LXQvdC40LgnO1xyXG5cdFx0Y29tcGFyZURhdGEucHVzaChpZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9Ch0YDQsNCy0L3QuNGC0Ywg0YLQvtCy0LDRgCc7XHJcblx0XHRjb21wYXJlRGF0YSA9IGNvbXBhcmVEYXRhLmZpbHRlciggbnVtID0+IG51bSAhPT0gIGlkICk7XHJcblx0fVxyXG5cdCRjb21wYXJlU3RhdGUudGV4dENvbnRlbnQgPSAnJyArIChjb21wYXJlRGF0YS5sZW5ndGgpO1xyXG59XHJcblxyXG5pZiAoJGNvbXBhcmVzLmxlbmd0aCkge1xyXG5cdCRjb21wYXJlcy5mb3JFYWNoKCBlbCA9PiB7XHJcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29tcGFyZShlbCk7XHJcblx0XHR9KVxyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBGYXZvcml0ZVxyXG5sZXQgZmF2b3JpdGVEYXRhID0gW107XHJcbmNvbnN0ICRmYXZvcml0ZXMgPSBBcnJheS5mcm9tKGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mYXZvcml0ZScpKTtcclxuY29uc3QgJGZhdm9yaXRlU3RhdGUgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc3RhdGUtZmF2b3JpdGUnKTtcclxuXHJcbmZ1bmN0aW9uICBmYXZvcml0ZSgkZWwpIHtcclxuXHRjb25zdCAkcGFyZW50ID0gJGVsLnBhcmVudEVsZW1lbnQ7XHJcblx0Y29uc3QgaWQgPSArJHBhcmVudC5kYXRhc2V0LnByb2R1Y3Q7XHJcblx0Y29uc3QgdGV4dFdyYXAgPSAkZWwucXVlcnlTZWxlY3RvcignYnV0dG9uID4gc3BhbicpO1xyXG5cdCRlbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9CSINC40LfQsdGA0LDQvdC90L7QvCc7XHJcblx0XHRmYXZvcml0ZURhdGEucHVzaChpZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9CSINC40LfQsdGA0LDQvdC90L7QtSc7XHJcblx0XHRmYXZvcml0ZURhdGEgPSBmYXZvcml0ZURhdGEuZmlsdGVyKCBudW0gPT4gbnVtICE9PSAgaWQgKTtcclxuXHR9XHJcblx0JGZhdm9yaXRlU3RhdGUudGV4dENvbnRlbnQgPSAnJyArIChmYXZvcml0ZURhdGEubGVuZ3RoKTtcclxufVxyXG5cclxuaWYgKCRmYXZvcml0ZXMubGVuZ3RoKSB7XHJcblx0JGZhdm9yaXRlcy5mb3JFYWNoKCBlbCA9PiB7XHJcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZmF2b3JpdGUoZWwpO1xyXG5cdFx0fSlcclxuXHR9KTtcclxufVxyXG5cclxuXHJcblxyXG5sZXQgcGx1Z2lucyA9IHtcclxuXHRtb2RhbDogYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW1vZGFsJyksXHJcblx0bW9iaWxlTmF2OiBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbmF2LWJ0bicpLFxyXG5cdHRhYnM6IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKSxcclxuXHRmaWx0ZXI6IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNlYXJjaCcpLFxyXG59XHJcblxyXG5cclxuLy8gTW9kYWxcclxuaWYocGx1Z2lucy5tb2RhbC5sZW5ndGgpe1xyXG5cdG15TW9kYWwuaW5pdCgpO1xyXG59XHJcbi8vTW9iaWxlIE5hdlxyXG5pZihwbHVnaW5zLm1vYmlsZU5hdi5sZW5ndGgpe1xyXG5cdG1vYmlsZU5hdigpO1xyXG59XHJcbi8vVGFic1xyXG5pZihwbHVnaW5zLnRhYnMubGVuZ3RoKXtcclxuXHR0YWJzKCk7XHJcbn1cclxuLy9GaWx0ZXJcclxuaWYocGx1Z2lucy5maWx0ZXIubGVuZ3RoKXtcclxuXHRsZW5ndGhGaWx0ZXIocGx1Z2lucy5maWx0ZXIpO1xyXG59XHJcblxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gIGltcG9ydCgnLi9jb3JlJyk7XHJcbn0pO1xyXG5cclxuIl19
