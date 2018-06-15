import $ from './jquery';
import candle from './candle';

const show = () => {
  $('.page2').removeClass('hide');
}

const initCandle = () => {
  $('.candle').hide();
  candle($("#surface1")[0]);
  candle($("#surface2")[0]);
  candle($("#surface3")[0]);
}


const init = () => {
  show();
  $('#word').on('click', () => {
    if (window.fired) {
      return;
    }
    $('.section:nth(2)').removeClass('hide');

    window.fired = true;
    $('.candle').each((idx, $obj) => {
      setTimeout(() => {
        $($obj).show();
      }, 200 + idx * 300);
    })
  })

  setTimeout(() => {
    $('#word').removeClass('bounceInRight').addClass('pulse').css('animation-iteration-count', 'infinite');
  }, 1000);
}

export default {
  show,
  init,
  initCandle
}