<template>
<div>
    <div class="code_bg" v-show="isShow"></div>
    <div class="code" v-show="isShow">
        <p class="f36 c_333 text_center mt240 font-weight">长按指纹识别二维码，关注同城约单</p>
        <p class="f28 c_888 text_center mt30">关注后接收消息通知</p>
        <p class="f28 c_888 text_center mt10">了解更多省钱赚钱之道</p>
        <img :src="codeUrl" alt=""  class="qr_code">
        <canvas id="myCanvas"></canvas>
    </div>
</div>
    
</template>
<script>
import {
    fetchWXUserInfo,//根据openid 获取用户信息
	fetchNodeCreateTmpQRTicket, //生成临时二维码
	fetchWechatNodeLogin
} from 'src/service/getDataWechat'

export default {
    data () {
        return {
            isShow: false,
            codeUrl: ""
        }
    },
    props: {
        query: {  //页面参数 t0 t1 t2 t3 等，用于判断用户在站点那个位置关注了公众号，微信后台对应链接给客户
            default: ""
        }
    },
    mounted () {
        this.newImage(); //合成图片
    },
    watch: {
        codeUrl: function () {
            this.newImage(); //合成图片
        }
    },
    methods: {
        createWechatCode () {
            if (this.$store.state.wechatSystem) { //微信环境
            	//使用 vuex  openid 获取微信用户信息，用于判断是否关注了公众号
                if(this.$store.state.subscribe==1){ //已关注公众号，直接返回
                	 this.$emit("nextFn");
                	 return;
                }
                //未关注公众号，动态生成二维码 引导用户关注
                fetchNodeCreateTmpQRTicket(this.query).then(res=>{
                    //弹窗关注公众号 弹窗	
                    let qrUrl='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+encodeURI(res.data.ticket);
                    this.codeUrl = qrUrl; //二维码图片地址
                    this.isShow = true; //弹窗显示
                })
               
            }else{
            	this.$emit("nextFn");
            }
        },
        //canvas合成图片
		newImage () {
			try{
				var imageBox = document.getElementById('qrcodeImg');
				var canvas = document.getElementById("myCanvas");
	            var ctx = canvas.getContext('2d');
	            ctx.fillStyle = "#fff";
	            ctx.fillRect(0,0,400,200);
	            //画大图
	            var img2 = new Image();
	            img2.src = require('src/images/finger_code.png');
	            img2.onload = () => {
	            	ctx.drawImage(img2,40,10,230,100) //画背景
	            	let img=new Image();
	            	img.src=this.codeUrl
	            	img.crossOrigin = 'anonymous'; 
	            	img.onload=()=>{
	            		ctx.drawImage(img,45,10,100,100) //画二维码
	            	}
	            	
	            	//imageBox.src = canvas.toDataURL("image/png");
	            }
			}catch(err){
				console.log(err.message)
			}
            
           
           
		}
    }
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.mt240{
    margin-top: 2.4rem;
}
.font-weight{
    font-weight: bold;
}
.code_bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 23;
}
.code{
    background: url('../images/qrcode_bg.png') no-repeat center center;
    background-size: cover;
    width: 6.1rem;
    height: 6.81rem;
    position: fixed;
    left: 0.7rem;
    top: 2.1rem;
    z-index: 24;
    overflow: hidden;
    img{
        width: 100%;
        opacity: 0;
        position: inherit;
    }
}
</style>

