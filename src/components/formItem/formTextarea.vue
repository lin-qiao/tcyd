<template lang="html">
  <div class="from_item textarea">
  	<div class="f28 c_666 mtb20" v-if="title">{{title}}</div>
    <div class="from_item_textarea">
      <textarea
      :placeholder="input_placeholder"
      :value="value"
      :maxlength="maxlength"
      :rows="height"
      @input="textarea($event)">
      </textarea>
      <div class="num" v-if="maxlength">{{len}}/{{maxlength}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      len:0
    }
  },
  props: {
  	title:String,
    value:String,
    input_placeholder:String,
    height:{
      default:'',
    },
    maxlength:{
      default:''
    }
  },
  methods:{
    textarea($event){
      this.$emit('input', $event.target.value);
      this.len = $event.target.value.length;
    }
  },
  watch:{
    value(str){
      this.len = str.length;
    }
  }
}
</script>

<style lang="less" scoped>
@import "../css/fromItem.less";
</style>
