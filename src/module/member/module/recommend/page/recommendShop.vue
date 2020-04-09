<template>
    <div class="clearfix bg">
        <!-- S 顶部按钮 -->
        <div class="z_bg">
			<div class="title border-n">
				<a class="tit_icon pull_left" @click="handleClickLeft">
					<i class="iconfont icon-arrow-left c_fff"></i>
				</a>
                <div class="tit_font c_fff">
                    同城  <span	 class="title_circle c_fff">●</span> 购买推荐
                </div>
                <router-link to="/recommendList" class="tit_icon right">
                    <div class="c_fff">我的推荐</div>
                </router-link>
			</div>
            <div class="card">
                <img src="../../../images/kapian.png" alt="">
            </div>
		</div>
		<!-- E 顶部按钮 -->
        <!-- S 选择推荐类目 -->
        <div class="choose_recommend">
            <h2 class="f32">选择推荐类目</h2>
            <div class="radio_box">
                <form-radio :list="list" v-model="skillId" type="recommend" height="80" :defaultProps="skillObject" class="customCheck"></form-radio>
            </div>
        </div>
        <div class="range">
            <h2 class="pull_left c_666 f30">推荐范围</h2>
            <!-- <span class="pull_right whole f28" @click="recommendWhole">全国</span> -->
            <router-link :to="'/city?id='+skillId+'&position='+position" class="pull_right city f28 mr30 active">{{city}}<i class="iconfont icon-arrow-down"></i></router-link>
        </div>
        <!-- E 选择推荐类目 -->
        <!-- S 首页推荐 分类首页推荐 -->
        <div class="index_recommend">
            <ul class="clearfix">
                <li :class="{'active': position == 'index'}" @click="position = 'index'">首页推荐</li>
                <li :class="{'active': position == 'list'}" @click="position = 'list'">分类首页推荐</li>
            </ul>
            <div class="recommend_radio">
                <form-radio :list="priceList" v-model="priceId" height="100" type="priceList" column="2" :isBadge="true"></form-radio>
            </div>
        </div>
        <!-- E 首页推荐 分类首页推荐 -->
        <!-- S 选择置顶时间 -->
        <div class="choose_recommend mt20 pb0">
            <h2 class="f32">请选择置顶时间</h2>
            <form-date class="ml0" type="datetime" v-model="alStartTime" title="开始时间" placeholder="请选择开始时间" :endDate="new Date(new Date().getTime() + 365*24*3600*1000)"></form-date>
            <form-date class="border-n ml0" v-model="alEndTime" type="datetime" title="结束时间" placeholder="请选择结束时间" :startDate="alStartTime" :endDate="new Date(new Date().getTime() + 365*24*3600*1000)"></form-date>
        </div>
        <!-- E 选择置顶时间 -->
        <!-- S 已选内容 -->
        <div class="already f28">
            <h2 class="c_main">已选内容：</h2>
            <p class="c_666"><span>推荐类目：{{alSkillName}}</span><span style="margin-left:1.2rem;">推荐范围：{{city}}</span></p>
            <p class="c_666">区域推荐：{{alPosition}}推荐  {{alPrice}}</p>
            <p class="c_666">开始时间：{{alStartTime}}</p>
            <p class="c_666">结束时间：{{alEndTime}}</p>
        </div>
        <!-- E 已选内容 -->
        <div class="pay">
            <a class="btn_block" href="javascript:;" @click="skipToPay">立即支付</a>
        </div>
    </div>
</template>
<script>
import formRadio from 'src/components/formItem/formRadio'; //单选组件
import formDate from 'src/components/formItem/formDate'; //日期选择组件
import {
    fetchDefaultList, //付费技能购买默认展示信息
    fetchPriceInfo, //根据上述类目、城市编码查询价格信息
    fetchCreateInfo, //付费技能购买下单支付生成购买记录
} from '../service/getData';
export default {
    data () {
        return {
            list: [], //推荐类目技能列表
            skillObject: {
                id: 'skillSubCategory',
                name: 'skillName'
            },
            city: '', //城市名称
            cityCode: '', //城市编码
            position: 'index', //位置
            skillId: '', //技能类目id
            priceList: [], //单选组件中的价格列表
            originalPriceList: [], //接口返回的原价格列表
            priceId: '', //价格id
            alSkillName: '', //已选类目
            alCity: '', //已选推荐范围
            alPosition: '首页', //已选区域推荐
            alPrice: '', //已选价格
            alStartTime: '', //已选开始时间
            alEndTime: '', //已选结束时间
            price: '', //价格
            num: '', //购买天数
        }
    },
    components: {
        formRadio,
        formDate
    },
    activated () {
        this.getDefaultList(); //获取默认展示信息
    },
    mounted () {
        
    },
    watch: {
        //监听区域推荐信息修改选择
        position: function () {
            this.getPriceInfo(this.cityCode,this.position);
            this.alPosition = this.position == 'index' ? '首页' : '分类首页';
        },
        //监听推荐类目修改选择
        skillId: function () {
            this.getPriceInfo(this.cityCode,this.position);
            let skillName = this.list.filter((v) => v.skillSubCategory == this.skillId);
            this.alSkillName = skillName[0].skillName;
        },
        //监听价格列表修改选择
        priceId: function () {
            let price = this.priceList.filter((v) => v.id == this.priceId);
            let originalPrice = this.originalPriceList.filter((v) => v.id == this.priceId);
            this.alPrice = price[0].name;
            this.price = originalPrice[0].price;
            this.num = originalPrice[0].num;
        }
    },
    methods: {
		//返回按钮
		handleClickLeft(){
            if(this.url){
                this.$router.push(this.url);
            }else{
                this.$router.go(-1);
            }
        },
        //全国推荐
        // recommendWhole () {
        //     this.$alert({
        //         content:'亲，该类目不允许在全国推荐',
        //         confirm:()=>{
        //             console.log(1)
        //         }
        //     })
        // },
        //获取默认展示信息
        getDefaultList () {
            fetchDefaultList().then(res => {
                if (res.status) {
                    this.list = res.data.categoryList;
                    this.skillId = res.data.defaultSkillSubCategory;
                    this.cityCode = res.data.cityCode ? res.data.cityCode : this.cityCode;
                    this.position = res.data.position;
                    this.city = res.data.city;
                    //根据默认信息查询价格信息列表
                    this.getPriceInfo(this.cityCode,this.position);
                }
                if (this.$store.state.city.city) {
                    this.city = this.$store.state.city.city;
                    this.cityCode = this.$store.state.city.cityCode;
                }
            })
        },
        //根据上述类目、城市编码查询价格信息
        getPriceInfo (cityCode,position) {
            fetchPriceInfo(this.skillId,cityCode,position).then(res => {
                if (res.status) {
                    this.priceList = res.data.priceList.map((v,i)=>({id:v.id,name:'￥'+v.price+'/'+v.num+'天'}));
                    this.originalPriceList = res.data.priceList;
                }
            })
        },
        //下单支付生成购买记录
        skipToPay () {
            let para = {
                id: this.priceId,
                submitToken: true,
                startDate: this.alStartTime + ':00',
                endDate: this.alEndTime + ':00'
            }
            fetchCreateInfo(para).then(res => {
                if (res.status) {
                    this.$router.push('/recommendPay?id='+res.data.id);
                }
            })
        }
	}
}
</script>
<style lang="less">
.customCheck{
    .form_check_out{
        .form_btn{
            border-radius: 0;
            background: #f8f8f8;
            border: none;
        }
        .checked{
            background: #feedec;
            border: none !important;
        }
    }
}
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
    background: @bg_color;
    padding-bottom: 1.2rem;
}
.pb0{
    padding-bottom: 0 !important;
}
.ml0{
    margin-left: 0 !important;
}
.confirm_btn{
    color: #333 !important;
    font-size: 0.3rem !important;
}
.z_bg{
	height: 3.63rem;
	width: 100%;
    background-image: url('../../../images/recommend_bg.png');
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
	background-size: cover;
	.title{
        background: transparent;
    }
    .card{
        padding: 0 0.3rem;
        margin-top: 0.2rem;
        img{
            width: 100%;
            height: 2.57rem;
            .box_shadow(0 6px 7px #fde6e7);
        }
    }
}
.choose_recommend{
    padding: 0.4rem 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    h2{
        padding-left: 0.17rem;
        border-left: 4px solid #fe554c;
        font-weight: bold;
    }
    .radio_box{
        padding: 0.4rem 0;
        padding-bottom: 0;
    }
}
.range{
    background: #fff;
    padding: 0 0.3rem;
    height: 1rem;
    h2{
        line-height: 1rem;
    }
    span,a{
        display: inline-block;
        min-width: 1.22rem;
        height: 0.52rem;
        line-height: 0.52rem;
        background: #f0f0f0;
        text-align: center;
        color: #999;
        margin-top: 0.25rem;
        padding: 0 0.1rem;
        .border-radius(0.25rem);
        i{
            font-size: 0.16rem;
        }
    }
    .active{
        background: #feedec;
        color: @color;
    }
}
.index_recommend{
    margin-top: 0.2rem;
    background: #fff;
    ul{
        height: 1rem;
        border-bottom: 1px solid #f3f3f3;
        li{
            width: 50%;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            float: left;
            position: relative;
            font-size: 0.3rem;
            color: #666;
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
    .recommend_radio{
        padding: 0.4rem 0.3rem;
    }
}
.already{
    padding: 0.3rem;
    p{
        margin-top: 0.2rem;
    }
}
.pay{
    width: 100%;
    padding: 0.22rem 0.7rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
}
</style>
