<!-- 普通认证结果 -->
<template>
	<div class="pos_rel">
		<!--S 头部-->
		<top title="提交信息" :isReturn="false"></top>
		<!--E 头部-->
		<!--S 内容-->
		<div class="l_certicate">
			<img class="l_certicate_img" v-if="status==3" src="~src/images/ico_2.png"/>
			<img class="l_certicate_img" v-if="status!=3" src="../../images/l_success.png"/>
			<p class="f30" v-if="status==2">恭喜，您已通过了实名认证！</p>
			<p class="f30 c_555" v-if="status==1">您的信息已提交成功！</p>
			<p class="f30 c_888" v-if="status==1">工作人员正在审核中...请耐心等待！</p>
			<p class="f30 c_555" v-if="status==3">很遗憾，您的实名认证未通过审核！</p>
			<p class="f26 c_555" v-if="status==3">失败原因：<span class="c_main">{{info}}</span></p>
			<div class="mlr30 mt60 text_center">
				<router-link class="btn_block" v-if="status!=3" :to="{path:$route.query.url? $route.query.url: '/information'}">确定</router-link>
				<a class="btn mini" v-if="status==3" @click="toCertificate">重新认证</a>
				<a class="btn_border mini ml30"  v-if="showCancel" @click="cancelCertificate">撤销认证</a>
			</div>
		</div>
		<div class="fail_hint" v-if="status == 3">
			<div class="fail_tit"><span>温馨提示</span></div>
			<div class="fail_con">点击撤销企业认证可使个人认证结果生效，否则实名认证结果均为失败。</div>
		</div>

	</div>
</template>

<script>
	import {checkAuthStatus,cancelIdVerify,getWarmPrompt} from 'src/service/getData';

    export default {
    	data(){
            return{
            	status:1,//认证状态 1：审核中2：成功3：失败
            	info:'',//错误原因
            	showCancel:false,//是否显示取消认证按钮
            	hint:''//温馨提示
            }
        },
        components:{

        },
        activated() {
        	this.showCancel = false;
		    checkAuthStatus().then(res=>{
				if(res.data){
					if(res.data.authStatus==0){
						this.$refs.alertTip.alertTipFn(res.msg,()=>{
							this.$refs.certificate.open();
						});
					}else if(res.data.authStatus==1){
						this.status=1;
					}else if(res.data.authStatus==2){
						this.status=2;
					}else if(res.data.authStatus==3){
						this.status=3;
						this.info = res.data.info.failMsg;
						fetchVerifyInfo().then(res=>{
							if(res.code==1&&res.data){
								//实名认证已认证通过，企业认证审核失败
								if(res.data.realNameStatus==2&&res.data.bussinessStatus==3){
									this.showCancel = true;
								}
							}
						})
					}
				}
		    })
		    if(!this.hint){
		    	this.getHint();
		    }
	    },
        methods: {
        	//获取温馨提示
        	getHint(){
        		getWarmPrompt(4).then(res=>{
		    		if(res.data){
		    			this.hint = res.data;
		    		}
		    	})
        	},
        	//重新认证
        	toCertificate(){
        		if(this.$route.query.isHide){
        			if(this.$route.query.type==1){
        				this.$router.push('/personalCertificate?url='+this.$route.query.url)
        			}else if(this.$route.query.type==2){
        				this.$router.push('/companyCertificate?url='+this.$route.query.url)
        			}
        		}else{
        			if(this.showCancel){
        				this.$router.push('/companyCertificate?url='+this.$route.query.url)
        			}else{
        				this.$refs.certificate.open();
        			}
        		}
        	},
        	//取消认证
        	cancelCertificate(){
        		cancelIdVerify().then(res=>{
					this.$router.go(-1);
        		})
        	}
        }
    }
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.l_certicate_img {
  display: block;
  width: 1.48rem;
  height: 1.98rem;
  margin: 1.3rem auto 0.44rem;
}

.l_certicate {
  p {
    .text_center;
    line-height: 0.7rem;
  }
}

.l_certicate_hint {
  .plr30;
  .ptb20;
  .bg_gray;
  .border-b;
  line-height: 1.5em;
  .f26;
  .c_999;
}

.l_certicate_mess {
  .l_title {
    line-height: 0.87rem;
    .f28;
  }
}
.fail_hint{
	width: 7.5rem;
	position: fixed;
	bottom: 0;
	left: 50%;
	margin-left: -3.75rem;
	.fail_tit{
		height: .5rem;
		position: relative;
		font-size: .26rem;
		text-align: center;
		span{
			display: inline-block;
			height: 100%;
			line-height: .5rem;
			padding: 0 .25rem;
			background: #fff;
			position: relative;
			z-index: 1;
		}
		&::after{
			display: block;
			width: 100%;
			height: 1px;
			content: '';
			position: absolute;
			top:0;
			bottom: 0;
			margin: auto;
			background-color: @line_color;
		}
	}
	.fail_con{
		padding: .34rem .34rem .34rem .54rem;
		color: #666;
		line-height: .4rem;
		position: relative;
		&::before{
			content: '';
			display: block;
			width: .14rem;
			height: .14rem;
			background: @color;
			border-radius: 50%;
			position: absolute;
			top:.44rem;
			left: .34rem;

		}
	}
}
</style>
