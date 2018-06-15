import $ from './jquery';
import CountUp from './countUp';
import lottery from './doLottery';

const init = () => {
  setTimeout(() => {
    $('.beibei').removeClass('bounceInRight').addClass('pulse').css('animation-iteration-count', 'infinite');
    startCounter(518);
  }, 1500)
}

const startCounter = endValue => {
  let options = {  
    useEasing: true,
      useGrouping: true,
      separator: '',
    //   separator: ',',
      decimal: '.',
  };
  let counter = new CountUp('counter', 0, endValue, 0, 2.5, options);
  counter.start();
}


const showLottery = () => {
  $('.lottery').removeClass('hide');
}

const hideLottery = () => {
  $('.lottery').addClass('hide');
}

const show = () => {
  $('.page3').removeClass('hide');
}


const initPrizeLevel = () => {
  showLottery();
  let prize_level = '';
  let prize = Math.floor(Math.random() * 11);
  if (prize < 1) {
    prize_level = '一等奖';
  } else if (prize < 3) {
    prize_level = '二等奖';
  } else if (prize < 6) {
    prize_level = '三等奖'
  } else {
    prize_level = '谢谢参与';
  }
  $('.prize-level').text(prize_level);
}


export default {
  init,
  showLottery,
  hideLottery,
  show,
  initPrizeLevel,
  initLottery: lottery.init
};