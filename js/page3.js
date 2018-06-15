var $ = require('./jquery');
var CountUp = require('./countUp');
var lottery = require('./doLottery');

function init() {
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


function showLottery() {
  $('.lottery').removeClass('hide');
}

function hideLottery() {
  $('.lottery').addClass('hide');
}

function show() {
  $('.page3').removeClass('hide');
}


function initPrizeLevel() {
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


module.exports = {
  init,
  showLottery,
  hideLottery,
  show,
  initPrizeLevel,
  initLottery: lottery.init
};