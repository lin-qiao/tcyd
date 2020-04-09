<template lang="html">
    <div class="l_cife_list">
		<!--S 头部-->
        <div class="title">
            <a class="tit_icon left" @click="$router.go(-1)">
                <i class="iconfont icon-arrow-left" ></i>
                <span>返回</span>
            </a>
            <div class="tit_font">订单确认</div>
        </div>
		<!--E 头部-->
        <!--S 商品信息-->
        <div class="l_goods_mess">
            <div class="thumb">
                <img :src="orderDetail.partnerIcon|imgUrl" alt="" />
            </div>
            <div class="l_goods_con">
                <p class="l_name">同城约单{{orderDetail.partnerName}}</p>
                <p class="l_attr">购买年限：<span class="c_orange">{{orderDetail.partnerPeriod}}</span></p>
                <p class="l_count_mess">
                    <span class="l_goods_price">应付金额：<em class="f30">&yen; <i class="f36">{{orderAmount}}</i></em></span>
                </p>
            </div>
        </div>
        <!--E 商品信息-->
        <!--S 选择支付方式-->
        <div class="l_choose mt30 l_border_no">
            <p class="l_title">选择支付方式</p>
            <p class="l_car_balance">
                <img src="../images/icon_jsd.png" class="icon_jsd"/>余额  (<span style="color: #ff4100;">{{jsdBalance}}</span>元)
                <i class="iconfont icon-iconfontxiaogantanhao f30" @click="explainFn"></i>
                <i class="iconfont icon-duihao2 f42 pull_right active"></i>
            </p>
        </div>
        <!--E 选择支付方式-->
        <div class="f24 pl30 c_888">
			<i class="iconfont icon-xuanzhong f34 c_ccc mr10" :class="{'c_main':isProtocol}" @click="isProtocol=!isProtocol"></i><span style="vertical-align: 2px;">阅读并同意<a href="javascript:void(0);" style="color: #0696da;" @click="visibleProtocol=true">《同城约单“推广站长”服务协议》</a></span>
		</div>
		<!--S 温馨提示-->
		<com-warm-prompt class="mt30" code="JSDZFWXTS" ></com-warm-prompt>
		<!--E 温馨提示-->
        <!--S 底部-->
        <div class="l_receipt_footer">
            <!--全额时-->
            <p class="l_monthly_payment">总计： <em>{{orderAmount|number}}</em>元</p>
            <a class="l_receipt_btn" @click="jsdPayFn">立即付款</a>
        </div>
        <!--E 底部-->
        <!--S 协议弹窗-->
		<transition name="page-slide-bottom">
            <div class="protocol bg_fff" v-if="visibleProtocol">
            	<div class="flex flex_center justify_between protocol_title plr30">
            		<h2 class="pro_tit f26">同城约单站长服务协议</h2>
                 	<i class="iconfont icon-close1 f40" @click="visibleProtocol = false"></i>
            	</div>
                <div class="pro_content pad30 f24" v-html="agreementContent">
                </div>
            </div>
        </transition>
		<!--E 协议弹窗-->
    </div>
</template>
<script>
import {
	fetchPartnerOrderPaydetail, //站长支付详情
	fetchJsdPartnerOrderPay,//晋商贷站长支付
	fetchJsdBalance,//查询晋商余额
} from '../service/getData'
import {fetchTextDetail} from 'src/service/getData'//同城约单服务协议
import affirm from '../images/l_affirm.png'
import fail from '../images/l_fail.png'
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import {isAndroid} from 'src/config/env'; //安卓
export default {
    data() {
    	return {
    	   orderNo:"",//订单号
    	   orderDetail:{},//订单详情
    	   orderAmount:0,//支付金额
    	   jsdBalance:0,//晋商贷余额
    	   agreementContent:'',//协议内容
    	   visibleProtocol:false,//是否显示协议弹窗
    	   isProtocol:false,//是否同意协议
    	}
	},
	components: {
		comWarmPrompt
	},
	activated(){
		this.orderNo=this.$route.query.orderNo||'';//订单号
		this.getJsdBalance();//获取晋商贷余额
		this.orderPaydetailFn(this.orderNo);//获取订单详情
	},
	mounted(){
		this.protocolFn();
	},
	methods: {
		protocolFn(){
			fetchTextDetail('TCYDTGZZFWXY').then(res=>{
				if(res.status){
					this.agreementContent=res.data.detail;//同城约单服务协议
				}
			})
		},
		explainFn(){//余额说明
			this.$alert({
				layerImg:'',
				content:"<div class='pt50 text_center'><h3 class='f30 mb10'>余额说明</h3><p>4.0账户余额：<span class='c_main'>"+this.jsdBalance+"</span>元</p></div>",
				confirmBtn:"我知道了"
			})
		},
		getJsdBalance(){//获取晋商贷余额
			fetchJsdBalance().then(res=>{
				if(res.status){
					this.jsdBalance=res.data.balance;//晋商贷余额
				}
			})
		},
		orderPaydetailFn(orderNo){//获取订单详情
			fetchPartnerOrderPaydetail(orderNo).then(res=>{
				if(res.status){
					this.orderDetail=res.data;//订单详情
					this.orderAmount=res.data&&res.data.orderAmount||0;//订单金额
				}
			});
		},
		jsdPayFn(){//晋商贷支付二次确认弹窗
			if(!this.isProtocol){
				alertTip("请先同意协议");
				return;
			}
			if(this.jsdBalance<this.orderAmount){//余额少于支付金额
				this.$alert({
					layerImg:fail,
					content:"您的余额不足~"
				})
			}else{
				this.$confirm({
					layerImg:affirm,
					content:"您的确定要支付该笔订单吗",
					confirm:()=>{
		                this.stationPayFn();
					}
				})
			}
		},
		stationPayFn(){//晋商贷余额支付
			fetchJsdPartnerOrderPay(this.orderNo,"",true).then(res=>{
				if(res.status){
	    			alertTip("支付成功",()=>{
		    			this.$router.replace('/jsdPaySuccess');
	    			})
	    		}else{
	    			alertTip(res.msg);
	    		}
			});
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/base";
/*S 确认订单*/
.l_eee_line {
    height: 0.1rem;
    background: #eee;
}
.l_address {
    position: relative;
    padding: 0.2rem 0.16rem 0.2rem 0.6rem;
    border-bottom: 1px solid @line_color;
    line-height: 1.5em;
    i {
        position: absolute;
        top: 50%;
        margin-top: -0.18rem;
    }
    .icon-location {
        left: 0.16rem;
        font-size: 0.3rem;
    }
    .icon-gengduo {
        right: 0.16rem;
        color: #ababab;
        font-size: 0.42rem;
    }
}
.l_adress_mess {
    a {
        display: block;
        padding-right: 1.2rem;
        color: #333;
    }
    .ellipsis_clip {
        display: -webkit-box;
    }
    .l_no_address {
        font-size: 0.26rem;
        color: #555;
    }
}
.l_goods_mess {
	display: flex;
	border-top:0.1rem solid #eee;
    padding: 0.2rem 0.15rem;
    border-bottom: 1px solid @line_color;
    .thumb{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.61rem;
        width: 1.61rem;
        height: 1.61rem;
        .border;
        img{
        	height: 1.1rem;
        }
    }
    .l_goods_con {
        width: 5.46rem;
        height: 100%;
        padding-left: 0.3rem;
        line-height: 1.8em;
        p {
            color: #666;
        }
    }
    .l_name {
        font-size: 0.3rem;
    }
    .l_attr {
        font-size: 0.24rem;
        margin-top: 0.3rem;
        .c_orange{
        	color: #ff4a13 !important;
        }
    }
    .l_count_mess {
        margin-top: 0.1rem;
    }
    .l_goods_price {
        font-size: 0.3rem;
        em {
            color: #ff4100;
        }
    }
    .l_count {
        .pull_right;
        font-size: 0.28rem;
        i {
            font-size: 0.2rem;
        }
    }
}
.l_actually_pay {
    padding: 0 0.3rem;
    height: 0.92rem;
    border-bottom: 1px solid @line_color;
    font-size: 0.28rem;
    line-height: 0.91rem;
}
.l_choose {
    padding: 0.15rem 0.3rem;
    border-bottom: 1px solid @line_color;
}
.l_title {
    font-size: 0.28rem;
    line-height: 0.72rem;
}
.l_options {
    li {
        position: relative;
        .pull_left;
        width: 1.51rem;
        height: 0.58rem;
        margin-right: 0.23rem;
        margin-bottom: 0.22rem;
        .border(#e1e1e1);
        .border-radius(0.04rem);
        line-height: 0.56rem;
        .text_center;
        font-size: 0.26rem;
    }
    .active {
        background-color: @color;
        .border(#ff4200);
        color: #fff;
    }
}
.l_border_no {
    border: none;
}
.l_first_time {
    padding: 0 0.3rem;
    line-height: 0.72rem;
    color: #666;
    font-size: 0.24rem;
    i {
        font-size: 0.24rem;
    }
}
.l_rule {
    padding: 0 0.3rem;
    margin-bottom: 1.38rem;
    line-height: 0.72rem;
    color: #888;
    font-size: 0.24rem;
    i {
        font-size: 0.24rem;
    }
}
.l_receipt_footer {
    position: fixed;
    width: 7.5rem;
    left: 50%;
    margin-left: -3.75rem;
    bottom: 0;
    height: 1.03rem;
}
.l_monthly_payment {
    .pull_left;
    width: 5.24rem;
    height: 100%;
    background: #fff;
    .border-t;
    padding: 0 0.3rem;
    line-height: 1.02rem;
    font-size: 0.32rem;
    em {
        color: @color;
    }
    i {
        margin-left: 0.1rem;
        font-size: 0.32rem;
    }
}
.l_receipt_btn {
    display: block;
    .pull_right;
    width: 2.26rem;
    height: 100%;
    background-color: @color;
    line-height: 1.03rem;
    .text_center;
    font-size: 0.34rem;
    color: #fff;
}
.l_car_balance {
    line-height: 0.56rem;
    margin-bottom: 0.22rem;
    font-size: 0.28rem;
    .icon_jsd {
        width: 0.42rem;
        height: 0.42rem;
        margin-right: 0.1rem;
        vertical-align: middle;
    }
    .icon-duihao2{
    	color: #999;
    	&.active{
    		color: #ff6700;
    	}
    }
}
.l_hint {
    .text_center;
    mmargin-top: 0.3rem;
    margin-bottom: 0.1rem;
    color: @color;
    font-size: 0.24rem;
    i {
        font-size: 0.26rem;
    }
}
.l_choose_no {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    .l_title {
        padding: 0 0.3rem 0 1rem;
        margin-bottom: 0.22rem;
    }
    .l_options {
        padding: 0 0.3rem;
    }
    .l_tips {
        position: absolute;
        left: 0;
        top: 0.31rem;
        width: 0.8rem;
        height: 0.4rem;
        background-color: @color;
        .text_center;
        line-height: 0.4rem;
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        font-size: 0.2rem;
        color: #fff;
    }
}
.l_monthly_box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 8.6rem;
    overflow-y: scroll;
    background: #fff;
    z-index: 111;
    .l_monthly_title {
        padding: 0 0.3rem;
        border-bottom: 1px solid @line_color;
        .text_center;
        line-height: 1.02rem;
        font-size: 0.32rem;
        color: #000;
        i {
            .pull_right;
            font-size: 0.32rem;
            color: #999;
        }
    }
    .l_total {
        height: 1.73rem;
        padding-top: 0.4rem;
        border-bottom: 1px solid @line_color;
        .text_center;
        p {
            line-height: 1.8em;
        }
        .l_total_price {
            font-size: 0.34rem;
            color: #000;
            em {
                font-size: 0.48rem;
            }
        }
        .l_total_service {
            font-size: 0.26rem;
            color: #666;
        }
    }
    .l_monthly_ul {
        li {
            position: relative;
            padding: 0.2rem 0.3rem 0.2rem 0.95rem;
            border-bottom: 1px solid @line_color;
            line-height: 0.54rem;
            font-size: 0.28rem;
        }
        em {
            position: absolute;
            left: -0.6rem;
            top: 0.04rem;
            width: 0.38rem;
            height: 0.38rem;
            .border-radius(50%);
            .border(#666);
            line-height: 0.36rem;
            .text_center;
            color: #666;
        }
    }
    .l_monthly_mess {
        .text_right;
        line-height: 0.4rem;
        font-size: 0.26rem;
        color: #888;
    }
}
.l_rule_box {
    top: 0;
    height: auto;
    padding-top: 0.7rem;
    .l_monthly_title {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 0.7rem;
        line-height: 0.7rem;
        border: none;
    }
    .l_rule_con {
        padding: 0.1rem 0.3rem;
    }
}
.bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 11;
}
/*E 确认订单 */
.l_trans {
    position: relative;
    background: #fff;
    z-index: 99;
}

.l_monthly_mess {
    z-index: 10;
}
.protocol{
	position: fixed;
	z-index: 11;
	bottom: 0;
	width:7.5rem;
	margin-left:-3.75rem;
	left: 50%;
	height: 5rem;
	box-shadow:0 0px 0.2rem rgba(0, 0, 0, 0.1);
}
.protocol_title{
	height: 0.8rem;
	border-bottom:1px solid #e8e8e8;
}
.pro_content{
	line-height: 1.5em;
	height:4.1rem;
	.overflow_auto;
}
</style>
