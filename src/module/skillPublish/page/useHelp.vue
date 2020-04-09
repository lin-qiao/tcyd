<template lang="html">
    <div class="use_help">
        <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>使用帮助</span>"></top>
        <collapse class="pl30" :list="list" :defaultProps="{articleTypeName:'title',content:'content'}"></collapse>
    </div>
</template>

<script>
import collapse from 'src/components/effector/collapse' //折叠面板
import { fetchProblemList } from 'src/service/getData'
export default {
  data() {
    return {
      list: []
    }
  },
  components: {
    collapse
  },
  activated() {
    fetchProblemList('TC_SkILL_HELP').then(res => {
      this.list = res.data
    })
  }
}
</script>

<style lang="less" scoped>
</style>
