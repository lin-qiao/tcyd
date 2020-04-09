<!--弹窗-信息框-->
<template>
    <div class="title" v-if="$store.state.platform=='wx'">
        <a class="tit_icon left" @click="handleClickLeft" v-if="leftShow && !left">
            <i class="iconfont icon-arrow-left"></i>
            <span v-if="isReturn">返回</span>
        </a>
        <a class="tit_icon left" v-if="left" v-html="left" @click="handleClickLeft"></a>
        <div class="tit_font" v-html="title"></div>
        <a class="tit_icon right c_666" @click="handleClickRight" v-if="rightIcon||right">
            <div v-html="right"></div>
            <i class="iconfont" :class="rightIcon" v-if="rightIcon"></i>
        </a>
    </div>
</template>

<script>
import {getPlatform} from 'src/config/mUtils'	
	
export default {
    data(){
        return{
        
        }
    },
   
    props: {
        title: {  // 标题
            default: '标题'
        },
        rightIcon:{

        },
        left:{

        },
        right:{

        },
        leftShow:{//是否显示左侧返回箭头
        	default:true
        },
        isReturn:{//左侧是否显示 返回 字样
            default: true
        },
        url:{
            default:''
        }
    },
    methods: {
        handleClickRight(){
            this.$emit('clickRight');
        },
        handleClickLeft(){
            if(this.left){
                this.$emit('clickLeft');
            }else if(this.url){
                this.$router.push(this.url);
            }else{
	        	if(window.history.length<=1){//无历史记录
	        	    this.$router.push("/");
	        	}else{
	        		this.$router.go(-1);	
	        	}
               
               
            }
        }
    }
}
</script>

<style scoped>
</style>
