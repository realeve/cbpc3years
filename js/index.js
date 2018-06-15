var $ = require('./jquery');
var page1 = require('./page1');
var page2 = require('./page2');
var page3 = require('./page3');
require('./jquery.fullpage.js');

var lotteryInited = false;

function init() {
  $('#fullpage').fullpage({
    anchors: ['slide1', 'slide2', 'slide3'],
    onLeave: function (index, curIndex, direction) {
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
          setTimeout(function () {
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
    afterRender: function () {
      page1.init();
      page2.initCandle();
    }
  });
}

$(document).ready(function () {
  window.fired = false;
  init();
});