<template>
  <div id="app">
    <loading v-model="isLoading" />
    <router-view/>
    <v-foot/>
  </div>
</template>

<script>
import { Loading } from "vux";

import { querystring } from "vux";

import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    Loading
  },
  data() {
    return {
      code: "",
      apiId: "wx762c9153df774440"
    };
  },
  computed: {
    ...mapState(["cdnUrl"]),
    isLoading: {
      get() {
        return this.$store.state.isLoading;
      },
      set(val) {
        this.$store.commit("updateLoadingStatus", val);
      }
    },
    userInfo: {
      get() {
        return this.$store.state.userInfo;
      },
      set(val) {
        this.$store.commit("setUserinfo", val);
      }
    },
    // 签名用URL
    url() {
      return window.location.href.split("#")[0];
    },
    // 跳转URL
    redirectUrl() {
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.apiId
      }&redirect_uri=${encodeURIComponent(
        this.url
      )}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
    },
    shareUrl() {
      // 被分享的链接必须在安全域名中，不能直接分享为 redirectUrl
      return window.location.href.split("#")[0].split("?")[0];
    }
  },
  methods: {
    wxPermissionInit() {
      let params = {
        s: "/addon/Api/Api/getSignature",
        url: this.url
      };
      return this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => res.data);
    },
    wxReady(obj) {
      let config = {
        debug: false,
        appId: obj.appId,
        timestamp: obj.timestamp,
        nonceStr: obj.nonceStr,
        signature: obj.signature,
        jsApiList: [
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
          "hideMenuItems"
        ]
      };
      this.$wechat.config(config);
    },
    initWxShare() {
      this.$wechat.ready(() => {
        let option = {
          title: "品质成钞三周年有奖活动幸运用户", // 分享标题
          desc: "品质成钞三周年有奖活动幸运用户",
          link: this.shareUrl,
          imgUrl: "http://cbpm.sinaapp.com/cdn/logo/cbpc.jpg",
          type: "",
          dataUrl: "",
          success: function() {},
          cancel: function() {}
        };
        this.$wechat.onMenuShareAppMessage(option);
        this.$wechat.onMenuShareTimeline(option);
        this.$wechat.onMenuShareQQ(option);
        this.$wechat.onMenuShareWeibo(option);
        this.$wechat.onMenuShareQZone(option);

        // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        this.$wechat.hideMenuItems({
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
    },
    // 获取微信用户信息（昵称，地区）
    getWXUserInfo() {
      let userInfo;
      let wx_userinfo = localStorage.getItem("wx_userinfo");
      if (null == wx_userinfo || typeof wx_userinfo == "undefined") {
        this.getWXInfo();
        return;
      }
      userInfo = JSON.parse(wx_userinfo);
      this.userInfo = userInfo;
    },
    getWXInfo() {
      let params = {
        s: "/addon/Api/Api/getUserInfo",
        code: this.code
      };
      this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          this.userInfo = res.data;
          if (Reflect.get(res.data, "nickname")) {
            localStorage.setItem("wx_userinfo", JSON.stringify(res.data));
          }
          this.isLoading = false;
        })
        .catch(e => {
          this.isLoading = false;
        });
    },
    wxInit() {
      if (!this.needRedirect()) {
        this.getWXUserInfo();
      }
      this.wxPermissionInit().then(res => {
        this.wxReady(res);
        this.initWxShare();
        this.recordReadNum();
      });
    },
    needRedirect() {
      let hrefArr = window.location.href.split("?");
      if (hrefArr.length == 1) {
        window.location.href = this.redirectUrl;
        return true;
      }
      let params = querystring.parse(hrefArr[1]);
      this.code = params.code;
      return false;
    },
    recordReadNum() {
      if (location.href.includes("localhost")) {
        return;
      }
      let url = window.location.href.split("?")[0];
      let params = {
        s: "/addon/Api/Api/recordReadNum",
        url
      };
      this.$http.jsonp(this.cdnUrl, {
        params
      });
    }
  },
  created() {
    this.isLoading = true;
    // 开发模式下，初始化值
    if (process.env.NODE_ENV == "development") {
      this.userInfo = {
        openid: "oW0w1v4qftC8xUP3q-MPIHtXB7hI",
        nickname: "宾不厌诈",
        sex: 1,
        language: "zh_CN",
        city: "成都",
        province: "四川",
        country: "中国",
        headimgurl:
          "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7RSAYiaxiaC1lOZYicWic9YZKEFJ2TKEfh3pFJibLvf7IxdLQ/0",
        privilege: []
      };
      this.isLoading = false;
    } else {
      // 正式环境微信载入
      this.wxInit();
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #f9f9f9;
}

.weui-cells__title {
  color: #444 !important;
  font-size: 16px !important;
  margin-top: 0 !important;
}

.weui-cells_radio .weui-cell__hd {
  padding-right: 0.35em;
}

[class^="weui-icon-"]:before,
[class*=" weui-icon-"]:before {
  margin: 0 !important;
}

.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
  display: none !important;
}

.weui-cells_radio .weui-check:checked + .weui-icon-checked:after {
  content: "\EA06";
  color: #09bb07;
  font-size: 23px;
  display: block;
}

.weui-cells_radio .weui-icon-checked:before {
  content: "\EA01";
  color: #c9c9c9;
  font-size: 23px;
  display: block;
}

.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
  content: "\EA06";
  color: #09bb07;
}

.weui-cells_radio .weui-check:checked + .vux-checklist-icon-checked:before {
  color: #09bb07;
}

.weui-cells_radio > label > * {
  pointer-events: none;
}

footer {
  font-size: 14px;
  color: #999;
  text-align: center;
}

.weui-media-box__thumb {
  border-radius: 50% !important;
}
</style>
