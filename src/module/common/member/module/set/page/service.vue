<template>
    <div>
        <top title="在线客服" :isReturn="false" v-if="$store.state.platform=='wx'"></top>
        <div class="c_iframe_box" :class="{'top0':$store.state.platform!='wx'}"><iframe src="https://dadetong.udesk.cn/im_client/?web_plugin_id=56683" width="100%" frameborder="0"></iframe></div>
    </div>
</template>
<script>
import {fetchArticelType} from '../service/getData'; //左侧分类列表
import {fetchProblemList} from 'src/service/getData'; //常见问题列表
export default {
	data() {
		return {
           
		}
	},
	created() {
        if(this.$store.state.platform=='android'){
        	document.title="在线客服";
        }else if(this.$store.state.platform=='ios'){
        	window.location.href="ddt://DTWeb/setTitle?title=在线客服"
        }
	},
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.c_iframe_box{
	position:fixed;
	top:0.89rem;
	left:0;
	right:0;
	bottom:0;
	&.top0{
		top:0 !important;	
	}
	iframe{
		height:100%;
	}
}

</style>
