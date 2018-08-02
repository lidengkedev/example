;(function () {
	var DateScroll = function (container,column,scroll) {
		this.config = {};
		this.config.container = document.getElementById(container);
		this.config.column = this.config.container.getElementsByClassName(column);
		
		this.setDateLists();
		
		this.config.scroll = this.config.container.getElementsByClassName(scroll);
		this.setScrollEvent();
	}
	
	DateScroll.prototype = {
		setDateLists: function () {
			var _this = this;
			var getDate = new Date();
			var year = getDate.getFullYear();
			var month = getDate.getMonth() + 1;
			var day = getDate.getDay();
			
			_this.setSelectLists(_this.config.column[0],year);
			_this.setSelectLists(_this.config.column[1],12);
			_this.setSelectLists(_this.config.column[2],31)
		},
		setSelectLists: function (column,num) {
			var _this = this;
			var htmlStr = "";
			if (num > 31) {
				for (var i = (num - 5); i < (num + 5); i++) {
					htmlStr += '<li>' + i + '</li>';
				}
			} else {
				for (var i = 0; i < num; i++) {
					htmlStr += '<li>' + (i+1) + '</li>';
				}
			}
			var ul = document.createElement('ul');
				ul.className = "scroll";
				ul.innerHTML = htmlStr;
			var domHtml = document.createDocumentFragment();
				domHtml.appendChild(ul);
				column.appendChild(domHtml);
		},
		setScrollEvent: function () {
			var _this = this;
			for (let i = 0, len = _this.config.scroll.length; i < len; i++) {
				var disY = 0;
				_this.config.scroll[i].onmousedown = function (ev) {
					var mouseEvent = ev || event;
					disY = mouseEvent.clientY - _this.config.scroll[i].offsetTop + 30;
					_this.config.scroll[i].onmousemove = function (ev) {
						var mouseEvent = ev || event;
						maxTop = -1 * (_this.config.scroll[i].offsetHeight - 30*2);
						var distance = mouseEvent.clientY - disY;
						distance = distance > 0 ? 0 : distance;
						distance = distance < maxTop ? maxTop : distance;
						_this.config.scroll[i].style.top = distance + 'px';
					}
					document.onmouseup = function () {
						_this.config.scroll[i].onmousemove = null;
						document.onmouseup = null;
					}
					return false;
				}
			}
		}
	}
	window.DateScroll = DateScroll;
})()