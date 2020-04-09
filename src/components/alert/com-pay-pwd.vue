<template lang="html">
    <!--S 支付密码框-->
  	<div v-show="visible" class="layer_shadow">
        <section class="layer_box">
            <div class="layer_tit">交易密码</div>
            <i class="iconfont icon-close1" @click="visible=false"></i>
            <div class="layer_con">
            	<div class="layer_pay_pwd">
            	    <p>实际支付{{payMoney|number}}元</p>
            	    <input type="password" placeholder="请输入您的交易密码" v-model.trim="payPwd" maxlength="6"/>
            	    <router-link to="/findPayPwd">忘记密码？</router-link>
            	    <span class="btn" @click="handleConfirm">确定</span>
            	</div>
            </div>
        </section>
    </div>
</template>

<script>
import {REGEX} from 'src/config/env'
export default {
    data() {
	    return {
	        visible:false,
	        payPwd:'',
	    }
    },
    props:{
    	payMoney:{
    		default:0
    	}
    },
    methods: {
    	show(){
    		this.visible=true;
    	},
    	handleConfirm() {
            this.visible = false;
            this.$emit("getPayPwd",this.payPwd);
        }
    },
    watch:{
    	payPwd(cul){
    		if(!REGEX.patrn.regex.test(cul)) {
                this.payPwd='';
            }
    	}
    }
}
</script>

<style lang="less" scoped>
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
</style>
