<template>
<div class="clearfix">
	<!-- S 头部选项卡 -->
	<div class="title">
        <a class="tit_icon left" @click="handleClickLeft">
            <i class="iconfont icon-arrow-left"></i>
        </a>
        <div class="z_newsBtn">
			<div class="z_messageBtn f30" @click="$router.replace('/instantMessage')">消息</div><!-- v-bind:class="{'z_active':type=='message'}" @click="type='message'"-->
			<div class="z_notificationBtn f30" v-bind:class="{'z_active':type=='notification'}" @click="type='notification'">通知</div>
		</div>
    </div>
	<!-- E 头部选项卡 -->
	<!-- S 消息 -->
	<div v-if="type=='message'">
		<item-message :list="list"></item-message>
	</div>
	<!-- E 消息 -->
	<!-- S 通知 -->
	<div v-if="type=='notification'">
		<item-cell title="系统公告" :isLink="true" to="/inform">
			<img src="../images/news_icon1.png" slot="img"/>
		</item-cell>
		<item-cell title="平台通知" :isLink="true" to="/platform">
			<span class="pos_rel" slot="img">
			    <img src="../images/news_icon2.png"/>
			    <em class="c_samll_circle" v-if="dataList.length"></em>
			</span>
		</item-cell>
		<item-cell title="活动精选" :isLink="true" to="/activity">
			<img src="../images/news_icon3.png" slot="img"/>
		</item-cell>
	</div>
	<!-- E 通知 -->
</div>
</template>

<script>
import itemCell from 'src/components/item/itemCell';         //选项卡=>单栏
import itemMessage from '../components/itemMessage';        //选项卡=>消息
import {fetchCmsMailList} from 'src/service/getData';
export default {
	data() {
		return {
			type:'notification',   //选项卡tab
			list:[],               //选项卡=>消息列表（需求不定）
			allLoaded:false,       //选项卡=>活动是否全部加载
			adCode:'ACTIVITY_LIST',//选项卡=>通知活动列表
			page:1,//页码
            size:10,//页数
            readFlag:'N',//是否已读
            bizType:"tc",//平台
            dataList:[],//未读公告
		}
	},
	components: {
		itemCell,       //选项卡=>单栏
		itemMessage,    //选项卡=>消息
	},
	activated() {
		this.cmsMailListFn();//获取平台公告未读内容
	},
	methods: {
		cmsMailListFn(){//获取平台公告未读内容
    		fetchCmsMailList(this.page,this.size,this.readFlag,this.bizType).then(res=>{//请求公告列表
    			this.dataList= res.data.dataList||[];
	    	});
    	},
        handleClickLeft(){
            if(this.url){
                this.$router.push(this.url);
            }else{
                this.$router.go(-1);
            }
        }
	}
}
</script>
<style lang="less">
.c_samll_circle{
	width:0.12rem;
	height:0.12rem;
	display: block;
	border-radius:50%;
	background: #ff4b48;
	position:absolute;
	top:0;
	right:-0.12rem;
}
</style>
