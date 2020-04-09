<template>
	<div class="bg_gray">
		<!--S头部-->
		<div class="pos_rel">
        	<top :leftShow="false" title="技能管理" rightIcon="icon-shouye" @clickRight="topRight" class="zIndex"></top>
        	<em class="account_circle" v-if="newsNum"></em>
        </div>
        <!--E头部-->
        <div class="skillManage_box J_box">
        	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
				<div class="l_skill_top">
			        <!--S banner-->
					<advertising :imgList="bannerList"></advertising>
					<!--E banner-->
					<!--S 快捷入口-->
					<ul class="l_nav f26 bg_fff">
						<li>
							<router-link to="/mySkill">
								<img src="../images/wdfw.png" alt="" />
								<p class="mt5">我的技能</p>
							</router-link> 
						</li>
						<li>
							<router-link to="/approve">
								<img src="../images/rzzx.png" alt="" />
								<p class="mt5">认证中心</p>
								<!-- <span>送油卡</span> -->
							</router-link>
						</li>
						<!--<li>
							<router-link to="/task">
								<img src="../images/rwzx.png" alt="" />
								<p class="mt5">任务中心</p>
							</router-link>
						</li>
						<li>
							<router-link to="/applyEredar">
								<img src="../images/jndr.png" alt="" />
								<p class="mt5">申请技能达人</p>
							</router-link>
						</li>-->
						<li>
							<router-link to="/stationIndex">
								<img src="../images/zzzm.png" alt="" />
								<p class="mt5">站长招募</p>
							</router-link>
						</li>
						<li>
							<router-link to="/activity">
								<img src="../images/hdjx.png" alt="" />
								<p class="mt5">活动精选</p>
							</router-link>
						</li>
					</ul>
					<!--E 快捷入口-->
					
					<!--S灰线-->
					<div class="line_box"></div>
					<!--E灰线-->
					
					<div v-if="isFixd" :class="tabState==1?'hei89':'hei14'"></div><!--定位的时候如果当前tab下有筛选条件 类名写 hei89 如果没有类名写hei14-->
					<div class="top89" :class="{fixd:isFixd}" id="J_fixed">
						<top class="fixd" v-if="isFixd" :leftShow="false" title="服务管理" rightIcon="icon-shouye" @clickRight="topRight"></top>
						<em class="account_circle fixd_account_circle" v-show="isFixd&&dataList.length"></em>
						<!--S tab切换-->
						<ul class="filtrate_list_tab bg_fff pos_rel">
							<li :class="{'on':tabState==1}" @click="toggleTab(1)">待应邀</li>
							<li :class="{hot:tabState==2,'on':tabState==2&&isBgShow}" @click="toggleTab(2)">已应邀<i class="iconfont icon-arrow-down f30 ml4"></i></li>
							<li :class="{'on':tabState==3}" @click="toggleTab(3)">已完成</li>
							<li :class="{'on':tabState==4}" @click="toggleTab(4)">已过期</li>
							<!--S已应邀筛选条件  skillHaveAffirm：点击确定按钮--> 
							<filter-box2 ref="filterBox2" @skillHaveAffirm="skillHaveAffirm"></filter-box2>
							<!--E已应邀筛选条件 skillHaveAffirm：点击确定按钮--> 
						</ul>
						<!--E tab切换-->
						
						<!--S 待应邀=>筛选条件-->
						<ul class="filtrate_list_tab bg_fff pos_rel" id="J_skill_tab" v-if="tabState==1">
							<!--S筛选条件  skillAffirm：确定按钮  secondSkillList：品类列表 -->
							<li @click="filterBox" :class="{on:isSelect}">筛选条件<i class="iconfont icon-arrow-down f30 ml4"></i></li>
							<filter-box ref="filterBox" @skillAffirm="affirmBtn" :list="secondSkillList"></filter-box>
							<!--E筛选条件-->
							<!--S全部服务 skillServer：服务筛选-->
							<li @click="allService" :class="{on:isService}">全部服务<i class="iconfont icon-arrow-down f30 ml4"></i></li>
							<all-service ref="allService" @skillServer="skillServer"></all-service>
							<!--E全部服务-->
						</ul>
						<!--E 待应邀=>筛选条件-->
						
					</div>
				</div>
				
				<!--S 待应邀无数据-->
				<div class="text_center l_no_skill pt100" v-if="!skillList.length && tabState==1">
					<p class="l_no_skill_tip f26 c_666">当前订单已被抢完<br>完成以下工作，可以让订单来的更猛烈些</p>
					<div class="l_no_skill_btn clearfix mt34">
						<router-link class="pull_left" to="/skillType">发布新技能</router-link>
						<router-link class="pull_right" to="/save">增加认证</router-link>
						<router-link class="pull_left" to="/dynamic">增加照片</router-link>
						<router-link class="pull_right" to="/mySkill">上传视频</router-link>
					</div>
				</div>
				<!--E 待应邀无数据-->
				
				<!--S列表无数据-->
				<div v-if="!skillList.length && tabState!=1">
		            <nodata></nodata>
		        </div>
				<!--E列表无数据-->
				
				<!--S 列表  invite：待邀请=>立即邀请按钮点击-->
				<item ref="item" :list="skillList" @invite="invite" v-if="skillList.length"></item>
				<!--E 列表-->
				
				<!--S背景阴影-->
				<div class="l_bg" v-if="isBgShow"></div>
				<!--E背景阴影-->
				
				<!--S应邀弹窗-->
		        <invitation ref="invitation"
					:requireId="id"
					:serviceMethod="winServiceMethod"
					:unit="unit || '小时'"
					:unitP="unitPrice"
			        :intr="introduce"
					:otherInviteAvg="otherInviteAvg"
					@change="immediatelyInvited">
		        </invitation>
				<!--E立即应邀-->
			</mt-loadmore>
			<!--S 底部-->
				<footer-nav :active="3"></footer-nav>
			<!--E 底部-->
		</div>
	</div>
</template>

<script>
import footerNav from 'src/components/footerNav'    //底部
import advertising from 'src/components/swiper'//轮播
import item from '../components/item'               //列表每一项
import filterBox from '../components/filter'        //技能列表=>待应邀（筛选条件)
import allService from '../components/allService'   //技能列表=>待应邀（全部服务)
import invitation from '../components/invitation';  //技能列表=>待应邀（立即应邀弹窗）
import filterBox2 from '../components/filter2'      //技能列表=>已应邀
import {
	fetchSkillList,    //技能列表=>待应邀=>筛选条件（品类）
	fetchInviteWait,   //技能列表=>待应邀
	fetchRequireDetail,//技能列表=>待邀请=>立即邀请详情
	fetchInviteHave,   //技能列表=>已应邀
	fetchInviteDone,   //技能列表=>已成交
	fetchInviteOverdue,//技能列表=>已过期
} from '../service/getData';                   
import {fetchGeneralImage,//banner轮播
fetchCmsMailList //公告列表
} from 'src/service/getData';
export default {
	data() {
		return {
			bannerList:[],                      //banner轮播=>列表
			bannerCode:'SERVICE_MANAGER_SLIDE', //banner轮播=>类型
		    bannerTerminal:'WX',                //banner轮播=>客户端
		    isBgShow:false,                     //技能列表=>背景是否显示
			isFixd:false,                       //技能列表=>导航是否固定
		    tabState:1,                         //技能列表=>大选项卡切换：未应该、已应邀、已成交、已过期
		    skillList:[],                       //技能列表=>数组
		    isMore:false,                       //技能列表=>分页初始化加载防止连续请求
		    allLoaded:false,                    //技能列表=>是否全部加载
		    winServiceMethod:'',                //技能列表=>待应邀=>立即应邀弹窗 ..的价格
		    serviceMethod:'',                   //技能列表=>待应邀=>服务方式   
		    secondSkillList:[],                 //技能列表=>待应邀=>品类列表
		    isService:false,                    //技能列表=>待应邀=>是否第一次点击服务
		    isSelect:false,                     //技能列表=>待应邀=>是否第一次点击筛选条件
		    skillSubCategory:0,                 //技能列表=>待应邀=>品类
		    gender:'',                          //技能列表=>待应邀=>性别
		    distance:'',                        //技能列表=>待应邀=>距离
		    isInvite:false,                     //技能列表=>待应邀=>立即应邀弹窗是否展示
		    unit:'每小时',                      //技能列表=>待应邀=>立即应邀弹窗 /每小时
		    unitPrice:'',                       //技能列表=>待应邀=>立即应邀弹窗 单价
		    introduce:'',                       //技能列表=>待应邀=>立即应邀弹窗 优势
		    otherInviteAvg:'',                  //技能列表=>待应邀=>立即应邀弹窗 其他服务者均价
		    requireId:0,                        //技能列表=>待应邀=>立即应邀弹窗详情=>requireId
		    id:0,                        		//技能列表=>待应邀=>立即应邀弹窗确定按钮=>应邀id
		    page:1,                             //技能列表=>当前页数
		    size:10,                            //技能列表=>每页条数
		    status:'',                          //技能列表=>已应邀
		    newsNum:0						    //未读公告数目
		}
	},
	activated(){
		this.isFixd = false;
		this.cmsMailListFn();
	},
	mounted(){
		//banner轮播请求数据
		fetchGeneralImage(this.bannerCode).then(res=>{
			this.bannerList = res.data.list;//banner轮播赋值
		})
		
		this.skillListFun(); //请求技能列表=>待应邀=>二级技能列表（品类）
		this.inviteWaitFun();//请求技能列表=>待应邀
		
		this.$nextTick(()=>{ //头部定位
			let box = document.querySelector(".J_box");
			box.addEventListener('scroll', (e) => {
				let top = document.querySelector("#J_fixed").offsetTop;
				if(box.scrollTop > top) {
					this.isFixd = true;
				} else {
					this.isFixd = false;
				}
			});
		})
	},
	components:{
		footerNav,  //底部
		item,       //列表每一项
		allService, //技能列表=>待应邀（全部服务)
		filterBox,  //技能列表=>待应邀（筛选条件)
		filterBox2, //技能列表=>已应邀
		advertising,//轮播
		invitation, //技能列表=>待应邀（立即应邀弹窗）
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
		toggleTab(tabState){//选项卡切换
			if(tabState==2&&this.tabState==tabState){//已应邀展示弹窗
				this.isBgShow=!this.isBgShow;//背景显示隐藏
				this.$refs.filterBox2.isShow=!this.$refs.filterBox2.isShow;//弹窗显示隐藏
			}else{//其他不展示弹窗
				this.isBgShow=false;//背景不显示
				this.$refs.filterBox2.hide();//弹窗隐藏
			}
			this.tabState = tabState;
		},
		filterBox(){//请求技能列表=>待应邀=>筛选条件显示隐藏
			if(this.isSelect){
				this.isBgShow=!this.isBgShow;
			    this.$refs.filterBox.isShow=!this.$refs.filterBox.isShow;
			    this.isSelect = false;
			}else{
				this.isBgShow=true;
			    this.$refs.filterBox.isShow=true;
			    this.isSelect = true;
			}
			
			this.$refs.allService.isShow=false;
			this.isService = false;
		},
		allService(){//请求技能列表=>待应邀=>全部服务显示隐藏
			if(this.isService){
				this.isBgShow=!this.isBgShow;
				this.$refs.allService.isShow=!this.$refs.allService.isShow;
				this.isService = false;
			}else{
				this.isBgShow=true;
				this.$refs.allService.isShow=true;
				this.isService = true;
			}
			this.$refs.filterBox.isShow=false;
			this.isSelect = false;
		},
		skillListFun(){//请求技能列表=>待应邀=>筛选条件（二级技能列表（品类））
			fetchSkillList().then(res=>{
				this.secondSkillList = res.data.list;
			})
		},
		inviteWaitFun(){//请求技能列表=>待应邀列表
			let data = {
				serviceMethod:this.serviceMethod,      //服务
				skillSubCategory:this.skillSubCategory,         //品类=>二级技能
				gender:this.gender,                    //性别=>男：male   女：Female
				distance:this.distance,                //距离
				page:this.page,                        //当前页数
				size:this.size                         //条数
			}
			fetchInviteWait(data).then((res)=>{
				this.skillListFuntion(res)
			})
		},
		skillServer(){//技能列表=>待应邀=>选择条件（服务）
			this.serviceMethod = this.$refs.allService.serviceMethod;//组件服务赋值
			this.inviteWaitFun();                                    //请求技能列表=>待应邀
			this.$refs.allService.isShow = false;                    //隐藏该组价
			this.isBgShow = false;                                   //背景颜色隐藏
		},
		affirmBtn(){//技能列表=>待应邀=>筛选条件确认按钮
			this.skillSubCategory = this.$refs.filterBox.skillSubCategory;  //筛选条件=>品类
			this.gender = this.$refs.filterBox.gender;    //筛选条件=>性别
			this.distance = this.$refs.filterBox.distance;//筛选条件=>距离
			this.$refs.filterBox.hide();                  //点击确认隐藏
			this.isBgShow = false;                        //背景颜色隐藏
			this.inviteWaitFun();                         //请求技能列表=>待应邀
			this.isSelect = false;
		},
		invite(){//技能列表=>待应邀=>立即应邀按钮(调详情信息)
			this.requireId = this.$refs.item.requireId;   //需求id
			this.id = this.$refs.item.id;   //应邀id
			fetchRequireDetail(this.requireId).then(res=>{//立即应邀详情信息
				let data = res.data;
				this.unit = data.unit;//单位
				this.unitPrice = data.unitPrice;//线下技能价格
				this.otherInviteAvg = data.otherInviteAvg;//其他服务者均价
				this.winServiceMethod = data.serviceMethod;//服务方式
			})
			this.$nextTick(()=>{
				this.$refs.invitation.show();                 //立即应邀弹窗展示
			})
		},
		immediatelyInvited(){//技能列表=>待应邀=>立即应邀弹窗(确认)
			this.inviteWaitFun();
		},
		skillHaveAffirm(){//请求技能列表=>已应邀=>筛选状态
			this.status = this.$refs.filterBox2.status;//子组件筛选状态
			this.isBgShow = false;                     //背景颜色隐藏
 			this.$refs.filterBox2.hide();              //点击确认隐藏
			this.inviteHaveFun();                      //请求技能列表=>已应邀
		},
		inviteHaveFun(){//请求技能列表=>已应邀列表
			fetchInviteHave(this.page,this.size,this.status).then((res)=>{
				this.skillListFuntion(res)
			})
		},
		inviteDoneFun(){//请求技能列表=>已成交列表
			fetchInviteDone(this.page,this.size).then((res)=>{
				this.skillListFuntion(res)
			})
		},
		inviteOverdueFun(){//请求技能列表=>已过期列表
			fetchInviteOverdue(this.page,this.size).then((res)=>{
				this.skillListFuntion(res)
			})
		},
		skillListFuntion(res){//技能列表回调
			let data = res.data;
			if(data){
				if(this.page==1){
				    this.skillList = data.list||[];
				    this.$refs.loadmore.onTopLoaded();
				}else{
					this.skillList = this.skillList.concat(data.list||[]);
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
		},
		fecthList(){//技能列表数据请求（选项卡列表请求不同接口）
			if(this.tabState == 1){//请求待应邀数据
    			this.inviteWaitFun();
    		}else if(this.tabState == 2){//请求已应邀数据
    			this.inviteHaveFun();
    		}else if(this.tabState == 3){//请求已成交数据
    			this.inviteDoneFun();
    		}else if(this.tabState == 4){//请求已过期数据                          
    			this.inviteOverdueFun();
    		}
		},
		loadTop(){//下拉刷新
			this.page = 1;
			this.fecthList();//请求技能列表
		},
		loadBottom(){//上拉加载
			this.page += 1;
			this.fecthList();//请求技能列表
		}
	},
    watch:{
    	tabState(){
    		this.page = 1;      //当前页面page为1；
    		this.skillList = [];//技能列表数据清除；
    		this.fecthList();   //技能列表数据请求；
    	}
    }
}
</script>
<style lang="less" scoped>
	@import (reference) '~src/style/all.less';
	.account_circle{
		position: absolute;
		right:0.16rem;
		top:0.26rem;
		width:0.1rem;
		height:0.1rem;
		.border-radius(50%);
		background:@color;
	    z-index: 23;
	    &.fixd_account_circle{
	    	position: fixed;
	    }
	}
	.zIndex{
		z-index: 23;
	}
	.skillManage_box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding-top:0.89rem;
		.overflow_scroll;
	}
	.hei89{
		height: 0.89rem;
	}
	.hei14{
		height: 0.14rem;
	}
	.fixd{
		position: fixed;
		width: 7.5rem;
		left: 50%;
		margin-left: -3.75rem;
		top: 0;
		&.top89{
			top: 0.89rem;
		}
	}
	.l_bg{
		position: fixed;
		width: 7.5rem;
		top: 0;
		left: 50%;
		margin-left: -3.75rem;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 22;
	}
	.l_skill_top{
		position: relative;
		z-index: 23;
	}
	.bg_gray{
		min-height: 100%;
	}
	.l_nav{
		height:1.5rem;
		.flex;
		.flex_center;
		.justify_around;
		li{
			position: relative;
			img{
				width: 0.6rem;
				height: 0.6rem;
			}
			span{
				position: absolute;
				left: 50%;
				top: -0.04rem;
				word-break: keep-all;
				height: 0.32rem;
				line-height: 0.3rem;
				padding:0 0.08rem;
				.bg_fff;
				.border-radius(0.16rem);
				.border(@color);
				.f20;
				.c_main;
			}
		}
		a{
			.with_a;
			.flex;
			.flex_column;
			.flex_center;
		}
	}
	.l_no_skill{
		min-height: 7.8rem;
	}
	.l_no_skill_tip{
		line-height: 0.4rem;
	}
	.l_no_skill_btn{
		width: 5.3rem;
		padding-bottom: 1.2rem;
		margin: 0 auto;
		a{
			width: 2.4rem;
			height: 0.6rem;
			.mb40;
			.border(#e8e8e8);
			.border-radius(0.3rem);
			.bg_fff;
			.f26;
			.c_main;
			line-height: 0.58rem;
		}
	}
	
	/*弹窗*/
	.l_layer{
		.flex;
		.flex_center;
		.justify_center;
		position: fixed;
		width: 7.5rem;
		left: 50%;
		margin-left: -3.75rem;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 24;
	}
	.l_layer_quote_box{
		width: 6.08rem;
		max-height: 100%;
		background: #fff;
		.overflow_auto;
		.border-radius(0.1rem);
	}
	.l_layer_quote_title{
		height: 1rem;
		.icon-close1{
			bottom: 0.32rem;
		}
	}
	.l_layer_quote{
		display: block;
	} 
	.layer_item_input{
		.flex;
		.flex_center;
		input{
			width: 2rem;
			height: 0.66rem;
			padding: 0 0.1rem;
			.mlr10;
			.border(#dbdbdb);
			.border-radius(0.04rem);
			.text_right;
		}
	}
	.l_layer_quote_txt{
		width:100%;
		height: 1.6rem;
		.border;
		.border-radius(0.04rem);
		padding: 0.1rem;
		resize: none;
		.f26;
		line-height: 1.8em;
	}
	.l_layer_hint{
		color: #feaf08;
	}
</style>
