<template>
	<div class="">
		<div class="fixed">
			<a href="javascript:void(0);" @click="downLoadApp"></a>
		</div>
		<div class="bg bg_1"></div>
		<div class="bg bg_2"></div>
		<div class="bg bg_3">
			<div class="avatar">
				<img :src="headPhoto | imgUrl" alt="">
			</div>
			<div class="tip">
				<p>hi,我入驻同城约单啦！</p>
				<p><em data-text="真朋友，有“服”同享">真朋友，有“服”同享</em><span data-text=",一起来同城约单吧！">,一起来同城约单吧！</span></p>
			</div>
		</div>
		<div class="bg bg_4 plr70">
            <formWrap></formWrap>
		</div>
		<div class="bg bg_5"></div>
		<div class="bg bg_6"></div>
		<div class="bg bg_7"></div>
		<div class="bg bg_8"></div>
		<div class="bg bg_9"></div>
		<div class="bg bg_10"></div>
		<div class="bg bg_11"></div>
		<div class="bg bg_12"></div>
		<div class="bg bg_13"></div>
		<div class="bg bg_14"></div>
		<div class="bg bg_15"></div>
		<div class="bg bg_16"></div>
		<div class="bg bg_17"></div>
		<div class="bg bg_18"></div>
	</div>
</template>

<script>
import {
    memberInfo //用户信息
} from 'src/module/other/service/getData';
import formWrap from '../components/form';
import {appDownLoad} from 'src/config/mUtils'; //app下载方法
export default {
	data(){
		return{
			headPhoto:"",//用户头像
		}
	},
	activated(){
		if(this.GetQueryString('headPhoto')){
			this.headPhoto = this.$route.query.headPhoto;
		}else{
			this.headPhoto =window.location.href.substring(window.location.href.indexOf("&")+11);
		}
	},
	mounted(){
		
	},
	methods:{
		//下载
		downLoadApp () {
			appDownLoad();
		},
		 GetQueryString(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		}
	},
	components:{
		formWrap
	}

}
</script>
<style lang="less" scoped>
.bg-loop(@n, @i: 1) when (@i =< @n) {
  .bg_@{i} {
    background-image: url('../images/bg_@{i}.jpg')
  }
  .bg-loop(@n, (@i + 1));
}
.bg-loop(18);

.fixed{
	width: 7.5rem;
	height: .97rem;
	background: url(../images/top_fixed.jpg) no-repeat;
	background-size: cover;
	position: fixed;
	top:0;
	left: 50%;
	margin-left: -3.75rem;
	z-index: 2;
	a{
		display: block;
		width: 1.95rem;
		height: .63rem;
		position: absolute;
		top:0;
		bottom: 0;
		right: .35rem;
		margin: auto;
	}
}

.bg{
	width: 100%;
	height: 3.47rem;
	margin-top:-1px;
	position: relative;
	background-repeat: no-repeat;
	background-size: cover;
}
.bg_4{
	height: 3.46rem;
}

.avatar{
	width: 1.67rem;
	height: 1.67rem;
	background: url(../images/avatar_bg.png) no-repeat;
	background-size: cover;
	position: absolute;
	top:.25rem;
	left: 0;
	right: 0;
	margin: auto;
	padding: .05rem;
	img{
		border-radius: 50%;
		display: block;
		width: 100%;
		height: 100%;
	}
}

.tip{
	position: absolute;
	top:2.1rem;
	left: 0;
	right: 0;
	margin: auto;
	p{
		color: #fff;
		text-align: center;
	    font-size: .3rem;
		margin-bottom: .2rem;
	}
	em{
		font-size: .32rem;
		margin: 0 .1rem;
		color: #ffdf48;
		position: relative;
		z-index: 1;
		&::before{
			width: 100%;
			content: attr(data-text);
			position: absolute;
			-webkit-text-stroke: .08rem #92050e;
			z-index: -1;
		}
	}
	span{
		font-size: .32rem;
		margin: 0 .1rem;
		position: relative;
		z-index: 1;
		&::before{
			width: 100%;
			content: attr(data-text);
			position: absolute;
			-webkit-text-stroke: .08rem #92050e;
			z-index: -1;
		}
	}
}
</style>
