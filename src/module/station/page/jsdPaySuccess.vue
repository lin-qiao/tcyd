<template>
	<div class="pb121">
		<!--S 头部-->
		<div class="title">
            <a class="tit_icon left" @click="handleClickLeft">
                <i class="iconfont icon-arrow-left" ></i>
                <span>关闭</span>
            </a>
            <div class="tit_font">同城约单</div>
       </div>
		<!--E 头部-->
		<div class="detail_wrap">
			<img src="../images/mascot_jsd.png" alt="" class="mascot" />
			<div class="info">恭喜您已成为同城约单公爵站长</div>
			<div class="reminder">快下载同城约单APP享受您的站长特权吧！<br>
				因ios暂未上线，ios用户可关注公众号进行操作<br>
				公众号：<span class="c_main">tcydAPP</span>
			</div>
			<a href="javascript:void(0);" class="btn_down" @click="downLoadApp">立即下载APP</a>
		</div>
	</div>
</template>

<script>
import {isAndroid} from 'src/config/env'; //安卓
import {appDownLoad} from 'src/config/mUtils'; //app下载方法
export default{
	data(){
		return{
		}
	},
	activated(){
		
	},
    mounted() {
    
    },
	methods: {
		//下载
		downLoadApp () {
			appDownLoad();
		},
		//跳转
		handleClickLeft () {
			if (this.$store.state.platform == 'wx') {
				this.$router.go(-1);
			} else {
				if (isAndroid) {
					window.android.exitWebAct();//关闭界面
				} else {
					window.location.href = 'jsd://JSDLCHome/dimssToHomeVC';
				}
			}
		},
	}
}
</script>
<style lang="less">
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.detail_wrap{
	margin: 1.6rem 0.3rem 0;
	text-align: center;
	.mascot{
		width:2.4rem;
		margin-bottom:0.5rem;
	}
}
.info{
	font-weight: bold;
	font-size: 0.36rem;
}
.reminder{
	margin: 0.3rem 0 0.55rem; 
	line-height: 0.5rem;
	font-size: 0.3rem;
	color: #666666;
}
.btn_down{
	display: block;
	width: 2.96rem;
	height: 0.8rem;
	margin: 0 auto;
	border-radius: 0.05rem;
	.gradient_v(#fe603a,#ef2b2e);
	line-height: 0.8rem;
	font-size: 0.28rem;
	text-align: center;
	color: #fff;
}
</style>