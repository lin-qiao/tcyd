<template>
	<div class="pb110">
		<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 技能详情'></top>
		<!--技能顶部信息-->
		<div class="l_skill_detail mb40">
			<item-skill :showCreateTime="true" :skillInfo="skillInfo"></item-skill>
			<p class="flex flex_center justify_between f24 c_666 plr30 mt30">
				<span>{{skillDetails.addDate|date('yyyy-MM-dd')}}创建</span>
				<!--<span class="flex flex_center"><i class="iconfont icon-renzhengguanli f30 l_rz_state mr5"></i>{{skillDetails.authenticationState}}</span>-->
				<span>完整度{{skillDetails.integrity}}%</span>
			</p>
		</div>
		<!--待完善-->
		<ul class="pl30 f28 l_detail_item">
			<!-- <li v-if="video==0">
				<span><i class="iconfont icon-shipin left"></i>视频介绍</span>
				<span class="c_999" @click="jumpVideo()">{{skillDetails.isVideo=='Y'?'已':'可'}}完善<i class="iconfont icon-arrow-right right"></i></span>
			</li> -->
			<li>
				<router-link :to="{path: '/education',query: {skillId:skillId,url:url}}">
					<span><i class="iconfont icon-jiaoyu left"></i>教育经历</span>
					<span class="c_999">{{skillDetails.isEducation=='Y'?'已':'可'}}完善<i class="iconfont icon-arrow-right right"></i></span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path: '/work',query: {skillId:skillId,url:url}}">
					<span><i class="iconfont icon-gongzuojingli left"></i>工作经历</span>
					<span class="c_999">{{skillDetails.isWork=='Y'?'已':'可'}}完善<i class="iconfont icon-arrow-right right"></i></span>
				</router-link>
			</li>
			<li>
				<router-link :to="{path: '/honor',query: {skillId:skillId,url:url}}">
					<span><i class="iconfont icon-jiangzhang left"></i>荣誉资质</span>
					<span class="c_999">{{skillDetails.isHonor=='Y'?'已':'可'}}完善<i class="iconfont icon-arrow-right right"></i></span>
				</router-link>
			</li>
			<li class="border-n">
				<router-link :to="{path: '/ask',query: {skillId:skillId,url:url}}">
					<span><i class="iconfont icon-wenti left"></i>专业问答</span>
					<span class="c_999">{{skillDetails.isProblem=='Y'?'已':'可'}}完善<i class="iconfont icon-arrow-right right"></i></span>
				</router-link>
			</li>
		</ul>
		<div class="line_box"></div>
		<!--技能信息-->
		<element-box title="需求品类" class="l_skill_demand">
			<div slot="content">
				<p class="f28 mb10">专业擅长</p>
				<p class="f26 c_666 mb15" v-for="el in skillDetails.attrList">
					{{el.attrName}}：
					<span v-for="item in el.attrValueList">{{item.name}}</span>
				</p>
				<p class="f28 mb10 pt10 ">技能介绍</p>
				<p class="f26 c_666">{{skillDetails.serviceIntroduced}}</p>
			</div>
            
        </element-box>
        <element-box title="技能信息">
			<div slot="content">
				<div class="mb30 border_b" v-if="skillDetails.skillImg">
					<p class="f28 mb20">技能相册</p>
					<div class="l_skill_img navigate_right mb20">
						<img-show :imgSrc="skillDetails.skillImg" width="110" height="110"></img-show>
					</div>
				</div>
				<p class="f28 mb20">服务方式</p>
				<div class="mb30 flex ">	
					<div class="l_skill_service f26 mr20" v-for="(el,index) in skillDetails.servicePriceList">
						<i class="iconfont icon-touxian f36 mr10"></i>
						{{el.serviceType}}
					</div>
				</div>
				<p class="f28 mb20 pt30 border_t">技能价格</p>
				<p class="f26 c_666 mb15" v-for="el in skillDetails.servicePriceList">{{el.serviceType}}：{{el.price}}元/{{el.unit}}</p>			
				<p class="f28 mb20 pt10 ">接受派单</p>
				<p class="f26 c_666 mb10" v-if="skillDetails.acceptFlag=='Y'">是</p>
				<p class="f26 c_666 mb10" v-if="skillDetails.acceptFlag=='N'">否</p>
			</div>
        </element-box>
        <!--积分-->
        <!--<div class="pt40 pb30 plr30 line">
	        <p class="f28 mb20">积分：{{integral}}</p>
	        <integral-chart :list="listPlus" :bad="badIntegral"></integral-chart>
        </div>-->
        <!--评论-->
        <div>
        	<!--星级-->
        	<div>
				<h2 class="f28 c_333 ptb22 plr30 border_b">雇主评价</h2>
				<ul class="clearfix ptb30">
					<grade title="平均工作态度" :score="workAvg.workAttitudeAvg"></grade>
					<grade title="平均工作准确度" :score="workAvg.workAccuracyAvg"></grade>
					<grade title="平均工作技能" :score="workAvg.workAbilityAvg"></grade>
				</ul>
			</div>
        	<ul class="plr30 l_evaluate_tap mt-12">
        		<li class="active" v-for="el in workAvg.impressionList">{{el.impression}}{{el.count}}</li>
        	</ul>
        	<!--全部评论-->
        	<h2 class="f26 c_555 plr30 ptb20 bg_gray" v-if="evaluationList!=''">全部评价</h2>
			<evaluation-item :list="evaluationList"></evaluation-item>
        </div>
		<!--S 底部按钮-->
		<div class="l_order_footer text_center pt30 pb20">
			<a class="btn_border mlr10" href="javascript:void(0);" @click="SkillDelete()">删除技能</a>
			<a class="btn mlr10" href="javascript:void(0);" @click="SkillUpdate()">编辑技能</a>
		</div>
		<!--E 底部按钮-->
	</div>
</template>

<script>
	import itemSkill from 'src/components/item/itemSkill'
	import elementBox from 'src/components/item/itemElementBox';
	import integralChart from '../../other/components/integralChart';//积分柱形图
	import evaluationItem from '../../other/components/evaluationItem';//每条评论
	import grade from 'src/components/grade'//评价星级
	import imgShow from 'src/components/alert/imgShow'//图片浏览
	import {getInfo} from 'src/config/mUtils';
	import {
		fetchGetSkillDetails,//获取技能详情
		fetchSkillDelete,//删除技能
		fetchUpdateSkillOpenflag,//关闭技能
		fetchGetEvaluationList,//评价列表
	} from '../service/getData'
	export default{
		data(){
			return{
				skillDetails:"",//技能详情
				url:this.$route.path,//当前页面路由
				workAvg:'',//工作评价
				evaluationList:[],//评价列表
				integral:'',//当前技能总积分
				listPlus:[],//柱形图列表
				badIntegral: {name: '差评',integral: 0},
				skillId:'',//技能ID
				skillInfo:{
					name:'',
					grade:'',
					gradeImg:'',
					imgIcon:''
				}//技能名称、技能等级、技能图片等信息
			}
		},
		components:{
			itemSkill,
			elementBox,
			integralChart,
			evaluationItem,
			grade,
			imgShow
		},
		activated(){
			this.skillId=this.$route.query.skillId//技能ID
			this.getSkillDetails()//获取技能详情
			this.getEvaluationList()//获取评价列表
		},
		methods:{
			//获取技能详情
			getSkillDetails(){
				//服务器名称 DDT_TC_MEMBER_SKILL_DETAILS
				fetchGetSkillDetails(this.skillId).then(res => {
					if(res.status){	
						this.skillDetails=res.data.data//技能详情其他信息
						this.skillInfo={
							name:this.skillDetails.skillName,
							grade:this.skillDetails.integralGrade,
							gradeImg:this.skillDetails.levelImg,
							imgIcon:this.skillDetails.categoryImg
						}//技能名称、技能等级、技能图片等信息
//						let integralInfo=JSON.parse(res.data.data.integralInfo)//积分信息字符串转json
//						this.listPlus=integralInfo.skill[0].statisticsList//当前技能积分柱形图列表
//						this.integral=integralInfo.skill[0].integral//当前技能总积分
					}else{
						alertTip(res.msg);
					}
				});
			},
			//获取评价列表
			getEvaluationList(){
				//服务器名称 DDT_TC_ZONE_EVALUATIONLIST
				fetchGetEvaluationList(getInfo('mid'),this.skillId).then(res => {
					if(res.status){	
						this.workAvg=res.data//雇主评价信息
						this.evaluationList=res.data.list//评价列表信息
					}else{
						alertTip(res.msg);
					}
				});
			},
			//删除技能
			SkillDelete(){
				this.$confirm({
					cancelBtn:'删除技能',
					confirmBtn:'关闭技能',
					layerImg:require('src/images/lay_bell.png'),
					content:`
						<div class="flex flex_column">
				            <p class="f28">确定删除${this.skillDetails.skillName}技能?</p>
						    <p class="f24 c_666">如果您只是目前无法应邀或不想应邀<br/>可以选择关闭技能</p>						    
						</div>
						`,
					confirm:() => {
						//服务器名称 DDT_TC_UPDATE_SKILL_OPENFLAG
						fetchUpdateSkillOpenflag(this.skillId,'N').then(res => {
							if(res.status){
								alertTip(res.msg,()=>{
									this.$router.replace('/mySkill');//跳转到我的技能列表
								});
							}else{
								alertTip(res.msg);
							}
						});
					},
					cancel:() => {
						//服务器名称 DDT_TC_SKILL_DELETE
						fetchSkillDelete(this.skillId).then(res => {
							if(res.status){
								alertTip(res.msg,()=>{
									this.$router.replace('/mySkill');//跳转到我的技能列表
								});
							}else{
								alertTip(res.msg);
							}
						});
					}
				})			
			},
			//跳转到编辑技能
			SkillUpdate(){
				this.$router.push({
					path: '/perfectMsg',
					query: {skillId:this.skillId}
      			})
			},
		}
	}
</script>
<style lang="less">
	@import (reference) '~src/style/all.less';
	.l_skill_detail .user_msg{
		padding: 0.1rem 0.3rem;
		padding-top:1.3rem;
		.text_center;
		strong{
			margin-top: 0.04rem;
			display:block;
			margin-bottom: 0.1rem;
		}
		.skill_createTime{
			display: none;
		}
		.user_avatar{
			margin: 0;
			left: 50%;
			margin-left: -0.45rem;
			top: 0.25rem;
			
		}
	}
</style>
<style lang="less" scoped>
	@import (reference) '~src/style/all.less';
	.l_rz_state{
		color: #bebdbd;
	}
	.l_order_footer{
		position: fixed;
		width: 7.5rem;
		left: 50%;
		bottom: 0;
		z-index: 2;
		margin-left: -3.75rem;
		background: #fff;
		.border-t(#eaeaea);
		.box_shadow(@shadow:0 0px 0.2rem rgba(0, 0, 0, 0.1));
		a{
			width: 2.66rem;
		}
	}
	.l_detail_item{
		li{
			.pr30;
			height: 0.89rem;
			.border-b(#e8e8e8);
			a{
				.flex;
				.flex_center;
				.justify_between;
				height: 100%;
			}
			span{
				.flex;
				.flex_center;
				.left{
					.f34;
					color: #ccc;
					margin-right: 0.1rem;
				}
				.right{
					.f30;
				}
			}
		}
	}
	.l_skill_demand{
		line-height: 0.4rem;
	}
	.l_skill_img{
		img{
			width: 1.1rem;
			height: 1.1rem;
			margin-right: 0.3rem;
		}
	}
	.l_skill_service{
		.flex;
		.flex_center;
		.justify_center;
		width: 2.18rem;
		height: 0.78rem;
		.border-radius(0.1rem);
		border: 0.02rem solid @color;
		.c_main;
	}
	.l_evaluate_tap{
		.flex;
		flex-wrap: wrap;
		li{
			flex-shrink:0;
			height: 0.5rem;
			padding: 0 0.15rem;
			margin: 0 0.15rem 0.3rem 0.15rem;
			.border-radius(0.25rem);
			.border;
			line-height: 0.48rem;
			.c_999;
			&.active{
				border-color: @color;
				.c_main;
			}
		}
	}
</style>