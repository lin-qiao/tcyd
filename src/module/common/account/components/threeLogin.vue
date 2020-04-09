<!--弹窗-信息框-->
<template>
    <div class="yl_other" v-if="wechatSystem">
        <p class="yl_other_tit">其他登录方式</p>
        <ul class="yl_other_list">
            <li @click="wechatAutoLogin">
                <div class="yl_other_icon">
                    <i class="iconfont icon-weixin1 yl_green"></i>
                </div>
                <p>微信登录</p>
            </li>
        </ul>
    </div>
</template>

<script>
import {
    fetchThirdWechatLogin,
    fetchWechatLogin
} from '../service/getData' //第三方微信登陆接口
import {
    fetchWechatNodeLogin
} from 'src/service/getDataWeChat' //微信node接口
import {
    wechatSystem
} from 'src/config/env' //判断是否是微信uanj
export default {
    data() {
        return {
            wechatSystem: wechatSystem,
            isShow: this.$route.query.isShow
        }
    },
    props: {
        url: {
            default: window.location.href
        }
    },
    activated(){
        this.wechatAutoLogin()//微信授权登陆
    },
    methods: {
         wechatAutoLogin() {
         	if(!this.$store.state.wechatSystem){
         		return;
         	}
            //执行 大德通 微信授权登陆接口
            let data = {
                loginType: "wx",
                country: window.COUNTY,
                province: window.PROVINCE,
                city: window.CITY,
                openId: this.$store.state.openid
            }
            if(!this.$store.state.openid){
            	return;
            }
            fetchWechatLogin(data).then(res => {
                if (res.status) {
                    this.$router.replace(this.$route.query.url || sessionStorage.backUrl || '/collageAccount');
                }else{
                    this.$router.replace('/bindPhone');
                }
            })
        }
    }
}
</script>
