import { animate, utils, createDraggable, spring, onScroll, createTimeline } from 'animejs';

const LOGO_ID = ".landing-logo";
const LOGO_OUTER_ID = ".landing-logo .outer";
const SHOP_ITEM_BOX_INNER_ID = ".shop-item-box";
const SHOP_LEFT_ID = ".shop-item-box .l";
const SHOP_RIGHT_ID = ".shop-item-box .r";
const POPOUT_HOVER_ID = ".popout-hover";
const SHOP_SIDE_EDGE_PEEK_PX = 6;

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
    
    // Increase rotation speed and scale when hovered on
    // LOGO_EL.addEventListener('mouseenter', () => {
    //     startLogoSpin(4000); // Increase rotation speed
    //     animate(LOGO_ID, {
    //         scale: 1.1,
    //         duration: 500,
    //         ease: spring({ bounce: .3 })
    //     });
    // });
    // LOGO_EL.addEventListener('mouseleave', () => {
    //     startLogoSpin(7500); // Reset rotation speed
    //     animate(LOGO_ID, {
    //         scale: 1,
    //         duration: 500,
    //         ease: spring({ bounce: .3 })
    //     });
    // });

    // Shop sides entrance on page open (start just peeking at viewport edges)
    const leftSide = document.querySelector(SHOP_LEFT_ID);
    const rightSide = document.querySelector(SHOP_RIGHT_ID);

    if (leftSide && rightSide) {
        const leftRect = leftSide.getBoundingClientRect();
        const rightRect = rightSide.getBoundingClientRect();

        const leftStartX = SHOP_SIDE_EDGE_PEEK_PX - leftRect.right;
        const rightStartX = (window.innerWidth - SHOP_SIDE_EDGE_PEEK_PX) - rightRect.left;

        animate(leftSide, {
            x: [leftStartX - 75, 0],
            rotate: [15, 0],
            ease: spring({ duration: 1750, bounce: 0.15 })
        });
        animate(rightSide, {
            x: [rightStartX + 75, 0],
            rotate: [-15, 0],
            ease: spring({ duration: 1750, bounce: 0.15 })
        });
    }
    // Shop item box entrance
    // animate(SHOP_ITEM_BOX_INNER_ID, {
    //     opacity: [0, 1],
    //     y: [30, 0],
    //     duration: 500
    // });

    document.querySelectorAll(POPOUT_HOVER_ID).forEach(el => {
        el.addEventListener('mouseenter', () => {
            const X_OFFSET = randRange(-30, 30), Y_OFFSET = randRange(-30, 30), ROTATE_OFFSET = randRange(-30, 30);
            animate(el, {
                scale: 1.3,
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
}

function bootstrapPageAnimations() {
    if (bootstrapped) { return; }
    bootstrapped = true;

    initializeAnimations();
    document.body.classList.add('is-loaded');
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
