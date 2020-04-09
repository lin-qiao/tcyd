<template lang="html">
    <div class="el_box" @click="goRecord">
        <div class="el_box_tit" :class="{'border-n':noBorder}">
            <div class="flex flex_center">
                <div class="el_line"></div>
                <div class="f30" v-html="title" v-if="title">
                </div>
                <div class="f30" v-if="!title">
                	<slot name="tit"></slot>
                </div>
            </div>
            <div class="pr30">
                <slot name="title"></slot>
            </div>
        </div>
        <div class="el_box_info" v-if="!noContent" :class="{el_pos_info:isPos}">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
	props: {
	    title: {
	      type: String,
	      default: ''
	    },
	    noBorder: {
	      default: false
	    },
	    noContent: {
	      default: false
	    },
	    isPos: {
	      //是否定位
	      default: false
	    }
	},
    methods:{
	    goRecord(){
	        this.$emit("click")
	    }
	}
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.el_box {
  padding-left: 0.3rem;
  border-bottom: 0.2rem solid @bg_color;
  position: relative;
  &:last-of-type {
    border-bottom: none;
  }
  .el_box_tit {
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .border-b(@line_color);
  }
  .el_line {
    width: 0.08rem;
    height: 0.32rem;
    background: @color;
    margin-right: 0.2rem;
    border-radius:0.04rem;
  }
  .el_box_info {
    padding: 0.3rem 0.3rem 0.3rem 0;
  }
  .el_pos_info {
    padding: 0.3rem 0 0;
    position: absolute;
    top: 0.8rem;
    left: 0rem;
    width: 7.5rem;
    background: #fff;
    z-index: 24;
  }
}
</style>
