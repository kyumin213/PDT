<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.officialAnnouncement"></tab-top>
		<view class="content">
			<view class="tabList">
				<text class="tabItem" :class="{tabActive:active=='2'}" @tap="check(2)">{{languageInfo.officialAnnouncement}}</text>
				<text class="tabItem" :class="{tabActive:active=='3'}" @tap="check(3)">{{languageInfo.news}}</text>
			</view>
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
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	var _this;
	export default {
		data() {
			return {
				active: 2,
				type: 2,
				page: 1,
				rowNum: 15,
				total: 0,
				loadingType: 0,
				lists: [],
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow() {
			_this.getMessageList(2)
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		onPullDownRefresh() {
			_this.page = 1
			_this.loadingType = 0
			_this.getMessageList()
		},
		methods: {
			check(e) {
				_this.active = e
				_this.getMessageList()
			},
			// 官方公告列表
			getMessageList() {
				_this.loadingType = 0;
				uni.showNavigationBarLoading()
				let page = parseInt(_this.page)
				let data = {
					page: _this.page,
					rowNum: _this.rowNum,
					type: _this.active
				}
				_this.get('api/messageList', data).then(res => {
					if (res.data.code == 200) {
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
				let total = _this.total
				let rows = _this.rowNum
				if (parseInt(total) > parseInt(rows)) {
					let page = _this.page
					_this.page = page + 1
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: page,
						rowNum: _this.rowNum,
						type: _this.active
					}
					_this.get('api/messageList', data).then(res => {
						if (res.data.res.data == null) {
							_this.loadingType = 1
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						} else {
							_this.page++
							_this.lists = _this.lists.concat(res.data.res.data); //将数据拼接在一起
							uni.hideNavigationBarLoading(); //关闭加载动画
						}

						_this.loadingType = 0; //将loadingType归0重置

					})
				} else {
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
		padding: 20rpx;
		height: 100%;
		overflow-y: auto;
		box-sizing: border-box;

		.scrollHeight {
			width: 100%;
			height: calc(100vh - 220rpx);
		}

		.tabList {
			@include cen();
			@include borCol();
			margin-bottom: 20rpx;
			border-radius: 4rpx;
		}

		.tabItem {
			display: inline-block;
			height: 60rpx;
			line-height: 60rpx;
			@include bgCol();
			@include mainCol();
			@include font24();
			width: 50%;
			text-align: center;
		}

		.tabActive {
			background-color: #FFDA7D;
			color: #120407;
			font-weight: bold;
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
