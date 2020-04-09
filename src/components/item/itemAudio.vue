<template lang="html">
    <div class="item_audio" @click.stop="onPlay">
        <img :src="img" class="item_audio_img mr10">
        <span>{{time}}″</span>
        <audio v-if="play" :src="src|imgUrl" autoplay="autoplay" ref="audio">您的浏览器不支持该音频格式。</audio>
    </div>
</template>

<script>
export default {
    data(){
        return{
        	play:false,
            img:require('../images/audio_stop.png')
        }
    },
    props:{
        src:{
            type:String,
            default:'',
        },
        time:{
        	default:0
        }
    },
    methods:{
    	onPlay(){
    		let itemAudios = document.querySelectorAll('.item_audio');
    		for(let i=0;i<itemAudios.length;i++){
    			let itemAudio = itemAudios[i].getElementsByTagName('audio')[0];
    			if(itemAudio){
    				itemAudios[i].removeChild(itemAudio);
    			}
    		}
    		this.play = true;
    	}
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.item_audio{
	display: inline-flex;
	.flex_center;
	.justify_center;
	position: relative;
	min-width: 1rem;
	max-width: 100%;
	width: 2rem;
	margin-left: 0.16rem;
	text-align: center;
	height: 0.58rem;
	background: #49c68c;
	.border-radius(0.29rem);
	line-height: 0.58rem;
	text-align: center;
	color: #fff;
	font-size: 0.26rem;
	&:after{
		position: absolute;
		left: -0.16rem;
		bottom: 0.05rem;
		display: block;
		width: 0.26rem;
		height: 0.18rem;
		content: "";
		background: url(../images/voice_bg.png) no-repeat center;
		background-size: 100%;
	}
    .item_audio_img{
        width: .22rem;
        height: .32rem;
    }
}
</style>
