<template>
<div class="clearfix bg_gray">
	<top :title="title" :isReturn="false" class="zIndex"></top>
    <!--S 头部tab-->
    <!--<div class="l_index_tab swiper-container f30" id="J_tabSwiper">
        <ul class="swiper-wrapper">
            <li class="swiper-slide on">
                <a href="">全部</a>
            </li>
            <li class="swiper-slide">
                <a href="">同城</a>
            </li>
            <li class="swiper-slide">
                <a href="">众包</a>
            </li>
            <li class="swiper-slide">
                <a href="">借款</a>
            </li>
            <li class="swiper-slide on1">
                <a href="">风投谷</a>
            </li>
            <li class="swiper-slide on2">
                <a href="">无形资产</a>
            </li>
        </ul>
    </div>-->
    <!--E 头部tab-->
	<div class="z_container mt-20" v-if="list.length">
		<div class="z_logisticsItem bg_fff" v-for="(item,index) in list" :key="index" @click="detailUrl(item.id)">
	        <div class="z_logisticsTitle">
	            <p class="f30 ellipsis">{{item.title}}</p>
	            <p class="f22 c_999">{{item.publishTime|date('yyyy/MM/dd')}}</p>
	        </div>
	        <div class="z_logisticsContent">
	            <div class="z_logisticsImg">
	                <img alt="" src="../images/z_logo.png">
	            </div>
	            <div class="z_logisticsDes">
	                <p class="c_666 f26 ellipsis_clip" v-html='noHtml(item.content)'></p>
	            </div>
	        </div>
	    </div>
	</div>
	<div v-else>
        <nodata></nodata>
    </div>
</div>
</template>
<script>
import top from 'src/components/top';
import {fetchNoticeList} from 'src/service/getData';
export default {
    data () {
        return {
            list: [],//系统通知列表
            noticeCode:'DDTTCGG',//第二页=>公告code（接口参数）
            noticeType:'KBGG',   //第二页=>公告type（接口参数）
            title: '系统公告',
            num: 0,
            tabList: [
                {title: '全部',filed: 'all'},
                {title: '同城',filed: 'tongcheng'},
                {title: '众包',filed: 'zhongbao'},
                {title: '借款',filed: 'jiekuan'},
                {title: '风投谷',filed: 'fengtougu'},
                {title: '无形资产',filed: 'wuxingzichan'}
            ]
        }
    },
    components: {
        top,
    },
    mounted () {
    	fetchNoticeList(this.noticeCode,this.noticeType).then(res=>{//请求公告列表
    		this.list = res.data;
    	});
//      this.$nextTick(()=>{
//          new Swiper('#J_tabSwiper', {
//              freeMode: true,
//              slidesPerView : 'auto'
//          });
//      })
    },
    methods: {
        tabClick (index,filed) {
            this.num = index;
        },
        detailUrl(id){
        	this.$router.push('/noticeDetail?id='+id);
        },
        noHtml(content){
        	if(!content) return "";
			var content = content.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
		    content = content.replace(/[|]*\n/, '') //去除行尾空格
		    return content;
        }
    }
}
</script>
<style lang="less">
@import '../style/z_style.less';
.zIndex{
	z-index:1;
}
</style>
