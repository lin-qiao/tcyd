<!--弹窗-信息框-->
<template>
    <div>
		<div class="nodata_box">
       		<img v-bind:src="noDataImg" v-show="noDataImg">
       		<p class="nodata_font" v-html="notice"></p>
       	</div> 
	</div>
</template>

<script>
	import noDataImg from 'src/images/winIcon1.png';
    export default {
        props: {
        	noDataImg: {  // 默认图片
		    	default: noDataImg
		  	},
		  	notice: {   // 默认：暂无记录
			    default: '暂无数据哦~'
		  	},
        }
    }
</script>

<style scoped lang="less">
	.nodata_box{
		width:100%;
		text-align: center;
		padding:1.22rem 0 0.5rem;
		img{
			height: 2.59rem;
		}
	}
	.nodata_font{
		font-size: 0.28rem;
		color: #999;
		text-align: center;
		margin-top: 0.3rem;
	}
</style>
