<template>
	<div class="pb121">
		<!--S 头部-->
		<top title="站长详情"></top>
		<!--E 头部-->
		<!--S 站长等级-->
		<div class="tab_warp">
			<div class="swiper-container J_tabSwiper">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide tab_item" v-for="v in stationGradeList" :class="{active:stationGrade==v.code}" @click="changeStationGrade(v.code)">
			        	<div class="name">{{v.name}}</div>
			        </div>
			    </div>
			</div>
		</div>
		<!--E 站长等级-->
		<!--S banner-->
		<div class="banner">
			<div class="bg">
				<img src="../images/banner_detail.png"/>
			</div>
			<div class="name">{{stationGradeObj.name}}</div>
			<div class="remark ellipsis">{{stationGradeObj.introduce}}</div>
			<div class="icon">
				<img :src='stationGradeObj.background|imgUrl'/>
			</div>
		</div>
		<!--E banner-->
		<!--S 邀请好友收益-->
		<div class="statistics">
			<div class="money">
				<img src="../images/arrow.png"/>
				<span class="f32">&yen;<em class="f36">{{stationGradeObj.price|number(2)}}</em></span>
			</div>
			<div class="item" v-for="v in stationGradeObj.remarkList">{{v}}</div>
		</div>
		<!--E 邀请好友收益-->
		<!--S 介绍信息 tab-->
		<ul class="l_oil_info_tab flex justify_around f28 c_666">
			<li :class="{'active':tab==1}" @click="tab=1">特权介绍</li>
			<li :class="{'active':tab==2}" @click="tab=2">常见问题</li>
		</ul>
		<!--E 介绍信息 tab-->
		<!--S 特权介绍-->
		<div class="l_oil_detail" v-html="privilege_content" v-show="tab==1"></div>
		<!--E 特权介绍-->
		<!--S 常见问题-->
		<div class="l_oil_detail" v-html="problem_content" v-show="tab==2"></div>
		<!--<div class="l_oil_detail" v-show="tab==2">
			<p class="text_center mb50">
				<span class="l_question_tit f32">常见问题</span>
			</p>
			<ul class="l_question_list mlr30 pl50 pr24">
				<li class="item clearfix" v-for="el in problemList">
					<img class="pull_left" src="../images/question.png"/>
					<div class="">
						<p class="f24 l_question">{{el.articleTypeName}}</p>
						<p class="f22 l_answer mt12" v-html="el.content"></p>
					</div>
				</li>
				<li class="more">查看更多</li>
			</ul> 
		</div>-->
		<!--E 常见问题-->
		<!--S 底部按钮-->
		<div class="l_oil_fixed pl30">
			<div class="pull_left f30 l_oil_fixed_price">
				<p class="money">
					<em class="f28">{{stationGradeObj.name}}</em>
					<span class="c_orange f32">&yen;<em class="f36">{{stationGradeObj.price|number(2)}}</em></span>
				</p>
			</div>
			<a class="pull_right f30 l_oil_fixed_btn" href='javascript:void(0);' @click="joinFn" v-show="stationGradeObj.level > stationGradeLevel">立即加入</a>
			<a class="pull_right f30 l_oil_fixed_btn" href='javascript:void(0);' @click="shareShow = true" v-show="stationGradeObj.level < stationGradeLevel||stationGradeObj.level == stationGradeLevel">立即邀请</a>
			<a :href="contactKF" class="pull_right contact_btn">免费咨询</a>
		</div>
		<!--E 底部按钮-->
		<!-- S 二维码分享 -->
		<div class="recruit_pop" v-show="showInvite">
			<div class="recruit_box">
				<div class="swiper-container swiper" id="J_shareImgSwiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="el in inviteImgList">
							<img :src="el" alt="">
						</div>
					</div>
				</div>
				<div class="swiper-button-prev" id="J_shareImgSwiperPrev"></div>
				<div class="swiper-button-next" id="J_shareImgSwiperNext"></div>
				<div class="close" @click="showInvite = false"></div>
				<div class="flex flex_center justify_center mt30">
					<img style="height: 0.8rem;width: 0.8rem;" src="../images/icon8.png" alt="">
					<p class="text_center c_fff f30 ml30">长按图片保存</p>
				</div>
			</div>
		</div>
		<!-- E 二维码分享 -->
		<!-- S 立即分享弹窗 -->
		<div class="layer_shadow" v-show="shareShow">
			<div class="shareType">
				<div class="shareIcon">
					<div class="share_item" v-for="el in shareList" @click="showShareImg(el);shareShow=false">
						<i class="iconfont" :class="el.icon" :style="{'color':el.color}"></i>
						<p>{{el.text}}</p>
					</div>
				</div>
				<div class="f32 text_center cancel" @click="shareShow = false">取消</div>
			</div>
		</div>
		<!-- E 立即分享弹窗 -->
	</div>
</template>

<script>
import {
	fetchUserType, 			//获取当前用户信息
	fetchTextDetail,		//详情（常见问题/特权介绍）
	fetchRegisterForredEnvelopes,	//获取分享内容
} from 'src/service/getData'
import {
	fetchShareImg  //分享图片
} from 'src/service/getDataWeChat'
import {wxShare} from 'src/config/mUtils'; //分享、用户信息
import {
	fetchPartnerconfList,	//获取站长等级配置列表
	fetchPartnerOrderCreate,	//站长下单
	fetchGetCommonDetail
} from '../service/getData'
export default{
	data(){
		return{
			mobile:"",				//用户手机号
			stationGradeObj:{},		//站长等级信息详情
			stationGrade:"",		//站长等级code
			stationGradeIndex:0,	//站长等级索引值
			stationGradeLevel:0,	//站长等级  0==普通用户
			stationGradeList:[],	//站长等级配置列表
			problem_content: "", 	//常见问题
			privilege_content:"",	//特权介绍
			tab:1,					//tab选中状态
			problemList:[
				{articleTypeName:"你们平台怎么充值？",content:"您好亲，dadetong.com，登录您的会员账户"},
				{articleTypeName:"一般纳税人认定标准中的销售额具体包括那些？",content:"包括纳税申报销售额、稽查查补销售额、纳税评估调整销售额、税务机关代开发票销售额和免税销售额。其中特别注意的是，对于稽查查补销售"}
			],						//问题列表
			mobile: "", 			//用户手机号
			shareShow:false,		//是否展示分享弹窗
			showInvite: false,		//邀请弹窗
			inviteImgList: [], 		//邀请图片列表
			shareData:{},			//分享内容
			shareList:[
                {
                    icon:'icon-weixin-copy',
                    color:'#7ed321',
                    text:'微信好友'
                },
                {
                    icon:'icon-pengyouquan',
                    color:'#54cb00',
                    text:'朋友圈'
                },
                // {
                //     icon:'icon-qq',
                //     color:'#408ded',
                //     text:'QQ好友'
                // },
                // {
                //     icon:'icon-weibo',
                //     color:'#ef5d1d',
                //     text:'微博'
                // },
                // {
                //     icon:'icon-duanxiniconx-',
                //     color:'#6bd800',
                //     text:'短信'
                // },
                {
                    icon:'icon-erweima',
                    color:'#ffc02b',
                    text:'二维码'
                },
            ],
            swiper:""
		}
	},
	activated(){
		this.stationGrade=this.$route.query.tab;
		this.getUserInfo();
		this.changeStationGrade();
	},
    mounted() {
    	this.getStationGradeList();
    	this.getPrivilegeCon();
	    this.getProblemCon();
    },
    beforeRouteLeave(to,from,next){
       	this.showInvite=false;
       	this.showInvite=false;
        next();
    },
	methods: {
		//获取站长等级配置列表
		getStationGradeList() {
			fetchPartnerconfList().then(res=>{
				if(res.data){
					this.stationGradeList=res.data.list||[];
					this.$nextTick(()=>{
						this.tabSwiper();
					})
				}
			})
		},
		//tab轮播
		tabSwiper(){
			var perView=this.stationGradeList.length>3?3.5:3;
		    this.swiper = new Swiper('.J_tabSwiper', {
		        slidesPerView: perView,
		        spaceBetween:20
		    });
			this.changeStationGrade();
		},
		//切换站长等级
		changeStationGrade(code){
			if(!this.stationGradeList.length){
				return;
			}
			code=code||this.stationGrade;
			var index;
			if(code){
				this.stationGradeList.forEach((v,i)=>{
					if(code==v.code){
						index=i;
					}
				})
			}else{
				index=0;
			}
			if(this.swiper){
				this.swiper.slideTo(index);
			}
			this.stationGradeObj=this.stationGradeList[index];
			this.stationGrade=this.stationGradeObj.code;
		},
		//获取特权介绍
		getPrivilegeCon(){
			fetchTextDetail('ZZXQTQJS').then(res=>{
		    	this.privilege_content=res.data.detail||'';
		    })
		},
		//获取常见问题
		getProblemCon(){
//		 	fetchProblemList('HHR_CJWT').then(res=>{
//	     		this.problemList=res.data||[];
//	     	});
			fetchTextDetail('ZZXQCJWT').then(res=>{
		    	this.problem_content=res.data.detail||'';
		    });
		},
		//立即加入
		joinFn(){
			fetchPartnerOrderCreate(this.stationGrade,true).then(res=>{
		    	if(res.data&&res.data.orderNo){
		    		this.$router.push('/stationPay?orderNo='+res.data.orderNo)
		    	}
		    });
		},
		//获取个人信息
		getUserInfo(){
			fetchUserType().then(res => {
				if (res.status) {
					this.mobile = res.data.mobile||'';
					this.stationGradeLevel=res.data.level||0;
					this.shareTit();//获取掌柜分享标题和内容
					this.getShareImg();
				}
			})
		},
		//分享图片
		getShareImg () {
			fetchShareImg(this.mobile).then(res => {
				if (res.status) {
					this.inviteImgList = res.data||[];
				}
			})
		},
		//二维码分享图片的分享
		shareImgSwiper(){
			this.$nextTick(function(){
				var mySwiper = new Swiper('#J_shareImgSwiper',{
					prevButton:'#J_shareImgSwiperPrev',
					nextButton:'#J_shareImgSwiperNext',
					loop: true,
					grabCursor: true,
					paginationClickable: true,
					autoplayDisableOnInteraction: false
				});
			})
		},
		//底部分享按钮
		showShareImg (el) {
			if (el.text == '二维码') {
				//二维码弹窗显示
				this.showInvite = true;
				this.shareImgSwiper();
			} else {
				//分享弹窗显示
				this.$share.show();
			}
		},
		//获取掌柜分享标题和内容
		shareTit(){
			if(this.shareData.url){
				this.shareFn();
			}else{
				fetchGetCommonDetail('tc','TC_PARTNER_SHARE_INFO').then(res=>{
					if(res.status){
						this.shareData = JSON.parse(res.data.list.TC_PARTNER_SHARE_INFO.value);
						this.shareFn();
					}
				})
			}
		},
		//调用微信分享
		shareFn(){
			wxShare(this.shareData.url+'?mid='+this.mobile,this.shareData.title,this.shareData.content,window.location.origin + '/static/img/logo.png');
		}
	}
}
</script>
<style lang="less">
.l_oil_detail{
	/*padding:0.3rem;*/
	table{
		display: block;
		width: 100%;
	}
	img{
		max-width: 100%;
	}
}
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.line_through{
	text-decoration: line-through;
}
.c_f4890d{
	color: #f4890d;
}
.tab_warp{
	.tab_item{
		position: relative;
		/*width: 2.2rem;*/
		height:0.9rem;
		text-align: center;
		color: #666666;
		.flex;
	    .flex_center;
		.f28;
		justify-content: center;
		&.active{
			color: #ff4b48;
			.name:before{
				position: absolute;
				content: '';
				height: 0.03rem;
				left: 0;
				right: 0;
				bottom: 0rem;
				background: #ff4b48;
			}
		}
		.name{
			position: relative;
			line-height: 0.9rem;
			white-space: nowrap;
		}
	}
}
.banner{
	position: relative;
	.bg{
		img{
			display: block;
			width: 100%;
		}
	}
	.name{
		position: absolute;
		left: 0.4rem;
		top: 0.78rem;
		font-weight: bold;
		font-size: 0.4rem;
		color: #fff;
		text-shadow:2px 2px 5px rgba(187,137,83,0.45);
	}
	.remark{
		position: absolute;
		left: 0.36rem;
		top: 1.45rem;
		width: 4.5rem;
		height: 0.48rem;
		border-radius: 0.24rem;
		.gradient_v(#e0a447,#fdd99b);
		padding: 0 0.2rem;
		line-height: 0.48rem;
		font-size: 0.24rem;
		color: #fff;
		&.duke{
			.gradient_v(#e0a447,#fdd99b);
		}
		&.medal{
			.gradient_v(#51649d,#828eb6);
		}
	}
	.icon{
		position: absolute;
		right: 0.45rem;
		top: 0.39rem;
		img{
			height: 1.9rem;
		}
	}
	img{
		display: block;
		max-width: 100%;
	}
}
.statistics{
	border-bottom: 0.2rem solid #f5f5f5;
	padding: 0.5rem 0.3rem 0.25rem;
	.money{
		margin-bottom:0.25rem;
		img{
			float: left;
			margin-top: 0.05rem;
			margin-right: 0.25rem;
			width: 0.78rem;
			height: 0.3rem;
		}
		span{
			line-height: 0.4rem;
		}
	}
	.item{
		display: inline-block;
		min-width: 4.6rem;
		min-height: 0.54rem;
		margin-bottom: 0.24rem;
		border-radius: 2rem;
		line-height: 0.54rem;
		padding: 0 0.28rem;
		font-size: 0.26rem;
		background-color: #faf6f0;
		color: #c79860;
	}
	.bronze{
		.item{
			background-color: #f8f1ea;
			color: #e2ad72;
		}
	}
	.silver{
		.item{
			background-color: #eeeeee;
			color: #9299a6;
		}
	}
	.gold{
		.item{
			background-color: #faf6f0;
			color: #c79860;
		}
	}
	.duke{
		.item{
			background-color: #faf6f0;
			color: #c79860;
		}
	}
	.medal{
		.item{
			background-color: #f8f1ea;
			color: #e2ad72;
		}
	}
}
.l_oil_info_tab{
	height: 0.84rem;
	.border-b(#e5e5e5);
	li{
		height: 0.84rem;
		line-height: 0.8rem;
		padding: 0 0.16rem;
		border-bottom: 0.04rem solid transparent;
		&.active{
			border-color: #7b5723;
			color: #7b5723;
		}
	}
}
.l_question_tit{
	.pos_rel;
	display: inline-block;
	padding: 0 0.52rem;
	line-height: 0.7rem;
	.border-b(#a58761);
	color: #a58761;
	&:after{
		position: absolute;
		bottom: -0.02rem;
		left: 50%;
		margin-left: -0.22rem;
		content: '';
		width: 0.44rem;
		height: 0.03rem;
		background: #a58761;
	}
}
.l_question_list{
	.box_shadow(0 0 0.3rem rgba(0,0,0,0.1));
	background:#fcfeff;
	.item{
		position: relative;
		padding: 0.25rem 0;
		border-bottom: 1px dashed #e5e5e5;
		line-height: 0.3rem;
		&>img{
			position: absolute;
			left: -0.35rem;
			top: 0.25rem;
			height: 0.26rem;
		}
	}
	.more{
		line-height: 1rem;
		text-align: center;
		font-size: 0.28rem;
		color: #a58761;
	}
}
.l_question{
	color: #45474e;
}
.l_answer{
	color: #949599;
}
.l_oil_fixed{
	position: fixed;
	left: 50%;
	bottom: 0;
	width: 7.5rem;
	height: 1.2rem;
	margin-left: -3.75rem;
	background: #fff;
	.border-t(#eaeaea);
	.money{
		display: flex;
		width: 3.1rem;
		justify-content: space-between;
		align-items: center;
	}
}
.l_oil_fixed_price{
	height: 100%;
	.flex;
	.justify_center;	
}
.contact_btn{
	line-height: 1.2rem;
	padding: 0 0.3rem;
	font-size: 0.3rem;
	color: #666;
	.border-l(#eee);
}
.l_oil_fixed_btn{
	width: 2.07rem;
	height: 100%;
	.gradient_v(#fd6a55,#ff4a48);
	.border-l(#eaeaea);
	line-height: 1.2rem;
	text-align: center;
	.c_fff;
}
/*S 分享弹窗*/
/*二维码分享*/
.recruit_pop{
	position: fixed;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.4);
	z-index: 10;
	.recruit_box{
		width: 5.6rem;
		position: absolute;
		top:0.5rem;
		left: 0;
		right: 0;
		margin: auto;
		.swiper{
			width: 100%;
			height: 100%;
			border-radius: .2rem;
			overflow: hidden;
		}
		img{
			width: 100%;
			height: 100%;
			display: block;
		}
		.swiper-button-prev,.swiper-button-next{
			width: .38rem;
			height: .91rem;
			background-repeat: no-repeat;
			background-size: cover;
			position: absolute;
			top:50%;
			margin-top: -.19rem;
		}
		.swiper-button-prev{
			left: -.69rem;
			background-image: url(../images/left.png);
		}
		.swiper-button-next{
			background-image: url(../images/right.png);
			right:-.69rem;
		}
		.close{
			width: .61rem;
			height: .61rem;
			background: url(../images/close.png) no-repeat;
			background-size: cover;
			position: absolute;
			top:-.3rem;
			right: -.3rem;
			z-index: 1;
		}
	}
}
/*分享弹窗*/
.shareType{
	width:100%;
	background: #fff;
	position: fixed;
	bottom:0;
	left: 0;
	z-index: 50;
	.shareIcon{
		display: flex;
		.justify_center();
		padding: 0.3rem;
		.share_item{
			width:33.33%;
			text-align:center;
		}
	}
	.iconfont{
		font-size: .8rem;
	}
	p{
		font-size: .24rem;
		margin-top: .1rem;
		text-align:center;
	}
	.cancel{
		height: 1rem;
		line-height:1rem;
		border-top: 1px solid #e5e5e5;
	}
}
</style>