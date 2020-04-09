<!--收入统计-->
<template lang="html">
   <div class="kindInfo_box">
   	    <!--<div class="text_center">
   	   	    <span class="f24 mb30">{{title}}</span>
   	   	    <em class="f48">{{money}}</em>
   	    </div>
   	    <b class="c_midline"></b>-->
   	    <div class="text_center">
   	   	    <span class="f24 mb30">{{usableTitle}}</span>
   	   	    <em class="f48">{{usable}}</em>
   	    </div>
   </div>
</template>

<script>
export default {
    props:{
        title:{  //标题
            type:String,
            default:'',
        },
        money:{//金额
        	default:''
        },
        usable:{//可用金额
        	default:''
        },
        usableTitle:{//可用的标题
        	type:String,
            default:'',
        }
    },
    methods:{
    }
}
</script>

<style lang="less" scoped>
    .kindInfo_box{
    	width:6.9rem;
    	height:1.96rem;
    	margin:0.3rem auto 0.1rem; 
    	background:url(../images/my_bg.png) no-repeat center 0;
    	background-size:100%;
    	color:#fff;
    	display:flex;
    	align-items: center;
    	justify-content: space-around;
    	.text_center{
    		width:50%;
    	}
    	span{
    		display:block;
    	}
    }
    .c_midline{
		width:1px;
		height:0.4rem;
		background: #ff9f96;
	}
</style>
