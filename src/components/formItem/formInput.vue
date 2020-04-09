<template lang="html">
  <div class="from_item" :class="{'border-n':noBorder}">
    <div class="from_item_title c_666 f28" v-html="title"></div>
    <div class="from_item_con">
	    <input
	    	class="f28"
	    	:type="inputType"
	      :maxlength="maxlength"
	      :placeholder="placeholder"
	      :value="value"
	      :disabled="disabled"
	      @input="input($event)" :class="{'text_left ml30':align}"
	      autocomplete="off">
    </div>
    <slot></slot>
    <div v-if="type == 'code'" class="from_item_code" @click="getCode">{{codeTextA}}</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			codeFlag: true,//是否能获取短信验证码
			time: 120,//验证码时长
			t:null,//计时器
		}
	},
  props: {
  	inputType:{      //input类型
    	default:'text',
    	type:String
    },
    type:{
        default:'',  //显示类型
        type:String
    },
    disabled:{  //禁用启用
        default:false
    },
    value:{
        default:''
    },
    title:{     //标题
        type:String,
        default:''
    },
    placeholder:{
        type:String,
        default:''
    },
    maxlength:{   //最大长度
    	default:''
    },
    number:{      //input只能输入数字
    	default:false
    },
    align:{       //文字对齐方式
    	default:false
    },
    noBorder:{//是否有边框
    	default:false
    },
    isFloat:{  //input只能输入数字和小数
    	default:false
    }
  },
  beforeRouteLeave(to,from,next){
			if(this.t){//清除验证码计时器
				clearInterval(this.t);
			}
			next();
	},
	activated(){
		//初始化数据
		if(this.t){//清除验证码计时器
			clearInterval(this.t);
		}
		this.codeFlag = true;
		this.time = 120;
	},
	methods: {
		input($event){
  		if(this.number){
  			$event.target.value = $event.target.value.replace(/\D+/g,"");
  			this.$emit('input', $event.target.value);
  		}else if(this.isFloat){
  			//替换非数字和点为空
  			let val = $event.target.value.toString().replace(/[^\d.]*/g,"");
  			//替换多. 保留2位小数
  			val = val.replace(/^\D*([1-9]\d*\.?\d{0,2})?.*$/,'$1')
  			$event.target.value = val;
  			this.$emit('input', val);
  		}else{
  			this.$emit('input', $event.target.value)
  		}
  	},
		//获取验证码
		getCode() {
			//判断是否在120s内
			if(!this.codeFlag){
				window.alertTip('距上次验证码不足120s,请稍后再试！');
				return
			}
			//触发父组件的获取验证码方法
			this.$emit('getCode',this.callBack)
		},
		//调取接口后的回调
		callBack(res){
			window.alertTip(res.msg);
			if(res.status){
				this.codeFlag = false;
				this.time = 120;
				this.t = setInterval(() => {
					this.time--;
					if(this.time <= 0) {
						clearInterval(this.t);
						this.codeFlag = true;
					}
				}, 1000)
			}
		}
	},
	computed:{
		//获取验证码区域文字显示
		codeTextA(){
			if(this.codeFlag){
				return '获取验证码';
			}else{
				return '已发送（'+this.time + 's）';
			}
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
	.from_item_title {
		white-space: nowrap;
	}
	.from_item_con{
		height: 100%;
		flex-grow:1;
	}
	input{
		width: 100%;
		height: 100%;
		text-align: right;
	}
	.from_item_code{
		width: 2.25rem;
		height: 100%;
		margin-left: 0.3rem;
		margin-right: -0.3rem;
		border-left: 1px solid #e8e8e8;
		text-align: center;
		line-height: 0.88rem;
		font-size: 0.28rem;
		color: #409ffe;
	}
}
</style>
