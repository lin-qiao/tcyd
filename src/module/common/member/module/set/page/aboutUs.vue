<template>
    <div>
        <!-- S 头部 -->
        <top title="关于我们" :isReturn="false" v-if="$store.state.platform=='wx'"></top>
        <!-- E 头部 -->
        <div class="g_about_icon bg">
            <img src="../images/tc_logo.png" alt="" />
        </div>
        <ul class="g_icon_list">
            <li v-if="v">
                <a href="javascript:void(0);">
                    版本号
                    <div class="right_element">{{v}}</div>
                </a>
            </li>
            <li>
                <a class="navigate_right" href="javascript:void(0);" @click="showWx = true">
                    官方微信
                    <div class="weixin right_element">tcydAPP<i class="iconfont icon-ewm g_ewm_icon"></i></div>
                </a>
            </li>
            <li>
                <a class="navigate_right" :href="contactKF">
                    在线客服
                </a>
            </li>
        </ul>
        <div class="pop_bj" v-if="showWx" @click="showWx = false"></div>
        <div class="pop_box" v-if="showWx">
            <img src="../images/qrcode.png" alt="">
            <p class="f28 c_fff text_center mt20" v-show="isApp">请保存图片在微信中识别</p>
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {
      showWx:false,  //显示微信二维码
      v: '', //版本号
      isApp: false, //是否是app
		}
	},
	components: {
	},
	activated() {
    if (this.$route.query.v) {
      this.v = this.$route.query.v
    }
    if (this.$store.state.platform !='wx') {
      this.isApp = true;
    }
	},
	mounted(){
		
	},
	watch:{
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
	background: @bg_color;
}
.g_about_icon {
  padding: 0.88rem 0;

  img {
    display: block;
    width: 1.3rem;
    height: 1.3rem;
    margin: 0 auto;
  }
}
.right_element {
  position: absolute;
  right: 0.5rem;
  top: 0.32rem;
  font-size: 0.26rem;
  color: #888;
}
.g_icon_list {
  li {
    margin-left: 0.3rem;

    a {
      display: block;
      position: relative;
      padding: 0.28rem 0.4rem 0.28rem 0;
      border-bottom: 1px solid #eee;
      font-size: 0.28rem;
    }
  }

  .weixin.right_element {
    right: 1.1rem;
  }
}
.g_ewm_icon {
  position: absolute;
  top: -0.07rem;
  right: -0.5rem;
  .f40;
}
.pop_bj {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.7);
}
.pop_box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 4.3rem;
  height: 4.3rem;
  img{
    width: 4.3rem;
    height: 4.3rem;
  }
}
</style>
