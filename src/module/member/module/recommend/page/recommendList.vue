<template>
    <div class="bg router_page">
        <top title='同城  <span class="title_circle">●</span> 我的技能推荐' :isReturn="false"></top>
        <div v-if="payList.length">
            <div class="skill_recommend" v-if="el.payStatus == 'success'" v-for="el in payList" :key="el.id">
                <router-link :to="'/recommendDetail?id=' + el.id" class="recommend_item flex flex_center">
                    <div class="recommend_img">
                        <img :src="el.icon | imgUrl" alt="">
                    </div>
                    <div class="recommend_des flex1">
                        <p class="f30">{{el.skillCategoryName}} 
                            <!-- <span class="c_main f24"> {{el.levelName}} 
                                <img :src="el.levelImg | imgUrl" style="width:0.3rem;height:0.3rem;vertical-align:middle;">
                            </span> -->
                            <span class="pull_right f26 c_999" :class="{'underWay':el.status == 'underway'}">{{el.payStatus == 'success' ? el.statusCn : el.payStatusCn}}</span>
                        </p>
                        <p class="f24 c_999 mt10">开始时间：{{el.startDate | date}}</p>
                    </div>
                </router-link>
                <div class="recommend_handle clearfix">
                    <p class="pull_left f26">区域推荐：<span class="c_main">{{el.cityName}}—{{el.positionCn}}推荐—￥{{el.price}}/{{el.dayNum}}天</span></p>
                    <router-link :to="'/recommendPay?id='+el.id" class="pull_right" v-if="el.status == 'underway' || el.payStatus !== 'success'">续费</router-link>
                </div>
                <div v-if="el.preStartDate" class="recommend_remark f24"><i class="iconfont icon-iconfontxiaogantanhao mr10 f26"></i>您的技能推荐服务预计于{{el.preStartDate}}开始</div>
            </div>
        </div>
        <div v-else>
            <nodata></nodata>
        </div>
    </div>
</template>
<script>
import {
    fetchPayList //获取推荐位技能列表
} from '../service/getData';
export default {
    data () {
        return {
            payList: [], //技能推荐位列表
        }
    },
    components:{
    },
    mounted () {
        // this.getPayList(); //获取推荐位列表
    },
    activated () {
        this.getPayList(); //获取推荐位列表
    },
    methods: {
        //获取推荐位列表
        getPayList () {
            fetchPayList().then(res => {
                if (res.status) {
                    this.payList = res.data.list||[];
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
    background: @bg_color;
}
.underWay{
    color: #99cc1e !important;
}
.skill_recommend{
    background: #fff;
    margin-bottom: 0.2rem;
    .recommend_item{
        padding: 0.3rem;
        position: relative;
        .recommend_img{
            width: 0.88rem;
            height: 0.88rem;
            text-align: center;
            line-height: 0.88rem;
            margin-right: 0.2rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        &:after{
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #e8e8e8;
            color: #e8e8e8;
            left: 0.3rem;
        }
    }
    .recommend_handle{
        padding: 0.23rem 0.3rem;
        p{
            line-height: 0.54rem;
        }
        a{
            display: inline-block;
            width: 1.43rem;
            height: 0.54rem;
            border: 1px solid @color;
            text-align: center;
            line-height: 0.54rem;
            color: @color;
            .border-radius(0.25rem);
        }
    }
    .recommend_remark{
        color: #f4890d;
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.3rem;
        background: #fff5e5;
    }
}
</style>
