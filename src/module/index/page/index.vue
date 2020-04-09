<template>
	<div style="height: 100%;">
	<div class="l_index_page bg_fff" id="J_index_page">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
			
			<!--
            	作者：gaoxiaopeng@ddtkj.com
            	时间：2018-10-16
            	描述：公众公众号飘窗
            -->
			<div class="attention" v-show="$store.state.wechatSystem&&isAttentionShow">
				<div class="flex flex_center plr30 justify_between attention_box">
					<p class="c_333">关注公众号，体验更多精彩</p>
					<a href="javascript:;" class="attention_btn f26" @click="clickAttention">立即关注</a>
				</div>
			</div>
			<com-qrcode ref="qrcode"></com-qrcode>
			<div class="l_index_page_top pos_rel bg_fff" :class="{l_index_page_top_on:isFixd}">
				<!--S 头部tab-->
				<div class="l_index_top_con" id="J_index_top_con">
					<!-- <div class="l_index_tab swiper-container f30" id="topNav">
						<ul class="swiper-wrapper justify_center">
							<li class="swiper-slide" :class="{on:el.code=='WXPTLB_TC'}" v-for="el in projects">
								<router-link :to="el.remark" v-if="el.remark.indexOf('http')==-1">{{el.name}}</router-link>
							</li>
						</ul>
					</div> -->
					<!--E 头部tab-->
					<!--S 弹幕-->
					<div class="l_index_ts" :class="{on:isShowAd}">
						<div class="l_index_ad">
							<p class="c_fff f22 ellipsis" v-html="formateHeadLine(layerScreen.content)"></p>
						</div>
					</div>
					<!--E 弹幕-->
					<!--S 快捷入口-->
					<div class="l_un_tag_box">
						<div class="swiper-container l_un_tag" id="J_un_tag">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									<router-link to="/skillType">
										<img src="../images/indexIcon3.png">
										<p class="f28 mt20">接单赚钱</p>
										<p class="f20 c_999 mt6">技能换钱很简单</p>
									</router-link>
								</div>
								<div class="swiper-slide">
									<router-link to="/demandType">
										<img src="../images/indexIcon2.png">
										<p class="f28 mt20">发布需求</p>
										<p class="f20 c_999 mt6">一键3分钟约10人</p>
									</router-link>
								</div>
								<div class="swiper-slide">
									<router-link to="/stationIndex">
										<img src="../images/indexIcon4.png">
										<p class="f28 mt20">站长招募</p>
										<p class="f20 c_999 mt6">享受高额奖金</p>
									</router-link>
								</div>
							</div>
						</div>
					</div>
					<router-link class="c_index_search" to="/search">
						<i class="iconfont icon-fangdajing"></i> 搜索您感兴趣的
					</router-link>
					<!--E 快捷入口-->
					<!--S 图片导航-->
					<div class="swiper-container pb30" id="J_un_classify">
						<div class="swiper-wrapper">
							<ul class="swiper-slide c_index_inType" v-for="v in Math.ceil(menuList.length/10)">
								<li v-for="el in menuList.slice((v-1)*10,v*10)">
									<router-link :to="el.url?el.url:'/search?skillId='+el.id+'&name='+el.skillName">
										<img :src="el.icon|imgUrl" />
										<p>{{el.skillName}}</p>
									</router-link>
								</li>
							</ul>
						</div>
						<div class="swiper-pagination"></div>
					</div>
					<!--E 图片导航-->
					<!--S 最新动态-->
					<div class="bg_gray hei20"></div>
					<div class="l_news">
						<i class="iconfont icon-xiexian"></i>
						<router-link class="l_news_link" to="/topLine">
							<div class="swiper-container l_news_list" id="J_news_list">
								<div class="swiper-wrapper">
									<div class="swiper-slide" v-for="el in newsList">
										<span class="ellipsis pull_left" v-html="formateHeadLine(el.content,true)"></span>
										<i class="pull_right iconfont icon-arrow-right"></i>
									</div>
								</div>
							</div>
						</router-link>
					</div>
					<div class="bg_gray hei20"></div>
					<!--E 最新动态-->
					<!--S 同城热约-->
					<div class="pb20" v-if="hotList.length">
						<h3 class="c_title_style">
							<i></i>同城热约
						</h3>
						<ul class="c_index_date plr20">
					        <li v-for="el in hotList.slice(0,3)">
					        	<img :src="el.headPhoto|imgUrl"/>
					        	<span class="c_skill_label ellipsis">{{el.skillName}}</span>
					        	<p><em>距离你{{el.distance/1000|number(1)}}km</em></p>
					        	<a @click="toAboutTa(el.mid,el.skillSubCategory)" class="btn">约Ta</a>
					        </li>
						</ul>
					</div>
					<!--E 同城热约-->
					<!--S 限时活动-->
					<div class="pb20" v-if="activityList.length">
						<h3 class="c_title_style">
							<i></i>限时活动
						</h3>
						<ul class="c_limit_activity pl30 clearfix">
					        <li v-for="el in activityList">
								<a :href="el.url">
									<img :src="el.image|imgUrl"/>
								</a>
							</li>
						</ul>
					</div>
					<!--E 限时活动-->
					<!--S 赚钱攻略-->
					<div class="pb20" v-if="makeMoneyList.length">
						<h3 class="c_title_style">
							<i></i>赚钱攻略
						</h3>
						<div class="swiper-container l_index_strategy mt-20" id="J_index_strategy">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="el in makeMoneyList.slice(0,3)">
									<a :href="el.url">
										<img :src="el.image|imgUrl">
									</a>
								</div>
							</div>
						</div>
					</div>
					<!--E 赚钱攻略-->
					<!--S 身边动态-->
					<div class="pb20 mt-20" v-if="besideList.length">
						<h3 class="c_title_style">
							<i></i>身边动态
							<router-link class="pull_right navigate_right f22 c_999 pr20" to="/notice">更多</router-link>
						</h3>
						<ul class="c_index_date c_index_trends plr20">
					        <li v-for="el in besideList.slice(0,3)">
					        	<router-link class="fill_href" to="/notice">
						        	<img :src="el.headPhoto|imgUrl"/>
						        	<p class="flex justify_between">
						        		<em class="ellipsis">{{el.skillName}}</em>
						        		<em>{{el.distance/1000|number(1)}}km</em>
						        	</p>
					        	</router-link>
					        </li>
						</ul>
					</div>
					<!--E 身边动态-->
					<div class="line_box"></div>
				</div>
				<!--S tab-->
				<div class="l_list_tab_box" :class="{fixd:isFixd}" id="J_fixed">
					<div class="title">
						<div class="tit_font"><img class="l_index_logo" src="../images/logo.png" alt="" /></div>
						<router-link class="tit_icon right search" to="/search">
				            <i class="iconfont icon-fangdajing"></i>
				        </router-link>
				        <router-link class="tit_icon right message" to="/news">
				        	<!--<em>20</em>-->
				            <i class="iconfont icon-xiazai16"></i>
				        </router-link>
					</div>
					<ul class="filtrate_list_tab pos_rel">
						<li :class="{on:sort==0}" @click="clickListSort(0)">智能排序</li>
						<li :class="{on:sort==2}" @click="clickListSort(2)">人气最高</li>
						<li :class="{on:sort==3}" @click="clickListSort(3)">距离最近</li>
						<li :class="{on:isBgShow}" @click="isShowfilterBox()">高级筛选<i class="iconfont icon-arrow-down f30 ml4"></i></li>
						<filter-box ref="filterBox" @filterList="filterList"></filter-box>
					</ul>
				</div>
			</div>
			<div style="height:1.66rem" v-if="isFixd"></div>
			<!--列表站位-->
			<!--E 列表-->
			<item :userInfo="el" v-for="el in list" :isIndex="true"></item>
			<div class="text_center" v-if="!list.length"  style="padding-bottom: 3rem;">
					<!--无数据-->
					<nodata notice="抱歉！服务器突然找不到您了！<br/>请您换个位置点击重新定位！"></nodata>
					<button class="btn" @click="clickResetLocation()"><i class=" iconfont icon-dizhi-01 f32 mr5"></i>{{locationBtnTxt}}</button>
			</div>
		</mt-loadmore>
		<!--S 列表中广告位-->
		<!--S 返回顶部-->
		<div class="l_index_to_top" v-if="isToTopShow" @click="toTop">
			<i class="iconfont icon-fanhuidingbu c_555 f32"></i>
			<span class="f22">顶部</span>
		</div>
		<!--E 返回顶部-->
		<!--背景-->
		<div class="l_bg" v-if="isBgShow" @click="isBgShow=false;$refs.filterBox.close();"></div>

	</div>
	<!--S 底部-->
	<footer-nav></footer-nav>
	<!--E 底部-->
	</div>
</template>

<script>
	import footerNav from 'src/components/footerNav'//底部导航
	import comQrcode from 'src/components/com-qrcode'; //弹窗二维码组件
	import item from '../components/item'//技能列表的每一项
	import filterBox from '../components/filter'//筛选条件
	import moreSkill from '../images/more.png'//更多的图片
	import {getInfo} from 'src/config/mUtils'//获取用户信息
	import {wechat_Or_geoLocation} from 'src/config/mapApi'; //导入地址定位（高德&微信）
	//import dialogBox from 'src/components/alert/dialog';  //对话框
	import {fetchIndexRecommendSkill,//获取图片导航
			fetchIndexHot,//获取同城热约
			fetchIndexBeside,//获取身边动态
			fetchIndexHeadlineOne,//获取弹幕
			fetchSkillList//获取技能列表
	} from '../service/getData'
	import {
		fetchProjectMenu,//获取顶部平台
		fetchIndexHeadline,//获取头条列表
		fetchGeneralImage//获取广告位
	} from 'src/service/getData'
	export default {
		data() {
			return {
				projects:[],//顶部平台
				bodyWidth:document.body.offsetWidth,//屏幕宽度
				bodyHeight:document.body.offsetHeight,//屏幕宽度
				isShowAd:false,//是否显示弹幕
				layerScreen:'',//弹幕显示的内容
				isFixd:false,//列表选项卡是否置顶
				isToTopShow:false,//是否展示返回顶部
				isBgShow:false,//黑色背景是否显示
				menuList:[],//图片导航
				newsList:[],//同城头条
				makeMoneyList:[],//赚钱攻略
				swiper1:null,//快捷入口swiper
				swiper2:null,//同城头条swiper
				swiper3:null,//赚钱攻略swiper
				hotList:[],//同城热约
				activityList:[],//限时活动
				besideList:[],//身边动态
				sort:0,//技能列表排序
				allLoaded:false,//是否已经全部加载
				size:5,//每页条数
				list:[],//技能列表
				pegeCon:null,//页面内容显示主区域
				source:null,//长连接
				isAttentionShow:false,//是否显示关注公众号头部,
				locationBtnTxt:"重新定位",
				data:{//获取技能列表 参数对象
					page:1,
					size:5,
					sort:0,
					position:'index',
				} 
			}
		},
		components: {
			footerNav,
			item,
			filterBox,
			comQrcode
		},
		computed: {
		  locationStatus() {
		    return this.$store.state.locationStatus;
		  }
		},
		watch:{
			//排序
			sort(cur){
				this.data.sort = cur;
				this.data.page = 1;
				this.getList();
			},
			locationStatus(val) {//定位成功了
			    if(val){
			    	this.getDataByLocation();//需要传递定位信息的接口，根据客户端成功获取到定位信息后在读取	
			    }
			}
		},
		beforeRouteLeave(to,from,next){
			/*离开路由--关闭连接*/
			if (this.source) {
				this.source.close();
			}
			/*关闭swiper动画*/
			for(let i=1;i<4;i++){
				if(this['swiper'+i]){
					if(this['swiper'+i].stopAutoplay){
						this['swiper'+i].stopAutoplay();
					}
				}
			}
			window.removeEventListener('scroll',this.attentionTab) //关闭滚动悬浮
			next();
		},
		activated(){
			wechat_Or_geoLocation();//定位
			if(sessionStorage.LAT){
				this.data.page=1;//重置 页码
				this.data.sort=0; //重置排序方式
				this.getDataByLocation();//读取信息	
			}
			this.allLoaded = false;
			if(this.pegeCon){
				this.pegeCon.scrollTop = 0;
			}
			this.isFixd = false;
			
			/*弹窗显示js*/
			//头条建立连接
			if (window.EventSource) {
			    this.source = new EventSource('https://app-tcyd.dadetong.com/api/tc/headLine/headlineListByPage?size=1&interval=8');
			    this.source.onmessage = (e)=> {
			    	if(!e.data){
			    		return;
			    	}
			    	let res = JSON.parse(e.data);
			    	if(res.data&&res.data.list&&res.data.list.length){
			    		this.layerScreen = res.data.list[0];
			    		this.isShowAd = true;
			    		let t = setTimeout(()=>{
							this.isShowAd = false;
							clearTimeout(t);
						},2000)
			    	}
			    }
			} else {
			    console.error('Your browser doesn\'t support SSE');
			}
			/*启动swiper*/
			for(let i=1;i<4;i++){
				if(this['swiper'+i]){
					if(this['swiper'+i].startAutoplay){
						this['swiper'+i].startAutoplay();
					}
				}
			}
		},
		mounted() {
			//获取平台
			//this.getProject();
			//获取图片导航
			this.getImgNav();
			//获取头条列表
			this.getTopLine();
			//获取限时活动
			this.getActivityList();
			//获取赚钱攻略
			this.getMakeMoneyList();
			//swiper
			this.$nextTick(function() {
				this.pegeCon = document.querySelector('#J_index_page');//页面滚动区域
				this.pegeCon.scrollTop = 0;
				let tab = document.querySelector("#J_index_top_con");//获取tab切换上面的内容
				this.pegeCon.addEventListener('scroll', (e) => {
					let topTab = tab.offsetHeight;//获取tab切换上面内容的高度
					/*返回顶部 滚动条不在最顶部的时候就显示*/
					if(this.pegeCon.scrollTop > 0){
						this.isToTopShow = true;
					} else {
						this.isToTopShow = false;
					}
					//列表的tab固定  滑动到tab位置固定
					if(this.pegeCon.scrollTop >= topTab) {
						this.isFixd = true;
					} else {
						this.isFixd = false;
					}
				});
				//发布需求--快捷入口swiper自适应
				this.swiper1 = new Swiper('#J_un_tag', {
					effect: 'coverflow',
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					grabCursor: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					loop: true,
					loopAdditionalSlides :0,
					coverflow: {
						rotate: 0,
						stretch: 0,
						depth: 122,
						modifier: 1,
						slideShadows: false
					}
				});
			});
			this.isSubscribe(); //判断是否关注公众号，是否显示关注飘窗
		},
		methods: {
			//约他
			toAboutTa(mid,skillId){
				let id = getInfo('id');
				if(mid==id){
					alertTip('不能约本人哦，换个人试试吧!');
				}else{
					this.$router.push({path:'/aboutTa',query:{skillId:skillId,mid:mid}});
				}
			},
			//获取顶部平台
			getProject(){
				fetchProjectMenu().then(res=>{
					if(res.data){
						this.projects = res.data.list||[];
					}
					this.$nextTick(()=>{
						new Swiper('#topNav', {
							initialSlide: this.projects.findIndex(v=>v.code=='WXPTLB_TC'),
							freeMode: true,
							freeModeMomentumRatio: 0.5,
							slidesPerView: 'auto'
						});
					})
				})
			},
			//获取图片导航
			getImgNav(){
				fetchIndexRecommendSkill('index').then(res=>{
					if(res.data){
						this.menuList = res.data.skillList||[];
						this.menuList = this.menuList.slice(0,19);
						this.menuList.push({skillName:'全部分类',icon:moreSkill,url:'/allType'})
						if(this.menuList.length>10){
							this.$nextTick(()=>{
								new Swiper('#J_un_classify', {
									loop: true,
									grabCursor: true,
									paginationClickable: true,
									autoplayDisableOnInteraction: false,
									pagination: '.swiper-pagination'
								});
							})
						}
					}
				})
			},
			//获取头条列表
			getTopLine(){
				fetchIndexHeadline(10,'').then(res=>{
					if(res.data){
						this.newsList = res.data.list||[];
						this.$nextTick(()=>{
							this.swiper2 = new Swiper('#J_news_list', {
								loop: true,
								direction: 'vertical',
								grabCursor: true,
								autoplay: 3000,
								autoplayDisableOnInteraction:false
							})
						})
					}
				})
			},
			//获取同城热约
			getHotList(){
				fetchIndexHot('index').then(res=>{
					if(res.data){
						this.hotList = res.data.list||[];
					}
				})
			},
			//获取限时活动
			getActivityList(){
				fetchGeneralImage('INDEX_ACTIVITY').then(res=>{
					if(res.data){
						this.activityList = res.data.list||[];
					}
				})
			},
			//获取赚钱攻略
			getMakeMoneyList(){
				fetchGeneralImage('INDEX_MAKE_MONEY').then(res=>{
					if(res.data){
						this.makeMoneyList = res.data.list||[];
					}
					this.$nextTick(()=>{
						let stretch = -20;
						if(this.bodyWidth>=600){
							stretch = -30;
						}
						//赚钱攻略
						this.swiper3 = new Swiper('#J_index_strategy', {
							effect: 'coverflow',
							autoplay: 3000,
							autoplayDisableOnInteraction: false,
							grabCursor: true,
							centeredSlides: true,
							slidesPerView: 'auto',
							loop: true,
							loopAdditionalSlides :0,
							coverflow: {
								rotate: 0,
								stretch: stretch,
								depth: 100,
								modifier: 1,
								slideShadows: false
							}
						});
					})
				})
			},
			//获取身边动态
			getBesideList(){
				fetchIndexBeside('index').then(res=>{
					if(res.data){
						this.besideList = res.data.list||[];
					}
				})
			},
			//点击筛选
			isShowfilterBox(){
				if(this.isBgShow){
					this.isBgShow = false;
					this.$refs.filterBox.close();
				}else{
					this.isBgShow = true;
					this.$refs.filterBox.show();
				}
			},
			//筛选列表
			filterList(data){
				this.isBgShow = false;
				delete this.data.gender;//性别
				delete this.data.minAge;delete this.data.maxAge;//年龄
				delete this.data.dist;//距离
				delete this.data.authType;//认证
				delete this.data.media;//媒体
				delete this.data.serviceType;//服务方式
				for(let i in data){
					this.data[i] = data[i];
				}
				this.data.page = 1;
				this.getList();
			},
			//获取列表
			getList(){
				this.data.longitude=sessionStorage.LON;
				this.data.latitude=sessionStorage.LAT;
				this.data.cityCode=sessionStorage.CITYCODE;
				this.data.position='index'
				
				fetchSkillList(this.data).then(res=>{
					if(res.data){
						if(this.data.page==1){
							this.list = res.data.list||[];
						}else{
							this.list = this.list.concat(res.data.list||[]);
							this.$refs.loadmore.onBottomLoaded();
						}
						if(res.data.list&&res.data.list.length>=this.size){
							this.allLoaded = false;
						}else{
							this.allLoaded = true;
						}
					}else{
						this.allLoaded = true;
					}
				})
			},
			//下拉
			loadBottom(){
				this.data.page += 1;
				this.getList();
			},
			//返回顶部
			toTop(){
				let top = this.pegeCon.scrollTop;
				let step = top/(10*3);
				let t = setInterval(()=>{
					top = top-step;
					if(top<=0){
						top = 0;
						clearInterval(t);
					}
					this.pegeCon.scrollTop = top;
				},10)
			},
			//是否显示飘窗
			attentionTab () {
				
				if (window.scrollY>0) {
					this.isAttentionShow = false
				} else {
					this.isAttentionShow = true
				}
				
			},
			//是否关注公众号
			isSubscribe () {
				if (this.$store.state.subscribe==1) {//已经关注过公众号，不展示
					this.isAttentionShow = false;
				} else {
					this.isAttentionShow = true;
					window.addEventListener('scroll',this.attentionTab) //开启滚动悬浮
				}
			},
			//立即关注
			clickAttention () {
				this.$refs.qrcode.createWechatCode();
			},
			clickListSort(sort){
				this.sort=sort;
				this.$refs.filterBox.close();
				this.isBgShow=false;
				wechat_Or_geoLocation();//重新定位
			},
			clickResetLocation(){
				
				this.locationBtnTxt="定位中..."
				setTimeout(()=>{
					this.locationBtnTxt="定位结束"
				},3000);
				wechat_Or_geoLocation();//定位
			},
			getDataByLocation(){//所有需要定位信息的接口，定位成功后调用
				//获取同城热约
				this.getHotList();
				//获取身边动态
				this.getBesideList();
				//推荐技能列表
				this.getList();
			}
		}
		
	}
</script>
<style lang="less" scoped>
.l_index_page{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0.98rem;
	.overflow_scroll;
	z-index: 23;
}
.l_index_page_top{
	z-index: 22;
}
.l_index_page_top_on{
	z-index: 23;
}
.l_bg{
	position: fixed;
	width: 7.5rem;
	top: 0;
	left: 50%;
	margin-left: -3.75rem;
	bottom: 0;
	background: rgba(0,0,0,0.5);
	z-index: 21;
}
.dialog_img{
	width: 100%;
}
.l_index_list{
	position: fixed;
	bottom: 0.98rem;
	top: 1.66rem;
	left: 50%;
	width: 7.5rem;
	margin-left: -3.75rem;
	.overflow_scroll;
	z-index: 21;
}
@import '../style/index.less';
</style>
<style lang="less">
@import (reference) '~src/style/all.less';
.l_news_list {
    span{
    	em{
    		.c_red;
    	}
    }
}
.l_index_ad{
    img{
        width: 0.5rem;
        height: 0.5rem;
        .border-radius(50%);
        vertical-align: middle;
        margin: 0 0.1rem;
    }
    em{
        .c_yellow;
    }
}
.attention{
    height: 0.9rem;
	background: #fff;
	.border-b;
    .attention_box{
        height: 100%;
        .attention_btn{
			.c_fff;
            width: 1.8rem;
			height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            background: #ff9511;
			margin-left: 0.3rem;
			.border-radius(0.1rem);
        }
    }
}
</style>
