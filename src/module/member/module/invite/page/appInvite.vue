<template lang="html">
    <div>
        <div class="recommend_item" v-if="index === 0">
            <div class="banner" :style="{'background-image':'url(' + require('../images/recommend_bg2.jpg') + ')'}">
                <img src="../images/icon.png" alt="" class="icon">
            </div>
            <div class="recommend_box">
                <p class="f26 c_666 mb18">真朋友，有“服”同享 <br>时间技能变现，共享同城服务，</p>
                <p class="f42 c_main mb40">同城约单app火热上线，<br>快来加入</p>
                <p class="f32 c_666 mb30">同城约单站长火热招募中</p>
                <p class="f26 c_red" @click="stationIndexFn">了解详情>></p>
                <span class="btn f32 mt40 plr50" @click="share">立即邀请</span>
                <!--<span class="btn f32 mt40 plr50 ml30" @click="showInvite=true,shareImgSwiper">二维码邀请</span>-->
            </div>
            <!--<p class="f26 c_666 text_center mt50">今日累计邀请注册<em class="f36 c_main">1.6万</em>人，累计奖励金额<em class="f36 c_main">110.2万</em>元<br>我已成功邀请<em class="f36 c_main"></em>人，累计获得奖励<em class="f36 c_main">0</em>元<em class="c_main">>></em></p>-->
        </div>
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
        <div class="layer_shadow" v-if="visible">
            <section class="layer_box">
                <div class="close" @click="visible = false">
                    <i class="iconfont icon-guanbi f26 c_999"></i>
                </div>
                <div class="tit"><span>邀请规则</span></div>
                <div class="con">
                    <p>1、被推荐人必须通过本页面所分享的链接完成下载、注册、登录才可视作参与活动成功；</p>
                    <p>2、被推荐人红包将直接充入用户的账户中，可用于平台消费但不可提现，红包可在个人中心的账户的红包中进行查看；</p>
                    <p>3、推荐人的红包需要被推荐人在完成线上首笔订单或技能认证和实名认证才可获得；</p>
                    <p>4、如发现推荐人双方有作弊违规等不正当行为，将取消和追回所获奖励； </p>
                    <p>5、最终解释权归《同城约单》平台所有。</p>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import {
    fetchRegisterForredEnvelopes//获取分享内容
} from 'src/service/getData';
import {
	fetchShareImg  //分享图片
} from 'src/service/getDataWeChat';
import {getInfo} from 'src/config/mUtils';
import {isAndroid,isiOS} from 'src/config/env';
export default {
    data(){
        return{
            visible:false,
            index:0,
            shareTitle:'', //分享标题
            shareContent:'', //分享内容
            shareUrl:'', //分享链接
            shareImg:"",//分享图片
            showInvite:false,//二维码分享
            inviteImgList: [], //邀请好友图片
            reference:'',//邀请码
            headPhoto:"",//头像
        }
    },
    methods: {
    	shareMsg(){//获取分享内容
    		fetchRegisterForredEnvelopes("").then(res=>{
    			if(res.status){
    				this.shareTitle=res.data.title;//分享标题
    				this.shareContent=res.data.content;//分享内容
    				this.shareUrl=res.data.url;//分享链接
    				if(res.data.img){
    					this.shareImg=res.data.img;//分享图片
    				}else{
    					this.shareImg=''
    				}

    			}
    		});
    	},
    	//分享
		share(){
			if(this.$store.state.platform!='wx'){
				if(isiOS){
					//let shareUrl=this.shareUrl+"#reference="+this.reference+"&headPhoto="+this.headPhoto;
					let shareUrl=encodeURIComponent(this.shareUrl+"?reference="+this.reference+"&headPhoto="+this.headPhoto);
					window.location.href="ddt://Share/inviteFriendShare?link="+shareUrl+"&content="+this.shareContent+'&title='+this.shareTitle+"&img="+this.shareImg;
				}else{
					let shareUrl=this.shareUrl+"?reference="+this.reference+"&headPhoto="+this.headPhoto;
					window.android.setInviteFriendDialog(this.shareTitle,this.shareContent,shareUrl,this.shareImg); 
				}
			}
		},
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
		getShareImg () {//分享图片
			fetchShareImg(getInfo('mobile')).then(res => {
				if (res.status) {
					this.inviteImgList = res.data||[];
				}
			})
		},
		stationIndexFn(){
			if(this.$store.state.platform!='wx'){
				if(isiOS){
					window.location.href='ddt://TCUserCenter/pushWebMasterViewController'
				}else{
					window.android.toNativeAct('DdtkjCityWideRoute://DdtkjCityWide/StationmasterActivity');
				}
			}
		}
    },
    mounted(){
		this.shareMsg();//获取分享内容
		this.getShareImg();//二维码分享图片
		if(this.$store.state.platform!='wx'){
			if(isiOS){
				if(sessionStorage.phone){
					this.reference=sessionStorage.phone;
				    this.headPhoto=sessionStorage.headPhoto;
				}else{
					window.location.href='ddt://DTWeb/getUserInfo?method=getIosUserInfo';//获取用户信息
				}
			}else{
				this.reference=window.android.getUserMobile();//邀请码
				this.headPhoto=window.android.getUserHeadIcon();//用户头像
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.c_red{
    color: #dd2726 !important;
}
.nav{
    display: flex;
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    background: #fff;
    .nav_item{
        flex:1;
        span{
            height: 100%;
            display: inline-block;
            font-size: .28rem;
        }
        &.cur{
            span{
                border-bottom: .05rem solid @color;
                color: @color;
            }
        }
    }
}
.recommend_item{
    .banner{
        height: 5.59rem;
        background-repeat: no-repeat;
        background-size: cover;
        padding-top: .96rem;
        .icon{
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            margin: 0 auto;
        }
    }
    .recommend_box{
        width: 6.9rem;
        height: 6.4rem;
        margin: -2.25rem  auto 0;
        background: #fff;
        padding: .6rem .3rem;
        text-align: center;
        border-radius: .2rem;
        box-shadow:  0 .05rem .6rem rgba(158,158,158,.48);
        p:first-child{
        	line-height:2;
        }
    }
    .share_list{
        display: flex;
        justify-content: space-around;
        margin-top: .4rem;
        .iconfont{
            font-size: .7rem;
        }
        p{
            font-size: .22rem;
            margin-top: .1rem;
        }
    }
}
.layer_box{
    padding: .3rem .08rem;
    position: relative;
    .close{
        display: flex;
        justify-content: center;
        align-items: center;
        width: .65rem;
        height: .65rem;
        border-radius: 50%;
        background: #ebebeb;
        position: absolute;
        right:-.32rem;
        top:-.32rem;
    }
    .tit{
        width: 100%;
        height: .65rem;
        line-height: .65rem;
        text-align: center;
        position: relative;
        span{
            font-size: .3rem;
            padding: 0 .5rem;
            background: #fff;
            position: relative;
            z-index: 1;
        }
        &::after{
            content: '';
            display: block;
            width: 100%;
            height: 1px ;
            background: @line_color;
            position: absolute;
            top:50%;
            left: 0;
        }
    }
    .con{
        padding: .25rem;
        font-size: .26rem;
        line-height: .46rem;
        color: #666;
    }
}

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
</style>
