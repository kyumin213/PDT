import Vue from 'vue'
import App from './App'
import request from './util/request.js'
import linkTo from './util/linkTo.js'
import store from './store'
import musicControl from './util/musicControl.js'
import language2 from './util/language2.js'
Vue.config.productionTip = false
Vue.prototype.fnc = request;
Vue.prototype.get = request.get;
Vue.prototype.post = request.post;
Vue.prototype.musicControl = musicControl;
Vue.prototype.mainSocketTask = null;
Vue.prototype.language2 = language2;
// let socketUrl = 'ws://8.129.172.166:9502' // socket地址
// let socketUrl = 'ws://8.210.21.142:9502' // socket地址
let socketUrl = 'ws://8.210.75.76:9502' // socket地址
Vue.prototype.openSocket = ()=>{
	Vue.prototype.mainSocketTask = uni.connectSocket({
		url: socketUrl,
		success(data) {
			console.log("websocket连接成功");
		},
		fail(err) {
			console.log(err, "websocket连接失败");
		},
	});
}
Vue.prototype.parsNum = (num)=>{
	var res= parseInt(num * 1000) / 1000;//保留两位、三位小数 同理
	return res;
}
Vue.prototype.is_open_socket = false;
Vue.prototype.linkTo = linkTo;
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue({
    ...App,store
})
app.$mount()
