<!-- 修改支付密码 -->
<template lang="html">
    <div class="screen bg_gray">
        <top title="修改支付密码" :isReturn="false" right="找回密码" @clickRight="$router.replace('/findPayPwd')"></top>
        <div class="form">
            <formInput
                title="原支付密码："
                placeholder="请输入原支付密码"
                :align="true" v-model.trim="pwd" inputType="password">
            </formInput>
            <formInput
                placeholder="请输入新的支付密码"
                title="新支付密码："
                :align="true" v-model.trim="newPwd" inputType="password">
            </formInput>
            <formInput
                class="border_none"
                placeholder="请再次输入新的支付密码"
                title="确认新支付密码："
                :align="true" v-model.trim="againNewPwd" inputType="password">
            </formInput>
        </div>
        <div class="btn_block" @click="updatePswd()">确定</div>
    </div>
</template>

<script>
import formInput from 'src/components/formItem/formInput';
import {
	fetchUpdatePswd  //修改支付密码
} from '../../service/getData'
import {REGEX} from 'src/config/env'
export default {
    data(){
        return{
            pwd:'',//旧密码
            newPwd:'',//新密码
            againNewPwd:'',//再次新密码
        }
    },
    components:{
        formInput
    },
    activated(){
        this.pwd = "";
        this.newPwd = "";
        this.againNewPwd = "";
    },
    methods:{
        //修改支付密码
        updatePswd(){
            if(!this.pwd) {
                alertTip("请输入原支付密码");
                return
            }
            if(!REGEX.payPwd.regex.test(this.pwd)) {
                alertTip(REGEX.payPwd.msg);
                return;
            }
            if(!this.newPwd) {
                alertTip("请输入新的支付密码");
                return
            }
            if(!REGEX.payPwd.regex.test(this.newPwd)) {
                alertTip(REGEX.payPwd.msg);
                return;
            }
            if(!this.againNewPwd) {
                alertTip("请再次输入新的支付密码");
                return
            }
            //两次新密码验证
            if(this.newPwd!=this.againNewPwd){
                alertTip("两次输入密码不一致");
                return
            }
            //传递参数
            let param={
                pswd:this.pwd,//旧密码
                newPswd:this.newPwd,//新密码
                againNewPswd:this.againNewPwd,//再次输入新密码
                submitToken:true,//token
            }
            // 服务器名称DDT_TC_MEMBER_UPDATETRADEPSWD
            fetchUpdatePswd(param).then(res => {
                if(res.status){
                    alertTip(res.msg,()=>{
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
.form{
    background: #fff;
    margin: .2rem 0 .65rem;
}
.border_none{
    border:none !important;
}
</style>
