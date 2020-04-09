<template>
	<div>
		<!--S 头部-->
		<div class="experience_top text_center pt92">
			<p class="f34 mb26">{{title}}</p>
			<p class="f26" v-html="des"></p>
		</div>
		<!--E 头部-->
		<!--S 列表-->
		<p class="experience_title mt50 mlr30">
			<span>{{listname}}</span>
		</p>
		<ul class="experience_list clearfix">
			<li class="ellipsis" :class="{active:selectList.indexOf(el.skillCategoryId)!=-1}" v-for="el in hotList" @click="changeSelect(el.skillCategoryId)">{{el.skillCategoryName}}</li>
		</ul>
		<div v-if="moreHotList.length">
			<div class="text_center" v-if="moreHotList.length">
				<p class="experience_more c_999 f24" @click="isMore=!isMore" :class="{isMore:isMore}">更多<i class="iconfont icon-arrow-down f26 ml4"></i></p>
			</div>
			<ul class="experience_list clearfix" v-if="isMore">
				<li class="ellipsis" :class="{active:selectList.indexOf(el.skillCategoryId)!=-1}" v-for="el in moreHotList" @click="changeSelect(el.skillCategoryId)">{{el.skillCategoryName}}</li>
			</ul>
		</div>
		<!--E 列表-->
	</div>
</template>

<script>
	import {
		fetchHotSkillList//获取热门分类
	} from 'src/service/getData'
	export default{
		data() {
			return {
				hotList: [], //热门技能 
				moreHotList:[],//更多技能
				selectList:[],//已选中的技能id
				isMore:false//是否显示更多
			}
		},
		props:{
			title:{//标题
				default:'一键体验技能赚钱'
			},
			des:{//描述
				default:'可选5个您擅长的技能<br>抢先体验接单在同城约单赚钱吧'
			},
			listname:{//列表名称
				default:'热门技能'
			}
		},
		mounted() {
			//获取热门分类
			fetchHotSkillList().then((res) => {
				if(res.data){
					//当配置的热门分类大于16个时显示前16个,点击更多展示剩余的
					this.hotList = (res.data.hotList||[]).slice(0,16);
					this.moreHotList = (res.data.hotList||[]).slice(16);
				}
			})
		},
		activated(){
			//初始化
			this.isMore = false;
		},
		methods:{
			//改变选择技能
			changeSelect(id){
				if(this.selectList.indexOf(id)==-1){
					if(this.selectList.length>=5){
						alertTip('最多只能选择5个技能');
						return;
					}
					this.selectList.push(id);
				}else{
					this.selectList = this.selectList.filter(v=>v!=id);
				}
			},
			//一键发布
			publicSkill(){
				if(this.selectList.length<5){
					alertTip('请至少选择5个技能');
					return false;
				}
				return true;
			}
		}
	}
</script>

<style scoped lang="less">
@import (reference) '~src/style/all.less';
.experience_top{
	height: 3.04rem;
	background: url(../images/experience_bg.jpg) no-repeat center;
	background-size: 100%;
	line-height: 0.4rem;
	color: #fff;
}
.experience_title{
	height: 0.2rem;
	.border-b;
	text-align:center;
	span{
		padding: 0 0.15rem;
		background: #fff;
		line-height: 0.4rem;
	}
}
.experience_list{
	padding: 0.5rem 0.26rem 0.3rem;
	padding-right: 0;
	.c_666;
	li{
		float: left;
		width: 1.6rem;
		height: 0.6rem;
		.ellipsis;
		background: #f5f5f5;
		line-height: 0.6rem;
		text-align: center;
		.border-radius(0.3rem);
		margin-right: 0.2rem;
		margin-bottom: 0.3rem;
		&.active{
			background: @color;
			.c_fff;
		}
	}
}
.experience_more{
	display: inline-block;
	i{
		display: inline-block;
		.transition(all 0.2s);
	}
	&.isMore{
		i{
			.rotate(180deg);
		}
	}
}
</style>