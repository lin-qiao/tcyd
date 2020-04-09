<template>
	<div class="yl_mode_item">
		<div class="yl_icon">
			<i class="iconfont icon-tupian"></i>
		</div>
		<input type="text" :value="value" @input="$emit('input', $event.target.value)" placeholder="请输入图形验证码" autocomplete="off">
		<div class="yl_imgCode">
			<img src="/api/tc/common/img/login?w=68&h=30" ref="imgCode" @click="getImgCaptcha">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				captchaImg:"",//图形验证码路径
			}
		},
		props:{
			value:{}
		},
		methods:{
			//获取图形验证码
			getImgCaptcha(e){
				this.$refs.imgCode.src = '/api/tc/common/img/login?w=68&h=30&t='+ Math.random();
			}
		}
	}
</script>

<style>
</style>