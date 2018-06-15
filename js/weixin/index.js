import wx from 'weixin-js-sdk';
import querystring from 'qs';
import $http from 'vue-resource';

const NODE_ENV = 'development';
// const userInfo = {};
const url = window.location.href.split("#")[0];

let sport = {
  title: '品质成钞三周年有奖活动(一路相伴，感谢有礼)',
  loadWXInfo: true, // 抽奖活动将载入用户个人信息
  apiId: 'wx762c9153df774440',
  cdnUrl: "http://cbpc540.applinzi.com/index.php",
  shareUrl: url.split("?")[0],
  callback: '',
  code: ''
};

const redirectUrl = () => {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${sport.apiId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
}

const needRedirect = () => {
  let hrefArr = window.location.href.split("?");
  if (hrefArr.length == 1) {
    window.location.href = redirectUrl();
    return true;
  }
  let params = querystring.parse(hrefArr[1]);
  sport.code = params.code;
  return false;
}

const getWXInfo = () => {
  let params = {
    s: "/addon/Api/Api/getUserInfo",
    code: sport.code
  };
  $http
    .jsonp(sport.cdnUrl, {
      params
    })
    .then(res => {
      if (Reflect.get(res.data, "nickname")) {
        localStorage.setItem("wx_userinfo", JSON.stringify(res.data));
      }
      // 全局存储
      window._userInfo = res.data;
      sport.callback();
    });
}

const getWXUserInfo = () => {

  let wx_userinfo = localStorage["wx_userinfo"];
  if (typeof wx_userinfo != "undefined") {
    window._userInfo = JSON.parse(wx_userinfo);
    sport.callback();
    return;
  }
  getWXInfo();
}

const wxReady = obj => {
  let config = {
    debug: false,
    appId: obj.appId,
    timestamp: obj.timestamp,
    nonceStr: obj.nonceStr,
    signature: obj.signature,
    jsApiList: [
      "onMenuShareAppMessage",
      "onMenuShareTimeline",
      "hideMenuItems"
    ]
  };
  wx.config(config);
}

const initWxShare = () => {
  wx.ready(() => {
    let option = {
      title: sport.title, // 分享标题
      desc: sport.title,
      link: sport.shareUrl,
      imgUrl: "http://cbpm.sinaapp.com/cdn/logo/cbpc.jpg",
      type: "",
      dataUrl: "",
      success: function () {},
      cancel: function () {}
    };
    wx.onMenuShareAppMessage(option);
    wx.onMenuShareTimeline(option);
    wx.onMenuShareQQ(option);
    wx.onMenuShareWeibo(option);
    wx.onMenuShareQZone(option);

    // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    wx.hideMenuItems({
      menuList: [
        "menuItem:editTag",
        "menuItem:delete",
        "menuItem:copyUrl",
        "menuItem:originPage",
        "menuItem:readMode",
        "menuItem:openWithQQBrowser",
        "menuItem:openWithSafari",
        "menuItem:share:email"
      ]
    });
  });
}

const recordReadNum = () => {
  if (location.href.includes("localhost")) {
    return;
  }
  let url = window.location.href.split("?")[0];
  let params = {
    s: "/addon/Api/Api/recordReadNum",
    url
  };
  $http.jsonp(sport.cdnUrl, {
    params
  });
}


let wxInit = (callback) => {
  if (sport.loadWXInfo && !needRedirect()) {
    getWXUserInfo(callback);
  }
  wxPermissionInit().then(res => {
    // shouldShare = true;
    wxReady(res);
    initWxShare();
    recordReadNum();
  });
}

const init = (callback) => {
  // 全局记录callback;
  sport.callback = callback;
  window.title = sport.title;

  if (NODE_ENV == "development") {
    window._userInfo = {
      openid: "oW0w1v4qftC8xUP3q-MPIHtXB7hI",
      nickname: "宾不厌诈",
      sex: 1,
      language: "zh_CN",
      city: "成都",
      province: "四川",
      country: "中国",
      headimgurl: "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7RSAYiaxiaC1lOZYicWic9YZKEFJ2TKEfh3pFJibLvf7IxdLQ/0",
      privilege: []
    };

    callback();
  } else {
    // 正式环境微信载入
    wxInit();
  }
}

export default {
  init
}