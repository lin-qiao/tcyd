<!-- 上传证件 -->
<template lang="html">
    <div class="certificate_img" :class="{'active' : img}">
        <label class="wrap">
            <img :src="img" v-if="img">
            <img
                v-else
                :src="type == 1 ? require('../images/uploads_bg_2.png') : require('../images/uploads_bg_4.png')"
            >
            <div class="certificate_title">
                {{ type == 1 ? '上传身份证正面' : '上传身份证背面' }}
            </div>
            <input ref="input" @change="uploadImg($event)" type="file">
        </label>
    </div>
</template>

<script>
import { fetchUploadFile } from 'src/service/getData';
import { fetchU } from 'src/config/fetch';
import { mapState } from 'vuex';
export default {
    data(){
        return{
            img:'',
        }
    },
    props: {
        type:{
            default:1,  // 1正面 2背面
        },
    },
    computed:{
        ...mapState([
            'api_key',
            'api_secret'
        ])
    },
    methods: {
        async uploadImg(event) {
            let files = event.target.files,
                file;
            if(files && files.length > 0) {
                // 获取目前上传的文件
                file = files[0];
                if(file.type.indexOf('image') == -1) {
                    window.alertTip("上传附件只能是图片！");
                    event.target.value="";
                    return;
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
            var formData = new FormData();
            formData.append("return_portrait","1");
            if(type=='blob'){
            	formData.append("image", file, "file_"+Date.parse(new Date())+".jpg");
            }else{
            	formData.append('image', file)
            }
            fetchU('/tc/member/faceid/ocridcard', formData).then(res => {
                if(!res.status){
                    alertTip(res.msg);
                    return;
                }
                let data = JSON.parse(res.data);
                if(data.error){
                    if(data.error == "ID_CARD_NOT_FOUND"){
                        alertTip('图片中没有找到身份证');
                        return;
                    }
                    if(data.error == 'INVALID_IMAGE_SIZE: image'){
                        alertTip('图片的像素不符合要求，图片像素多大或者过小');
                        return;
                    }
                    alertTip(data.error);
                    this.$refs.input.value = '';
                }else{
                    this.uploadLocal(file,data,type)
                }
            })
        },
        //上传到本地服务器取会图片链接
        uploadLocal(file,idcard,type){
            var formData = new FormData()
            formData.append('pathType', 'member_auth_img_path');
            if(type=='blob'){
            	formData.append("file", file, "file_"+Date.parse(new Date())+".jpg");
            }else{
            	formData.append('file', file)
            }
            fetchUploadFile(formData).then(res => {
                this.$refs.input.value = '';
              if (res && res.status) {
                  alertTip('上传完成！');
                  this.$emit('get', idcard, res.data);
              }else{
                  alertTip(res.msg);
              }
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
    },
}
</script>

<style lang="less" scoped>
.certificate_img {
  width: 6.9rem;
  height: 2.7rem;
  background-color: #f3f3f3;
  margin: 0 auto .3rem auto;
  border-radius: 3px;
  text-align: center;

  .wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
  }

  input {
    display: none;
  }

  img {
    position: relative;
    width: 2.03rem;
    height: 1.4rem;
    margin-bottom: 0.25rem;
  }

   .certificate_title{
       color: #555;
       font-size: .26rem;
   }
  &.active {
    background: url("../images/upload_bj.jpg");
    background-size: 100%;

    img {
      width: 3.1rem;
      height: 1.97rem;
      margin: 0;
    }

    .certificate_title{
        display: none;
    }
  }
}
</style>
