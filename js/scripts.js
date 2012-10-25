/*!
 * TITLE:    Tests for screensizetest.com
 * AUTHOR:   http://viljamis.com
 * VERSION:  0.1
 *
 * Parts of the code adopted from
 * Quirksmode.org and BBC's Device Reporter,
 * thank you @ppk and @dblooman.
 *
*/

// Variables
var docEl = document.documentElement,
  useragent = navigator.userAgent,
  respondList,
  devicePixelRatio,
  log,
  logString,
  iterations = 0,
  resizeTimer = null;

// Remove "preload" and "no-js" classes and add "js" class
docEl.className = docEl.className.replace(/(^|\s)no-js preload(\s|$)/, 'js ');

// Log a result
function log(msg) {
  logString += '<li>' + msg + '</li>';
}

// Write all results inside 'responds to' list
function set() {
  respondList.innerHTML = logString;
  logString = '';
}

// Tests
function runTests() {
  var ratio = ('devicePixelRatio' in window) ? devicePixelRatio : 1;
  log('min-width: ' + docEl.clientWidth + 'px / min-height: ' + docEl.clientHeight + 'px');
  log('min-width: ' + docEl.clientWidth / 16 + 'em / min-height: ' + docEl.clientHeight / 16 + 'em');
  log('min-device-width: ' + screen.width + 'px / min-device-height: ' + screen.height + 'px');
  if (window.devicePixelRatio) {
    log('min-device-pixel-ratio: ' + ratio);
  }
  if (screen.deviceXDPI) {
    log('screen.deviceX/YDPI= ' + screen.deviceXDPI + ' / ' + screen.deviceYDPI);
    log('screen.logicalX/YDPI= ' + screen.logicalXDPI + ' / ' + screen.logicalYDPI);
  }
  log('orientation: <span id="orientation"></span>');
  log('<span id="mediaqueries"><span>Doesn´t support @media screen</span></span>');
  document.getElementById('iterations').innerHTML = ('Test number: ' + iterations);
  document.getElementById('useragent').innerHTML = useragent;
  iterations += 1;
  set();
}

// Init Tests
function init() {
  respondList = document.getElementById('respondList');
  document.getElementById('testButton').onclick = runTests;
  runTests();
  // Run twice so that the list is filled with data
  runTests();
}

// Init onload
if (!window.onload) {
  window.onload = init;
}

// Init on resize
window.onresize = function () {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(function () {
    resizeTimer = null;
    runTests();
  }, 200);
};
