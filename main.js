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

const [ $logo ] = utils.$(LOGO_ID);
let rotations = 0;

// Make the logo draggable around its center
createDraggable(LOGO_ID, {
	container: [0, 0, 0, 0],
	releaseEase: spring({ bounce: .5 })
});
// Logo entrance on page open
animate(LOGO_ID, {
	y: [-600, 0],
	duration: 2500
});
// Rotate the outer logo
animate(LOGO_OUTER_ID, {
	rotate: 360,
	ease: "",
	loop: true,
	loopDelay: 0, 
	duration: 7500
});

// Landscape entrance on page open
animate(LANDSCAPE_LEFT_ID, {
	x: [-600, -100],
	rotate: [90, 0],
	ease: spring({ duration: 1500, bounce: 0.25 })
});
animate(MOUNTAINS_LEFT_ID, {
	x: [-400, -100],
	rotate: [-90, 0],
	ease: spring({ duration: 1500, bounce: 0.25 })
});
animate(LANDSCAPE_RIGHT_ID, {
	x: [600, 100],
	rotate: [-90, 0],
	ease: spring({ duration: 1500, bounce: 0.25 })
});
animate(MOUNTAINS_RIGHT_ID, {
	x: [400, 100],
	rotate: [90, 0],
	ease: spring({ duration: 1500, bounce: 0.25 })
});

// Landscape exit on scroll
animate(OUTER_LANDSCAPE_LEFT_ID, {
	x: [0, -500],
	y: [0, 300],
	rotate: [0, 90],
	ease: 'linear',
	autoplay: onScroll({
		enter: 'top top-=250',
		leave: 'top bottom',
		sync: .4,
		// debug: true,
	})
});
animate(OUTER_LANDSCAPE_RIGHT_ID, {
	x: [0, 500],
	y: [0, 300],
	rotate: [0, -90],
	ease: 'linear',
	autoplay: onScroll({
		enter: 'top top-=250',
		leave: 'top bottom',
		sync: .4,
		// debug: true,
	})
});
animate(OUTER_MOUNTAINS_LEFT_ID, {
	x: [0, -300],
	y: [0, 150],
	rotate: [0, 90],
	ease: 'linear',
	autoplay: onScroll({
		enter: 'top top-=100',
		leave: 'top bottom+=100',
		sync: .4,
		// debug: true,
	})
});
animate(OUTER_MOUNTAINS_RIGHT_ID, {
	x: [0, 300],
	y: [0, 150],
	rotate: [0, -90],
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
animate(TAGLINE_ID, {
	scale: [1, 1.5],
	ease: 'linear',
	autoplay: onScroll({
		target: PAGE_SCROLL_TARGET_ID,
		enter: 'top top+=35vh',
		leave: 'top top+=75vh',
		sync: .8,
		// debug: true,
	})
});

animate(TWO_INNER_ID, {
	opacity: [0, 1],
	y: [30, 0],
	duration: 500,
	autoplay: onScroll({
		enter: 'bottom bottom-=50%',
		onEnter: (animation) => animation.play()
	})
});
