<template lang="html">
    <div class="demand_success">
        <div class="times" @click="routerDemandDetail(true)"><em class="c_main">{{times}}s</em> 跳过</div>
        <p class="f46 c_666 text_center">{{name}}需求发布成功</p>
        <p class="f30 c_666 text_center mt20">已为您通知{{serviceCount}}位服务者</p>
        <div class="demand_searching">
            <div class="demand_searching_bg1"></div>
            <div class="demand_searching_bg2"></div>
            <div class="demand_searching_bg3"></div>
            <div class="demand_success_box" v-if="xyArr.length">
                <div class="demand_success_item" v-for="(el,i) in list" :style="{top:xyArr[i].y / 100 + 'rem',left:xyArr[i].x / 100 + 'rem'}">
                    <img :src="el.headPhoto | imgUrl" alt="">
                    <p class="c_main mt10"><i class="iconfont icon-dizhi">{{el.distance}}km</i></p>
                </div>
            </div>
        </div>
        <router-link class="btn_border" :to="{path:'/demandDetail',query:{requireId}}" replace>查看全部应邀</router-link>
        <div class=""></div>
        <div class="skill_wrap plr30">
            <div class="skill_tit"><span>您还可能需要的技能</span></div>
            <ul class="skill_list">
                <li class="skill_item" v-for="(el,i) in skillList" v-if="i < 5" @click="toPostDemand(el.skillSubCategoryId,el.skillCategoryId)">
                    <img :src="el.skillCategoryIcon | imgUrl" alt="">
                    <p>{{el.skillCategoryName}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    fetchGetinvitemember  //附近的人列表
} from '../service/getData'
import {
    fetchHotSkillList  //热门技能
} from 'src/service/getData'
export default {
	data(){
		return{
            name:'',  //技能名称
            requireId:0, //需求id
			times:60,//60秒后  自动跳转到  需求管理
            R:345,   //圆的半径
            maxR:270, //最大半径
            minR:80, //最小半径
            maxK:10, //最大距离
            xyArr:[], //坐标数组
            list:[],  //附近的人列表
            serviceCount:0, //服务者数量
            t:'', //定时器
            skillList:[],  //技能列表
            setTime:"",//定时器
		}
	},
    mounted(){
        this.getHotSkillList();
    },
    beforeRouteLeave(to,from,next){
    	clearTimeout(this.setTime);
    	next();
    },
    activated(){
        if(this.$route.query.requireId){
            this.requireId = this.$route.query.requireId;
            this.getList();
            this.setTime=setTimeout(function(){
            	this.getList();
            },5000);
        }
        if(this.$route.query.name){
            this.name = this.$route.query.name;
        }
        //清除定时器
        clearInterval(this.t);
        this.times = 60;

        this.routerDemandDetail();
    },
    methods:{
    	//去发布需求页面
    	toPostDemand(id,subId){
    		this.$router.replace('/demandPublish?skillCategory='+id+'&skillSubCategory='+subId);
    	},
        //获取热门技能列表
        getHotSkillList(){
            fetchHotSkillList().then(res => {
                if(res && res.data){
                    this.skillList = res.data.hotList || [];
                }
            })
        },
        //跳过动效
        routerDemandDetail(immediately){//跳转到 需求详情页面   immediately 为true 立即跳转
        	if(immediately){ //
        		this.$router.replace('/demandManage')
        		return;
        	}
            this.t = setInterval(()=>{
                this.times --
                if(this.times <= 0){
                    this.$router.replace('/demandManage')
                    clearInterval(this.t)
                }
            },1000)
        },
        //获取附近的人列表
        getList(){
            fetchGetinvitemember(this.requireId).then(res => {
                if(res.data.list.length){
                    this.list = res.data.list;
                    this.serviceCount = res.data.serviceCount;
                    // 取距离最大值
                    this.maxK = Math.max.apply(Math, this.list.map(v => parseFloat(v.distance))) || 0.1;
                    // 循环随机获取位置
                    this.xyArr = this.list.map(v=>this.getRadius(v.distance))
                }
            })
        },
        // 根据k计算半径
        getRadius(k){
        	k = parseFloat(k);
            let r = k / this.maxK * (this.maxR - this.minR) + this.minR;
            return this.getCoordinate(r);
        },
        // 获取一个坐标，k为距离
        getCoordinate(r){
        	r = parseFloat(r)||0;
            let angle = Math.random() * 360;   //随机生成 0 - 360 之间的角度
            let hudu = (2 * Math.PI / 360) * angle;
            let x = Math.sin(hudu) * r + r;
            let y = Math.cos(hudu) * r + r;
            x = this.R - r + x;
            y = this.R - r + y;

            //去除重叠
            for(let i = 0; i < this.xyArr.length; i++){
                if(this.xyArr[i].x < x + 110 && this.xyArr[i].x > x - 110 && this.xyArr[i].y < y + 126 && this.xyArr[i].y > y - 126){
                    return this.getCoordinate(r);
                }
            }
            return {x,y}
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.demand_success{
    padding-top: .88rem;
    text-align: center;
}
.center{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.times{
    padding: 0 .25rem;
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    border-radius: .22rem;
    background: #b2b2b2;
    color: #fff;
    position: absolute;
    top:.2rem;
    right: .3rem;
    font-size: .26rem;
}
@keyframes rotate {
    0%{
        transform: rotate(0)
    }
    100%{
        transform: rotate(360deg);
    }
}
.demand_searching{
    width: 6.9rem;
    height: 6.9rem;
    margin: .1rem auto 0;
    position: relative;
    .demand_searching_bg1{
        width: 6.18rem;
        height: 6.18rem;
        background: url(~src/images/searching_bg1.png) no-repeat;
        background-size: cover;
        .center;
    }
    .demand_searching_bg2{
        width: 4.92rem;
        height: 4.92rem;
        background: url(~src/images/searching_bg2.png) no-repeat;
        background-size: cover;
        .center;
    }
    .demand_searching_bg3{
        width:3.7rem;
        height:3.7rem;
        background: url(~src/images/searching_bg3.png) no-repeat;
        background-size: cover;
        .center;
        animation: rotate 5s linear infinite;
    }
    .demand_success_box{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
    }
    .demand_success_item{
        width: 1.1rem;
        height: 1.26rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        transform: translate(-50%,-50%);
        img{
            width: .85rem;
            height: .85rem;
            border-radius: 50%;
            display: block;
        }
        i{
            font-size: inherit
        }
    }
}
.skill_tit{
    display: flex;
    justify-content: center;
    height: 1rem;
    line-height: 1rem;
    padding: 0 .1rem;
    margin-top: .2rem;
    position: relative;
    span{
        height: 1rem;
        background: #fff;
        padding: 0 .2rem;
        .f28;
        .c_666;
        position: relative;
        z-index: 1;
    }
    &::after{
        content: '';
        position: absolute;
        top:0;
        bottom: 0;
        height: 1px;
        width: 100%;
        margin: auto;
        background: @line_color;
    }
}
.skill_list{
    display: flex;
    .skill_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;
    }
    img{
        display: block;
        width: .88rem;
        height: .88rem;
    }
    p{
        font-size: .26rem;
        margin-top: .2rem;
    }
}
</style>
