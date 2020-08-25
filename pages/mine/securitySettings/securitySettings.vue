<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.SecuritySettings"></tab-top>
		<view class="content">
			<!-- 登录密码 -->
			<view class="items" @tap="goTo('updateLoginPwd/updateLoginPwd')">
				<text class="itemTxt">{{languageInfo.loginPwdModify}}</text>
				<image src="../../../static/index/icon32.png" class="icon32"></image>
			</view>
			<!-- 支付密码 -->
			<view class="items" @tap="goTo('updatePayPwd/updatePayPwd')">
				<text class="itemTxt">{{languageInfo.payPwdModify}}</text>
				<image src="../../../static/index/icon32.png" class="icon32"></image>
			</view>
			<!-- 支付密码找回 -->
			<view class="items" @tap="goTo('retrievePwd/retrievePwd')">
				<text class="itemTxt">{{languageInfo.retrievePayPwd}}</text>
				<image src="../../../static/index/icon32.png" class="icon32"></image>
			</view>
			<!-- 到处助记词 -->
			<view class="items" @tap="exportWords">
				<text class="itemTxt">{{languageInfo.ExportMnemonic}}</text>
				<image src="../../../static/index/icon32.png" class="icon32"></image>
			</view>
			<!-- 修改确认弹窗 -->
			<uni-popup ref="popup" type="center">
				<view class="modalBox">
					<view @tap="closeModal" class="closeBox">
						<text class="closeIcon"></text>
					</view>
					<view class="modalTit">
						<image src="../../../static/index/icon12.png" class="icon12"></image>
						<text class="title">{{languageInfo.SafetyConfirmation}}</text>
						<image src="../../../static/index/icon12.png" class="icon12"></image>
					</view>
					<view class="pwdTxt">{{languageInfo.enterPayPwd}}</view>
					<view>
						<input type="password" :placeholder="languageInfo.placeEnterPayPwd" v-model="pwd" class="pwdInp">
					</view>
					<view><text class="confirBtn mb10" @tap="pwdConfir">{{languageInfo.confirm}}</text></view>
					<view><text class="confirBtn" @tap="closeModal">{{languageInfo.cancel}}</text></view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	var _this;
	export default {
		data() {
			return {
				pwd: '',
				languageInfo: {}
			}
		},
		components: {
			tabTop,
			uniPopup
		},
		onLoad() {
			_this = this
		},
		onShow() {
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		onHide() {
			_this.pwd = ''
		},
		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 确认修改
			// subUpdate() {
			// 	_this.$refs.popup.open()
			// },
			// 关闭弹窗
			closeModal() {
				_this.$refs.popup.close()
			},
			// 导出助记词
			exportWords() {
				_this.$refs.popup.open()
			},
			// 登录密码确认
			pwdConfir() {
				let pwd = _this.pwd
				if(pwd==''){
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				}else{
					_this.post('api/verifyPaymentPassword', {
						payment_password: pwd
					}).then(res => {
						uni.showToast({
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: 'exportWord/exportWord'
							})
							_this.$refs.popup.close()
						}, 500)
					})
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.mt178 {
		margin-top: 178rpx;
	}

	.mb10 {
		margin-bottom: 10rpx;
	}

	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		padding: 20rpx 30rpx;
		box-sizing: border-box;

		.items {
			@include bgCol();
			@include borCol();
			@include flexBet();
			border-radius: 10rpx;
			height: 100rpx;
			padding: 0 32rpx;
			margin-bottom: 10rpx;

			.itemTxt {
				@include mainCol();
				@include font30();
			}

			.icon32 {
				width: 52rpx;
				height: 50rpx;
			}

			.userNames {
				@include font24();
				@include colF();
			}
		}

		.btnBox {
			position: fixed;
			left: 30rpx;
			right: 30rpx;
			bottom: 98rpx;
		}

		.btns {
			display: block;
			height: 70rpx;
			line-height: 70rpx;
			@include bgCol();
			@include borCol();
			@include font24();
			@include mainCol();
			border-radius: 6rpx;
			padding: 0;
			text-align: center;
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
				height: 60rpx;
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
	}
</style>
