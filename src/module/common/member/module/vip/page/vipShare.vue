<template>
    <div class="router_page bg_drakRed">
        <div class="vip_head_box plr30">
        	<div class='vip_head'>
	            <img :src="avatar | imgUrl" />
	            <div class="ml10">
	            	<b>用户名<span class="nickname">{{nickname}}</span>的分享</b>
	            </div>
           </div>
        </div>
        <div class="vip_privilege">
        	<h3><img src="../images/tit.png"/></h3>
        	<p class="vip_privilege_label"><span></span>共享·赚钱·社交<span></span></p>
        	<div class="vip_invite_bag">
    			<h2 class="f36 c_drakRed mb40">/// 好友送您【10元红包】///</h2>
    			<p class="f26 c_666">①下载同城APP,登录成功后即可领取(数量有限)</p>
                <p class="f26 c_666">②领券成功升级VIP立减10元，还有价值399的大礼包等着你呦~</p>
        		<div class="vip_redPack_box">
        			<span class="f152 ml30"><i class="f48">￥</i>10</span>
        			<div class="ml10">
        				<em class="block">满10.1元可用</em>
        				<b class="block f36 mt10">APP专用红包</b>
        			</div>
        		</div>
        		<input type="text" placeholder="请输入您的手机号" v-model.trim="phone"/>
        		<a href="javascript:void(0);" @click="goApp">前往APP领取</a>
        	</div>
        </div>
        <div class="vip_freebie_list mb30">
			<p class="f32 c_drakRed pt60 text_center">你/要/的/服/务/都/在/这/里</p>
			<div class="vip_freebie_msg">
				<div class="vip_freebie_good" v-for="v in [1,2,3,4,5,6]">
	    			<img class="vip_freebie_img" src="http://ygzb.oss-cn-beijing.aliyuncs.com/shopsServe/serve1530512535257.png" />
	    			<div class="vip_freebie_price">
	        			<router-link to="/index" class="btn vip_btn">陪看电影<i class="iconfont icon-arrow-right ml10"></i></router-link>
	        			<span class="block">看电影</span>
	        			<em class="block c_drakRed f24 pb20">49137名服务者</em>
	    			</div>
	    		</div>
			</div>
			<router-link to="/index" class="vip_more_service">更多你想要的服务</router-link>
		</div>
    </div>
</template>
<script>
import {REGEX} from 'src/config/env'//正则
export default {
    data() {
    	return {
    		inviteCode:"",//邀请码
    	   	nickname:"121122",//用户名
    	   	avatar:"",//头像
    	   	phone:"",//手机号
    	}
	},
	components: {
		
	},
	mounted(){
		var arr=[];
		var href=window.location.href;
		if(href.indexOf("?")==-1){
			return;
		}
		arr=href.split("?");
		if(!arr[1]){
			return;
		}
		if(!arr[1].indexOf("&")==-1){
			return;
		}
		arr=arr[1].split("&");
		this.inviteCode=arr[0].split("=")[1];
		this.nickname=decodeURI(arr[1].split("=")[1]);
		this.avatar=arr[2].split("=")[1].replace(/%2F/g,"/");
	},
	watch:{
	},
	methods: {
		//前往APP领取
		goApp() {
    		if(!this.phone){
    			alertTip("手机号不能为空");
    			return;
    		}
			if(!REGEX.mobile.regex.test(this.phone)){
				alertTip('请输入正确的手机号');
				return;
			}
			if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
				window.location.href = "com.baidu.tieba://"; //ios app协议
				window.setTimeout(function() {
					window.location.href = "https://itunes.apple.com/cn/app/id477927812";
				}, 2000)
			}
			if(navigator.userAgent.match(/android/i)) {
				window.location.href = "com.baidu.tieba://app"; //android app协议
				window.setTimeout(function() {
					window.location.href = "https://****.apk"; //android 下载地址
				}, 2000)
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
@import "../style/vip.less";
.vip_privilege{
	h3{
		text-align:center;
		padding:0.38rem 0;
		img{
			width:2.82rem;
		}
	}
}
.vip_head{
	.nickname{
		display: inline-block;
		max-width: 3rem;
		vertical-align: middle;
		color: inherit;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
