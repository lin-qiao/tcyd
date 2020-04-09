<!--记录-->
<template lang="html">
    <div class="cell" @click="goDetail">
        <div class="cell_wrap" :style="{'height': height/100 + 'rem'}">
            <div class="cell_tit">
                <slot name="img"></slot>
                <div class="cell_tit_con">
                    <span class="cell_tit">{{title}}</span>
                    <span class="cell_label" v-if="label">{{label}}</span>
                </div>
            </div>
            <div class="cell_content">
            	<span :class="className">{{money}}</span>
            	<span class="c_999 f24">{{smallCategory}}</span>
            </div>
            <div class="cell_value">
                <span>{{value}}</span>
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
            default:142
        },
        title:{  //标题
            type:String,
            default:'',
        },
        value:{  //内容
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
        money:{//金额
        	default:''
        },
        className:{//新增class
        	default:''
        },
        smallCategory:{
        	type:String,
            default:''
        }
    },
    methods:{
        goDetail(){
            this.$emit("detailUrl")
        }
    }
}
</script>

<style lang="less" scoped>
    .cell{
        padding-left: .3rem;
        color:#666666;
        .cell_wrap{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e8e8e8;
            padding-right: .68rem;
            position: relative;
            justify-content: space-around;
        }
        .cell_tit{
            display: flex;
            flex:auto;
            align-items: center;
            .iconfont{
                font-size: .56rem;
            }
            img{
                width: .92rem;
                height: .92rem;
            }
            .cell_tit_con{
                margin-left: .2rem;
            }
            .cell_tit{
                font-size: .28rem;
                line-height: 1;
            }
            .cell_label{
                display: block;
                color: #666;
                font-size: .26rem;
                line-height: 1;
                margin-top: .15rem;
            }
        }
        .cell_content{
        	display: flex;
            flex:auto;
        	font-size:0.28rem;
        	color:#333;
        	flex-direction:column;
        	span{
        		text-align: center;
        	}
        }
        .cell_value{
            font-size: .28rem;
            color: #666;
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
