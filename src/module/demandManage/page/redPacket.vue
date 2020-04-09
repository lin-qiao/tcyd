<template lang="html">
    <div class="router_page bg_gray">
        <top title='我的红包' :isReturn="false"></top>
        <div class="red_packet_list pb121">
            <div class="packet_item mtb30 mlr30" v-for="item in redPacketList" @click="selectRedPacket(item)">
                <div class="select">
                    <img v-if="rid == item.rid" src="../images/y_seled.png" alt="">
                    <img v-else src="../images/y_sele.png" alt="">
                </div>
                <div class="packet_info">
                    <div class="price_box f40 text_center">{{item.redMoney}}</div>
        			<div class="packet_mess">
        				<p class="f28 mb15">{{item.rname}}</p>
        				<p class="f22 c_666 mb10">适用范围：<span class="c_main">{{item.limitUserStr}}</span></p>
        				<p class="f22 c_666">有效期至：{{item.endTime}}</p>
        			</div>
                </div>
    		</div>
        </div>
        <div class="btn_wrap">
            <div class="btn_block" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script>
import {
    fetchRequireRedPay, //获取可用红包
} from '../service/getData';
export default {
    data(){
        return{
            rid:0, //选中的红包id
            redMoney:0, //选中的红包金额
            redPacketList:[], //可用红包列表
        }
    },
    activated(){
        if(this.$route.query.orderMoney){
            this.getRedPacketList(this.$route.query.orderMoney);
        }
    },
    methods:{
        //选择红包
        selectRedPacket(item){
            this.rid = item.rid;
            this.redMoney = item.redMoney;
        },
        //获取可用红包列表
        getRedPacketList(orderMoney){
            fetchRequireRedPay(orderMoney).then(res => {
                if(res.status){
                    this.redPacketList = res.data.list || [];
                }
            })
        },
        //确定选择
        confirm(){
            if(!this.rid){
                alertTip('请选择红包');
                return;
            }
            this.$store.state.rid = this.rid;
            this.$store.state.redMoney = this.redMoney;
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped lang="less" scoped>
@import (reference) '~src/style/all.less';
.packet_item{
	height: 1.8rem;
	.flex;
	.flex_center;
	.box_shadow(0px 0px 0.2rem #f1f1f1);
    .select{
        width: .75rem;
        height: .4rem;
        padding-right: .35rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
	.price_box{
		flex-shrink:0;
		width: 1.04rem;
		height: 1.3rem;
		margin-right: 0.68rem;
        margin-left: .4rem;
		padding-top: 0.72rem;
		background: url(~src/module/common/member/module/wallet/module/packet/images/packet_bg.png) center;
		background-size: 100% 100%;
		font-weight: bold;
		color: #f7f7f7;
	}
    .packet_info{
        .flex;
        .flex_center;
        .flex_grow;
        background: #fff;
        height: 1.8rem;
    }
	.packet_mess{
		width: 2rem;
		flex-grow:1;
	}
	.packet_handler{
		flex-shrink:0;
		width: 0.87rem;
		height: 100%;
		.flex;
		.flex_center;
		.justify_center;
		border-left: 1px dashed #f2f2f2;
		letter-spacing:0.06rem;
		writing-mode:tb-rl;
		color: #fa7847;
		.f24;
	}
}
</style>
