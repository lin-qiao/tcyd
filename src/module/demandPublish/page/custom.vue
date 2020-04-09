<template>
    <div>
        <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>发布需求</span>" left="<p class='c_main'>取消</p>" right="<p class='c_main'>完成定制</p>" @clickRight="handleClickRight" @clickLeft="handleClickLeft">
        </top>
        <div class="customized">
            <div class="custom_tit">已定制的品类</div>
            <ul class="customized_list">
                <li class="customized_item">
                    <img src="~src/images/add.png" alt="">
                    <p>VI系统设计</p>
                </li>
                <li class="customized_item">
                    <img src="~src/images/add.png" alt="">
                    <p>VI系统设计</p>
                </li>
                <li class="customized_item">
                    <img src="~src/images/add.png" alt="">
                    <p>VI系统设计</p>
                </li>
                <li class="customized_item">
                    <img src="~src/images/add.png" alt="">
                    <p>VI系统设计</p>
                </li>
                <li class="customized_item">
                    <img src="~src/images/add.png" alt="">
                    <p>VI系统设计</p>
                </li>
                <li class="customized_item">
                    <img src="~src/images/add.png" alt="">
                    <p>VI系统设计</p>
                </li>
                <li class="customized_item">
                    <img src="~src/images/add.png" alt="">
                </li>
            </ul>
        </div>
        <div class="custom">
            <div class="custom_tit">请选择您要定制的品类</div>
            <dl class="custom_list">
                <dt class="custom_dt">
                    <img src="~src/components/images/orderMoney.png" alt="">
                    <span>热门推荐</span>
                </dt>
                <dd class="custom_dd">
                    <a class="custom_item">看电影</a>
                    <a class="custom_item hot">看电影</a>
                    <a class="custom_item hot cur">看电影</a>
                    <a class="custom_item">看电影</a>
                    <a class="custom_item">看电影</a>
                    <a class="custom_item">看电影</a>
                </dd>
                <dt class="custom_dt">
                    <img src="~src/components/images/orderMoney.png" alt="">
                    <span>热门推荐</span>
                </dt>
                <dd class="custom_dd">
                    <a class="custom_item">看电影</a>
                    <a class="custom_item hot">看电影</a>
                    <a class="custom_item hot cur">看电影</a>
                    <a class="custom_item">看电影</a>
                    <a class="custom_item">看电影</a>
                    <a class="custom_item">看电影</a>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClickRight() {
      console.log(1)
    },
    handleClickLeft() {
      console.log(1)
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.custom_tit {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.26rem;
  .plr30;
  .bg_gray;
}
.customized_list {
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.3rem;
  .customized_item {
    width: 20%;
    text-align: center;
    position: relative;
    margin-bottom: 0.3rem;
    &:last-child {
      &::after {
        display: none;
      }
    }
    &::after {
      content: '';
      display: block;
      width: 0.38rem;
      height: 0.38rem;
      background: url(~src/images/minus.png) no-repeat;
      background-size: cover;
      position: absolute;
      right: 0.2rem;
      top: -0.1rem;
    }
    img {
      width: 0.74rem;
      height: 0.74rem;
    }
    p {
      .f26;
      .c_666;
      .mt5;
    }
  }
}
.custom_list {
  .plr30;
  .custom_dt {
    display: flex;
    margin: 0.27rem 0 0.07rem;
    img {
      width: 0.38rem;
      height: 0.38rem;
    }
    span {
      .f26;
      margin-left: 0.15rem;
    }
  }
  .custom_dd {
    width: 7.1rem;
    display: flex;
    flex-wrap: wrap;
  }
  .custom_item {
    display: block;
    width: 1.57rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.3rem;
    text-align: center;
    .f26;
    .bg_gray;
    .c_666;
    margin: 0.2rem 0.2rem 0.2rem 0;
    position: relative;
    &.hot {
      &::after {
        content: '';
        display: block;
        width: 0.56rem;
        height: 0.29rem;
        background: url(~src/images/hot.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: -0.12rem;
        right: -0.1rem;
      }
    }
    &.cur {
      background: @color !important;
      color: #fff !important;
    }
  }
}
</style>
