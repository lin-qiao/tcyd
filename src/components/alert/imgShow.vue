<template lang="html">
	<div>
		<ul class="img_show_list clearfix">
			<li v-for="(el,i) in vedios" :style="{width:width/100+'rem',height:height/100+'rem'}" class="video" @click="play(el.video || el)">
				<img :src="el.prePhoto|imgUrl" alt="" />
				<div class="video_play">
					<i class="iconfont icon-bofang c_fff f70"></i>
				</div>
			</li>
			<li v-for="(el,i) in images" :style="{width:width/100+'rem',height:height/100+'rem'}" @click="look(i)">
				<img :src="el|imgUrl" alt="" />
			</li>
		</ul>
		<!--S 附件轮播-->
		<div class="bg" v-if="show&&images.length" :style="{height:bgHeight+'px'}">
			<div class="swiper-container accessory" id="J_accessory">
				<div class="swiper-wrapper" style="min-height: 4.6rem;">
					<div class="swiper-slide" v-for="el in images">
						<div class="swiper_img_box pos_rel">
							<img :src="el|imgUrl" :style="{'max-height':bgHeight*0.78+'px'}"/>
						</div>
					</div>
				</div>
				<div class="swiper-pagination"></div>
				<div class="swiper-button-prev" v-if="images.length>1">
					<i class="iconfont icon-arrow-left"></i>
				</div>
				<div class="swiper-button-next" v-if="images.length>1">
					<i class="iconfont icon-arrow-right"></i>
				</div>
				<i class="iconfont icon-guanbi" @click="closeImg"></i>
			</div>
		</div>
		<!--E 附件轮播-->
		<!--S 播放视频-->
		<div class="bg" v-if="isPlay" :style="{height:bgHeight+'px'}">
			<div class="accessory pos_rel">
				<i class="iconfont icon-guanbi" @click="isPlay=false;playVideo=''"></i>
				<video width="100%" height="" controls="true" :src="playVideo|imgUrl" autoplay="autoplay">
					当前浏览器不支持 video直接播放，点击这里下载视频： <a :href="playVideo|imgUrl">下载视频</a>
				</video>
			</div>
		</div>
		<!--E 播放视频-->
	</div>
</template>

<script>
	export default {
		name:'imgShow',
		data() {
			return {
				show: false, //是否显示轮播
				index: 1, //轮播的下标
				playVideo:'',//播放的视频src
				isPlay:false,//是否播放视频
				bgHeight:document.body.clientHeight
			}
		},
		props: {
			imgList: { //图片列表--是一个数组时传该值  
				type: Array,
				default: function () {
				    return []
			  	}
			},
			videoList:{//视频列表--是一个数组时传该值
				type: Array,
				default: function () {
				    return []
			  	}
			},
			imgSrc:{  //图片列表--是一个用逗号分隔的字符串时传该值  ""
				type:String,
				default:''
			},
			videoSrc:{  //视频列表--是一个用逗号分隔的字符串时传该值
				type:String,
				default:''
			},
			width:{//图片展示的宽
				default:216
			},
			height:{//图片展示的高
				default:216
			},
			isClick:{//图片是否点击放大 或者视频点击播放
				default:true
			}
		},
		computed:{
			images(){
				if(this.imgSrc){
					return this.imgList.concat(this.imgSrc.split(','));
				}else{
					return [];
				}
			},
			vedios(){
				if(this.videoSrc){
					return this.videoList.concat(this.videoSrc.split(','));
				}else{
					return [];
				}
			}
		},
		methods: {
			//播放视频
			play(el){
				if(!this.isClick){return true}
				this.isPlay = true;
				this.playVideo = el;
			},
			//图片点击放大
			look(i) {
				if(!this.isClick){return true}
				this.show = true;
				this.getSwiper(i);
				this.$emit('clickImg');
			},
			// 关闭
			closeImg() {
				this.show = false;
				this.$emit('closeImg');
			},
			getSwiper(i, j) {
				if(this.images.length>1){
					this.$nextTick(() => {
						new Swiper('#J_accessory', {
							loop: true,
							grabCursor: true,
							paginationClickable: true,
							autoplayDisableOnInteraction: false,
							pagination: '.swiper-pagination',
							paginationType: 'fraction',
							prevButton: '.swiper-button-prev',
							nextButton: '.swiper-button-next',
							observer: true,
							initialSlide: i,
							autoHeight: true,
							onTransitionEnd: function(swiper) {
								swiper.enableTouchControl();
							}
						});
					})
				}else{
					this.$nextTick(() => {
						new Swiper('#J_accessory', {
							loop: true,
							grabCursor: true,
							paginationClickable: true,
							autoplayDisableOnInteraction: false,
							pagination: '.swiper-pagination',
							paginationType: 'fraction',
							prevButton: '.swiper-button-prev',
							nextButton: '.swiper-button-next',
							observer: true,
							initialSlide: i,
							autoHeight: true,
							onSetTransition: function(swiper) {
								swiper.disableTouchControl();
							}
						});
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
img{
	display: block;
}
.img_show_list{
	width:7.2rem;
	display:flex;
	flex-wrap: wrap;
	li{
		flex-shrink:0;
		position:relative;
		float:left;
		.border-radius(0.06rem);
		overflow: hidden;
		margin-right:0.2rem;
		margin-bottom:0.2rem;
		img{
			display: block;
			width: 100%;
			background: rgba(0,0,0,0.2);
			min-height: 100%;
		}
	}
}
.video{
	.video_play{
		.flex;
	}
}
.video_play{
	display: none;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	.flex_center;
	.justify_center;
	background: rgba(0,0,0,0.4);
}
.bg{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 50%;
	width: 7.5rem;
	margin-left: -3.75rem;
	background: rgba(0,0,0,0.4);
	z-index: 100;
	display: flex;
	.flex_center;
	.justify_center;
}
.accessory{
	padding:1rem 0;
	width: 100%;
	max-height: 90%;
	.swiper-button-prev,.swiper-button-next{
		bottom:0;
		background: rgba(215,215,215,0.5);
		width:0.64rem;
		height: 0.64rem;
		border-radius:50%;
		text-align: center;
		i{
			font-size:0.4rem;
			line-height: 0.64rem;
			color:#fff;

		}
	}
	.swiper-pagination{
		font-size:0.3rem;
		color:#ffffff;
	}
	i.icon-guanbi{
		position:absolute;
		top:0.2rem;
		right:0.3rem;
		color:#fff;
		font-size:0.6rem;
	}
}
.bg .swiper-container img{
  max-width: 100%;
  width:auto !important;
  margin:0 auto;
}
</style>
