<template lang="html">
    <div>
        <div class="fixed">
			<a href="javascript:void(0);" @click="downLoadApp"></a>
		</div>
        <div class="bg bg_1"></div>
        <div class="banner">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../images/service_bg_2.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../images/service_bg_2.jpg" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="info">
            <img :src="headPhoto | imgUrl" alt="">
            <div class="info_con flex1">
                <p class="flex justify_between flex_center">
                    <span class="f32">{{nickName}}</span>
                    <span class="f24 c_999">ID  {{mid}}</span>
                </p>
                <p class="mt20 f24 c_999">{{address}}</p>
            </div>
        </div>
        <div class="skill">
            <p class="f28 ptb20">TA发布的技能</p>
            <div class="skill_list" id="skillList">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide skill_item" :class="{'cur':skillInfo.skillId == el.skillId}" v-for="el in memberSkillList" @click="skillInfo = el">
                        <img :src="el.categoryImg | imgUrl" alt="">
                        <p><span>{{el.skillName}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="skill_info">
                <div class="skill_tab">
                    <p class="name">服务方式</p>
                    <p class="con flex flex_column">
                        <span v-for="el in skillInfo.serviceModeList">{{el.serviceType}} {{el.price}}元/小时</span>
                    </p>
                </div>
                <div class="skill_tab">
                    <p class="name">技能介绍</p>
                    <p class="con">{{skillInfo.serviceIntroduced}}</p>
                </div>
            </div>
        </div>
        <div class="bg bg_3"></div>
        <div class="bg bg_4"></div>
        <div class="bg bg_5"></div>
        <div class="bg bg_6"></div>
        <div class="bg bg_7"></div>
        <div class="bg bg_8"></div>
        <div class="bg bg_9"></div>
        <div class="bg bg_10"></div>
        <div class="bg bg_11"></div>
        <div class="bg bg_12"></div>
        <div class="btn_block" @click="visible = true">领取同城约单红包</div>
        <div class="redpacket" v-if="visible">
            <div class="redpacket_box">
                <formWrap class="plr30"></formWrap>
                <div class="redpacket_close" @click="visible = false"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    fetchGetSkillList //用户技能列表
} from '../service/getData';
import formWrap from '../components/form';
import {appDownLoad} from 'src/config/mUtils'; //app下载方法
export default {
    data(){
        return{
            visible:false, //弹窗隐藏显示
            mid:'',  //用户id
            headPhoto:"", //用户头像
            nickName:"",//用户昵称
            address:"",//用户地址
            memberSkillList:[], //用户技能列表
            skillInfo:{},   //技能详情
        }
    },
    mounted(){
        new Swiper ('.banner', {
            loop: true,
            autoplay: 2000,
            pagination : '.swiper-pagination',
        })

        //顶部导航
        new Swiper('#skillList', {
            freeMode: true,
            // freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto'
        });
    },
    activated(){
        if(this.$route.query.mid){//用户id
            this.mid = this.$route.query.mid;
        }
        if(this.$route.query.headPhoto){//用户头像
            this.headPhoto = this.$route.query.headPhoto;
        }
        if(this.$route.query.nickName){//用户昵称
            this.nickName = this.$route.query.nickName;
        }
        if(this.$route.query.address){//用户地址
            this.address = this.$route.query.address;
        }
        this.getMemberSkillList();
    },
    methods:{
    	//下载
		downLoadApp () {
			appDownLoad();
		},
        //获取用户技能列表
        getMemberSkillList(){
            fetchGetSkillList(this.mid).then(res => {
                if(res.status && res.data.list.length){
                    this.memberSkillList = res.data.list;
                    this.skillInfo = this.memberSkillList[0];
                }
            })
        }
    },
    components:{
        formWrap
    }
}
</script>

<style lang="less">
.banner{
    .swiper-pagination-bullet{
        width: .2rem;
        height: .2rem;
        background: #fff;
        opacity: .2;
    }
    .swiper-pagination-bullet-active{
        opacity: 1;
    }
}
</style>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';

.fixed{
	width: 7.5rem;
	height: .97rem;
	background: url(../images/top_fixed.jpg) no-repeat;
	background-size: cover;
	position: fixed;
	top:0;
	left: 50%;
	margin-left: -3.75rem;
	z-index: 2;
	a{
		display: block;
		width: 1.95rem;
		height: .63rem;
		position: absolute;
		top:0;
		bottom: 0;
		right: .35rem;
		margin: auto;
	}
}
.redpacket{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
    z-index: 13;
    .redpacket_box{
        width: 6.35rem;
        height: 7.24rem;
        background: url('../images/redpacket_bg.png') no-repeat;
        background-size: cover;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        padding-top: 2.55rem;
    }
    .redpacket_close{
        width: .54rem;
        height: .54rem;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}
.bg{
    background-repeat: no-repeat;
    background-size: cover;
    margin-top:-1px;
}
.bg_1{
    height: 1.31rem;
    background-image: url(../images/service_bg_1.jpg);
    margin-top: .97rem;
}
.bg_3{
    height: 4.81rem;
    background-image: url(../images/service_bg_3.jpg);
}
.bg_4{
    height: 4.82rem;
    background-image: url(../images/service_bg_4.jpg);
}
.bg_5{
    height: 4.81rem;
    background-image: url(../images/service_bg_5.jpg);
}
.bg_6{
    height: 4.82rem;
    background-image: url(../images/service_bg_6.jpg);
}
.bg_7{
    height: 4.81rem;
    background-image: url(../images/service_bg_7.jpg);
}
.bg_8{
    height: 4.81rem;
    background-image: url(../images/service_bg_8.jpg);
}
.bg_9{
    height: 4.82rem;
    background-image: url(../images/service_bg_9.jpg);
}
.bg_10{
    height: 4.81rem;
    background-image: url(../images/service_bg_10.jpg);
}
.bg_11{
    height: 4.82rem;
    background-image: url(../images/service_bg_11.jpg);
}
.bg_12{
    height: 4.81rem;
    background-image: url(../images/service_bg_12.jpg);
}
.banner{
    width: 100%;
    height: 5rem;
    position: relative;
    overflow: hidden;
    img{
        height: 5rem;
    }
}
.info{
    display: flex;
    position: relative;
    height: 1.2rem;
    padding: 0 .3rem;
    z-index: 1;
    img{
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        .border(#fff);
        margin-top: -.4rem;
    }
    .info_con{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: .25rem;
    }
}
.skill{
    .plr30;
    padding-bottom: .5rem;
    border-bottom: .2rem solid @bg_color;
    .skill_item{
        width: 1.38rem;
        height: 1.2rem;
        text-align: center;
        position: relative;
        img{
            display: block;
            width: .5rem;
            height: .5rem;
            margin: 0 auto;
        }
        p{
            margin-top: .2rem;
            font-size: .24rem;
            color: #666;
            position: relative;
            span{
                display: inline-block;
                position: relative;
            }
        }
        &.cur{
            span{
                &::before{
                    content: '';
                    display: block;
                    border-width: .1rem;
                    position: absolute;
                    bottom: -.28rem;
                    left: 50%;
                    margin-left: -.1rem;
                    border-style: solid dashed dashed  dashed;
                    border-color:  @color  transparent transparent transparent;
                    font-size: 0;
                    line-height: 0;
                }
                &::after{
                    content: '';
                    display: block;
                    width: 100%;
                    height: 2px;
                    position: absolute;
                    bottom: -.1rem;
                    left:0;
                    background: @color;
                }
            }
        }
    }
    .skill_info{
        // padding: 0 .3rem;
        .skill_tab{
            display: flex;
            font-size: .28rem;
            border-bottom: 1px solid @border_color;
            padding: .25rem 0;
            &:last-child{
                border-bottom: none;
            }
            .name{
                width: 1.6rem;
                color: #666;
            }
            .con{
                width: 100%;
                line-height:.4rem;
                flex:1;
            }
        }
    }
}
.btn_block{
    border-radius: 0;
    width: 100%;
    background: #fd4e5a;
}
</style>
