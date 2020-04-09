<template lang="html">
	<div class="upload">
		<div class="y_upfile pos_rel">
			<div class="upfile_img_box" v-if="count!=1"  v-for="(el,i) in imgList">
			    <img  class="upfile_img" :src="el|imgUrl" @click="look(i)" width="100%" height="100%"/>
			    <i class="iconfont icon-close" @click="delImg(i)"></i>
			</div>
			<div class="upfile_img_box" v-if="count==1&&value">
			    <img class="upfile_img" :src="value|imgUrl" @click="look(0)" width="100%" height="100%"/>
			    <i class="iconfont icon-close" @click="delImg" v-if="isShowClose"></i>
			</div>
			<form class="upfile_img_box" action=""  method="post" enctype="multipart/form-data"  v-if="!(count==1&&value&&isShowClose)&&count!=imgList.length">
				<div class="z_remark" v-show="isRedpacket">
	              <p class="f22">发布照片或视频，您将有机会获得20元红包！</p>
	              <i class="iconfont icon-close f28" @click.stop="closeRedpacket"></i>
	            </div>
				<label :class="{cover_img:!isShowClose}">
		     	<div class="button" v-if="upShow">
		          <i class="iconfont icon-jia"></i>
		        </div>
		        <div class="c_tips_words" v-if="onTip">
			        <span>添加附件</span>
			        <span class="c_red f20">最多上传{{count}}个小于{{size}}M的文件</span>
		        </div>
				<input type="file" @change="uploadImg($event)" v-if="upShow">
				</label>
			</form>
		</div>
		<!--S 附件轮播-->
		<div class="upload_bg" v-if="show&&imgList.length">
			<div class="swiper-container accessory" id="J_accessory">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="el in imgList" v-if="count!=1">
						<div class="swiper_img_box">
							<img :src="el | imgUrl" />
						</div>
					</div>
					<div class="swiper-slide" v-if="count==1&&value">
						<div class="swiper_img_box">
							<img :src="value | imgUrl" />
						</div>
					</div>
				</div>
				<div class="swiper-pagination"></div>
				<div class="swiper-button-prev" @click.stop="" v-if="imgList.length>1">
					<i class="iconfont icon-arrow-left"></i>
				</div>
				<div class="swiper-button-next" @click.stop="" v-if="imgList.length>1">
					<i class="iconfont icon-arrow-right"></i>
				</div>
				<i class="iconfont icon-guanbi" @click="show=false"></i>
			</div>
		</div>
		<!--E 附件轮播-->
	</div>
</template>

<script>
import { fetchUploadFile } from 'src/service/getData'
import {imgBaseUrl} from 'src/config/env'
export default {
  name: 'uploadImg',
  data() {
    return {
      show: false, //是否显示轮播
      index: 1, //轮播的下标
      imgBaseUrl
      // imgList:[],
    }
  },
  props: {
    count: {
      default: 5
    },
    size: {
      default: 2
    },
    imgList: {
      //图片列表
      type: Array,
      default() {
        return []
      }
    },
    onTip: {
      default: false
    },
    upShow: {
      default: true
    },
    pathType: {
      // required: true
    },
    value: {
      //单张图片
      default: ''
    },
    isShowClose: {
      //图片上是否显示右上角的删除按钮
      default: true
    },
    isRedpacket: {
      //是否展示有机会获得红包提示
      default: false
    },
    isAvatar:{
    	//是否是头像上传
    	default: false
    }
  },
  methods: {
    async uploadImg(event) {
      if (this.count != 1 && this.imgList.length >= this.count) {
        window.alertTip('最多只能上传' + this.count + '个附件！')
        event.target.value = ''
        return
      }
      let files = event.target.files
      let file;

      if (files && files.length > 0) {
        // 获取目前上传的文件
        file = files[0]
        if (file.type.indexOf('image') == -1) {
          window.alertTip('上传附件只能是图片！')
          event.target.value = ''
          return
        }
        // if(file.size > 1024 * 1024 * this.size) {
        // 	window.alertTip("附件大小不能超过" + this.size + "MB!");
        // 	event.target.value="";
        // 	return;
        // }
        // 压缩图片
        try {
        	let name = file.name
        	let uploadFile = await this.getBase64Image(file)
        	uploadFile = this.convertBase64UrlToBlob(uploadFile, name)
        	this.toUploadImg(uploadFile,'blob');
		}
		catch(err) {
		    console.log(err);
		    this.toUploadImg(file,'file');
		}
      }
    },
    toUploadImg(file,type){
        var formData = new FormData()
        formData.append('pathType', this.pathType)
        if(type=='blob'){
        	formData.append("file", file, "file_"+Date.parse(new Date())+".jpg");
        }else{
        	formData.append('file', file)
        }
        fetchUploadFile(formData).then(res => {
          if (res && res.status) {
            if (this.count == 1) {
              this.$emit('input', res.data)
            } else {
              this.imgList.push(res.data)
            }
          }
          event.target.value = ''
        })
    },
    // 图片压缩并转base64
    async getBase64Image(file) {
      var canvas = document.createElement('canvas')
      const readFileAsync = file =>
        new Promise(resolve => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = e => {
            let json = e.target.result
            var ctx = canvas.getContext('2d')
            var beauty = new Image()
            beauty.src = json
            beauty.onload = () => {
              var imgWidth = beauty.width
              var imgHeight = beauty.height
              var width = beauty.width
              var height = beauty.height
              if(this.isAvatar){
              	width = width>height?width:height;
              	height = width>height?width:height;
              }
              canvas.width = width
              canvas.height = height
              ctx.fillStyle = "#fff";
              ctx.fillRect(0,0,width,height);
              if(this.isAvatar){
              	ctx.drawImage(beauty, (width-imgWidth)/2, (height-imgHeight)/2, imgWidth, imgHeight)
              }else{
              	ctx.drawImage(beauty, 0, 0, width, height)
              }
              var dataUrl = canvas.toDataURL('image/jpeg', 0.8)
              return resolve(dataUrl)
            }
          }
        })
      return await readFileAsync(file)
    },
    // base64转Blob对象
    convertBase64UrlToBlob(urlData){
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    },
    look(i) {
      this.show = true
      this.index = i + 1
      this.getSwiper(i)
    },
    getSwiper(i, j) {
      if (this.imgList.length > 1) {
        this.$nextTick(() => {
          new Swiper('#J_accessory', {
            loop: true,
            grabCursor: true,
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            observer: true,
            initialSlide: i,
            onSlideChangeEnd: swiper => {
              this.index = swiper.activeIndex //切换结束时，告诉我现在是第几个slide
            },
            onTransitionEnd: function(swiper) {
              swiper.enableTouchControl()
            }
          })
        })
      } else {
        this.$nextTick(() => {
          new Swiper('#J_accessory', {
            loop: true,
            grabCursor: true,
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            observer: true,
            initialSlide: i,
            onSlideChangeEnd: swiper => {
              this.index = swiper.activeIndex //切换结束时，告诉我现在是第几个slide
            },
            onSetTransition: function(swiper) {
              swiper.disableTouchControl()
            }
          })
        })
      }
    },
    delImg(index) {
      if (this.count != 1) {
        this.imgList.splice(index, 1)
      } else {
        this.$emit('input', '')
      }
    },
    closeRedpacket() {
      this.isRedpacket = false;
    }
  }
}
</script>
<style lang="less">
	.dynamic_classify{
		.form_check_out .form_btn span{
			color: #999;
		}
	}
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.upfile_img{
	width: 1rem;
	height: 1rem;
	background-size: cover;
}
.upload_bg .swiper-container img{
	  max-width: 100%;
	  width:auto !important;
	  margin:0 auto;
}
#canvas {
  display: none;
}
.upload {
  padding: 0 0.3rem;
}
.y_upfile {
  display: flex;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
  padding-top: 0.36rem;
  .upfile_img_box {
    width: 1.8rem;
    height: 1.8rem;
    flex-shrink: 0;
    border: 1px solid #e0e0e0;
    margin-right: 0.68rem;
    margin-bottom: 0.6rem;
    position: relative;
    &:nth-child(3n){
    	margin-right: 0;
    }
    .icon-close {
      position: absolute;
      right: -0.2rem;
      top: -0.2rem;
      font-size: 0.4rem;
      color: #ccc;
      border: 1px solid #fff;
      background: #fff;
      border-radius: 50%;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .z_remark{
    	.flex;
    	.flex_center;
   		.justify_center;
	    width: 3.1rem;
	    padding:0.08rem 0.1rem;
	    position: absolute;
	    right: -2.3rem;
	    top: -0.48rem;
	    background: #fff7ea;
	    z-index:10;
      i{
          position: absolute;
          right: -0.1rem;
          top: -0.15rem;
          width: 0.3rem;
          height: 0.3rem;
          color: #fba723;
          background: #fff;
          border-radius: 50%;
      }
      p{
          color: #fba723;
          text-align: center;
          line-height: 1.5;
      }
    }
  label {
  	width: 100%;
  	height: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }
  .cover_img {
    position: absolute;
    top: 0;
    opacity: 0;
  }
  input {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .button {
    width: 100%;
    height: 100%;
    background: #fff;
    margin-right: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .c_tips_words {
    width: auto;
  }

  span {
    font-size: 0.24rem;
    color: #777;
  }

  i {
    font-size: 0.4rem;
    color: #c9c9c9;
  }
}
.upload_bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 22;
}
.accessory {
  padding: 2rem 0 1rem;
  .swiper-button-prev,
  .swiper-button-next {
    bottom: 0;
    background: rgba(215, 215, 215, 0.5);
    width: 0.64rem;
    height: 0.64rem;
    border-radius: 50%;
    text-align: center;
    i {
      font-size: 0.4rem;
      line-height: 0.64rem;
      color: #fff;
    }
  }
  .swiper-pagination {
    font-size: 0.3rem;
    color: #ffffff;
  }
  i.icon-guanbi {
    position: absolute;
    top: 1.2rem;
    right: 0.3rem;
    color: #fff;
    font-size: 0.6rem;
  }
}
</style>
