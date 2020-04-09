import Vue from 'vue';
import main from './main.vue';
const shareCon = Vue.extend(main);
let dom = document.createElement('div');

shareCon.show = (options) => {
    if(document.querySelector('.share_bg')){
        dom = document.querySelector('.share_bg');
    }else{
        document.body.appendChild(dom);
    }
    const propsData = Object.assign({}, options);
    const shareInstance = new shareCon({
        propsData,
    }).$mount(dom);
    shareInstance.show();
};

shareCon.share = (options) => {
    if(document.querySelector('.share_bg')){
        dom = document.querySelector('.share_bg');
    }else{
        document.body.appendChild(dom);
    }
    const propsData = Object.assign({}, options);
    const shareInstance = new shareCon({
        propsData,
    }).$mount(dom);
    shareInstance.share();
};

export default shareCon;
