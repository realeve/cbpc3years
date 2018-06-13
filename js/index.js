var $ = require('./jquery');
var CountUp = require('./countUp');
var candle = require('./candle');
require('./jquery.fullpage.js');


var fired = false;

function initEvent() {
  $('#word').on('click', function () {
    if (fired) {
      return;
    }
    $('.section:nth(2)').removeClass('hide');

    fired = true;
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

function initCandle() {
  $('.candle').hide();
  candle($("#surface1")[0]);
  candle($("#surface2")[0]);
  candle($("#surface3")[0]);
}

function initThree() {
  setTimeout(function () {
    $('.three').parent().removeClass('bounceInDown').addClass('pulse').css('animation-iteration-count', 'infinite');
    $('.happy').removeClass('bounceInDown').addClass('rubberBand').css({
      'animation-iteration-count': 'infinite',
      'animation-duration': '2s'
    });
  }, 2000)
}

function initPage3() {
  setTimeout(function () {
    $('.beibei').removeClass('bounceInRight').addClass('pulse').css('animation-iteration-count', 'infinite');
    startCounter(518);
  }, 1500)
}

function startCounter(endValue) {
  var options = {  
    useEasing: true,
      useGrouping: true,
      separator: '',
    //   separator: ',',
      decimal: '.',
  };
  var counter = new CountUp('counter', 0, endValue, 0, 2.5, options);
  counter.start();
}

function initFullpage() {
  $('#fullpage').fullpage({
    anchors: ['slide1', 'slide2', 'slide3'],
    onLeave: function (index, curIndex, direction) {

      var loadedSlide = $(this);
      if (curIndex == 2) {
        $('.page2').removeClass('hide');
        initThree();
        initEvent();
      } else if (curIndex == 3) {
        if (!fired) {
          return;
        }
        $('.page3').removeClass('hide');
        initPage3();
      }
    },
    afterRender: function () {
      initCandle();
    },
  });
}

$(document).ready(function () {
  initFullpage();
});