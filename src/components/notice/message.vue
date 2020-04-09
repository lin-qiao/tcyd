<template lang="html">
	<div class="message" v-if="show">
		<i class="iconfont icon-group45"></i>
		<!--<textScroll
		:dataList="list"
		scrollType="scroll-left-linear"
		></textScroll>-->
		<marquee behavior="scroll" scrollamount="4" v-html="prompt"></marquee>
		<i class="iconfont icon-guanbi" @click="show = false"></i>
	</div>
</template>

<script>
import {fetchTextDetail} from 'src/service/getData'//获取温馨提示
//import textScroll from '../effector/textScroll';
export default {
    data(){
        return {
            show:true,
            prompt:'',//提示信息
        }
    },
    props:{
        text:{
            type:String,
            default:''
        },
        code:{
        	default:""
        }
    },
    mounted(){
    	//根据父级 页面code 值 修改
    	if(!this.code){ //code 码为空
    		this.prompt=this.text;
    		return;
    	}
    	fetchTextDetail(this.code).then(res=>{
    		if(res.data){
	  			this.prompt = res.data.detail;
	  		}
    	})
    },
    /*computed:{
        list(){
            let arr = [];
            for (var i = 0; i < 3; i++) {
                arr.push(this.prompt);
            };
            return arr;
        }
    },
    components:{
        textScroll
    },*/

}
</script>

<style lang="less">
.message{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .8rem;
    background: #fff5e5;
    color: #ffa516;
    padding: 0 .3rem;
    .iconfont{
        font-size: .36rem;
    }
    .icon-guanbi{
        color: #cacaca;
    }
}
</style>
