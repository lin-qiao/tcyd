<!--头部-->
<template>
    <div class="attention_box">
    	<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 我的关注'></top>
    	<div v-if="myAttentionList.length">
	    	<!--S有数据-->
	    	<div class="handle_box flex justify_between">
	    		<span>全部关注（{{myAttentionList.length}}）</span>
	    		<span class="c_666" v-if="!isEdit" @click="isEdit=true"><i class="iconfont icon-edit f26 c_main mr10"></i>编辑</span>
	    		<span class="c_666" v-if="isEdit"  @click="isEdit=false">完成</span>
	    	</div>
	    	<ul class="attention_list">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText="查看更多" :autoFill="false">
					<li class="attention_item " v-for="el in myAttentionList" :key="el.id">
						<div class="flex flex_center plr24">
							<i class="iconfont icon-shanchu f36 c_999 ptb37 mr26" v-if="isEdit" @click="deleteAttention(el.mid)"></i>
							<div class="attention_con flex flex_center flex1" @click="toOtherHome(el.mid)">
								<div class="mr16 pos_rel">
									<span class="attention_crown"></span>
									<img :src="el.icon | imgUrl" class="attention_img">
								</div>
								<div class="attention_infor">
									<h3 class="f28 mb10">
										{{el.nickname}}
										<span class="attention_age" :class="[el.sex == 'male' ? 'bg_blue' : '']"><i class="iconfont f14 mr5" :class="[el.sex == 'male' ? 'icon-nan' : 'icon-nv']"></i>{{el.age}}</span>
									</h3>
								</div>
							</div>
							<div class="attention_distance ml40">
								<p class="f28 c_999 text_right"><i class="iconfont icon-dizhi f24"></i>{{el.distance}}</p>
							</div>
						</div>
					</li>
				</mt-loadmore>
	    	</ul>
	    </div>
    	<!--E有数据-->
    	<!--S无数据-->
    	<div v-else>
			<div class="no_data text_center">
				<img src="~src/images/noAttention.png" alt="">
				<p class="f28 c_666">亲，还没有任何关注呢~</p>
			</div>
    		<!--<div class="recommend_box" v-if="besideList && besideList.length">
	    		<h3 class="attention_recommend">为你推荐</h3>
		    	<ul class="attention_list">
		    		<li class="attention_item" v-for="el in besideList" :key="el.id">
		    			<div class="flex flex_center plr24">
			    			 <i class="iconfont icon-shanchu f36 c_999 ptb37 mr26" v-if="isEdit" @click="delectBtn"></i> 
			    			<div class="attention_con flex flex_center flex1">
			    				<div class="mr16 pos_rel">
			    					<span class="attention_crown"></span>
			    					<img :src="el.headPhoto | imgUrl" class="attention_img">
			    				</div>
			    				<div class="attention_infor">
			    					<h3 class="f28 mb10">
			    						{{el.nickName}}
			    						<span class="attention_age" :class="[el.sex == 'male' ? 'bg_blue' : '']"><i class="iconfont f14 mr5" :class="[el.sex == 'male' ? 'icon-nan' : 'icon-nv']"></i>{{el.age}}</span>
			    					</h3>
			    				</div>
			    			</div>
			    			<div class="attention_distance ml40">
			    				<p class="f28 c_999 text_right"><i class="iconfont icon-dizhi f24"></i>{{el.distance/1000|number(2)}}km</p>
			    			</div>
			    		</div>
		    			<div class="btn_box flex">
		    				<a href="javascript:void(0);" class="attention_btn attention_btn1" @click="setAttention(el.mid)">关注</a>
		    			</div>
		    		</li>
		    	</ul>
		    </div>-->
	    </div>
    	<!--S有数据-->
	</div>
</template>

<script>
import {
	fetchAttentionList, //我的关注列表
	setAttention, //关注
	deleteAttention, //取消关注
	fetchIndexBeside, //身边推荐
} from '../service/getData';
    export default {
    	data(){
            return{
            	isEdit:false,//是否进行编辑
				myAttentionList: [], //我的关注列表
				besideList: [], //身边推荐列表
				page: 1, //页数
				size: 10, //每页条数
				allLoaded:false,//是否全部加载
            }
        },
        components:{
        	
        },
        mounted(){
		},
		activated() {
			this.getMyAttentionList(); //获取我的关注列表
			this.getBesideList(); //获取身边推荐列表
		},
       	methods: {
       		//去他人主页
       		toOtherHome(mid){
       			this.$router.push('/otherHome?mid='+mid);
       		},
			//关注
			setAttention(mid){
				setAttention(mid).then(res => {
					if (res.status) {
						this.getMyAttentionList();
					} else {
						alertTip(res.msg);
					}
				})
			},
			//取消关注
       		deleteAttention(mid){
       			deleteAttention(mid).then(res => {
					if (res.status) {
						this.page = 1;
						this.getMyAttentionList();
					} else {
						alertTip(res.msg);
					}
				})
			},
			//获取我的关注列表
			getMyAttentionList () {
				let para = {
					page: this.page,
					size: this.size
				}
				fetchAttentionList(para).then(res => {
					if (res.status) {
						if (this.page == 1) {
							this.myAttentionList = res.data.list || [];
						} else {
							this.myAttentionList = this.myAttentionList.concat(res.data.list || []);
							this.$refs.loadmore.onBottomLoaded();
						}
						if (res.data.list && res.data.list.length == this.size) {
							this.allLoaded = false;
						} else {
							this.allLoaded = true;
						}
					} else {
						this.allLoaded = true;
					}
				})
			},
			//上拉
			loadTop(){
				this.page = 1;
				this.getMyAttentionList();
				this.$refs.loadmore.onTopLoaded();
			},
			//下拉
			loadBottom(){
				this.page += 1;
				this.getMyAttentionList();
			},
			//获取身边推荐
			getBesideList(){
				fetchIndexBeside('index',window.COUNTYCODE,window.LON,window.LAT).then(res=>{
					if(res.code=='000'&&res.data){
						this.besideList = res.data.list||[];
					}
				})
			}
        }
    }
</script>

<style lang="less" scoped="scoped">
	@import (reference) "~src/style/all.less";
	i{
		vertical-align: middle;
	}
	.bg_blue{
		background: #12adff !important;
	}
	.no_data{
		margin-top: 2rem;
		margin-bottom: 2rem;
		img{
			width: 2.5rem;
			height: 2.5rem;
		}
	}
	.attention_box{
		height:100%;
		background:@bg_color;
	}
	.handle_box{
		.border-b();
		padding:0 0.3rem;
		background:@bg_color;
		& span{
			padding:0.25rem 0;
		}
	}
	.attention_item{
		padding:0.2rem 0;
		margin-bottom:0.2rem;
		background:#fff;
	}
	.attention_img{
		width:0.9rem;
		height:0.9rem;
		.border-radius(50%);
	}
	.attention_crown{
		position: absolute;
		top:-0.1rem;
		left:-0.1rem;
		display: block;
		width:0.39rem;
		height:0.35rem;
		background: url(../images/crown.png) no-repeat;
		z-index: 1;
		background-size: cover;
	}
	.attention_age{
		font-size: 0.18rem;
		color: #fff;
		.border-radius(0.04rem);
		padding:0.02rem 0.1rem;
		background:@color;
	}
	.attention_btn{
		display: block;
		width:1.46rem;
		height:0.64rem;
		line-height:0.64rem;
		color:#fff;
		.gradient_v(#fd6954,@color);
		.border-radius(0.3rem);
		margin-top:0.1rem;
		text-align: center;
	}
	.recommend_box{
		// position: absolute;
		// bottom:0;
		// left:0;
		width: 100%;
	}
	.attention_recommend{
		font-size:0.26rem;
		.border-t();
		.border-b();
		text-align: center;
		background: #fff;
		padding:0.2rem 0;
	}
	.btn_box{
		flex-direction: row-reverse;
		width:100%;
		padding-top:0.1rem;
		.border-t();
		margin-top:0.2rem;
		padding-right: 0.3rem;
	}
	.attention_btn1{
		height:0.64rem;
		line-height: 0.6rem;
		color:@color;
		border:0.03rem solid @color;
		background:none;
		box-shadow: none;
	}
</style>
