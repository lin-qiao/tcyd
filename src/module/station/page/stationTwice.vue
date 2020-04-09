<template>
	<div>
		<!--S 头部-->
		<top class="zIndex" :isReturn="false" :title="nickname+'邀请的站长'"></top>
		<!--E 头部-->
		<div class="packet_box">
			<div class="ptb30 plr30 flex flex_center justify_between">
				<p class="f26">累计邀请人数(个) <span class="ml10">{{inviteCount}}</span></p>
				<p class="f26">累计贡献佣金(元) <span class="ml10">{{brokerageTotal}}</span></p>
			</div>
			<div class="invite_list">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
					<!--S 列表-->
					<ul class="pl30">
						<com-invite-item level="level2" :isShowNext="false" :list="tabList" v-if="tabList.length"></com-invite-item>
					</ul>
					<!--E 列表-->
				</mt-loadmore>
			</div>
		</div>
		<div v-if="!tabList.length">
			<nodata notice="亲，暂无记录~"></nodata>
		</div>
	</div>
</template>

<script>
import comInviteItem from '../components/com-inviteItem'	//列表
import {
	fetchStationInviteTwice, //根据mid查询用户的邀请站长列表
} from '../service/getData' 
	export default{
		data(){
			return{
				tabList:[],			//列表
			    allLoaded:false,  	//列表=>是否全部加载
			    page:1,				//列表=>分页
			    size:10,			//列表=>数量
			    mid:'',				//列表=>参数id
			    nickname:'',		//用户名
				brokerageTotal: 0,  //累计佣金
				inviteCount: 0,     //累计邀请人数
			}
		},
		components:{
			comInviteItem,
		},
		activated() {
			this.mid=this.$route.query.mid;
			this.nickname=this.$route.query.nickname;
			this.getList();
		},
		methods: {
			getList(){
				fetchStationInviteTwice(this.mid,this.page,this.size).then(res=>{
					if (res.data) {
						this.inviteCount = res.data.inviteCount;
						this.brokerageTotal= res.data.contributeBrokerageTotal;
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
				this.getList();		//查询我邀请的站长列表
			},
			loadBottom(){	//上拉加载
				this.page += 1;
				this.getList();		//查询我邀请的站长列表
			}
		},
	}
</script>


<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.zIndex{
	z-index: 1;
}
.invite_list{
	position: absolute;
    top: 1.9rem;
    bottom: 0;
    left: 0;
    width: 100%;
    .overflow_scroll;
}
</style>