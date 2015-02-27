var fm = require('./fm');
var throttle = require('./throttle');
var features = require('./detectFeatures')();

var a, b, c, range, reset;

function resetSlider() {
    range.value = "50";
    update();
}

function ease(x) {
    return x;
}

function update() {
    var val = +range.value;
    if (val < 50) {
        b.style.opacity = ease((val / 50));
        c.style.opacity = 0;
    }
    if (val >= 50) {
        b.style.opacity = 1;
        c.style.opacity = ease(((val - 50) / 50));
    }
    fm.resize();
}

function init () {
    // Mousedown triggers before the range control is updated, so let's defer a browser tick. You'd think that change
    // would trigger here, but nope.
    range.addEventListener('mousedown', function() { setTimeout(update, 1); });
    range.addEventListener('mousemove', update);
    range.addEventListener('keyup', update);
    range.addEventListener('keypress', update);
    range.addEventListener('change', update);

    reset.addEventListener('click', resetSlider);
    update();
}


var throttleRender = throttle(fm.resize, 250);

$(document).ready(function () {
   range = document.getElementById('range');
   reset = document.getElementById('reset');
   a = document.getElementById('a');
   b = document.getElementById('b');
   c = document.getElementById('c');
  $(window).resize(throttleRender);
  init();
});
