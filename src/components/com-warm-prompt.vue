<!--温馨提示-->
<template>
	<!--<div class="warm_prompt">
	    <h3>温馨提示</h3>
	    <div class="warm_prompt_html" v-html="prompt">
	    	<p>全天24小时实时处理提现；</p>
	    	<p>银行正常工作时间内提现审核通过后，一般到帐银行卡时间为2---3小时左右；</p>
	    	<p>提现单日总限额为：10000元；</p>
	    	<p>如果有任何疑问请随时咨询在线客服或致电服务热线400-080-3000；</p>
	    </div>
    </div>-->
    <div class="fail_hint pb121 fail_con">
		<div class="fail_tit"><span>温馨提示</span></div>
		<div v-html="prompt"></div>
	</div>
    
    
    
</template>

<script>
//温馨提示
import {fetchTextDetail} from '../service/getData';
export default {
    data(){
        return{
        	prompt:"温馨提示"
        }
    },
    mounted(){
    	//根据父级 页面code 值 修改
    	if(!this.code){ //code 码为空
    		this.prompt=this.innerHtml;
    		return;
    	}
    	fetchTextDetail(this.code).then(res=>{
    		this.prompt=res.data.detail;
    	})
    },
    props: {
        code:{
        	default:""
        },
        innerHtml:''
    }
}
</script>

<style lang="less">
@import (reference) '~src/style/all.less';
.warm_prompt{
	border-top:1px solid #dbdbdb;
	position:relative;
	margin-top:0.2rem;
	h3{
		width:1.44rem;
		position:absolute;
		top:-0.2rem;
		left:50%;
		margin-left:-0.72rem;
		font-size:0.26rem;
		color:#666666;
		background: #f5f5f5;
		text-align: center;
	}
	}
.warm_prompt_html{
	padding:0.3rem;
		p{
			line-height:0.5rem;
			font-size:0.26rem;
			color:#777;
		}
		p::before{
			width:0.12rem;
			height:0.12rem;
			background: #ff4c49;
			border-radius:50%;
			content:"";
			display:inline-block;
			margin-right:0.1rem;
		}
	}
.fail_con{
    padding: .2rem .3rem;
    color: #666;
    line-height: .4rem;
    font-size: .26rem;
    li{
        position: relative;
        padding-left: .2rem;
    }
    li::before{
        content: '';
        display: block;
        width: .14rem;
        height: .14rem;
        background: @color;
        border-radius: 50%;
        position: absolute;
        top:.13rem;
        left: 0;
    }
}	
	
	
	
.fail_hint{
	background: @bg_color;
	.fail_tit{
		height: .8rem;
		position: relative;
		font-size: .26rem;
		text-align: center;
		span{
			display: inline-block;
			height: 100%;
			line-height: .8rem;
			padding: 0 .25rem;
			background: @bg_color;
			position: relative;
			z-index: 1;
		}
		&::after{
			display: block;
			width: 100%;
			height: 1px;
			content: '';
			position: absolute;
			top:0;
			bottom: 0;
			margin: auto;
			background-color: @line_color;
		}
	}
}
</style>
