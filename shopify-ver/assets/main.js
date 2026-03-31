import { animate, spring, onScroll } from 'https://cdn.jsdelivr.net/npm/animejs/+esm';

const LOGO_ID = '.landing-logo';
const LOGO_OUTER_ID = '.landing-logo .outer';
const TAGLINE_ID = '.tagline';
const PAGE_SCROLL_TARGET_ID = 'body';
const LANDSCAPE_LEFT_ID = '.landscape.left';
const OUTER_LANDSCAPE_LEFT_ID = '.outer-landscape.left';
const MOUNTAINS_LEFT_ID = '.mountains.left';
const OUTER_MOUNTAINS_LEFT_ID = '.outer-mountains.left';
const LANDSCAPE_RIGHT_ID = '.landscape.right';
const OUTER_LANDSCAPE_RIGHT_ID = '.outer-landscape.right';
const MOUNTAINS_RIGHT_ID = '.mountains.right';
const OUTER_MOUNTAINS_RIGHT_ID = '.outer-mountains.right';
const TWO_INNER_ID = '.two-inner';
const LIZARD_ID = '.animal.lizard';
const MONKEY_ID = '.animal.monkey';
const COUGAR_ID = '.animal.cougar';
const POPOUT_HOVER_ID = '.popout-hover';
const PROD_IMG_ID = '.prod-img';

let initialized = false;
let logoSpinAnimation = null;
let bootstrapped = false;

const LOGO_EL = document.querySelector(LOGO_ID);

function randRange(min, max) {
	return Math.random() * (max - min) + min;
}

function startLogoSpin(dur) {
	if (logoSpinAnimation) {
		logoSpinAnimation.pause?.();
		logoSpinAnimation.cancel?.();
	}

	logoSpinAnimation = animate(LOGO_OUTER_ID, {
		rotate: '+=360',
		ease: 'linear',
		loop: true,
		loopDelay: 0,
		duration: dur
	});
}

function initializeAnimations() {
	if (initialized) return;
	initialized = true;

	animate(LOGO_ID, {
		y: ['-110vh', 0],
		duration: 2500
	});

	startLogoSpin(7500);

	if (LOGO_EL) {
		LOGO_EL.addEventListener('mouseenter', () => {
			startLogoSpin(4000);
			animate(LOGO_ID, {
				scale: 1.1,
				duration: 500,
				ease: spring({ bounce: 0.3 })
			});
		});
		LOGO_EL.addEventListener('mouseleave', () => {
			startLogoSpin(7500);
			animate(LOGO_ID, {
				scale: 1,
				duration: 500,
				ease: spring({ bounce: 0.3 })
			});
		});
	}

	animate(LANDSCAPE_LEFT_ID, {
		x: ['-150%', 0],
		rotate: [60, 0],
		ease: spring({ duration: 2000, bounce: 0.2 })
	});
	animate(MOUNTAINS_LEFT_ID, {
		x: ['-140%', 0],
		rotate: [-60, 0],
		ease: spring({ duration: 2000, bounce: 0.2 })
	});
	animate(LANDSCAPE_RIGHT_ID, {
		x: ['150%', 0],
		rotate: [-60, 0],
		ease: spring({ duration: 2000, bounce: 0.2 })
	});
	animate(MOUNTAINS_RIGHT_ID, {
		x: ['140%', 0],
		rotate: [60, 0],
		ease: spring({ duration: 2000, bounce: 0.2 })
	});

	animate(OUTER_LANDSCAPE_LEFT_ID, {
		x: ['-3%', '-150%'],
		y: [0, 300],
		rotate: [0, 60],
		ease: 'linear',
		autoplay: onScroll({
			enter: 'top top-=250',
			leave: 'top bottom',
			sync: 0.4
		})
	});
	animate(OUTER_LANDSCAPE_RIGHT_ID, {
		x: ['3%', '150%'],
		y: [0, 300],
		rotate: [0, -60],
		ease: 'linear',
		autoplay: onScroll({
			enter: 'top top-=250',
			leave: 'top bottom',
			sync: 0.4
		})
	});
	animate(OUTER_MOUNTAINS_LEFT_ID, {
		x: ['-4%', '-100%'],
		y: [0, 150],
		rotate: [0, 60],
		ease: 'linear',
		autoplay: onScroll({
			enter: 'top top-=100',
			leave: 'top bottom+=100',
			sync: 0.4
		})
	});
	animate(OUTER_MOUNTAINS_RIGHT_ID, {
		x: ['5%', '100%'],
		y: [0, 150],
		rotate: [0, -60],
		ease: 'linear',
		autoplay: onScroll({
			enter: 'top top-=100',
			leave: 'top bottom+=100',
			sync: 0.4
		})
	});

	animate(TAGLINE_ID, {
		opacity: [0, 1],
		y: [30, 0],
		duration: 1000,
		delay: 500
	});

	const isMobileView = window.matchMedia('(max-width: 700px)').matches;
	const taglineGrowProps = isMobileView
		? { fontSize: ['35px', '52px'] }
		: { scale: [1, 1.5] };

	animate(TAGLINE_ID, {
		...taglineGrowProps,
		color: ['#F3A530', '#FFF'],
		ease: 'linear',
		autoplay: onScroll({
			target: PAGE_SCROLL_TARGET_ID,
			enter: 'top top+=35vh',
			leave: 'top top+=100vh',
			sync: 0.8
		})
	});

	animate(TWO_INNER_ID, {
		opacity: [0, 1],
		y: [30, 0],
		duration: 500,
		autoplay: onScroll({
			enter: 'bottom bottom-=50%'
		})
	});

	animate(LIZARD_ID, {
		x: [-400, 0],
		rotate: [90, 0],
		autoplay: onScroll({ target: '.two', enter: 'top top' })
	});
	animate(MONKEY_ID, {
		x: [400, 0],
		rotate: [30, 0],
		autoplay: onScroll({ target: '.two', enter: 'top top' })
	});
	animate(COUGAR_ID, {
		x: [400, 0],
		rotate: [90, 0],
		autoplay: onScroll({ target: '.two', enter: 'top top' })
	});

	document.querySelectorAll(POPOUT_HOVER_ID).forEach(el => {
		el.addEventListener('mouseenter', () => {
			const xOffset = randRange(-20, 20);
			const yOffset = randRange(-20, 20);
			const rotateOffset = randRange(-10, 10);
			animate(el, {
				scale: 1.1,
				x: xOffset,
				y: yOffset,
				rotate: rotateOffset,
				duration: 300,
				ease: spring({ bounce: 0.3 })
			});
		});
		el.addEventListener('mouseleave', () => {
			animate(el, {
				scale: 1,
				x: 0,
				y: 0,
				rotate: 0,
				duration: 300,
				ease: spring({ bounce: 0.3 })
			});
		});
	});

	animate(PROD_IMG_ID, {
		keyframes: [
			{ rotate: 30, duration: 220, ease: 'out(3)' },
			{ rotate: 0, ease: spring({ bounce: 0.85, duration: 400 }) }
		],
		loop: true,
		loopDelay: 150
	});

	// document.querySelectorAll(SHOP_LINK_ID).forEach(link => {
	// 	link.addEventListener('click', event => {
	// 		event.preventDefault();
	// 		window.alert('Online shopping available soon!');
	// 	});
	// });
}

function bootstrapPageAnimations() {
	if (bootstrapped) return;
	bootstrapped = true;

	document.body.classList.add('is-loaded');
	initializeAnimations();

	window.addEventListener('scroll', () => {
		const offset = window.scrollY * 0.5;
		document.body.style.backgroundPosition = `0px ${offset}px`;
	}, { passive: true });
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', bootstrapPageAnimations, { once: true });
	window.addEventListener('load', bootstrapPageAnimations, { once: true });
} else {
	bootstrapPageAnimations();
}
