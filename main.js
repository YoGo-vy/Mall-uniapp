import Vue from 'vue'
import App from './App'
import {http} from 'util/api.js'

// 挂载uni.request()二次封装
Vue.prototype.$http = http

// data-format
Vue.filter('dataFormat',(value)=>{
	if(value){
		const nDate = new Date(value)
		const year = nDate.getFullYear()
		const month = nDate.getMonth().toString().padStart(2,0)
		const day = nDate.getDay().toString().padStart(2,0)
		return year+'-'+month+'-'+day
		// return '2020-'+month+'-'+day
	}			
})
			


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
