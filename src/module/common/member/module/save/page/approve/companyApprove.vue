<!-- 企业认证 -->
<template>
	<div>
		<!--S 头部-->
		<top title="提交信息" :isReturn="false"></top>
		<!--E 头部-->
		<!--S 提示-->
		<p class="l_certicate_hint">仅用于全国公民身份证查询中心核实身份<br>拍摄时请确保身份证<em class="c_orange">边框完整、字迹清晰、亮度均衡</em></p>
		<!--E 提示-->
		<!--S 区域选择-->
		<div class="l_certicate_mess l_input">
			<h3 class="l_title ml30">区域选择</h3>
			<ul class="l_area_ul ml30 pr30">
				<li v-for="(el,i) in areaList" :class="{l_active:areaStatus==i,mr0:(i+1)==areaList.length}" @click="areaStatus=i">
					{{el.name}}
					<img :src="areaStatus==i?el.active:el.img" />
					<i class="iconfont icon-xuanzhong1" v-if="areaStatus==i"></i>
				</li>
			</ul>
			<form-input title="企业名称：" class="left" v-model="allData.company" maxlength="50"></form-input>
			<form-input title="营业执照编号：" class="left" v-model="allData.businessLicense"></form-input>
			<form-date title="发证日期："  v-if="areaStatus==2" ></form-date>
		  	<form-input v-if="areaStatus==2" title="发证地点：" class="left" v-model="allData.businessArea" maxlength="10"></form-input>
			<formSelect title="补领换类别：" class="left" v-if="certificate.length != 0&&areaStatus==2" :list="certificate" v-model="businessNum" @click="savedata($event)"></formSelect>
		</div>
		<div class="line_box"></div>
		<!--E 区域选择-->
		<!--S 填写内容-->
		<div class="l_input">
			<form-input title="法定代表人姓名：" class="left" v-model="allData.realName" maxlength="20"></form-input>
			<form-select title="法定代表人身份选择：" class="left"  v-if="identityArray.length != 0" :list="identityArray" v-model="identityNum" @click="savedata($event)"></form-select>
			<form-input title="法定代表人身份证号：" class="left" v-model="allData.idNumber"></form-input>
			<form-date title="发证日期："  v-if="identityNum==2" ></form-date>
		  	<form-input v-if="identityNum==2" title="发证地点：" class="left" v-model="allData.certificateArea" maxlength="10"></form-input>
			<formSelect title="补领换类别：" class="left" v-if="certificate.length != 0&&identityNum==2" :list="certificate" v-model="certificateNum" @click="savedata($event)"></formSelect>
			<div class="l_certicate_mess plr30 pb121 c_666">
				<h3 class="l_title">证件图片：</h3>
				<certificate
                    :initImg="require('../../images/uploads_bg_2.png')"
                    title="上传身份证正面">
                </certificate>
				<certificate
                    :initImg="require('../../images/uploads_bg_4.png')"
                    title="上传身份证背面">
                </certificate>
				<certificate
                    :initImg="require('../../images/uploads_bg_5.png')"
                    title="营业执照照片">
                </certificate>
			</div>
			<div class="btn_wrap">
				<a class="btn_block gray_btn" @click="savePersonal">认证</a>
			</div>
		</div>
		<canvas ref="canvas" id="canvas" :width="width+'px'" :height="height+'px'"></canvas>
		<!--E 填写内容-->
	</div>
</template>

<script>
	import l_china from '../../images/l_china.png'
    import l_china_active from '../../images/l_china_active.png'
	import l_hk from '../../images/l_hk.png'
    import l_hk_active from '../../images/l_hk_active.png'
	import l_tawan from '../../images/l_tawan.png'
    import l_tawan_active from '../../images/l_tawan_active.png'
	import l_over from '../../images/l_over.png'
	import l_over_active from '../../images/l_over_active.png'

    import formInput from 'src/components/formItem/formInput';
	import formSelect from 'src/components/formItem/formSelect';
	import formDate from 'src/components/formItem/formDate';
	import certificate from '../../components/certificate';
	import {
		check,
		trim
	} from 'src/config/mUtils';
	import {
		certification,uploadImage,checkAuthStatus,qualifyResult
	} from 'src/service/getData';
	export default {
		data() {
			return {
				areaList: [{
					name: '中国大陆',
					img: l_china,
					active: l_china_active
				}, {
					name: '港澳地区',
					img: l_hk,
					active: l_hk_active
				}, {
					name: '台湾地区',
					img: l_tawan,
					active: l_tawan_active
				}, {
					name: '海外地区',
					img: l_over,
					active: l_over_active
				}],
				idCardImg: {
					face: '',
					back: '',
					other: ''
				}, //身份证图片json 存储 正反面{“face”:'face','back':'back','other':'other'}
				areaStatus: 0, //地区选择
				identityNum:0, //默认第一个
				identityArray: ['中国大陆', '港澳地区', '台湾地区', '海外地区'], //企业法定代表人身份数组
				certificateNum: 0, //默认第一个
				businessNum:0,////默认第一个
				certificate: ['新', '补', '换'], //补领换类别数组
 				allData: {
					realName: '', //法定代表人姓名
					area: '', //区域选择：1表中国大陆；2表港澳地区；3表台湾地区；4表海外地区
					idNumber: '', //法定代表人身份证号
					fontPic: '',
					backPic: '',
					licencePic:'',
					certificateDate: '', //发证日期（台湾地区）：身份证、营业执照 {'idCard':' ','businessLicense':' '}
					certificateArea: '', //发证地点（台湾地区）：身份证、营业执照 {'idCard':' ','businessLicense':' '}
					authCategory: 2, //认证类型：1表个人；2表企业
					certificateType: '' ,//补领换类别：1表新；2表补；3表换 身份证、营业执照 {'idCard':1,'businessLicense':1}
 					identity:'',//企业法定代表人身份
 					company:'',//企业名称
 					businessLicense:'',//企业营业执照编号
 					businessArea:'',// 	String 	Y 		营业执照的发证地点
					businessType:'',// 	String 	Y 		营业执照的补换领类别
					businessDate:'',// 	String 	Y 		营业执照的发证日期
					flag:1//1添加2修改
				},
				width:310,//画布大小
				height:197
			}
		},
		components: {
			formInput,
			formSelect,
			formDate,
			certificate
		},
		mounted() {

		},
		activated(){
			this.allData={
				realName: '', //法定代表人姓名
				area: '', //区域选择：1表中国大陆；2表港澳地区；3表台湾地区；4表海外地区
				idNumber: '', //法定代表人身份证号
				fontPic: '',
				backPic: '',
				licencePic:'',
				certificateDate: '', //发证日期（台湾地区）：身份证、营业执照 {'idCard':' ','businessLicense':' '}
				certificateArea: '', //发证地点（台湾地区）：身份证、营业执照 {'idCard':' ','businessLicense':' '}
				authCategory: 2, //认证类型：1表个人；2表企业
				certificateType: '' ,//补领换类别：1表新；2表补；3表换 身份证、营业执照 {'idCard':1,'businessLicense':1}
				identity:'',//企业法定代表人身份
				company:'',//企业名称
				businessLicense:'',//企业营业执照编号
				businessArea:'',// 	String 	Y 		营业执照的发证地点
				businessType:'',// 	String 	Y 		营业执照的补换领类别
				businessDate:'',// 	String 	Y 		营业执照的发证日期
				flag:1//1添加2修改
			}
			this.areaStatus = 0;
			this.certificateNum = 0;
			this.identityNum = 0;
			this.businessNum = 0;
			checkAuthStatus(2).then(res=>{
				if(res.data&&res.data.info){
					let info = res.data.info;
					if(info.certificateType == '换'){}
					this.allData={
						realName: info.realName, //法定代表人姓名
						area: info.area, //区域选择：1表中国大陆；2表港澳地区；3表台湾地区；4表海外地区
						idNumber: info.idNumber, //法定代表人身份证号
						fontPic: info.fontPic.slice(info.fontPic.indexOf('com/')+4),
						backPic: info.backPic.slice(info.fontPic.indexOf('com/')+4),
						licencePic:info.licencePic.slice(info.fontPic.indexOf('com/')+4),
						certificateDate: info.certificateDate||'', //发证日期（台湾地区）：身份证、营业执照 {'idCard':' ','businessLicense':' '}
						certificateArea: info.certificateArea||'', //发证地点（台湾地区）：身份证、营业执照 {'idCard':' ','businessLicense':' '}
						authCategory: 2, //认证类型：1表个人；2表企业
						certificateType: ['新', '补', '换'].indexOf(info.certificateType),//补领换类别：1表新；2表补；3表换 身份证、营业执照 {'idCard':1,'businessLicense':1}
	 					identity:this.identityArray.indexOf(info.identity),//企业法定代表人身份
	 					company:info.company,//企业名称
	 					businessLicense:info.businessLicence,//企业营业执照编号
	 					businessArea:info.businessArea,// 	String 	Y 		营业执照的发证地点
						businessType:['新', '补', '换'].indexOf(info.businessType),// 	String 	Y 		营业执照的补换领类别
						businessDate:info.businessDate,// 	String 	Y 		营业执照的发证日期
						flag:2,//1添加2修改
					}
					this.areaStatus = this.allData.area-1;
					this.certificateNum = this.allData.certificateType;
					this.identityNum = this.allData.identity;
					this.businessNum = this.allData.businessType;
				}else{
					qualifyResult().then(res=>{
						check(this,res,()=>{
							if(res.data){
								if(res.data.companyResult||res.data.personResult){
									this.allData.flag = 2;
								}
							}

						})
					})
				}
			})
		},
		methods: {
			savePersonal() {
				this.allData.area = this.areaStatus+1;
				this.allData.certificateType = parseInt(this.certificateNum)+1;
				this.allData.identity = parseInt(this.identityNum)+1;
				this.allData.businessType = parseInt(this.businessNum)+1;
				var reg = new RegExp("^((1[3-8][0-9]))\\d{8}$");
				this.allData.company = trim(this.allData.company);
				this.allData.businessLicense = trim(this.allData.businessLicense);
				this.allData.realName = trim(this.allData.realName);
				this.allData.idNumber = trim(this.allData.idNumber);
				this.allData.certificateArea = trim(this.allData.certificateArea);
				if(!this.allData.company) {
					alertTip("请输入企业名称！");
					return;
				}
				if(this.allData.company.length<4) {
					alertTip("请输入4-50位的企业名称！");
					return;
				}
				if(!this.allData.businessLicense) {
					alertTip("请输入企业营业执照编号！");
					return;
				}
				if(this.areaStatus == 2) {
					if(!this.allData.businessDate) {
						alertTip('请选择营业执照发证日期！');
						return;
					}
					if(!this.allData.businessArea) {
						alertTip("请输入营业执照发证地点！");
						return;
					}
					if(this.allData.businessArea.length<2) {
						alertTip("请输入2-10位的企业发证地点！");
						return;
					}
				}
				if(this.areaStatus != 2) {
					this.allData.certificateDate="";
					this.allData.certificateArea="";
					this.allData.certificateType = '';
				}
				if(!this.allData.realName) {
					alertTip("请输入法定代表人姓名！");
					return;
				}
				if(!this.allData.idNumber) {
					alertTip("请输入法定代表人身份证号！");
					return;
				}
				if(this.identityNum==0&&this.isCardID(this.allData.idNumber) != true){
			        alertTip(this.isCardID(this.allData.idNumber));
			        return;
				}
				if(this.identityNum == 2) {
					if(!this.allData.certificateDate) {
						alertTip('请选择发证日期！');
						return;
					}
					if(!this.allData.certificateArea) {
						alertTip("请输入发证地点！");
						return;
					}
					if(this.allData.certificateArea.length<2) {
						alertTip("请输入2-10位的企业发证地点！");
						return;
					}
				}
				if(this.identityNum != 2) {
					this.allData.businessDate="";
					this.allData.businessArea="";
					this.allData.businessType = '';
				}
				if(!this.allData.fontPic) {
					alertTip("请上传身份证正面！");
					return;
				}
				if(!this.allData.backPic) {
					alertTip("请上传身份证背面！");
					return;
				}
				if(!this.allData.licencePic) {
					alertTip("请上传营业执照照片！");
					return;
				}
				certification(this.allData).then(res => {
					check(this, res, () => {
						if(res.data&&res.data.id5Result==3){
							this.$router.push({path:"/mdFail",query:{url:this.$route.query.url}})
						}else{
							this.$router.push({path:"/certificate",query:{url:this.$route.query.url}})
						}
					})
				})
			},
			//验证身份证
		    isCardID(sId){
		      let aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
		      let iSum=0 ;
		      let info="" ;
		      if(!/^\d{17}(\d|X)$/.test(sId)) return "你输入的身份证长度或格式错误";
		      sId=sId.replace(/x$/i,"a");
		      if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
		      let sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
		      let d=new Date(sBirthday.replace(/-/g,"/")) ;
		      if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
		      for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
		      if(iSum%11!=1) return "你输入的身份证号非法";
		      return true;
		    },
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
      .bg_gray;
      .border-b;
      line-height: 1.5em;
      .f26;
      .c_999;
    }

    .l_certicate_mess {
      .l_title {
        line-height: 0.87rem;
        .f28;
      }
    }

    .l_area_ul {
      height: 1.16rem;
      .border-b;

      li {
        .pos_rel;
        overflow: hidden;
        .flex;
        .justify_center;
        .flex_column;
        .pull_left;
        width: 1.61rem;
        height: 0.71rem;
        margin-right: .15rem;
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
</style>
