var $ = require('./jquery');

function init() {
  setTimeout(function () {
    $('.three').parent().removeClass('bounceInDown').addClass('pulse').css('animation-iteration-count', 'infinite');
    $('.happy').removeClass('bounceInDown').addClass('rubberBand').css({
      'animation-iteration-count': 'infinite',
      'animation-duration': '2s'
    });
  }, 2000)
}

module.exports = {
  init
}