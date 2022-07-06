
(function() {
    var pressedKeys = {};//���水���Ķ���

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

       //��ֹĬ���¼�
     if (event.preventDefault ){
        event.preventDefault();
     }else{
        event.returnValue = false;
     }
     return false;

    }
      //����ĳһ��
    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });
    //�ɿ�ĳһ��
    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });
     //�Ѽ��̽���Ӷ����������������
    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();