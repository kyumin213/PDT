<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageObj.personRank"></tab-top>
		<view class="content">
			<view class="topMain">
				<view class="recordBox">
					<image class="recordIcon" src="../../../../static/game/topUpRecord/topUpRecord.png"></image>
					<text>{{languageObj.personRank}}</text>
				</view>
			</view>
			<!-- 释放记录 -->
			<view class="topTitle">
				<text>{{languageObj.username}}</text>
				<text>{{languageObj.CumulativeNum}}</text>
			</view>
			<scroll-view class="scrollRecordView" scroll-y="true" @scrolltolower="getmore">
				<view class="srlRecordBox">
					<view  class="itemList" :class="[index<=2?'redText':'']" v-for="(item,index) in lists" :key="index">
						<text class="names"><text class="number">{{index+1}}</text> {{item.user.nickname}}</text>
						<text>+{{item.day_performance}} POO</text>
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
				total:0,
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
			_this.getPersonRank()
		},
		onPullDownRefresh() {
			_this.page = 1
			_this.loadingType = 0
			_this.getPersonRank()
		},
		methods: {
			// 个人推广排行榜
			getPersonRank(){
				let data = {
					page:1,
					rowNum:_this.rowNum,
					expand_type:1
				}
				_this.get('api/expandRanking',data).then(res=>{
					let datas = res.data.res.data
					if(datas.length>0){
						_this.lists = datas
						_this.total = res.data.res.total
					}
				})
			},
			//上拉加载
			getmore() {
				let total = _this.total
				if(parseFloat(total)>parseFloat(_this.rowNum)){
					let page = _this.page
					page++
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: page,
						rowNum: _this.rowNum,
						expand_type: 1
					}
					_this.get('api/expandRanking', data).then(res => {
						if (res.data.res.data.length==0) {
							uni.hideNavigationBarLoading(); //关闭加载动画
							_this.loadingType = 1
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
						width: 50%;
						.number{
							display: inline-block;
							width: 26rpx;
							height: 26rpx;
							border: 1px solid #FFFFFF;
							border-radius: 100%;
							padding: 2rpx;
							margin-right: 20rpx;
						}
						text-align: center;
						display: block;
						width: 50%;
						@include font22();
						color: #FFFFFF;
					}
					.names{
						text-align: left;
						padding-left: 100rpx;
						box-sizing: border-box;
					}
				}
				
				.itemList.redText{
					text{
						.number{
							border: 1px solid #FF4729;
						}
						color: #FF4729;
					}
				}
			}
		}
	}
</style>
