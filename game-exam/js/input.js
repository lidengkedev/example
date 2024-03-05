
(function() {
    var pressedKeys = {};//保存按键的对象

    function setKey(event, status) {
      var code = event.keyCode || event.which;

        var key;

        switch(code) {
        case 32:
            key = 'SPACE'; break;
        case 37:
            key = 'LEFT'; break;
        case 38:
            key = 'UP'; break;
        case 39:
            key = 'RIGHT'; break;
        case 40:
            key = 'DOWN'; break;
        default:
            // Convert ASCII codes to letters
            key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;

       //阻止默认事件
     if (event.preventDefault ){
        event.preventDefault();
     }else{
        event.returnValue = false;
     }
     return false;

    }
      //按下某一键
    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });
    //松开某一键
    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });
     //把键盘焦点从顶层浏览器窗口移走
    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();