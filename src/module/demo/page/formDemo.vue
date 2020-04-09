<template>
	<div>
		<from-textarea input_placeholder="请输入服务描述内容..." maxlength="1500" height="4"></from-textarea>
		<formCheckbox :list="checkboxList"></formCheckbox>
		<formRadio :list="checkboxList" type="radio" class="form_check_box" isBadge="true"></formRadio>
	</div>
</template>

<script>
import fromTextarea from 'src/components/formItem/formTextarea'
import formCheckbox from 'src/components/formItem/formCheckbox'
import formRadio from 'src/components/formItem/formRadio'
export default {
	data(){
		return{
			checkboxList:[{id:1,name:"轿车"},{id:2,name:"轿车2"},{id:3,name:"轿车3"},{id:4,name:"轿车4"},{id:5,name:"轿车5"}]
		}
	},
	mounted(){
	},
	components:{
		fromTextarea,
		formCheckbox,
		formRadio
	},
	methods: {
	}
}
</script>

<style>
</style>
