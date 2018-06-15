<template>
  <div class="home">
    <div class="content">
      <msg :title="title" :description="desc" :icon="icon"></msg>
      <template v-if="isLucky">
        <form-preview header-label="用户信息预览" :header-value="username+'(收)'" :body-items="list" />
        <div class="box">
          <group title="基本信息">
            <x-input title="姓名" name="username" v-model="username" placeholder="请输入姓名" is-type="china-name"></x-input>
            <x-input title="手机号码" name="mobile" v-model="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
          </group>

          <group>
            <x-address title="省/市" raw-value v-model="addressArr" :list="addressData" inline-desc="点击设置地址"></x-address>
            <x-input title="详细地址" name="address_detail" v-model="address_detail" placeholder="请输入详细信息"></x-input>
          </group>

          <div class="submit">
            <x-button type="primary" @click.native="submit">提交信息</x-button>
            <x-button plain @click.native="viewLucky">查看中奖列表</x-button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="submit">
          <x-button type="primary" @click.native="viewLucky">查看中奖列表</x-button>
        </div>
      </template>
    </div>
    <toast v-model="toast.show">{{ toast.msg }}</toast>
  </div>
</template>

<script>
import {
  XButton,
  XInput,
  Group,
  Msg,
  Cell,
  dateFormat,
  Toast,
  XAddress,
  ChinaAddressV3Data,
  Value2nameFilter as value2name,
  FormPreview
} from "vux";

import { mapState } from "vuex";

export default {
  components: {
    XButton,
    XInput,
    Msg,
    Group,
    Cell,
    Toast,
    XAddress,
    FormPreview
  },
  data() {
    return {
      username: "",
      mobile: "",
      title: "很遗憾您未中奖",
      desc: "感谢您的参与",
      icon: "success",
      toast: {
        show: false,
        msg: ""
      },
      addressArr: [],
      addressData: ChinaAddressV3Data,
      address_detail: "",
      isLucky: -1
    };
  },
  computed: {
    ...mapState(["userInfo", "cdnUrl", "sport"]),
    address() {
      return value2name(this.addressArr, ChinaAddressV3Data);
    },
    list() {
      return [
        {
          label: "手机",
          value: this.mobile
        },
        {
          label: "省/市",
          value: this.address
        },
        {
          label: "详细地址",
          value: this.address_detail
        }
      ];
    }
  },
  watch: {
    isLucky(val) {
      if (val == 0) {
        this.viewLucky();
        return;
      }
      let prize_level = ["谢谢参与", "一等奖", "二等奖", "三等奖"][val];
      this.title = "恭喜您获得" + prize_level;
      this.desc =
        "恭喜您成为本次活动的幸运用户，请填写个人收件信息以方便我们邮寄，如果信息填写不完整，视为自动放弃中奖资格。";
    }
  },
  methods: {
    now() {
      return dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss");
    },
    submit() {
      let params = {
        s: "/addon/GoodVoice/GoodVoice/add3yearsAddress",
        username: this.username,
        mobile: this.mobile,
        address: this.address,
        address_detail: this.address_detail,
        rec_time: this.now(),
        openid: this.userInfo.openid,
        prize_level: this.isLucky
      };
      this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          this.toast.show = true;
          this.toast.msg = res.data.msg;
          if (res.data.status > 0) {
            this.viewLucky();
          }
        });
    },
    loadDefaultData() {
      let params = {
        s: "/addon/GoodVoice/GoodVoice/is3yearsLottery",
        openid: this.userInfo.openid
      };
      this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          let obj = res.data[0];
          this.isLucky = parseInt(obj.islucky, 10);
        });
    },
    loadAddress() {
      let params = {
        s: "/addon/GoodVoice/GoodVoice/load3yearsAddress",
        openid: this.userInfo.openid
      };
      this.$http
        .jsonp(this.cdnUrl, {
          params
        })
        .then(res => {
          // 未填写信息
          if (res.data.length == 0) {
            this.loadDefaultData();
            return;
          }

          let {
            username,
            mobile,
            address_detail,
            address,
            prize_level
          } = res.data[0];

          this.username = username;
          this.mobile = mobile;
          this.addressArr = address.split(" ");
          this.address_detail = address_detail;
          this.isLucky = prize_level;
        });
    },
    viewHome() {
      this.$router.push("/");
    },
    viewLucky() {
      this.$router.push("/lucker");
    },
    init() {
      let address = window.localStorage.getItem("user_address");
      this.addressArr = JSON.parse(address);
      document.title = this.sport.name;
      this.loadAddress();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.home {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  font-weight: 100;
  .content {
    flex: 1;
  }
  .title {
    font-size: 13pt;
  }
  .box {
    margin-top: 40px;
    min-height: 350px;
  }
  .center {
    display: flex;
    justify-content: center;
  }
  .submit {
    padding: 30px 20px;
  }
}
</style>
