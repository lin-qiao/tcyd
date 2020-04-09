<template>
    <div class="bg">
        <top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 金币等级' v-if="$store.state.platform=='wx'"></top>
        <!-- S 头部个人信息 -->
        <div class="z_dynamic_bg">
            <img :src="headPhoto | imgUrl" alt="">
            <p class="f30 c_fff mt10">{{nickname}}</p>
            <p class="f30 c_fff mt10">总金币：{{totalIntegral}}</p>
        </div>
        <!-- E 头部个人信息 -->
        <!-- S 金币构成与金币规则选项卡 -->
        <div class="z_gold_tab">
            <ul class="clearfix">
                <li @click="constituteClick"><p class="z_constitute" :class="{active : goldConstitute}">等级金币构成</p></li>
                <li @click="ruleClick"><p :class="{active : goldRule}">等级金币规则</p></li>
            </ul>
        </div>
        <!-- E 金币构成与金币规则选项卡 -->
        <!-- S 金币构成 -->
        <div v-if="goldConstitute === true">
            <div class="z_chart" v-if="baseList.length">
                <h2 class="f28 c_333">{{baseName}}：{{baseIntegral}}分</h2>
                <integral-chart :list="baseList"></integral-chart>
            </div>
            <div class="z_chart mt20" v-if="demandList.length">
                <h2 class="f28 c_333">{{demandName}}：{{demandIntegral}}分</h2>
                <!-- <p class="f28 c_333">金币：{{demandIntegral}}</p> -->
                <integral-chart :list="demandList"></integral-chart>
            </div>
            <div class="z_chart mt20" v-for="el in skillListClassify" :key="el.id">
                <h2 class="f28 c_333">{{el.integralCategoryName}}：{{el.integral}}分</h2>
                <p class="f28 c_333">技能等级：{{el.skillLevel}}</p>
                <!-- <p class="f28 c_333 ptb20">金币：{{skillIntegral}}</p> -->
                <integral-chart :list="el.statisticsList"></integral-chart>
            </div>
        </div>
        <!-- E 金币构成 -->
        <!-- S 金币规则 -->
        <div v-if="goldRule === true">
            <div class="z_rule_tab">
                <ul class="clearfix">
                    <li @click="tabNum = 0" :class="{'active' : tabNum == 0}">金币规则</li>
                    <li @click="tabNum = 1" :class="{'active' : tabNum == 1}">等级规则</li>
                    <li class="border-n" @click="tabNum = 2" :class="{'active' : tabNum == 2}">等级特权</li>
                </ul>
            </div>
            <div class="z_rule_content">
                <!-- S 金币规则 -->
                <ul v-show="tabNum == 0">
                    <li class="clearfix">
                        <span class="pull_left f28 c_666">基本信息</span>
                    </li>
                    <li class="clearfix" v-for="el in baseRuleList" :key="el.id">
                        <span class="pull_left f28 c_666">{{el.integraName}}</span>
                        <span class="pull_right f28 c_333">{{el.integralRemark}}</span>
                    </li>
                </ul>
                <ul class="mt20" v-show="tabNum == 0">
                    <li class="clearfix">
                        <span class="pull_left f28 c_666">需求信息</span>
                    </li>
                    <li class="clearfix" v-for="el in demandRuleList" :key="el.id">
                        <span class="pull_left f28 c_666">{{el.integraName}}</span>
                        <span class="pull_right f28 c_333">{{el.integralRemark}}</span>
                    </li>
                </ul>
                <ul class="mt20" v-show="tabNum == 0">
                    <li class="clearfix">
                        <span class="pull_left f28 c_666">技能信息</span>
                    </li>
                    <li class="clearfix" v-for="el in skillRuleList" :key="el.id">
                        <span class="pull_left f28 c_666">{{el.integraName}}</span>
                        <span class="pull_right f28 c_333">{{el.integralRemark}}</span>
                    </li>
                </ul>
                <!-- E 金币规则 -->
                <!-- S 等级规则 -->
                <ul v-show="tabNum == 1">
                    <rank-rules :list="levelRuleList"></rank-rules>
                </ul>
                <!-- E 等级规则 -->
                <!-- S 等级特权 -->
                <ul v-show="tabNum == 2">
                    <div class="z_level">
                        <img src="~src/module/other/images/z_level.png" alt="">
                        <p class="c_666 f28">等级特权即将开放，敬请期待~</p>
                    </div>
                </ul>
                <!-- E 等级特权 -->
            </div>
        </div>
        <!-- E 金币规则 -->
    </div>
</template>
<script>
import {
    integralRule,
    integralLevel,
    integralInfo
} from '../service/getData';
import integralChart from 'src/module/other/components/integralChart';
import rankRules from 'src/module/other/components/rankRules';
import {getInfo} from 'src/config/mUtils';
export default {
    data () {
        return {
            listPlus: [
                {name: '发布技能',integral: 100},
                {name: '多媒体',integral: 140},
                {name: '技能认证',integral: 0},
                {name: '应邀订单',integral: 700},
                {name: '人气',integral: 1700},
                {name: '好评',integral: 0}
            ],
            badIntegral: {name: '差评',integral: 0},
            goldConstitute: true,
            goldRule: false,
            tabNum: 0,
            totalIntegral: 0, //总计积分
            baseName: '', //基本信息积分名称
            baseIntegral: '', //基本信息积分
            baseList: [], //基本信息列表
            demandName: '', //需求信息名称
            demandIntegral: '', //需求信息积分
            demandList: [], //需求信息列表
            skillName: '', //技能信息名称
            skillIntegral: '', //技能信息积分
            skillList: [], //技能信息列表
            skillLevel: '', //技能等级
            baseRuleList: [], //基本信息规则列表
            demandRuleList: [], //需求信息规则列表
            skillRuleList: [], //技能信息规则列表
            levelRuleList: [], //等级规则列表
            skillListClassify: [], //技能大列表
            userInfo: {
                mid: this.$route.query.mid || getInfo('id')
            },
            nickname: '', //用户昵称
            headPhoto: '', //用户头像
        }
    },
    components: {
        integralChart,
        rankRules
    },
    mounted () {
        
    },
    activated () {
        this.integralInfo();
        this.integralRule();
        this.integralLevel();
    },
    methods: {
        //等级积分构成
        integralInfo () {
            integralInfo(this.userInfo.mid).then(res => {
                if (res.status) {
                    //总积分
                    this.totalIntegral = res.data.totalIntegral;
                    this.nickname = res.data.nickname;
                    this.headPhoto = res.data.headPhoto;
                    //基本信息积分构成
                    this.baseName = res.data.baseInfo.integralCategoryName;
                    this.baseIntegral = res.data.baseInfo.integral;
                    this.baseList = res.data.baseInfo.statisticsList;
                    //需求信息积分构成
                    this.demandName = res.data.demandInfo.integralCategoryName;
                    this.demandIntegral = res.data.demandInfo.integral;
                    this.demandList = res.data.demandInfo.statisticsList;
                    //技能信息积分构成
                    this.skillListClassify = res.data.skillInfoList;
                }
            })
        },
        //积分规则
        integralRule () {
            integralRule().then(res => {
                if (res.status) {
                    this.baseRuleList = res.data.base;
                    this.demandRuleList = res.data.demand;
                    this.skillRuleList = res.data.skill;
                }
            })
        },
        //等级规则
        integralLevel () {
            integralLevel().then(res => {
                if (res.status) {
                    this.levelRuleList = res.data.list;
                }
            })
        },
        //等级金币构成选项卡点击
        constituteClick () {
            this.goldConstitute = true;
            this.goldRule = false;
        },
        //等级金币规则选项卡点击
        ruleClick () {
            this.goldRule = true;
            this.goldConstitute = false;
        }
    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
	background: @bg_color;
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
        margin-top: 0.26rem;
    }
}
.z_gold_tab{
    width: 100%;
    height: 0.9rem;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    ul{
        li{
            width: 50%;
            height: 100%;
            float: left;
            p{
                font-size: 0.28rem;
                text-align: center;
                line-height: 0.9rem;
                position: relative;
            }
            .z_constitute{
                &:after{
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto 0;
                    height: 0.3rem;
                    width: 1px;
                    background: #e8e8e8;
                }
            }
            .active{
                color: @color;
            }
        }
    }
}
.z_chart{
    padding: 0.3rem;
    background: #fff;
    h2{
        padding-left: 0.2rem;
        border-left: 0.05rem solid #fd6553;
        margin-bottom: 0.2rem;
    }
    p{
        padding-left: 0.25rem;
        padding-bottom: 0.2rem;
        i{
            font-size: 0.3rem;
            color: #eeeeee;
        }
        .active{
            color: #fe5e50;
        }
    }
}
.z_rule_tab{
    padding: 0.2rem 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    ul{
        border: 1px solid #e8e8e8;
        border-radius: 0.04rem;
        overflow: hidden;
        background: #fff;
        li{
            float: left;
            width: 33.33%;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            border-right: 1px solid #e8e8e8;
            color: #666;
            font-size: 0.24rem;
        }
        .active{
            background: @color;
            color: #fff;
        }
    }
}
.z_rule_content{
    ul{
        background: #fff;
        padding-left: 0.3rem;
        li{
            width: 100%;
            height: 0.9rem;
            border-bottom: 1px solid #e8e8e8;
            line-height: 0.9rem;
            padding-right: 0.3rem;
        }
        .z_level{
            text-align: center;
            padding-top: 1.18rem;
            img{
                width: 2.3rem;
                height: 2.05rem;
            }
            p{
                padding-top: 0.3rem;
            }
        }
    }
}
</style>
