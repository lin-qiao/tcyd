<template>
	<div class="pb98 router_page">
		<!-- S 头部-->
		<top title="支持银行卡"></top>
		<!-- E 头部-->
		<h3 class="pl30 f26 c_333 ptb30">目前只支持储蓄卡</h3>
		<div class="hei20 bg_gray"></div>
		<div class="bank_tit" v-for="el in backList" @click="selectBank(el)">
            <img :src="el.remark|imgUrl" />
            <div class="bank_tit_con">
                <span class="f32 c_333">{{el.name}}</span>
               <!-- <p class="f26 c_999 mt12">首次限额0.1W，单日限额0.1W</p>-->
            </div>
        </div>
		
	</div>
</template>

<script>
import { fetchDictionapyList } from 'src/service/getData'
export default {
  data() {
    return {
      code: 'YHMC',
      backList: [] //银行列表
    }
  },
  activated() {
    this.getBankList()
  },
  methods: {
    getBankList() {
      //获取银行列表
      fetchDictionapyList(this.code).then(res => {
        if (res.code == '000') {
          this.backList = res.data.list
        }
      })
    },
    selectBank(data) {
      //选择银行
      this.$store.state.bankCode = data.code
      this.$store.state.bankName = data.name
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all';
.bank_tit {
  height: 1.6rem;
  .flex;
  .flex_center;
  width: 7.2rem;
  margin-left: 0.3rem;
  border-bottom: 1px solid #e8e8e8;
  img {
    height: 0.86rem;
    margin-right: 0.4rem;
  }
}
</style>


