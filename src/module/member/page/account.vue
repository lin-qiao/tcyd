<!--头部-->
<template>
    <div class="account_box">
    	<!--S第一屏-->
    	<div class="account_one" v-show="currentPage==1">
			<!--S倒计时-->
			<div class="count_down"  v-if="isShowTime">
				<div class="small_rotate">
	                <div class="small_circle"></div>
	            </div>
	            <div class="circle_box">
	            	<div class="circle_item left">
	            		<div class="circle left"></div>
	            	</div>
	            	<div class="circle_item right">
	            		<div class="circle right"></div>
	            	</div>
	            </div>
	            <div class="big_shadow"><span>{{time}}</span>s</div>
			</div>
			<!--E倒计时-->
    		<!--S轮播-->
    		<div class="advert_list swiper-container" id="J_advert_list">
    			<ul class="swiper-wrapper">
    				<li class="swiper-slide" v-for="item in pageOneList">
    					<a href="javascript:void(0);" class="with_a" :href="item.url">
    						<img :src="item.image|imgUrl">
    				    </a>
    				</li>
    			</ul>
    			<div class="swiper-button-prev advert_btn" v-if="pageOneList.length>1"></div>
                <div class="swiper-button-next advert_btn" v-if="pageOneList.length>1"></div>
    		</div>
    		<!--E轮播-->
    		<!--S向上箭头-->
    		<div class="upward_icon next_page2" @click="slidePage2"></div>
    		<!--E向上箭头-->
    		<!--S 用户信息-->
    		<div class="account_infor personal_box">
	    		<div class="infor_via">
	    			<router-link to="/information">
		    			<!--<span class="infor_crown"></span>   vip加皇冠-->
		    			<img :src="userinfo.headImg|imgUrl">
	    			</router-link>
	    		</div>
	    		<ul class="flex account_money">
	    			<li v-for="(item,index) in moneyActivity">
	    				<router-link :to="item.url" class="with_a">
		    				<img :src="item.image|imgUrl" class="mr20" :style="{order:index==0?1:2}">
		    				<div class="account_text" :style="{order:index==0?2:1}">
		    					<h3 class="f28 c_main mb5">{{item.title}}</h3>
		    				    <p class="f26 c_666">{{item.subtitle}}</p>
		    				</div>
	    				</router-link>
	    			</li>
	    		</ul>
	    	</div>
    		<!--E 用户信息-->
    	</div>
    	<!--E第一屏-->
    	<!--S第二屏-->
    	<transition name="page-slide-bottom">
	    	<div class="account_two" v-show="currentPage==2">
	    		<!--S向下箭头-->
	    		<div class="down_icon" @click="slidePage1"></div>
	    		<!--E向下箭头-->
	    		<!--S 头部tab-->
				<!-- <div class="l_index_tab swiper-container f30" id="topNav">
					<ul class="swiper-wrapper justify_center">
						<li class="swiper-slide" :class="{on:el.code=='WXPTLB_TC'}" v-for="el in projects">
							<router-link :to="topLink(el.code)">{{el.name}}</router-link>
						</li>
					</ul>
				</div> -->
				<!--E 头部tab-->
				<!--S个人信息-->
				<div class="personal_infor">
					<div class="flex justify_between flex_center">
						<div class="f26 c_fff ptb30"><i class="iconfont icon-dizhi-01 f32 mr5"></i>{{city}}</div>
						<div class="c_fff flex">
							<router-link to="/news" class="pos_rel ptb30">
								<i class="iconfont icon-youxiang1 f40 mr10 ptb30 c_fff"></i>
								<em class="account_circle" v-if="dataList.length"></em>
							</router-link>
							<router-link to="/set" class="ptb30 pl10"><i class="iconfont icon-set f40 c_fff"></i></router-link>
						</div>
					</div>
					<div class="account_infor personal_box">
			    		<div class="infor_via">
			    			<router-link to="/information">
				    			<!--<span class="infor_crown"></span>   vip加皇冠-->
				    			<img :src="userinfo.headImg|imgUrl">
			    			</router-link>
			    		</div>

			    		<!--S已登录-->
			    		<div class="flex justify_center flex_center mb20" v-if="isLogin">
			    			<span class="f26 c_666 mr20">{{userinfo.mobile}}</span>
			    			<router-link class="infor_home f18" :to="{path:'/myHome',query:{mid:userinfo.mid}}">
			    				<i class="iconfont icon-home f28"></i>
			    				个人主页
			    				<i class="iconfont icon-arrow-right f14"></i>
			    			</router-link>
			    		</div>
			    		<!--E已登录-->

			    		<!--S未登录-->
			    		<div class="flex justify_center flex_center mtb20" v-else>
			    			<router-link class="f28 plr25 c_main lineHeight1 border_r" :to="{path:'/login',query:{url:'tc/account'}}">登录</router-link>
			    			<router-link class="f28 plr25 c_main lineHeight1" :to="{path:'/register',query:{url:'tc/account'}}">注册</router-link>
			    		</div>
			    		<!--E未登录-->

			    		<ul class="flex personal_money">
			    			<li>
			    				<p class="c_999 mb10">赚取佣金(元)</p>
			    				<p class="f38">{{userinfo.brokerageSum||'--'}}</p>
			    			</li>
			    			<li>
			    				<p class="c_999 mb10">可用余额(元)</p>
			    				<p class="f38">{{userinfo.usableBalance||'--'}}</p>
			    			</li>
			    		</ul>
			    		<ul class="flex account_money">
			    			<li v-for="(item,index) in moneyActivity">
			    				<router-link :to="item.url" class="with_a">
				    				<img :src="item.image|imgUrl" class="mr20" :style="{order:index==0?1:2}">
				    				<div class="account_text" :style="{order:index==0?2:1}">
				    					<h3 class="f28 c_main mb5">{{item.title}}</h3>
				    				    <p class="f26 c_666">{{item.subtitle}}</p>
				    				</div>
			    				</router-link>
			    			</li>
			    		</ul>
			    	</div>
				</div>
				<!--E个人信息-->
				<!--S12格-->
				<ul class="account_icon flex">
					<li class="account_item" v-for="item in twelveGridList">
						<a href="javascript:void(0);" @click="expectTips(item.url)">
							<img :src="item.image|imgUrl" alt=""/>
							<h3>{{item.title}}</h3>
						</a>
					</li>
				</ul>
				<!--E12格-->
				<!--S轮播-->
	    		<div class="activity_banner swiper-container pl30" id="J_activity_banner" v-if="swiperList.length">
	    			<ul class="swiper-wrapper">
	    				<li class="swiper-slide" v-for="item in swiperList">
	    					<a href="javascript:void(0);" :href="item.url">
	    						<img :src="item.image|imgUrl">
	    				    </a>
	    				</li>
	    			</ul>
	    			<div class="swiper-pagination swiper-pagination"></div>
	    		</div>
	    		<!--E轮播-->
	    		<!--S快报-->
	    		<div class="bulletin_box flex justify_between flex_center">
	    			<div class="flex flex_center flex1 mr20">
	    				<span class="bulletin_icon mr20"></span>
	    				<div class="swiper-container flex1" id="J_bulletin_box">
			    			<ul class="bulletin_list swiper-wrapper flex_column">
			    				<li class="swiper-slide" v-for="item in noticeList">
			    					<router-link :to="{path:'/noticeDetail',query:{id:item.id}}" class="with_a ellipsis">{{item.title}}</router-link>
			    				</li>
			    			</ul>
		    			</div>
	    			</div>
	    			<router-link class="iconfont icon-arrow-right f24 ptb10" to='/noticeList'></router-link>
	    		</div>
	    		<!--E快报-->
	    		<!--S活动列表-->
	    		<ul class="activity_list">
	    			<li v-for="item in activityList">
	    				<a :href="item.url">
	    					<img :src="item.image|imgUrl">
	    					<h3 class="f28 plr20 mt10 mb5 ellipsis">{{item.title}}</h3>
	    					<p class="c_888 plr20">活动时间：{{item.startTime}} - {{item.endTime}}</p>
	    				</a>
	    			</li>
	    		</ul>
	    		<!--E活动列表-->
	    		<!--S9格-->
				<!--<ul class="account_icon nine_icon flex" v-if="nineGridList.length">
					<li class="account_item" v-for="item in nineGridList">
						<router-link :to="item.url">
							<img :src="item.image|imgUrl" alt=""/>
							<h3>{{item.title}}</h3>
						</router-link>
					</li>
				</ul>-->
				<!--E9格-->
				<!--S单张平铺-->
	    		<div class="activity_banner swiper-container pl30" v-if="singleImage.length">
	    			<ul class="swiper-wrapper">
	    				<li class="swiper-slide" v-for="item in singleImage">
	    					<a href="javascript:void(0);" :href="item.url">
	    						<img :src="item.image|imgUrl">
	    				    </a>
	    				</li>
	    			</ul>
	    		</div>
	    		<!--E单张平铺-->
    	    </div>
    	</transition>
    	<!--E第二屏-->
    	<transition name="page-slide">
	        <keep-alive>
	            <router-view></router-view>
	        </keep-alive>
	    </transition>

	    <!--S 底部-->
		<footer-nav :active='4' v-if="currentPage!=1"></footer-nav><!--第一屏不展示底部-->
		<!--E 底部-->
	</div>
</template>

<script>
	import footerNav from 'src/components/footerNav';
	import {
		fetchProjectMenu,       //获取平台列表
		fetchGeneralImage,      //第一页=>轮播
		fetchAccountInformation,//个人信息
	    fetchNoticeList,        //公告列表
	    fetchGeneralcomPosition,//账户主页综合
	    fetchIslogin,//判断是否登录
	    fetchCmsMailList //公告列表
	} from 'src/service/getData';
    export default {
    	data(){
            return{
            	isShowTime:true,             //是否显示倒计时，第一次显示
            	currentPage: 1,              //当前页面
            	time:4,                      //第一页=>倒计时
            	pageOneList:[],              //第一页=>轮播列表
            	city:window.CITY,            //第二页=>地址
             	userinfo:{},                 //第二页=>用户信息
             	moneyActivity:[],            //第二页=>账户信息下的广告 列表
             	nineGridList:[],             //第二页=>九宫格
             	twelveGridList:[],           //第二页=>十二宫格
             	swiperList:[],               //第二页=>轮播广告
             	singleImage:[],              //第二页=>单张平铺图
            	activityList:[],             //第二页=>活动列表数组
            	noticeList:[],               //第二页=>公告列表
            	projects:[],                 //顶部平台
            	isLogin:false,               //是否登录
            	dataList:[]                  //未读公告列表
            }
        },
        components:{
        	footerNav//底部
        },
        activated() {
        	this.getIsLogin();//是否登录
        	this.cmsMailListFn();//获取未读公告列表
        },
        mounted(){
        	//第二页=>账户信息下的广告
        	fetchGeneralImage('HOME_MONEY_ACTIVITY').then(res=>{
        		if(res.status){
        			this.moneyActivity = res.data.list;
        		}
        	})

        	//第二页=>活动列表
        	fetchGeneralImage('ACTIVITY_LIST').then(res=>{
        		if(res.status){
        		    this.activityList = res.data.list;
        		}
        	});
        	if(!localStorage.isShowPageOne){//是否展示第一页
	    	    localStorage.isShowPageOne=true;
	    	    this.slidePage1();
        	}else{
        		this.isShowTime = false;
        		this.slidePage2();
        	}
       },
       	methods: {
       		cmsMailListFn(){//获取平台公告未读内容
	    		fetchCmsMailList(1,10,"N","tc").then(res=>{//请求公告列表
	    			this.dataList= res.data.dataList||[];
		    	});
	    	},
       		//顶部跳转
       		topLink(code){
       			switch(code)
				{
					case "WXPTLB_TC" : return "/account"
				  	break;
					case "WXPTLB_WXZC" : return "/"
				  	break;
					default : return ""
				}
       		},
       		expectTips(url){
       			if(!url){
       				window.expectTips();
       			}else{
       				this.$router.push(url);
       			}
       		},
       		slidePage1(){             //从第二页返回第一屏
       			this.currentPage = 1;
       			if(this.isShowTime){
	       			this.time = 4;        //重新设置时间
	       			this.countDown();     //重新启动倒计时
	       		}
       			//第一页=>轮播
	        	fetchGeneralImage('HOME_CENTER').then(res=>{
	        		if(res.status){
	        			this.pageOneList = res.data.list;
		        		this.$nextTick(res=> {
			        		//第一屏=>广告
			        		var advertList = new Swiper('#J_advert_list', {
			        			loop: true,
			        			prevButton:'.swiper-button-prev',
			                    nextButton:'.swiper-button-next',
							})
		        		})
	        		}
	        	})
       		},
       		slidePage2(){//第一屏到第二屏
       			this.currentPage = 2;
       			//第二页综合
				fetchGeneralcomPosition('TYPB_TC_HOME_TWO').then(res=>{
					if(res.status){
						let list = res.data.list;
						list.forEach(v=>{
							if(v.viewType == 1){
								this.nineGridList = v.list;//九宫格
							}else if(v.viewType == 2){
								this.swiperList = v.list;//轮播广告
							}else if(v.viewType == 3){
								this.singleImage = v.list;//平铺广告
							}else if(v.viewType == 6){
								this.twelveGridList = v.list;//十二宫格
							}
						})
						this.$nextTick(res=> {
							//第二屏=>banner 轮播
							var bannerSwiper = new Swiper('#J_activity_banner', {
								loop: true,
								autoplay: 5000,//可选选项，自动滑动
								pagination: '.swiper-pagination'
							})

							//公告列表
							var noticeSwiper = new Swiper('#J_bulletin_box', {
								loop: true,
								direction : 'vertical',
								autoplay: 5000,//可选选项，自动滑动
							})
						})
					}
				})

       			//第二页=>公告列表
	        	fetchNoticeList('DDTTCGG','KBGG').then(res=>{
	        		if(res.status){
	        		    this.noticeList = res.data;
	        		    this.$nextTick(res=> {
							//公告列表
							var noticeSwiper = new Swiper('#J_bulletin_box', {
								loop: true,
								direction : 'vertical',
								autoplay: 5000,//可选选项，自动滑动
							})
						})
	        		}
	        	})

	        	//获取顶部平台
	        	fetchProjectMenu().then(res=>{
					if(res.data){
						this.projects = res.data.list||[];
						this.$nextTick(res=> {
		       				//第二屏=>头部
							var mySwiper = new Swiper('#topNav', {
								initialSlide :2,
								freeMode: true,
								freeModeMomentumRatio: 0.5,
								slidesPerView: 'auto'
							});
						})
					}
				})
       		},
       		countDown(){//第一屏倒计时
       			this.time--;
       			if(this.time<=0){
       				this.slidePage2();
       				clearTimeout(t);
       				this.isShowTime = false;
       				return;
       			};
	        	this.time = this.time;
        		let t = setTimeout(this.countDown,1000);
       		},
			getIsLogin(){//判断是否登录
				fetchIslogin().then(res => {
					if(res.status){
						this.isLogin=res.data.login;
						if(this.isLogin){
							//第二页=>账户信息
				        	fetchAccountInformation().then(res=>{
				        		if(res.status){
				        			this.userinfo = res.data;
				        		}
				        	})
						}
					}
				});
			}
        }
    }
</script>

<style lang="less" scoped="scoped">
	@import (reference) "~src/style/all.less";
	.account_box{
		position: absolute;
		top:0;
		left:0;
	    height: 100%;
	    width: 100%;
	}

	/*S第一屏*/
	.account_one{
		position: relative;
		height:100%;
		overflow: hidden;
		.account_infor{
			position: absolute;
			z-index: 10;
			left:0.3rem;
			bottom:0.3rem;
			width:6.9rem;
			padding:0.5rem 0 0.3rem;
			.border-radius(0.1rem);
			background:#fff;
			.box_shadow(0 0.05rem 0.2rem rgba(0, 0, 0, 0.1));
		}
	}
	.next_page2{
		position: absolute;
		bottom:2.3rem;
		left:0;
		z-index:2;
	}

	/*S轮播*/
	.advert_list{
		height:100%;
		& img{
			width: 100%;
		}
		& .advert_btn{
			position: absolute;
			top:0;
			bottom: 0;
			margin:auto;
			width:0.7rem;
			height:0.7rem;
			&.swiper-button-prev{
				left: 0;
				background: url('~src/images/advert_prev.png') no-repeat;
				background-size: 100% 100%;
			}
			&.swiper-button-next{
				right: 0;
				background: url('~src/images/advert_next.png') no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	/*E轮播*/
	/*S倒计时*/
	.count_down{
		position: absolute;
		top:0.24rem;
		right:0.4rem;
		z-index:2;
	}
	.big_shadow{
    	width:0.7rem;
    	height:0.7rem;
    	line-height:0.7rem;
    	font-size:0.26rem;
    	color: #fff;
    	text-align: center;
    	border-radius:50%;
    	background:rgba(0,0,0,0.3);
    	z-index:2;
    }
    .small_rotate{
    	position: absolute;
    	top:0;
    	left:0;
    	width:0.7rem;
    	height:0.7rem;
    	border-radius:50%;
    	animation:circle 3s linear;
    	-webkit-animation:circle 3s linear;
    }
    .small_circle{
    	position: absolute;
    	top:-0.03rem;
    	left:50%;
    	margin-left:-0.03rem;
    	width: 0.06rem;
    	height: 0.06rem;
    	background: @color;
    	border-radius:50%;
    }
    @keyframes circle{
        0%{ transform:rotate(0deg); }
        100%{ transform:rotate(360deg); }
    }
    @-webkit-keyframes circle{
        0%{ transform:rotate(0deg); }
        100%{ transform:rotate(360deg); }
    }
    /*E倒计时*/
    /*S转圈*/
    .circle_box{
    	position: absolute;
    	top:0;
    	left:0;
    	width:0.7rem;
    	height:0.7rem;
    	& .circle_item{
    		position: absolute;
    		top:0;
    		width:0.35rem;
    		height:0.72rem;
    		overflow: hidden;
    		&.left{
    			left:0;
    		}
    		&.right{
    			right:0;
    		}
    	}
    	& .circle{
    		position: absolute;
    		top:0;
    		width:0.7rem;
    		height:0.7rem;
    		.border-radius(50%);
    		border:1px solid @color;
    		transform: rotate(45deg);
    		-webkit-transform: rotate(45deg);
    		&.left{
    			left:0;
    			border-left:1px solid transparent;
    			border-bottom:1px solid transparent;
    			animation: circleProgressLoad_left 3s linear;
    			-webkit-animation: circleProgressLoad_left 3s linear;
    		}
    		&.right{
    			right:0;
    			border-top:1px solid transparent;
    			border-right:1px solid transparent;
    			animation: circleProgressLoad_right 3s linear;
    			-webkit-animation: circleProgressLoad_right 3s linear;
    		}
    	}
    }
    @keyframes circleProgressLoad_right{
        0%{
        	transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        50%,100%{
        	transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
        }
    }
    @-webkit-keyframes circleProgressLoad_right{
        0%{
        	transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        50%,100%{
        	transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
        }
    }
    @keyframes circleProgressLoad_left{
        0%,50%{
        	transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        100%{
        	transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
        }
    }
    @-webkit-keyframes circleProgressLoad_left{
        0%,50%{
        	transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        100%{
        	transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
        }
    }
    /*E转圈*/
	/*E第一屏*/

	/*S第二屏*/
	.l_index_tab{
	    padding: 0.1rem 0 0.2rem;
	    background:#ee4c4c;
	    .swiper-slide{
	        width: auto;
	    }
	    li{
	        height: 0.6rem;
	        line-height: 0.6rem;
	        padding: 0 0.4rem;
	        .border-radius(0.3rem);
	        a{
	            display: block;
	            width: 100%;
	            height: 100%;
	            color:#fff;
	        }
	    }
	    .on{
	        background:#fff;
	        .box_shadow(0px 0px 0.2rem rgba(252,21,43,0.14));
	        a{
	            color: @color;
	        }
	    }
	}

	.personal_infor{
		padding:0 0.3rem 0.25rem;
		background:url('../images/account_bg.jpg') no-repeat left top;
		background-size:7.5rem;
	}
	.account_circle{
		position: absolute;
		right:0.04rem;
		top:0.3rem;
		width:0.1rem;
		height:0.1rem;
		.border-radius(50%);
		background:@color_or;
	}
	.personal_box{
		position: relative;
        width:6.9rem;
		padding:0.5rem 0 0.3rem;
		.border-radius(0.1rem);
		background:#fff;
		.box_shadow(0 0.05rem 0.2rem rgba(253, 96, 81, 0.1));
		& .infor_crown{
			position: absolute;
			top:-0.1rem;
			left:50%;
			margin-left:-0.5rem;
			width:0.39rem;
			height:0.35rem;
			background:url('~src/images/crown.png') no-repeat;
			background-size:0.39rem 0.35rem;
			z-index:1;
		}
	}

	.infor_via{
		position: absolute;
		top:-0.45rem;
		left:50%;
		width:0.81rem;
		margin-left:-0.4rem;
		.border-radius(50%);
		background: #fff;
		z-index:1;
		& img{
			display: block;
			width:0.81rem;
		    height:0.81rem;
		    margin:0 auto;
			.border-radius(50%);
			.box_shadow(0 0 0.09rem #eeeaea);
		}
	}

	.upward_icon{
		display: block;
		width:100%;
		height:0.4rem;
		margin:0 auto 0.1rem;
		background:url('~src/images/upward_icon.png') no-repeat center;
		background-size:0.24rem 0.24rem;
	}

	.personal_money{
		text-align: center;
		margin-bottom:0.2rem;
		& li{
			width:50%;
		}
	}

	.account_money{
		li{
			width:50%;
			position:relative;
			& a{
				.flex;
				.flex_center;
				.justify_between;
				padding:0 0.3rem;
			}
			&:first-child{
				&:after{
					position: absolute;
					top: 50%;
					right: 0;
					margin-top:-0.36rem;
					content: '';
					width: 1px;
					height: 0.7rem;
					background: #ededed;
				}
				& img{
					width:0.94rem;
					height:0.85rem;
				}
			}
			&:nth-child(2){
				& img{
					width:0.74rem;
					height:0.79rem;
				}
			}
		}
	}

	.infor_home{
		color:#fff;
		line-height:0.41rem;
		padding:0 0.1rem;
		.border-radius(0.04rem);
		background:#fc6d66;
	}
	.account_icon{
		flex-wrap: wrap;
		margin-top:0.5rem;
	}
	.account_item{
		width:25%;
		margin-bottom:0.5rem;
		text-align: center;
		& a{
			.with_a;
		}
		& img{
			height:0.5rem;
			margin-bottom:0.2rem;
		}
		& h3{
			.f26;
		}
	}
	.nine_icon{
		& li{
			width:33.33%;
		}
	}
	.down_icon{
		width:100%;
		height:0.5rem;
		background:#e93f3f url('~src/images/down_icon.png') no-repeat center;
		background-size:0.3rem 0.3rem;
	}
	.back_arrow{
		width:100%;
		height:0.5rem;
		background: url('~src/images/back_arrow.png') no-repeat center;
		background-size:0.3rem 0.3rem;
	}
	.account_three{
		padding:0 0.3rem;
	}
	.activity_banner{
		width:100%;
		height:1.98rem;
		overflow: hidden;
		& a{
			display: block;
		}
		& img{
			width: 6.9rem;
			height:1.98rem;
		}
	}
	.swiper-pagination-bullet{
		width:0.14rem;
		height:0.14rem;
		background:#4d557e;
		&.swiper-pagination-bullet-active{
			background:#e9e9e9;
		}
	}
	.bulletin_box{
		.border();
		.border-radius(0.1rem);
		padding:0 0.2rem;
		margin:0.2rem 0.3rem 0.4rem;
	}
	.bulletin_list{
		height:0.7rem;
		line-height: 0.72rem;
	}
	.bulletin_icon{
		width:0.74rem;
		height:0.34rem;
		background:url('~src/images/bulletin.png') no-repeat;
		background-size:100% 100%;
	}
    .activity_list{
    	& li{
    		width:6.9rem;
    		height:3.52rem;
    		.border();
    		.border-radius(0.1rem);
    		margin:0 auto 0.3rem;
    	}
    	& img{
    		width:6.88rem;
    		height:2.49rem;
    	}
    }
    /*E第二屏*/
    .border_r{
   	    .border-r(@color);
    }
    .lineHeight1{
    	line-height:1;
    }
</style>
