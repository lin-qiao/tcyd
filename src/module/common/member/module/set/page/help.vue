<template>
    <div>
        <top title="帮助中心" :isReturn="false" v-if="$store.state.platform=='wx'"></top>
        <!--<div class="nav_menus">
            <ul class="nav_list">
                <li class="nav_item" :class="{current:v.id == activeIndex}" v-for="v in list" @click="changeList(v.code,v.id)">{{v.name}}</li>
            </ul>
        </div>-->
        <div class="help_list" :class="{'top0':$store.state.platform!='wx'}">
            <router-link :to="'/helpDetail?id=' + el.id" class="cell" v-for="(el,index) in problemList" :key="el.id">
                <div class="cell_bd f28"><p>{{index+1}}、{{el.title}}</p></div>
                <div class="cell_ft"><i class="iconfont icon-arrow-right c_999 f28"></i></div>
            </router-link>
        </div>
    </div>
</template>
<script>
import {fetchArticelType} from '../service/getData'; //左侧分类列表
import {fetchProblemList} from 'src/service/getData'; //常见问题列表
export default {
	data() {
		return {
            list:[], //左侧分类列表
            activeIndex: 1, //左侧分类下标
            problemList: [], //常见问题列表
            code: 'TCBZZX', //左侧分类列表code
            articelCode: '' //文章code
		}
	},
	created(){
		if(this.$store.state.platform=='android'){
        	document.title="帮助中心";
        }else if(this.$store.state.platform=='ios'){
        	window.location.href="ddt://DTWeb/setTitle?title=帮助中心"
        }
	},
	mounted(){
        this.getArticelTypeList(); //获取文章类型一级分类列表
	},
	methods: {
        //获取常见问题列表
        getProblemList () {
            fetchProblemList(this.articelCode).then(res => {
                this.problemList = res.data;
            })
        },
        //获取文章类型一级分类列表
        getArticelTypeList () {
            fetchArticelType(this.code).then(res => {
                this.list = res.data;
                this.activeIndex = res.data[0].id;
                this.articelCode = res.data[0].code;
                this.getProblemList(); //获取常见问题列表
            })
        },
        //切换
        changeList (code,id) {
            fetchProblemList(code).then(res => {
                this.problemList = res.data;
                this.activeIndex = id;
            })
        }
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
	background: @bg_color;
}
.help_list{
    position: absolute;
	top:.89rem;
	left: 0rem;
	right: 0;
	bottom: 0;
	background-color: #f5f5f5;
	&.top0{
		top:0 !important;
	}
    .cell{
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        padding: 0.3rem;
        background: #fff;
        border-bottom: 1px solid #efefef;
        .cell_bd{
            flex: 1;
        }
    }
}
.nav_menus{
    width: 1.90rem;
    top:.89rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    .nav_item{
        height: .88rem;
        line-height: .88rem;
        font-size: .26rem;
        text-align: center;
        border-bottom: 1px solid @border_color;
        position: relative;
        &.current{
            background: #f5f5f5;
            color: @color;
            &::before{
                content: '';
                display: block;
                position: absolute;
                top:0;
                bottom: 0;
                left: 0;
                width: .04rem;
                background: @color;
            }
        }
    }
}
</style>
