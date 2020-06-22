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
    bodyElement.classList.add(MODAL_OPEN);
    var newContent = temp.content.cloneNode(true);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jb3JlLmpzIiwianMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEIsQyxDQUVBOztBQUNBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxHQUFVO0FBQzNCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLENBQWxCO0FBQ0EsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQSxFQUFBLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFVLEdBQVYsRUFBZTtBQUNsRCxRQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBakI7O0FBRUEsUUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLHFCQUExQixDQUFELElBQXFELE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLG9CQUExQixDQUF6RCxFQUEwRztBQUN6RyxNQUFBLFVBQVUsQ0FBRSxVQUFGLENBQVY7QUFDQTtBQUNELEdBTkQ7QUFRQSxFQUFBLFVBQVUsQ0FBQyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFZO0FBQ2hELElBQUEsVUFBVSxDQUFFLElBQUYsQ0FBVjtBQUNBLEdBRkQ7O0FBSUEsV0FBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3pCLElBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFFBQXRCO0FBQ0EsSUFBQSxJQUFJLENBQUMsa0JBQUwsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsQ0FBeUMscUJBQXpDO0FBQ0EsSUFBQSxTQUFTLENBQUMsU0FBVixDQUFvQixNQUFwQixDQUEyQixvQkFBM0I7QUFDQTtBQUNELENBcEJELEMsQ0FzQkE7OztBQUNBLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxhQUFaLENBQTBCLFdBQTFCLENBQWQ7QUFDQSxJQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsYUFBMUI7QUFDQSxJQUFNLFVBQVUsR0FBRyxZQUFuQjtBQUVBLElBQU0sT0FBTyxHQUFHO0FBQ2YsRUFBQSxJQURlLGtCQUNSO0FBQUE7O0FBQ04sSUFBQSxXQUFXLENBQUMsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsVUFBQyxHQUFELEVBQVM7QUFDOUMsVUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQW5COztBQUVBLFVBQUksTUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFuQixFQUEwQjtBQUN6QixZQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsSUFBNkIsS0FBM0M7O0FBQ0EsUUFBQSxLQUFJLENBQUMsSUFBTCxDQUFVLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBekIsRUFBZ0MsS0FBaEM7QUFDQTs7QUFFRCxVQUFJLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLGVBQTFCLEtBQThDLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLGlCQUExQixDQUFsRCxFQUFnRztBQUMvRixRQUFBLEtBQUksQ0FBQyxLQUFMO0FBQ0E7QUFDRCxLQVhEO0FBWUEsR0FkYztBQWdCZixFQUFBLElBaEJlLGdCQWdCVixFQWhCVSxFQWdCTixLQWhCTSxFQWdCQztBQUFFO0FBQ2pCLFFBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEVBQXZCLENBQWI7QUFDQSxJQUFBLFdBQVcsQ0FBQyxTQUFaLENBQXNCLEdBQXRCLENBQTBCLFVBQTFCO0FBQ0EsUUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFiLENBQXVCLElBQXZCLENBQW5COztBQUVBLFFBQUksS0FBSixFQUFXO0FBQ1YsTUFBQSxLQUFLLENBQUMsS0FBTixDQUFZLFFBQVosR0FBdUIsS0FBSyxHQUFHLElBQS9CO0FBQ0E7O0FBRUQsU0FBSyxVQUFMLENBQWdCLFVBQWhCO0FBQ0EsSUFBQSxXQUFXLENBQUMsU0FBWixDQUFzQixHQUF0QixDQUEwQixTQUExQjtBQUNBLElBQUEsS0FBSyxDQUFDLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsU0FBcEI7QUFDQSxHQTVCYztBQThCZixFQUFBLFVBOUJlLHNCQThCSixJQTlCSSxFQThCRTtBQUNoQixRQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsQ0FBaEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLEVBQXBCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixJQUFwQjtBQUNBLEdBbENjO0FBb0NmLEVBQUEsS0FwQ2UsbUJBb0NQO0FBQUU7QUFDVCxJQUFBLFdBQVcsQ0FBQyxTQUFaLENBQXNCLE1BQXRCLENBQTZCLFVBQTdCO0FBQ0EsSUFBQSxXQUFXLENBQUMsU0FBWixDQUFzQixNQUF0QixDQUE2QixTQUE3QjtBQUNBLElBQUEsS0FBSyxDQUFDLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsU0FBdkI7QUFDQSxJQUFBLEtBQUssQ0FBQyxlQUFOLENBQXNCLE9BQXRCO0FBQ0E7QUF6Q2MsQ0FBaEIsQyxDQThDQTs7QUFDQSxJQUFJLFlBQVksR0FBRyxTQUFmLFlBQWUsQ0FBVSxJQUFWLEVBQWdCO0FBQ2xDLEVBQUEsSUFBSSxDQUFDLGdCQUFMLENBQXNCLFFBQXRCLEVBQStCLFlBQVk7QUFDMUMsUUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQUwsQ0FBbUIsZUFBbkIsQ0FBaEI7O0FBQ0EsUUFBRyxTQUFTLENBQUMsS0FBVixDQUFnQixNQUFoQixHQUF5QixDQUE1QixFQUE4QjtBQUM3QixNQUFBLFNBQVMsQ0FBQyxTQUFWLENBQW9CLEdBQXBCLENBQXdCLE9BQXhCO0FBQ0EsS0FGRCxNQUVLO0FBQ0osTUFBQSxTQUFTLENBQUMsS0FBVixHQUFrQixFQUFsQjtBQUNBLE1BQUEsU0FBUyxDQUFDLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsT0FBM0I7QUFDQTtBQUNELEdBUkQ7QUFTQSxDQVZELEMsQ0FjQTs7O0FBQ0EsU0FBUyxJQUFULEdBQWdCO0FBQ2YsTUFBSSxPQUFPLEdBQUcsU0FBVixPQUFVLEdBQVc7QUFDeEIsUUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLFlBQTFCLENBQW5COztBQUNBLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBWixFQUFlLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBaEMsRUFBeUMsQ0FBQyxFQUExQyxFQUE4QztBQUM3QyxNQUFBLFlBQVksQ0FBQyxDQUFELENBQVosQ0FBZ0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLE1BQTFDO0FBQ0E7QUFDRCxHQUxEOztBQU1BLE1BQUksS0FBSyxHQUFHLFNBQVIsS0FBUSxHQUFXO0FBQ3RCLFFBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixZQUE3QixDQUFuQjs7QUFDQSxTQUFJLElBQUksQ0FBQyxHQUFHLENBQVosRUFBZSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQWhDLEVBQXlDLENBQUMsRUFBMUMsRUFBOEM7QUFDN0MsTUFBQSxZQUFZLENBQUMsQ0FBRCxDQUFaLENBQWdCLFNBQWhCLENBQTBCLE1BQTFCLENBQWlDLFFBQWpDO0FBQ0EsVUFBSSxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUQsQ0FBWixDQUFnQixZQUFoQixDQUE2QixVQUE3QixDQUFUO0FBQ0EsTUFBQSxRQUFRLENBQUMsY0FBVCxDQUF3QixFQUF4QixFQUE0QixTQUE1QixDQUFzQyxNQUF0QyxDQUE2QyxRQUE3QztBQUNBO0FBQ0QsR0FQRDs7QUFTQSxNQUFJLE1BQU0sR0FBRyxTQUFULE1BQVMsQ0FBUyxDQUFULEVBQVk7QUFDeEIsSUFBQSxDQUFDLENBQUMsY0FBRjtBQUNBLElBQUEsS0FBSztBQUNMLElBQUEsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLFFBQXZCO0FBQ0EsUUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQUYsQ0FBZ0IsWUFBaEIsQ0FBNkIsVUFBN0IsQ0FBVDtBQUNBLElBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsRUFBeEIsRUFBNEIsU0FBNUIsQ0FBc0MsR0FBdEMsQ0FBMEMsUUFBMUM7QUFDQSxHQU5EOztBQU9BLEVBQUEsT0FBTztBQUNQLEMsQ0FHRDs7O0FBQ0EsV0FBVyxDQUFDLGdCQUFaLENBQTZCLFNBQTdCLEVBQXdDLE9BQXhDLENBQWdELFVBQUEsTUFBTSxFQUFJO0FBQ3pELE1BQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFQLENBQXFCLGtCQUFyQixDQUFwQjtBQUFBLE1BQ0MsVUFBVSxHQUFHLE1BQU0sQ0FBQyxhQUFQLENBQXFCLGVBQXJCLENBRGQ7QUFBQSxNQUVDLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBUCxDQUFxQixnQkFBckIsQ0FGZjtBQUFBLE1BR0MsVUFBVSxHQUFHLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixlQUF4QixDQUhkO0FBS0EsRUFBQSxhQUFhLENBQUMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsWUFBTTtBQUM3QyxJQUFBLFVBQVUsQ0FBQyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLG9CQUE1QjtBQUNBLEdBRkQ7QUFJQSxFQUFBLFVBQVUsQ0FBQyxPQUFYLENBQW1CLFVBQUEsSUFBSSxFQUFHO0FBQ3pCLElBQUEsSUFBSSxDQUFDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFlBQUk7QUFFbEMsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQUwsQ0FBa0IsWUFBbEIsQ0FBaEI7QUFDQSxVQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBcEI7QUFDQSxNQUFBLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLFNBQXBCO0FBQ0EsTUFBQSxhQUFhLENBQUMsV0FBZCxHQUE0QixRQUE1QjtBQUNBLE1BQUEsY0FBYztBQUNkLEtBUEQ7QUFRQSxHQVREOztBQVVBLE1BQUksY0FBYyxHQUFHLFNBQWpCLGNBQWlCLEdBQU07QUFDMUIsSUFBQSxVQUFVLENBQUMsU0FBWCxDQUFxQixNQUFyQixDQUE0QixvQkFBNUI7QUFDQSxHQUZEOztBQUlBLEVBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFVBQUMsQ0FBRCxFQUFNO0FBQzFDLFFBQUksQ0FBQyxNQUFNLENBQUMsUUFBUCxDQUFnQixDQUFDLENBQUMsTUFBbEIsQ0FBTCxFQUFnQyxjQUFjO0FBQzlDLEdBRkQ7QUFHQSxDQTNCRCxFLENBNkJBOztBQUNBLElBQUksWUFBWSxHQUFJLFNBQWhCLFlBQWdCLENBQVMsS0FBVCxFQUFlLElBQWYsRUFBcUI7QUFDeEMsRUFBQSxLQUFLLEdBQUcsV0FBVyxDQUFDLGFBQVosQ0FBMEIsbUJBQTFCLENBQVI7QUFFQSxFQUFBLEtBQUssQ0FBQyxnQkFBTixDQUF1QixPQUF2QixFQUErQixZQUFVO0FBQ3hDLElBQUEsSUFBSSxHQUFHLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixTQUE3QixFQUF3QyxPQUF4QyxDQUFpRCxVQUFDLElBQUQsRUFBVTtBQUNoRSxVQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBTCxDQUFtQixrQkFBbkIsRUFBdUMsT0FBdkMsQ0FBK0MsT0FBaEU7QUFBQSxVQUNDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBTCxDQUFtQixrQkFBbkIsQ0FEakI7QUFBQSxVQUVDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBTCxDQUFtQixnQkFBbkIsQ0FGZjtBQUlBLE1BQUEsYUFBYSxDQUFDLFNBQWQsR0FBMEIsVUFBMUI7QUFDQSxNQUFBLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLFVBQXBCO0FBQ0QsS0FQTSxDQUFQO0FBUUEsR0FURDtBQVVBLENBYkQ7O0FBY0EsWUFBWTtBQUdaLElBQUksV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxXQUFXLENBQUMsZ0JBQVosQ0FBNkIsYUFBN0IsQ0FBWCxDQUFsQjtBQUNBLElBQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFaLENBQTBCLG1CQUExQixDQUF0Qjs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0I7QUFDckIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLGFBQXBCO0FBQ0EsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBUixDQUFnQixPQUE1QjtBQUNBLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxhQUFKLENBQWtCLGVBQWxCLENBQWpCO0FBQ0EsRUFBQSxHQUFHLENBQUMsU0FBSixDQUFjLE1BQWQsQ0FBcUIsUUFBckI7O0FBQ0EsTUFBSSxHQUFHLENBQUMsU0FBSixDQUFjLFFBQWQsQ0FBdUIsUUFBdkIsQ0FBSixFQUFzQztBQUNyQyxJQUFBLFFBQVEsQ0FBQyxXQUFULEdBQXVCLGFBQXZCO0FBQ0EsSUFBQSxXQUFXLENBQUMsSUFBWixDQUFpQixFQUFqQjtBQUNBLEdBSEQsTUFHTztBQUNOLElBQUEsUUFBUSxDQUFDLFdBQVQsR0FBdUIsZ0JBQXZCO0FBQ0EsSUFBQSxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQVosQ0FBb0IsVUFBQSxHQUFHO0FBQUEsYUFBSSxHQUFHLEtBQU0sRUFBYjtBQUFBLEtBQXZCLENBQWQ7QUFDQTs7QUFDRCxFQUFBLGFBQWEsQ0FBQyxXQUFkLEdBQTRCLEtBQU0sV0FBVyxDQUFDLE1BQTlDO0FBQ0E7O0FBRUQsSUFBSSxTQUFTLENBQUMsTUFBZCxFQUFzQjtBQUNyQixFQUFBLFNBQVMsQ0FBQyxPQUFWLENBQW1CLFVBQUEsRUFBRSxFQUFJO0FBQ3hCLElBQUEsRUFBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQVk7QUFDeEMsTUFBQSxPQUFPLENBQUMsRUFBRCxDQUFQO0FBQ0EsS0FGRDtBQUdBLEdBSkQ7QUFLQSxDLENBRUQ7OztBQUNBLElBQUksWUFBWSxHQUFHLEVBQW5CO0FBQ0EsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxXQUFXLENBQUMsZ0JBQVosQ0FBNkIsY0FBN0IsQ0FBWCxDQUFuQjtBQUNBLElBQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxhQUFaLENBQTBCLG9CQUExQixDQUF2Qjs7QUFFQSxTQUFVLFFBQVYsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDdkIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLGFBQXBCO0FBQ0EsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBUixDQUFnQixPQUE1QjtBQUNBLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxhQUFKLENBQWtCLGVBQWxCLENBQWpCO0FBQ0EsRUFBQSxHQUFHLENBQUMsU0FBSixDQUFjLE1BQWQsQ0FBcUIsUUFBckI7O0FBQ0EsTUFBSSxHQUFHLENBQUMsU0FBSixDQUFjLFFBQWQsQ0FBdUIsUUFBdkIsQ0FBSixFQUFzQztBQUNyQyxJQUFBLFFBQVEsQ0FBQyxXQUFULEdBQXVCLGFBQXZCO0FBQ0EsSUFBQSxZQUFZLENBQUMsSUFBYixDQUFrQixFQUFsQjtBQUNBLEdBSEQsTUFHTztBQUNOLElBQUEsUUFBUSxDQUFDLFdBQVQsR0FBdUIsYUFBdkI7QUFDQSxJQUFBLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBYixDQUFxQixVQUFBLEdBQUc7QUFBQSxhQUFJLEdBQUcsS0FBTSxFQUFiO0FBQUEsS0FBeEIsQ0FBZjtBQUNBOztBQUNELEVBQUEsY0FBYyxDQUFDLFdBQWYsR0FBNkIsS0FBTSxZQUFZLENBQUMsTUFBaEQ7QUFDQTs7QUFFRCxJQUFJLFVBQVUsQ0FBQyxNQUFmLEVBQXVCO0FBQ3RCLEVBQUEsVUFBVSxDQUFDLE9BQVgsQ0FBb0IsVUFBQSxFQUFFLEVBQUk7QUFDekIsSUFBQSxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBWTtBQUN4QyxNQUFBLFFBQVEsQ0FBQyxFQUFELENBQVI7QUFDQSxLQUZEO0FBR0EsR0FKRDtBQUtBOztBQUlELElBQUksT0FBTyxHQUFHO0FBQ2IsRUFBQSxLQUFLLEVBQUUsV0FBVyxDQUFDLGdCQUFaLENBQTZCLFdBQTdCLENBRE07QUFFYixFQUFBLFNBQVMsRUFBRSxXQUFXLENBQUMsZ0JBQVosQ0FBNkIsYUFBN0IsQ0FGRTtBQUdiLEVBQUEsSUFBSSxFQUFFLFdBQVcsQ0FBQyxnQkFBWixDQUE2QixZQUE3QixDQUhPO0FBSWIsRUFBQSxNQUFNLEVBQUUsV0FBVyxDQUFDLGFBQVosQ0FBMEIsY0FBMUI7QUFKSyxDQUFkLEMsQ0FRQTs7QUFDQSxJQUFHLE9BQU8sQ0FBQyxLQUFSLENBQWMsTUFBakIsRUFBd0I7QUFDdkIsRUFBQSxPQUFPLENBQUMsSUFBUjtBQUNBLEMsQ0FDRDs7O0FBQ0EsSUFBRyxPQUFPLENBQUMsU0FBUixDQUFrQixNQUFyQixFQUE0QjtBQUMzQixFQUFBLFNBQVM7QUFDVCxDLENBQ0Q7OztBQUNBLElBQUcsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFoQixFQUF1QjtBQUN0QixFQUFBLElBQUk7QUFDSixDLENBQ0Q7OztBQUNBLElBQUcsT0FBTyxDQUFDLE1BQVIsQ0FBZSxNQUFsQixFQUF5QjtBQUN4QixFQUFBLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBVCxDQUFaO0FBQ0E7OztBQ3ZQRDs7Ozs7Ozs7QUFFQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDdkQ7QUFBQSwyQ0FBTyxRQUFQO0FBQUE7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYm9keUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4vL01vYmlsZSBOYXYgVG9nZ2xlXHJcbmNvbnN0IG1vYmlsZU5hdiA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc3QgJHNpdGVXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtd3JhcCcpO1xyXG5cdGNvbnN0ICRidXJnZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbmF2LWJ0bicpO1xyXG5cdCRzaXRlV3JhcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdGxldCB0YXJnZXQgPSBldnQudGFyZ2V0O1xyXG5cclxuXHRcdGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGVhZGVyX19uYXYtLWFjdGl2ZScpICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpdGUtd3JhcC0tb3ZlcmxheScpKSB7XHJcblx0XHRcdHRvZ2dsZU1lbnUoICRidXJnZXJCdG4gKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JGJ1cmdlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdHRvZ2dsZU1lbnUoIHRoaXMgKTtcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gdG9nZ2xlTWVudShlbGVtKSB7XHJcblx0XHRlbGVtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG5cdFx0ZWxlbS5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX19uYXYtLWFjdGl2ZScpO1xyXG5cdFx0JHNpdGVXcmFwLmNsYXNzTGlzdC50b2dnbGUoJ3NpdGUtd3JhcC0tb3ZlcmxheScpO1xyXG5cdH1cclxufVxyXG5cclxuLy9Nb2RhbHNcclxuY29uc3QgbW9kYWwgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbW9kYWwnKTtcclxuY29uc3QgbW9kYWxQYXJlbnQgPSBtb2RhbC5wYXJlbnRFbGVtZW50O1xyXG5jb25zdCBNT0RBTF9PUEVOID0gJ21vZGFsLW9wZW4nO1xyXG5cclxuY29uc3QgbXlNb2RhbCA9IHtcclxuXHRpbml0KCkge1xyXG5cdFx0Ym9keUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XHJcblx0XHRcdGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAodGFyZ2V0LmRhdGFzZXQubW9kYWwpIHtcclxuXHRcdFx0XHRjb25zdCB3aWR0aCA9IHRhcmdldC5kYXRhc2V0Lm1vZGFsV2lkdGggfHwgJzQwMCc7XHJcblx0XHRcdFx0dGhpcy5vcGVuKHRhcmdldC5kYXRhc2V0Lm1vZGFsLCB3aWR0aClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLW92ZXJsYXknKSB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1tb2RhbF9fY2xvc2UnKSkge1xyXG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRvcGVuKGlkLCB3aWR0aCkgeyAvLz09PT09PT09PT09PSBPUEVOXHJcblx0XHRjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XHJcblx0XHRib2R5RWxlbWVudC5jbGFzc0xpc3QuYWRkKE1PREFMX09QRU4pO1xyXG5cdFx0Y29uc3QgbmV3Q29udGVudCA9IHRlbXAuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG5cdFx0aWYgKHdpZHRoKSB7XHJcblx0XHRcdG1vZGFsLnN0eWxlLm1heFdpZHRoID0gd2lkdGggKyAncHgnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0Q29udGVudChuZXdDb250ZW50KTtcclxuXHRcdG1vZGFsUGFyZW50LmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXQnKTtcclxuXHRcdG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXQnKTtcclxuXHR9LFxyXG5cclxuXHRzZXRDb250ZW50KGh0bWwpIHtcclxuXHRcdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZXRjb250ZW50XScpO1xyXG5cdFx0Y29udGVudC5pbm5lckhUTUwgPSAnJztcclxuXHRcdGNvbnRlbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2UoKSB7IC8vPT09PT09PT09PT09IENMT1NFXHJcblx0XHRib2R5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKE1PREFMX09QRU4pO1xyXG5cdFx0bW9kYWxQYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZU91dCcpO1xyXG5cdFx0bW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZU91dCcpO1xyXG5cdFx0bW9kYWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIilcclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcbi8vQ2hlY2sgRmllbGQgTGVuZ3RoXHJcbmxldCBsZW5ndGhGaWx0ZXIgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG5cdGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxmdW5jdGlvbiAoKSB7XHJcblx0XHRsZXQgaW5uZXJFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtc2VhcmNoJyk7XHJcblx0XHRpZihpbm5lckVsZW0udmFsdWUubGVuZ3RoIDwgMil7XHJcblx0XHRcdGlubmVyRWxlbS5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGlubmVyRWxlbS52YWx1ZSA9ICcnO1xyXG5cdFx0XHRpbm5lckVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5cclxuXHJcbi8vVGFic1xyXG5mdW5jdGlvbiB0YWJzKCkge1xyXG5cdGxldCBiaW5kQWxsID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgbWVudUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG1lbnVFbGVtZW50cy5sZW5ndGggOyBpKyspIHtcclxuXHRcdFx0bWVudUVsZW1lbnRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hhbmdlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0bGV0IGNsZWFyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRsZXQgbWVudUVsZW1lbnRzID0gYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpO1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IG1lbnVFbGVtZW50cy5sZW5ndGggOyBpKyspIHtcclxuXHRcdFx0bWVudUVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRsZXQgaWQgPSBtZW51RWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsZXQgY2hhbmdlID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRjbGVhcigpO1xyXG5cdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRsZXQgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdH1cclxuXHRiaW5kQWxsKCk7XHJcbn1cclxuXHJcblxyXG4vL1NlbGVjdFxyXG5ib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaChzZWxlY3QgPT4ge1xyXG5cdGxldCBzZWxlY3RDdXJyZW50ID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2N1cnJlbnQnKSxcclxuXHRcdHNlbGVjdExpc3QgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fbGlzdCcpLFxyXG5cdFx0c2VsZWN0SW5wdXQgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faW5wdXQnKSxcclxuXHRcdHNlbGVjdEl0ZW0gPSBzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9faXRlbScpO1xyXG5cclxuXHRzZWxlY3RDdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0c2VsZWN0TGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RfX2xpc3QtLXNob3cnKTtcclxuXHR9KVxyXG5cclxuXHRzZWxlY3RJdGVtLmZvckVhY2goaXRlbSA9PntcclxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG5cclxuXHRcdFx0bGV0IGl0ZW1WYWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJylcclxuXHRcdFx0bGV0IGl0ZW1UZXh0ID0gaXRlbS50ZXh0Q29udGVudDtcclxuXHRcdFx0c2VsZWN0SW5wdXQudmFsdWUgPSBpdGVtVmFsdWU7XHJcblx0XHRcdHNlbGVjdEN1cnJlbnQudGV4dENvbnRlbnQgPSBpdGVtVGV4dDtcclxuXHRcdFx0c2VsZWN0TGlzdEhpZGUoKTtcclxuXHRcdH0pXHJcblx0fSlcclxuXHRsZXQgc2VsZWN0TGlzdEhpZGUgPSAoKSA9PiB7XHJcblx0XHRzZWxlY3RMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9fbGlzdC0tc2hvdycpXHJcblx0fVxyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+e1xyXG5cdFx0aWYgKCFzZWxlY3QuY29udGFpbnMoZS50YXJnZXQpKVx0c2VsZWN0TGlzdEhpZGUoKVxyXG5cdH0pXHJcbn0pXHJcblxyXG4vL0NsZWFyIFNlbGVjdHNcclxubGV0IHJlc2V0RmlsdGVycyAgPSBmdW5jdGlvbihyZXNldCxlbGVtKSB7XHJcblx0cmVzZXQgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVzZXQtZmlsdGVycycpO1xyXG5cclxuXHRyZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcclxuXHRcdGVsZW0gPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaCggKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRsZXQgZGVmYXVsdFZhbCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fY3VycmVudCcpLmRhdGFzZXQuZGVmYXVsdCxcclxuXHRcdFx0XHRcdHNlbGVjdEN1cnJlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2N1cnJlbnQnKSxcclxuXHRcdFx0XHRcdHNlbGVjdElucHV0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19pbnB1dCcpO1xyXG5cclxuXHRcdFx0XHRzZWxlY3RDdXJyZW50LmlubmVySFRNTCA9IGRlZmF1bHRWYWw7XHJcblx0XHRcdFx0c2VsZWN0SW5wdXQudmFsdWUgPSBkZWZhdWx0VmFsO1xyXG5cdFx0fSlcclxuXHR9KVxyXG59XHJcbnJlc2V0RmlsdGVycygpO1xyXG5cclxuXHJcbmxldCBjb21wYXJlRGF0YSA9IFtdO1xyXG5jb25zdCAkY29tcGFyZXMgPSBBcnJheS5mcm9tKGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jb21wYXJlJykpO1xyXG5jb25zdCAkY29tcGFyZVN0YXRlID0gYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXN0YXRlLWNvbXBhcmUnKTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmUoJGVsKSB7XHJcblx0Y29uc3QgJHBhcmVudCA9ICRlbC5wYXJlbnRFbGVtZW50O1xyXG5cdGNvbnN0IGlkID0gKyRwYXJlbnQuZGF0YXNldC5wcm9kdWN0O1xyXG5cdGNvbnN0IHRleHRXcmFwID0gJGVsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiA+IHNwYW4nKTtcclxuXHQkZWwuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblx0aWYgKCRlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcblx0XHR0ZXh0V3JhcC50ZXh0Q29udGVudCA9ICfQkiDRgdGA0LDQstC90LXQvdC40LgnO1xyXG5cdFx0Y29tcGFyZURhdGEucHVzaChpZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9Ch0YDQsNCy0L3QuNGC0Ywg0YLQvtCy0LDRgCc7XHJcblx0XHRjb21wYXJlRGF0YSA9IGNvbXBhcmVEYXRhLmZpbHRlciggbnVtID0+IG51bSAhPT0gIGlkICk7XHJcblx0fVxyXG5cdCRjb21wYXJlU3RhdGUudGV4dENvbnRlbnQgPSAnJyArIChjb21wYXJlRGF0YS5sZW5ndGgpO1xyXG59XHJcblxyXG5pZiAoJGNvbXBhcmVzLmxlbmd0aCkge1xyXG5cdCRjb21wYXJlcy5mb3JFYWNoKCBlbCA9PiB7XHJcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29tcGFyZShlbCk7XHJcblx0XHR9KVxyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBGYXZvcml0ZVxyXG5sZXQgZmF2b3JpdGVEYXRhID0gW107XHJcbmNvbnN0ICRmYXZvcml0ZXMgPSBBcnJheS5mcm9tKGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mYXZvcml0ZScpKTtcclxuY29uc3QgJGZhdm9yaXRlU3RhdGUgPSBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc3RhdGUtZmF2b3JpdGUnKTtcclxuXHJcbmZ1bmN0aW9uICBmYXZvcml0ZSgkZWwpIHtcclxuXHRjb25zdCAkcGFyZW50ID0gJGVsLnBhcmVudEVsZW1lbnQ7XHJcblx0Y29uc3QgaWQgPSArJHBhcmVudC5kYXRhc2V0LnByb2R1Y3Q7XHJcblx0Y29uc3QgdGV4dFdyYXAgPSAkZWwucXVlcnlTZWxlY3RvcignYnV0dG9uID4gc3BhbicpO1xyXG5cdCRlbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuXHRpZiAoJGVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9CSINC40LfQsdGA0LDQvdC90L7QvCc7XHJcblx0XHRmYXZvcml0ZURhdGEucHVzaChpZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRleHRXcmFwLnRleHRDb250ZW50ID0gJ9CSINC40LfQsdGA0LDQvdC90L7QtSc7XHJcblx0XHRmYXZvcml0ZURhdGEgPSBmYXZvcml0ZURhdGEuZmlsdGVyKCBudW0gPT4gbnVtICE9PSAgaWQgKTtcclxuXHR9XHJcblx0JGZhdm9yaXRlU3RhdGUudGV4dENvbnRlbnQgPSAnJyArIChmYXZvcml0ZURhdGEubGVuZ3RoKTtcclxufVxyXG5cclxuaWYgKCRmYXZvcml0ZXMubGVuZ3RoKSB7XHJcblx0JGZhdm9yaXRlcy5mb3JFYWNoKCBlbCA9PiB7XHJcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZmF2b3JpdGUoZWwpO1xyXG5cdFx0fSlcclxuXHR9KTtcclxufVxyXG5cclxuXHJcblxyXG5sZXQgcGx1Z2lucyA9IHtcclxuXHRtb2RhbDogYm9keUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW1vZGFsJyksXHJcblx0bW9iaWxlTmF2OiBib2R5RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbmF2LWJ0bicpLFxyXG5cdHRhYnM6IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKSxcclxuXHRmaWx0ZXI6IGJvZHlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNlYXJjaCcpLFxyXG59XHJcblxyXG5cclxuLy8gTW9kYWxcclxuaWYocGx1Z2lucy5tb2RhbC5sZW5ndGgpe1xyXG5cdG15TW9kYWwuaW5pdCgpO1xyXG59XHJcbi8vTW9iaWxlIE5hdlxyXG5pZihwbHVnaW5zLm1vYmlsZU5hdi5sZW5ndGgpe1xyXG5cdG1vYmlsZU5hdigpO1xyXG59XHJcbi8vVGFic1xyXG5pZihwbHVnaW5zLnRhYnMubGVuZ3RoKXtcclxuXHR0YWJzKCk7XHJcbn1cclxuLy9GaWx0ZXJcclxuaWYocGx1Z2lucy5maWx0ZXIubGVuZ3RoKXtcclxuXHRsZW5ndGhGaWx0ZXIocGx1Z2lucy5maWx0ZXIpO1xyXG59XHJcblxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGltcG9ydCgnLi9jb3JlJyk7XG59KTtcblxuIl19
