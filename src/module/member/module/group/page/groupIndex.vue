<template>
    <div>
        <top title="开团免费拿" :isReturn="false"></top>
        <!-- S 弹幕 -->
        <div class="group_ts on">
            <div class="group_mes">
                <img src="" alt="">
                <p class="f24 c_fff">河南省的晓已免费领取长虹桌面风扇</p>
            </div>
        </div>
        <!-- E 弹幕 -->
        <!-- S 今日免单 -->
        <div v-show="tab == 0">
            <div class="group_bg">
                <a href="" class="strategy f26 c_fff">免单攻略</a>
            </div>
            <div class="plr30 pb80">
                <ul class="group_list">
                    <li class="group_item">
                        <div class="group_img">
                            <img src="" alt="">
                        </div>
                        <div class="group_des">
                            <p class="f28">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B</p>
                            <div class="flex justify_between">
                                <div class="flex flex_column justify_end">
                                    <p class="c_666 f26">需7人助力</p>
                                    <p class="c_main f38">￥0</p>
                                </div>
                                <div>
                                    <p class="c_666 f24 text_right mb20">已领4004件</p>
                                    <a href="javascript:;" class="group_btn f30">免费领<i class="iconfont icon-arrow-right f28 ml10"></i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="group_item">
                        <div class="group_img">
                            <img src="" alt="">
                        </div>
                        <div class="group_des">
                            <p class="f28">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B</p>
                            <div class="flex justify_between">
                                <div class="flex flex_column justify_end">
                                    <p class="c_666 f26">需7人助力</p>
                                    <p class="c_main f38">￥0</p>
                                </div>
                                <div>
                                    <p class="c_666 f24 text_right mb20">已领4004件</p>
                                    <a href="javascript:;" class="group_btn f30">免费领<i class="iconfont icon-arrow-right f28 ml10"></i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="group_item">
                        <div class="group_img">
                            <img src="" alt="">
                        </div>
                        <div class="group_des">
                            <p class="f28">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B</p>
                            <div class="flex justify_between">
                                <div class="flex flex_column justify_end">
                                    <p class="c_666 f26">需7人助力</p>
                                    <p class="c_main f38">￥0</p>
                                </div>
                                <div>
                                    <p class="c_666 f24 text_right mb20">已领4004件</p>
                                    <a href="javascript:;" class="group_btn f30">免费领<i class="iconfont icon-arrow-right f28 ml10"></i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- E 今日免单 -->
        <!-- S 我的免单 -->
        <div v-show="tab == 1">
            <div class="group_bg group_bg2">
                <a href="" class="strategy f26 c_fff">免单攻略</a>
            </div>
            <div class="plr30 pb80">
                <ul class="group_list">
                    <li class="group_item">
                        <div class="group_img">
                            <img src="" alt="">
                            <div class="remain_time">剩余23:50:16.6</div>
                        </div>
                        <div class="group_des">
                            <div>
                                <p class="f28">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B</p>
                            </div>
                            <p class="f26 c_666">需7人助力,还差2人</p>
                            <div class="flex justify_between flex_center">
                                <p class="c_main f38">￥0</p>
                                <a href="javascript:;" class="detail f30">助力详情</a>
                                <a href="javascript:;" class="group_btn_s f30">继续分享</a>
                            </div>
                        </div>
                    </li>
                    <li class="group_item">
                        <div class="group_img">
                            <img src="" alt="">
                        </div>
                        <div class="group_des">
                            <div>
                                <p class="f28">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B</p>
                                <p class="f26 c_main">已完成助力，订单正在确认中</p>
                            </div>
                            <p class="f24 c_666 text_right pr30">免单成功</p>
                            <div class="flex justify_between flex_center">
                                <p class="c_main f38">￥0</p>
                                <a href="javascript:;" class="detail f30">助力详情</a>
                            </div>
                        </div>
                    </li>
                    <li class="group_item">
                        <div class="group_img">
                            <img src="" alt="">
                        </div>
                        <div class="group_des">
                            <div>
                                <p class="f28">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B</p>
                            </div>
                            <p class="f26 c_666">需7人助力,还差2人</p>
                            <p class="f24 c_666 text_right pr30">抢单失败</p>
                            <div class="flex justify_between flex_center">
                                <p class="c_main f38">￥0</p>
                                <a href="javascript:;" class="detail f30">助力详情</a>
                                <a href="javascript:;" class="group_btn_s f30">重新抢</a>
                            </div>
                        </div>
                    </li>
                    <li class="group_item">
                        <div class="group_img">
                            <img src="" alt="">
                        </div>
                        <div class="group_des">
                            <div>
                                <p class="f28">Midea/美的10L多功能电烤箱家用烘焙小烤箱 T1-L101B</p>
                            </div>
                            <p class="f26 c_666">需7人助力,还差2人</p>
                            <div class="flex justify_between flex_center">
                                <p class="c_main f38">￥0</p>
                                <a href="javascript:;" class="detail f30">助力详情</a>
                                <a href="javascript:;" class="already_empty f30">已抢空</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- E 我的免单 -->
        <!-- S 底部按钮选项卡 -->
        <div class="bottom_btn flex flex_center">
            <a href="javascript:;" class="flex1 text_center f30" @click="tab = 0"><i class="iconfont icon-tedianmianxi mr10" :class="{'c_main' : tab == 0}"></i>今日免单</a>
            <a href="javascript:;" class="flex1 text_center f30 my_free" @click="tab = 1">
                <i class="iconfont icon-wodedianji mr10" :class="{'c_main' : tab == 1}"></i>
                我的免单
                <div class="tips" v-if="tab == 0">
                    有人帮你助力啦
                </div>
            </a>
        </div>
        <!-- E 底部按钮选项卡 -->
        <!-- S 好友助力详情弹窗 -->
        <div class="power_bg" v-show="isDetailShow">
            <div class="power_detail">
                <div class="close" @click="closeDetail">
                    <i class="iconfont icon-guanbi"></i>
                </div>
                <div class="power_title">
                    <span>好友助力详情</span>
                </div>
                <ul>
                    <li class="flex flex_center">
                        <img src="" alt="">
                        <div>
                            <p class="f32">苹果</p>
                            <p class="f22 c_999 mt10">1天前助力</p>
                        </div>
                        <div class="flex1 text_right">
                            <p class="f28">助力成功</p>
                            <p class="f24 c_999 mt15">该用户已下载过同城</p>
                        </div>
                    </li>
                    <li class="flex flex_center">
                        <img src="" alt="">
                        <div>
                            <p class="f32">苹果</p>
                            <p class="f22 c_999 mt10">1天前助力</p>
                        </div>
                        <div class="flex1 text_right">
                            <p class="f28">助力成功</p>
                            <p class="f24 c_999 mt15">该用户已下载过同城</p>
                        </div>
                    </li>
                    <li class="flex flex_center">
                        <img src="" alt="">
                        <div>
                            <p class="f32">苹果</p>
                            <p class="f22 c_999 mt10">1天前助力</p>
                        </div>
                        <div class="flex1 text_right">
                            <p class="f28">助力成功</p>
                            <p class="f24 c_999 mt15">该用户已下载过同城</p>
                        </div>
                    </li>
                    <li class="flex flex_center">
                        <img src="" alt="">
                        <div>
                            <p class="f32">苹果</p>
                            <p class="f22 c_999 mt10">1天前助力</p>
                        </div>
                        <div class="flex1 text_right">
                            <p class="f28 c_main">快提醒他下载APP助力</p>
                            <p class="f24 c_999 mt15">未在APP内微信登录</p>
                        </div>
                    </li>
                    <li class="flex flex_center">
                        <img src="" alt="">
                        <div>
                            <p class="f32">苹果</p>
                            <p class="f22 c_999 mt10">1天前助力</p>
                        </div>
                        <div class="flex1 text_right">
                            <p class="f28">助力成功</p>
                            <p class="f24 c_999 mt15">该用户已下载过同城</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- E 好友助力详情弹窗 -->
    </div>
</template>
<script>
export default {
    data () {
        return {
            tab: 0, //底部按钮切换
            isDetailShow: false, //好友助力详情显示隐藏
        }
    },
    methods: {
        closeDetail () {
            this.isDetailShow = false;
        }
    }
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.c_main{
    color: #dd2726; 
}
.pb80{
    padding-bottom: 0.8rem;
}
.group_ts{
    position: fixed;
    width: 7.5rem;
    left: 50%;
    margin-left: -3.75rem;
    z-index: 2;
    top: 0.9rem;
    .translate(-7.5rem,0);
    .transition(all 0.6s ease);
    opacity: 0;
    &.on{
        .translate(0,0);
        opacity: 1;
    }
}
.group_mes{
    height: 0.65rem;
    .flex();
    .flex_center();
    background: rgba(0,0,0,0.8);
    position: absolute;
    left: 0.3rem;
    top: 0.25rem;
    padding-right: 0.2rem;
    .border-radius(5px);
    img{
        width: 0.5rem;
        height: 0.5rem;
        .border-radius(50%);
        vertical-align: middle;
        margin: 0 0.1rem;
    }
}
.group_bg{
    width: 100%;
    height: 2.8rem;
    background: url('../images/group_bg.png') no-repeat center;
    background-size: cover;
    position: relative;
    .strategy{
        display: block;
        position: absolute;
        right: 0;
        top: 0.22rem;
        width: 1.43rem;
        height: 0.6rem;
        background: #fd6854;
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
        text-align: center;
        line-height: 0.6rem;
    }
}
.group_bg2{
    background: url('../images/group_bg_02.jpg') no-repeat center;
    background-size: cover;
}
.group_list{
    width: 100%;
    .group_item{
        width: 100%;
        .flex();
        .flex_center();
        height: 3.1rem;
        padding: 0.35rem 0;
        border-bottom: 1px solid #e5e5e5;
        &:last-child{
            border: none;
        }
        .group_img{
            width: 2.4rem;
            height: 2.4rem;
            margin-right: 0.2rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .remain_time{
                height: 0.5rem;
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.4);
                text-align: center;
                line-height: 0.5rem;
                color: #fff;
            }
        }
        .group_des{
            width: 4.3rem;
            .flex();
            .flex_column();
            .justify_between();
            height: 100%;
            .group_btn{ //今日免单中单个按钮类名
                display: inline-block;
                width: 1.95rem;
                height: 0.64rem;
                text-align: center;
                line-height: 0.64rem;
                .gradient_v(#fd6954,@color);
                .border-radius(0.3rem);
                color: #fff;
            }
            .detail{ //我的免单列表助力详情按钮类名
                display: inline-block;
                width: 1.55rem;
                height: 0.65rem;
                text-align: center;
                line-height: 0.64rem;
                border: 1px solid @color;
                .border-radius(0.3rem);
                color: #dd2726;
            }
            .group_btn_s{ //我的免单列表继续分享，重新抢按钮类名
                display: inline-block;
                width: 1.55rem;
                height: 0.64rem;
                text-align: center;
                line-height: 0.64rem;
                .gradient_v(#fd6954,@color);
                .border-radius(0.3rem);
                color: #fff;
            }
            .already_empty{ //我的免单列表已抢空按钮类名
                display: inline-block;
                width: 1.55rem;
                height: 0.64rem;
                text-align: center;
                line-height: 0.64rem;
                .border-radius(0.3rem);
                background: #d5d5d5;
                color: #fff;
            }
        }
    }
}
.bottom_btn{
    width: 100%;
    height: 0.8rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    .box_shadow(0 6px 6px rgba(191,191,191,0.75));
    border-top: 1px solid #ebebeb;
    z-index: 5;
    a{
        display: block;
        height: 100%;
        .flex();
        .flex_center();
        .justify_center();
        i{
            color: #d2d2d2;
            font-size: 0.4rem;
        }
    }
    .my_free{
        position: relative;
        .tips{
            position: absolute;
            bottom: 0.7rem;
            right: 0.6rem;
            padding: 0.15rem;
            color: #8e5e00;
            background: #ffda27;
            .border-radius(4px);
            .box_shadow(0 3px 4px rgba(255,218,39,0.36));
            &:after{
                content: "";
                position: absolute;
                bottom: -0.1rem;
				left: 0;
				right: 0;
				margin: 0 auto;
                width:0; 
				height:0; 
				border-left:0.15rem solid transparent;
				border-right:0.15rem solid transparent;
				border-top:0.15rem solid #ffda27;
            }
        }
    }
}
.power_bg{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .power_detail{
        width: 5.8rem;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 2rem;
        .border-radius(5px);
        .close{
            width: 0.64rem;
            height: 0.64rem;
            .border-radius(50%);
            background: #ebebeb;
            text-align: center;
            line-height: 0.64rem;
            position: absolute;
            right: -0.25rem;
            top: -0.35rem;
        }
        .power_title{
            width: 100%;
            line-height: 1.6em;
            font-size: 14px;
            text-align: center;
            border-top: 1px solid #E5E5E5;
            margin-top: 2.4em;
            span{
                position: relative;
                top: -0.9em;
                padding: 0 .55em;
                background-color: #fff;
                color: #666;
                font-size: 0.26rem;
            }
        }
        ul{
            padding: 0 0.4rem 0.6rem 0.2rem;
            max-height: 5.4rem;
            .overflow_scroll;
            li{
                width: 100%;
                height: 1.3rem;
                img{
                    width: 0.9rem;
                    height: 0.9rem;
                    .border-radius(50%);
                    margin-right: 0.2rem;
                }
            }
        }
    }
}

</style>
