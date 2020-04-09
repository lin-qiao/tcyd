<template>
	<div>
		<upload-img count='1' v-model="aa" pathType="member_auth_img_path"></upload-img>
		<upload-img count='2' :imgList="list"></upload-img>
	</div>
</template>

<script>
import uploadImg from 'src/components/uploads/uploadImg'
export default {
	data(){
		return{
			aa:"",
			list:[]
		}
	},
	mounted(){
		this.$confirm({
			confirm:()=>{
                console.log(1)
			}
		})
	},
	components:{
		uploadImg
	},
	methods: {
	}
}
</script>

<style>
</style>
