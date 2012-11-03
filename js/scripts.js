/*!
 * TITLE:    Tests for MQtest.io
 * AUTHOR:   http://viljamis.com
 * VERSION:  0.1
 *
 * Parts of the code adopted from
 * Quirksmode.org, BBC's Device Reporter and
 * Andrew Hedges's Aspect Ratio Calculator.
 *
 * Thank you @ppk, @dblooman and @segdeha.
 *
*/

// Variables
var docEl = document.documentElement,
  ua = navigator.userAgent,
  ratio = ('devicePixelRatio' in window) ? devicePixelRatio : 1,
  w = screen.width,
  h = screen.height,
  respondList,
  log,
  logString,
  iterations = 0,
  resizeTimer = null;

// Log a result
function log(msg) {
  logString += '<li>' + msg + '</li>';
}

// Write all results inside 'responds to' list
function set() {
  respondList.innerHTML = logString;
  logString = '';
}

// Reduce a numerator and denominator to it's smallest
function reduceRatio(numerator, denominator) {
  var gcd, temp, divisor;

  // Euclidean algorithm (GCD = Greatest Common Factor)
  gcd = function (a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  // Take care of some simple cases
  if (numerator === denominator) {
    return '1/1';
  }

  // Make sure numerator is always the larger number
  if (+numerator < +denominator) {
    temp = numerator;
    numerator = denominator;
    denominator = temp;
  }

  divisor = gcd(+numerator, +denominator);

  return 'undefined' === typeof temp ? (numerator / divisor) + '/' + (denominator / divisor) : (denominator / divisor) + '/' + (numerator / divisor);
}

// Tests
function runTests() {
  var docW = docEl.clientWidth,
    docH = docEl.clientHeight;

  log('width <b>' + docW + 'px / ' + docW / 16 + 'em</b>');
  log('height <b>' + docH + 'px / ' + docH / 16 + 'em</b>');
  log('device-width <b>' + w + 'px</b>');
  log('device-height <b>' + h + 'px</b>');

  if (window.devicePixelRatio) {
    log('device-pixel-ratio <b>' + ratio + '</b>');
  }

  if (screen.deviceXDPI) {
    log('screen.deviceX/YDPI= ' + screen.deviceXDPI + ' / ' + screen.deviceYDPI);
    log('screen.logicalX/YDPI= ' + screen.logicalXDPI + ' / ' + screen.logicalYDPI);
  }

  log('device-aspect-ratio <b>' + reduceRatio(w, h) + '</b>');
  log('orientation <b><span id="orientation"></span></b>');

  document.getElementById('iterations').innerHTML = ('(iteration: ' + iterations + ')');
  document.getElementById('useragent').innerHTML = ua;

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
