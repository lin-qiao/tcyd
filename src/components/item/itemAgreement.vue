<template lang="html">
    <div class="item_agreement">
        <p class="flex flex_center plr30 ptb10" :class="{justify_center:isCenter}" @click="check = !check">
            <i class="iconfont icon-unselected c_999 mr10 f30" v-if="!check"></i>
            <i class="iconfont icon-xuanzhong3 c_main mr10 f30" v-if="check"></i> <span>{{text}}</span>
            <a class="c_main f24" href="javascript:void(0)" @click.stop.prevent="visible = true">《{{name}}》</a>
        </p>
        <div class="pop_bj" v-if="visible" @click="visible = false"></div>

        <transition name="page-slide-bottom">
            <div class="protocol bg_fff" v-if="visible">
            	<div class="flex flex_center justify_between protocol_title plr30">
            		<h2 class="pro_tit f26">用户协议</h2>
                 	<i class="iconfont icon-close1 f40" @click="visible = false"></i>
            	</div>
                <div class="pro_content pad30 f24" v-html="agreementContent">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {fetchTextDetail} from 'src/service/getData'
export default {
    data(){
        return{
            check:true,//是否勾选协议
            visible:false,  //协议显示隐藏
            agreementContent:''//协议内容
        }
    },
    props:{
    	name:{
    		type:String,
            default:'同城约单用户协议'
    	},
        value:{
            type:Boolean,
            default:false,
        },
    	isCenter:{//是否居中显示
    		default:false
    	},
        text:{
            type:String,
            default:'我同意'
        }
    },
    mounted(){
        if(typeof(this.value) == 'boolean'){
            this.check = this.value;
        }
        fetchTextDetail('DDTTCYHXY').then(res=>{
        	this.agreementContent = res.data.detail;
        })
    },
    watch:{
        value(val){
            if(typeof(val) == 'boolean'){
                this.check = val;
            }
        },
        check(val){
            this.$emit('input',val)
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.pop_bj{
    position: fixed;
    z-index: 10;
    width:7.5rem;
	margin-left:-3.75rem;
	left: 50%;
    top:0;
    bottom: 0;
    background: rgba(0,0,0,.6);
}
.protocol{
	position: fixed;
	z-index: 11;
	bottom: 0;
	width:7.5rem;
	margin-left:-3.75rem;
	left: 50%;
	height: 5rem;
	.box_shadow(@shadow:0 0px 0.2rem rgba(0, 0, 0, 0.1));
}
.protocol_title{
	height: 0.8rem;
	.border-b;
}
.pro_content{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0.3rem;
	top: 0.8rem;
	line-height: 1.5em;
	.overflow_scroll;
}
</style>
