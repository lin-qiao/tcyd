<template>
	<div class="router_page">
		<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 头条' v-if="$store.state.platform=='wx'"></top>
		<div class="top_line_box" :class="{'top0':$store.state.platform!='wx'}">
			<ul class="top_line_list">
				<li v-for="(el,i) in list" :class="{red:i%2==0,yellow:i%2==1}">
					<div class="pos_rel">
						<span v-html="formateHeadLine(el.content,false,true)"></span>
						<b></b>
						<div class="btn_box">
							<a href="javascript:void(0);" @click="clickTo(el)">{{el.btnName}}</a>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {toJsonStr} from 'src/config/fetch'
	import {isAndroid,isiOS} from 'src/config/env'
	export default{
		data(){
			return{
				list:[],//头条列表
				source:null//长连接
			}
		},
		activated(){
			this.connectSSE();
		},
		beforeRouteLeave(to,from,next){
			/*离开路由--关闭连接*/
			if (this.source) {
				this.source.close();
			}
			next();
		},
		methods:{
			//按钮的点击
			clickTo(el){
				if(this.$store.state.platform=='wx'){
					this.$router.push(el.btnWxUrl);
				}else{
					if(isiOS){
						window.location.href=el.btnIosUrl;
					}else{
						window.android.toNativeAct(el.btnApkUrl);
					}
				}
			},
			//建立连接
			connectSSE() {
			  if (window.EventSource) {
			    this.source = new EventSource('https://app-tcyd.dadetong.com/api/tc/headLine/headlineListByPage?size=10&interval=10');
			    this.source.onmessage = (e)=> {
			    	if(!e.data){
			    		return;
			    	}
			    	let res = JSON.parse(e.data);
			    	if(res.data){
			    		this.list = res.data.list.concat(this.list);
			    	}
			    }
			  } else {
			    console.error('Your browser doesn\'t support SSE');
			  }
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
@yellow:#eec249;
.top_line_box{
	position: absolute;
	top: 0.89rem;
	bottom: 0;
	left: 0;
	width: 100%;
	background: url(../images/topLine.jpg) no-repeat center;
	background-size: cover;
	.overflow_auto;
	&.top0{
		top:0 !important;
	}
}
.top_line_list{
	padding-top: 0.5rem;
	li{
		position: relative;
		width: 6.52rem;
		padding: 0.15rem 0.34rem 0.15rem 0.12rem;
		margin-bottom: 0.54rem;
		min-height: 0.7rem;
		max-height: 1.16rem;
		border-bottom-right-radius: 0.54rem;
		border-top-right-radius: 0.54rem;
		overflow: hidden;
		line-height: 0.4rem;
		.f26;
		.c_fff;
		div{
			max-height: 0.88rem;
			overflow: hidden;
		}
		b{
			margin-left: 0.1rem;
			display: inline-block;
			vertical-align: middle;
			width: 1.3rem;
			height: 0.4rem;
		}
		.btn_box{
			position: absolute;
			right: 0.0rem;
			bottom: 0.04rem;
			padding-left: 0.1rem;
		}
		a{
			display: block;
			width: 1.3rem;
			height: 0.4rem;
			.border-radius(0.2rem);
			text-align: center;
			.c_fff;
		}
		&.red{
			background: @color;
			div{
				background: @color;
			}
			a{
				background: @yellow;
			}
		}
		&.yellow{
			background: @yellow;
			div{
				background: @yellow;
			}
			a{
				background: @color;
			}
		}
	}
}

</style>
<style lang="less">
@import (reference) '~src/style/all.less';
@yellow:#eec249;
.top_line_list{
	li{
		img{
			width: 0.5rem;
			height: 0.5rem;
			vertical-align: middle;
			margin: 0 0.1rem;
			.border-radius(50%);
		}
		img:first-of-type{
			margin-left: 0;
		}
		&.red{
			em{
				color: @yellow;
			}
		}
		&.yellow{
			em{
				color: @color;
			}
		}
	}
}
.top_line_box{
	.mint-loadmore-text{
		color: #fff;
	}
}
</style>