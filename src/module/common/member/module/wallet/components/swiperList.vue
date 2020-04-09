<!--收入统计-->
<template lang="html">
    <div class="swiper-container c_wallet_swiper" id="J_un_classify" v-if="generalList.length">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
            	<a href="javascript:void(0);" v-for="(item,i) in generalList" v-if="i<5">
					<img :src="item.image|imgUrl" />
				    {{item.title}}
				</a>
            </div>
            <div class="swiper-slide">
            	<a href="javascript:void(0);" v-for="(item,i) in generalList" v-if="generalList.length>5&&i>=5">
					<img :src="item.image|imgUrl" />
				    {{item.title}}
				</a>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
	import {fetchGeneralImage} from 'src/service/getData'
export default {
	data(){
		return{
			generalList:[],//图片列表
			listLength:0,//列表长度
		}
	},
    props:{
        code:{  //类型
            type:String,
            default:'MY_BROKERAGE_PROJECT',//可用佣金
        }
    },
    methods:{
    	getGeneralList(code){
    		fetchGeneralImage(code).then(res=>{
    			if(res.status){
    				this.generalList=res.data.list;
    				this.listLength=Math.ceil(this.generalList.length/5);//列表长度
    				this.$nextTick(()=>{
						new Swiper('#J_un_classify', {
							pagination: '.swiper-pagination',
					        slidesPerView: 1,
					        paginationClickable: true,
					        spaceBetween: 0
						});
					})
    			}
    		});
    	}
    },
    mounted() {
    	this.generalList=[];
		this.getGeneralList(this.code);
	}
}
</script>

<style lang="less">
    .c_wallet_swiper {
        width: 100%;
        height: 1.62rem;
        padding-top:0.14rem;
        .swiper-slide {
	        text-align: center;
	        font-size:0.26rem;
		    color:#333;
	        display: -webkit-box;
	        display: -ms-flexbox;
	        display: -webkit-flex;
	        display: flex;
	        -webkit-box-pack: center;
	        -ms-flex-pack: center;
	        -webkit-justify-content: space-around;
	        justify-content: space-around;
	        -webkit-box-align: center;
	        -ms-flex-align: center;
	        img{
	             width:0.5rem;
	             height:0.5rem;
	             display:block;
	             margin:0 auto 0.1rem;
	        }
	    }
	    .swiper-pagination-bullet-active{
	    	background: #ff4b48 !important;
	    }
    }
    
    
</style>
