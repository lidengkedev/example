window.onload = function () {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = clientWidth / 10 + 'px';

    /**
     * Swiper 插件声明
     */
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
}