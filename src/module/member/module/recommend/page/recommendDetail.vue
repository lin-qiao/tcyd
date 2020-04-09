<template>
    <div class="bg">
        <top title='同城  <span class="title_circle">●</span> 技能推荐详情' :isReturn="false"></top>
        <div class="skill_recommend">
            <div class="recommend_item flex flex_center">
                <div class="recommend_img">
                    <img :src="info.icon | imgUrl" alt="">
                </div>
                <div class="recommend_des flex1">
                    <p class="f30">{{info.skillCategoryName}}</p>
                    <p class="f24 c_999 mt10">购买时间：{{info.payDate | date}}</p>
                </div>
            </div>
        </div>
        <!-- <div class="people_line f26 c_main">您前方有3位商家正在排队，服务预计于3天后开始</div> -->
        <div class="cell_box">
            <div class="cell_item f28">
                <div class="cell_title c_666">推荐类目</div>
                <div class="cell_des">{{info.skillCategoryName}}</div>
            </div>
            <div class="cell_item f28">
                <div class="cell_title c_666">推荐范围</div>
                <div class="cell_des">{{info.cityName}}</div>
            </div>
            <div class="cell_item f28">
                <div class="cell_title c_666">区域推荐</div>
                <div class="cell_des">{{info.positionCn}}推荐   ￥{{info.price}}/{{info.dayNum}}天</div>
            </div>
            <div class="cell_item f28">
                <div class="cell_title c_666">开始时间</div>
                <div class="cell_des">{{info.addDate | date}}</div>
            </div>
            <div class="cell_item f28">
                <div class="cell_title c_666">结束时间</div>
                <div class="cell_des">{{info.endDate | date}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import {fetchPayDetail} from '../service/getData';
export default {
    data () {
        return {
            info: {}, //详情
            id: '', //购买主键id
        }
    },
    components: {
        
    },
    activated () {
        this.id = this.$route.query.id; //路由获取购买主键id
        this.getRecommendDetail(); //获取技能推荐位详情
    },
    deactivated(){
        this.$destroy();	
    },
    methods: {
        //获取技能推荐位详情
        getRecommendDetail () {
            fetchPayDetail(this.id).then(res => {
                if (res.status) {
                    this.info = res.data.skillRecommendMemberVo;
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
    }
}
.people_line{
    background: #fff;
    height: 0.8rem;
    padding: 0 0.3rem;
    line-height: 0.8rem;
}
.cell_box{
    background: #fff;
    margin-top: 0.2rem;
    .cell_item{
        height: 0.9rem;
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
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
}
</style>
