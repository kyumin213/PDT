<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.importWallet"></tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="../../../static/index/icon15.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.singularityAddress}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="text" :placeholder="languageInfo.placeSingularityAddress" @blur="checkAddress" class="inp" v-model="address">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.loginPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageInfo.placePwd" class="inp" v-model="pwd">
				</view>
				<view class="tipsBox">
					<text class="tips" v-show="addressShow">{{languageInfo.addressFormat}}</text>
				</view>
				<view>
					<text class="nextBtn" @tap="LoginSubmit">{{languageInfo.startImport}}</text>
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
				tips: '', //提示
				address: '', //奇点地址
				pwd: '', //密码
				languageInfo: {},
				addressShow: false
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow() {
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		methods: {
			// 验证奇点地址
			checkAddress() {
				let values = _this.address
				console.log(values.length)
				let reg = /^r[A-Za-z0-9]{33}$/
				if (reg.test(values)) {
					_this.addressShow = false
				} else {
					_this.addressShow = true
				}
			},
			// 下一步
			LoginSubmit() {
				let address = _this.address
				let pwd = _this.pwd
				let imei = uni.getStorageSync('uuid')
				console.log(imei);
				let data = {
					sgy_address: address,
					password: pwd,
					imei: imei
				}
				if (address == '' || pwd == '') {
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				} else {
					_this.post('api/login', data).then(res => {
						if (res.data.code == 200) {
							uni.setStorageSync('token', res.data.res.token)
							uni.showToast({
								icon: 'success'
							})
							setTimeout(() => {
								uni.reLaunch({
									url: '../index'
								})
							}, 500)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;

		.content {
			height: 100%;
			overflow-y: auto;
			padding: 50rpx 50rpx;
			box-sizing: border-box;

			.iconBox {
				width: 100%;
				@include cen();
				padding-bottom: 60rpx;
				box-sizing: border-box;
			}

			.icon11 {
				width: 188rpx;
				height: 240rpx;
			}

			.itemBox {
				padding: 60rpx 44rpx 60rpx 44rpx;
				@include bgCol();
				border-radius: 6rpx;
				text-align: center;
				box-sizing: border-box;

				.items {
					@include cen();

					.itemTxt {
						@include font30();
						@include mainCol();
						margin: 0 10rpx;
					}
				}

				.inp {
					@include borCol();
					@include font20();
					@include colF();
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 4rpx;
					margin: 30rpx 0 40rpx 0;
				}

				.icon12 {
					width: 28rpx;
					height: 48rpx;
				}

				.tipsBox {
					padding: 0 0 20rpx 0;
					box-sizing: border-box;
				}

				.tips {
					display: block;
					@include tipTxt();
				}

				.nextBtn {
					@include borCol();
					@include font24();
					@include mainCol();
					background-color: #260300;
					width: 100%;
					display: inline-block;
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 6rpx;
					margin-top: 260rpx;
				}

				.tapTip {
					@include mainCol();
					@include font24();
					line-height: 36rpx;
				}
			}
		}
	}
</style>
