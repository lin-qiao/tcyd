<template>
    <div>
        <div class="z_skill_info">
            <div class="z_info_box" v-if="isVideo">
                <h2 class="f28">视频介绍（建议在WIFI环境下观看）</h2>
                <div class="z_video">
                    <img src="http://img01.dadetong.com/upload/avatar/50137_avatar_big.jpg" alt="">
                    <div class="z_video_play"><i class="iconfont icon-bofang c_fff f70"></i></div>
                </div>
            </div>
            <div class="z_info_box pt0" v-if="!isVideo">
                <a href="javascript:;">
                    <span class="c_666 f28">未发布视频介绍</span>
                    <span class="pull_right go_publish">去发布</span>
                </a>
            </div>
            <div class="z_info_box">
                <h2 class="f28">技能相册</h2>
                <ul class="clearfix">
                    <li>
                        <img src="http://img01.dadetong.com/upload/avatar/50137_avatar_big.jpg" alt="">
                    </li>
                    <li>
                        <img src="http://img01.dadetong.com/upload/avatar/50137_avatar_big.jpg" alt="">
                    </li>
                    <li class="mr0">
                        <img src="http://img01.dadetong.com/upload/avatar/50137_avatar_big.jpg" alt="">
                    </li>
                </ul>
            </div>
            <div class="z_info_box">
                <a href="javascript:;">
                    <span class="c_666 f28">语音介绍</span>
                    <item-audio class="mb30 pull_right"></item-audio>
                </a>
            </div>
            <div class="z_info_box">
                <a href="javascript:;">
                    <span class="c_666 f28">技能等级</span>
                    <p class="pull_right c_666 f28">初级1<i class="f40 iconfont icon-pingfen"></i></p>
                </a>
            </div>
            <div class="z_info_box">
                <a href="javascript:;">
                    <span class="c_666 f28">服务方式</span>
                    <p class="pull_right c_333 f28 ellipsis">线下服务、电话咨询、视频咨询、线上服务</p>
                </a>
            </div>
            <div class="z_info_box z_skill_introduce">
                <span class="c_666 f28">技能介绍</span>
                <p class="pull_right c_333 f26 pb30 ellipsis_clip3">用户满意度是我们做事的首要信条！对于专业化解决方案来说，没有比用户体验糟糕、程序无法正常运行或内容无法更新更糟的了。</p>
            </div>
        </div>
    </div>
</template>
<script>
import itemAudio from 'src/components/item/itemAudio'
export default {
    data () {
        return {

        }
    },
    components:{
        itemAudio
    },
    props: {
        isVideo: {
            type: Boolean,
            default: false
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.z_skill_info{
    padding: 0.3rem;
    background: #fff;
    .z_info_box{
        padding-top: 0.3rem;
        h2{
            padding-bottom: 0.3rem;
        }
        .z_video{
            width: 100%;
            height: 3.15rem;
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
            i{
                color: #fe544c;
                margin-left: 0.1rem;
            }
            .go_publish{
                width: 1.78rem;
                height: 0.64rem;
                line-height: 0.64rem;
                color: #fff;
                .gradient_v(#fd6a55,#ff4a48);
                .border-radius(0.3rem);
                text-align: center;
                margin-top: 0.13rem;
            }
        }
    }
    .z_skill_introduce{
        height: 1.75rem;
        p{
            line-height: 1.5;
            height: 100%;
        }
    }
}
</style>
