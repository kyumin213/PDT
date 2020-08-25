<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageObj.myDirect"></tab-top>
		<view class="content">
			<view class="topMain">
				<view class="recordBox">
					<image class="recordIcon" src="../../../../static/game/topUpRecord/topUpRecord.png"></image>
					<text class="leftLabel">{{languageObj.myDirect}}</text>
					<text class="myExtensionPeople">{{languageObj.peopleNumber}}: {{direct}}</text>
				</view>
			</view>
			<scroll-view class="scrollRecordView" scroll-y="true" @scrolltolower="getMore">
				<view class="srlRecordBox">
					<view class="itemList" v-for="(item,index) in lists" :key="index">
						<view class="infoItem" style="margin-bottom: 27rpx;">
							<text class="userName">{{item.user.nickname}}</text>
							<!-- <text>等级: <text class="glodColor">{{item.user.level}}</text> </text> -->
							<text>{{languageObj.communityLevel}}: <text class="glodColor">{{getOrderStatus(item.user.level)}}</text> </text>
						</view>
						<view class="infoItem">
							<text>{{item.user.eth_address}}</text>
							<text>{{languageObj.numberOfToday}}: <text class="glodColor">{{item.num}}{{languageObj.gameJu}}</text> </text>
						</view>
					</view>
				</view>
				<view class="tipTxt" v-show="lists.length==0">
					{{languageObj.noData}}
				</view>
				<view class="loading-text" v-if="loadingText==1&&lists.length>0">{{languageObj.theEnd}}</view>
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
				page: 1,
				rowNum: 15,
				total: 0,
				loadingText: 0, //到底啦
				lists: [],
				direct:'',//直推人数
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
		onShow() {
			_this.getMyDirect()
		},
		onPullDownRefresh() {
			_this.page = 1
			 _this.loadingType = 0
			_this.getMyDirect()
		},
		computed: {
			getOrderStatus(status) {
				return status => {
					const i = status * 1;
					let title = '';
					switch (i) {
						case 1:
							title = _this.languageObj.Afries;
							break;
						case 2:
							title = _this.languageObj.frenchTwo;
							break;
						case 3:
							title = _this.languageObj.FrenchThree;
							break;
						case 4:
							title =  _this.languageObj.FourFrenchFries;
							break;
						default:
							title = _this.languageObj.experienceUser;
					};
					return title
				}
			}
		},
		methods: {
			// 我的直推记录
			getMyDirect() {
				_this.loadingType = 0;
				let data = {
					page: 1,
					rowNum: _this.rowNum
				}
				_this.get('api/myDirectExpand', data).then(res => {
					_this.direct = res.data.res.direct
					let datas = res.data.res.data
					if (res.data.res.data.length > 0) {
						for(let i in datas){
							let address = datas[i].user.eth_address
							datas[i].user.eth_address =address.substring(0, 5)+"****"+address.substr(address.length-4);
						}
						_this.lists = res.data.res.data
						_this.total = res.data.res.total
					}
				})
			},
			// 上拉加载更多
			getMore() {
				let total = _this.total
				let currPage = _this.rowNum
				let page = _this.page
				if (parseInt(total) > parseInt(currPage)) {
					page++
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: page,
						rowNum: _this.rowNum
					}
					_this.get('api/myDirectExpand', data).then(res => {
						if (res.data.res.data.length == 0) {
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
				} else {
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

			.recordBox {
				@include cen();
				position: relative;
				justify-content: space-between;
				align-items: center;
				width: 80%;
				height: 80rpx;
				margin-left: 30rpx;
				padding-left: 30rpx;
				border: 1rpx solid #FFDA7D;
				background-color: #260300;
				border-radius: 10rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 0 20rpx 0 60rpx;

				.leftLabel {
					@include font26();
				}

				.recordIcon {
					width: 120rpx;
					height: 148rpx;
					position: absolute;
					left: -60rpx;
					top: -60rpx;
				}

				text {
					@include font30() color: #FFDA7D;
				}

				.myExtensionPeople {
					@include font24();
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
			padding: 40rpx 30rpx;
			box-sizing: border-box;

			.srlRecordBox {
				.itemList {
					padding: 28rpx 22rpx;
					justify-content: space-between;
					border-bottom: 1rpx solid #947d48;

					.infoItem {
						@include cen();
						height: 30rpx;
						justify-content: space-between;

						text {
							@include font24();
							color: #FFFFFF;
						}

						.glodColor {
							color: #FFDA7D;
							margin-left: 10rpx;
						}

						.userName {
							@include font30();
						}
					}
				}

				// .itemList:last-child {
				// 	border-bottom: none;
				// }
			}
		}
	}
</style>
