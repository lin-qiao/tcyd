<template>
	<div>
		<!--S 头部-->
		<top class="zIndex" :isReturn="false" title="我邀请的好友" right="规则" @clickRight="clickRightFn"></top>
		<div class="invite_tab">
			<ul>
				<li :class="{'active':tab==1}" @click="tab=1;getStationList()">邀请成为站长</li>
				<li :class="{'active':tab==2}" @click="tab=2;getList()">邀请成为好友</li>
			</ul>
		</div>
		<!--E 头部-->
		<div class="packet_box">
			<div class="l_invite_top mt30 pt30">
				<ul class="flex flex_center justify_around text_center c_fff">
					<li>
						<p class="f24">一级邀请(人)</p>
						<p class="f40 mt18">{{inviteCountMap.level1?inviteCountMap.level1:0}}</p>
					</li>
					<li>
						<p class="f24">二级邀请(人)</p>
						<p class="f40 mt18">{{inviteCountMap.level2?inviteCountMap.level2:0}}</p>
					</li>
					<li>
						<p class="f24">累计赚取佣金(元) <i class="iconfont icon-bangzhu c_fff f28" @click="inviteModal"></i></p>
						<p class="f40 mt18">{{brokerageTotal}}</p>
					</li>
				</ul>
			</div>
			<div class="invite_list">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
					<!--S 列表-->
					<ul class="pl30" v-if="tab==1&&tabList.length">
						<com-invite-item :list="tabList" @click="goStationPath()" isClick="true" v-if="tabList.length" ref="inviteItem"></com-invite-item>
					</ul>
					<ul class="pl30" v-else-if="tab==2&&list.length">
						<com-invite-item :list="list" @click="goPath()" isClick="true" v-if="list.length" ref="inviteItem"></com-invite-item>
					</ul>
					<!--E 列表-->
					<div v-else>
						<nodata notice="亲，暂无记录~"></nodata>
					</div>
				</mt-loadmore>
			</div>
		</div>
	</div>
</template>

<script>
import layerNodataImg from 'src/images/account.png';        //弹窗图片
import comInviteItem from '../components/com-inviteItem'	//列表
import {
	fetchStationInviteList, //查询我邀请的站长列表
	fetchInviteList, //查询我邀请的注册人列表
} from '../service/getData' 
export default{
	data() {
	    return {
		  inviteCount:0,	//邀请人数
		  inviteCountMap: {}, //一级二级邀请人数
		  brokerageTotal:0,	//佣金
		  bonusSum1: 0, //一级佣金
		  bonusSum2: 0, //二级佣金
		  bonusMap: {}, //各个层级邀请佣金
		  tabList:[],	//站长列表
		  list: [],   //普通用户列表
	      allLoaded:false,  //列表=>是否全部加载
	      page:1,			//列表=>分页
	      size:10,		    //列表=>数量
		  layerNodataImg:layerNodataImg,  //弹窗图片
		  tab: 1,//选项卡
	    }
  	},
	components:{
		comInviteItem,
	},
	activated(){
		this.getStationList();
	},
	methods: {
		clickRightFn(){
			this.$router.push({path:"/stationInviteRule"})
		},
		getStationList(){
			fetchStationInviteList(this.page,this.size).then(res=>{
				if (res.status) {	
					this.inviteCount = res.data.inviteCount;		//邀请人数
					this.inviteCountMap = res.data.inviteCountMap;  //各个层级邀请人数
					this.bonusSum1 = res.data.bonusMap.level1; //一级佣金
					this.bonusSum2 = res.data.bonusMap.level2; //二级佣金
					this.bonusMap = res.data.bonusMap; //各个层级邀请佣金
					this.brokerageTotal = res.data.brokerageTotal.toFixed(2);	//佣金
					if(this.page==1){
					    this.tabList = res.data.list||[];
					    this.$refs.loadmore.onTopLoaded();
					}else{
						this.tabList = this.tabList.concat(res.data.list||[]);
						this.$refs.loadmore.onBottomLoaded();
					}
					
					if(res.data.list&&res.data.list.length==this.size){
						this.allLoaded = false;
					}else{
						this.allLoaded = true;
					}
				} else{
					this.allLoaded = true;
				}
			})
		},
	  	loadTop(){		//下拉刷新
			this.page = 1;
			if (this.tab == 1) {
				this.getStationList();		//查询我邀请的站长列表
			} else {
				this.getList();
			}
		},
		loadBottom(){	//上拉加载
			this.page += 1;
			if (this.tab == 1) {
				this.getStationList();		//查询我邀请的站长列表
			} else {
				this.getList();
			}
		},
		goPath(){
			let mid = this.$refs.inviteItem.mid;
			let nickname = this.$refs.inviteItem.nickname;
			this.$router.push('/stationInviteTwice?mid=' + mid + '&nickname=' + nickname);
		},
		goStationPath(){
			let mid = this.$refs.inviteItem.mid;
			let nickname = this.$refs.inviteItem.nickname;
			this.$router.push('/stationTwice?mid=' + mid + '&nickname=' + nickname);
		},
		//邀请人弹窗
		inviteModal(){
			this.$alert({
				content: `<div class="z_modal"><div>赚取一级佣金：${this.bonusSum1}元</div><div>赚取二级佣金：${this.bonusSum2}元</div></div>`,
				confirmBtn: '知道了',
				layerImg: this.layerNodataImg
			})
		},
		//查询我邀请的注册人列表
		getList () {
			fetchInviteList(this.page,this.size).then(res => {
				if (res.status) {	
					this.inviteCount = res.data.inviteCount;		//邀请人数
					this.inviteCountMap = res.data.inviteCountMap;  //各个层级邀请人数
					this.bonusSum1 = res.data.bonusMap.level1; //一级佣金
					this.bonusSum2 = res.data.bonusMap.level2; //二级佣金
					this.bonusMap = res.data.bonusMap; //各个层级邀请佣金
					this.brokerageTotal = res.data.brokerageTotal.toFixed(2);	//佣金
					if(this.page==1){
					    this.list = res.data.list||[];
					    this.$refs.loadmore.onTopLoaded();
					}else{
						this.list = this.list.concat(res.data.list||[]);
						this.$refs.loadmore.onBottomLoaded();
					}
					
					if(res.data.list&&res.data.list.length==this.size){
						this.allLoaded = false;
					}else{
						this.allLoaded = true;
					}
				} else{
					this.allLoaded = true;
				}
			})
		}
	},
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.invite_tab{
	width: 7.5rem;
	margin: 0 auto;
	height: 0.9rem;
	line-height: 0.9rem;
	ul{
		height: 100%;
		width: 100%;
		.border_b;
		.flex;
		.flex_center;
		.justify_around;
		li{
			text-align: center;
			.f30;
		}
		.active{
			color: @color;
			border-bottom: 0.04rem solid @color;
		}
	}
}
.invite_list{
	position: absolute;
    top: 3.7rem;
    bottom: 0;
    left: 0;
    width: 100%;
    .overflow_scroll;
}
.l_invite_top{
	width: 6.9rem;
	height: 1.5rem;
	background: url(../images/invite_list_bg.png) no-repeat center;
	background-size: 100%;
	margin: 0 auto;
}
.zIndex{
	z-index: 1;
}
</style>