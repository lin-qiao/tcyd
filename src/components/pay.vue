<template lang="html">
	<!--S 支付框-->
	<div>
		<div class="c_pay_popup">
			<mt-popup v-model="visible" position="bottom" popup-transition="popup-fade" :closeOnClickModal='false'>
				<div class="c_back_gauge">
					<div class="c_demandDetail_li">
						<span>选择支付方式</span>
						<i class="iconfont icon-close1 c_ccc f40" @click="close"></i>
					</div>
					<div class="c_demandDetail_li">
						<span>{{moneyName}}（ {{money}}元 ）</span>

					</div>
					<div class="c_demandDetail_li c_pay_list">
						<span>账户余额（ {{bursetotalMoney.usableBalance}}元 ）<img src="../images/yeIcon.png"/></span>
					</div>
					<!--<div class="c_demandDetail_li c_pay_list" @click="usableRechargechecked=!usableRechargechecked">
						<span>可用充值 {{bursetotalMoney.usableRecharge|number}} 元</span>
						<i class="iconfont icon-xzdg" v-bind:class="usableRechargechecked&&'c_main'"></i>
					</div>
					<div class="c_demandDetail_li c_pay_list" @click="usableIncomechecked=!usableIncomechecked">
						<span>可用收入 {{bursetotalMoney.usableIncome|number}} 元</span>
						<i class="iconfont icon-xzdg" v-bind:class="usableIncomechecked&&'c_main'"></i>
					</div>
					<div class="c_demandDetail_li c_pay_list" @click="usableBrokeragechecked=!usableBrokeragechecked">
						<span>可用佣金 {{bursetotalMoney.usableBrokerage|number}} 元</span>
						<i class="iconfont icon-xzdg" v-bind:class="usableBrokeragechecked&&'c_main'"></i>
					</div>-->
				</div>
				<div class="text_center mtb20">
					<router-link class="btn_border mlr20" to="/wallet/recharge">立即充值</router-link>
					<span class="btn mlr20" @click='submit'>立即支付</span></div>
			</mt-popup>
		</div>
		<!--E 支付框-->
		<!--S 余额不足-->
		<dialogBox cancelText="知道了" confrimText="去充值" @handleConfirm="$router.push('/wallet/recharge')" ref="dialogBox">
			<img class="dialog_img" src="../images/winIcon.png" alt="">
			<div class="layer_con flex_column">
				<p>约到Ta只差一步了</p>
				<p class="text_center mt25 c_666">支付诚意金后系统将通知到技能提供者。 诚意金可作为最终交易进行抵扣，如订单未成交，将退回您的同城账户</p>
				<p class="p3 c_main"><img src="../images/icon_dcbz.png" alt="">同城联合保险公司，为您的资金保驾护航</p>
			</div>
		</dialogBox>
		<!--E 余额不足-->
		<!--S 支付密码框-->
		<div v-show="isShowPwdDialog" class="layer_shadow">
			<section class="layer_box">
				<div class="layer_tit">交易密码</div>
				<i class="iconfont icon-close1" @click="isShowPwdDialog=false"></i>
				<div class="layer_con">
					<div class="layer_pay_pwd">
						<p>实际支付{{money|number}}元</p>
						<div class="pos_rel">
							<input :type="showPassword?'text':'password'" placeholder="请输入您的交易密码" v-model.trim="payPwd" maxlength="6" />
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
	</div>
</template>

<script>
	import dialogBox from 'src/components/alert/dialog' //对话框
	import { fetchWallet } from 'src/module/common/member/module/wallet/service/getData' //获取账户余额
	export default {
		data() {
			return {
				visible: false,
				usableRechargechecked: false, //按钮状态
				usableIncomechecked: false,
				usableBrokeragechecked: false,
				bursetotalMoney: {}, //账户信息
				isShowPwdDialog: false, //交易密码弹窗是否显示
				payPwd: "", //交易密码
				showPassword: false, //交易密码 是否加密
				withhold:''//支付方式
			}
		},
		props: {
			money: {
				type: String,
				default: 0
			},
			moneyName: {
				type: String,
				default: ''
			}
		},
		components: {
			dialogBox
		},
		watch: {
			payPwd: function(cur) { //支付密码只能输入数字
				this.payPwd = cur.replace(/\D+/g, '');
			}
		},
		activated() {
			fetchWallet().then(res => {
				if(res.code == '000') {
					this.bursetotalMoney = res.data || {};
				}
			})
			this.payPwd = "";
		},
		methods: {
			submit() {
				/*if(!this.usableRechargechecked &&
					!this.usableIncomechecked &&
					!this.usableBrokeragechecked
				) {
					return alertTip('请选择支付方式')
				}*/
				let withhold = 'balance,income,brokerage,encourage'
				/*let __earnestMoney = 0 //勾选总金额
				if(this.usableRechargechecked) {
					withhold += ',balance'
					__earnestMoney += parseInt(this.bursetotalMoney.usableRecharge)
				}
				if(this.usableIncomechecked) {
					withhold += ',income'
					__earnestMoney += parseInt(this.bursetotalMoney.usableIncome)
				}
				if(this.usableBrokeragechecked) {
					withhold += ',brokerage'
					__earnestMoney += parseInt(this.bursetotalMoney.usableBrokerage)
				}
				withhold = withhold.replace(',', '')*/
				this.withhold = withhold;
				this.visible = false;
				if(Number(this.bursetotalMoney.usableBalance) < Number(this.money)) {
					alertTip('余额不足请充值', () => {
						this.$refs.dialogBox.show()
					})
					return
				}
				this.close();
				if(this.money!=0){
					this.$confirm({
						cancelBtn:'取消',
						confirmBtn:'确定',
						layerImg:'',
						title:'提示',
						content:`
							<div class="flex flex_column pt30">
							    <p class="f30">您确定支付${this.money}元?</p>						    
							</div>
							`,
						confirm:() => {
							this.$parent.requirePublish(
								this.withhold, this.payPwd
							)
						}
					})	
				}else{
					this.$parent.requirePublish(
						this.withhold, this.payPwd
					)
				}
				/*if(!sessionStorage.is_tradePswd||sessionStorage.is_tradePswd=="N"){
					this.$confirm({
						cancelBtn:'取消',
						confirmBtn:'去设置',
						layerImg:require('src/images/account.png'),
						content:`
							<div class="flex flex_column">
							    <p class="f28">亲，您还没有设置交易密码?</p>						    
							</div>
							`,
						confirm:() => {
							this.$router.push("/setPayPwd?url="+this.$route.fullPath);
						}
					})	
					return;
				}else{
					this.isShowPwdDialog=true;//显示 交易密码弹窗	
				}*/
				/*this.$parent.requirePublish(
					this.withhold, this.payPwd
				)*/
			},
			confirmPayPwd() {
				this.isShowPwdDialog = false;
				this.$parent.requirePublish(
					this.withhold, this.payPwd
				)
			},
			show() {
				this.visible = true;
			},
			close() {
				this.visible = false;
			}
		}
	}
</script>

<style lang="less" scoped>
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
	
	.layer_pay_pwd {
		width: 5.18rem;
		p {
			text-align: left;
			padding: 0.1rem 0 0.26rem;
			font-size: 0.26rem;
			color: #666;
		}
		input {
			width: 5.18rem;
			height: 0.74rem;
			border: 1px solid #dbdbdb;
			border-radius: 0.04rem;
			padding: 0 0.22rem;
		}
		a {
			display: flex;
			justify-content: flex-end;
			font-size: 0.26rem;
			color: #777777;
			margin-top: 0.12rem;
		}
		.btn {
			width: 2.58rem;
			height: 0.66rem;
			display: block;
			margin: 0.2rem auto;
		}
	}
	
	.yl_show {
		position: absolute;
		right: 0.1rem;
		line-height: 0.75rem;
		top: 0;
	}
</style>
</style>