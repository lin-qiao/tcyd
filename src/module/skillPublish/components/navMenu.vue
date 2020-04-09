<template lang="html">
    <div class="nav_menus">
        <ul class="nav_list">
            <li class="nav_item" :class="{current:v.id == activeIndex}" v-for="v in list">{{v.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        list:{
            default:[]
        },
        activeIndex:{
            default:''
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
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
