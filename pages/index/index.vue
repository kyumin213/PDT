<template>
	<view class="contentBox">
		<tab-top left-icon="" title="PDT"></tab-top>
		<view class="content">
			<!-- 官方公告 -->
			<view class="noticeBox" @tap="goTo('officialAnnouncement/officialAnnouncement')">
				<image src="../../static/index/icon1.png" class="noticIcon"></image>
				<view class="ml16 noticTxt">{{languageInfo.officialAnnouncement}}：</view>
				<swiper class="swiper" :indicator-dots="indicatorDots" vertical circular :autoplay="autoplay" :interval="interval"
				 :duration="duration">
					<swiper-item v-for="(item,index) in noticeAlertsList" :key="index">
						<view class="swiper-item">
							<text class="swiperTxt">{{item.title}}</text>
							<!-- <text>{{item.add_time}}</text> -->
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 我的资产 -->
			<view class="assetsBox">
				<view class="iconCenter">
					<image src="../../static/index/icon2.png" class="icon2"></image>
					<view class="myAssets">
						<text class="txt1">{{languageInfo.myAssets}}</text>
						<view>
							<text class="txt2">{{useUsdt}}</text>
						</view>
					</view>
				</view>
				<view class="assetsList">
					<view class="listLeft" @tap="goTo('transfer/transfer')">
						<image src="../../static/index/icon5.png" class="icon5"></image>
						<view class="assetsTxt">{{languageInfo.transfer}}</view>
					</view>
					<view class="listCen" @tap="goTo('ReceivePayment/ReceivePayment')">
						<image src="../../static/index/icon3.png" class="icon5"></image>
						<view class="assetsTxt">{{languageInfo.recharge}}</view>
					</view>
					<view class="listRight" @tap="goTo('more/more')">
						<image src="../../static/index/icon4.png" class="icon5"></image>
						<view class="assetsTxt">{{languageInfo.more}}</view>
					</view>
				</view>
			</view>
			<!-- 切换钱包、消息中心 -->
			<view class="cenBox">
				<view class="cenLeft" @tap="goTo('switchWallet/switchWallet')">
					<image src="../../static/index/icon6.png" class="icon6"></image>
					<text class="txt3">{{languageInfo.switchWallet}}</text>
				</view>
				<view class="cenLeft ml10" @tap="goTo('messageCenter/messageCenter')">
					<image src="../../static/index/icon7.png" class="icon6"></image>
					<text class="txt3">{{languageInfo.messageCenter}}</text>
				</view>
			</view>
			<!-- 趋势图 -->
			<view class="listBox">
				<view class="listLeft">
					<!-- <image src="../../static/index/icon8.png" class="icon8"></image> -->
					<view class="listItem">
						<view class="itemLeft">
							<image src="../../static/index/icon33.png" class="icon10"></image>
							<text class="typeTxt ml16">PDT</text>
						</view>
						<!-- <text class="preTxt">+0.52%</text> -->
					</view>
					<view class="rateTxt">{{usePdt}}</view>
					<!-- <view class="rateCh">￥0.434</view> -->
				</view>
				<view class="listLeft ml10">
					<!-- <image src="../../static/index/icon9.png" class="icon8"></image> -->
					<view class="listItem">
						<view class="itemLeft">
							<image src="../../static/index/icon10.png" class="icon10"></image>
							<text class="typeTxt ml16">USDT</text>
						</view>
						<!-- <text class="preTxt preDecline">-2.3%</text> -->
					</view>
					<view class="rateTxt">{{useUsdt}}</view>
					<!-- <view class="rateCh">￥0.22323</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	var _this;
	export default {
		data() {
			return {
				title: 'Hello',
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				page: 1,
				rowNum: 15,
				usePdt: '',
				useUsdt: '',
				noticeAlertsList: [],
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
			_this.getInfo()
			_this.getNotice()
		},
		onShow() {
			_this.getAccount()
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url);
			},
			// 个人信息
			getInfo(){
				_this.get('api/myInfo').then(res=>{
					let user = res.data.res.nickname
					let inviteCode = res.data.res.invite_code
					let userInfo = res.data.res
					_this.$store.commit('SET_USERINFO', userInfo);
					uni.setStorageSync('_USERID',userInfo.user_id)
					uni.setStorageSync('code',inviteCode)
					uni.setStorageSync('nickname',user)
				})
			},
			// 我的资产
			getAccount() {
				_this.get('api/myProperty').then(res => {
					let datas = res.data.res
					for (let i in datas) {
						if (datas[i].currency_id == '4') {
							_this.useUsdt = datas[i].num
						}
						if (datas[i].currency_id == '3') {
							_this.usePdt = datas[i].num
						}
					}
				})
			},
			// 公告
			getNotice() {
				let data = {
					page: _this.page,
					rowNum: _this.rowNum,
					type:2
				}
				_this.get('api/messageList', data).then(res => {
					_this.noticeAlertsList = res.data.res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ml16 {
		margin-left: 16rpx;
	}

	.ml10 {
		margin-left: 10rpx;
	}

	.contentBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		height: 100%;
		overflow-y: auto;
		padding-bottom: 36rpx;
		box-sizing: border-box;
		.noticeBox {
			width: 100%;
			display: flex;
			align-items: center;
			height: 44rpx;
			background-color: #401607;
			padding: 0 76rpx;
			box-sizing: border-box;

			.noticList {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			swiper {
				@include mainCol();
				@include font20();
				width: 70%;
				height: 44rpx;
				line-height: 44rpx;
				overflow: hidden;
			}

			.swiper-item {
				height: 44rpx;
				line-height: 44rpx;
			}

			.notic {
				width: 100%;
			}

			.noticIcon {
				width: 24rpx;
				height: 20rpx;
			}

			.noticTxt {
				@include font20();
				display: inline-block;
				font-family: 'PingFang-SC-Regular';
				color: #FFDA7D;
				line-height: 44rpx;
				height: 44rpx;
				white-space: nowrap;
				overflow: hidden;
				margin-right: 18rpx;
			}

			.swiperTxt {
				@include font24();
				margin-right: 25rpx;
			}
		}

		// 我的资产
		.assetsBox {
			.iconCenter {
				display: flex;
				justify-content: center;
				position: relative;
			}

			.icon2 {
				width: 500rpx;
				height: 460rpx;
				position: relative;
			}

			.myAssets {
				position: absolute;
				text-align: center;
				top: 50%;
				transform: translateY(-50%);

				.txt1 {
					@include mainCol();
					@include font22();
				}

				.txt2 {
					display: inline-block;
					@include font44();
					// color: #FF550A;
					margin-top: 18rpx;
					font-family: 'Impact';
					background-image: -webkit-linear-gradient(bottom, #FF550A, #FFDD65);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}

			.assetsList {
				position: relative;
				width: 100%;

				.listLeft {
					position: absolute;
					top: -104rpx;
					left: 86rpx;
				}

				.listCen {
					left: 50%;
					text-align: center;
					width: 100%;
					margin-top: -36rpx;
					// top: -36rpx;
					// transform: translateX(-50%);
				}

				.listRight {
					position: absolute;
					top: -104rpx;
					right: 86rpx;
				}

				.assetsTxt {
					@include colF();
					@include font24();
					width: 100%;
					text-align: center;
					margin-top: 8rpx;
				}

				.icon5 {
					width: 100rpx;
					height: 130rpx;
				}
			}
		}

		// 切换钱包
		.cenBox {
			@include cen();
			padding: 0 50rpx;
			margin-top: 38rpx;

			.cenLeft {
				@include cen();
				@include borCol();
				@include font24();
				@include mainCol();
				@include bgCol();
				height: 70rpx;
				width: 50%;
				border-radius: 6rpx;
			}

			.txt3 {
				margin-left: 18rpx;
			}

			.icon6 {
				width: 36rpx;
				height: 36rpx;
			}
		}

		// 趋势图
		.listBox {
			padding: 0 50rpx;
			box-sizing: border-box;
			@include flexBet();

			.listLeft {
				width: 50%;
				@include bgCol();
				text-align: center;
				margin-top: 20rpx;
				padding: 44rpx 40rpx;
				border-radius: 8rpx;
				box-sizing: border-box;
				.icon8 {
					width: 240rpx;
					height: 92rpx;
				}

				.icon10 {
					width: 44rpx;
					height: 44rpx;
				}

				.listItem {
					@include flexBet();
					// margin-top: 30rpx;
					.itemLeft {
						@include flexDe();
					}

					.typeTxt {
						@include font24();
						@include colF();
					}

					.preTxt {
						@include font20();
						color: #FF5134;
					}

					.preDecline {
						color: #53E9A7;
					}
				}

				.rateTxt {
					margin-top: 20rpx;
					@include font30();
					@include colF();
					text-align: left;
				}

				.rateCh {
					margin-top: 8rpx;
					@include mainCol();
					@include font20();
					text-align: left;
				}
			}
		}
	}
</style>
