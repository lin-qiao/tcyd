<template lang="html">
	<div>
		<div class="bg_fff">
            <div class="pro_content pad30 f24" v-html="agreementContent">
            </div>
        </div>
	</div>

</template>

<script>
	//用户协议
	import {fetchTextDetail} from 'src/service/getData'
	export default {
		data() {
			return {
				agreementContent: '', //用户协议
				code: '' //code码
			}
		},
		activated(){
			this.code=this.$route.query.code||'DDTTCYHXY';//用户协议code码
			if(this.code){
				fetchTextDetail(this.code).then(res=>{//用户协议
		        	this.agreementContent = res.data.detail;
		        })
			}
		}
	}
</script>

<style lang="less">
.pro_content{
	line-height: 1.5em;
}
</style>