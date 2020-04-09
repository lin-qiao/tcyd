<template>
	<div class="router_page">
		<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 身边动态'></top>
		<div class="l_notice_list">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
				<swiper :imgList ='banner'></swiper>
				<item :userInfo="el" v-for="el in list" :isNotice="true" @getList = 'loadTop'></item>
			</mt-loadmore>
			<nodata v-if="!list.length"></nodata>
		</div>
	</div>
</template>

<script>
	import item from '../components/item'//单个动态
	import {fetchBesideList} from '../service/getData'//获取身边动态列表
	import swiper from 'src/components/swiper'//广告位swiper
	import {fetchGeneralImage} from 'src/service/getData'//获取广告位
	export default{
		data(){
			return {
				banner:[],//广告位
				list:[],//列表
				size:10,//每页条数
				allLoaded:false,//是否全部加载
				data:{
					page:1,
					size:10,
					longitude:LON,
					latitude:LAT,
					cityCode:CITYCODE
				}
			}
		},
		components: {
			item,
			swiper
		},
		mounted(){
			//获取广告位
			fetchGeneralImage('DYNAMICS_TOP_SLIDE').then(res=>{
				if(res.data){
					this.banner = res.data.list||[];
				}
			})
		},
		activated(){
			this.data.page = 1;
			this.getList();
		},
		methods:{
			//获取数据列表
			getList(){
				fetchBesideList(this.data).then(res=>{
					if(res.data){
						if(this.data.page==1){
							this.list = res.data.list||[];
						}else{
							this.list = this.list.concat(res.data.list||[]);
						}
						if(res.data.list&&res.data.list.length==this.size){
							this.allLoaded = false;
						}else{
							this.allLoaded = true;
						}
					}else{
						this.allLoaded = true;
					}
					if(this.data.page==1){
						this.$refs.loadmore.onTopLoaded();
					}else{
						this.$refs.loadmore.onBottomLoaded();
					}
				})
			},
			//上拉
			loadTop(){
				this.data.page = 1;
				this.getList();
			},
			//下拉
			loadBottom(){
				this.data.page += 1;
				this.getList();
			}
		}
	}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
	.l_notice_list{
		position: absolute;
		top: 0.89rem;
		bottom: 0;
		left: 0;
		width: 100%;
		.overflow_auto;
		z-index:2;
	}
</style>
<style lang="less">
	.l_notice_banner.swiper-container img{
		display: block;
	}
	.l_notice_banner .swiper-pagination{
		padding-right: 0.3rem;
		text-align: right;
		.swiper-pagination-bullet{
			background: rgba(255,255,255,0.5);
			&.swiper-pagination-bullet-active{
				background: rgba(255,255,255,1);
			}
		}
	}
</style>