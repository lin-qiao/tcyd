<template>
    <div class="router_page bg_drakRed">
    	<vip-head :userInfo="userInfo"></vip-head>
        <div class="vip_privilege">
        	<h3>免诚意金 赠超值大礼包</h3>
        	<p class="vip_privilege_label"><span></span>共享·赚钱·社交<span></span></p>
        	<!--S 同城VIP特权-->
        	<div class="vip_privilege_out">
        		<div class="vip_privilege_in">
	        		<h2 class="f32 text_center">同城VIP特权</h2>
	        		<div class="vip_privilege_msg">
	        			<img src="../images/privilege1.png" />
	        			<div>
	        				<strong class="f26">免诚意金</strong>
	        				<span>面对心仪的TA，直接搭讪撩起来</span>
	        			</div>
	        		</div>
	        		<div class="vip_privilege_msg">
	        			<img src="../images/privilege2.png" />
	        			<div>
	        				<strong class="f26">免费获得大礼包</strong>
	        				<span>价值399/999/3699的VIP大礼包免费等你来拿</span>
	        			</div>
	        		</div>
	        		<div class="vip_privilege_msg">
	        			<img src="../images/privilege3.png" />
	        			<div>
	        				<strong class="f26">VIP赚钱</strong>
	        				<span>邀请好友成为VIP立赚50元</span>
	        			</div>
	        		</div>
	        		<div class="vip_privilege_msg">
	        			<img src="../images/privilege4.png" />
	        			<div>
	        				<strong class="f26">优先排队特权</strong>
	        				<span>优质服务抢先体验，附近需求优先抢单</span>
	        			</div>
	        		</div>
	        		<div class="vip_privilege_msg">
	        			<img src="../images/privilege5.png" />
	        			<div>
	        				<strong class="f26">优选商品会员价</strong>
	        				<span>优选商品享受VIP折扣价</span>
	        			</div>
	        		</div>
	        		<div class="vip_privilege_msg">
	        			<img src="../images/privilege6.png" />
	        			<div>
	        				<strong class="f26">专属客服</strong>
	        				<span>24小时专属客服，一对一服务</span>
	        			</div>
	        		</div>
	        	</div>
        	</div>
        	<!--E 同城VIP特权-->
        	<div class="mtb30 f26 c_fff text_center">已开通的VIP平均每人可赚<span class="mlr10 f28 c_yellowish">16688元/月</span></div>
            <!--S vip卡-->
            <div class="mb30">
	        	<ul class="vip_freebie_tit">
	        		<li :class="{on:priceId==v.priceId}" v-for="v in vipList" @click="changeVipId(v.priceId,v.price,v.time)">{{v.name}}</li>
	        	</ul>
	        	<div class="vip_freebie_list">
	        		<p class="f28 c_333 pt60 text_center">仅需{{vipCost}}元购{{vipTime}}个月【VIP资格】</p>
	        		<p class="text_center f26 mt20 c_drakRed mb30">立即赠送以下任一礼包</p>
	        		<div class="vip_freebie_msg">
	        			<div class="vip_freebie_good" v-for="v in vipGoodsList">
	        				<img src="../images/leftIcon.png" class="vip_leftIcon"/>
	            			<img class="vip_freebie_img" :src="v.img | imgUrl" @click="toGoodDetail(v.gid)"/>
	            			<div class="vip_freebie_price">
		            			<a href="javascript:void(0);" class="btn vip_btn" @click="buy(v.gid)">购买VIP<i class="iconfont icon-arrow-right ml10"></i></a>
		            			<span class="block" @click="toGoodDetail(v.gid)">{{v.title}}</span>
		            			<em class="block c_drakRed f24 pb20">专柜价{{v.money}}元</em>
	            			</div>
	            		</div>
	        		</div>
	        	</div>
	        	<div class="vip_operation" v-show="prevFlag || nextFlag">
	        		<div class="btn_page" v-show="prevFlag" @click="prev">上一页</div>
	        		<div class="btn_page" v-show="nextFlag" @click="next">下一页</div>
	        	</div>
	            <!--E vip卡-->
	            <!--<router-link :to="{path:'/vipFree'}" class="vip_get_free">
	            	<img src="../images/vip_free.png" />
	            </router-link>-->
            </div>
        </div>
    </div>
</template>
<script>
import vipHead from '../components/vipHead'//头部用户信息组件
import {
	fetchVipUserInfo,//获取用户信息
	fetchVipList,//获取VIP购买列表
	fetchVipGoodsList,//获取VIP购买对应商品列表
} from '../service/getData'
export default {
    data() {
    	return {
    	    userInfo:{},//用户信息
    	    priceId:"",//会员购买选中id
    	    vipCost:"",//花费
    	    vipTime:"",//vip时间
    	    vipList:[],//会员购买列表
    	    vipGoodsList:[],//会员购买商品列表
    	    page:1,//商品列表页码
    	    size:6,//一页展示条数
			totalPage:0,//总页数
			prevFlag:false,//上一页是否可点击
			nextFlag:false,//下一页是否可点击
    	}
	},
	components: {
		vipHead
	},
	mounted(){
		this.getUserInfo();
		this.getVipList();
	},
	watch:{
	},
	methods: {
		//获取用户信息
		getUserInfo(){
			fetchVipUserInfo().then(res=>{
				this.userInfo=res.data;
			})
		},
		//获取VIP购买列表
		getVipList(){
			fetchVipList().then(res=>{
				this.vipList=res.data.list||[];
				if(this.vipList.length){
					this.priceId=this.vipList[0].priceId;
					this.vipCost=this.vipList[0].price;
					this.vipTime=this.vipList[0].time;
					this.getVipGoodsList();
				}
			})
		},
		//获取VIP购买商品列表
		getVipGoodsList(){
			fetchVipGoodsList(this.page,1,this.priceId).then(res=>{
				this.vipGoodsList=res.data.list||[];
				this.totalPage=res.data.totalPage;
	    		if(this.totalPage>1&&this.page<this.totalPage){
	    			this.nextFlag=true;
	    		}	    		
			})
		},
    	//上一页
    	prev(){
    		if(!this.prevFlag){
    			return;
    		}
    		this.page-=1;
			this.nextFlag=true;
    		this.getVipGoodsList();
    		if(this.page<=1){
    			this.prevFlag=false;
    		}
    	},
    	//下一页
    	next(){
    		if(!this.nextFlag){
    			return;
    		}
    		this.page+=1;
    		this.prevFlag=true;
    		this.getVipGoodsList();
    		if(this.page==this.totalPage){
    			this.nextFlag=false;
    		}
    	},
		//切换VIP购买选中
		changeVipId(id,price,time){
			this.page=1;
			this.priceId=id;
			this.vipCost=price;
			this.vipTime=time;
			this.getVipGoodsList();
		},
		//打开商品详情
		toGoodDetail(id){
			this.$router.push({path:"/vipGoodDetail",query:{id:id,priceId:this.priceId}})
		},
		//购买VIP
		buy(goodId){
			console.log(goodId)
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
@import  "../style/vip.less";
</style>
