<template lang="html">
	<div class="l_loading_img">
		<img src="~src/images/loading_.gif" alt="" />
	</div>
</template>

<script>
	import {fetchGetMess} from '../service/getData';
	export default {
		activated(){
			sessionStorage.setItem('isLogin', 1) //缓存登录状态
			this.toUrl();
		},
		methods:{
			toUrl(){
				let url = sessionStorage.backUrl;
				//回调地址
				if(url){
					sessionStorage.removeItem('backUrl');
					if(url.indexOf("http")>-1){
	    		   	    window.location.href=url;
	    		    }else{
	    		   	    this.$router.replace(url);
	    		    }
				}else{
					this.$router.replace('/account');
				}
			}
		}
	}

</script>

<style lang="less">
	.l_loading_img{
		padding-top: 3rem;
		img{
			display: block;
			width: 3rem;
			margin: 0 auto;
		}
	}
</style>
