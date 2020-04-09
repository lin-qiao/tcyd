<template>
    <div class="bg">
        <top title="问题详情" :isReturn="false" v-if="$store.state.platform=='wx'"></top>
        <!-- S 内容-->
        <div class="f_notice_detail_box">
          <div class="f_notice_detail mb20">
            <div class="f_notice_tit"><i class="iconfont icon-choosehandle f_noticetit_left"></i>{{question.title}}</div>
            <div class="f_notice_note">
              <div class="f28" v-html="question.content"></div>
            </div>
            <div class="f_notice_company">
              <p>山西大德通科技有限公司</p>
              <p>{{question.addTime | date}}</p>
            </div>
          </div>
          <div class="f_notice_detail f_warmtip">
            <p>温馨提示：如您有任何问题请联系</p>
            <p>服务热线：{{telephone}}</p>
            <a class="f_contract" :href="contactKF">
              <i class="iconfont icon-kefu"></i>在线客服
            </a>
          </div>	
        </div>
        <!-- E 内容 -->
    </div>
</template>

<script>
import {fetchProblemDetail} from '../service/getData';
export default {
	data() {
		return {
      question:{}, //问题详情
      problemId: '',
      telephone: this.$store.state.telephone
		}
	},
	components: {
	},
	activated() {
	    this.problemId = this.$route.query.id;
	    this.fetchProblemDetail(); //获取问题详情
	},
	created(){
		if(this.$store.state.platform=='android'){
        	document.title="问题详情";
        }else if(this.$store.state.platform=='ios'){
        	window.location.href="ddt://DTWeb/setTitle?title=问题详情"
        }
	},
	mounted(){
		
	},
	watch:{
	},
	methods: {
    //获取问题详情
    fetchProblemDetail() {
      fetchProblemDetail(this.problemId).then(res => {
        this.question = res.data;
      })
    }
	}
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
	background: @bg_color;
}
.f_notice_detail_box {
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  padding: 0.3rem;
}

.f_notice_detail {
  width: 100%;
  background: #FFFFFF;
  border-radius: 0.04rem;
}

.f_notice_tit {
  position: relative;
  width: 100%;
  font-size: 0.32rem;
  padding: 0.3rem 0.2rem 0.3rem 0.7rem;
  border-bottom: 0.01rem solid #e5e5e5;
  overflow: hidden;
}

.f_noticetit_left {
  position: absolute;
  display: inline-block;
  color: #dd2729;
  margin-right: 0.06rem;
  font-size: 0.4rem;
  vertical-align: middle !important;
  left: 0.2rem;
  top: 0.26rem;
}

.f_notice_note {
  margin: 0 0.26rem;
  padding: 0.3rem 0;
  border-bottom: 0.01rem solid #e5e5e5;
  overflow: hidden;
  img{
    max-width: 100%;
  }
}

.f_notice_note p {
  line-height: 0.46rem;
  font-size: 0.28rem;
}

.f_notice_company {
  padding: 0.2rem 0.3rem;

  p {
    line-height: 0.44rem;
    text-align: right;
    font-size: 0.24rem;
  }
}

.f_warmtip {
  padding: 0.2rem 0.3rem;
  margin-top: 0.16rem;
  position: relative;

  p {
    font-size: 0.26rem;
    line-height: 0.48rem;
    color: #888;
  }
}

.f_contract {
  font-size: 0.26rem;
  color: #dd2729;
  position: absolute;
  top: 0.45rem;
  right: 0.4rem;

  i {
    font-size: 0.4rem;
    margin-right: 0.04rem;
    vertical-align: middle !important;
  }
}
</style>
