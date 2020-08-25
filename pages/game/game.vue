<template>
	<view class="contentBox">
		<tab-top left-icon="" :title="languageInfo.game"></tab-top>
		<view class="content">
			<!-- 官方公告 -->
			<view class="noticeBox" @tap="goTo('../index/officialAnnouncement/officialAnnouncement')">
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
			<!-- 顶部图片 -->
			<view class="topBanner">
				<image v-if="lang=='zh-cn'" src="../../static/game/topBanner.png" class="topImg"></image>
				<image v-if="lang=='en-us'" src="../../static/game/topEn.png" class="topImg"></image>
			</view>
			<!-- 账户资产 -->
			<view class="userAssetsBox" @tap="goTo('accountBalance/accountBalance')">
				<image class="accountBalance" src="../../static/game/accountBalance.png" mode=""></image>
				<view class="userAssets">
					<text>{{languageInfo.accountAssets}}</text>
					<text>{{userAssets}}</text>
				</view>
			</view>
			<!-- 充值，提现，矿池 -->
			<view class="gridBox">
				<view class="gridTtem" @tap="goTo('topUp/topUp')">
					<image src="../../static/game/topUp.png" mode=""></image>
					<text>{{languageInfo.exchange}}</text>
				</view>
				<view class="gridTtem ml10" @tap="goTo('withdrawal/withdrawal')">
					<image src="../../static/game/withdrawal/withdrawal.png" mode=""></image>
					<text>{{languageInfo.withdraw}}</text>
				</view>
				<view class="gridTtem ml10" @tap="goTo('orePool/orePool')">
					<image src="../../static/game/orePool.png" mode=""></image>
					<text>{{languageInfo.MiningPool}}</text>
				</view>
			</view>
			<!-- 邀请好友 -->
			<view class="inviteFriends" @tap="goTo('promotion/promotion')">
				<image v-if="lang=='zh-cn'" src="../../static/game/middelBanner.png" class="cenImg"></image>
				<image v-if="lang=='en-us'" src="../../static/game/cenEn.png" class="cenImg"></image>
			</view>
			<!-- 游戏区 -->
			<view class="gameTitle">
				<view class="leftBr"></view>
				<text>{{languageInfo.gameZone}}</text>
				<view class="rightBr"></view>
			</view>
			<view class="gameBanner" @tap="goToGame('gameCenter/gameCenter')">
				<image v-if="lang=='zh-cn'" src="../../static/game/shutiaoGameBanner.png" class="bomImg"></image>
				<image v-if="lang=='en-us'" src="../../static/game/bomEn.png" class="bomImg"></image>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="modalBox">
				<view @tap="closeModal" class="closeBox">
					<text class="closeIcon"></text>
				</view>
				<view class="modalTit">
					<image src="../../static/index/icon12.png" class="icon12"></image>
					<text class="title">{{languageInfo.gameBind}}</text>
					<image src="../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="pwdTxt">{{languageInfo.enterCode}}</view>
				<view>
					<input :placeholder="languageInfo.inviteCode" v-model="invitationCode" class="pwdInp">
				</view>
				<view class="tips" v-show="invitationCodeErr">
					<text>{{invitationErrTips}}</text>
				</view>
				<view><text class="confirBtn mb10" @tap="confirmTap('gameCenter/gameCenter')">{{languageInfo.confirm}}</text></view>
				<view><text class="confirBtn" @tap="closeModal">{{languageInfo.cancel}}</text></view>
			</view>
		</uni-popup>
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
				rowNum: 10,
				userAssets: '9999.0000',
				noticeAlertsList: [],
				invitationCode: '',
				invitationCodeErr: true,
				invitationErrTips: '',
				lang: '',
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
			if(getApp().globalData.bgm){
				this.musicControl.bgmStop()
			}
			_this.getNotice()
			_this.getAccount()
			_this.lang = uni.getStorageSync('lang')
			_this.languageInfo = _this.linkTo.showLanguage()
			// // #ifdef APP-PLUS
			// 	plus.screen.lockOrientation('portrait-primary'); //锁定
			// // #endif
		},
		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url);
			},
			goToGame(url) {
				this.get('api/userStatic', '').then(res => {
					if (res.data.code == 200) {
						if (res.data.res.code == 1) {
							_this.linkTo.navTo(url);
							_this.$refs.popup.close()
						} else {
							_this.$refs.popup.open()
						}
					}
				})
			},
			confirmTap(url) {
				this.post('api/bindUser', {
					invite_code: this.invitationCode
				}).then(res => {
					if (res.data.code == 200) {
						_this.linkTo.navTo(url);
						this.invitationCode = ''
						_this.$refs.popup.close()
					}
				})
			},
			// 关闭弹窗
			closeModal() {
				_this.$refs.popup.close()
			},
			// 官方公告
			getNotice() {
				let data = {
					page: _this.page,
					rowNum: _this.rowNum,
					type: 2
				}
				_this.get('api/messageList', data).then(res => {
					_this.noticeAlertsList = res.data.res.data
				})
			},
			// 账户资产
			getAccount() {
				_this.get('api/myProperty').then(res => {
					let datas = res.data.res
					for (let i in datas) {
						if (datas[i].currency_id == '4') {
							_this.userAssets = datas[i].num
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ml16 {
		margin-left: 16rpx;
	}

	.mb10 {
		margin-bottom: 10rpx;
	}

	.ml10 {
		margin-left: 10rpx;
	}

	.contentBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
	}

	.content {
		padding: 0 20rpx;
		box-sizing: border-box;

		.noticeBox {
			margin-top: 12rpx;
			width: 100%;
			display: flex;
			align-items: center;
			height: 48rpx;
			background-color: #1A050A;
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

		.topBanner {
			margin: 10rpx auto 70rpx auto;

			.topImg {
				width: 100%;
				height: 250rpx;
			}
		}

		.userAssetsBox {
			height: 70rpx;
			margin: 0 auto;
			position: relative;

			.accountBalance {
				width: 110rpx;
				height: 140rpx;
				position: absolute;
				top: -56rpx;
				left: 0rpx;
			}

			.userAssets {
				@include cen();
				background: #260300;
				// width: 660rpx;
				height: 70rpx;
				margin-left: 48rpx;
				border: 1rpx solid #FFDA7D;
				border-radius: 6rpx;
				box-sizing: border-box;
				padding: 0 31rpx 0 72rpx;
				justify-content: space-between;

				text {
					@include font24() color: #FFDA7D
				}
			}
		}

		.gridBox {
			@include cen();
			// width: 710rpx;
			height: 210rpx;
			justify-content: space-between;
			margin: 50rpx auto 40rpx auto;

			.gridTtem {
				@include flexC();
				width: 33.3%;
				height: 210rpx;
				border: 1rpx solid #FFC950;
				background: rgba(18, 4, 7, 0.5);
				border-radius: 10rpx;
				justify-content: center;
				align-items: center;
				// padding-bottom: 20rpx;
				box-sizing: border-box;

				image {
					width: 102rpx;
					height: 128rpx;
				}

				text {
					@include font24() color: #FFFFFF;
					margin-top: 16rpx;
				}
			}
		}

		.inviteFriends {
			margin: 10rpx auto 30rpx auto;

			.cenImg {
				width: 100%;
				height: 162rpx;
			}
		}

		.gameTitle {
			@include cen();
			width: 100%;
			height: 38rpx;
			margin: 31rpx auto 20rpx auto;

			.leftBr {
				width: 157rpx;
				height: 38rpx;
				background: url(../../static/game/ltBorder.png);
				background-repeat: no-repeat;
				background-size: cover;
			}

			.rightBr {
				width: 157rpx;
				height: 38rpx;
				background: url(../../static/game/ltBorder.png);
				background-repeat: no-repeat;
				background-size: cover;
				-moz-transform: scaleX(-1);
				-webkit-transform: scaleX(-1);
				-o-transform: scaleX(-1);
				transform: scaleX(-1);
			}

			text {
				@include font24();
				padding: 0 20rpx;
				color: #FFDA7D;
			}
		}

		.gameBanner {
			margin: 10rpx auto 30rpx auto;

			.bomImg {
				width: 100%;
				height: 161rpx;
			}
		}
	}

	// 弹窗
	.modalBox {
		@include borCol();
		background-color: #260300;
		border-radius: 14rpx;
		padding: 54rpx 50rpx;
		box-sizing: border-box;
		text-align: center;
		position: relative;

		.closeBox {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			top: 0;
			right: 0;
		}

		.closeIcon {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			display: inline-block;
			width: 20rpx;
			height: 2rpx;
			background-color: #ccc;
			transform: rotate(45deg);
		}

		.closeIcon::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			display: inline-block;
			width: 20rpx;
			height: 2rpx;
			background-color: #ccc;
			transform: rotate(90deg);
		}

		.modalTit {
			@include cen();
		}

		.title {
			@include font30();
			@include mainCol();
			padding: 0 10rpx;
		}

		.icon12 {
			width: 28rpx;
			height: 48rpx;
		}

		.pwdTxt {
			@include font24();
			@include mainCol();
			padding: 40rpx 0 20rpx 0;
		}

		.pwdInp {
			@include borCol();
			@include font20();
			@include mainCol();
			height: 62rpx;
			line-height: 62rpx;
			border-radius: 4rpx;
			margin-bottom: 40rpx;
		}

		.confirBtn {
			display: inline-block;
			width: 440rpx;
			height: 60rpx;
			line-height: 60rpx;
			@include bgCol();
			@include mainCol();
			@include font24();
			@include borCol();
			border-radius: 6rpx;
		}

	}
</style>
