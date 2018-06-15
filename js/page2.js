var $ = require('./jquery');
var candle = require('./candle');

function show() {
  $('.page2').removeClass('hide');
}

function initCandle() {
  $('.candle').hide();
  candle($("#surface1")[0]);
  candle($("#surface2")[0]);
  candle($("#surface3")[0]);
}


function init() {
  show();
  $('#word').on('click', function () {
    if (window.fired) {
      return;
    }
    $('.section:nth(2)').removeClass('hide');

    window.fired = true;
    $('.candle').each(function (idx, $obj) {
      setTimeout(function () {
        $($obj).show();
      }, 200 + idx * 300);
    })
  })

  setTimeout(function () {
    $('#word').removeClass('bounceInRight').addClass('pulse').css('animation-iteration-count', 'infinite');
  }, 1000);
}

module.exports = {
  show,
  init,
  initCandle
}