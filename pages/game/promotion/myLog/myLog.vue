<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageObj.personRecord"></tab-top>
		<view class="content">
			<view class="topMain">
				<view class="recordBox">
					<image class="recordIcon" src="../../../../static/game/topUpRecord/topUpRecord.png"></image>
					<text>{{languageObj.personRecord}}</text>
				</view>
			</view>
			<!-- 释放记录 -->
			<view class="topTitle">
				<text>{{languageObj.times}}</text>
				<text>{{languageObj.currentNumber}}</text>
			</view>
			<scroll-view class="scrollRecordView" scroll-y="true" @scrolltolower="getmore">
				<view class="srlRecordBox">
					<view class="itemList" v-for="(item,index) in lists" :key="index">
						<text>{{item.create_time}}</text>
						<text v-if="item.currency_id=='1'">+{{item.num}}KL</text>
						<text v-if="item.currency_id=='2'">+{{item.num}}POO</text>
					</view>
				</view>
				<view class="tipTxt" v-show="lists.length==0">
					{{languageObj.noData}}
				</view>
				<view class="loading-text" v-show="loadingType==1 && lists.length>0">{{languageObj.theEnd}}</view>
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
				page:1,
				rowNum:20,
				lists:[],
				loadingType:0,
				languageObj:{},
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
			_this.getPersonExpand()
		},
		onPullDownRefresh() {
			_this.page = 1
			_this.loadingType=0
			_this.getMessageList()
		},
		methods: {
			// 个人推广记录
			getPersonExpand(){
				_this.loadingType = 0;
				uni.showNavigationBarLoading()
				let page = 1
				let data = {
					page:1,
					rowNum:_this.rowNum,
					expand_type:1
				}
				_this.get('api/personExpandLog',data).then(res=>{
					let datas = res.data.res.list.data
					
					if(datas.length>0){
						_this.lists = datas
					}
					uni.hideNavigationBarLoading(); //关闭加载动画
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				})
			},
			//上拉加载
			getmore() {
				let page = _this.page
				page++
				uni.showNavigationBarLoading(); //显示加载动画
				let data = {
					page: page,
					rowNum: _this.rowNum,
					expand_type: 1
				}
				_this.get('api/personExpandLog', data).then(res => {
					if (res.data.res.list.data.length==0) {
						uni.hideNavigationBarLoading(); //关闭加载动画
						_this.loadingType = 1
						return false;
					} else {
						_this.page++
						_this.lists = _this.lists.concat(res.data.res.list.data); //将数据拼接在一起
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
			
					_this.loadingType = 0; //将loadingType归0重置
			
				})
			},
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
				position: relative;
				justify-content: center;
				align-items: center;
				height: 82rpx;
				margin-left: 30rpx;
				padding-left: 60rpx;
				padding-right: 20rpx;
				border: 1rpx solid #FFDA7D;
				background-color: #260300;
				border-radius: 6rpx;
				margin-top: 20rpx;
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
			border-top-right-radius: 6rpx;
			border-top-left-radius: 6rpx;
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
			border-top: none;
			box-sizing: border-box;
			border-bottom: none;
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
			}
		}
	}
</style>
