<template>
    <div>
        <div class="z_chart_column">
            <ul>
                <li v-for="el in list" :key="el.id" :style="{height: el.sintegral == 0 ? 0.17 + 'rem' : el.sintegral / 100 * 0.2 + 'rem'}"><span class="c_666 f22">{{el.sintegral}}</span></li>
                <!-- <p class="f22 c_666" v-else>被差评</p> -->
            </ul>
            <div class="border-n z_chart_remark">
                <p v-for="el in list" :key="el.id">{{el.statisticsName}}</p>
                <!-- <p v-for="el in list" :key="el.id" class="z_column" v-else :style="{height: el.sintegral + 'rem'}"><span class="f22 c_666" :style="{marginTop: el.sintegral + 'rem'}">{{bad.sintegral}}</span></p> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    props: {
        list: {
            type: Array,
            default: function () {
                return []
            }
        },
        // bad: {
        //     type: Object,
        //     default: {}
        // }
    },
    computed: {
        badHeight: function () {
            return this.bad.integral == 0 ? 0.17 : this.bad.integral / 100 * 0.2;
        }
    },
    mounted () {
        
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.z_chart_column{
    width: 100%;
    padding: 0.3rem 0;
    ul{
        display: flex;
        align-items: flex-end;
        justify-content:space-between;
        padding: 0 0.13rem;
        border-bottom: 2px solid #fecbc4;
        li{
            width: 0.51rem;
            height: 0.5rem;
            background: #fecbc4;
            text-align: center;
            span{
                margin-top: -0.3rem;
                display: block;
            }
        }
    }
    .z_chart_remark{
        display: flex;
        justify-content:space-between;
        padding: 0 0.13rem;
        p{
            font-size: 0.22rem;
            color: #666;
            width: 0.51rem;
            text-align: center;
            span{
                display: block;
            }
        }
        .z_column{
            width: 0.51rem;
            height: 0.17rem;
            background: #e8e8e8;
        }
    }
}
</style>
