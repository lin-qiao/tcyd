<template>
    <div>
        <top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 个人动态'></top>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
            <!-- S 头部个人信息 -->
            <div class="z_dynamic_bg">
                <img :src="avatar | imgUrl" alt="">
                <p class="f30 c_fff mt10">{{nickname}}</p>
            </div>
            <!-- E 头部个人信息 -->
            <div class="z_dynamic">
                <ul v-if="dynamicList.length">
                    <!-- S 动态列表 -->
                    <li class="clearfix" v-for="el in dynamicList" :key="el.id" >
                        <p class="pull_left f38 c_000">{{el.day}}<span class="f22 c_666">{{el.month}}</span></p>
                        <div class="pull_left z_photo_box">
                            <div class="f26 c_000 mb20">{{el.title}}</div>
                            <!-- S 图片 -->
                            <img-show :imgSrc="el.filePuth" v-if="el.fileType == '1'" width="185" height="185" @clickImg="imgShow(el.title,el.skillSubCategory)" @closeImg="closeImg"></img-show>
                            <!-- E 图片 -->
                            <!-- S 视频 -->
                            <img-show :videoList="el.filePuth?[{prePhoto:el.screenshot,video:el.filePuth}]:[]" v-if="el.fileType == '2'" @clickImg="imgShow(el.title)" @closeImg="closeImg"></img-show>
                            <!-- E 视频 -->
                            <div class="clearfix z_remark_adver">
                                <img :src="el.skillIcon | imgUrl" alt="" v-show="el.skillIcon">
                                <span class="f22 c_999 ml10">{{el.skillText}}</span>
                            </div>
                        </div>
                    </li>
                    <!-- E 动态列表 -->
                </ul>
                <nodata v-else></nodata>
            </div>
        </mt-loadmore>
        <!-- S 底部按钮 -->
		<div class="z_footer_btn">
			<handler :skillId="memberSkillId" :mid="mid" :isRemind="isOnlineNotice == 'Y'" @changeNotice="isOnlineNotice='Y'"></handler>
		</div>
		<!-- E 底部按钮 -->
        <!-- S 图片展示侧边按钮 -->
        <div class="z_right_btn" v-show="isRightShow">
            <handler :isDynamic="true" :skillId="skillSubId" :mid="mid" :isRemind="isOnlineNotice == 'Y'" @changeNotice="isOnlineNotice='Y'"></handler>
        </div>
        <!-- <div class="z_detail_title clearfix" v-show="isRightShow">
            <span class="pull_left">个人写真</span>
            <span class="pull_right z_share"><i class="iconfont icon-fenxiang1"></i></span>
            <div class="z_redpacket">
                <img src="../images/z_redpacket.png" alt="">
                <div class="z_packet">分享得红包</div>
            </div>
        </div> -->
        <div class="f26 c_fff dynamic_content ellipsis_clip" v-if="isRightShow">{{imgShowTitle}}</div>
        <!-- E 图片展示侧边按钮 -->
    </div>
</template>
<script>
import imgShow from 'src/components/alert/imgShow'; //图片视频展示
import handler from 'src/module/index/components/handler'; //底部按钮
import {
    fetchOnlineNotice, //上线提醒
    fetchDynamicList, //获取个人动态
} from '../service/getData';
export default {
    data () {
        return {
            allLoaded:false,//是否全部加载
            avatar: '', //用户头像
            nickname: '', //用户昵称
            dynamicList: [], //个人动态列表
            mid: '', //当前用户id
            page: 1, //页数
            size: 10, //每页条数
            memberSkillId: '', //当前用户技能id
            isOnlineNotice: '', //是否已提醒上线
            isRightShow: false, //图片展示右侧按钮展示隐藏
            imgShowTitle: '', //图片展示时的动态内容
            skillSubId: '', //二级技能id
        }
    },
    components: {
        imgShow,
        handler
    },
    activated () {
        this.mid = this.$route.query.mid; //获取用户id
        this.isOnlineNotice = this.$route.query.notice; //获取用户是否已提醒
        this.memberSkillId = this.$route.query.skillId; //获取技能id
        this.getDynamicList(); //获取个人动态列表
    },
    mounted () {
    },
    methods: {
        //获取个人动态列表
        getDynamicList () {
            let para = {
                mid:this.mid,
                page: this.page,
                size: this.size
            };
            fetchDynamicList(para).then(res => {
                if (res.status) {
                    this.avatar = res.data.img;
                    this.nickname = res.data.nickname;
                    if (this.page == 1) {
                        this.dynamicList = res.data.list || [];
                    } else {
                        this.dynamicList = this.dynamicList.concat(res.data.list || []);
                        this.$refs.loadmore.onBottomLoaded();
                    }
                    if (res.data.list && res.data.list.length == this.size) {
                        this.allLoaded = false;
                    } else {
                        this.allLoaded = true;
                    }
                } else {
                    this.allLoaded = true;
                }
            })
        },
        //上拉
        loadTop(){
            this.page = 1;
            this.getDynamicList();
            this.$refs.loadmore.onTopLoaded();
        },
        //下拉
        loadBottom(){
            this.page += 1;
            this.getDynamicList();
        },
        //图片，视频展示
        imgShow (title,skillId) {
            this.isRightShow = true;
            this.imgShowTitle = title;
            this.skillSubId = skillId;
        },
        //图片，视频隐藏
        closeImg () {
            this.isRightShow = false;
        }
    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.pt100{
    padding-top: 1rem;
}
.pb110{
    padding-bottom: 1.1rem;
}
.z_dynamic_bg{
    width: 100%;
    height: 2.8rem;
    background: url('../images/dynamic_bg.png') no-repeat center center;
    background-size: cover;
    text-align: center;
    img{
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 50%;
        margin-top: 0.45rem;
    }
}
.z_dynamic{
    background: #fff;
    ul{
        width: 100%;
        padding: 0.3rem 0 0.52rem 0;
        li{
            width: 100%;
            padding: 0.3rem;
            border-bottom: 1px solid #e8e8e8;
            p{
                width: 1.13rem;
            }
            .z_video_img{
                position: relative;
                width: 1.85rem;
                overflow: hidden;
                img{
                    width: 100%;
                }
                .z_video_play{
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto auto;
                    width: 0.75rem;
                    height: 0.75rem;
                    i{
                        line-height: 0.75rem;
                        text-align: center;
                    }
                }
            }
            .z_photo_box{
                width: 5.75rem;
                .z_photo_img{
                    .z_photo{
                        float: left;
                        width: 1.85rem;
                        height: 1.85rem;
                        margin-right: 0.1rem;
                        margin-bottom: 0.1rem;
                    }
                }
            }
            .z_remark_adver{
                display: flex;
                align-items: center;
                margin-top: 0.2rem;
                img{
                    width: 0.32rem;
                    height: 0.32rem;
                }
            }
        }
    }
}
.z_detail_title{
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 0.3rem;
    position: fixed;
    left: 0;
    top: 0.5rem;
    z-index: 101;
    span{
        color: #fff;
        line-height: 0.76rem;
    }
    .z_share{
        display: block;
        width: 0.76rem;
        height: 0.76rem;
        .border-radius(50%);
        background-color: rgba(255, 77, 83, 0.7);
        text-align: center;
        line-height: 0.76rem;
        color: #fff;
    }
    .z_redpacket{
        img{
            width: 0.67rem;
            height: 0.67rem;
            position: absolute;
            right: 2.4rem;
            z-index: 30;
            bottom: 1.33rem;
        }
        .z_packet{
            width: 1.8rem;
            height: 0.48rem;
            background: #fe7767;
            color: #fff;
            position: absolute;
            bottom: 1.33rem;
            right: 1rem;
            .border-radius(0.24rem);
            line-height: 0.48rem;
            text-align: right;
            padding-right: 0.14rem;
            font-size: 0.22rem;
            &:after{
                content: "";
                position: absolute;
                bottom: -0.08rem;
                right: 0.2rem;
                width: 0;
                height: 0;
                border-left: 0.1rem solid transparent;
                border-right: 0.1rem solid transparent;
                border-top: 0.1rem solid #fe7767;
            }
        }
    }
}
.dynamic_content{
    position: fixed;
    padding: 0 0.3rem;
    width: 100%;
    left: 0;
    bottom: 1rem;
    z-index: 101;
}
.z_footer_btn{
	position: fixed;
	width: 7.5rem;
	bottom: 0;
	left: 50%;
	margin-left: -3.75rem;
	background: #fff;
	z-index: 50;
}
.z_right_btn{
	width: 7.5rem;
	margin-left: -3.75rem;
	left: 50%;
    position: fixed;
    right: 0;
    top: 50%;
    margin-top: -2.4rem;
    background: #fff;
    z-index: 101;
}
</style>

