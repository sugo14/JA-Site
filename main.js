import { animate, utils, createDraggable, spring } from 'animejs';

const LOGO_ID = '.logo';
const LOGO_OUTER_ID = '.logo .outer';

const [ $logo ] = utils.$(LOGO_ID);
let rotations = 0;

// Make the logo draggable around its center
createDraggable(LOGO_ID, {
	container: [0, 0, 0, 0],
	releaseEase: spring({ bounce: .5 })
});

// Rotate the outer logo
animate(LOGO_OUTER_ID, {
	rotate: 360,
	ease: "",
	loop: true,
	loopDelay: 0, 
	duration: 7500
});
