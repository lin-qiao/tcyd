import Vue from 'vue';
import main from './main.vue';
const messageBox = Vue.extend(main);
let dom = document.createElement('div');

messageBox.alert = (options) => {
    if(document.querySelector('#J_layer_confirm')){
        dom = document.querySelector('#J_layer_confirm');
    }else{
        document.body.appendChild(dom);
    }
    options.type = 'alert';
    const propsData = Object.assign({}, options);
    const messageBoxInstance = new messageBox({
        propsData,
    }).$mount(dom);
    messageBoxInstance.show();
};

messageBox.confirm = (options) => {
    if(document.querySelector('#J_layer_confirm')){
        dom = document.querySelector('#J_layer_confirm');
    }else{
        document.body.appendChild(dom);
    }
    options.type = 'confirm';
    const propsData = Object.assign({}, options);
    const messageBoxInstance = new messageBox({
        propsData,
    }).$mount(dom);
    messageBoxInstance.show();
};


export default messageBox;
