/**
 * 弹框的参数
 * width(宽度)
 * height(高度)
 * title(标题)
 * content(可以做成回调函数)
 * pos(位置)
 * mask(遮罩)
 */
// let styles = require('./popup.css').default
import styles from './popup.css';

interface Ipopup {
    width?: string,
    height?: string,
    title?: string,
    content?: (content: HTMLElement) => void,
    pos?: string,
    mask?: boolean
}

interface Icomponent {
    tempContainer: HTMLElement,
    init: () => void,
    template: () => void,
    handle: () => void
}

function popup(options: Ipopup) {
    return new Popup(options);
}

class Popup implements Icomponent {
    tempContainer;
    mask;
    constructor ( private settings: Ipopup) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            title: '',
            content: function () {},
            pos: 'center',
            mask: true
        }, this.settings)
        this.init();
    }

    // 初始化
    init() {
        this.template();
        this.settings.mask && this.createMask();
        this.handle();
        this.contentCallback();
    }

    // 创建模板
    template() {
        this.tempContainer = document.createElement('div');
        this.tempContainer.style.width = this.settings.width;
        this.tempContainer.style.height = this.settings.height;
        this.tempContainer.className = styles['popup-warpper'];
        this.tempContainer.innerHTML = `
            <div class="${styles['popup-header']}">
                <h3 class="${styles['popup-title']}">${this.settings.title}</h3>
                <i class="iconfont icon-close ${styles['icon-close']}"></i>
            </div>
            <div class="${styles['popup-body']}"></div>
        `;
        document.body.appendChild(this.tempContainer)
        if (this.settings.pos === 'left') {
            this.tempContainer.style.left = '0px';
            this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) / 2 + 'px';
        } else if (this.settings.pos === 'right') {

        }
        this.tempContainer.style.left = (window.innerWidth - this.tempContainer.offsetWidth) / 2 + 'px';
        this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) / 2 + 'px';
    }

    // 事件操作
    handle() {
        let popupClose = this.tempContainer.querySelector(`.${styles['icon-close']}`);
        popupClose.addEventListener('click', () => {
            document.body.removeChild(this.tempContainer);
            this.settings.mask && document.body.removeChild(this.mask);
        })
    }

    // 创建蒙层
    createMask() {
        this.mask = document.createElement('div')
        this.mask.className = styles.mask;
        this.mask.style.width = '100%';
        this.mask.style.height = document.documentElement.clientHeight + 'px';
        document.body.appendChild(this.mask);
    }

    // 创建内容区域回调
    contentCallback() {
        let popupContent = this.tempContainer.querySelector(`.${styles['popup-body']}`);
        this.settings.content(popupContent);
    }
}

export default popup;