<template lang="html">
	<div>
		<div class="swiper-container" id="J_videoList">
			<ul class="img_show_list swiper-wrapper">
				<li v-for="(el,i) in videoList" class="video swiper-slide" :style="{'height':height+'rem','background-image':'url('+el.prePhoto+')'}">
					<video width="100%" height="100%" controls="true" :src="el.video">
						当前浏览器不支持 video直接播放，点击这里下载视频： <a :href="el.video">下载视频</a>
					</video>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'imgShow',
		data() {
			return {
				playVideo:'',//播放的视频src
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
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		video{
			width: 100%;
			height: 100%;
		}
	}
}
.video{
	.video_play{
		.flex;
	}
}
</style>
