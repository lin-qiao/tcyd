<template>
    <div>
        <top :isReturn="false" title='同城  <span class="title_circle">●</span> 我的动态' :right='topBtn' @clickRight="clickRight" :class="{'zIndex': zIndex}"></top>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText="查看更多" :autoFill="false">
            <!-- S 头部个人信息 -->
            <div class="z_dynamic_bg">
                <img :src="avatar | imgUrl" alt="">
                <p class="f30 c_fff mt10">{{nickname}}</p>
            </div>
            <!-- E 头部个人信息 -->
            <div class="z_dynamic" >
                <ul v-if="dynamicList.length">
                    <!-- S 动态列表 -->
                    <li class="clearfix" v-for="el in dynamicList" :key="el.id" >
                        <p class="pull_left f38 c_000">{{el.day}}<span class="f22 c_666">{{el.month}}</span></p>
                        <div class="pull_left z_photo_box">
                            <div class="f26 c_000 mb20">{{el.title}}</div>
                            <!-- S 图片 -->
                            <img-show :imgSrc="el.filePuth" v-if="el.fileType == '1'" width="185" height="185"  @clickImg="imgShow(el.id)" @closeImg="closeImg"></img-show>
                            <!-- E 图片 -->
                            <!-- S 视频 -->
                            <img-show :videoList="el.filePuth?[{prePhoto:el.screenshot,video:el.filePuth}]:[]" v-if="el.fileType == '2'"  @clickImg="imgShow(el.id)" @closeImg="closeImg"></img-show>
                            <!-- E 视频 -->
                            <div class="clearfix z_remark_adver">
                                <img :src="el.skillIcon | imgUrl" alt="" v-show="el.skillIcon">
                                <span class="f22 c_999 ml10"  v-show="el.skillText">{{el.skillText}}</span>
                            </div>
                        </div>
                    </li>
                    <!-- E 动态列表 -->
                </ul>
                <nodata v-else></nodata>
            </div>
        </mt-loadmore>
        <!-- S 删除 弹窗 -->
		<div class="z_bg_black" v-show="isbgShow"  @click.stop="cancelBg">
			<ul>
				<li>保存图片</li>
				<li @click.stop="deleteDynamic">删除</li>
			</ul>
			<ul class="z_cancel">
				<li @click="cancelBg">取消</li>
			</ul>
		</div>
		<!-- E 删除 弹窗 -->
    </div>
</template>
<script>
import imgShow from 'src/components/alert/imgShow'; //图片，视频展示
import {getInfo} from 'src/config/mUtils';
import {
    fetchDynamicList, //获取个人动态
    dynamicDelete, //删除动态
} from '../service/getData';
export default {
    data () {
        return {
            isbgShow: false, //保存图片，删除动态操作展示
            userInfo: {id:this.$route.query.mid || getInfo('id')}, //用户id
            allLoaded:false,//是否全部加载
            avatar: '', //用户头像
            nickname: '', //用户昵称
            dynamicList: [], //个人动态列表
            page: 1, //页数
            size: 10, //每页条数
            topBtn: '<a href="/dynamic"><i class="iconfont icon-xiangji c_main"></i></a>', //顶部按钮
            zIndex: false, //顶部层级
            dynamicId: '', //动态id
        }
    },
    components: {
        imgShow,
    },
    mounted () {
        // this.getDynamicList(); //获取个人动态列表
    },
    activated () {
        this.getDynamicList(); //获取个人动态列表
    },
    methods: {
        cancelBg () {
			this.isbgShow = false;
        },
        //获取个人动态列表
        getDynamicList () {
            let para = {
                mid: this.userInfo.id,
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
        //图片展示头部更换
        imgShow (id) {
            this.topBtn = '<a href="javascript:;"><i class="iconfont icon-msnui-more"></i></a>';
            this.zIndex = true;
            this.dynamicId = id;
        },
        //图片关闭头部更换
        closeImg () {
            this.topBtn = '<a href="/dynamic"><i class="iconfont icon-xiangji c_main"></i></a>';
            this.zIndex = false;
        },
        //保存图片，删除操作显示
        clickRight () {
            if (!this.zIndex) {
                return
            }
            this.isbgShow = true;
        },
        //删除动态
        deleteDynamic () {
            dynamicDelete(this.dynamicId).then(res => {
                if (res.status) {
                    this.isbgShow = false;
                    this.closeImg();
                    this.getDynamicList();
                } else {
                    alertTip(res.msg);
                }
            })
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
.zIndex{
    z-index: 110 !important;
    // position: fixed;
    width: 100%;
    // top: 0;
    // left: 0;
}
.z_dynamic_bg{
    width: 100%;
    height: 2.8rem;
    background: url('~src/module/other/images/dynamic_bg.png') no-repeat center center;
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
                video{
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
.z_photo_detail{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    p{
        padding: 0.5rem 0.3rem 0 0.3rem;
    }
    video{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
    }
    .z_title{
        position: fixed;
        left: 0.3rem;
        top: 0.5rem;
        color: #fff;
        font-size: 0.26rem;
        z-index: 30;
    }
    .z_detail_title{
        padding: 0 0.3rem;
        padding-top: 1.3rem;
        padding-bottom: 0.5rem;
        position: relative;
        z-index: 30;
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
                right: 1.6rem;
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
                right: 0.3rem;
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
    ul{
        width: 100%;
        max-height: 7.5rem;
        li{
            width: 100%;
            max-height: 7.5rem;
            overflow: hidden;
            float: left;
            img{
                width: 100%;
            }
        }
    }
    .z_pagination{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem;
        a{
            display: block;
            width: 0.64rem;
            height: 0.64rem;
            line-height: 0.64rem;
            .border-radius(50%);
            background: rgba(255, 255, 255, 0.5);
            color: #fff;
            text-align: center;
        }
        span{
            text-align: center;
            width: 3rem;
        }
    }
    .z_handler_btn{
        width: 1.55rem;
        height: 4.95rem;
        background: #fff;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 20;
        border-top-left-radius: 0.05rem;
        border-bottom-left-radius: 0.05rem;
        .z_btn{
            width: 100%;
            height: 25%;
            text-align: center;
            font-size: 0.24rem;
            color: @color;
            display: flex;
            flex-direction: column;
            padding-top: 0.2rem;
        }
    }
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
	z-index: 150;
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

