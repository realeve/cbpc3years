import $ from './jquery';
import CountUp from './countUp';
import lotteryApp from './doLottery';
import * as lib from './lib';
const cdnUrl = "http://cbpc540.applinzi.com/index.php?s=%2Faddon%2FGoodVoice%2FGoodVoice%2F";

// 载入中奖信息
let loadLotteryInfo = () => {
  let data = {
    openid: _userInfo.openid
  };
  $.ajax({
    url: cdnUrl + "is3yearsLottery",
    data,
    dataType: "jsonp",
    callback: "JsonCallback",
  }).done(data => {
    if (data.length == 0) {
      // 无数据，开始抽奖
      doLottery();
      return;
    }
    initLotteryInfoWithData(data);
  })
}

let initLotteryInfoWithData = data => {
  let {
    id,
    islucky
  } = data[0];

  showCount(id);
  initPrizeLevel(islucky);
}

let doLottery = () => {

  let data = Object.assign({}, window._userInfo);
  data.rec_time = lib.now();
  $.ajax({
    url: cdnUrl + "do3yearsLottery",
    data,
    dataType: "jsonp",
    callback: "JsonCallback",
  }).done(data => {
    // 抽奖错误
    if (data.id == 0) {
      window.location.reload();
      return;
    }
    initLotteryInfoWithData(data);
  })
}

const init = () => {
  loadLotteryInfo();
}

const showCount = userIdx => {
  setTimeout(() => {
    $('.beibei').removeClass('bounceInRight').addClass('pulse').css('animation-iteration-count', 'infinite');
    startCounter(userIdx);
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


const initPrizeLevel = prize => {
  showLottery();
  let prize_level = '';
  prize = parseInt(prize);
  // let prize = Math.floor(Math.random() * 11);
  if (prize < 1) {
    prize_level = '一等奖';
  } else if (prize < 3) {
    prize_level = '二等奖';
  } else if (prize < 6) {
    prize_level = '三等奖'
  } else {
    prize_level = '谢谢参与';
  }

  // 盖住
  lotteryApp.init();
  $('.prize-level').text(prize_level);
}

export default {
  init,
  showLottery,
  hideLottery,
  show
};