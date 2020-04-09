<template>
<div class="clearfix">
	<top :title="title" :isReturn="false" class="zIndex1"></top>
	<div class="z_container bg_gray" v-if="list.length">
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
		    <trade-item :list="list"></trade-item>
		</mt-loadmore>
	</div>
	<div v-else>
        <nodata></nodata>
    </div>
</div>
</template>

<script>
import top from 'src/components/top';              //头部组件
import tradeItem from '../components/itemTrade';   //列表组件
import {fetchMessageList} from '../service/getData'//佣金消息接口
export default {
	data() {
		return {
			title: '佣金消息',            //头部title
			code:'brokerageIncomeLetter',//佣金消息code（接口参数）
			list: [],//佣金消息列表    
			page:1,  //当前页数
			size:10, //页面条数
			allLoaded:false,//是否全部加载
		}
	},
	components: {
		top,      //头部组件
		tradeItem,//列表组件
	},
	activated(){
		
	},
	mounted() {
		this.messageListFun();//请求佣金消息数据
	},
	methods: {
		messageListFun(){//请求佣金消息数据
			fetchMessageList(this.code,this.page,this.size).then(res=>{
				let data = res.data;
				if(data){
					if(this.page==1){
					    this.list = data.list||[];
					    this.$refs.loadmore.onTopLoaded();
					}else{
						this.list = this.list.concat(data.list||[]);
						this.$refs.loadmore.onBottomLoaded();
					}
					
					if(data.list&&data.list.length==this.size){
						this.allLoaded = false;
					}else{
						this.allLoaded = true;
					}
				}else{
					this.allLoaded = true;
				}
			})
		},
		loadTop(){//下拉刷新
			this.page = 1;
			this.messageListFun();//请求红包明细
		},
		loadBottom(){//上拉加载
			this.page += 1;
			this.messageListFun();//请求红包明细
		}
	}
	
}
</script>
<style lang="less">

</style>
