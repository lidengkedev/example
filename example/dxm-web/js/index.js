var appSwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        stopOnLastSlide: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});