<template>
	<div class="bg_gray" style="min-height: 100%;">
		<!-- S 头部-->
		<top :title="'修改个人介绍'"></top>
		<!-- E 头部-->
		<div class="bg_fff h_form mt30 text_left">
			<form-textarea input_placeholder="请输入个人介绍" height="6" maxlength="150" v-model.trim="introduction"></form-textarea>
		</div>
		<a href="javascriopt:void(0)" class="btn_block mt60" @click="editIntroduction">确定</a>
	</div>
</template>

<script>
import formTextarea from 'src/components/formItem/formTextarea'
import {
	fetchEditIntroduction,//修改个人简介
} from '../service/getData'
export default {
	data() {
		return {
			introduction:"",//个人简介
		}
	},
	components: {
		formTextarea
	},
	activated(){
		this.introduction=this.$route.query.introduction||"";
	},
	methods: {
		//修改个人简介
		editIntroduction(){
			if(!this.introduction){
				alertTip("个人简介不能为空");
				return;
			}
			fetchEditIntroduction(this.introduction).then(res=>{
				alertTip("修改成功");
				this.$router.back(-1);
			})
		}
	}
}
</script>
<style lang="less">
.h_form{
	.from_item .from_item_textarea {
		textarea{
			padding: 0.3rem !important;
		}
		.num{
			padding: 0 0.3rem;
		}
	}
}
</style>



