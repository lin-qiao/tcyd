<template lang="html">
	<!--S 支付框-->
	<div>
		<div class="c_back_gauge">
			<div class="c_demandDetail_li">
				<span>选择支付方式</span>
			</div>
			<div class="c_demandDetail_li c_pay_list"  @click="changeAccountType()">
				<span>账户余额（ {{bursetotalMoney.usableBalance|number}}元 ）<img src="~src/images/yeIcon.png"/></span>
				<i class="iconfont icon-xzdg" :class="{'c_main':accountType.length>0}"></i>
			</div>
			<div v-if="false">
				<div class="c_demandDetail_li c_pay_list" @click="changeAccountType('balance')">
					<span>可用充值    {{bursetotalMoney.usableRecharge|number}}元</span>
					<i class="iconfont icon-xzdg" :class="accountType.indexOf('balance')>-1&&'c_main'"></i>
				</div>
				<div class="c_demandDetail_li c_pay_list" @click="changeAccountType('income')">
					<span>可用收入  {{bursetotalMoney.usableIncome|number}}元</span>
					<i class="iconfont icon-xzdg" :class="accountType.indexOf('income')>-1&&'c_main'"></i>
				</div>
				<div class="c_demandDetail_li c_pay_list" @click="changeAccountType('brokerage')">
					<span>可用佣金   {{bursetotalMoney.usableBrokerage|number}}元</span>
					<i class="iconfont icon-xzdg" :class="accountType.indexOf('brokerage')>-1&&'c_main'"></i>
				</div>
			</div>
			<div v-if="isHave">
				<div v-for="el in enableChannel" class="c_demandDetail_li c_pay_list" @click="changeRechargeType(el.type)">
					<span>{{el.name}}<img :src="el.icon|imgUrl"/></span>
					<i class="iconfont icon-xzdg " :class="rechargeType==el.type&&'c_main'"></i>
				</div>
			</div>
		</div>
		<div class="hei20 bg_gray"></div>
		<div class="f24 pl30" v-if="isShow">
			<i class="iconfont icon-xuanzhong f34 c_ccc mr10" :class="{'c_main':isProtocol}" @click="isProtocol=!isProtocol"></i><span style="vertical-align: 2px;">我同意<a href="javascript:void(0);" class="c_main" @click="visibleProtocol=true">《同城约单“推广站长”电子协议》</a></span>
		</div>
		 <!--S 支付密码框-->
	  	<div v-show="isShowPwdDialog" class="layer_shadow">
	        <section class="layer_box">
	            <div class="layer_tit">交易密码</div>
	            <i class="iconfont icon-close1" @click="isShowPwdDialog=false;payPwd=''"></i>
	            <div class="layer_con">
	            	<div class="layer_pay_pwd">
	            	    <p>实际支付{{payMoney|number}}元</p>
	            	    <div class="pos_rel">
		            	    <input :type="showPassword?'text':'password'" placeholder="请输入您的交易密码" v-model.trim="payPwd" maxlength="6"/>
		            	    <div class="yl_show">
								<i v-if="showPassword" class="iconfont icon-artboard79" @click="showPassword = false"></i>
								<i v-if="!showPassword" class="iconfont icon-jiemao" @click="showPassword = true"></i>
							</div>
						</div>
	            	    <router-link to="/findPayPwd">忘记密码？</router-link>
	            	    <span class="btn" @click="confirmPayPwd">确定</span>
	            	</div>
	            </div>
	        </section>
	    </div>
	    <!--S 协议弹窗-->
		<transition name="page-slide-bottom">
            <div class="protocol bg_fff" v-if="visibleProtocol">
            	<div class="flex flex_center justify_between protocol_title plr30">
            		<h2 class="pro_tit f26">同城约单站长推广协议</h2>
                 	<i class="iconfont icon-close1 f40" @click="visibleProtocol = false"></i>
            	</div>
                <div class="pro_content pad30 f24" v-html="agreementContent">
                </div>
            </div>
        </transition>
		<!--E 协议弹窗-->
		<!--S 充值完成 自动付款组件-->
		<com-pay-recharge-result  v-if="payNo"  @confirmPayPwd="confirmPayPwd"></com-pay-recharge-result>
		<!--E 充值完成 自动付款组件-->
	</div>
</template>

<script>
	
import comPayRechargeResult from './com-pay-recharge-result' //第三方支付成功 定时 自动发起付款组件
	
import { fetchWallet } from 'src/module/common/member/module/wallet/service/getData' //获取账户余额
//充值渠道、充值
import {fetchEnableChannel,fetchRechargePay,fetchTextDetail} from 'src/service/getData' //获取账户余额,用户协议


	export default {
		data() {
			return {
				visibleProtocol:false,//用户协议
				isProtocol:false,//是否同意协议
				agreementContent:"",//协议内容
				bursetotalMoney: {}, //账户信息
				accountType:["balance", "income", "brokerage",'encourage'], //支付类型数组  Balance（可用充值）,income（可用收入）,brokerage（可用佣金）
				enableChannel: [],//重置渠道  wx zfb bank
				rechargeType: "",//充值类型  wx zfb bank
				isShowPwdDialog:false,//交易密码是否显示
				payPwd:"", //交易密码
				showPassword:false, //交易密码 展示
				isBalance:false,//是否为isHave==false且余额不足,
				isWeixin:true,
				isZFB:true,
				isBank:true,
				payNo:localStorage.payNo,//充值订单号，用于判断是否是充值回调
			}
		},
		components:{
			comPayRechargeResult
		},
		props: {
			payMoney: { //支付金额
				default: 0
			},
			isHave:{//是否有充值方式
				default: true
			},
			isShow:{//协议是否展示
				default: false
			},
			payType:{//支付类型
				default:''
			},
			showPayMoney:{//弹窗展示支付金额--在订单支付的时候可以选择诚意金支付，在选择诚意金支付后，展示的金额和实际需要余额支付的金额不同，所以添加改参数
				default:0
			}
		},
	
		watch: {
//			accountType: function() { //
//				if(this.accountType.length > 0) { //用户选择了 账户余额支付
//					this.rechargeType = "";
//				}
//			},
			payPwd:function(cur){
	    		this.payPwd = cur.replace(/\D+/g, '');
	    	}
		},
		activated() {
			fetchEnableChannel().then(res=>{//充值渠道
				this.enableChannel=res.data.list||[];
				this.payTypeFn();
			});
			
		},
		mounted(){
			fetchTextDetail('ZZZFDZXY').then(res=>{//同城约单站长推广协议
	        	this.agreementContent = res.data.detail;
	        })
		},
		methods: {
			payTypeFn(){//初始化   默认支付方式
				fetchWallet().then(res => {
					if(res.status) {
						this.bursetotalMoney = res.data || {};
						
						if(parseFloat(this.bursetotalMoney.usableBalance)==0){//账号余额为0
							this.accountType=[];//需求余额付款默认选中
						}
						
						if(this.enableChannel.length){//有充值方式
							if(parseFloat(this.bursetotalMoney.usableBalance)==0||parseFloat(this.bursetotalMoney.usableBalance)<parseFloat(this.payMoney)){//可用余额 =0或可用余额小于支付金额 则 默认选中第一种充值方式
								this.rechargeType=this.enableChannel.length>0&&this.enableChannel[0].type
							}else{
								this.rechargeType="";
							}
						}else{
							fetchEnableChannel().then(res=>{//充值渠道
								this.enableChannel=res.data.list||[];
								if(parseFloat(this.bursetotalMoney.usableBalance)==0||parseFloat(this.bursetotalMoney.usableBalance)<parseFloat(this.payMoney)){//可用余额 =0或可用余额小于支付金额 则 默认选中第一种充值方式
									this.rechargeType=this.enableChannel.length>0&&this.enableChannel[0].type
								}else{
									this.rechargeType="";
								}
							});
						}
					}
				})
			},
	    	confirmPayPwd() {
	            this.isShowPwdDialog = false;
	            this.$emit("toPay",this.accountType.toString(),this.payPwd);
	            this.payPwd='';
	        },
			checkPayMoneyAndType() {
				this.$nextTick(()=>{
					//1、检测支付方式与支付金额是否正确，正确调用支付密码弹窗，执行支付
					//2、检测账户余额是否足够支付，不够支付，则调用充值
					//3、充值完成再次回页面 调用账户余额进行付款
					
					
					//一、校验 用户选择的付款方式 合计金额是否 大于 支付金额
					
					let payMoney = this.payMoney;
					let checkMoney = 0; //用户选择的支付方式合计金额
					//let accountTypeArr = ["balance", "income", "brokerage"]; //账户余额的所有支付类型
					//1、计算用户选中的支付方式 合计金额
					if(this.accountType.length>0) { //如果选择所有 账户余额支付方式，则 直接取 账户总余额
						checkMoney = this.bursetotalMoney.usableBalance;
					}
					
	//				else { //未全选中，则筛选选中的对应金额
	//					for(let i = 0, len = this.accountType.length; i < len; i++) {
	//						if(this.accountType[i] == "balance") { //（可用充值）
	//							checkMoney += parseFloat(this.bursetotalMoney.usableRecharge);
	//						} else if(this.accountType[i] == "income") { //income（可用收入）
	//							checkMoney += parseFloat(this.bursetotalMoney.usableIncome);
	//						} else { //brokerage（可用佣金）
	//							checkMoney += parseFloat(this.bursetotalMoney.usableBrokerage);
	//						}
	//					}
	//				}
					//2、计算充值金额  ，充值金额大于0 去充值，否则 直接支付
					
					let rechargeMoney=parseFloat(payMoney) - parseFloat(checkMoney);
					if(rechargeMoney>0) { //账户余额不足
						if(!this.isHave){//页面没有展示充值方式，则直接跳转充值页面充值
							this.isBalance = true;
						}else{ //页面展示了充值方式
							this.toRecharge(rechargeMoney)
						}
						return;
					}
					if(this.isShow&&!this.isProtocol){
						alertTip("请先同意同城约单“站长推广”电子协议！");
						return;
					}
					//取消 输入交易密码
					//添加二次弹窗
					this.$confirm({
						cancelBtn:'取消',
						confirmBtn:'确定',
						layerImg:'',
						title:'提示',
						content:`
							<div class="flex flex_column pt20">
							    <p class="f28">您确定支付${this.payType}${this.showPayMoney||this.payMoney}元?</p>						    
							</div>
							`,
						confirm:() => {
							this.$emit("toPay",this.accountType.toString(),"");
						}
					})	
					//this.$emit("toPay",this.accountType.toString(),"");
					
	//				if(!sessionStorage.is_tradePswd||sessionStorage.is_tradePswd=="N"){
	//					this.$confirm({
	//						cancelBtn:'取消',
	//						confirmBtn:'去设置',
	//						layerImg:require('src/images/account.png'),
	//						content:`
	//							<div class="flex flex_column">
	//							    <p class="f28">亲，您还没有设置交易密码?</p>						    
	//							</div>
	//							`,
	//						confirm:() => {
	//							this.$router.push("/setPayPwd?url="+this.$route.fullPath);
	//						}
	//					})	
	//					return;
	//				}else{
	//					this.isShowPwdDialog=true;//显示 交易密码弹窗	
	//				}
				})
				
				

			},
			toRecharge(rechargeMoney) { //去充值
				//用户只可以使用同城账户直接支付，  微信支付宝等君为 充值
				if(this.rechargeType == "") { //判断用户是否选择了 支付方式
					if(!this.accountType.length){
						alertTip("请至少选择一种支付方式");
					}else{
						alertTip("余额不足！请选择一种在线支付方式");
					}
				}else{
					//计算充值金额 
					fetchRechargePay(this.rechargeType,rechargeMoney).then(res=>{//执行去充值
						if(res.data&&res.data.rechargeUrl){
							//获取充值订单号 存储到本地缓存中
							localStorage.payNo=res.data.payNo;
							//直接跳转第三方充值页面
							window.location.replace(res.data.rechargeUrl);
						}
					})
				}

			},
			changeAccountType() {
				if(this.accountType.length>0) { //支付类型数组中已经存在当前 支付方式  
					//从数组中移除
					this.accountType=[];
				} else { //添加到 数组中
					
					if(parseFloat(this.bursetotalMoney.usableBalance)==0){//账号余额为0
							this.accountType=[];//需求余额付款默认选中
					}else{
						this.accountType=["balance", "income", "brokerage",'encourage'];
					}
				}
			},
			changeRechargeType(type) {
				if(this.rechargeType==type){
					this.rechargeType = "";
				}else{
					this.rechargeType = type;
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
    .ml-30{
    	margin-left:-.3rem;
    }
	.c_pay_popup .mint-popup {
		width: 7.5rem!important;
	}
	
	.c_ccc {
		color: #ccc;
	}
	
	.c_back_gauge {
		background: #fff;
		padding-left: 0.3rem;
		.c_demandDetail_li {
			padding-left: 0;
		}
	}
	
	.c_demandDetail_li {
		background: #fff;
		display: flex;
		justify-content: space-between;
		padding: 0 0.3rem;
		position: relative;
		height: 0.92rem;
		border-bottom: 1px solid #eee;
		align-items: center;
		span {
			font-size: 0.28rem;
			color: #666;
		}
	}
	
	.c_pay_popup .mint-popup {
		width: 100%;
	}
	
	.c_pay_list {
		position: relative;
		img {
			position: absolute;
			left: 0rem;
			top: 50%;
			margin-top: -0.3rem;
			width: 0.6rem;
			height: 0.6rem;
		}
		i {
			color: #cccccc;
			font-size: 0.4rem;
		}
	}
	
	.c_pay_list span:first-child {
		padding-left: 0.9rem;
	}
	
	.btn_border,
	.btn {
		padding: 0.1rem 0.6rem;
	}
	
	.dialog_img {
		width: 100%;
	}
	
	.p3 {
		display: flex;
		align-items: center;
		font-size: .26rem;
		margin-top: .3rem;
		img {
			width: .34rem;
			height: .34rem;
			margin-right: .06rem;
		}
	}
	.layer_pay_pwd{
	width:5.18rem;
	p{
		text-align: left;
		padding:0.1rem 0 0.26rem;
		font-size:0.26rem;
		color:#666;
	}
	input{
		width:5.18rem;
		height:0.74rem;
		border:1px solid #dbdbdb;
		border-radius:0.04rem;
		padding:0 0.22rem;
	}
	a{
		display: flex;
		justify-content:flex-end;
		font-size:0.26rem;
		color:#777777;
		margin-top:0.12rem;
	}
	.btn{
		width:2.58rem;
		height:0.66rem;
		display:block;
		margin:0.2rem auto;
	}
}

.yl_show{
	position: absolute;
	right: 0.1rem;
	line-height: 0.75rem;
	top:0;
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