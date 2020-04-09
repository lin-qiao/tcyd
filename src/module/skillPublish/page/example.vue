<template lang="html">
    <div class="example">
        <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>参考范例</span>"></top>
        <div class="plr30 pt40">
            <div class="example_info">
                <img :src="skillInfo.icon|imgUrl" alt="">
                <div class="example_con">
                    <h3>{{skillInfo.name}}</h3>
                    <p>丰富的技能介绍提高竞争力</p>
                </div>
            </div>
            <div class="example_introduce">
                <h3>技能介绍范例</h3>
                <p v-html="skillInfo.sample"></p>
            </div>
            <div @click="$router.go(-1)" class="btn_block">知道了</div>
        </div>
    </div>
</template>

<script>
import {
  fetchsCategoryDetail //查上面的图片和信息
} from '../service/getData'
export default {
  data() {
    return {
      skillInfo: {}, //信息
      skillSubCategory: '' //技能二级id
    }
  },

  activated() {
    this.skillSubCategory = this.$route.query.skillSubCategory //技能二级id
    //获取头部图片信息
    fetchsCategoryDetail(this.skillSubCategory).then(res => {
      this.skillInfo = res.data
    })
  }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.example {
  .example_info {
    .flex;
    .flex_center;
    height: 1.5rem;
    box-shadow: 0 0 0.2rem 0.05rem #f5f5f5;
    padding: 0 0.2rem;
    img {
      width: 0.9rem;
      height: 0.9rem;
      margin-right: 0.2rem;
    }
    h3 {
      font-size: 0.3rem;
    }
    p {
      font-size: 0.28rem;
      .c_main;
      margin-top: 0.1rem;
    }
  }
  .example_introduce {
    h3 {
      font-size: 0.3rem;
      margin-top: 0.55rem;
    }
    p {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #666;
      margin-top: 0.2rem;
      margin-bottom: 0.6rem;
    }
  }
}
</style>
