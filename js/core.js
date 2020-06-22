const bodyElement = document.querySelector('body');

//Mobile Nav Toggle
const mobileNav = function(){
	const $siteWrap = document.querySelector('.site-wrap');
	const $burgerBtn = document.querySelector('.js-nav-btn');
	$siteWrap.addEventListener('click', function (evt) {
		let target = evt.target;

		if (!target.classList.contains('header__nav--active') && target.classList.contains('site-wrap--overlay')) {
			toggleMenu( $burgerBtn );
		}
	});

	$burgerBtn.addEventListener('click', function () {
		toggleMenu( this );
	});

	function toggleMenu(elem) {
		elem.classList.toggle('active');
		elem.nextElementSibling.classList.toggle('header__nav--active');
		$siteWrap.classList.toggle('site-wrap--overlay');
	}
}

//Modals
const modal = bodyElement.querySelector('.js-modal');
const modalParent = modal.parentElement;
const MODAL_OPEN = 'modal-open';

const myModal = {
	init() {
		bodyElement.addEventListener('click', (evt) => {
			const target = evt.target;

			if (target.dataset.modal) {
				const width = target.dataset.modalWidth || '400';
				this.open(target.dataset.modal, width)
			}

			if (target.classList.contains('modal-overlay') || target.classList.contains('js-modal__close')) {
				this.close();
			}
		})
	},

	open(id, width) { //============ OPEN
		const temp = document.querySelector(id);
		bodyElement.classList.add(MODAL_OPEN);
		const newContent = temp.content.cloneNode(true);

		if (width) {
			modal.style.maxWidth = width + 'px';
		}

		this.setContent(newContent);
		modalParent.classList.add('fadeOut');
		modal.classList.add('fadeOut');
	},

	setContent(html) {
		const content = document.querySelector('[data-setcontent]');
		content.innerHTML = '';
		content.appendChild(html);
	},

	close() { //============ CLOSE
		bodyElement.classList.remove(MODAL_OPEN);
		modalParent.classList.remove('fadeOut');
		modal.classList.remove('fadeOut');
		modal.removeAttribute("style")
	}
};



//Check Field Length
let lengthFilter = function (elem) {
	elem.addEventListener('submit',function () {
		let innerElem = elem.querySelector('.input-search');
		if(innerElem.value.length < 2){
			innerElem.classList.add('error');
		}else{
			innerElem.value = '';
			innerElem.classList.remove('error');
		}
	})
}



//Tabs
function tabs() {
	let bindAll = function() {
		let menuElements = document.querySelectorAll('[data-tab]');
		for(let i = 0; i < menuElements.length ; i++) {
			menuElements[i].addEventListener('click', change);
		}
	}
	let clear = function() {
		let menuElements = bodyElement.querySelectorAll('[data-tab]');
		for(let i = 0; i < menuElements.length ; i++) {
			menuElements[i].classList.remove('active');
			let id = menuElements[i].getAttribute('data-tab');
			document.getElementById(id).classList.remove('active');
		}
	}

	let change = function(e) {
		e.preventDefault()
		clear();
		e.target.classList.add('active');
		let id = e.currentTarget.getAttribute('data-tab');
		document.getElementById(id).classList.add('active');
	}
	bindAll();
}


//Select
bodyElement.querySelectorAll('.select').forEach(select => {
	let selectCurrent = select.querySelector('.select__current'),
		selectList = select.querySelector('.select__list'),
		selectInput = select.querySelector('.select__input'),
		selectItem = select.querySelectorAll('.select__item');

	selectCurrent.addEventListener('click', () => {
		selectList.classList.toggle('select__list--show');
	})

	selectItem.forEach(item =>{
		item.addEventListener('click', ()=>{

			let itemValue = item.getAttribute('data-value')
			let itemText = item.textContent;
			selectInput.value = itemValue;
			selectCurrent.textContent = itemText;
			selectListHide();
		})
	})
	let selectListHide = () => {
		selectList.classList.remove('select__list--show')
	}

	document.addEventListener('mouseup', (e) =>{
		if (!select.contains(e.target))	selectListHide()
	})
})

//Clear Selects
let resetFilters  = function(reset,elem) {
	reset = bodyElement.querySelector('.js-reset-filters');

	reset.addEventListener('click',function(){
		elem = bodyElement.querySelectorAll('.select').forEach( (item) => {
				let defaultVal = item.querySelector('.select__current').dataset.default,
					selectCurrent = item.querySelector('.select__current'),
					selectInput = item.querySelector('.select__input');

				selectCurrent.innerHTML = defaultVal;
				selectInput.value = defaultVal;
		})
	})
}
resetFilters();


let compareData = [];
const $compares = Array.from(bodyElement.querySelectorAll('.js-compare'));
const $compareState = bodyElement.querySelector('.js-state-compare');

function compare($el) {
	const $parent = $el.parentElement;
	const id = +$parent.dataset.product;
	const textWrap = $el.querySelector('button > span');
	$el.classList.toggle('active');
	if ($el.classList.contains('active')) {
		textWrap.textContent = 'В сравнении';
		compareData.push(id);
	} else {
		textWrap.textContent = 'Сравнить товар';
		compareData = compareData.filter( num => num !==  id );
	}
	$compareState.textContent = '' + (compareData.length);
}

if ($compares.length) {
	$compares.forEach( el => {
		el.addEventListener('click', function () {
			compare(el);
		})
	});
}

// Favorite
let favoriteData = [];
const $favorites = Array.from(bodyElement.querySelectorAll('.js-favorite'));
const $favoriteState = bodyElement.querySelector('.js-state-favorite');

function  favorite($el) {
	const $parent = $el.parentElement;
	const id = +$parent.dataset.product;
	const textWrap = $el.querySelector('button > span');
	$el.classList.toggle('active');
	if ($el.classList.contains('active')) {
		textWrap.textContent = 'В избранном';
		favoriteData.push(id);
	} else {
		textWrap.textContent = 'В избранное';
		favoriteData = favoriteData.filter( num => num !==  id );
	}
	$favoriteState.textContent = '' + (favoriteData.length);
}

if ($favorites.length) {
	$favorites.forEach( el => {
		el.addEventListener('click', function () {
			favorite(el);
		})
	});
}



let plugins = {
	modal: bodyElement.querySelectorAll('.js-modal'),
	mobileNav: bodyElement.querySelectorAll('.js-nav-btn'),
	tabs: bodyElement.querySelectorAll('[data-tab]'),
	filter: bodyElement.querySelector('.form-search'),
}


// Modal
if(plugins.modal.length){
	myModal.init();
}
//Mobile Nav
if(plugins.mobileNav.length){
	mobileNav();
}
//Tabs
if(plugins.tabs.length){
	tabs();
}
//Filter
if(plugins.filter.length){
	lengthFilter(plugins.filter);
}


