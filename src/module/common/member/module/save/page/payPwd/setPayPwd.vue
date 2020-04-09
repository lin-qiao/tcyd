<!-- 设置支付密码 -->
<template lang="html">
    <div class="screen bg_gray">
        <top title="支付密码" :isReturn="false"></top>
        <p class="p1">资金交易，提现需要验证支付密码</p>
        <div class="form">
            <formInput
                title="支付密码："
                placeholder="请输入支付密码"
                :align="true" v-model.trim="pwd" inputType="password">
            </formInput>
            <formInput
                class="border_none"
                title="确认支付密码："
                placeholder="请再次输入支付密码"
                :align="true" v-model.trim="newPwd" inputType="password">
            </formInput>
        </div>
        <div class="btn_block mt60" @click="setUpPwd()">确定</div>
    </div>
</template>

<script>
import formInput from 'src/components/formItem/formInput';
import {REGEX} from 'src/config/env'
import {
	fetchUpdatePswd  //设置支付密码
} from '../../service/getData'
export default {
    data(){
        return{
            pwd:'',//旧密码
            newPwd:'',//新密码
        }
    },
    components:{
        formInput
    },
    activated(){
        this.pwd = "";
        this.newPwd = "";
    },
    methods:{
        //设置支付密码
        setUpPwd(){
            if(!this.pwd){
                alertTip("请输入支付密码");
				return
            }
            if(!REGEX.payPwd.regex.test(this.pwd)) {
                alertTip(REGEX.payPwd.msg);
                return;
            }
            if(!this.newPwd){
                alertTip("请再次输入支付密码");
				return
            }
            //两次新密码验证
            if(this.pwd!=this.newPwd){
                alertTip("两次输入密码不一致");
                return 
            }
            let param={
                newPswd:this.pwd,//新密码
                againNewPswd:this.newPwd,//再次输入新密码
                submitToken:true//token
            }
            fetchUpdatePswd(param).then(res => {
                if(res.status){
                    sessionStorage.setItem('is_tradePswd',"Y");
                    alertTip('设置成功',()=>{
                       this.$router.go(-1);
                    });
                }else{
                    alertTip(res.msg);
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.p1{
    height: .7rem;
    line-height: .7rem;
    font-size: .26rem;
    color: #999;
    padding: 0 .3rem;
}
.form{
    background: #fff;
}
.border_none{
    border: none !important;
}
</style>
