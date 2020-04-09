<template>
	<div>
		<label class="yl_account yl_mode_item" @click="close = !close">
			<div class="yl_icon">
				<i class="iconfont icon-changjianwenti"></i>
			</div>
			<input type="text" v-model="question" disabled="disabled" :placeholder="'问题'+getNum(index)+'：请选择您的问题'" @focus="showAllow=true" @blur="showAllow=false" id="J_phone" autocomplete="off">
			<i class="iconfont icon-arrow-down"></i>
			<ul v-if="close&&data.length" class="iphone_list">
				<li v-for="el in data" @click="questionId=el.id;question=el.con;$emit('input',el.id)">{{el.con}}</li>
			</ul>
		</label>
		<div class="yl_mode_item">
	        <div class="yl_icon">
	          <i class="iconfont icon-wodedaan"></i>
	        </div>
	        <input type="text"  v-model.trim="answer" placeholder="请输入答案" autocomplete="off">
	    </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				close:false,
				question:'',//问题
				answer:'',//答案
				questionId:'',//问题答案
			}
		},
		props:{
			data:{
				default:Array
			},
			value:{},
			index:{}
		},
		watch:{
			value(cur){
				this.questionId = cur;
			}
		},
		methods:{
			getNum(i){
				i = Number(i);
				switch(i){
					case 1:return'一';
					case 2:return'二';
					case 3:return'三';
				}
			}
		}
	}
</script>

<style>
</style>