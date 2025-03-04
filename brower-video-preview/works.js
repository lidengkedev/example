// 创建worker.js
self.onmessage = async (e) => {
  const { file } = e.data;
  const url = URL.createObjectURL(file);
  
  const video = document.createElement('video');
  video.src = url;
  
  // ...帧捕获逻辑...
  
  self.postMessage({
      thumbnail: canvas.toDataURL(),
      url
  });
};