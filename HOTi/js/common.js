var userAgent = navigator.userAgent.toLowerCase();
var platform;
if (userAgent == null || userAgent == '') {
  platform = 'WEB';
} else {
  if (userAgent.indexOf("android") != -1) {
    platform = 'ANDROID';
    window.location.href = "http://hoti.aiegov.com/mobile/index.html";   
  } else if (userAgent.indexOf("ios") != -1 || userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1) {
    platform = 'IOS';
    window.location.href = "http://hoti.aiegov.com/mobile/index.html";  
  } else if (userAgent.indexOf("windows phone") != -1) {
    platform = 'WP'; 
    window.location.href = "http://hoti.aiegov.com/mobile/index.html";  
  } else {
    platform = 'WEB';
  }  
} 