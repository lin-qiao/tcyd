<template lang="html">
	<mt-switch v-model="val" @change="change"></mt-switch>
</template>

<script>
	export default {
		data(){
            return{
				val:false,
			}
		},
		props: {
			value:{
				type:Boolean,
				default:true,
			},
			disabled:{
				type:Boolean,
				default:false,
			}
		},
		mounted(){
			if(typeof(this.value) == 'boolean'){
				this.val = this.value;
			}
		},
		methods:{
			change(checked){
				this.$emit('change',!checked)
			}
		},
		watch:{
			value(val){
				if(typeof(val) == 'boolean'){
					this.val = val;
				}
			},
			val(val){
				this.$emit('input',val)
			}
		}
	}
</script>

<style lang="less">
.mint-switch{
	transform: rotate(180deg);
}
.mint-switch-core{
	width: 1.04rem;
	height: .64rem;
	border-radius: .32rem;
}
.mint-switch-core::after{
	width: .6rem;
	height: .6rem;
	border-radius: .3rem;
	box-shadow: 0 -1px 3px rgba(0, 0, 0, .4);
}
.mint-switch-core::before{
	width: 1rem;
	height: .6rem;
	border-radius: .30rem;

}
.mint-switch-input:checked + .mint-switch-core{
	background: #4ad764;
	border-color: #4ad764;
}
.mint-switch-input:checked + .mint-switch-core::after{
	transform: translateX(.4rem);
}
</style>
