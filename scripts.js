
var writeroot,
  testEl,
  testLayer,
  counter = 0,
  resizeTimer = null;

function init() {
  writeroot = document.getElementById('writeroot');
  testEl = document.getElementById('testEl');
  testLayer = document.getElementById('huge');
  document.getElementById('testButton').onclick = refreshTest;
  refreshTest();
  refreshTest(); //repeat so that the writeroot is filled with data at the moment its height is measured.
}

function refreshTest() {
  var ratio = ('devicePixelRatio' in window) ? devicePixelRatio : 1;
  
  log('<span id="mediaqueries"></span>');

  //log('documentElement.offset = ' + document.documentElement.offsetWidth + ' / ' + document.documentElement.offsetHeight);
  log('max-width: ' + document.documentElement.clientWidth + 'px / max-height: ' + document.documentElement.clientHeight + 'px');

  log('max-width: ' + document.documentElement.clientWidth / 16 + 'em / max-height: ' + document.documentElement.clientHeight / 16 + 'em');
  
  log('max-device-width: ' + screen.width + 'px / max-device-height: ' + screen.height + 'px');
  
//  log('documentElement.scroll = ' + document.documentElement.scrollLeft + ' / ' + document.documentElement.scrollTop);
//  log('writeroot.offset = ' + writeroot.offsetWidth + ' / ' + writeroot.offsetHeight);
  //log('window.innerWidth/Height = ' + window.innerWidth + ' / ' + window.innerHeight);
  //log('window.outerWidth/Height = ' + window.outerWidth + ' / ' + window.outerHeight);
  if (window.devicePixelRatio) {
    log('min-device-pixel-ratio: ' + ratio);
  }
  if (screen.deviceXDPI) {
    log('screen.deviceX/YDPI= ' + screen.deviceXDPI +' / ' + screen.deviceYDPI);
    log('screen.logicalX/YDPI= ' + screen.logicalXDPI +' / ' + screen.logicalYDPI);
  }
  //log('window.page = ' + window.pageXOffset+ ' / ' + window.pageYOffset);
  
  log('orientation: <span id="orientation"></span>');
  
  log('(test iteration ' + counter + ')');
  counter +=1;
  
  set();
}


var logString;

function log(msg) {
  logString += '<li>' + msg + '</li>';  
}

function set () {
  writeroot.innerHTML = logString;
  logString = '';
}

if (!window.onload) {
  window.onload = init;
}

// Check for resize and init again when needed
window.onresize = function () {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }

  resizeTimer = setTimeout(function () {
    // console.log("Window was resized");
    resizeTimer = null;
    refreshTest();
  }, 200);
};