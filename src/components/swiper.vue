<template>
	<div class="swiper-container" id="J_advertising" v-if="imgList.length>0">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="el in imgList">
				<a :href="el.url">
					<img :src="el.image|imgUrl" class="adv_img"><!--|imgUrl-->
				</a>
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			imgList:{
				default:Array
			}
		},
		mounted(){
			
		},
		watch:{
			imgList(){
				this.$nextTick(()=>{  
					if(this.imgList.length>1){
						new Swiper('#J_advertising', {
							loop: true,
							grabCursor: true,
							autoplay: 3000,
							autoplayDisableOnInteraction:false,
							pagination: '.swiper-pagination'
						});
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.swiper-container{
		img{
			display: block;
			width:100%;
			height:100%;
		}
	}
</style>