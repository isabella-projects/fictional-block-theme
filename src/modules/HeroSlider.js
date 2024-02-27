import Glide from '@glidejs/glide';

export default class HeroSlider {
    constructor() {
        const allSlideshows = document.querySelectorAll('.hero-slider');
        allSlideshows.forEach((currSlideshow) => {
            const dotCount = currSlideshow.querySelectorAll('.hero-slider__slide').length;

            // Generate the HTML for the navigation dots
            let dotHTML = '';
            for (let i = 0; i < dotCount; i++) {
                dotHTML += `<button class="slider__bullet glide__bullet" data-glide-dir="=${i}"></button>`;
            }

            // Add the dots HTML to the DOM
            currSlideshow.querySelector('.glide__bullets').insertAdjacentHTML('beforeend', dotHTML);

            // Actually initialize the glide / slider script
            var glide = new Glide(currSlideshow, {
                type: 'carousel',
                perView: 1,
                autoplay: 3000,
            });

            glide.mount();
        });
    }
}
