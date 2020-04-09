<template>
    <div class="">
        <div class="vip_head_box plr30">
        	<div class='vip_head'>
	            <img :src="userInfo.icon | imgUrl" />
	            <div class="ml10">
	            	<b>用户名{{userInfo.nickname}} <em :class="{active:userInfo.isVip}">{{userInfo.isVip?"":"非"}}VIP</em></b>
	            	<span class="f22" v-show="!userInfo.isVip">您还不是VIP用户哦</span>
	            </div>
            </div>
            <!--<div class="c_dull_yellow f22" @click="visible=true">
            	联系推荐人<i class="iconfont icon-erweima1 f40 ml10 middle"></i>
            </div>-->
        </div>
        <!--S 推荐人二维码-->
        <div v-show="visible" class="layer_shadow">
	        <section class="layer_box">
	            <i class="iconfont icon-close1" @click="visible=false"></i>
	            <div class="add_referrer">
		            <strong class="f36">添加推荐人</strong>
		            <p class="f32 c_999 mt10">指导您如何分享赚钱</p>
		            <img class="layer_img" src="../images/ewm.png"/>
		            <a href="javascript:void(0);">保存微信二维码</a>
	            </div>
	        </section>
	    </div>
        <!--E 推荐人二维码-->
	</div>
</template>
<script>
export default {
    data() {
    	return {
    	   visible:false,//是否展示推荐人二维码
    	   
    	}
	},
	props:{
		userInfo:{
			type:Object
		}
	},
	components: {
		
	},
	mounted(){
	},
	watch:{
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
@import "../style/vip.less";
</style>
