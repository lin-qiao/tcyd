<template>
	<div class="router_page">
		<!--S 头部-->
		<div class="l_search_fixed l_search_title">
			<div class="l_search_top title" v-show="isShowSearch">
				<a class="f32 c_main tit_icon left" href="javascript:history.go(-1)"><i class="iconfont icon-arrow-left"></i></a>
				<div class="l_search_box plr20">
					<a class="l_icon_search mr20" @click="search()">
						<i class="iconfont icon-fangdajing f34"></i>
					</a>
					<form class="l_search_form" action="" @submit="search($event)">
						<input class="f26" type="search" placeholder="搜索您感兴趣的" v-model.trim="keyWords" autocomplete="off" />
					</form>
				</div>
			</div>
			<top :isReturn="false" v-show="!isShowSearch" :title="$route.query.name"></top>
		</div>
		<!--E 头部-->
		<!--S 搜索历史-->
		<div class="pt92" v-show="!searchFlag">
			<div class="l_history mlr30" v-show="history.length">
				<p class="l_title">
					搜索历史
				</p>
				<ul class="clearfix">
					<li v-for="el in history">
						<div @click="search(el)" class="ellipsis">
							<i class="iconfont icon-lishi"></i>{{el}}
						</div>
						<i class="iconfont icon-guanbi" @click="del(el)"></i>
					</li>
				</ul>
				<p class="l_history_empty" @click="del()">清空搜索记录</p>
			</div>
		</div>
		<!--E 搜索历史-->
		<div class="bg_gray hei20" v-show="history.length"></div>
		<!--S 热门分类-->
		<div class="l_hot_classify mlr30" v-show="!searchFlag">
			<p class="l_title">
				热门分类
			</p>
			<ul class="clearfix">
				<li v-for="el in hotSearchList" @click="searchSkill(el.skillCategoryId,el.skillCategoryName)">{{el.skillCategoryName}}</li>
			</ul>
		</div>
		<!--E 热门分类-->
		<div class="l_search_fixed l_search_list_con" v-show="searchFlag">
			<mt-loadmore :class="{no_data:!list.length}" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false" style="min-height: 10.2rem;">
				<div class="bg_fff search_title">
					<!--S 广告位-->
					<swiper :imgList ='banner' v-if="!isShowSearch"></swiper>
					<!--E 广告位-->
					<!--S tab-->
					<ul class="filtrate_list_tab pos_rel" v-show="searchFlag">
						<li :class="{on:active==1}" @click="changeCondition(1)">智能排序<i class="iconfont icon-arrow-down f30 ml4"></i></li>
						<li :class="{on:active==2}" @click="changeCondition(2)">筛选条件<i class="iconfont icon-arrow-down f30 ml4"></i></li>
						<li :class="{on:active==3}" @click="changeCondition(3)">全部服务<i class="iconfont icon-arrow-down f30 ml4"></i></li>
						<filter-box class="border-n" :isIndex="false" ref="filter1" @filterList="filterList"></filter-box>
						<filter-list :isIndex="false" :type="type" ref="filter2" @filterList="filerSure"></filter-list>
					</ul>
					<!--E tab-->
				</div>
				<!--背景-->
				<div class="l_bg" v-show="active" @click="hideLayer"></div>
				<!--S 列表-->
				<div v-show="searchFlag">
					<item :userInfo="el" v-for="el in list"></item>
					<nodata v-show="!list.length"></nodata>
				</div>
			</mt-loadmore>
		</div>
		<!--E 列表-->
		
	</div>
</template>

<script>
	import item from '../components/item'//列表单个
	import filterBox from '../components/filter';//筛选
	import {setStore,getStore} from 'src/config/mUtils'//本地存储、获取存储
	import filterList from '../components/filterList';//排序、服务
	import swiper from 'src/components/swiper'//广告位swiper
	import {fetchGeneralImage} from 'src/service/getData'//获取广告位
	import {
		fetchSkillList//获取技能列表
	} from '../service/getData'
	import {
		fetchHotSkillList//获取热门分类
	} from 'src/service/getData'
	export default {
		data() {
			return {
				banner:[],//广告位
				isShowSearch: true,//是否显示头部搜索
				list:[],//列表
				keyWords: '', //关键字
				history: [], //热门分类
				hotSearchList: [], //搜索历史
				searchFlag: false, //是否显示搜索结果
				active:0,//tab选中
				type:'sort',//筛选类型--排序sort 全部服务serviceType
				allLoaded:false,//是否全部加载
				size:5,//每页条数
				serviceType:'',//服务
				sort:0,//排序
				data:{
					position:'index',
					page:1,
					size:this.size,
					sort:0,
					serviceType:'',
					keyWords:'',
					cityCode:CITYCODE,
					longitude:LON,
					latitude:LAT
				}//调接口的数据
			}
		},
		components: {
			item,
			filterBox,
			filterList,
			swiper
		},
		activated() {
			//初始化
			this.active = 0;
			this.allLoaded = false;
			this.serviceType = '';
			this.sort = 0;
			this.data = {
				position:'index',
				page:1,
				size:this.size,
				sort:0,
				serviceType:'',
				keyWords:'',
				cityCode:CITYCODE,
				longitude:LON,
				latitude:LAT
			}
			this.keyWords = "";
			if(this.$route.query.skillId){//查看技能分类
				this.isShowSearch = false;
				this.data.skillSubCategory = this.$route.query.skillId;
				this.searchFlag = true;
				this.getList();
			}else{//点击搜索进入页面
				this.isShowSearch = true;
				this.searchFlag = false;
			}
			
		},
		mounted() {
			//获取广告位
			fetchGeneralImage('SKILL_LIST_AD').then(res=>{
				if(res.data){
					this.banner = res.data.list||[];
				}
			})
			//获取热门分类
			fetchHotSkillList().then((res) => {
				if(res.data){
					this.hotSearchList = res.data.hotList||[];
				}
			})
			//获取历史搜索
			if(getStore('searchHistory')) {
				this.history = JSON.parse(getStore('searchHistory'));
			}
		},
		methods: {
			//tab点击
			changeCondition(i){
				if(this.active==i){
					if(i==2){//筛选条件
						this.$refs.filter1.close();
					}else{
						this.$refs.filter2.close();
					}
					this.active = 0;
				}else{
					if(i==2){//筛选条件
						this.$refs.filter2.close();
						this.$refs.filter1.show();
					}else{
						if(i==1){
							this.type = 'sort';
						}else{
							this.type = 'serviceType';
						}
						this.$refs.filter1.close();
						this.$refs.filter2.show();
					}
					this.active = i;
				}
			},
			//搜索技能
			searchSkill(id,name){
				this.data.page = 1;
				this.data.skillSubCategory = id;
				this.searchFlag = true;
				this.keyWords=name;
				this.getList();
			},
			//关闭所有弹窗
			hideLayer(){
				this.active=0;
				this.$refs.filter1.close();
				this.$refs.filter2.close();
			},
			//搜索关键字
			search(e) {
				if(typeof e == 'object') {
					e.preventDefault();
					this.$el.querySelector(".l_search").blur();
				} else if(typeof e == 'string') {
					this.keyWords = e;
				} else {
					this.keyWords = this.keyWords;
				}
				if(this.keyWords) {
					if(this.keyWords == this.data.keyWords ) {
						return;
					} else {
						this.data.keyWords = this.keyWords;
					}
					/*S 改变本地存储*/
					let index = this.history.indexOf(this.keyWords);
					if(index == -1) {
						this.history.unshift(this.keyWords);
						if(this.history.length>10){
							this.history = this.history.slice(0,10);
						}
					} else {
						this.history.splice(index, 1);
						this.history.unshift(this.keyWords);
					}
					setStore('searchHistory', this.history);
					/*E 改变本地存储*/
					this.data.page = 1;
					this.list = [];
					this.searchFlag = true;
					this.getList();
				} else {
					alertTip("请输入关键字");
				}
			},
			//删除搜索记录
			del(el){
				if(el) {
					//删除某一条
					this.history = this.history.filter((v) => v != el);
					setStore('searchHistory', this.history)
				} else {
					//删除全部
					this.history = [];
					setStore('searchHistory', this.history)
				}
			},
			//获取数据列表
			getList(){
				fetchSkillList(this.data).then(res=>{
					if(res.data){
						if(this.data.page==1){
							this.list = res.data.list||[];
						}else{
							this.list = this.list.concat(res.data.list||[]);
						}
						if(res.data.list&&res.data.list.length>=this.size){
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
			//filterBox组件筛选
			filterList(data){
				this.active = 0;
				delete this.data.gender;//性别
				delete this.data.minAge;delete this.data.maxAge;//年龄
				delete this.data.dist;//距离
				delete this.data.authType;//认证
				delete this.data.media;//媒体
				for(let i in data){
					this.data[i] = data[i];
				}
				this.data.page = 1;
				this.getList();
			},
			//filterList组件筛选
			filerSure(type,id){
				this.active = 0;
				if(this[type]==id){
					return;
				}else{
					this[type] = id;
					this.data[type] = this[type];
					this.getList();
				}
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
.l_search_fixed{
	position: fixed;
	width: 7.5rem;
	left: 50%;
	margin-left: -3.75rem;
}
.l_search_title{
	top:0;
	z-index: 1;
}
.l_search_list_con{
	top: 0.89rem;
	bottom: 0;
	.overflow_scroll;
}
.search_title{
	position: relative;
	z-index: 24;
}
.l_bg{
	position: fixed;
	width: 7.5rem;
	top: 0;
	left: 50%;
	margin-left: -3.75rem;
	bottom: 0;
	background: rgba(0,0,0,0.5);
	z-index: 23;
}

.l_search_top{
	padding-left:1rem;
	.flex;
	.flex_center;
	.l_search_box{
		.flex;
		.flex_center;
		width:6.2rem;
		height:0.64rem;
		background:#f3f3f3;
		.border-radius(.32rem);
	}
	.l_icon_search i{
		color: #bbbbbb;
	}
	.l_search_form{
		input{
			width: 5rem;
			.placeholder(#999);
		}
	}
}
/*历史搜索*/
.l_history {
  .f28;

  .l_title {
    .pt20;
    line-height: 0.54rem;
    padding-bottom: 0.1rem;
  }

  li {
    .flex;
    .flex_center;
    .justify_between;
    height: 0.64rem;

    i {
      .mr20;
      .c_999;
      .f28;
    }

    .icon-close1 {
      .f36;
    }
  }
}

.l_history_empty {
  .mt60;
  .mb24;
  .text_center;
  .c_666;
}
/*热门分类*/
.l_hot_classify {
  .f26;

  .l_title {
    line-height: 0.9rem;
  }

  li {
    .pull_left;
    height: 0.58rem;
    .mr20;
    .mb22;
    .plr34;
    .border(#dfdfdf);
    .border-radius;
    line-height: 0.56rem;
  }
}
</style>
<style lang="less">
	.no_data{
		.mint-loadmore-bottom{
			opacity: 0;
		}
	}
</style>