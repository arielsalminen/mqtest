/*!
 * TITLE:    Tests for MQtest.io
 * AUTHOR:   http://viljamis.com
 * VERSION:  0.1
 *
 * Some parts of the tests adopted from
 * Quirksmode.org, BBC's Device Reporter and
 * Andrew Hedges's Aspect Ratio Calculator.
 *
 * Thank you @ppk, @dblooman and @segdeha.
 *
*/

// Variables
var docEl = document.documentElement,
  ua = navigator.userAgent,
  ratio = ('devicePixelRatio' in window) ? devicePixelRatio : 'unsupported',
  w = screen.width,
  h = screen.height,
  respondList,
  log,
  logString,
  iterations = 0,
  resizeTimer = null;

// Log a result
function log(msg) {
  logString += msg;
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

  log('<li>width <b>' + docW + 'px / ' + docW / 16 + 'em</b></li>');
  log('<li>height <b>' + docH + 'px / ' + docH / 16 + 'em</b></li>');
  log('<li>device-width <b>' + w + 'px / ' + w / 16 + 'em</b></li>');
  log('<li>device-height <b>' + h + 'px / '  + h / 16 + 'em</b></li>');
  log('<li>device-pixel-ratio <b>' + ratio + '</b></li>');
  log('<li class="aspect-ratio">aspect-ratio <b>' + reduceRatio(docW, docH) + '</b></li>');
  log('<li class="aspect-ratio">device-aspect-ratio <b>' + reduceRatio(w, h) + '</b></li>');
  log('<li class="aspect-ratio-unsupported">aspect-ratio <b>Unsupported</b></li>');
  log('<li class="aspect-ratio-unsupported">device-aspect-ratio <b>Unsupported</b></li>');
  log('<li class="orientation">orientation <b><span id="orientation"></span></b></li>');

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

// Info toggle
(function (w) {

  w.toggle_info = function () {

    var info_open = false,
      doc = w.document,
      info = doc.getElementById('info'),
      info_toggle = doc.getElementById('view-info');

    info_toggle.onclick = function (event) {
      event.preventDefault();
      if (info_open === false) {
        info.className = info.className.replace('closed', 'opened');
        info_open = true;
      } else {
        info.className = info.className.replace('opened', 'closed');
        info_open = false;
      }
      return false;
    };

  }

  // Run on domready (w.load as a fallback)
  if (w.addEventListener) {
    w.addEventListener("DOMContentLoaded", function () {
      w.toggle_info();
      w.removeEventListener("load", w.toggle_info, false);
    }, false);
    w.addEventListener("load", w.toggle_info, false);
  } else if (w.attachEvent) {
    w.attachEvent("onload", w.toggle_info);
  }

})(this);
