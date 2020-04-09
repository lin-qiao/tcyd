<!-- 技能认证 -->
<template lang="html">
    <div class="screen bg_gray overflow_scroll">
        <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>技能认证</span>"></top>
        <div class="cell_list">
            <cell
                v-for="el in skillList"
                :title="el.skillName"
                color="#ff4b48"
                :value="el.certificationStr"
                isLink
                :to="'/addSkillApprove?skillId=' + el.skillId + '&skillName=' + el.skillName + '&id=' + el.id">
                <img slot="img" :src="el.skillImg | imgUrl" alt="">
            </cell>
        </div>
        <nodata v-if="showNodata"></nodata>
        <com-warm-prompt :code="TCJNRZWXTS" ></com-warm-prompt>
    </div>
</template>

<script>
import cell from 'src/components/item/itemCell'; //单元格
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import {
    fetchGetSkillList,  //获取技能列表
} from '../../service/getData'

export default {
    data(){
        return{
            skillList:[],   //技能列表
            showNodata:false, //显示无数据
            tips:'', //温馨提示
        }
    },
    mounted(){
        this.getSkillList();
    },
    components:{
        cell,
        comWarmPrompt
    },
    methods:{
        //请求技能列表
        getSkillList(){
            fetchGetSkillList().then(res => {
                if(res && res.status){
                    this.skillList = res.data.list;
                    if(!this.skillList.length){
                        this.showNodata = true;
                    }else{
                        this.showNodata = false;
                    }
                }
            })
        }
    }
}
</script>
<style lang="less">
@import (reference) "~src/style/all.less";
.fail_con{
    padding: .20rem .34rem 0 .54rem;
    color: #666;
    line-height: .4rem;
    li{
        position: relative;
        padding-left: .2rem;
    }
    li::before{
        content: '';
        display: block;
        width: .14rem;
        height: .14rem;
        background: @color;
        border-radius: 50%;
        position: absolute;
        top:.18rem;
        left: 0;

    }
}
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.fail_hint{
    margin-top: .35rem;
	.fail_tit{
		height: .5rem;
		position: relative;
		font-size: .26rem;
		text-align: center;
		span{
			display: inline-block;
			height: 100%;
			line-height: .5rem;
			padding: 0 .25rem;
			background: @bg_color;
			position: relative;
			z-index: 1;
		}
		&::after{
			display: block;
			width: 100%;
			height: 1px;
			content: '';
			position: absolute;
			top:0;
			bottom: 0;
			margin: auto;
			background-color: @line_color;
		}
	}
}
</style>
