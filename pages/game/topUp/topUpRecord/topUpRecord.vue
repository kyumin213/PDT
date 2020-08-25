<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageObj.exchangeRecords"></tab-top>
		<view class="content">
			<view class="topMain">
				<view class="recordBox">
					<image class="recordIcon" src="../../../../static/game/topUpRecord/topUpRecord.png"></image>
					<text>{{languageObj.exchangeRecords}}</text>
				</view>
			</view>
			<!-- 释放记录 -->
			<view class="topTitle">
				<text>{{languageObj.times}}</text>
				<text>{{languageObj.amount}}</text>
			</view>
			<scroll-view class="scrollRecordView" scroll-y="true" @scrolltolower="getMore">
				<view class="srlRecordBox">
					<view class="itemList" v-for="(item,index) in lists" :key="index">
						<text>{{item.create_time}}</text>
						<text v-if="item.currency_id=='4'">+{{item.con_num}} POO</text>
						<text v-if="item.currency_id=='2'">+{{item.con_num}} USDT</text>
					</view>
				</view>
				<view class="tipTxt" v-if="lists.length==0">{{languageObj.noData}}</view>
				<view class="loading-text" v-if="loadingType==1">{{languageObj.theEnd}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	var _this;
	export default {
		data() {
			return {
				page:1,//页数
				rowNum:20,//每页条数
				total:0,//总条数
				lists:[],
				languageObj:{},
				loadingType:0//到底啦
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
			// 获取语言
			_this.languageObj = _this.linkTo.showLanguage();
		},
		onShow(){
			_this.getConversionLog()
		},
		onPullDownRefresh() {
			_this.page = 1
			_this.loadingType = 0
			_this.getConversionLog()
		},
		methods: {
			getConversionLog(){
				let data = {
					page:1,
					rowNum:_this.rowNum
				}
				_this.get('api/conversionLog',data).then(res=>{
					let datas = res.data.res.data
					if(datas.length>0){
						_this.lists = datas
						_this.total = res.data.res.total
					}
				})
			},
			// 上拉加载更多
			getMore(){
				let total = _this.total
				let currPage = _this.rowNum
				if(parseInt(total)>parseInt(currPage)){
					let page = _this.page
					page++
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: page,
						rowNum: _this.rowNum
					}
					_this.get('api/conversionLog', data).then(res => {
						if (res.data.res.data.length == 0) {
							_this.loadingType = 1;
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						} else {
							_this.page++
							_this.lists = _this.lists.concat(res.data.res.data); //将数据拼接在一起
							uni.hideNavigationBarLoading(); //关闭加载动画
						}
					
						_this.loadingType = 0; //将loadingType归0重置
					
					})
				}else{
					_this.loadingType = 1
					return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		@include flexC();
		padding: 20rpx;
		padding-bottom: 0;
		height: 100%;
		box-sizing: border-box;

		.topMain {
			@include cen();
			position: relative;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 240rpx;
			.recordBox{
				@include cen();
				@include borCol();
				position: relative;
				height: 82rpx;
				background-color: #260300;
				margin-left: 30rpx;
				padding-left: 60rpx;
				padding-right: 20rpx;
				border-radius: 10rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				.recordIcon{
					width: 120rpx;
					height: 148rpx;
					position: absolute;
					left: -60rpx;
					top: -60rpx;
				}
				text{
					@include font30()
					color: #FFDA7D;
				}
			}
		}

		.topTitle {
			@include cen();
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 18rpx;
			text-align: center;
			border: 1rpx solid #947d48;
			border-top-right-radius: 10rpx;
			border-top-left-radius: 10rpx;
			background-color: #120407;
			text {
				@include font28();
				display: block;
				width: 50%;
				color: rgba(255, 218, 125, 1);
				text-align: center;
			}
		}

		.scrollRecordView {
			min-height: 300rpx;
			flex: 1;
			background-color: #120407;
			border: 1rpx solid #947d48;
			border-bottom: none;
			border-top: none;
			box-sizing: border-box;

			.srlRecordBox {
				.itemList {
					padding: 28rpx 22rpx;
					@include cen();
					justify-content: space-between;
					border-bottom: 1rpx solid #947d48;
					text {
						text-align: center;
						display: block;
						width: 50%;
						@include font22();
						color: #FFFFFF;
						display: block;
					}
				}
				.itemList:last-child{
					border-bottom: none;
				}
			}
		}
	}
</style>
