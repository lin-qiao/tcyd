<template lang="html">
  <div class="from_item pos_rel">
    <div class="from_item_title c_666 f28" v-html="title"></div>
    <div class="from_item_con" @click="openPicker">
    	<div class="from_item_picker"></div>
	    <input
	      class="f28"
	      type="text"
	      :placeholder="placeholder"
	      :value="value"
	      disabled="disabled"
	      @input="input($event)">
     </div>
     <div  class="form_item_arrow">
            <i class="iconfont icon-arrow-right"></i>
        </div>
      <datetime-picker
	    ref="picker"
	    :type="type"
	    v-model="pickerValue"
	    @confirm="handleConfirm"
	    year-format="{value} 年"
		month-format="{value} 月"
		date-format="{value} 日"
		hour-format="{value} 时"
		minute-format="{value} 分"
		:startDate="startDate"
		:endDate="endDate">
	  </datetime-picker>
  </div>
</template>

<script>
	import {DatetimePicker} from 'mint-ui';
export default {
	data(){
		return {
			pickerValue:''
		}
	},
	components:{
		DatetimePicker
	},
  props: {
  	type:{
  		default:'date'
  		//datetime: 日期时间选择器，可选择年、月、日、时、分，value 值为一个 Date 对象
		//date: 日期选择器，可选择年、月、日，value 值为一个 Date 对象
		//time: 时间选择器，可选择时、分，value 值为一个格式为 HH:mm 的字符串
  	},
    value:{},
    title:String,
    placeholder:String,
    endDate:{
    	default: function () {
		    return new Date();
	  	}
    },
    startDate:{
    	default: function () {
		    return new Date('1900-01-01')
	  	}
    }
  },
  watch:{
  	value(cur){
  		this.$nextTick(()=>{
  			if(this.type=='time'){
  				this.pickerValue = cur;
  			}else{
  				this.pickerValue = new Date(cur);
  			}
  		})
  	}
  },
  mounted(){
  	if(this.value){
  		if(this.type=='time'){
  			this.pickerValue = this.value;
  		}else{
  			this.pickerValue = new Date(this.value);
  		}
  	}else{
  		if(this.type=='time'){
  			this.pickerValue = '';
  		}else{
  			this.pickerValue = new Date();
  		}
  	}
  },
  methods:{
  	openPicker() {
	    this.$refs.picker.open();
	},
	handleConfirm(cur){
		let val = '';
		if(this.type=='date'){
			//年、月、日
			val = cur.getFullYear()+'-'+(cur.getMonth()+1>=10?cur.getMonth()+1:'0'+(cur.getMonth()+1))+'-'+(cur.getDate()>=10?cur.getDate():'0'+cur.getDate());
		}else if(this.type=='datetime'){
			//年、月、日、时、分
			val = cur.getFullYear()+'-'+(cur.getMonth()+1>=10?cur.getMonth()+1:'0'+(cur.getMonth()+1))+'-'+(cur.getDate()>=10?cur.getDate():'0'+cur.getDate())+' '+(cur.getHours()>=10?cur.getHours():'0'+cur.getHours())+':'+(cur.getMinutes()>=10?cur.getMinutes():'0'+cur.getMinutes());
		}else if(this.type=='time'){
			//时、分
			val = cur;
		}
		this.$emit('input', val);
	}
  }
}
</script>

<style lang="less" scoped>
.from_item{
	width: 7.2rem;
	height: 0.89rem;
	padding-right: 0.3rem;
	margin-left: 0.3rem;
	border-bottom: 1px solid #e8e8e8;
	display: flex;
	align-items: center;
	.from_item_con{
		height: 100%;
		flex-grow:1;
	}
	.form_item_arrow{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: .38rem;
        height: 100%;
        .iconfont{
            font-size: .3rem;
            color: #bbb;
        }
    }
	input{
		width: 100%;
		height: 100%;
		text-align: right;
	}
}
.from_item_picker{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
</style>
