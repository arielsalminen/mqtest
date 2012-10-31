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
  ratio = ('devicePixelRatio' in window) ? devicePixelRatio : 1,
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
  log('width <b>' + docEl.clientWidth + 'px / ' + docEl.clientWidth / 16 + 'em</b>');
  log('height <b>' + docEl.clientHeight + 'px / ' + docEl.clientHeight / 16 + 'em</b>');
  log('device-width <b>' + screen.width + 'px</b>');
  log('device-height <b>' + screen.height + 'px</b>');
  if (window.devicePixelRatio) {
    log('device-pixel-ratio <b>' + ratio + '</b>');
  }
  if (screen.deviceXDPI) {
    log('screen.deviceX/YDPI= ' + screen.deviceXDPI + ' / ' + screen.deviceYDPI);
    log('screen.logicalX/YDPI= ' + screen.logicalXDPI + ' / ' + screen.logicalYDPI);
  }
  log('orientation <b><span id="orientation"></span></b>');
  document.getElementById('iterations').innerHTML = ('(iteration: ' + iterations + ')');
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
