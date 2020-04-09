<template lang="html">
    <div class="use_help">
        <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>公告</span>" v-if="$store.state.platform=='wx'"></top>
        <div class="collapse pl30">
	        <div class="collapse_item" v-for="item in list">
	            <router-link :to="{path:'/noticeDetail',query:{id:item.id}}" class="collapse_tit">
	                <span>{{item.title}}</span>
	                <i class="iconfont icon-arrow-right"></i>
	            </router-link>
	        </div>
	    </div>
    </div>
</template>

<script>
import {fetchNoticeList} from 'src/service/getData';	
export default {
    data(){
        return{
        	noticeCode:'DDTTCGG',//第二页=>公告code（接口参数）
            noticeType:'KBGG',   //第二页=>公告type（接口参数）
            list:[],             //公告列表
        }
    },
    mounted(){
    	fetchNoticeList(this.noticeCode,this.noticeType).then(res=>{//请求公告列表
    		this.list = res.data;
    	})
    }
}
</script>

<style lang="less" scoped>
    @import (reference) "~src/style/all.less";
    .collapse_item{
	    .collapse_tit{
	        .flex;
	        .flex_center;
	        .justify_between;
	        .f28;
	        line-height: .4rem;
	        padding: .25rem .3rem .25rem 0;
	        .border-b(@line_color);
	        span{
	            width: 6.33rem;
	        }
	        .iconfont{
	            transition:all .3s ease-out;
	            .f28;
	        }
	    }
    }
</style>
