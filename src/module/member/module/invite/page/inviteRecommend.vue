<template lang="html">
    <div>
        <top title="邀请好友" :isReturn="false"></top>
        <!--<div class="nav">
            <div
                class="nav_item"
                :class="{'cur' : index == i}"
                v-for="(el,i) in navList"
                @click="index = i">
                <span>{{el}}</span>
            </div>
        </div>-->
        <!--<div class="recommend_item" v-if="index==1">
            <div class="banner" :style="{'background-image':'url(' + require('../images/recommend_bg1.jpg') + ')'}">
                <img src="../images/icon.png" alt="" class="icon">
            </div>
            <div class="recommend_box">
                <p class="f26 c_666 mb30">每推荐一位好友技能认证、实名认证</p>
                <p class="f42 c_main mb30">好友得50元红包</p>
                <p class="f26 c_666 mb30">好友完成首笔订单</p>
                <p class="f42 c_main mb50">你将获得50元红包</p>
                <p class="f26 c_red" @click="visible = true">奖励规则>></p>
                <div class="share_list">
                    <div class="share_item" v-for="el in shareList" @click="share(el)">
                        <i class="iconfont" :class="el.icon" :style="{'color':el.color}"></i>
                        <p>{{el.text}}</p>
                    </div>
                </div>
            </div>
            <p class="f26 c_666 text_center mt50">今日累计邀请注册<em class="f36 c_main">1.6万</em>人，累计奖励金额<em class="f36 c_main">110.2万</em>元<br>我已成功邀请<em class="f36 c_main"></em>人，累计获得奖励<em class="f36 c_main">0</em>元<em class="c_main">>></em></p>
        </div>-->
        <div class="recommend_item" v-if="index === 0">
            <div class="banner" :style="{'background-image':'url(' + require('../images/recommend_bg2.jpg') + ')'}">
                <img src="../images/icon.png" alt="" class="icon">
            </div>
            <div class="recommend_box">
                <p class="f26 c_666 mb18">真朋友，有“服”同享 <br>时间技能变现，共享同城服务，</p>
                <p class="f42 c_main mb40">同城约单app火热上线，<br>快来加入</p>
                <p class="f32 c_666 mb30">同城约单站长火热招募中</p>
                <router-link class="f26 c_red" to="/stationIndex">了解详情>></router-link>
                <!--<p class="f26 c_red" @click="visible = true">奖励规则>></p>-->
                <div class="share_list">
                    <div class="share_item" v-for="el in shareList" @click="share(el)">
                        <i class="iconfont" :class="el.icon" :style="{'color':el.color}"></i>
                        <p>{{el.text}}</p>
                    </div>
                </div>
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
} from 'src/service/getDataWeChat'
import {getInfo,wxShare} from 'src/config/mUtils';
export default {
    data(){
        return{
            visible:false,
            index:0,
            navList:['推荐消费者','推荐服务者'],
            shareTitle:'', //分享标题
            shareContent:'', //分享内容
            shareUrl:'', //分享链接
            shareImg:"",//分享图片
            showInvite:false,//二维码分享
            inviteImgList: [], //邀请好友图片
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
                {
                    icon:'icon-erweima',
                    color:'#ffc02b',
                    text:'二维码'
                }
            ]
        }
    },
    methods: {
    	shareMsg(){//获取分享内容
    		if(this.shareUrl){
    			this.shareFn();
    		}else{
    			fetchRegisterForredEnvelopes().then(res=>{
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
		share(el){
			if (el.text == '二维码') {
				//二维码弹窗显示
				this.showInvite = true;
				this.shareImgSwiper();
			} else {
				//分享弹窗显示
				this.$share.show();
			}
		},
		//调用微信分享
		shareFn(){
			wxShare(this.shareUrl+"?reference="+getInfo("mobile")+"&headPhoto="+getInfo("headPhoto"),this.shareTitle,this.shareContent,this.shareImg);
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
			fetchShareImg(getInfo('mobile'),3).then(res => {
				if (res.status) {
					this.inviteImgList = res.data||[];
				}
			})
		},
    },
    mounted(){
		this.shareMsg();//获取分享内容
		this.getShareImg();//二维码分享图片
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
        padding: .4rem .3rem;
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
