<template>
	<div class="bg router_page">
		<!-- S 顶部按钮 -->
        <div class="z_bg">
			<div class="z_title">
				<a class="z_back_icon pull_left" @click="handleClickLeft">
					<i class="iconfont icon-arrow-left f28"></i>
				</a>
				<a class="z_back_icon pull_right mr0" @click="clickReport">
					<i class="iconfont icon-msnui-more f28"></i>
				</a>
				<a class="z_back_icon pull_right" @click="setAttention">
					<i class="iconfont icon-pingfen f28" :class="{'opacity_5':isAttent == 'N'}"></i>
				</a>
				<a href="javascript:;" class="z_back_icon pull_right pos_rel" @click="share">
					<i class="iconfont icon-fenxiang1 f28"></i>
					<!--<div class="z_redpacket">分享得红包</div>-->
				</a>
			</div>
		</div>
		<!-- E 顶部按钮 -->
		<!-- S 头部个人信息 -->
		<div class="z_personal_data">
			<div class="z_avatar">
				<img :src="memberInfo.headPhoto | imgUrl" alt="">
			</div>
			<p class="z_name">{{memberInfo.nickname}}<em :class="{'bg_blue':memberInfo.gender=='male'}"><i class="iconfont" :class="[memberInfo.gender=='male'?'icon-nan':'icon-nv']"></i>{{memberInfo.age}}</em></p>
			<p class="z_address">{{memberInfo.address}}<span><i class="iconfont icon-dizhi f26 c_666"></i>{{memberInfo.dist|number(2)}}km</span></p>
		</div>
		<!-- E 头部个人信息 -->
		<!-- S 个人动态 -->
		<div class="z_personal_dynamic">
			<router-link :to="'/otherDynamicList?mid=' + mid + '&skillId=' + dataSkillSubCategory + '&notice=' + memberInfo.onlineNotice">
				<span class="c_666 f28">个人动态</span>
				<i class="pull_right iconfont icon-arrow-right c_666"></i>
				<div class="pull_right">
					<div class="img_box" v-for="el in memberDynamicImg" :key="el.id">
						<img :src="el | imgUrl" alt="">
					</div>
				</div>
			</router-link>
		</div>
		<!-- E 个人动态 -->
		<!-- S 认证信息、金币等级、访客 -->
		<div class="z_personal_info">
			<router-link to="/save">
				<span class="c_666 f28">认证信息</span>
				<i class="pull_right iconfont icon-arrow-right c_666"></i>
				<div class="pull_right mr10">
					<span class="icon_a1" v-if="memberInfo.mobileBind == 'Y'"></span>
					<span class="icon_a2" v-if="memberInfo.isVerify == 'Y'"></span>
					<span class="icon_a3" v-if="memberInfo.isSkillCertification == 'Y'"></span>
					<span class="icon_a4" v-if="memberInfo.wxBind == 'Y'"></span>
					<span class="icon_a5" v-if="memberInfo.wbBind == 'Y'"></span>
					<span class="icon_a6" v-if="memberInfo.emailBind == 'Y'"></span>
					<span class="icon_a7" v-if="memberInfo.qqBind == 'Y'"></span>
					<span class="icon_a8" v-if="memberInfo.isZfbIdentify == 'Y'"></span>
				</div>
			</router-link>
			<!--<router-link :to="'/goldGrade?mid=' + mid">
				<span class="c_666 f28">金币等级</span>
				<i class="pull_right iconfont icon-arrow-right c_666"></i>
				<span class="c_333 pull_right mr20">{{memberInfo.rankIntegral}}</span>
			</router-link>-->
			<div class="z_visitor">
				<p class="c_666 f28 pt30">访客<span class="c_333 ml40">{{visiterNum}}</span></p>
				<div class="swiper-container" id="J_visiterSwiper">
					<ul class="mt30 clearfix swiper-wrapper">
						<li v-for="el in visitList" :key="el.id" class="swiper-slide">
							<img :src="el.headPhoto | imgUrl" alt="" @click="skipOtherHome(el.mid)">
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- E 认证信息、金币等级、访客 -->
		<!-- S TA发布的技能 -->
		<div class="z_personal_skill swiper-container" id="J_pesonalSkill" v-if="memberSkillList.length">
			<h2 class="f28">TA发布的技能</h2>
			<!-- S TA发布的技能选项卡 -->
			<ul class="clearfix swiper-wrapper">
				<li class="swiper-slide" v-for="(el,index) in memberSkillList" :key="el.id" @click="skillClick(el.skillId,index)">
					<div>
						<img :src="el.categoryImg | imgUrl" alt="">
					</div>
					<span class="f24 c_666" :class="{on:index == num}">{{el.skillName}}</span>
				</li>
			</ul>
			<!-- E TA发布的技能选项卡 -->
		</div>
		<!-- S TA发布的技能详情 -->
		<div class="z_skill_info" v-if="memberSkillList.length">
            <div class="z_info_box">
				<div v-if="dataSkillDetail.videoList && dataSkillDetail.videoList.length">
					<h2 class="f28">视频介绍（建议在WIFI环境下观看）</h2>
					<div class="z_video">
						<img-show :videoList="dataSkillDetail.videoList" width="690" height="315"></img-show>
					</div>
				</div>
            </div>
            <div class="z_info_box" v-if="dataSkillDetail.skillImg">
                <h2 class="f28 c_666" @click="skipOtherDynamicList(mid)">技能相册<span class="pull_right mr20">更多<i class="iconfont icon-arrow-right"></i></span></h2>
                <ul class="clearfix">
                    <img-show :imgSrc="dataSkillDetail.skillImg" width="216" height="216"></img-show>
                </ul>
            </div>
            <!-- <div class="z_info_box" v-if="dataSkillDetail.voiceIntroduced">
                <a href="javascript:;">
                    <span class="c_666 f28">语音介绍</span>
                    <item-audio class="pull_right" style="margin-top:0.16rem;" :src="dataSkillDetail.voiceIntroduced"></item-audio>
                </a>
            </div> -->
            <!--<div class="z_info_box">
                <a href="javascript:;">
                    <span class="c_666 f28">技能等级</span>
                    <p class="pull_right c_666 f28">{{dataSkillDetail.integralGrade}}
						<img class="pull_right" :src="dataSkillDetail.levelImg | imgUrl" style="width:0.5rem;height:0.5rem;margin-top:0.2rem;margin-left:0.1rem;" alt="">
					</p>
                </a>
            </div>-->
            <div class="z_info_box" v-if="dataSkillDetail.serviceMode">
                <a href="javascript:;">
                    <span class="c_666 f28">服务方式</span>
                    <p class="pull_right c_333 f28 ellipsis">{{dataSkillDetail.serviceMode}}</p>
                </a>
            </div>
            <div class="z_info_box z_skill_introduce clearfix" v-if="dataSkillDetail.serviceIntroduced">
                <span class="c_666 f28">技能介绍</span>
                <p class="pull_right c_333 f26 ellipsis_clip3">{{dataSkillDetail.serviceIntroduced}}</p>
            </div>
        </div>
		<!-- E TA发布的技能详情 -->
		<!-- E TA发布的技能 -->
		<!-- S 个人信息，优势、教育经历、工作经历、荣誉资质、专业问答 -->
		<div class="z_experience">
			<div class="z_experience_item clearfix" v-if="dataSkillDetail.educationList && dataSkillDetail.educationList.length">
				<h2 class="f28"><i class="iconfont icon-jiaoyu f36"></i>教育经历</h2>
				<p class="f26 clearfix" v-for="el in dataSkillDetail.educationList" :key="el.id"><span class="pull_left">{{el.schoolName}}</span><span class="pull_right">{{el.startDate}} 至 {{el.endDate}}</span></p>
			</div>
			<div class="z_experience_item clearfix" v-if="dataSkillDetail.workList && dataSkillDetail.workList.length">
				<h2 class="f28"><i class="iconfont icon-gongzuojingli f36"></i>工作经历</h2>
				<p class="f26 clearfix" v-for="el in dataSkillDetail.workList" :key="el.id"><span class="pull_left">{{el.workplace}}</span><span class="pull_right">{{el.entryDate}} 至 {{el.quitDate}}</span></p>
			</div>
			<div class="z_experience_item clearfix" v-if="dataSkillDetail.honorList && dataSkillDetail.honorList.length">
				<h2 class="f28"><i class="iconfont icon-wenti f36"></i>荣誉资质</h2>
				<p class="f26 ellipsis" v-for="el in dataSkillDetail.honorList" :key="el.id">{{el.honorName}}</p>
			</div>
			<div class="z_experience_item" v-if="dataSkillDetail.problemList && dataSkillDetail.problemList.length">
				<h2 class="f28"><i class="iconfont icon-wenti f36"></i>专业问答</h2>
				<div v-for="el in dataSkillDetail.problemList" :key="el.id">
					<p class="f26 ellipsis">{{el.question}}？</p>
					<p class="f26 ellipsis">{{el.answer}}</p>
				</div>
				
			</div>
		</div>
		<!-- E 个人信息，优势、教育经历、工作经历、荣誉资质、专业问答 -->
		<!-- S 积分图表组件 -->
		<!--<div class="z_integral" v-if="memberSkillList.length">
			<h2 class="f28">积分：{{infoIntegral}}</h2>
			<integral-chart :list="integralChartList"></integral-chart>
		</div>-->
		<!-- E 积分图表组件 -->
		<!-- S 雇主评价星级 -->
		<div class="z_evaluate" v-if="memberSkillList.length">
			<h2 class="f28 c_333">雇主评价</h2>
			<ul class="clearfix">
				<grade title="平均工作态度" :score="workAttitudeAvg"></grade>
				<grade title="平均工作准确度" :score="workAccuracyAvg"></grade>
				<grade title="平均工作技能" :score="workAbilityAvg"></grade>
			</ul>
		</div>
		<!-- E 雇主评价星级 -->
		<!-- S 用户全部评价 -->
		<div v-if="evaluationList.length">
			<h2 class="f26 c_555 plr30 ptb20">全部评价</h2>
			<evaluation-item :list="evaluationList"></evaluation-item>
		</div>
		<!-- E 用户全部评价 -->
		<!-- S 底部按钮 -->
		<div class="z_footer_btn">
			<handler :skillId="dataSkillSubCategory" :mid="mid" :isRemind="memberInfo.onlineNotice == 'Y'" @changeNotice="memberInfo.onlineNotice='Y'"></handler>
		</div>
		<!-- E 底部按钮 -->
		<!-- S 举报，拉黑 弹窗 -->
		<div class="z_bg_black" v-show="isbgShow"  @click.stop="cancelBg">
			<ul>
				<!-- <li v-if="memberInfo.isBlack != '1'" @click.stop="setBlack">拉黑</li>
				<li v-else @click.stop="deleteBlack">取消拉黑</li> -->
				<!-- <li>举报(举报有奖)</li> -->
				<li @click.stop="checkMemberId">查看用户ID</li>
			</ul>
			<ul class="z_cancel">
				<li @click="cancelBg">取消</li>
			</ul>
		</div>
		<!-- E 举报，拉黑 弹窗 -->
	</div>
</template>

<script>
import integralChart from 'src/module/other/components/integralChart'; //柱形图
import evaluationItem from 'src/module/other/components/evaluationItem'; //评价列表
import grade from 'src/components/grade'; //评价星级
import imgShow from 'src/components/alert/imgShow'; //图片，视频展示
import handler from 'src/module/index/components/handler'; //底部按钮组
import {getInfo} from 'src/config/mUtils';
import {wechatShare} from 'src/config/wechatUtils';//微信分享
import {
	memberInfo, //个人主页用户信息
	memberDynamic, //个人动态
	visitMemberList, //最近访客列表
	evaluationList, //评价列表
	fetchSkillList, //个人主页技能列表
	setBlack, //拉黑
	deleteBlack, //取消拉黑
	visitMemberHome, //访问个人空间
	setAttention, //关注
    deleteAttention, //取消关注
} from '../service/getData'
import {fetchRegisterForredEnvelopes} from 'src/service/getData';//获取分享内容
export default {
	data() {
		return {
			isbgShow: false, //拉黑弹窗背景显示隐藏
			mid: '', //用户id
			memberInfo: {}, //个人主页用户信息
			memberDynamicImg: [], //个人动态前三张图片
			visitList: [], //最近访客列表
			visiterNum: 0, //访客数量
			evaluationList: [], //评价列表
			integralChartList: [], //用户技能柱状统计图
			infoIntegral: '', //基本信息积分
			memberSkillList: [], //个人主页技能列表
			dataSkillId: '', //技能id
			dataSkillDetail: {}, //技能id对应的详情
			workAbilityAvg: '', //平均工作技能
			workAccuracyAvg: '', //平均工作准确度
			workAttitudeAvg: '', //平均工作态度
			num: 0, //技能下标
			dataSkillSubCategory: '', //技能二级id
			isAttent: 'N', //是否被关注
			shareTitle:'', //分享标题
            shareContent:'', //分享内容
            shareUrl:'', //分享链接
            shareImg:"",//分享图片
		}
	},
	components: {
		integralChart,
		evaluationItem,
		grade,
		imgShow,
		handler
	},
	activated() {
		this.mid = this.$route.query.mid; //路由获取当前用户id
		this.getMemberInfo(); //获取个人主页用户信息
		this.getSkillList(); //个人主页技能列表
		this.visitMemberHome(); //访问个人空间获取最近访客列表
		this.getMemberDynamic(); //获取个人动态前三张图片
	},
	mounted(){
		this.shareMsg();//获取分享信息
	},
	watch:{
		//监听路由传参id发生变化，重新加载页面
		'$route' (to, from) {
			if(from.path==to.path){
				this.$router.go(0);
			}
		}
	},
	methods: {
		//返回按钮
		handleClickLeft(){
            this.$router.go(-1);
		},
		//获取个人主页用户信息
		getMemberInfo () {
			memberInfo(this.mid).then(res => {
				if (res.status) {
					this.memberInfo = res.data;
					this.isAttent = res.data.isAttent;
				}
			})
		},
		visitMemberHome () {
			visitMemberHome(this.mid).then(res => {
				if (res.status) {
					this.getVisitList();
				}
			})
		},
		//获取最近访客列表
		getVisitList () {
			visitMemberList(this.mid).then(res => {
				if (res.status) {
					this.visitList = res.data.list||[];
					if (this.visitList) {
						this.$nextTick(function(){
							var mySwiper = new Swiper('#J_visiterSwiper', {
								freeMode: true,
								freeModeMomentumRatio: 0.5,
								slidesPerView : 'auto',
							});
						})
					}
					this.visiterNum = res.data.visiterNum;
				}
			})
		},
		//获取评价列表
		getEvaluationList () {
			evaluationList(this.mid,this.dataSkillId).then(res => {
				if (res.status) {
					this.evaluationList = res.data.list||[];
					this.workAbilityAvg = res.data.workAbilityAvg;
					this.workAccuracyAvg = res.data.workAccuracyAvg;
					this.workAttitudeAvg = res.data.workAttitudeAvg;
				}
			})
		},
		//个人主页技能列表
		getSkillList () {
			fetchSkillList(this.mid).then(res => {
				if (res.status) {
					if (!res.data.list.length) {
						return
					}
					this.memberSkillList = res.data.list||[];
					this.$nextTick(function(){
						var mySwiper = new Swiper('#J_pesonalSkill', {
							freeMode: true,
							freeModeMomentumRatio: 0.5,
							slidesPerView: 5
						});
					})
					this.dataSkillDetail = res.data.list[0];
					this.dataSkillId = this.dataSkillDetail.skillId;
					//获取到技能id后根据技能id获取对应的评价列表
					if (this.dataSkillId) {
						this.getEvaluationList();
					}
					this.dataSkillSubCategory = this.dataSkillDetail.skillSubCategory;
				
				}
			})
		},
		//个人动态前三张图片
		getMemberDynamic () {
			memberDynamic(this.mid).then(res => {
				if (res.status) {
					this.memberDynamicImg = res.data.list||[];
				}
			})
		},
		//切换技能选项卡
		skillClick (skillId,index) {
			this.num = index;
			this.dataSkillDetail = this.memberSkillList[index];
			this.dataSkillSubCategory = this.dataSkillDetail.skillSubCategory;
			evaluationList(this.mid,skillId).then(res => {
				if (res.status) {
					this.evaluationList = res.data.list||[];
					this.workAbilityAvg = res.data.workAbilityAvg||5.0;
					this.workAccuracyAvg = res.data.workAccuracyAvg||5.0;
					this.workAttitudeAvg = res.data.workAttitudeAvg||5.0;
				}
			});
		},
		//举报弹窗
		clickReport () {
			this.isbgShow = !this.isbgShow;
		},
		cancelBg () {
			this.isbgShow = false;
		},
		//拉黑操作
		setBlack () {
			setBlack(this.mid).then(res => {
				this.isbgShow = false;
				alertTip(res.msg);
				this.getMemberInfo();
			})
		},
		//取消拉黑
		deleteBlack () {
			deleteBlack(this.mid).then(res => {
				this.isbgShow = false;
				alertTip(res.msg);
				this.getMemberInfo();
			})
		},
		//跳转他人主页
		skipOtherHome (mid) {
			if (getInfo('id') == mid) {
				this.$router.push('/myHome?mid=' + mid);
			} else {
				this.$router.replace('/otherHome?mid=' + mid);
			}
		},
		//跳转个人动态页面
		skipOtherDynamicList(mid){
			this.$router.push('/otherDynamicList?mid=' + mid);
		},
		//查看用户id
		checkMemberId () {
			this.isbgShow = false;
			alertTip('当前用户id为' + this.mid);
		},
		//关注
		setAttention () {
			if (this.isAttent == 'N') {
				setAttention(this.mid).then(res => {
					if (res.status) {
						this.isAttent = 'Y'
						alertTip('关注成功')
					}
				})
			} else {
				deleteAttention(this.mid).then(res => {
					if (res.status) {
						this.isAttent = 'N'
						alertTip('取消关注成功')
					}
				})
			}
			
		},
		shareMsg(){//获取分享内容
			if(this.shareUrl){
    			this.shareFn();
    		}else{
    			fetchRegisterForredEnvelopes("personal").then(res=>{
	    			if(res.status){
	    				this.shareTitle=res.data.title;//分享标题
	    				this.shareContent=res.data.content;//分享内容
	    				this.shareUrl=res.data.url;//分享链接
	    				if(res.data.img){
	    					this.shareImg=res.data.img;//分享图片
	    				}else{
	    					this.shareImg=''
	    				}
	    				
	    				this.shareFn();
	    			}
	    		});
    		}
    	},
		//分享
		share () {
			this.$share.show();
		},
		//调用微信分享
		shareFn(){
			wechatShare(this.shareUrl+"?mid="+this.mid+"&headPhoto="+getInfo("headPhoto")+"&nickName="+getInfo("nickName")+"&address="+getInfo("address")+"&reference="+getInfo("mobile"),this.shareTitle,this.shareContent,this.shareImg);
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
	background: @bg_color;
	padding-bottom: 1.4rem;
}
.bg_blue{
    background: #12adff !important;
}
.zan_color{
	color: #fe594e;
}
.opacity_5{
	opacity: 0.5;
}
.z_bg{
	height: 2.6rem;
	width: 100%;
	background: url('~src/module/other/images/personal_bg.png') no-repeat center;
	background-size: cover;
	.z_title{
		padding: 0.1rem 0.3rem 0 0.3rem;
		a{
			display: block;
			width: 0.6rem;
			height: 0.6rem;
			.border-radius(50%);
			background: rgba(255, 255, 255, 0.7);
			line-height: 0.6rem;
			text-align: center;
			color: #ff4d53;
			margin-right: 0.23rem;
			.z_redpacket{
				position: absolute;
				width: 1.92rem;
				height: 0.5rem;
				.border-radius(0.1rem);
				background: #fff7ea;
				color: #fba723;
				font-size: 0.22rem;
				text-align: center;
				line-height: 0.5rem;
				right: -0.6rem;
				top: 0.76rem;
				&:after{
					content: "";
                    position: absolute;
                    top: -0.15rem;
                    right: 0.6rem;
                    width: 0;
                    height: 0;
                    border-left: 0.2rem solid transparent;
                    border-right: 0.2rem solid transparent;
                    border-bottom: 0.2rem solid #fff7ea;
				}
			}
		}
	}
}
.z_personal_data{
	height: 1.95rem;
	width: 100%;
	background: #fff;
	position: relative;
	text-align: center;
	.z_avatar{
		width: 1.16rem;
		height: 1.16rem;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: -0.58rem;
		.border-radius(50%);
		overflow: hidden;
		img{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	.z_name{
		position: absolute;
		top: 0.78rem;
		left: 0;
		right: 0;
		margin: 0 auto;
		font-size: 0.3rem;
		em{
            display:inline-flex;
            vertical-align: top_arrow_icon.pngdle;
            .flex_center;
            .justify_center;
			padding: 0.02rem 0.1rem;
			margin-left: 0.1rem;
            background: @color;
            border-radius:0.02rem;
            color:#fff;
            font-size:0.18rem;
            i{
               margin-right: 0.04rem;
               font-size:0.14rem;
            }
        }
	}
	.z_address{
		position: absolute;
		top: 1.3rem;
		left: 0;
		right: 0;
		margin: 0 auto;
		font-size: 0.26rem;
		color: #666;
	}
}
.z_personal_dynamic{
	width: 100%;
	height: 1.3rem;
	margin-top: 0.2rem;
	background: #fff;
	padding: 0 0.3rem;
	line-height: 1.3rem;
	a{
		display: block;
		width: 100%;
		height: 100%;
		div{
			line-height: 1.3rem;
			.img_box{
				width: 0.9rem;
				height: 0.9rem;
				margin-right: 0.2rem;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;
				img{
					width: 100%;
				}
			}
		}
	}
}
.z_personal_info{
	width: 100%;
	padding: 0 0 0.2rem 0.3rem;
	background: #fff;
	margin-top: 0.2rem;
	a{
		width: 100%;
		height: 0.9rem;
		border-bottom: 1px solid #e8e8e8;
		display: block;
		line-height: 0.9rem;
		i{
			padding-right: 0.3rem;
		}
		div{
			line-height: 0.9rem;
			span{
				width: 0.28rem;
				height: 0.28rem;
				display: inline-block;
				vertical-align: middle;
				margin-right: 0.1rem;
			}
			.icon_a1{
				background: url(~src/components/images/iconA1.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a2{
				background: url(~src/components//images/iconA2.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a3{
				background: url(~src/components//images/iconA3.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a4{
				background: url(~src/components//images/iconA4.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a5{
				background: url(~src/components//images/iconA5.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a6{
				background: url(~src/components//images/iconA6.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a7{
				background: url(~src/components//images/iconA7.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a8{
				background: url(~src/components//images/iconA8.jpg) no-repeat;
				background-size: cover;
			}
			.icon_a9{
				background: url(~src/components//images/iconA9.jpg) no-repeat;
				background-size: cover;
			}
		}
	}
	.z_visitor{
		width: 100%;
		ul{
			width: 100%;
			height: 0.7rem;
			li{
				float: left;
				width: 0.66rem;
				height: 0.66rem;
				overflow: hidden;
				margin-right: 0.2rem;
				.border-radius(50%);
				img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
.z_personal_skill{
	padding: 0.3rem 0.3rem 0 0.3rem;
	background: #fff;
	margin-top: 0.2rem;
	ul{
		width: 100%;
		padding-top: 0.3rem;
		height: 1.2rem;
		li{
			float: left;
			text-align: center;
			img{
				width: 0.5rem;
				height: 0.5rem;
			}
			span{
				margin-top: 0.1rem;
				display: inline-block;
				padding-bottom: 0.07rem
			}
		}
		.on{
			border-bottom: 1px solid #ff4d49;
			&:after{
                content: "";
                position: absolute;
                bottom: 0.04rem;
				left: 0;
				right: 0;
				margin: 0 auto;
                width:0; 
				height:0; 
				border-left:0.1rem solid transparent;
				border-right:0.1rem solid transparent;
				border-top:0.1rem solid #ff4d49;
            }
		}
	}
}
.z_experience{
	padding: 0 0.3rem;
	background: #fff;
	margin-top: 0.2rem;
}
.z_integral{
	padding: 0.3rem;
	background: #fff;
	margin-top: 0.2rem;
	h2{
		padding-bottom: 0.2rem;
	}
}
.z_evaluate{
	background: #fff;
	margin-top: 0.2rem;
	h2{
		padding: 0.3rem;
		border-bottom: 1px solid #e8e8e8;
	}
	ul{
		padding: 0.4rem 0.3rem 0.5rem 0.3rem;
	}
}
.z_skill_info{
    padding: 0.3rem 0 0.3rem 0.3rem;
    background: #fff;
    .z_info_box{
        h2{
            padding-bottom: 0.3rem;
            padding-top: 0.3rem;
        }
        .z_video{
            width: 100%;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .z_video_play{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                line-height: 3.15rem;
                text-align: center;
            }
        }
        ul{
            width: 100%;
            li{
                position: relative;
                float: left;
                width: 2.16rem;
                height: 2.16rem;
                border-radius: 0.06rem;
                overflow: hidden;
                margin-right: 0.21rem;
                margin-bottom: 0.2rem;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        p{
            max-width: 5.35rem;
        }
        a{
            display: block;
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
            height: 0.9rem;
			line-height: 0.9rem;
			padding-right: 0.3rem;
            i{
                color: #fe544c;
                margin-left: 0.1rem;
            }
        }
    }
    .z_skill_introduce{
		padding-right: 0.3rem;
		padding-top: 0.3rem;
        p{
            line-height: 1.5;
        }
    }
}
.z_experience_item{
    border-bottom: 1px solid @line_color;
    padding: 0.2rem 0;
    i{
        color: #ccc;
        margin-right: 0.2rem;
    }
    p{
        margin-top: 0.2rem;
    }
}
.z_footer_btn{
	position: fixed;
	bottom: 0;
	left: 50%;
	background: #fff;
	width: 7.5rem;
	margin-left: -3.75rem;
	z-index: 50;
}
.z_bg_black{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto auto;
	background: rgba(0, 0, 0, 0.6);
	z-index: 100;
	ul{
		padding: 0 0.3rem;
		width: 100%;
		position: fixed;
		bottom: 2.2rem;
		overflow: hidden;
		z-index: 20;
		li{
			width: 100%;
			height: 0.9rem;
			text-align: center;
			line-height: 0.9rem;
			font-size: 0.28rem;
			background: #fff;
			border-bottom: 1px solid #e8e8e8;
		}
	}
	.z_cancel{
		bottom: 1rem;
	}
}
</style>
