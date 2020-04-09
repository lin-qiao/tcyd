<template>
	<div class="bg_gray" style="min-height: 100%;">
		<!-- S 头部-->
		<top :title="'修改昵称'"></top>
		<!-- E 头部-->
		<div class="bg_fff h_form mt30 text_left">
			<form-input placeholder="请输入昵称" v-model.trim="nickName" :maxlength="15"></form-input>
		</div>
		<a class="btn_block mt60" @click="editNickname">保存</a>
	</div>
</template>

<script>
import formInput from 'src/components/formItem/formInput'
import {
	fetchEditNickname,//修改昵称
} from '../service/getData'
import {REGEX} from 'src/config/env'//正则
export default {
	data() {
		return {
			nickName:"",//昵称
		}
	},
	components: {
		formInput
	},
	activated() {
		this.nickName=this.$route.query.nickName||"";
	},
	methods: {
		//修改昵称
		editNickname(){
			if(!this.nickName){
				alertTip("昵称不能为空");
				return;
			}
			if(REGEX.noHtml.regex.test(this.nickName)){
				alertTip('昵称不能输入特殊字符');
				return;
			}
			fetchEditNickname(this.nickName).then(res=>{
				if(res.status){
					alertTip("修改成功");
					this.$router.back(-1);
				}
			})
		}
	}
}
</script>
<style lang="less">
.h_form{
	.from_item:last-child{
		border-bottom: none;
	}
}
.text_left{
	.from_item input{
		text-align: left !important;
	}
}
</style>


