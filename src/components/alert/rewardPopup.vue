<!--弹窗-打赏-->
<template>
	<div id="give_reward">
	    <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal='false'>
	    	<div class="give_reward_title"><i @click="closeBtn">取消</i>打赏</div>
	        <ul class="give_reward_list">
	        	<li v-for="(it,i) in rewardList" :class="{active:state==i}" @click="state=i">
		        	<img :src="it.img"/>
		            <b v-text="it.name"></b>
	            </li>
	        </ul>
	        <div class="give_reward_edit">可用钻石：{{jewel}}个<span class="btn pull_right">确定</span><span class="btn_border pull_right">充值</span></div>
	    </mt-popup>
    </div>
</template>

<script>
import {fetchUsableJewel} from 'src/module/common/member/module/wallet/module/my/service/getData'//获取可用钻石
export default {
    data(){
        return{
        	rewardList:[],//礼物列表
        	state:0,//选择的礼物
        	popupVisible:false,//弹窗是否显示
        	jewel:0//可用钻石
        }
    },
    props: {
        skillId:{//技能id
        	default:''
        }
    },
    methods: {
    	//打开弹窗
    	open(){
    		fetchUsableJewel().then(res=>{
	    		if(res.code=='000'&&res.data){
	    			this.jewel = res.data.masonryAmount;
	    		}
	    		this.popupVisible = true;
	    	})
    	},
    	closeBtn(){
    		//关闭弹窗
    		this.popupVisible=false;
    		this.$emit('rewardState');
    	}
    }
}
</script>

<style lang="less" scoped>
	#give_reward .mint-popup{
		width:100%;
	}
	.give_reward_title{
	    padding:0 0.18rem;
	    margin:0.36rem 0 0.2rem;
	    font-size: 0.3rem;
	    color:#333;
	    text-align: center;
	    i{
	        float: left;
	        color:#999;
	    }
	}
	.give_reward_list{
	    padding:0 0.18rem;
	    display:flex;
	    flex-wrap:wrap;
	    justify-content:space-around;
	    li{
	        width:1.88rem;
	        height:1.88rem;
	        margin:0.2rem 0;
	        border:1px solid #dbdbdb;
	        border-radius:4px;
	        text-align: center;
	        img{
	            width:1.24rem;
	            height:1.24rem;
	            display:block;
	            margin:0.1rem auto;
	        }
	        b{
	            font-size:0.26rem;
	            color:#333;
	        }
	    }
	    li.active{
	        border-color:#ff4b48;
	        border-width:2px;
	    }
	}
	.give_reward_edit{
	    padding:0 0.18rem;
	    height:0.98rem;
	    background: #f5f5f5;
	    line-height:0.98rem;
	    font-size:0.28rem;
	    color:#333333;
	    span{
	        padding:0.14rem 0.46rem;
	        margin:0.12rem 0.2rem;
	    }
	}
</style>
