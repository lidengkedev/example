;(function () {
	/**
	 * 获取选择的时间
	 * @param {Object} selector
	 */
	var getDate = function (selector) {
		var parentSelector = document.getElementsByClassName(selector)[0];
		var inputTag = parentSelector.getElementsByTagName('input');
		var dateStr = inputTag[0].value.trim() + '/' 
					+ inputTag[1].value.trim() + '/' 
					+ inputTag[2].value.trim() + ' ' 
					+ inputTag[3].value.trim() + ':' 
					+ inputTag[4].value.trim() + ':' 
					+ inputTag[5].value.trim();
		return dateStr;
	}
	/**
	 * 获取前一个时间段的time值
	 */
	var getPreDate = function () {
		return new Date(getDate('time-select-pre')).getTime();
	}
	/**
	 * 获取后一个时间段的time值
	 */
	var getNextDate = function () {
		return new Date(getDate('time-select-next')).getTime();
	}
	/**
	 * 提示信息显示
	 * @param {Object} message
	 */
	var showAndHide = function (message) {
		setTimeout(function () {
			message.style.display = 'none';
		}, 800)
		return false;
	}
	/**
	 * 检查时间格式
	 * @param {Object} times
	 */
	var checkTimes = function (times) {
		var message = document.getElementById('message');
		if (times < 0) {
			message.style.display = 'block';
			message.firstElementChild.innerText = "前一个时间应小于后一个时间";
			return showAndHide(message);
		} else if(times != times) {
			message.style.display = 'block';
			message.firstElementChild.innerText = "请检查输入日期是否正确";
			return showAndHide(message);
		} else {
			return true;
		}
	}
	/**
	 * 计算时间结果
	 */
	var submitFunction = function () {
		var dateTimes = getNextDate() - getPreDate();			//计算两个时间之间的time差值
		if (!checkTimes(dateTimes)) return;
		var days = Math.floor(dateTimes/(24*60*60*1000));		//计算两个时间段相差的天数
		var levels1 = dateTimes%(24*60*60*1000);				//计算除天数外，剩余的小时
		var hours = Math.floor(levels1/(60*60*1000));			//计算两个时间段相差的小时
		var levels2 = levels1%(60*60*1000);						//计算除剩余小时数外，剩余的分钟
		var minutes = Math.floor(levels2/(60*1000));			//计算两个时间段相差的分钟
		var levels3 = levels2%(60*1000);						//计算除了剩余的分钟，剩余的秒数
		var seconds = Math.round(levels3/1000);					//计算两个时间段相差的秒数
		
		var hoursCount = Math.floor(dateTimes/(60*60*1000));	//计算两个时间段的总小时
		var minuteCount = Math.floor(dateTimes/(60*1000));		//计算两个时间段的总分钟
		var secondsCount = Math.round(dateTimes/1000);			//计算两个时间段的总秒数
		
		var resultTag = document.getElementsByClassName('result')[0];
		var tr = resultTag.getElementsByTagName('table')[0].rows;
		tr[0].cells[1].innerHTML = '<span>' + days + '</span>天<span>' + hours + '</span>小时<span>' + minutes + '</span>分钟<span>' + seconds + '</span>秒';
		tr[1].cells[1].innerHTML = '<span>' + days + '</span>天';
		tr[2].cells[1].innerHTML = '<span>' + hoursCount + '</span>小时';
		tr[3].cells[1].innerHTML = '<span>' + minuteCount + '</span>分钟';
		tr[4].cells[1].innerHTML = '<span>' + secondsCount + '</span>秒';
	}
	document.getElementById('submit').onclick = submitFunction;
})()
