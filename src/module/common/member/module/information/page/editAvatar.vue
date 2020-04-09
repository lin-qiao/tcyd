<template>
	<div class="bg_gray" style="min-height: 100%;">
		<!-- S 头部-->
		<top :title="'修改头像'"></top>
		<!-- E 头部-->
		<upload-avatar @editAvatar="editAvatar" ref="avatar"></upload-avatar>
		<a class="btn_block mt60" @click="save">保存</a>
	</div>
</template>

<script>
import uploadAvatar from 'src/components/uploads/uploadAvatar'//上传头像组件
import {
	fetchEditAvatar //修改头像
} from '../service/getData'
export default {
	data() {
		return {
			avatar:"",//头像
		}
	},
	components: {
		uploadAvatar
	},
	activated(){
		this.avatar=this.$route.query.avatar||"";
	},
	methods: {
		//保存
		save(){
			this.$refs.avatar.upload();
		},
		//修改头像
		editAvatar(data){
			fetchEditAvatar(data).then(res=>{
				if(res.status){
					alertTip("修改成功");
					this.$router.back(-1);
				}
			})
		}
	}
}
</script>


