<!--记录-->
<template lang="html">
    <div class="cell" @click="goDetail">
        <div class="cell_wrap" :style="{'height': height/100 + 'rem'}">
            <div class="cell_tit">
                <slot name="img"></slot>
                <div class="cell_tit_con">
                    <span class="cell_tit justify_between"><em>{{title}}</em><em>{{value}}</em></span>
                    <span class="cell_subtit" v-if="subtit">{{subtit}}</span>
                    <span class="cell_label" v-if="label">{{label}}</span>
                </div>
            </div>
        </div>
        <p class="cell_tips">{{tips}}</p>
    </div>
</template>

<script>
export default {
    props:{
        height:{  //单元格高度
            type:Number,
            default:186
        },
        title:{  //标题
            type:String,
            default:'',
        },
        value:{  //内容
            default:''
        },
        label:{    //备注信息，显示在标题下方
            type:String,
            default:''
        },
        subtit:{//副标题
        	default:''
        },
        tips:{//备注内容
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
            padding-right: .3rem;
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
                width: .92rem;
                height: .92rem;
            }
            .cell_tit_con{
                margin-left: .2rem;
                width:5.6rem;
            }
            .cell_tit{
                font-size: .28rem;
                line-height: 1;
                color:#333;
            }
            .cell_subtit{
                display: block;
                color: #666;
                font-size: .24rem;
                line-height: 1;
                margin-top: .26rem;
            }
            .cell_label{
                display: block;
                color: #999;
                font-size: .24rem;
                line-height: 1;
                margin-top: .26rem;
            }
        }
        .cell_tips{
        	font-size:0.24rem;
        	line-height:0.4rem;
        	color:#666;
        	padding:0.12rem 0.3rem 0.12rem 0;
        }
    }
</style>
