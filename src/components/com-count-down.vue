<template>
	<span class="c_order_orange" :class="[formateType==1?'f36  ml20':'f24']">{{countDownStr}}</span>
</template>

<script>
	export default{
		data(){
			return{
				countDownStr:"00:00:00",
				nowtimes:0,
				flag:0
			}
		},
		props:{
			times:{//倒计时事件
				default:new Date().getTime()//当前事件时间戳
			},
			formateType:{  //倒计时 格式   1 \2   2为： 10小时 10分钟10 秒
				default:1 //  hh:mm:ss  
			}
		},
		watch:{
			times(){
				this.nowtimes=this.times;
				this.countDownFn();
			}
		},
		mounted(){
				this.nowtimes=this.times;
				this.countDownFn();
		},
		methods:{
			countDownFn(){
				let t=this.nowtimes;
				if(t>0){
					let day=Math.floor((t/3600000/24));
					let hour=Math.floor((t/3600000)%24);
					let min=Math.floor((t/60000)%60);
					let sec=Math.floor((t/1000)%60);
					let msec=Math.floor(t%1000);
					day = day <= 9 ? "0" + day : day;
					hour = hour <= 9 ? "0" + hour : hour;
					min = min <= 9 ? "0" + min : min;
					sec = sec <= 9 ? "0" + sec : sec;
					if (msec <= 99) {
					    msec = '0' + msec; //毫秒	
					}
					if (msec <= 9) {
					    msec = '00' + msec; //毫秒
					}
					day = day.toString();
					hour = hour.toString();//转换为字符串
					min = min.toString();
					sec = sec.toString();
					msec = msec.toString();
					
					if(this.formateType==2){
						this.countDownStr=day+'天'+hour+"时"+min+"分"+sec+"秒";
					}else{
						this.countDownStr=hour+":"+min+":"+sec;
					}
					this.nowtimes-=1000;
					clearTimeout(this.flag);//清除上一个定时器
					this.flag=setTimeout(this.countDownFn,1000);
				}else{
				    this.countDownStr="00:00:00";
				}
			}

		}
	}
</script>
