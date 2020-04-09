<template lang="html">
    <div class="collapse">
        <div class="collapse_item" v-for="(v,i) in list" :class="{current:indexs[i]}">
            <div class="collapse_tit" @click="show(i)">
                <span>{{v[defaultProps.articleTypeName]}}</span>
                <i class="iconfont icon-arrow-down"></i>
            </div>
            <div class="collapse_content">
                <div class="ptb25 pr30" v-html="v[defaultProps.content]"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      indexs: {}
    }
  },
  props: {
    list: {
      type: Array
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          articleTypeName: 'articleTypeName',
          content: 'content'
        }
      }
    }
  },
  methods: {
    show(i) {
      if (this.indexs[i]) {
        this.$set(this.indexs, i, false)
      } else {
        this.$set(this.indexs, i, true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.collapse_item {
  .collapse_tit {
    .flex;
    .flex_center;
    .justify_between;
    .f28;
    line-height: 0.4rem;
    padding: 0.25rem 0.3rem 0.25rem 0;
    .border-b(@line_color);
    span {
      width: 6.33rem;
    }
    .iconfont {
      transition: all 0.3s ease-out;
      .f28;
    }
  }
  .collapse_content {
    max-height: 0;
    .f28;
    line-height: 0.4rem;
    .border-b(#fff);
    overflow: hidden;
    transition: all 0.3s ease-out;
  }
  &.current {
    .collapse_tit {
      .iconfont {
        transform: rotate(180deg);
      }
    }
    .collapse_content {
      max-height: 4rem;
      .border-b(@line_color);
    }
  }
}
</style>
