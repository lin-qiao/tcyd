<!-- 修改手机号 -->
<template lang="html">
    <div class="screen bg_gray">
        <top title="修改手机号" :isReturn="false"></top>
        <template v-if="steps == 1">
            <div class="form">
                <formInput
                    title="手机号："
                    :align="true"
                    :value="oldMobile"
                    maxlength="11"
                    disabled>
                </formInput>
                <formInput
                    class="border_none"
                    type="code"
                    title="验证码："
                    :align="true"
                    v-model="oldCode"
                    maxlength="6"
                    :number="true"
                    @getCode="getOldMobileCode"
                    :codeText="codeText">
                </formInput>
            </div>
            <!-- <p class="p2">忘记交易密码？</p> -->
            <div class="btn_block mt60" @click="checkOldMobileCode">下一步</div>
        </template>
        <template v-else>
            <div class="form mt20">
                <formInput
                    title="手机号："
                    placeholder="请输入新手机号"
                    :align="true"
                    maxlength="11"
                    v-model="newMobile">
                </formInput>
                <formInput
                    class="border_none"
                    type="code"
                    title="验证码："
                    :align="true"
                    maxlength="6"
                    :number="true"
                    v-model="newCode"
                    :codeText="codeText"
                    @getCode="getNewMobileCode">
                </formInput>
            </div>
            <div class="btn_block mt60" @click="checkNewMobileCode">确定</div>
        </template>
    </div>
</template>

<script>
import formInput from 'src/components/formItem/formInput';
import {REGEX} from 'src/config/env';
import {
    fetchGetOldMobileCode,  //获取旧手机验证码
    fetchCheckOldMobileCode, //校验旧手机验证码
    fetchGetNewMobileCode,   //获取新手机的验证码
    fetchCheckNewMobileCode,  //校验新手机的验证码并绑定
    fetchGetMemberInfo,//获取安全中心信息
} from '../../service/getData'
export default {
    data(){
        return{
            codeText:'获取验证码',  //获取验证码文字
            steps:1,  //步骤
            codeFlag:true,  //验证码点击
            time:120,    //验证码时间
            oldMobile:'',  //旧手机号
            oldCode:'',  //旧的手机验证码
            newMobile:'', //新手机号
            newCode:'',  //新验证码
            t:'',  //定时器
        }
    },
    mounted(){
        
    },
    activated(){
        clearInterval(this.t);
        Object.assign(this.$data, this.$options.data());
        this.getMemberInfo()//获取用户安全中心信息
    },
    components:{
        formInput
    },
    methods:{
        //获取用户安全中心信息
		getMemberInfo(){
			//服务器名称 DDT_TC_MEMBER_INFO
			fetchGetMemberInfo().then(res => {
				if(res.status){
					this.oldMobile=res.data.mobile//已绑定手机号
				}else{
					alertTip(res.msg);
				}
			});
		},
        // 获取旧的手机验证码
        getOldMobileCode(callback){
//          fetchGetOldMobileCode().then(this.getCodeCallback);
            fetchGetOldMobileCode().then(res=>{
            	callback(res);
            });
        },
        //校验旧的手机验证码
        checkOldMobileCode(){
            if(this.oldCode == ''){
                alertTip('请输入手机验证码');
                return;
            }
            fetchCheckOldMobileCode(this.oldCode).then(res => {
                if(res && res.status){
                    alertTip('验证成功',() => {
                        clearInterval(this.t);
                        this.steps = 2;
                        this.codeText = '获取验证码';
                        this.codeFlag = true;
                    })
                }else{
                    alertTip(res.msg)
                }
            })
        },
        //获取新的手机验证码
        getNewMobileCode(callback){
            if(this.newMobile == ''){
                alertTip('请输入新手机号');
                return;
            }
            if(!REGEX.mobile.regex.test(this.newMobile)){
                alertTip(REGEX.mobile.msg);
                return;
            }
//          fetchGetNewMobileCode(this.newMobile).then(this.getCodeCallback)
            fetchGetNewMobileCode(this.newMobile).then(res=>{
            	callback(res);
            })
        },
        //校验新的手机验证码
        checkNewMobileCode(){
            if(this.newMobile == ''){
                alertTip('请输入新手机号');
                return;
            }
            if(!REGEX.mobile.regex.test(this.newMobile)){
                alertTip(REGEX.mobile.msg);
                return;
            }
            if(this.newCode == ''){
                alertTip('请输入验证码');
                return;
            }
            fetchCheckNewMobileCode(this.newMobile,this.newCode).then(res => {
                if(res && res.status){
                    alertTip(res.msg,()=>{
                        this.$router.go(-1);
                    });
                }else{
                    alertTip(res.msg)
                }
            })
        },
        // 获取验证码回调
        getCodeCallback(res){
            this.codeFlag = false;
            if(res.status) {
                this.time = 120;
                alertTip(res.msg);
                this.t = setInterval(() => {
                    this.time--;
                    this.codeText = this.time + 's后重新发送';
                    if(this.time <= 0) {
                        clearInterval(this.t);
                        this.codeText = '获取验证码';
                        this.codeFlag = true;
                    }
                }, 1000)
            }
            else {
                alertTip(res.msg)
            }
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
.p2{
    height: .9rem;
    line-height: .9rem;
    text-align: right;
    font-size: .26rem;
    color: #0066cc;
    padding: 0 .3rem;
}
.form{
    background: #fff;
}
.border_none{
    border: none !important;
}
</style>
