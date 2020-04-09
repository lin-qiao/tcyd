<template>
	<li class="grade">
		<div class="z_score">{{scoreFloat}}</div>
		<p class="c_555 f22 mb10">{{title}}</p>
		<p>
			<i v-for="el in itemClasses" :key="el.id" class="iconfont icon-pingfen" :class="el"></i>
		</p>
	</li>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	computed: {
		itemClasses () {
			this.score > 5 ?this.score = 5 : this.score;
			let result = [];
			let score = Math.floor(this.score);
			let off = 5 - score;
			for (let i=0;i<score;i++) {
				result.push('active');
			}
			while (result.length < 5) {
				result.push('off');
			}
			return result;
		},
		scoreFloat () {
			return parseFloat(this.score).toFixed(1);
		}
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		score: {
			default: '3'
		}
	}
}
</script>


<style lang="less" scoped>
.grade{
	width: 33.33%;
	float: left;
	text-align: center;
	.z_score{
		width: 0.96rem;
		height: 0.96rem;
		border-radius: 50%;
		background: #d3efd0;
		color: #0e9300;
		font-size: 0.42rem;
		text-align: center;
		margin: 0 auto;
		line-height: 0.96rem;
		margin-bottom: 0.1rem;
	}
	p{
		i{
			font-size: 0.3rem;
			color: #eeeeee;
		}
		.active{
			color: #fe5e50;
		}
		.off{
			color: #eee;
		}
	}
}
</style>