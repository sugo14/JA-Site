import { animate, utils, createDraggable, spring, onScroll, createTimeline } from 'animejs';

const LOGO_ID = ".landing-logo";
const LOGO_OUTER_ID = ".landing-logo .outer";
const SHOP_ITEM_BOX_INNER_ID = ".shop-item-box";
const SHOP_LEFT_ID = ".shop-item-box .l";
const SHOP_RIGHT_ID = ".shop-item-box .r";
const POPOUT_HOVER_ID = ".popout-hover";

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

    // Landscape entrance on page open
    animate(SHOP_LEFT_ID, {
        x: ['-150%', 0],
        rotate: [15, 0],
        ease: spring({ duration: 1500, bounce: 0.2 })
    });
    animate(SHOP_RIGHT_ID, {
        x: ['150%', 0],
        rotate: [-15, 0],
        ease: spring({ duration: 1500, bounce: 0.2 })
    });
    // Shop item box entrance
    // animate(SHOP_ITEM_BOX_INNER_ID, {
    //     opacity: [0, 1],
    //     y: [30, 0],
    //     duration: 500
    // });

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
