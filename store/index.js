import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		formData:{},
		words:[],
		market_type:true,//交易市场买入卖出高亮
		backnum:1,//返回页数
		winner:[],//接收数组
		noticeDetail:{},//公告详情对象
		userInfo:[]
	},
    mutations: {
		SET_NOTICEDETAIL(state,data){
			state.noticeDetail = data
		},
		SET_FORMDATA(state,data){
			state.formData = data
		},
		SET_WINNER(state,data){
			state.winner = data
		},

		SET_WORDS(state,list){
			state.words = list
		},
		SET_MARKET_TYPE(state,type){
			state.market_type = type
		},
		SET_USERINFO(state,data){
			state.userInfo = data
		}
	},
	getters:{
		getformData(state){
			return state.formData
		}
	},
    actions: {}
})
export default store