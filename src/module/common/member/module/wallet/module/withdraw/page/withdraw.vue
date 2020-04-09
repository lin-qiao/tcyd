<template>
	<div class='router_page bg_gray'>
		<div class="bg_fff">
			<top :title="title+'提现'" :isReturn="false" right="明细" @clickRight="clickRightFn"></top>
			<div class="hei20 bg_gray"></div>
			<!--S 未绑定银行卡-->
			<item-cell 
				title="绑定银行卡" 
				:isLink="true"
				:height="118"
				:noBorder="true" v-if="!bankCard.length" to="/wallet/addBankcard?withdraw=withdraw">
				<img slot="img" src='../../../images/bank_icon.png'/>
			</item-cell>
			<!--E 未绑定银行卡-->
			<!--S 已绑定银行卡-->
			<item-cell 
				:title="bankCardName" 
				:label="'尾号'+(bankCardNumber.substr(bankCardNumber.length - 4))"
				:isLink="true"
				:height="118"
				:noBorder="true" v-if="bankCard.length" to="/wallet/bankcard?withdraw=withdraw">
				<img slot="img" src='../../../images/bank_icon.png'/>
			</item-cell>
			<!--E 已绑定银行卡-->
			<div class="hei20 bg_gray"></div>
			<!--S 提现-->
			<div class="c_withdraw_box">
				<p class="c_withdraw_fee">提现金额（收取{{withdrawLimit>poundageMoney?poundageValue:withdrawLimit}}服务费）</p>
				<div class="c_input_withdraw">
					<span>￥</span>
					<input type="number" @change="checkWithdrawMoney" v-model.trim="orderAmount" autocomplete="off" />
					<i class="iconfont icon-close pr30 f40 c_999" v-if="isClose" @click='orderAmount="",isClose=false'></i>
				</div>
				<div class="c_usable_withdraw">
					<span class="c_999" v-if="isClose">服务费<em v-if="withdrawLimit>poundageMoney">{{poundageMoney|number}}</em><em v-if="withdrawLimit<poundageMoney">{{withdrawLimit|number}}</em>元</span>
					<span class="c_999" v-if="!isClose">{{title}}金额 {{amount}}元</span>
					<span class="c_blue" @click="orderAmount=amount,isClose=true">全部提现</span>
				</div>
				<form-input title="交易密码:" :align="true" inputType="password" maxlength="6" v-model.trim="tradePswd"></form-input>
			</div>
			<!--E 提现-->
		</div>
		<!--S 提现按钮-->
		<a href="javascript:void(0);" class="btn_block mtb50" :class="{'pink_btn':!btnAbled}" @click="withdrawFn">预计24小时内到账，确认提现</a>
	    <!--E 提现按钮-->
	    <!--S 温馨提示-->
	    <com-warm-prompt :code="code" class="mt100"></com-warm-prompt>
	    <!--E 温馨提示-->
	</div>
</template>

<script>
	import itemCell from 'src/components/item/itemCell'//公用列表样式
	import formInput from 'src/components/formItem/formInput'//输入框
	import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
	import {
		fetchRwithdrawMoney,//可用充值提现金额
		fetchEwithdrawMoney,//可用收入提现金额
		fetchHwithdrawMoney,//可用佣金提现金额
		fetchWithdrawRecharge,//可用充值提现操作
		fetchWithdrawEarning,//可用收入提现操作
		fetchWithdrawHire//可用佣金提现操作
	} from '../service/getData'
	import {fetchBankList} from '../../bank/service/getData'//银行卡列表
	import {fetchProfileDetail,fetchUserType} from 'src/service/getData'//获取系统参数，合伙人信息
	import {
		fetchMemberGetMemberInfo,//个人认证信息
		fetchGetMemberInfo//查询安全中心信息
	} from 'src/module/common/member/module/save/service/getData'
	
	import {REGEX} from 'src/config/env'
export default {
	data() {
		return {
			type:1,//页面类型 1充值提现   2收入提现   3佣金提现
			prompt:'<p>全天24小时实时处理提现；</p><p>银行正常工作时间内提现审核通过后，一般到帐银行卡时间为2---3小时左右；</p><p>提现单日总限额为：10000元；</p><p>如果有任何疑问请随时咨询在线客服或致电服务热线400-080-3000；</p>',
			amount:0,//可提现金额
			poundage:0,//提现收费比例
			title:"可用充值提现",//页面title
			bankCard:[],//银行卡列表
			isClose:false,//是否展示关闭按钮
			code:"TCTXWXTS",//温馨提示的code码		
			orderAmount:'',//提现金额
			bizType:"withdrawals",//平台类型
			tradePswd:"",//交易密码
			cardId:"",//银行卡id
			client:"wx",//提现渠道
			bankCardNumber:'',//卡号
			bankCardName:"",//开户行
			
			minAmount:"",//充值最小提现金额
			feeChangeAmount:"",//提现手续费计算变更金额分割线
			feeFixedAmount:"",//同城提现固定手续费
			withdrawLimit:'',//账户提现手续费上线
		}
	},
	components: {
		itemCell,
		formInput,
		comWarmPrompt
	},
	activated() {
		this.orderAmount='';//提现金额
		this.tradePswd="";//交易密码
		this.isClose=false;//是否展示关闭按钮
		if(this.$store.state.bankCardId){
			this.cardId=this.$store.state.bankCardId;//银行卡id
			this.bankCardNumber=this.$store.state.bankCardNo;//银行卡号
			this.bankCardName=this.$store.state.bankCardName;//开户行
		}else{
			this.getBankCardFn();//获取银行卡信息
		}
		this.type=this.$route.query.type;//获取地址栏参数
		this.pageType(this.type);//可用提现金额
		this.getQualifyResult();//获取用户是否实名认证
		if(this.type==1){//充值提现 
			fetchProfileDetail('withdraw_fee_change_amount').then(res=>{//获取提现手续费计算变更金额分割线
				if(res.status){
					this.feeChangeAmount=res.data.sysProfileVo.value||0;//提现手续费计算变更金额分割线
				}
			});
			fetchProfileDetail('withdraw_fee_fixed_amount').then(res=>{//同城提现固定手续费
				if(res.status){
					this.feeFixedAmount=res.data.sysProfileVo.value||0;//同城提现固定手续费
				}
			});
		}else if(this.type==2){//收入提现
			fetchProfileDetail('tc_income_change_amount').then(res=>{//获取提现手续费计算变更金额分割线
				if(res.status){
					this.feeChangeAmount=res.data.sysProfileVo.value||0;//提现手续费计算变更金额分割线
				}
			});
			fetchProfileDetail('tc_income_fixed_amount').then(res=>{//同城提现固定手续费
				if(res.status){
					this.feeFixedAmount=res.data.sysProfileVo.value||0;//同城提现固定手续费
				}
			});
		}else if(this.type==3){//佣金提现
			fetchProfileDetail('tc_brokerage_change_amount').then(res=>{//获取提现手续费计算变更金额分割线
				if(res.status){
					this.feeChangeAmount=res.data.sysProfileVo.value||0;//提现手续费计算变更金额分割线
				}
			});
			fetchProfileDetail('tc_brokerage_fixed_amount').then(res=>{//同城提现固定手续费
				if(res.status){
					this.feeFixedAmount=res.data.sysProfileVo.value||0;//同城提现固定手续费
				}
			});
		}
	},
	mounted(){
		fetchProfileDetail('min_recharge_amount').then(res=>{//获取 最小提现金额
			if(res.status){
				this.minAmount=res.data.sysProfileVo.value||0;//最小提现金额
			}
		});
		fetchProfileDetail('withdraw_limit').then(res=>{//账户提现手续费上线
			if(res.status){
				this.withdrawLimit=res.data.sysProfileVo.value||0;//账户提现手续费上线
			}
		});
	},
	computed:{
    	//是否能点击提现按钮
    	btnAbled:function(){
			if(!this.bankCardNumber){
				return false;
			}
			if(!this.cardId){
				return false;
			}
    		if(!this.orderAmount){
    			return false;
    		}
    		if(!this.tradePswd){
    			return false;
    		}
    		if(this.amount<parseFloat(this.minAmount)){
    			return false;
    		}
    		return true;
    	},
    	poundageMoney(){ //参与 计算  手续费    
    		if(parseFloat(this.orderAmount||0)==0){//默认0
    			  return 0;
    		}else if(parseFloat(this.orderAmount||0) >parseFloat(this.feeChangeAmount)){
    			return this.orderAmount*parseFloat(this.poundage)/100;
    		}else{
    			return this.feeFixedAmount;
    		}
	    },
	    poundageValue(){  //页面展示手续费
	    	if(parseFloat(this.orderAmount||0)==0){//默认0
    			  return 0+"元";
    		}else if(parseFloat(this.orderAmount||0)>parseFloat(this.feeChangeAmount)){
    			return this.poundage;
    		}else{
    			return this.feeFixedAmount+"元";
    		}
	    }
    },
    watch: {
	    orderAmount(cur) { //提现金额 不能大于  可提现金额
	    	this.$nextTick(()=>{
	            //替换非数字和点为空
	    		this.orderAmount = cur.toString().replace(/[^\d.]*/g,"");
	            //替换多. 保留2位小数
	            this.orderAmount = cur.replace(/^\D*([1-9]\d*\.?\d{0,2})?.*$/,'$1')
		        if (Number(cur) > Number(this.amount)) {
		            this.orderAmount = this.amount;
		        }
	    	})
	    }
	},
	methods: {
		
		getQualifyResult() {//获取个人认证状态
	        fetchMemberGetMemberInfo().then(res => {
	            if (res.status) {
	                let data = res.data.memberRealName;
			        if(!data || data.checkStatus=="auth_pass"){
	                	this.$alert({
					        confirmBtn: '立即实名认证',
					        content:"<div><h3 class='f30'>请您先实名认证</h3><p class='f26 c_888 mt10'>为保证交易安全请您先实名认证</p></div>",
					        confirm: () => {
					        	if (!data) {
					        		this.$router.push('/personApprove')
					        	}else if(data.checkStatus=="auth_pass"){
					        		this.$router.push('/faceApprove')
					        	}
					            
					        },
					        close:()=>{
					        	this.$router.go(-1);
					        }
			           })
	                }
	            }
	        })
	    },
		getBankCardFn(){//银行卡列表
			fetchBankList().then(res=>{
				if(res.status){
					this.bankCard=res.data.list||[];
					if(this.bankCard.length){
						this.cardId=res.data.bank.id;//银行卡id
						this.bankCardNumber=res.data.bank.cardNo;//银行卡号
						this.bankCardName=res.data.bank.bankName;//开户行
					}
				}
			})
		},
		clickRightFn(){//右上角跳转链接
			this.$router.push({ path: '/wallet/withdrawRecord', query: { type: this.type }})
		},
		pageType(type){//区分页面类型函数
			this.amount=0;
			if(type==1){//1充值提现 
				this.title="可用充值"
				this.getRwithdraw();
			}else if(type==2){//2收入提现
				this.title="可用收入"
				this.getEwithdraw();
			}else if(type==3){//3佣金提现
				this.title="可用佣金"
				this.getHwithdraw();
			}
		},
		getRwithdraw(){//可用充值提现金额
			fetchRwithdrawMoney().then(res=>{
				if(res.status){
		        	this.amount=res.data.amount;
		        	this.poundage=res.data.poundage;
		        }
			})
		},
		getEwithdraw(){//可用收入提现金额
			fetchEwithdrawMoney().then(res=>{
				if(res.status){
		        	this.amount=res.data.amount;
		        	this.poundage=res.data.poundage;
		        }
			})
		},
		getHwithdraw(){//可用佣金提现金额
			fetchHwithdrawMoney().then(res=>{
				if(res.status){
		        	this.amount=res.data.amount;
		        	this.poundage=res.data.poundage;
		        	//读取当前账号是否为合伙人
//			    	fetchUserType().then(res=>{
//			    		if(res.status&&res.data.partnerLevelCode){
//			    			this.poundage=0; //合伙人提现手续费 为0
//			    		}
//			    	})
			    }
			})
			
			
			
		},
		//检测输入提现金额
		checkWithdrawMoney(){
			//提现金额
			var num=parseFloat(this.orderAmount);
	        if(num <= 0){
		        alertTip("请输入正确的提现金额");
		        return;
	        }
	        if(parseFloat(this.minAmount)>num){
				alertTip("您输入的提现金额小于最小提现金额");
				this.orderAmount="";
				return;
			}
			if(parseFloat(this.amount)<num){
				this.orderAmount=this.amount;
				return;
			}
		    this.isClose=true;
		},
		//提现
		withdrawFn(){
			if(Number(this.amount) < parseFloat(this.minAmount)){
				this.$alert({
					confirmBtn:"确定",
					content:"<div><h3 class='f30'>您的可提现金额低于"+this.minAmount+"元，无法提现</h3></div>",
					confirm:()=>{
		               this.$router.go(-1);
					}
				})
            }
			if(this.btnAbled){
				var data={
					orderAmount:this.orderAmount,//提现金额
					bizType:this.bizType,//平台类型
					tradePswd:this.tradePswd,//交易密码
					submitToken:true,
					cardId:this.cardId,//银行卡id
					client:this.client,//提现渠道
				}
				fetchGetMemberInfo().then(res=>{
			        if(res.status){
				        if(res.data.is_tradePswd){
				            if(this.type==1){//1可用充值提现操作
								fetchWithdrawRecharge(data).then(res=>{
									if(res.status){
										alertTip("信息提交成功，等待后台审核！",()=>{
											//页面跳转
											this.$router.replace("/wallet/withdrawRecord?type=1");
										});
									}else{
										alertTip(res.msg);
									}
								})
							}else if(this.type==2){//2可用收入提现操作
								fetchWithdrawEarning(data).then(res=>{
									if(res.status){
										alertTip("信息提交成功，等待后台审核！",()=>{
											//页面跳转
											this.$router.replace("/wallet/withdrawRecord?type=2");
										});
									}else{
										alertTip(res.msg);
									}
								})
							}else if(this.type==3){//3可用佣金提现操作
								fetchWithdrawHire(data).then(res=>{
									if(res.status){
										alertTip("信息提交成功，等待后台审核！",()=>{
											//页面跳转
											this.$router.replace("/wallet/withdrawRecord?type=3");
										});
									}else{
										alertTip(res.msg);
									}
								})
							}
				        }else{
			      			this.$alert({
								confirmBtn:"确定",
								content:"<div><h3 class='f30'>您还未设置支付密码，是否前往设置?</h3></div>",
								confirm:()=>{
					               this.$router.push('/setPayPwd');
								}
							})
				        }
			        }
		      	})
				
			}else{
				return;
			}
		}
	}
}
</script>

<style lang="less">
	.c_withdraw_fee{
		padding:0.2rem 0.3rem;
		font-size:0.26rem;
		color:#333;
	}
	.c_input_withdraw{
		display:flex;
		border-bottom:1px solid #e8e8e8;
		margin-left:0.3rem;
		width:7.2rem;
		height:1rem;
		align-items: center;
		span{
			font-size:0.44rem;
		}
		input{
			height:100%;
			width:7rem;
			font-size:0.54rem;
		}
	}
	.c_usable_withdraw{
		height:0.7rem;
		display:flex;
		border-bottom:1px solid #e8e8e8;
		margin-left:0.3rem;
		width:7.2rem;
		padding-right:0.3rem;
		align-items: center;
		font-size:0.26rem;
		justify-content: space-between;
	}
</style>
