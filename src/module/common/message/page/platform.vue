<template>
<div class="clearfix bg_gray c_platform_box">
	<top :title="title" :isReturn="false"></top>
	<div class="z_container mt-20" v-show="list.length">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
			<div class="z_logisticsItem bg_fff" v-for="(item,index) in list" :key="index" @click="batchSignMailFn(item.id,item.readFlag)">
		        <div class="z_logisticsTitle">
		            <p class="f30 ellipsis">{{item.title}}</p>
		            <p class="f22 c_999">{{item.addTime|date('yyyy/MM/dd')}}</p>
		        </div>
		        <div class="z_logisticsContent">
		            <div class="z_logisticsImg">
		                <img alt="" src="../images/z_logo.png">
		            </div>
		            <div class="z_logisticsDes">
		                <p class="c_666 f26 ellipsis_clip3">{{item.content}}</p>
		            </div>
		        </div>
		    </div>
	    </mt-loadmore>
	</div>
	<div v-show="!list.length">
        <nodata></nodata>
    </div>
</div>
</template>
<script>
import top from 'src/components/top';
import logisticsItem from '../components/itemLogistics';
import {fetchCmsMailList} from 'src/service/getData';
import {fetchBatchSignMail} from '../service/getData';
export default {
    data () {
        return {
            list: [],//系统通知列表
            page:1,//页码
            size:10,//页数
            readFlag:"",//是否已读
            bizType:"tc",//平台
            title: '平台通知',
            allLoaded:false,//是否全部加载
        }
    },
    components: {
        top,
        logisticsItem,
    },
    mounted () {
    	this.cmsMailListFn();
//      this.$nextTick(()=>{
//          new Swiper('#J_tabSwiper', {
//              freeMode: true,
//              slidesPerView : 'auto'
//          });
//      })
    },
    methods: {
    	cmsMailListFn(){
    		fetchCmsMailList(this.page,this.size,this.readFlag,this.bizType).then(res=>{//请求公告列表
	    		let data = res.data;
				if(data){
					if(this.page==1){
					    this.list = data.dataList||[];
					    this.$refs.loadmore.onTopLoaded();
					}else{
						this.list = this.list.concat(data.dataList||[]);
						this.$refs.loadmore.onBottomLoaded();
					}
					
					if(data.dataList&&data.dataList.length==this.size){
						this.allLoaded = false;
					}else{
						this.allLoaded = true;
					}
				}else{
					this.allLoaded = true;
				}
	    	});
    	},
    	batchSignMailFn(id,readFlag){//标记已读接口
    		if(readFlag=="N"){
    			fetchBatchSignMail(id,'Y').then(res=>{
	    			if(res.status){}
	    		});
    		}
    	},
    	loadTop(){//下拉刷新
			this.page = 1;
			this.cmsMailListFn();//请求红包明细
		},
		loadBottom(){//上拉加载
			this.page += 1;
			this.cmsMailListFn();//请求红包明细
		}
    }
}
</script>
<style lang="less">
@import '../style/z_style.less';
.c_platform_box .title{
	z-index:1;
}
.z_logisticsDes p{
	word-break: break-all;
}
</style>
