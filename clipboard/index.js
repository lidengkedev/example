window.onload = function () {
  const target = document.getElementById('btn')
  const clipboard = new Clipboard({
    trigger: target
  })
  target.onclick = function() {
    clipboard.copyText()
  }

}

class Clipboard {
  constructor(options) {
    this.trigger = options.trigger
    this.fakeEle = null
  }

  selectFake () {

    this.removeFake()

    this.fakeEle = document.createElement('textarea')
    this.fakeEle.style.fontSize = '12pt';
    this.fakeEle.style.border = '0';
    this.fakeEle.style.padding = '0';
    this.fakeEle.style.margin = '0';
    this.fakeEle.style.position = 'absolute';
    this.fakeEle.style.left = '-9999px';
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.fakeEle.style.top = `${yPosition}px`
    this.fakeEle.setAttribute('readonly', '');
    this.fakeEle.value = getAttributeValue('action', this.trigger)
    
    document.body.appendChild(this.fakeEle)
    
    document.addEventListener('copy', this.onCopy, false)
  }

  removeFake () {
    if (this.fakeEle) {
      document.removeEventListener('copy', this.onCopy, false)
      document.body.removeChild(this.fakeEle)
      this.fakeEle = null
    }
  }

  selectTarget () {
    const selection = window.getSelection()
    const range = document.createRange()

    this.selectFake()

    range.selectNode(this.fakeEle)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()
  }

  clearSelection () {
    window.getSelection().removeAllRanges()
  }

  copyText () {
    this.selectTarget()
  }

  onCopy (e) {
    // e.preventDefault();
    const copyMsg = window.getSelection()
    e.clipboardData.setData("Text", copyMsg)
  }
}

function getAttributeValue(suffix, element) {
  const attribute = `data-clipboard-${suffix}`
  return element.getAttribute(attribute)
}