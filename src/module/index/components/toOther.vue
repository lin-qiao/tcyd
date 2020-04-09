<template>
	<a class="btn_border" href="javascript:void(0);" @click="toOther">查看其它</a>
</template>

<script>
	import {fetchProjectMenu} from 'src/service/getData'
	export default{
		data(){
			return{
				projects:[]//项目列表
			}
		},
		mounted(){
			fetchProjectMenu().then(res=>{
				if(res.status&&res.data){
					this.projects = res.data.list||[];
				}
			})
		},
		methods:{
			toOther(){
				let index = this.projects.findIndex(v=>v.code=='WXPTLB_TC');
				if(this.projects[index+1]){
					this.$router.push(this.projects[index+1].remark);
				}
			}
		}
	}
</script>

<style>
</style>