import LotteryCard from './Lottery/index';

let init = () => {
  // var img = new Image()
  // img.src = '../img/placeholder.jpg'
  // img.onload = function () {
  //   var lottery = new LotteryCard(document.getElementById('js_lottery'), { // eslint-disable-line
  //     // cover: img
  //     percent: 1,
  //   })
  //   lottery.on('start', function () {
  //     lottery.setResult('../img/scratch_no.png')
  //   })
  //   lottery.on('end', function () {
  //     alert('抽奖完毕');
  //   })
  //   window.lottery = lottery
  // }
  let lottery = new LotteryCard(document.getElementById('lottery'), { // eslint-disable-line
    // cover: img
    percent: 1,
    clearWhenEnd: false
  })

  lottery.on('start', () => {
    // 背景图片
    // lottery.setResult('http://www.cbpc.ltd/public/topic/cbpc3years/scratch_no.png')

  })
  lottery.on('end', () => {
    setTimeout(function () {
      window.location.href = 'http://www.cbpc.ltd/public/topic/2018cbpc3yearsLottery/';
    }, 3000);
  })
  window.lottery = lottery
}

module.exports = {
  init
};