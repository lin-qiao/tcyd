<!-- 普通认证结果 -->
<template>
	<div class="pos_rel">
		<!--S 头部-->
		<top title="认证结果" :isReturn="false"></top>
		<!--E 头部-->
		<!--S 内容-->
		<div class="l_certicate">
			<template v-if="status == 'wait'">
				<img class="l_certicate_img" src="../../images/l_success.png"/>
				<p class="f30 c_555">您的信息已提交成功！</p>
				<p class="f30 c_888">工作人员正在审核中...请耐心等待！</p>
				<div class="mlr30 mt60 text_center">
					<div class="btn_block" @click="confirm">确定</div>
				</div>
			</template>
			<template v-else-if="status == 'success'">
				<img class="l_certicate_img" src="../../images/l_success.png"/>
				<p class="f30">恭喜，您已通过了实名认证！</p>
				<div class="mlr30 mt60 text_center">
					<div class="btn_block" @click="confirm">确定</div>
				</div>
			</template>
			<template v-else-if="status == 'fail'">
				<img class="l_certicate_img" src="~src/images/ico_2.png"/>
				<p class="f30 c_555">很遗憾，您的实名认证未通过审核！</p>
				<p class="f26 c_555">失败原因：<span class="c_main">{{checkRemark}}</span></p>
				<div class="mlr30 mt60 text_center">
					<a class="btn mini" @click="again">重新认证</a>
					<a class="btn_border mini ml30" @click="cancel">撤销认证</a>
				</div>
			</template>
		</div>
		<div class="fail_hint" v-if="status == 3">
			<div class="fail_tit"><span>温馨提示</span></div>
			<div class="fail_con">点击撤销企业认证可使个人认证结果生效，否则实名认证结果均为失败。</div>
		</div>

	</div>
</template>

<script>
import {
	fetchMemberGetMemberInfo,   //查询认证信息
} from '../../service/getData';
export default {
	data(){
		return{
			status:'',//认证状态 wait：审核中  success：成功  fail：失败
			checkRemark:'',  //审核备注
		}
	},
	components:{

	},
	activated() {
		this.getStatus();
	},
	methods: {
		// 获取认证状态和审核备注
		getStatus(){
			fetchMemberGetMemberInfo().then( res => {
				if(res && res.status){
					this.status = res.data.memberRealName.checkStatus;
					this.checkRemark = res.data.memberRealName.checkRemark;
				}
			})
		},
		//确定
		confirm(){
			this.$router.go(-1);
		},
		//重新认证
		again(){
			this.$router.replace('/personApprove');
		},
		//取消认证
		cancel(){
			this.$router.go(-1);
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
