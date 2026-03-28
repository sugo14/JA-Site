import { animate, utils, createDraggable, spring, onScroll, createTimeline } from 'animejs';

const LOGO_ID = ".landing-logo";
const LOGO_OUTER_ID = ".landing-logo .outer";
const TAGLINE_ID = ".tagline"
const PAGE_SCROLL_TARGET_ID = "body";
const LANDSCAPE_LEFT_ID = ".landscape.left";
const OUTER_LANDSCAPE_LEFT_ID = ".outer-landscape.left";
const MOUNTAINS_LEFT_ID = ".mountains.left";
const OUTER_MOUNTAINS_LEFT_ID = ".outer-mountains.left";
const LANDSCAPE_RIGHT_ID = ".landscape.right";
const OUTER_LANDSCAPE_RIGHT_ID = ".outer-landscape.right";
const MOUNTAINS_RIGHT_ID = ".mountains.right";
const OUTER_MOUNTAINS_RIGHT_ID = ".outer-mountains.right";
const TWO_INNER_ID = ".two-inner";
const LIZARD_ID = ".animal.lizard";
const MONKEY_ID = ".animal.monkey";
const COUGAR_ID = ".animal.cougar";
const POPOUT_HOVER_ID = ".popout-hover";
const TEAM_PHOTO_ID = ".two-box img";

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
	if (initialized) { return; }
	initialized = true;

	// Make the logo draggable around its center
	createDraggable(LOGO_ID, {
		container: [0, 0, 0, 0],
		releaseEase: spring({ bounce: .5 })
	});
	// Logo entrance on page open
	animate(LOGO_ID, {
		y: ['-110vh', 0],
		duration: 2500
	});
	// Rotate the outer logo
	startLogoSpin(7500);
	
	// Increase rotation speed and scale when hovered on
	LOGO_EL.addEventListener('mouseenter', () => {
		startLogoSpin(4000); // Increase rotation speed
		animate(LOGO_ID, {
			scale: 1.1,
			duration: 500,
			ease: spring({ bounce: .3 })
		});
	});
	LOGO_EL.addEventListener('mouseleave', () => {
		startLogoSpin(7500); // Reset rotation speed
		animate(LOGO_ID, {
			scale: 1,
			duration: 500,
			ease: spring({ bounce: .3 })
		});
	});

	// Landscape entrance on page open
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

	// Landscape exit on scroll
	animate(OUTER_LANDSCAPE_LEFT_ID, {
		x: ['-3%', '-150%'],
		y: [0, 300],
		rotate: [0, 60],
		ease: 'linear',
		autoplay: onScroll({
			enter: 'top top-=250',
			leave: 'top bottom',
			sync: .4,
			// debug: true,
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
			sync: .4,
			// debug: true,
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
			sync: .4,
			// debug: true,
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
			sync: .4,
			// debug: true,
		})
	});

	// Tagline entrance on page open
	animate(TAGLINE_ID, {
		opacity: [0, 1],
		y: [30, 0],
		duration: 1000,
		delay: 500
	});
	// Make sticky tagline grow while scrolling through section two
	const IS_MOBILE_VIEW = window.matchMedia('(max-width: 700px)').matches;
	const TAGLINE_GROW_PROPS = IS_MOBILE_VIEW
		? { fontSize: ['35px', '52px'] }
		: { scale: [1, 1.5] };
	animate(TAGLINE_ID, {
		...TAGLINE_GROW_PROPS,
		color: ['#F3A530', '#FFF'],
		ease: 'linear',
		autoplay: onScroll({
			target: PAGE_SCROLL_TARGET_ID,
			enter: 'top top+=35vh',
			leave: 'top top+=100vh',
			sync: .8,
			// debug: true,
		})
	});

	// Section two body entrance on scroll
	animate(TWO_INNER_ID, {
		opacity: [0, 1],
		y: [30, 0],
		duration: 500,
		autoplay: onScroll({
			enter: 'bottom bottom-=50%',
		})
	});

	// Animal entrance on page open
	animate(LIZARD_ID, {
		x: [-400, 0],
		rotate: [90, 0],
		// ease: spring({ duration: 1500, bounce: 0.25 }),
		autoplay: onScroll({ target: '.two', enter: 'top top' }),
		// debug: true
	});
	animate(MONKEY_ID, {
		x: [400, 0],
		rotate: [30, 0],
		// ease: spring({ duration: 1500, bounce: 0.25 }),
		autoplay: onScroll({ target: '.two', enter: 'top top' }),
		// debug: true
	});
	animate(COUGAR_ID, {
		x: [400, 0],
		rotate: [90, 0],
		// ease: spring({ duration: 1500, bounce: 0.25 }),
		autoplay: onScroll({ target: '.two', enter: 'top top' }),
		// debug: true
	});

	document.querySelectorAll(POPOUT_HOVER_ID).forEach(el => {
		el.addEventListener('mouseenter', () => {
			const X_OFFSET = randRange(-20, 20), Y_OFFSET = randRange(-20, 20), ROTATE_OFFSET = randRange(-10, 10);
			animate(el, {
				scale: 1.1,
				x: X_OFFSET,
				y: Y_OFFSET,
				rotate: ROTATE_OFFSET,
				duration: 300,
				ease: spring({ bounce: .3 })
			});
		});
		el.addEventListener('mouseleave', () => {
			animate(el, {
				scale: 1,
				x: 0,
				y: 0,
				rotate: 0,
				duration: 300,
				ease: spring({ bounce: .3 })
			});
		});
	});

	const TEAM_PHOTO_EL = document.querySelector(TEAM_PHOTO_ID);
	TEAM_PHOTO_EL.addEventListener('mouseenter', () => {
		const X_OFFSET = randRange(-20, 20), Y_OFFSET = randRange(-20, 20), ROTATE_OFFSET = randRange(-10, 10);
		animate(TEAM_PHOTO_EL, {
			scale: 1.1,
			x: X_OFFSET,
			y: Y_OFFSET,
			rotate: [-3, ROTATE_OFFSET],
			duration: 300,
			ease: spring({ bounce: .3 })
		});
	});
	TEAM_PHOTO_EL.addEventListener('mouseleave', () => {
		animate(TEAM_PHOTO_EL, {
			scale: 1,
			x: 0,
			y: 0,
			rotate: -3,
			duration: 300,
			ease: spring({ bounce: .3 })
		});
	});
}

function bootstrapPageAnimations() {
	if (bootstrapped) { return; }
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
