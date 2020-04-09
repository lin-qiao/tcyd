<template>
	<div class="router_page pb110">
	    <!--S头部-->
	    <top title="现金" :isReturn="false" right="充值明细" @clickRight="topRight"></top>
		<!--<div class="title">
	        <a class="tit_icon left" onclick="javascript:history.go(-1);">
	            <i class="iconfont icon-arrow-left"></i>
	        </a>
	        <div class="tit_font">
	        	<ul class="title_tab">
	        		<li :class="{'active':type==1}" @click="type=1">现金</li>
	        		<li :class="{'active':type==2}" @click="type=2">钻石</li>
	        	</ul>
	        </div>
	        <a href="javascript:void(0);" class="tit_icon right c_666" @click="topRight">
	            <div>{{type==1?'充值明细':'钻石明细'}}</div>
	        </a>
	    </div>-->
	    <!--E头部-->
	    
	    <!--S现金充值-->
	    <div v-show="type==1">
	    	<!--S可用余额-->
	    	<div class="l_recharge_mess c_fff" >
		    	<p class="f24 mb10">可用余额</p>
		    	<p class="f48 ml-10 mb30">￥{{balance|number()}}</p>
		    	<p class="f26 text_right"><span class="f24">冻结：</span>￥{{rechargeAmount.freeze|number()}}</p>
		    </div>
		    <!--E可用余额-->
		    <!--S充值余额-->
		    <div class="plr30 pos_rel">
			    <formRadio
					type="fwfs"
					:list="rechargeList"
					v-model="rechargeType"
					:isBadge="true"
					height="100"
					column="2">
				</formRadio>
				<input class="l_recharge_input f30 text_center" @focus="rechargeType=''" type="text" placeholder="其他金额" autocomplete="off" v-model="price"/>
			</div>
			<!--E充值余额-->
			<div class="line_box mt30"></div>
			<!--S付款方式-->
			<itemElementBox class="border-n" title="选择支付方式" :noContent="true"></itemElementBox>
			<ul class="pl30">
				<li class="recharge_type_list" v-for="item in rechargeChannel" @click="payApi = item.type">
					<span><img :src="item.icon|imgUrl"/>{{item.name}}</span><em style="opacity: 0;">{{payApi==item.type}}</em>
					<i class="iconfont icon-duihao2" :class="{'c_main':payApi==item.type}"></i>
				</li>
				<!--<li class="recharge_type_list" v-if="rechargeChannel.isZFB" @click="payApi='zfb'">
					<span><img src="~src/images/zfpIcon.png"/>支付宝</span>
					<i class="iconfont icon-duihao2" :class="{'c_main':payApi=='zfb'}"></i>
				</li>
				<li class="recharge_type_list" v-if="rechargeChannel.isWeixin"  @click="payApi='weixin'">
					<span><img src="~src/images/wxIcon.png"/>微信支付</span>
					<i class="iconfont icon-duihao2" :class="{'c_main':payApi=='weixin'}"></i>
				</li>
				<li class="recharge_type_list border-n" v-if="rechargeChannel.isBank" @click="payApi='bank'">
					<span><img src="~src/images/kjIcon.png"/>网上银行</span>
					<i class="iconfont icon-duihao2" :class="{'c_main':payApi=='bank'}"></i>
				</li>-->
			</ul>
			<!--E付款方式-->
			<!--S温馨提示-->
			<div>
				<div class="bg_gray" style="height: 0.6rem;"></div>
				<div class="bg_gray" style="margin-top: -0.6rem;">
					<com-warm-prompt :code="code" class="mt60"></com-warm-prompt>
				</div>
			</div>
			<!--E温馨提示-->
			<!--S充值-->
			<div class="c_fixed_bottom pt10">
				<a class="btn_block" href="javascript:void(0);" @click="rechargePay">立即充值</a>
			</div>
			<!--E充值-->
	    </div>
	    <!--E现金充值-->
	    
	    <!--S钻石充值-->
	    <div v-show="type==2">
	    	<!--S可用钻石-->
		    <div class="l_recharge_mess pt0 flex flex_column justify_center flex_center" v-show="type==2">
		    	<p class="f26 mb10 c_fff" @click="jewelBlock">可用钻石<i class="iconfont icon-wenhao"></i></p>
		    	<p class="f24 mb10 f54 c_fff">{{masonryAmount}}</p>
		    </div>
		    <!--E可用钻石-->
		    <!--S钻石金额-->
		    <div class="plr30 pos_rel">
				<formRadio
					type="fwfs"
					:list="jewelList"
					v-model="jewelId"
					:isBadge="true"
					height="100"
					column="2">
				</formRadio>
			</div>
			<!--E钻石金额-->
			<div class="line_box mt30"></div>
			<!--S付款方式-->
			<itemElementBox class="border-n" title="选择支付方式" :noContent="true"></itemElementBox>
		    <com-pay-recharge ref="comPayRecharge" :isHave="false" @toPay="rechargePay" :payMoney="money"></com-pay-recharge>
			<!--E付款方式-->
			<!--S充值-->
			<div class="c_fixed_bottom pt10">
				<a class="btn_block" href="javascript:void(0);" @click="toChildCheckPayMoneyAndType">立即充值</a>
			</div>
			<!--E充值-->
		 </div>
	    <!--E钻石充值-->
	</div>
</template>

<script>
import formRadio from 'src/components/formItem/formRadio';            //充值金额=>单选（组件）
import itemElementBox from 'src/components/item/itemElementBox';      //标题（组件）
import comPayRecharge from "src/components/com-pay-recharge"          //钻石充值渠道
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import {fetchBalance} from "../../my/service/getData"                 //可用钻石（接口）
import {
	fetchEnableChannel,//现金充值渠道
	fetchRechargePay,//充值按钮
	fetchAccountInformation,//个人信息
	fetchDictionaryMultipleList//充值金额
} from "src/service/getData"
import {
	fetchRechargeAmount,//账户余额 + 冻结金额
	fetchMasonryRecharge//钻石充值
} from '../service/getData'; 
import layerImg from 'src/images/jewel_icon.png';//可用钻石充值
export default {
	data() {
		return {
			type:1,               //选项卡=>1:现金   2:钻石
			rechargeAmount:{},    //现金充值=>请求账户余额 + 冻结金额
			rechargeCode:'TCYECZ',//现金充值=>充值金额列表code值（接口参数）
			rechargeList:[],      //现金充值=>充值金额列表
			rechargeType:'',      //现金充值=>选中值
			price:'',             //现金充值=>填写其他金额
			rechargeChannel:[],   //现金充值=>充值渠道
			code:'TCCZWXTS',      //现金充值=>温馨提示code（接口）
			prompt:'',            //现金充值=>温馨提示信息
			
			masonryAmount:'',  //钻石充值=>可用钻石
			jewelId:0,         //钻石充值=>当前钻石金额id
			jewelCode:'TCZSCZ',//钻石充值=>充值金额列表code值（接口参数）
			jewelList:[],      //钻石充值=>充值金额列表
			money:0,           //钻石充值=>实际支付金额
			remark:0,          //钻石充值=>钻石金额
			
			payApi:'' ,   //充值方式
			balance:""  //可用余额
		}
	},
	components: {
		itemElementBox,//标题
		formRadio,     //充值金额=>单选
		comWarmPrompt,    //现金充值=>温馨提示
		comPayRecharge //钻石充值渠道
	},
	activated() {
    	fetchAccountInformation().then(res=>{//获取用户可用余额
    		if(res.status){
    			this.balance = res.data.usableBalance;
    		}
    	})
	},
	mounted(){
		
		//现金充值=>请求账户余额 + 冻结金额
		fetchRechargeAmount().then(res=>{
			if(res.status){
				this.rechargeAmount = res.data;
			}
		})
		
		
		//现金充值=>充值渠道
		fetchEnableChannel().then(res=>{
			if(res.status){
				this.rechargeChannel = res.data.list;
				this.payApi = this.rechargeChannel[0].type;
			}
		})
		
		//现金充值=>金额明细
		fetchDictionaryMultipleList(this.rechargeCode).then(res=>{
			if(res.status){
				this.rechargeList = res.data.list.TCYECZ;//赋值
				this.rechargeList.forEach(v=>{
					v.money = v.name;
					v.name = "<div><p class='f34 c_333'>￥"+v.name+"</p></div>";
				})
				this.rechargeList = this.rechargeList.concat([{id:'',name:''}]);//列表+其他手动输入
				this.rechargeType = this.rechargeList[0].id;//默认选中
			}
		})
		
		this.usableJewel();//钻石充值=>可用钻石
		
		//钻石充值=>金额明细
		fetchDictionaryMultipleList(this.jewelCode).then(res=>{
			this.jewelList = res.data.list.TCZSCZ;//赋值
			this.jewelId = this.jewelList[0].id;//默认选中
			this.jewelList.forEach(v=>{
				v.money = v.name;
				v.name = "<div><p class='f34 c_333'>"+v.name+"钻石</p><p class='f20 c_main'>￥"+v.remark+"<p></div></div>";
			})
		})
	},
	watch:{
		price(cur){//现金充值=>检测金额
			this.price = cur.replace(/\D+/g, '');
			if(this.price<1 || this.price>1000000){
				alertTip("充值金额不能大于1000000元且不能小于1元");
				this.price="";
			}
		}
	},
	methods: {
		topRight(){//头部右侧点击
			if(this.type==1){
				this.$router.push({path:'/wallet/rechargeRecord'});//现金明细
			}else{
				this.$router.push({path:'/wallet/JrechargeRecord'});//钻石明细
			}
		},
		toChildCheckPayMoneyAndType(){//调用子组件的 校验金额与类型函数
			this.$refs.comPayRecharge.checkPayMoneyAndType();
			if(this.$refs.comPayRecharge.isBalance){
				this.type = 1;
			}
			this.jewelList.filter(v=>{
				if(v.id==this.jewelId){
					this.money = v.money;
					this.remark = v.remark;
				}
			})
		},
		usableJewel(){//钻石充值=>可用钻石
			fetchBalance().then(res=>{
				if(res.status){
					this.masonryAmount = res.data.masonryAmount;
				}
			})
		},
		rechargePay(){//充值按钮提交
			if(this.type==1){//现金充值
				let orderAmount;
				this.rechargeList.filter(v=>{
					if(v.id==this.rechargeType){
						this.rechargeType?orderAmount = v.money:orderAmount = this.price;//如果rechargeType（选择值）有值则传rechargeType，否则传其他金额输入值
				    }
				})	
				//校验充值金额
				if(!orderAmount){
					alertTip('请选择充值金额');
					return;
				}
				
				//请求充值按钮
				fetchRechargePay(this.payApi,orderAmount).then(res=>{
					if(res.data&&res.data.rechargeUrl){
						window.location.href = res.data.rechargeUrl;
					}
				})
				
			}else{//钻石充值
				let accountType = this.$refs.comPayRecharge.accountType.toString();
				fetchMasonryRecharge(this.money,this.remark,accountType).then(res=>{
					if(res&&res.status){
			            alertTip("充值成功！");
			            this.usableJewel();
			        }
		        })
			}
		},
		jewelBlock(){//可用钻石弹窗
			this.$alert({
                content:'<div>钻石为大德通同城APP内的虚拟货币<p>1、可用于打赏您心爱的TA</p><p>2、购买增值业务发消息或查看微信</p><p>3、可兑换成收入</p></div>',
                layerImg:layerImg,
                confirmBtn:'我知道了'
            })
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.l_recharge_input{
	position: absolute;
	width: 3.15rem;
	height: 1rem;
    left: 3.9rem;
	bottom: 0;
	z-index: 1;
}
.title{
	overflow: hidden;
}
.title_tab{
	width:3.3rem;
	height:0.58rem;
	margin: 0.15rem auto;
	border: 0.02rem solid @color;
	.border-radius(0.29rem);
	overflow: hidden;
	li{
		float: left;
		width: 50%;
		height: 100%;
		line-height: 0.54rem;
		color: @color;
		.f30;
		&.active{
			background: @color;
			color: #fff;
		}
	}
}
.l_recharge_mess{
	width: 6.9rem;
	height: 2.6rem;
	margin: 0.25rem auto 0.34rem;
	padding: 0.5rem 0.46rem 0 0.32rem;
	background: url(../images/recharge_bg.png) no-repeat center;
	background-size: 100%;
}
.recharge_type_list{
	height: 0.91rem;
	.flex;
	.flex_center;
	.justify_between;
	.border-b;
	.pr30;
	i{
		color: #dcdcdc;
		.f40;
	}
	span{
		.flex;
		.flex_center;
		.f28;
		color:#555;
		img{
			width: 0.36rem;
			height: 0.36rem;
			margin-right: 0.2rem;
		}
	}
}
</style>
