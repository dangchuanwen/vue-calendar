import Vue from 'vue'
import App from './App.vue'

import '../resource/style/reset.css'

import FastClick from 'fastclick'
!window.detachFastclick && FastClick.attach(document.body)

new Vue({
    render: h => h(App)
}).$mount('#app')
