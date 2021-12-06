'use strict';

// Selecting elements
const navEl = document.querySelector('#nav');
const navMenu = document.querySelector('#nav-menu');
const navToggle = document.querySelector('#nav-toggle');
const navLinks = document.querySelectorAll('.navigation__link');
const heroArrow = document.querySelector('#hero-arrow');
// sticky
const headerEl = document.querySelector('.header');
const heroEl = document.querySelector('.hero');

const toggle = function () {
	navEl.classList.toggle('show-nav');
	navMenu.classList.toggle('show-menu');
};
// ------------------------------------------------
// ---------- navigation functionality ------------
// ------------------------------------------------
// use the nav hamburger - remove the styles in desktop

if (navToggle) {
	navToggle.addEventListener('click', () => {
		console.log('😄');
		toggle();
	});
}

// ------------------------------------------------
// -------- remove nav using the links ------------
// ------------------------------------------------
navLinks.forEach(link => {
	link.addEventListener('click', e => {
		// prevent suddenly scene
		e.preventDefault();
		toggle();
		const id = link.getAttribute('href');

		const el = document.querySelector(id);
		if (el === '#') {
			return;
		} else {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// ------------------------------------------------
// -------- send arrow first section  -------------
// ------------------------------------------------
heroArrow.addEventListener('click', e => {
	e.preventDefault();
	const id = e.target.closest('#hero-arrow').getAttribute('href');

	document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// ------------------------------------------------
// ----------- sticky navigation ------------------
// ------------------------------------------------

// call this when my target instersects the element(root => viewport)
const heightHeader = headerEl.getBoundingClientRect().height;

const stickyCallback = function (entries) {
	const [entry] = entries;

	if (!entry.isIntersecting) headerEl.classList.add('sticky-nav');
	else headerEl.classList.remove('sticky-nav');
};

const stickyOptions = {
	// viewport
	root: null,
	// at the and of the hero
	threshold: 0,
	// show the header in its height
	rootMargin: `-${heightHeader}px`,
};

const observer = new IntersectionObserver(stickyCallback, stickyOptions);
observer.observe(heroEl);
