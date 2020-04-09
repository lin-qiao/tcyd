<template>
	<!--S 更换头像-->
	<div class="upload_avatar">
		<div class="avatar_box">
			<label class="upload_img" v-if="uploadBefore">
        <input type="file" @change="uploadImg($event)"/>
        <i class="iconfont icon-jia upload_icon" v-if="!avatarImg"></i>
        <img class="avatar_img" :src="avatarImg" v-if="avatarImg" @mouseenter="hint=true" @mouseleave="hint=false"/>
        </label>
			<vue-cropper ref="cropper" :img="avatar.img" :outputSize="avatar.size" :outputType="avatar.outputType" :info="avatar.info" :canScale="avatar.canScale" :autoCrop="avatar.autoCrop" :autoCropWidth="avatar.autoCropWidth" :autoCropHeight="avatar.autoCropHeight" :fixed="avatar.fixed" :fixedNumber="avatar.fixedNumber" v-if="!uploadBefore"></vue-cropper>
		</div>
		<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
			<div :style="previews.div">
				<img :src="previews.url" :style="previews.img">
			</div>
		</div>
	</div>
	<!--E 更换头像-->
</template>
<script>
	import vueCropper from './vue-cropper';
	import { fetchUploadFile } from 'src/service/getData'
	export default {
		data() {
			return {
				avatar: {
					img: '',
					info: true,
					size: 1,
					outputSize: 0.3,
					outputType: 'jpeg',
					canScale: false,
					autoCrop: true,
					// 只有自动截图开启 宽度高度才生效
					autoCropWidth: 300,
					autoCropHeight: 300,
					// 开启宽度和高度比例
					fixed: true,
					fixedNumber: [1, 1]
				},
				previews: {},
				avatarImg: '',
				uploadBefore: true,
				pathType: "member_icon_img_path"
			}
		},
		components: {
			vueCropper
		},
		methods: {
			realTime(data) {
				this.previews = data
			},
			uploadImg(event) {
				let files = event.target.files,
					file;
				if(files && files.length > 0) {
					// 获取目前上传的文件
					file = files[0];
					if(file.type.indexOf('image') == -1) {
						alertTip("上传附件只能是图片！");
						return;
					}
					/*if(file.size > 1024 * 1024 * 2) {
						alertTip("附件大小不能超过2MB!");
						return;
					}*/
					this.uploadBefore = false;
					var reader = new FileReader();
					reader.readAsDataURL(file);
					this.avatar.outputType = '.' + file.type.slice(file.type.indexOf("/") + 1);
					reader.onload = (e) => {
						let json = e.target.result;
						this.avatar.img = json;
					}
				}
			},
			//上传
			upload() {
				if(!this.$refs.cropper) {
					alertTip('请选择要上传的头像！');
					return;
				}
				this.$refs.cropper.dataURLtoFile((data,file) => {
			        this.uploadBefore = true;
			        this.avatarImg = data;
			        var formData = new FormData()
					formData.append('pathType', this.pathType)
					formData.append('file', file)
			        fetchUploadFile(formData).then(res => {
						this.$emit('editAvatar',res.data);
					})
				});
			}
		}
	}
</script>
<style lang="less">
	@import (reference) '~src/style/all.less';
	.upload_avatar {
		margin: .5rem auto 0;
	}
	
	.avatar_box {
		width: 3.02rem;
		height: 3.02rem;
		margin: 0 auto;
		.border;
		.upload_img {
			.pos_rel;
			display: block;
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 2.8rem;
			input {
				display: none;
			}
		}
		.upload_icon {
			font-size: .8rem;
			color: #d9d7d7;
		}
		.avatar_img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	
	.avatar_hint {
		margin: .4rem 0 .2rem;
		.text_center;
		line-height: .26rem;
		color: #888;
		.btn_min {
			margin-top: .2rem;
		}
	}
</style>