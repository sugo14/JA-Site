import { animate, utils, createDraggable, spring } from 'animejs';

const LOGO_ID = '.landing-logo';
const LOGO_OUTER_ID = '.landing-logo .outer';
const LANDSCAPE_LEFT_ID = ".landscape.left";
const MOUNTAIN_LEFT_ID = ".mountains.left";
const LANDSCAPE_RIGHT_ID = ".landscape.right";
const MOUNTAIN_RIGHT_ID = ".mountains.right";

const [ $logo ] = utils.$(LOGO_ID);
let rotations = 0;

// Make the logo draggable around its center
createDraggable(LOGO_ID, {
	container: [0, 0, 0, 0],
	releaseEase: spring({ bounce: .5 })
});
// Make the logo come from the top initially
animate(LOGO_ID, {
	y: [-600, 0],
	duration: 2000
});

// Rotate the outer logo
animate(LOGO_OUTER_ID, {
	rotate: 360,
	ease: "",
	loop: true,
	loopDelay: 0, 
	duration: 7500
});

// Pull in the landscape when the page loads
animate(LANDSCAPE_LEFT_ID, {
	x: [-600, -100],
	rotate: [90, 0],
	ease: spring({ duration: 1500, bounce: 0.4 })
});
animate(MOUNTAIN_LEFT_ID, {
	x: [-400, -100],
	rotate: [-90, 0],
	ease: spring({ duration: 1500, bounce: 0.4 })
});
animate(LANDSCAPE_RIGHT_ID, {
	x: [600, 100],
	rotate: [-90, 0],
	ease: spring({ duration: 1500, bounce: 0.4 })
});
animate(MOUNTAIN_RIGHT_ID, {
	x: [400, 100],
	rotate: [90, 0],
	ease: spring({ duration: 1500, bounce: 0.4 })
});
