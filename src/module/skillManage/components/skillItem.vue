<template lang="html">
    <li class="l_skill_item">
        <div @click.stop="$router.push('/skillDetail?skillId=' + data.skillId)">
            <item-skill
                :showCreateTime="true"
                :skillInfo="{
                    name:data.skillName,
                    grade:data.integralGrade,
                    imgIcon:data.skillImg,
                    addDate:data.addDate,
                    }">
            </item-skill>
            <div class="l_skill_status text_right">
                <!--审核中-->
                <template v-if="data.auditStatus == '审核中'">
                    <p class="c_main f26">审核中</p>
                </template>
                <!--已驳回-->
                <template v-else-if="data.auditStatus == '已驳回'">
                    <p class="c_main f26">已驳回</p>
                    <p class="f24 c_blue" @click.stop="skillUrl">技能审核规范</p>
                </template>
                <!--待完善-->
                <template v-else-if="data.auditStatus == '待完善'">
                    <p class="c_666 f26">待完善</p>
                </template>
                <!--审核通过-->
                <template v-else>
                    <p class="c_green f26">审核通过</p>
                    <p class="f24 c_666">已完成{{data.orderNum}}次应邀</p>
                </template>
            </div>
            <div class="plr30 f26 l_skill_mess mt-12">
                <ul class="clearfix">
                    <li v-for="v in data.serviceModeList" >{{v.serviceType}}: {{v.price}}元/{{v.unit}}</li>
                </ul>
               <!-- <p class="c_main">保证金：{{data.depositMoney}}元</p>-->
            </div>
        </div>
        <div class="l_skill_handle pr30 flex flex_center justify_between">
            <div class="flex flex_center">
                <formSwitch v-model="openFlag" @change="updateSkillOpenflag"></formSwitch>
                <p class="f24 c_666 ml20">已{{openFlag?'开启':'关闭'}}应邀</p>
            </div>
            <!--审核中/已驳回-->
            <div v-if="['审核中','已驳回'].indexOf(data.auditStatus) != -1">
                <router-link class="btn_border" :to="{ path: '/perfectMsg', query: {skillId:data.skillId} }">修改</router-link>
            </div>
            <!--待完善-->
            <div v-else-if="data.auditStatus == '待完善'">
                <router-link class="btn_border" :to="{ path: '/perfectMsg', query: {skillId:data.skillId} }">完善</router-link>
                <!-- <router-link class="ml20 btn_border" :to="{ path: '/myDeposit', query: {skillId:data.skillId} }">支付保证金</router-link> -->
            </div>
            <!--审核通过-->
            <div v-else>
                <router-link class="btn_border" :to="{ path: '/perfectMsg', query: {skillId:data.skillId} }">编辑</router-link>
            </div>
        </div>
        <!--已驳回-->
        <div class="l_fail_tip flex flex_center f24 plr30" v-if="data.auditStatus == '已驳回'">
            <i class="iconfont icon-iconfontxiaogantanhao f30 mr5"></i>{{data.auditRemark}}
        </div>
        <!--待完善-->
        <div class="l_toCom_tip flex flex_center f24 plr30" v-else-if="data.auditStatus == '待完善'">
            <i class="iconfont icon-iconfontxiaogantanhao f30 mr5"></i>完善你的技能开始接单赚钱吧~
        </div>
        <!--其他-->
        <div class="line_box" v-else></div>
    </li>
</template>

<script>
import itemSkill from 'src/components/item/itemSkill';
import formSwitch from 'src/components/formItem/formSwitch';
import {
    fetchUpdateSkillOpenflag, //修改技能是否开启应邀接口
} from '../service/getData';
export default {
    data(){
        return{
            openFlag:false, //应邀
        }
    },
    props:{
        data:{
            type:Object
        }
    },
    mounted(){
        if(this.data.openFlag){
            this.openFlag = this.data.openFlag == 'Y'? true :false;
        }
    },
    activated(){
        if(this.data.openFlag){
            this.openFlag = this.data.openFlag == 'Y'? true :false;
        }
    },
    components:{
        itemSkill,
        formSwitch
    },
    methods:{
        // 修改技能是否开启应邀接口
        updateSkillOpenflag(openFlag){
            openFlag = openFlag ? 'Y' : 'N';
            fetchUpdateSkillOpenflag(this.data.skillId,openFlag);
        },
        skillUrl(){
        	this.$router.push({path:'/help'});
        }
    },
}
</script>

<style lang="less">
	@import (reference) '~src/style/all.less';
	.l_skill_item{
		.user_msg{
			em{
				.c_main;
			}
		}
	}
</style>
<style lang="less" scoped>
	@import (reference) '~src/style/all.less';
	.l_skill_item{
        .pos_rel;
		.l_skill_status{
			position:absolute;
			right: 0.3rem;
			top: 0.3rem;
			z-index: 1;
			line-height: 0.42rem;
		}
	}
	.btn_border{
		padding: 0.05rem 0.3rem;
	}
	.c_green{
		color: #99cc1e;
	}
	.c_blue{
		color: #3f91f4;
	}
	.l_skill_mess{
		line-height: 0.6rem;
		ul{
			li{
				width: 50%;
				float: left;
			}
		}
	}
	.l_skill_handle{
		.ml30;
		.mt10;
		.border-t;
		height: 0.9rem;
	}
	.l_skill_open{
		color: #4ad764;
		font-size: 0.96rem;
	}
	.l_fail_tip{
		height: 0.6rem;
		background: #f5f5f5;
		color: #ffa516;
	}
	.l_toCom_tip{
		height: 0.6rem;
		background: #fff5e5;
		color: #f4890d;
	}
</style>
