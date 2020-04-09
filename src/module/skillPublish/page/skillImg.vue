<template>
  <div class="router_page bg_gray">
    <top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 技能照片'></top>
    <message text="请按要求上传图片。照片不符合要求的，审核无法通过哦！"></message>
    <!-- S 上传图片 -->
    <div class="z_upload">
      <uploadImg type="" :imgList='imgList' count="9" :onTip="false" pathType="member_auth_img_path">
      </uploadImg>
    </div>
    <com-warm-prompt :code="code"></com-warm-prompt>
    <!-- E 上传图片 -->
    <div class="c_fixed_bottom">
      <a href="javascript:;" class="btn_block" @click="submit">完成</a>
    </div>
  </div>
</template>
<script>
import uploadImg from 'src/components/uploads/uploadImg'
import message from 'src/components/notice/message'
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
export default {
  data() {
    return {
      imgList: [],
      code:"TCJNTPSCWXTS",//温馨提示code 码
    }
  },
  components: {
    uploadImg,
    message,
    comWarmPrompt
  },
  activated() {
    //从缓存里拿list
    this.imgList = JSON.parse(window.sessionStorage.imgList || '[]')
  },
  methods: {
    submit() {
      window.sessionStorage.imgList = JSON.stringify(this.imgList)
      window.sessionStorage.imgListK = 1 //需要变
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.z_upload {
  background: #fff;
  min-height: 60%;
}
</style>
