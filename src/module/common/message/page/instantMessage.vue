<template>
	<div class="router_page">
		<!-- S 内容-->
		<div class="l_im_box">
			<iframe :src="src"></iframe>
		</div>
		<!-- E 内容 -->
	</div>
</template>
<script>
export default {
		data(){
	    return{
	    	src:"/im/index.html#/session"//即时聊天地址
	    }
    },
    activated(){
    	if(this.$route.query.id){
    		this.src = "/im/index.html#/chat/p2p-"+this.$route.query.id;
    	}else{
    		this.src = "/im/index.html#/session";
    	}
    }
}
</script>
<style lang="less" scoped>
	.l_im_box{
		position: fixed;
		top: 0rem;
		bottom: 0;
		width: 7.5rem;
		left: 50%;
		margin-left: -3.75rem;
	}
	.l_im_box iframe{
		border: none;
		width: 100%;
		height: 100%;
	}
</style>
