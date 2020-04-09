<!-- 修改登录密码 -->
<template lang="html">
    <div class="screen bg_gray">
        <top title="修改登录密码" :isReturn="false"></top>
        <div class="form">
            <formInput
                title="原密码："
                placeholder="请输入原密码"
                :align="true"  v-model.trim="pwd" inputType="password">
            </formInput>
            <formInput
                placeholder="请输入新密码"
                title="新密码："
                :align="true" v-model.trim="newPwd" inputType="password">
            </formInput>
            <formInput
                class="border_none"
                placeholder="请再次输入新密码"
                title="新密码："
                :align="true" v-model.trim="newPwdTwo" inputType="password">
            </formInput>
        </div>
        <a class="btn_block" href="javascript:void(0);" @click="resetPwd()">确定</a>
    </div>
</template>

<script>
import formInput from 'src/components/formItem/formInput';
import {
	fetchResetPwd  //修改登录密码
} from '../../service/getData'
import {REGEX} from 'src/config/env'
export default {
    data(){
        return{
            pwd:'',//旧密码
            newPwd:'',//新密码
            newPwdTwo:'',//再次新密码
        }
    },
    components:{
        formInput
    },
    activated(){
        this.pwd = "";
        this.newPwd = "";
        this.newPwdTwo = "";
    },
    methods:{
        //修改登录密码
        resetPwd(){
            if(!this.pwd) {
                alertTip('请输入原密码');
                return
            }
            if(!REGEX.loginPwd.regex.test(this.pwd)) {
                alertTip(REGEX.loginPwd.msg);
                return;
            }
            if(!this.newPwd) {
                alertTip('请输入新密码');
                return
            }
            if(!REGEX.loginPwd.regex.test(this.newPwd)) {
                alertTip(REGEX.loginPwd.msg);
                return;
            }
            if(!this.newPwdTwo) {
                alertTip('请再次输入新密码');
                return
            }
            //两次新密码验证
            if(this.newPwd!=this.newPwdTwo){
                alertTip("两次密码不一致!");
                return 
            }
            //服务器名称 DDT_TC_MEMBER_RESETPSWD
            fetchResetPwd(this.pwd,this.newPwd).then(res => {
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
