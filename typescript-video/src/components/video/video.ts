/**
 * 视频播放器的参数
 * width(宽度)
 * height(高度)
 * url(资源地址)
 * elem(元素)
 * autoplay(自动播放)
 */

// let styles = require('./video.css').default;
import styles from './video.css';

interface Ivideo {
    url: String;
    elem: string | HTMLElement;
    width?: string;
    height?: string;
    autoplay?: boolean;
}

interface Icomponent {
    tempContainer: HTMLElement,
    init: () => void,
    template: () => void,
    handle: () => void
}

function video(options: Ivideo) {
    return new Video(options);
}

class Video implements Icomponent {
    tempContainer;
    constructor(private settings: Ivideo) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            autoplay: true
        }, this.settings);
        this.init();
    }

    init() {
        this.template();
        this.handle();
    }

    template() {
        this.tempContainer = document.createElement('div');
        this.tempContainer.className = styles['video-warpper'];
        this.tempContainer.style.width = this.settings.width;
        this.tempContainer.style.height = this.settings.height;
        this.tempContainer.innerHTML = `
            <video class="${styles['video-inner']}" src="${this.settings.url}"></video>
            <div class="${styles['video-controls']}">
                <div class="${styles['video-progress']}">
                    <div class="${styles['video-progress-now']}"></div>
                    <div class="${styles['video-progress-suc']}"></div>
                    <div class="${styles['video-progress-bar']}"></div>
                </div>
                <div class="${styles['video-play']}">
                    <i class="iconfont icon-play ${styles['icon-play']}"></i>
                    <!--<i class="iconfont icon-pause ${styles['icon-pause']}"></i>-->
                </div>
                <div class="${styles['video-time']}">
                    <span>00:00</span> / <span>00:00</span>
                </div>
                <div class="${styles['video-fullscreen']}">
                    <i class="iconfont icon-fullscreen ${styles['icon-fullscreen']}"></i>
                </div>
                <div class="${styles['video-volume']}">
                    <i class="iconfont icon-volume ${styles['icon-volume']}"></i>
                    <div class="${styles['video-volume-progress']}">
                        <div class="${styles['video-volume-progress-now']}"></div>
                        <div class="${styles['video-volume-progress-bar']}"></div>
                    </div>
                </div>
            </div>
        `
        if (typeof this.settings.elem === 'object') {
            this.settings.elem.appendChild(this.tempContainer);
        } else {
            this.settings.elem
            document.querySelector(`${this.settings.elem}`).appendChild(this.tempContainer);
        }
    }

    handle() {
        // videoInner 加上强制的类型 IDE 可以提示 videoInner 可以使用的API
        let videoInner: HTMLVideoElement = this.tempContainer.querySelector(`.${styles['video-inner']}`);
        let videoControls = this.tempContainer.querySelector(`.${styles['video-controls']}`);
        let videoPlay = this.tempContainer.querySelector(`.${styles['video-play']} i`);
        let videoTimes = this.tempContainer.querySelectorAll(`.${styles['video-time']} span`);
        let videoFullScreen = this.tempContainer.querySelector(`.${styles['video-fullscreen']} i`);
        let videoProgress = this.tempContainer.querySelectorAll(`.${styles['video-progress']} div`);
        let videoVolumeProgress = this.tempContainer.querySelectorAll(`.${styles['video-volume-progress']} div`);
        let timer;

        videoInner.volume = 0.5;

        // 是否进行自动播放处理
        if (this.settings.autoplay) {
            timer = setInterval(() => playing(), 1000);
            videoInner.play();
        }

        this.tempContainer.addEventListener('mouseenter', () => {
            videoControls.style.bottom = 0;
        })
        this.tempContainer.addEventListener('mouseleave', () => {
            videoControls.style.bottom = '-55px';
        })

        videoInner.addEventListener('canplay', () => {
            // 监听视频是否加载完毕
            videoTimes[1].innerHTML = formatTime(videoInner.duration);
        })

        videoInner.addEventListener('play', () => {
            // 监听视频播放
            videoPlay.classList.remove('icon-play')
            videoPlay.classList.add('icon-pause')
            timer = setInterval(() => playing(), 1000);
        })
        videoInner.addEventListener('pause', () => {
            // 监听视频停止
            videoPlay.classList.remove('icon-pause')
            videoPlay.classList.add('icon-play')
            clearInterval(timer);
        })
        videoPlay.addEventListener('click', () => {
            if (videoInner.paused) {
                videoInner.play();
                videoPlay.classList.remove('icon-pause')
                videoPlay.classList.add('icon-play')
            } else {
                videoInner.pause();
                videoPlay.classList.remove('icon-play')
                videoPlay.classList.add('icon-pause')
            }
        })
        // 全屏播放
        videoFullScreen.addEventListener('click', () => {
            videoInner.requestFullscreen();
        })
        // 拖动进度条
        videoProgress[2].addEventListener('mousedown', function (e: MouseEvent) {
            let downX = e.pageX;
            let downL = this.offsetLeft;
            document.onmousemove = (e: MouseEvent) => {
                let scale = (e.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
                if (scale < 0) {
                    scale = 0;
                } else if (scale > 1) {
                    scale = 1;
                }
                videoProgress[0].style.width = scale * 100 + '%';
                videoProgress[1].style.width = scale * 100 + '%';
                this.style.left = scale * 100 + '%';
                videoInner.currentTime = scale * videoInner.duration;
            }
            document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null;
            }
            e.preventDefault();
        })
        videoVolumeProgress[1].addEventListener('mousedown', function (e: MouseEvent) {
            let downX = e.pageX;
            let downL = this.offsetLeft;
            document.onmousemove = (e: MouseEvent) => {
                let scale = (e.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
                if (scale < 0) {
                    scale = 0;
                } else if (scale > 1) {
                    scale = 1;
                }
                videoVolumeProgress[0].style.width = scale * 100 + '%';
                this.style.left = scale * 100 + '%';
                videoInner.volume = scale;
            }
            document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null;
            }
            e.preventDefault();
        })
        function formatTime (number: number): string {
            number = Math.round(number);
            let min = Math.floor(number / 60);
            let sec = number % 60;
            return setZero(min) + ':' + setZero(sec);
        }
        function setZero(number: number):string {
            return number < 10 ? '0' + number : number + ''
        }
        // 监听播放中的状态
        function playing() {
            let scale = videoInner.currentTime / videoInner.duration;
            // videoInner.buffered.end(0) 获取视频预加载的时间
            let scaleSuc = videoInner.buffered.end(0) / videoInner.duration;
            videoTimes[0].innerHTML = formatTime(videoInner.currentTime);
            videoProgress[0].style.width = scale * 100 + '%';
            videoProgress[1].style.width = scaleSuc * 100 + '%';
            videoProgress[2].style.left = scale * 100 + '%';
        }
    }
}

export default video;