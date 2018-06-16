import $ from './jquery';
import page1 from './page1'
import page2 from './page2'
import page3 from './page3'
import weixin from './weixin';

import './jquery.fullpage.js';
import attachFastClick from 'fastclick';
attachFastClick(document.body);

let lotteryInited = false;

const initFullpage = () => {
  $('#fullpage').fullpage({
    anchors: ['slide1', 'slide2', 'slide3'],
    onLeave: (index, curIndex, direction) => {
      // 第二页不允许向上翻
      // console.log(index, curIndex, direction)
      if (curIndex == 1 && direction == 'up') {
        return false;
      }
      if (curIndex == 3 && direction == 'down' && !window.fired) {
        return false;
      }
      if (curIndex != 3) {
        page3.hideLottery();
      }

      if (curIndex == 2) {
        page2.init();
      } else if (curIndex == 3) {
        if (!lotteryInited) {
          page3.init();
          lotteryInited = true;
        } else {
          page3.showLottery();
        }
      }
    },
    afterRender: () => {
      page1.init();
      page2.initCandle();
    }
  });
}

$(document).ready(() => {
  window.fired = false;
  weixin.init(function () {
    page3.loadLotteryInfo();
    initFullpage();
  })
});