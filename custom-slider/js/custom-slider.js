;(function () {
	/**
	 * 初始化参数
	 * @param {Object} container  	String	盒子
	 * @param {Object} content		String	内容
	 * @param {Object} slider		String	滑块
	 * @param {Object} chute		String	滑条
	 */
	var CustomSlider = function (container,content,slider,chute) {
		//参数配置
		this.config = {
			container: document.getElementById(container),
			  content: document.getElementById(content),
			   slider: document.getElementById(slider),
			    chute: document.getElementById(chute),
			     disY: 0
		}
		//注册事件
		this.addEvent();
	}
	//原型共享
	CustomSlider.prototype = {
		//注册事件
		addEvent: function () {
			var _this = this;
			//鼠标按下响应事件
			_this.config.slider.onmousedown = function (ev) {
				var mouseEvent = ev || event;
				//计算鼠标到滑块边缘的Y轴坐标距离
				_this.config.disY = mouseEvent.clientY - _this.config.chute.offsetTop;
				//鼠标拖动响应事件
				document.onmousemove = function (ev) {
					var mouseEvent = ev || event;
					//计算滑块滑动距离
					var sliderTop = mouseEvent.clientY - _this.config.disY;
					//计算滑块最大滑动距离
					var maxTop = _this.config.chute.offsetHeight - _this.config.slider.offsetHeight;
					//判断滑块Y轴滑动上限
					sliderTop = sliderTop < 0 ? 0 : sliderTop;
					//判断滑块Y轴滑动下限
					sliderTop = sliderTop > maxTop ? maxTop : sliderTop;
					//设定滑块滑动Y轴位置
					_this.config.slider.style.top = sliderTop + 'px';
					//计算滑块与滑槽的比值
					var scale = sliderTop / maxTop;
					//设置内容区域的跟随滑动位置
					_this.config.content.style.top = -1 * scale * (_this.config.content.offsetHeight - _this.config.container.offsetHeight) + 'px';
				};
				//注册鼠标弹起事件
				document.onmouseup = _this.mouseUp;
				//阻止默认事件
				return false;
			};
		},
		//鼠标弹起响应事件
		mouseUp: function (ev) {
			//注销事件绑定
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
	window.CustomSlider = CustomSlider;
})()