<template>
<div class="clearfix">
	<top :title="title" :isReturn="false" class="zIndex"></top>
	<div class="z_container" v-if="activityList.length">
		<activity-item :list="activityList"></activity-item>
	</div>
	<div v-else>
		<nodata></nodata>
	</div>
</div>
</template>

<script>
import top from 'src/components/top';                 //头部
import activityItem from '../components/itemActivity';//活动列表 
import {fetchGeneralImage} from 'src/service/getData';//活动接口
export default {
	data() {
		return {
			activityList: [],        //活动列表
			title: '活动精选',       //头部title
			adCode: 'ACTIVITY_LIST',//活动列表code值（接口参数）
		}
	},
	components: {
        top,         //头部
		activityItem//活动列表
	},
	mounted() {
		this.getActivityList();//获取活动列表
	},
	methods: {
		getActivityList () {//获取活动列表
			fetchGeneralImage(this.adCode).then(res => {
				this.activityList = res.data.list;
			})
		}
	}
}
</script>
<style lang="less" scoped>
.zIndex{
	z-index:1;
}
</style>
