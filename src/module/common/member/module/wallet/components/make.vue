<!--收入统计-->
<template lang="html">
    <div class="hire_box">
    	<div class="hire_type" :class="{mr26:!i}" v-for="(el,i) in generalList">
    		<a :href="el.url">
		    	<div class="hire_title">
		    		<b>{{el.title}}</b>
		    		<span>{{el.subtitle}}</span>
		    	</div>
		    	<img :src="el.image|imgUrl" />
	    	</a>
    	</div>
    </div>
</template>

<script>
	import {fetchGeneralImage} from 'src/service/getData'
export default {
	data(){
		return{
			generalList:[],//图片列表
		}
	},
    props:{
        
    },
    mounted(){
    	this.getGeneralList();
	},
    methods:{
    	getGeneralList(){
    		fetchGeneralImage('MY_BROKERAGE_GET_AD').then(res=>{
    			if(res.status){
    				this.generalList=res.data.list;
    			}
    		});
    	}
    }
   
}
</script>

<style lang="less" scoped>
    .hire_box{
    	display:flex;
    	padding:0.24rem .3rem 0.4rem;
        .hire_type a{
        	width:3.3rem;
        	height:1.6rem;
        	border-radius: 0.04rem;
        	display:flex;
        	justify-content: center;
        	align-items: center;
        	-webkit-box-shadow: 0 0rem 0.2rem rgba(241,241,241,0.8);
            box-shadow: 0 0rem 0.2rem rgba(241,241,241,0.8);
        	b{
        		display:block;
        		font-size:0.26rem;
        		font-weight:bold;
        		margin-bottom:0.1rem;
        		line-height:1;
        	}
        	span{
        		font-size:0.22rem;
        		color:#999;
        		line-height:1;
        	}
        	img{
        		width:1.02rem;
        		height: 1.02rem;
        		margin-left:0.26rem;
        	}
        }
    }
    
    
</style>
