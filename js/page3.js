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
    saveLotteryInfo(data[0]);
  })
}

let saveLotteryInfo = data => {
  window._prizeInfo = data;
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
    saveLotteryInfo(data);
  })
}

const init = () => {
  showCount();
  initPrizeLevel();
}

const showCount = () => {
  setTimeout(() => {
    $('.beibei').removeClass('bounceInRight').addClass('pulse').css('animation-iteration-count', 'infinite');
    startCounter(window._prizeInfo.id);
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
  let prize_level = ['谢谢参与', '一等奖', '二等奖', '三等奖'][window._prizeInfo.islucky]
  // 盖住
  lotteryApp.init();
  $('.prize-level').text(prize_level);
}

export default {
  init,
  showLottery,
  hideLottery,
  show,
  loadLotteryInfo,
  initPrizeLevel
};