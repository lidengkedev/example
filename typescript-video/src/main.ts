import './assets/css/main.css';
import popup from './components/popup/popup';
import video from './components/video/video';

window.onload = function () {
    let listItem = document.querySelectorAll('#list li')
    listItem.forEach(item => {
        item.addEventListener('click', function (e) {
            let url = this.dataset.url;
            let title = this.dataset.title
            console.log({url, title})
            popup({
                width: '880px',
                height: '556px',
                title,
                pos: 'center',
                mask: true,
                content(elem) {
                    console.log(elem);
                    video({
                        url,
                        elem,
                        height: '495px',
                        autoplay: true
                    })
                }
            })
        })
    })
}
