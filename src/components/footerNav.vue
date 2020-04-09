<!--弹窗-信息框-->
<template>
	<div>
		<div style="height: 0.98rem;"></div>
		<div class="footer_nav">
			<ul class="clearfix">
				<li>
					<router-link :to="{path:'/index'}">
						<i class="iconfont" :class="{'c_main':active==1,'icon-dizhi01':active==1,'icon-tongchengweidian':active!=1}"></i>
						<p :class="{'c_main':active==1}">首页</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'/demandManage'}">
						<i class="iconfont" :class="{'c_main':active==2,'icon-xuqiuguanlidianji':active==2,'icon-xuqiuguanliweidian':active!=2}"></i>
						<p :class="{'c_main':active==2}">需求管理</p>
					</router-link>
				</li>
				<li class="center">
					<a href="javascript:void(0)" @click="isShow=true">
						<h1 style="display: none;">同城</h1>
					</a>
				</li>
				<li>
					<router-link :to="{path:'/skillManage'}">
						<i class="iconfont" :class="{'c_main':active==3,'icon-fuwuchuangb':active==3,'icon-jinengguanliweidian':active!=3}"></i>
						<p :class="{'c_main':active==3}">技能管理</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'/account'}">
						<i class="iconfont" :class="{'c_main':active==4,'icon-wodedianji':active==4,'icon-wodeweidian':active!=4}"></i>
						<p :class="{'c_main':active==4}">我的</p>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="footer_post" v-show="isShow">
			<div class="pos_rel">
				<ul class="flex flex_wrap justify_center">
					<li v-for="el in list">
						<router-link :to="el.url">
							<img :src="require(el.img)" alt="" />
							<p class="f28 mt12">{{el.name}}</p>
							<p class="f26 c_999 mt5">{{el.subName}}</p>
						</router-link>
					</li>
				</ul>
				<i class="footer_close iconfont icon-guanbi f34 c_999" @click="isShow=false"></i>
			</div>
		</div>
	</div>
    
</template>

<script>
    export default {
    	data(){
            return{
            	list:[
            		{img:'./images/toRecharge.png',name:'我要充值',subName:'充值越多返券越多',url:'/wallet/recharge'},
            		{img:'./images/postRAM.png',name:'发布动态',subName:'展示真实的自己',url:'/dynamic'},
            		{img:'./images/help.png',name:'找人帮忙',subName:'一键3分钟约10人',url:'/demandType'},
            		{img:'./images/orderMoney.png',name:'接单赚钱',subName:'技能换钱很简单',url:'/skillType'},
            		{img:'./images/station.png',name:'站长招募',subName:'享受高额奖金',url:'/stationIndex'}
            	],
            	isShow:false
            }
        },
        activated(){
      		this.isShow = false;
        },
        props: {
        	active: {  // 下标
		    	default: 1
		  	}
        }
    }
</script>

<style scoped lang="less">
@import (reference) "~src/style/all.less";
.footer_nav {
  position: fixed;
  width: 7.5rem;
  margin-left: -3.75rem;
  left: 50%;
  bottom: 0;
  right: 0;
  height: 0.98rem;
  .border-t;
  background: #f3f3f3;
  .text_center;
  z-index: 24;
  li {
    .pull_left;
    width: 20%;
    padding-top: 0.08rem;
    .f20;

    a {
      display: block;
      .c_888;
    }

    p {
      margin-top: 0.06rem;
    }
  }

  i {
    display: block;
    height: 0.5rem;
    .f48;
  }

  .center {
    a {
      width: 1.26rem;
      height: 1.26rem;
      margin: -0.36rem auto 0;
      padding-top: 0.76rem;
      background: url("./images/l_center_bg.png") no-repeat;
      background-size: 1.26rem;
      background-position: center 0;
    }
  }
}
.footer_post{
	position: fixed;
	top: 0;
	left: 50%;
	right: 0;
	bottom: 0;
	width: 7.5rem;
	margin-left: -3.75rem;
	z-index: 25;
	background: rgba(255,255,255,0.9);
	.flex;
	.flex_center;
	ul{
		padding: 0 0.53rem;
		li{
			width: 3.22rem;
			padding: 0.2rem 0.3rem;
		}
		a{
			.flex;
			.flex_center;
			.flex_column;
			width: 100%;
			img{
				width: 1.34rem;
				height: 1.34rem;
			}
		}
	}
	.footer_close{
		position: absolute;
		bottom: -0.7rem;
		left: 50%;
		margin-left: -0.17rem;
	}
}
</style>
