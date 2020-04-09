<template lang="html">
	<div>
		<div class="swiper-container" id="J_videoList">
			<ul class="img_show_list swiper-wrapper">
				<li v-for="(el,i) in videoList" class="video swiper-slide" @click="play(el)" :style="{height:height+'rem'}">
					<img :src="el.prePhoto" alt="" />
					<div class="video_play">
						<i class="iconfont icon-bofang c_fff f70"></i>
					</div>
				</li>
			</ul>
		</div>
		<!--S 播放视频-->
		<div class="bg" v-if="isPlay" :style="{height:bgHeight+'px'}">
			<div class="accessory pos_rel">
				<i class="iconfont icon-guanbi" @click="isPlay=false;playVideo=''"></i>
				<video width="100%" height="" controls="true" :src="playVideo" :poster="posterImg" autoplay="autoplay">
					当前浏览器不支持 video直接播放，点击这里下载视频： <a :href="playVideo">下载视频</a>
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
				playVideo:'',//播放的视频src
				isPlay:false,//是否播放视频
				posterImg: '', //封面图
				bgHeight:document.body.clientHeight
			}
		},
		props: {
			videoList:{//视频列表--是一个数组时传该值
				type: Array,
				default: function () {
				    return []
			  	}
			},
			width:{//图片展示的宽
				default:6
			},
			height:{//图片展示的高
				default:4
			}
		},
		mounted () {
			this.$nextTick(function(){
				var mySwiper = new Swiper('#J_videoList',{
					slidesPerView: 1.2,
					spaceBetween: 15,
					centeredSlides: true,
				});
			})
		},
		methods: {
			//播放视频
			play(el){
				this.isPlay = true;
				this.playVideo = el.video;
				this.posterImg = el.prePhoto;
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
	margin-left: auto;
	margin-right: auto;
	li{
		width: 100%;
		height:100%;
		position:relative;
		.border-radius(0.05rem);
		border: 1px solid #e8e8e8;
		img{
			display: block;
			width: 100%;
			height:100%;
			background: rgba(0,0,0,0.2);
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
	background: rgba(0,0,0,0.2);
}
.bg{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 50%;
	width: 7.5rem;
	margin-left: -3.75rem;
	background: rgba(0,0,0,0.6);
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
