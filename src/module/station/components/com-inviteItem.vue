<template>
	<div>
		<li class="flex flex_center justify_between hei150 lin_hei40 border_b" v-for="el in list" @click="goLink(el.mid,el.nickname)">
			<div>
				<img class="img_avatar pull_left" :src="el.headPhoto|imgUrl" alt="" />
				<div class="pull_left">
					<p class="f28 flex flex_center">
						<img v-if="el.icon" :src="el.icon|imgUrl" alt="" class="icon_img">
						<span>{{el.nickname}}</span> 
						<span class="f24 c_666 ml10" v-if="level=='level1'">( 已邀请{{el.inviteCount}}人 )</span>
						<span class="f22 c_999 l_lose_state" v-if="el.isFailure=='Y'">已失效</span>
					</p>
					<p class="f24 c_999">{{el.addTimeStr}}</p>
				</div>
			</div>
			<div class="text_center pl10" :class="{navigate_right:isShowNext,pr90:isShowNext,pr30:!isShowNext}">
				<p class="f22 c_999">{{level=='level1'?'一级贡献佣金':'二级贡献佣金'}}</p>
				<p class="f26">&yen;{{el.bonus|number(2)}}</p>
			</div>
		</li>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				mid:'',			//用户id
				nickname:''		//用户名
			}
		},
		props:{
			isShowNext:{//是否显示右侧箭头
				default:true
			},
			list:{//列表
				type: Array,
				default: []
			},
			isClick:{//是否添加点击事件
				default:false
			},
			level:{ //佣金等级
				type: String,
				default: 'level1' //默认一级佣金level1,二级佣金传level2
			}
		},
		methods: {
			goLink(mid,nickname){
				if(this.isClick){
					this.mid = mid;
					this.nickname = nickname;
					this.$emit('click');
				}
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.hei150{
	height: 1.5rem;
}
.img_avatar{
	width: 0.7rem;
	height: 0.7rem;
	.border-radius(50%);
	margin-right: 0.12rem;
}
.l_lose_state{
	display: inline-block;
	line-height: 0.36rem;
	.border-radius(0.14rem);
	padding: 0 0.12rem;
	background: #eaeaea;
	margin-left: 0.1rem;
}
.icon_img{
	width: 0.32rem;
	margin-right: 0.05rem;
}
</style>