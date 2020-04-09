<!-- 设置登录密码 -->
<template lang="html">
    <div class="screen bg_gray">
        <top title="登录密码" :isReturn="false"></top>
        <div class="form">
            <formInput
                title="密码"
                placeholder="请输入登录密码"
                v-model.trim="pwd" inputType="password">
            </formInput>
            <formInput
                placeholder="请再次输入登录密码"
                title="密码"
                v-model.trim="newPwd" inputType="password" noBorder="true">
            </formInput>
        </div>
        <a class="btn_block" href="javascript:void(0);" @click="setPwd()">保存</a>
    </div>
</template>

<script>
import formInput from 'src/components/formItem/formInput';
import {
    fetchInitPswd//初始化密码
} from '../../service/getData';
import {REGEX} from 'src/config/env'
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
        //设置登录密码
        setPwd(){
            if(!this.pwd) {
                alertTip('请输入登录密码');
                return
            }
            if(!REGEX.loginPwd.regex.test(this.pwd)) {
                alertTip(REGEX.loginPwd.msg);
                return;
            }
            if(!this.newPwd) {
                alertTip('请再次输入登录密码');
                return
            }
            if(!REGEX.loginPwd.regex.test(this.newPwd)) {
                alertTip(REGEX.loginPwd.msg);
                return;
            }
            //两次新密码验证
            if(this.pwd!=this.newPwd){
                alertTip("两次密码不一致!");
                return 
            }
            fetchInitPswd(this.pwd).then(res => {
                if(res.status){
                    alertTip('设置成功',()=>{
                        this.$router.go(-1);
                    });
                }else{
                    alertTip(res.msg);
                }
            })
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
