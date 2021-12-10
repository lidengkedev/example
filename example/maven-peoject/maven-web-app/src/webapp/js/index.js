var javascriptAjax = (function() {
    /**
     * 判断参数是否为空
     * @param {Object} data
     */
    var isObject = function(data) {
            return typeof data === 'object' ? (JSON.stringify(data) === '{}' ? false : true) : false;
        }
        /**
         * 配置参数
         * 参数对象转换为字符串拼接
         * @param {Object} obj
         */
    var setParamsConfig = function(obj) {
            var dataStr = '';
            if (isObject(obj)) {
                for (key in obj) {
                    dataStr += key + '=' + obj[key] + '&'
                }
            }
            return dataStr;
        }
        //1.生成请求对象，XMLHTTPReQuest，通过该对象和服务器交互
    var createXHR = function() {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest(); //非IE
            } else {
                xhr = new ActiveXObject();
            }
            return xhr;
        }
        //2.使用open，设置请求方式以及请求的地址，参数名必须和服务器保持一致
    var setRequestMethod = function(params) {
            var xhr = createXHR();
            var type = params.type ? params.type : 'get';
            var url = params.url ? params.url : '';
            var async = params.async ? params.async : true;
            switch (type) {
                case 'get':
                    url += '?' + setParamsConfig(params.data);
                    break;
                case 'post':
                    break;
                default:
                    break;
            }
            xhr.open(type, url, async);
            return xhr;
        }
        //3.设置请求过程的监控
    var listenRequestProcess = function(params) {
            var xhr = setRequestMethod(params);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        params.success(JSON.parse(xhr.response))
                    }
                }
            }
            return xhr;
        }
        //4.发送请求
    var sendAjax = function(params) {
        var xhr = listenRequestProcess(params);
        if (isObject(params.data)) {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlenconded");
            xhr.send(setParamsConfig(params.data));
        } else {
            xhr.send();
        }
    }

    return sendAjax;

})()

javascriptAjax({
    type: 'get',
    url: '/logo/get',
    async: true,
    data: {
        username: 'zhangsan'
    },
    success: function(res) {
        console.log(res);
    }
});