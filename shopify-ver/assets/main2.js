import { animate, spring } from 'https://cdn.jsdelivr.net/npm/animejs/+esm';

const SHOP_LEFT_ID = '.shop-item-box .l';
const SHOP_RIGHT_ID = '.shop-item-box .r';
const POPOUT_HOVER_ID = '.popout-hover';
const PRODUCT_SHOWCASE_ID = '.product-showcase';
const SHOP_SIDE_EDGE_PEEK_PX = 6;

let initialized = false;
let bootstrapped = false;

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

function initializeProductShowcases() {
  document.querySelectorAll(PRODUCT_SHOWCASE_ID).forEach(showcase => {
    const mainImage = showcase.querySelector('.showcase-main');
    const thumbs = showcase.querySelectorAll('.showcase-thumb');

    if (!mainImage || thumbs.length === 0) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const nextSrc = thumb.dataset.src;
        if (!nextSrc || nextSrc === mainImage.getAttribute('src')) return;

        const nextAlt = thumb.dataset.alt || mainImage.getAttribute('alt') || '';

        mainImage.setAttribute('src', nextSrc);
        mainImage.setAttribute('alt', nextAlt);

        thumbs.forEach(item => item.classList.remove('is-active'));
        thumb.classList.add('is-active');

        animate(mainImage, {
          opacity: [0.35, 1],
          scale: [0.96, 1],
          duration: 220,
          ease: 'out(2)'
        });
      });
    });
  });
}

function initializeAnimations() {
  if (initialized) return;
  initialized = true;

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

  initializeProductShowcases();

  document.querySelectorAll(POPOUT_HOVER_ID).forEach(el => {
    el.addEventListener('mouseenter', () => {
      const xOffset = randRange(-30, 30);
      const yOffset = randRange(-30, 30);
      const rotateOffset = randRange(-30, 30);

      animate(el, {
        scale: 1.4,
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
}

function bootstrapPageAnimations() {
  if (bootstrapped) return;
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
