<template lang="html">
    <div class="share_bg" v-show="visible" @click="visible = false">
        <img :src="shareImg" class="share_img" />
    </div>
</template>

<script>
import { wxShare } from 'src/config/mUtils';
export default {
    data(){
        return{
            visible:false,
        }
    },
    props:{
        shareImg:{  //弹窗图片
            default:require('src/images/share.png')
        },
        title:{   //分享标题
            type:String,
            default:''
        },
        desc:{  //分享描述
            type:String,
            default:''
        },
        link:{  //分享链接
            type:String,
            default:''
        },
        img:{   //分享图片
            type:String,
            default:''
        }

    },
   
    methods:{
        show(){
            this.visible = true;
        },
        showAndShare(){ //show  加分享
        	  wxShare("",this.title,this.desc,this.img);
            this.visible = true;
        },
        share(){
            wxShare(this.link,this.title,this.desc,this.img);
            this.visible = true;
        }
    }
}
</script>

<style lang="less" scoped="scoped">
.share_bg{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
    z-index: 1000;
    .share_img {
      position: fixed;
      right: 0.1rem;
      top: 0;
      z-index: 101;
      width: 7rem;
    }
}
</style>
