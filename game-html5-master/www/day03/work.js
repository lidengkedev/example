// 监听message事件，监听到后，运行handleMessage
addEventListener('message', function(e){
	// e.data 
	// e代表message事件
	// e.data是传递过来的数值
	postMessage( e.data+'--post by work.js' );
});