/*
var nextData = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
var gameData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var nextDivs = []
var gameDivs = []
var initGame = function() {
  for (var i = 0, len = gameData.length; i < len; i++) {
    var gameDiv = []
    for (var j = 0; j < gameData[0].length; j++) {
      var newNode = document.createElement('div')
      newNode.className = 'none'
      newNode.style.top = (i * 20) + 'px'
      newNode.style.left = (j * 20) + 'px'
      document.getElementById('game').appendChild(newNode)
      gameDiv.push(newNode)
    }
    gameDivs.push(gameDiv)
  }
}
var initNext = function() {
  for (var i = 0, len = nextData.length; i < len; i++) {
    var nextDiv = []
    for (var j = 0; j < nextData[0].length; j++) {
      var newNode = document.createElement('div')
      newNode.className = 'none'
      newNode.style.top = (i * 20) + 'px'
      newNode.style.left = (j * 20) + 'px'
      document.getElementById('next').appendChild(newNode)
      nextDiv.push(newNode)
    }
    nextDivs.push(nextDiv)
  }
}
var refrshGame = function() {
  for (var i = 0; i < gameData.length; i++) {
    for (var j = 0; j < gameData[0].length; j++) {
      if (gameData[i][j] === 0) {
        gameDivs[i][j].className = 'none'
      } else if (gameData[i][j] === 1) {
        gameDivs[i][j].className = 'done'
      } else if (gameData[i][j] === 2) {
        gameDivs[i][j].className = 'current'
      }
    }
  }
}
var refrshNext = function() {
  for (var i = 0; i < nextData.length; i++) {
    for (var j = 0; j < nextData[0].length; j++) {
      if (nextData[i][j] === 0) {
        nextDivs[i][j].className = 'none'
      } else if (nextData[i][j] === 1) {
        nextDivs[i][j].className = 'done'
      } else if (nextData[i][j] === 2) {
        nextDivs[i][j].className = 'current'
      }
    }
  }
}

initGame()
initNext()
refrshGame()
refrshNext()
*/
// import Local from './js/local'

var local = new Local()
local.start()
var remote = new Remote()
remote.start(2, 2)
remote.bindEvents()
