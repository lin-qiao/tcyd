<!--单元格，可用作展示列表信息-->
<template lang="html">
    <div class="cell" @click="go">
        <div class="cell_wrap" :style="{'height': height/100 + 'rem'}" :class="{'border-n':noBorder}">
            <div class="cell_tit">
                <i class="iconfont" :class="icon" v-if="icon" :style="{'color':color}"></i>
                <slot name="img"></slot>
                <div :class="{'cell_tit_con':isIcon}">
                    <span class="cell_tit">{{title}}<slot name="icon"></slot></span>
                    <span class="cell_subtitle" v-if="subtitle" v-html="subtitle"></span>
                    <span class="cell_label" v-if="label">{{label}}</span>
                </div>
            </div>
            <div class="cell_value">
                <span v-if="value" :class="{'c_333':isDark}">{{value}}</span>
                <slot></slot>
            </div>
            <div class="cell_link" v-if="isLink">
                <i class="iconfont icon-arrow-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        height:{  //单元格高度
            type:Number,
            default:100
        },
        title:{  //标题
            type:String,
            default:'',
        },
        value:{  //内容
            default:''
        },
        icon:{  //图标
            type:String,
            default:''
        },
        color:{  //图片颜色
            type:String,
            default:''
        },
        to:{   //跳转链接
            type:String,
            default:''
        },
        isLink:{  //链接，会显示箭头图标。搭配 to 属性使用
            type:Boolean,
            default:false
        },
        label:{    //备注信息，显示在标题下方
            type:String,
            default:''
        },
        subtitle:{//副标题
        	type:String,
            default:''
        },
        isDark:{//是否加深颜色
        	type:Boolean,
            default:false
        },
        noBorder:{//是否边框
        	type:Boolean,
            default:false
        },
        handleClick:{//点击回调
        	type:Function,
        },
        isIcon:{//是否有左侧图标
        	type:Boolean,
        	default:true
        }
    },
    methods:{
        go(){
        	if(this.handleClick){
        		this.handleClick();
        	}
        	this.$emit("handleClick");
            if(this.to){
                this.$router.push(this.to)
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .cell{
        padding-left: .3rem;
        background: #fff;
        .cell_wrap{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e8e8e8;
            padding-right: .68rem;
            position: relative;
        }
        .cell_tit{
            display: flex;
            flex:1;
            align-items: center;
            .iconfont{
                font-size: .56rem;
            }
            img{
                width: .54rem;
                height: .54rem;
            }
            .cell_tit_con{
                margin-left: .2rem;
            }
            .cell_tit{
                font-size: .28rem;
                line-height: 1;
            }
            .cell_subtitle{
            	display: block;
            	font-size: .26rem;
                line-height: 1;
                color:#333;
                margin-top:0.12rem;
            }
            .cell_label{
                display: block;
                color: #666;
                font-size: .26rem;
                line-height: 1;
                margin-top: .15rem;
            }
        }
        .cell_value{
            font-size: .28rem;
            color: #999;
        }
        .cell_link{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: .38rem;
            height: 100%;
            position: absolute;
            right:.3rem;
            top:0;
            .iconfont{
                font-size: .3rem;
                color: #bbb;
            }
        }
    }
</style>
