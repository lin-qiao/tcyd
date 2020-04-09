<!-- 个人认证 -->
<template>
	<div>
		<div>
			<!--S 头部-->
			<top title="身份信息"></top>
			<!--E 头部-->
			<!--S 提示-->
			<p class="l_certicate_hint">仅用于全国公民身份证查询中心核实身份<br>拍摄时请确保身份证<em class="c_orange">边框完整、字迹清晰、亮度均衡</em></p>
			<!--E 提示-->
			<!--S 填写内容-->
			<div class="l_input">
				<div class="l_certicate_mess plr30 pt15">
					<div class="wrap">
						<certificate ref="front" type="1" @get="getFrontInfo">
						</certificate>
						<div class="authen_item" v-if="frontFlag">
							<div class="img">
								<img :src="idcard.front_img | imgUrl" alt="">
								<div class="img_pop" @click="frontFlag = false">
									<i class="iconfont icon-zhaopianpaizhao f34"></i>
									<p class="f26 mt5">重拍</p>
								</div>
							</div>
							<div class="authen_cell">
								<div class="authen_cell_item">
									<span class="cell_n">姓名</span>
									<span class="cell_c">{{idcard.name}}</span>
								</div>
								<div class="authen_cell_item">
									<span class="cell_n">身份证号</span>
									<span class="cell_c">{{idcard.idcard_number | idcard}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="wrap">
						<certificate ref="rear" type="2" @get="getRearInfo">
						</certificate>
						<div class="authen_item" v-if="rearFlag">
							<div class="img">
								<img :src="idcard.rear_img | imgUrl" alt="">
								<div class="img_pop" @click="rearFlag = false">
									<i class="iconfont icon-zhaopianpaizhao f34"></i>
									<p class="f26 mt5">重拍</p>
								</div>
							</div>
							<div class="authen_cell">
								<div class="authen_cell_item">
									<span class="cell_n">签发机关</span>
									<span class="cell_c">{{idcard.issued_by}}</span>
								</div>
								<div class="authen_cell_item">
									<span class="cell_n">有效期限</span>
									<span class="cell_c">{{idcard.valid_date_start | time('.')}} - {{idcard.valid_date_end | time('.')}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="ptb20">
				<a class="btn_block" @click="confirm">确定</a>
			</div>
			<p class="text_center mtb50">身份证拍摄遇到问题，
				<router-link class="c_main" to="/authenticationFail">请点击这里>></router-link>
			</p>
			<!--E 填写内容-->

			<!-- S 弹窗 -->
			<div class="layer_shadow affirm" v-if="affirmVisible">
				<section class="layer_box">
					<p class="layer_con ptb40">{{idcard.name}}<br />{{idcard.idcard_number | idcard}}</p>
					<div class="layer_btn inquiry_btn">
						<div class="close_btn" @click="affirmVisible = false">返回修改</div>
						<div class="confirm_btn" @click="setIdcard" >确认无误<em v-if="time > 0">({{time}}s)</em></div>
					</div>
				</section>
			</div>
			<div class="layer_shadow" v-if="restartVisible">
				<section class="layer_box">
					<i class="iconfont icon-close1" @click="restartVisible = false"></i>
					<img src="~src/images/ico_2.png" alt="">
					<p class="ptb45 f30 text_center">身份证已过期，请重新上传</p>
					<div class="layer_btn">
						<div class="btn max" @click="restartVisible=false;frontFlag=false;rearFlag=false;">立即上传</div>
					</div>
				</section>
			</div>
			<div class="layer_shadow" v-if="errorVisible">
				<section class="layer_box">
					<i class="iconfont icon-close1" @click="errorVisible = false"></i>
					<img src="~src/images/ico_2.png" alt="">
					<p class="ptb45 f30 text_center">身份信息与人脸识别信息不符<br>请重新认证</p>
					<div class="layer_btn">
						<div class="btn min mlr20">身份认证</div>
						<div class="btn min mlr20">人脸识别</div>
					</div>
				</section>
			</div>
			<!-- E 弹窗 -->
		</div>
	</div>
</template>

<script>
import formInput from 'src/components/formItem/formInput'; //输入框
import certificate from '../../components/certificate'; //上传证件组件
import {
	fetchGetmemberbyidcard, //合伙人根据身份证判断是否在平台认证
    fetchSaveidcardinfo, //合伙人身份证号实名认证
} from '../../service/getData';
export default {
	data() {
		return {
			status:1, //步骤
			frontFlag: false, //是否上传了正面
			rearFlag: false, //是否上传了背面
			time:5,
            restartVisible:false,
            errorVisible:false,
            affirmVisible:false,  //确认弹窗
			idcard:{
		        name:'',
		        idcard_number:'',
		        issued_by:'',
		        valid_date_start:'',
		        valid_date_end:'',
		        front_img:'',
		        rear_img:'',
		    },   //实名认证身份证信息
			newDay:'', //今天日期
		}
	},
	mounted(){
		var myDate = new Date();
		var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		var month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1;       //获取当前月份(1-12)
		var day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();        //获取当前日(1-31)
		this.newDay = year + '' +  month + '' + day; //获取完整年月日
	},
	components: {
		formInput,
		certificate
	},
	methods: {
		//获取身份证正面信息
		getFrontInfo(data, img) {
			if(!data.name || !data.idcard_number){
				alertTip('身份证识别有误，请重新上传');
				this.$refs.front.img = '';
				return;
			}
			this.idcard.name = data.name.result;
			this.idcard.idcard_number =  data.idcard_number.result;
			this.idcard.front_img = img;
			this.frontFlag = true;
		},
		//获取身份证背面信息
		getRearInfo(data, img) {
			if(!data.issued_by || !data.valid_date_start || !data.valid_date_end){
				alertTip('身份证识别有误，请重新上传');
				this.$refs.front.img = '';
				return;
			}
			this.idcard.issued_by = data.issued_by.result;
			this.idcard.valid_date_start =  data.valid_date_start.result;
			this.idcard.valid_date_end =  data.valid_date_end.result;
			this.idcard.rear_img = img;
			this.rearFlag = true;
		},
		//确认提交
		confirm() {
			if (!this.frontFlag) {
				alertTip('请上传身份证正面');
				return;
			}
			if (!this.rearFlag) {
				alertTip('请上传身份证背面');
				return;
			}
			if(!this.idcard.name){
                alertTip('姓名识别错误，请重新上传');
                return;
            };
            if(this.isCardID(this.idcard.idcard_number) !== true){
                alertTip('身份证号识别错误，请重新上传');
                return;
            }
            if(!this.idcard.issued_by){
                alertTip('签发机关识别错误，请重新上传');
                return;
            }
            if(!this.idcard.valid_date_start || !this.idcard.valid_date_end){
                alertTip('有效日期识别错误，请重新上传');
                return;
            }
			if(isNaN(this.idcard.valid_date_start) || isNaN(this.idcard.valid_date_end)){
				alertTip('有效日期识别错误，请重新上传');
				return;
			}
			// 今天日期大于结束日期
			if(this.newDay > this.idcard.valid_date_end && this.newDay > this.idcard.valid_date_start){
				this.restartVisible = true;
				return;
			}
            // 判断是否实名认证过
            fetchGetmemberbyidcard(this.idcard.idcard_number).then(res => {
                //认证过
                if(!res.data.existFlag){
                    this.$confirm({
                        layerImg:'',
                        showClose:false,
                        content:`<p class="mt30">此身份已与其他用户（手机尾号：${res.data.mobile} ）绑定，请重新认证</p>`,
                        confirmBtn:'重新认证',
                        confirm:()=>{
                            this.frontFlag = false;
							this.rearFlag = false;
                        }
                    })
                }
                //没认证，显示确认弹窗
                else{
                    this.time = 5;
                    this.affirmVisible = true;
                    let t = setInterval(()=>{
                        this.time -- ;
                        if(this.time <= 0){
                            clearInterval(t);
                        }
                    },1000)
                }
            })
		},
		// 实名认证
        setIdcard(){
            if(this.time > 0){
                return;
            }
            const data = {
                realName:this.idcard.name,
                cardNo:this.idcard.idcard_number,
                idCardFrontSide:this.idcard.front_img,
                idCardBackSide:this.idcard.rear_img,
                signOffice:this.idcard.issued_by,
                idCardStart:this.$options.filters.time(this.idcard.valid_date_start,'-'),
                idCardEnd:this.$options.filters.time(this.idcard.valid_date_end,'-')
            }
            fetchSaveidcardinfo(data).then(res => {
                if(res && res.status){
                    alertTip('身份认证成功',()=>{
                        this.$router.push('/faceApprove');
                    });
                }
            })
        }
	},
    filters:{
        idcard(val){
            val = String(val);
            return val.substring(0,6) + ' ' + val.substring(6,14) + ' ' + val.substring(14);
        },
        time(val,sign){
            val = String(val);
            return val.substring(0,4) + sign + val.substring(4,6) + sign + val.substr(6);
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
#canvas {
	display: none;
	width: 3.1rem;
	height: 1.97rem;
}
.l_certicate_hint {
	.plr30;
	.ptb20;
	line-height: 2;
	.f26;
}

.l_certicate_mess {
	.l_title {
		line-height: 0.87rem;
		.f28;
	}
}

.l_area_ul {
	height: 1.16rem;
	.border-b(@line_color);
	&.noline {
		border: none;
	}
	li {
		.pos_rel;
		overflow: hidden;
		.flex;
		.justify_center;
		.flex_column;
		.pull_left;
		width: 1.61rem;
		height: 0.71rem;
		margin-right: 0.15rem;
		.text_center;
		.border;
		.c_666;
		.f22;
	}

	img {
		display: block;
		height: 0.15rem;
		margin: 0 auto;
		.mt5;
	}

	.l_active {
		.c_main;
		border-color: @color;
	}

	i {
		position: absolute;
		right: -0.02rem;
		bottom: -0.04rem;
		line-height: 1em;
		.f30;
		@media(max-width:600px) {
			right: -0.03rem;
		}
		@media(max-width:450px) {
			right: -0.04rem;
		}
	}
}

.l_input {
	.from_item {

		.from_item_title {
			color: #333;
		}
	}

	.from_item.left {
		.from_item_select input {
			.text_left;
		}
	}
	.input {
		position: relative;
		.flex;
		.justify_between;

		input {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		span {
			line-height: 0.87rem;
			color: #666;
			.f28;
		}

		i {
			position: absolute;
			right: 0;
			color: #bbb;
		}
	}
}
.ptb40{
    padding-top: .4rem;
    padding-bottom: .4rem;
}

.tip{
    position: fixed;
    bottom: 1.35rem;
    left: 0;
    right: 0;
    text-align: center;
}
.layer_btn{
    width: auto;
}
.layer_box{
    padding-top: .7rem;
    img{
        width: 1.44rem;
        height: 1.9rem;
    }
    p{
        line-height: 2;
    }
    .max{
        width: 3.4rem;
    }
    .min{
        width: 2.25rem;
    }

}
.affirm{
    .layer_box{
        padding-top: .2rem;
    }
    .layer_btn{
        width: 100%;
    }
}
.wrap{
	position: relative;
}
.authen_item{
	width: 100%;
	height: 2.7rem;
    display: flex;
    align-items: center;
    padding-left: .3rem;
    .border-b(@line_color);
	background: #fff;
	position: absolute;
	top:0;
	left: 0;
    .img{
        width: 1.2rem;
        height: 1.2rem;
        overflow: hidden;
        position: relative;
        img{
            max-width: 100px;
        }
        .img_pop{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left: 0;
            background:rgba(0,0,0,.3);
            color: #fff;
        }
    }
    .authen_cell{
        flex:1;
        margin-left: .3rem;
        .authen_cell_item{
            display: flex;
            height: 1.35rem;
            line-height: 1.35rem;
            padding-right: .3rem;
            &:first-child{
                .border-b(@line_color);
            }
            .cell_n{
                width: 1.5rem;
            }
            .cell_c{
                flex:1;
            }
        }
    }
}
</style>
