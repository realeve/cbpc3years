import $ from './jquery';
import page1 from './page1'
import page2 from './page2'
import page3 from './page3'
import './jquery.fullpage.js';

let lotteryInited = false;

const init = () => {
  $('#fullpage').fullpage({
    anchors: ['slide1', 'slide2', 'slide3'],
    onLeave: (index, curIndex) => {
      if (curIndex != 3) {
        page3.hideLottery();
      }

      if (curIndex == 2) {
        page2.init();
      } else if (curIndex == 3) {
        if (!window.fired) {
          return;
        }

        page3.show();

        if (!lotteryInited) {
          setTimeout(() => {
            page3.initPrizeLevel();
            page3.initLottery();
            lotteryInited = true;
          }, 2100);
        } else {
          page3.showLottery();
        }

        page3.init();
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
  init();
});