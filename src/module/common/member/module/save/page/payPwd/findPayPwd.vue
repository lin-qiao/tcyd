<!-- 找回支付密码 -->
<template lang="html">
    <div class="screen bg_gray">
        <top title="找回支付密码" :isReturn="false"></top>
        <div class="form">
            <formInput
                title="已绑定手机："
                disabled
                v-model="mobile"
                :align="true">
            </formInput>
            <formInput
                type="code"
                title="验证码："
                :align="true" v-model.trim="validCode" maxlength="6" :number="true" @getCode="getCode">
            </formInput>
            <formInput
                placeholder="请输入支付密码"
                title="支付密码："
                :align="true" v-model.trim="pwd" inputType="password">
            </formInput>
            <formInput
                class="border_none"
                placeholder="请再次输入支付密码"
                title="确认支付密码："
                :align="true" v-model.trim="newPwd" inputType="password">
            </formInput>
        </div>
        <div class="btn_block" @click="retrievePwd()">确定</div>
    </div>
</template>

<script>
import formInput from 'src/components/formItem/formInput';
import {
    fetchUpdatePswd,//找回密码
    fetchGetMemberInfo,//获取安全中心信息
    fetchSendCode//找回密码发送验证码
} from '../../service/getData'
import {REGEX} from 'src/config/env'
export default {
    data(){
        return{
            validCode:'',//验证码
            pwd:'',//新密码
            newPwd:'',//再次新密码
            mobile:'',//已绑定手机号
        }
    },
    components:{
        formInput
    },
    activated(){
        this.getMemberInfo()//获取用户安全中心信息
        this.pwd = "";
        this.newPwd = "";
        this.validCode = "";
    },
    methods:{
        //获取用户安全中心信息
		getMemberInfo(){
			//服务器名称 DDT_TC_MEMBER_INFO
			fetchGetMemberInfo().then(res => {
				if(res.status){
					this.mobile=res.data.mobile//已绑定手机号
				}else{
					alertTip(res.msg);
				}
			});
		},
        //发送验证码
        getCode(callback){
            //服务器名称 DDT_TC_MEMBER_GETVALIDCODE_SESSION
            fetchSendCode('ddt','tradeCode').then(res => {
                callback(res);
            });
        },
        //找回支付密码
        retrievePwd(){
            if(!this.validCode){
                alertTip("请输入验证码");
                return
            }
            if(!this.pwd) {
                alertTip("请输入新的支付密码");
                return
            }
            if(!REGEX.payPwd.regex.test(this.pwd)) {
                alertTip(REGEX.payPwd.msg);
                return;
            }
            if(!this.newPwd) {
                alertTip("请再次输入新的支付密码");
                return
            }
            //两次新密码验证
            if(this.pwd!=this.newPwd){
                alertTip("两次密码不一致!");
                return 
            }
            //传递参数
            let param={
                newPswd:this.pwd,//新密码
                againNewPswd:this.newPwd,//再次输入密码
                submitToken:true,//token
                validCode:this.validCode//验证码
            }
            //服务器名称 DDT_TC_MEMBER_UPDATETRADEPSWD
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
