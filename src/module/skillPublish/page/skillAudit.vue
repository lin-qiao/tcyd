<template lang="html">
    <div>
        <top
            :isReturn="false"
          
            title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>技能审核</span>">
        </top>
        <div class="skill_audit">
            <div class="img"></div>
            <p class="f34 mt30 mb10">技能审核中</p>
            <p class="f28 c_666">我们将在24小时内审核您的技能，请耐心等待~</p>
            <!--<p class="f28 c_main mt20">支付保证金用户优先推荐订单成交率更高哦~</p>-->
            <!-- <router-link class="btn_block mtb40 mini hei70" to="/myDeposit">支付保证金</router-link> -->
        </div>
        <!-- <div class="skill_ag bg_gray plr30">
            <div class="skill_ag_tit">
                <span class="bg_gray">同城进阶指南</span>
            </div>
            <div class="skill_ag_item">
                <img src="http://img01.dadetong.com/genera_zb/mobile_genera_1518071701617.jpg" alt="">
                <h3>夺宝奇兵 (新手多重大礼等你来!)</h3>
                <p>活动时间：2015年9月10日 - 2015年10月10日</p>
            </div>
            <div class="skill_ag_item">
                <img src="http://img01.dadetong.com/genera_zb/mobile_genera_1518071701617.jpg" alt="">
                <h3>夺宝奇兵 (新手多重大礼等你来!)</h3>
                <p>活动时间：2015年9月10日 - 2015年10月10日</p>
            </div>
        </div> -->
        <div class="skill_btn flex justify_center ptb34">
            <router-link class="btn_border mini mlr15" to="/skillManage">技能管理</router-link>
            <router-link class="btn mini mlr15" to="/skillType">完成发布技能</router-link>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.skill_audit {
  text-align: center;
  .img {
    width: 2.56rem;
    height: 2.56rem;
    background: url(~src/images/skill_bg.png) no-repeat;
    background-size: cover;
    margin: 0.6rem auto 0;
  }
}
.skill_ag {
  padding-bottom: 1.5rem;
  .skill_ag_tit {
    height: 1.2rem;
    position: relative;
    span {
      display: block;
      width: 2.5rem;
      line-height: 1.2rem;
      text-align: center;
      position: relative;
      margin: 0 auto;
      font-size: 0.32rem;
    }
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: @border_color;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .skill_ag_item {
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    margin-bottom: 0.3rem;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    img {
      display: block;
      width: 100%;
      height: 2.5rem;
    }
    h3 {
      font-size: 0.28rem;
      line-height: 0.28rem;
      padding: 0.2rem 0.2rem 0.15rem;
      background: #fff;
    }
    p {
      padding: 0 0.2rem 0.1rem;
      background: #fff;
      .c_888;
    }
  }
}
.skill_btn {
  width: 7.5rem;
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -3.75rem;
  background: #fff;
  .border-t(@line_color);
}
</style>
