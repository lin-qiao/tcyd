<template lang="html">
  <div class="forget login pb300">
    <top title="找回密码" :isReturn="false"></top>
    <!--<div class="yl_img">
      <div class="yl_img_bg">
        <img src="../images/login_img.png" alt="">
      </div>
      <p>请重置您的密码</p>
    </div>-->
    <div class="yl_mode_list">
      <question index='1'    :data="questionOne" v-model="one" ref="questionOne"></question>
      <question index='2' :data="questionTwo" v-model="two" ref="questionTwo"></question>
      <question index='3' :data="questionThree" v-model="three" ref="questionThree"></question>
    </div>
    <div class="yl_btn" v-bind:class="{ disabled:!canSubmit}" @click="forgotPswdFu">
      <div class="btn_block">确认</div>
    </div>
    <way-back way="mibao"></way-back>
  </div>
</template>

<script>
import question from '../components/question'
import wayBack from '../components/wayBack'

export default {
  data() {
    return {
      questionOne: [{ id: 1, con: '问题一' }],
      one: '',
      two: '',
      three: '',
      questionTwo: [{ id: 2, con: '问题二' }],
      questionThree: [{ id: 3, con: '问题三' }],
      hint: ''
    }
  },
  components: {
    wayBack,
    question
  },
  computed: {
    canSubmit() {
      if (!this.one) {
        this.hint = '请选择问题一'
        return false
      }
      if (!this.$refs.questionOne.answer) {
        this.hint = '请输入问题一的答案'
        return false
      }
      if (!this.two) {
        this.hint = '请选择问题二'
        return false
      }
      if (!this.$refs.questionTwo.answer) {
        this.hint = '请输入问题二的答案'
        return false
      }
      if (!this.three) {
        this.hint = '请选择问题三'
        return false
      }
      if (!this.$refs.questionThree.answer) {
        this.hint = '请输入问题三的答案'
        return false
      }
      return true
    }
  },
  methods: {
    forgotPswdFu() {
      if (!this.canSubmit) {
        window.alertTip(this.hint)
      }
    }
  }
}
</script>
