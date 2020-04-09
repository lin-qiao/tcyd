<template>
	<div class="router_page bg_gray">
		<!--S头部-->
	    <top title="我的红包" :isReturn="false" right="规则" @clickRight="topRight" class="zIndex1"></top>
	    <!--E头部-->

	    <div class="packet_box">
	    	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
				<div class="bg_fff ptb20">
				    <!--S今日或得、可用红包-->
				    <kind-info title="今日获得 (张)" :money="num" usableTitle="可用红包 (个)" :usable="validNum"></kind-info>
				    <!--E今日或得、可用红包-->
			    </div>
			    <!--S标题-->
			    <element-box title="红包明细" class="border-n" :noContent="true" :noBorder="true"></element-box>
			    <!--E标题-->
			    <!--S红包明细-->
			    <div class="plr30">
			    	<packet-item :list='packList'></packet-item>
			    	<nodata v-if="!packList.length"></nodata> 
			    </div>
			    <!--E红包明细-->
		    </mt-loadmore>
	    </div>
	    <transition name="page-slide">
	     <keep-alive>
				<router-view></router-view>
	     </keep-alive>
		</transition>
	</div>
</template>

<script>
import kindInfo from '../../../components/kindInfo'          //头部统计（今日或得、可用红包）
import swiperList from '../../../components/swiperList'      //轮转图（红包消费）
import advertising from 'src/components/advertising';        //广告位（广告图）
import elementBox from 'src/components/item/itemElementBox'; //标题
import packetItem from '../components/packetItem'            //红包明细
import {fetchRedpackList,fetchRedpackCount} from '../service/getData';//红包明细列表、今日或得、可用红包
import {fetchGeneralImage} from 'src/service/getData';//广告位（广告图）
export default {
	data() {
		return {
		    advList:[],          //广告展示=>列表
		    advCode:'MY_RED_AD', //广告展示=>类型
			page:1,              //红包明细=>当前页码
			size:10,             //红包明细=>每页条数
			packList:[],         //红包明细=>列表
			allLoaded:false,     //红包明细=>是否全部加载
			num:0,               //红包个数=>今日获得 (张)
			validNum:0,          //红包个数=>可用红包 (张)
		}
	},
	components: {
		kindInfo,   //头部统计（今日或得、可用红包）
		swiperList, //轮转图（红包消费）
		elementBox, //标题
		advertising,//广告位（广告图）
		packetItem //红包明细
	},
	activated(){
		//请求今日或得、可用红包
		fetchRedpackCount().then(res=>{
			let data = res.data;
			this.num = data.num;          //红包个数=>今日获得 (张)
			this.validNum = data.validNum;//红包个数=>可用红包 (张)
		})
		this.redpackFun();//请求红包明细
	},
	methods: {
		topRight(){//头部右侧点击=>规则跳链
			this.$router.push({path:"/wallet/redpacketList/userRule"})
		},
		redpackFun(){//请求红包明细
			fetchRedpackList(this.page,this.size).then(res=>{
				let data = res.data;
				if(data){
					if(this.page==1){
					    this.packList = data.list||[];
					    this.$refs.loadmore.onTopLoaded();
					}else{
						this.packList = this.packList.concat(data.list||[]);
						this.$refs.loadmore.onBottomLoaded();
					}

					if(data.list&&data.list.length==this.size){
						this.allLoaded = false;
					}else{
						this.allLoaded = true;
					}

				}else{
					this.allLoaded = true;
				}
			})
		},
		loadTop(){//下拉刷新
			this.page = 1;
			this.redpackFun();//请求红包明细
		},
		loadBottom(){//上拉加载
			this.page += 1;
			this.redpackFun();//请求红包明细
		}
	}
}
</script>
<style lang="less" scoped="scoped">
@import (reference) '~src/style/all.less';
    .zIndex1{
    	z-index: 1;
    }
	.packet_box{
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		padding-top:0.89rem;
		.overflow_scroll;
	}
</style>
