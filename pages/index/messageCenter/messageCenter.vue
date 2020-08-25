<template>
	<view class="containerBox">
		<tabTop left-icon="back" :title="languageInfo.messageCenter" />
		<view class="content">
			<view class="messageBox">
				<scroll-view scroll-y="true" class="scrollHeight" @scrolltolower="getmore">
					<view class="itemList" v-for="(item,index) in lists" :key="index">
						<view class="itemLeft">
							<text class="itemName">{{item.title}}</text>
							<text class="itemTime">{{item.create_time}}</text>
						</view>
						<view>
							<text class="itemDes">{{item.content}}</text>
						</view>
					</view>
					<view class="tipTxt" v-if="lists.length==0">{{languageInfo.noData}}</view>
					<view class="loading-text" v-show="loadingType==1 && lists.length>0">{{languageInfo.theEnd}}</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	var _this;
	export default {
		components: {
			tabTop
		},
		data() {
			return {
				page: 0, //页数
				rowNum: '10', //每页条数
				total: 0, // 总数
				type: 1,
				lists: [],
				languageInfo: {},
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
			}
		},
		onLoad() {
			_this = this

		},
		onShow() {
			_this.languageInfo = _this.linkTo.showLanguage();
			_this.getMessageList()
		},

		onPullDownRefresh() {
			_this.page = 1
			_this.loadingType = 0
			_this.getMessageList()
		},
		onReachBottom() {
			let arr = _this.lists.length
			let total = _this.total
			console.log(total)
			if (arr < total) {
				_this.getmore()
			}
		},

		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url);
			},
			// 消息中心列表
			getMessageList() {
				_this.loadingType = 0;
				uni.showNavigationBarLoading()
				let page = parseInt(_this.page)
				let data = {
					page: _this.page,
					rowNum: _this.rowNum,
					type: _this.type
				}
				_this.get('api/messageList', data).then(res => {
					if (res.data.res.data.length > 0) {
						_this.lists = res.data.res.data
						_this.total = res.data.res.total
					}
					uni.hideNavigationBarLoading(); //关闭加载动画
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				}).catch(err => {
					console.log(err)
				})
			},
			// 上拉加载// 上拉加载
			getmore() {
				let page = _this.page
				_this.page = page + 1
				uni.showNavigationBarLoading(); //显示加载动画
				let data = {
					page: page,
					rowNum: _this.rowNum,
					type: _this.type
				}
				_this.get('api/messageList', data).then(res => {
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
			},

		}
	}
</script>
<style lang="scss" scoped>
	$colTxt:#2DE9B7;

	.ml10 {
		display: inline-block;
		margin-left: 10rpx;
	}

	.mb8 {
		margin-bottom: 8rpx;
	}

	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		// width: 100%;
		padding: 20rpx;
		padding-top: 20rpx;
		height: 100%;
		overflow-y: auto;
		box-sizing: border-box;

		.loading-text {
			display: inline-block;
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			color: #ccc;
			height: 100rpx;
			line-height: 100rpx;
		}

		.messageBox {
			width: 100%;
			margin-top: 10rpx;

			// overflow: auto;
			.scrollHeight {
				width: 100%;
				height: calc(100vh - 150rpx);
			}
		}

		.itemList {
			@include borCol();
			@include bgCol();
			border-radius: 6rpx;
			padding: 30rpx 40rpx;
			margin-bottom: 10rpx;

			.itemLeft {
				@include flexBet();
				margin-bottom: 10rpx;
			}

			.itemName {
				@include mainCol();
				@include font26();
			}

			.itemTime {
				@include font24();
				color: #999;
			}

			.itemDes {
				@include font20();
				color: #ddd;
			}
		}

	}
</style>
