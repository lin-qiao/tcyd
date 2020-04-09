<template>
	<div>
		<div class="pos_rel">
			<top title="需求管理"  rightIcon="icon-shouye"  @clickRight="topRight" :leftShow="false"></top>
			<em class="account_circle" v-if="newsNum"></em>
		</div>
        <div class="demand_list">
    	<mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
        <!--S banner-->
		<swiper :imgList="swiperImgList"></swiper>
		<!--E banner-->
		<!--S tab切换-->
		<ul class="filtrate_list_tab bg_fff">
			<li :class="{'on':status==''}" @click="status=''">全部</li>
			<li :class="{'on':status=='processing'}" @click="status='processing'">进行中</li>
			<li :class="{'on':status=='complete'}" @click="status='complete'">已完成</li>
			<li :class="{'on':status=='expired'}" @click="status='expired'">已过期</li>
		</ul>
		<!--E tab切换-->
		<!--S 需求管理列表-->
		<div class="c_demand_list">
			<div class="c_dlist_con" v-if="requireList.length" v-for="el in requireList" @click="goRequireDetail(el.id)">
				<div class="plr30 pt30">
					<p class="c_dlist_title"><em>{{el.skillCategoryName}}</em><em class="c_main">{{el.status|inviteStatus}}</em></p>
					<p class="f24 c_888 pb30">
						<span class="mr10" v-if="el.status!='expired'">{{el.overdueTime}}天后过期</span>
						<span class="mr10" v-if="el.status=='expired'">需求已过期</span>
						<span>发布时间：{{el.publishTime|date}}</span>
					</p>
					<div class="c_list_answer" :class="{'navigate_right':el.headPhoto.length>6}" v-if="el.serviceCount>0">
						<span>
							已有<em class="c_main">{{el.serviceCount}}</em>人应邀
						</span>
						<div class="pos_rel" v-for="(els,i) in el.headPhoto" v-if="i<=6">
					    	<img :src='els|imgUrl'/>
					    	<em class="account_circle" v-show="false"></em>
					    </div>
					</div>
					<div class="c_list_answer" v-else>
						暂无应邀
					</div>
				</div>
				<div class="hei20 bg_gray"></div>
			</div>
		</div>
		<!--E 需求管理列表-->
		</mt-loadmore>
		</div>
		<!--S 底部-->
		<footer-nav :active="2"></footer-nav>
		<!--E 底部-->
		<!--S 什么是需求管理-->
		<div v-if="showAlertInquiry" class="layer_shadow">
            <section class="layer_box">
            	<img class="c_demand_manage" src="../images/demand_layer.png"/>
            	<div class="btn c_know_btn" @click="showAlertInquiry=false">知道了</div>
            </section>
        </div>
		<!--E 什么是需求管理-->
		<nodata v-if='!requireList.length' class="mt100"></nodata>
	</div>
</template>

<script>
import footerNav from 'src/components/footerNav'
import swiper from 'src/components/swiper';//轮播swiper 组件
import {fetchGeneralImage,//banner轮播
	fetchCmsMailList //公告列表
} from 'src/service/getData';
//需求列表
import {fetchRequireList} from '../service/getData'
export default {
	data() {
		return {
			swiper:null,
			swiperImgList:[],//轮播图 数组
			showAlertInquiry:false,//什么是需求管理 说明弹窗 系统值显示一次 (微信需要借助数据库才能判断用户是否第一次打开此页面)
			status:"",
			requireList:[], //需求列表
			page:1, //当前页码
			size:10, //每页条数
			allLoaded:false,//是否全部加载
			newsNum:0//未读公告数目
		}
	},
	components:{
		footerNav,
		swiper,
	},
	watch:{
		status:function(){//需求筛选状态 改变则查询 订单列表
			this.getRequireList()
		}
	},
	methods:{
		cmsMailListFn(){//获取平台公告未读内容
    		this.newsNum = 0;
    		fetchCmsMailList(1,10,"N","tc").then(res=>{//请求公告列表
    			if(res.data){
    				this.newsNum = res.data.total;
    			}
	    	});
    	},
		topRight(){//头部=>右侧点击
			this.$router.push({path:"/news"});
		},
		getRequireList:function(){
			//需求管理列表
			fetchRequireList(this.status,this.page,this.size).then((res)=>{
				if(this.page==1){
					this.requireList=res.data.list||[];
				}else{
					this.requireList=this.requireList.concat(res.data.list||[]);
				}
				if(res.data.list&&res.data.list.length==this.size){
					this.allLoaded = false;
				}else{
					this.allLoaded = true;
				}
				if(this.page==1){
					this.$refs.loadmore.onTopLoaded();
				}else{
					this.$refs.loadmore.onBottomLoaded();
				}
			})
		},
		goRequireDetail:function(requireId){
			this.$router.push('/demandDetail?requireId='+requireId);
		},
		//上拉
		loadTop(){
			this.page = 1;
			this.getRequireList();
		},
		loadBottom(){
			this.page += 1;
			this.getRequireList();
		}
	},
	activated(){
		//广告列表  每次进入页面都需要请求
		this.page = 1;
		this.getRequireList();
		this.cmsMailListFn();
	},
	mounted(){
		//教程提醒
		if(!localStorage.isShowDemand){
			this.showAlertInquiry = true;
			localStorage.isShowDemand = 1;
		}
		//轮播图
		fetchGeneralImage("DEMANDMANAGE").then(res=>{
			this.swiperImgList=res.data.list;
		})
		//请求广告图
		this.$nextTick(function() {
			this.swiper= new Swiper('#J_demand_banner', {
				loop: true,
				grabCursor: true,
				paginationClickable: true,
				autoplay: 3000,
				autoplayDisableOnInteraction: false,
				pagination: '.swiper-pagination'
			})
		})
		
	}

}
</script>
<style lang="less" scoped>
@import '../style/demand.less';
.account_circle{
	position: absolute;
	right:0.16rem;
	top:0.26rem;
	width:0.1rem;
	height:0.1rem;
	.border-radius(50%);
	background:@color;
}
.demand_list{
	.account_circle{
		width:0.12rem;
		height:0.12rem;
	    right: 0.1rem;
    	top: 0.02rem;
    }
}
.l_demand_banner {
  height:1.6rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.l_demand_banner .swiper-pagination{
	padding-right: 0.3rem;
	text-align: right;
	.swiper-pagination-bullet{
		background: rgba(255,255,255,0.5);
		&.swiper-pagination-bullet-active{
			background: rgba(255,255,255,1);
		}
	}
}

.c_demand_manage{
	display: block;
	width:100%;
}
.c_know_btn{
	padding:0;
	width:1.98rem;
	height:0.66rem;
	line-height:0.66rem;
	margin-bottom:0.4rem;
}
.c_dlist_con .c_list_answer{
	height: 0.85rem;	
	overflow: hidden;
	flex-wrap: wrap;
	padding: 0.18rem 0 0;
	margin-bottom: 0.18rem;
	span{
		white-space: nowrap;
		flex-shrink: 0;
		flex-grow: 0;
	}
	&.navigate_right::after{
		right:0;
		margin-top:-0.1rem;
	}
}
.c_list_answer img{
	border-radius: 50%;
	flex-shrink: 0;
	flex-grow: 0;
}
.demand_list{
	position: fixed;
	width: 7.5rem;
	left: 50%;
	margin-left: -3.75rem;
	top: 0.89rem;
	bottom:0.98rem;
	.overflow_scroll;
}
</style>
