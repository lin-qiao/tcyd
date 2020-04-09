<template lang="html">
    <div class="form_item" @click="visible = true">
        <div class="form_item_title">{{title}}</div>
        <div class="form_item_select" :class="{ 'c_888' : val ==  placeholder}">{{val}}</div>
        <div  class="form_item_arrow">
            <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="screen_black" v-show="visible && !disabled"></div>
        <transition name="page-slide-bottom">
            <div v-show="visible && !disabled" class="pick_mark">
                <div class="btn_wrap">
                    <a class="btn_cancel" @click.stop="visible = false">取消</a>
                    请选择
                    <a class="btn_sure btn_select" @click.stop="visible = false">完成</a>
                </div>
                <mt-picker class="select" ref="picker" :slots="slots" :value-key="defaultProps.name" @change="onValuesChange"></mt-picker>
            </div>
        </transition>
    </div>
</template>

<script>
import {REGEX} from 'src/config/env'
export default {
    data(){
        return{
            visible:false,
            val:'',
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center',
                    defaultIndex:0
                }
            ]
        }
    },
    props: {
        value:{
            default:''
        },
        list:{          //选择器列表
            type:Array,
            default:[]
        },
        title:{        //选择器标题
            type:String,
            default:''
        },
        disabled:{    //禁用
            type:Boolean,
            default:false
        },
        defaultProps:{
            type:Object,
            default(){
                return{
                    label:'',
                    name:'name'
                }
            }
        },
        placeholder:{
            type:String,
        	default:''
        }
    },
    mounted(){
        // 列表赋值
        if(this.list){
            this.slots[0].values = this.list;
        }
        this.$nextTick(()=>{
            //显示赋值
            if(!this.value){
                this.val =  this.placeholder;
            }else{
                if(this.defaultProps.label && this.defaultProps.name){
                    this.val = this.list.filter(v => v[this.defaultProps.label] == this.value)[0][this.defaultProps.name];
                    this.$refs.picker.setSlotValue(0,this.val);
                }else{
                    this.val = this.value;
                    this.$refs.picker.setSlotValue(0,this.val);
                }
            }
        })
    },
    methods:{
        onValuesChange(picker, values) {
            if(this.defaultProps.label && this.defaultProps.name){
                this.val = values[0][this.defaultProps.name];
                this.$emit('input',values[0][this.defaultProps.label]);
            }else{
                this.val = values[0];
                this.$emit('input',values[0]);
            }
        },
    },
    watch:{
        value(cur){
            if(this.defaultProps.label && this.defaultProps.name){
                this.val = this.list.filter(v => v[this.defaultProps.label] == this.value)[0][this.defaultProps.name];
                this.$refs.picker.setSlotValue(0,this.val);
            }else{
                this.val = this.value;
                this.$refs.picker.setSlotValue(0,this.val);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.form_item{
    width: 7.2rem;
    height: 0.89rem;
    padding-right: 0.3rem;
    margin-left: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    font-size: .28rem;
    color: #666;
    .form_item_select{
        flex: 1;
        text-align: right;
    }
    .form_item_arrow{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: .38rem;
        height: 100%;
        .iconfont{
            font-size: .3rem;
            color: #bbb;
        }
    }
    .pick_mark{
        width: 7.5rem;
        position: fixed;
        left: 50%;
        margin-left: -3.75rem;
        top: 0;
        bottom: 0;
        z-index: 11;
        .btn_wrap{
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 180px;
            text-align: center;
            height: .8rem;
            line-height: .8rem;
            font-size: .28rem;
            background: #fff;
            padding: 0 .3rem;
            border-top: 1px solid #dbdbdb;
            border-bottom: 1px solid #dbdbdb;
        }
        .select{
            position: absolute;
            left: 0;
            width: 100%;
            bottom: 0;
            background-color: #fff;
        }
    }
}
</style>
