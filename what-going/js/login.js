window.onload = function () {
  dom('.tab-warpper')[0].onclick = function(event) {
    const content = dom('.tab-content')
    const value = event.target.dataset.value
    if (value === '1') {
      content[0].className = 'tab-content active'
      content[1].className = 'tab-content'
    } else {
      content[0].className = 'tab-content'
      content[1].className = 'tab-content active'
    }
  }
}

const dom = function(selector) {
  return document.querySelectorAll(selector)
}
