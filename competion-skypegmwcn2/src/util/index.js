//将图片转换为Base64
function getImgToBase64(url, callback) {
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image;
    // img.crossOrigin = 'Anonymous';
    img.setAttribute('crossOrigin', 'anonymous')

  img.onload = function () {
    console.log('kaishi')
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    var file = callback(dataURL);
    canvas = null;
    return file;
  };
  // img.src = url;
  img.src = url + '?time=' + new Date().valueOf();
}
//将base64转换为文件对象
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  //转换成file对象
  return new File([u8arr], filename, {
    type: mime
  });
  //转换成成blob对象
  //return new Blob([u8arr],{type:mime});
}
//将图片转换为base64,再将base64转换成file对象
function imgToFile(url, filename = 'filename') {
  return getImgToBase64(url, data => {
    var myFile = dataURLtoFile(data, filename);
    console.log(myFile);
    return myFile;
  })
}

export default {
  getImgToBase64,
  dataURLtoFile
}