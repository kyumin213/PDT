<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.retrievePayPwd"></tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="@/static/me/icon10.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view>
					<view class="tapTip">
						{{languageInfo.backupTips}}
					</view>
					<view>
						<textarea class="areas" value="" v-model="keyWord" :placeholder="languageInfo.placeEnterWord" />
					</view>
				</view>
				<view class="items">
					<image src="@/static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.newPayPwd}}</text>
					<image src="@/static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" @input="changeLogoPwd(newPwd)" :placeholder="languageInfo.placeNewPayPwd" class="inp" v-model="newPwd">
				</view>
				<view class="items">
					<image src="@/static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.confirPayPwd}}</text>
					<image src="@/static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageInfo.placeConfirPayPwd" class="inp" v-model="confirNewPwd">
				</view>
				<view class="tipBox">
					<text class="tips" v-show="logoPwdValid">{{languageInfo.formatPwd}}</text>
					<text class="tips" v-show="confirNewPwd!=''&&newPwd!=confirNewPwd">{{languageInfo.twoPwd}}</text>
				</view>
				<view>
					<text class="nextBtn" @tap="confirmBtn">{{languageInfo.backFind}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	var _this
	export default {
		data() {
			return {
				logoPwdValid:false,
				keyWord: '', //助记词
				newPwd: '', //新密码
				confirNewPwd: '', //确认新密码
				languageInfo:{}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow(){
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		methods: {
			// 支付密码验证
			changeLogoPwd(value) {
				const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/
				if (reg.test(value)) {
					_this.logoPwdValid = false
				} else {
					_this.logoPwdValid = true
				}
			},
			// 确认修改
			confirmBtn() {
				let word = _this.keyWord
				let pwd = _this.newPwd
				let pwds = _this.confirNewPwd
				let data = {
					word:word,
					payment_password:pwd,
					confirm_payment_password:pwds
				}
				if (word == '' || pwd == '' || pwds == '') {
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				} else {
					_this.post('api/forgetPaymentPassword',data).then(res=>{
						uni.showToast({
							icon:'success'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'../securitySettings'
							})
						},500)
					})
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
		height: 100%;
		overflow: auto;

		.iconBox {
			width: 100%;
			@include cen();
			padding-top: 50rpx;
			box-sizing: border-box;
		}

		.icon11 {
			width: 188rpx;
			height: 240rpx;
		}

		.itemBox {
			margin: 60rpx 50rpx;
			padding: 60rpx 44rpx;
			@include bgCol();
			border-radius: 6rpx;
			text-align: center;
			box-sizing: border-box;
			.taps {
				@include cen();
				width: 100%;
			
			}
			
			.taps-title {
				@include borCol();
				@include mainCol();
				@include font24();
				width: 100%;
				height: 56rpx;
				line-height: 56rpx;
			}
			
			.tapsActive {
				background-color: #FFDA7D;
				color: #120407;
				font-weight: bold;
			}
			
			.tapTip {
				@include mainCol();
				@include font24();
				line-height: 36rpx;
			}
			.items {
				@include cen();

				.itemTxt {
					@include font30();
					@include mainCol();
					margin: 0 10rpx;
				}
			}
			.areas{
				@include borCol();
				@include font20();
				@include mainCol();
				height: 170rpx;
				width: 100%;
				padding: 30rpx;
				line-height: 50rpx;
				border-radius: 4rpx;
				margin: 30rpx 40rpx 40rpx 0;
				text-align: left;
				box-sizing: border-box;
			}

			.inp {
				@include borCol();
				@include font20();
				@include mainCol();
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 4rpx;
				margin: 30rpx 0 40rpx 0;
			}

			.icon12 {
				width: 28rpx;
				height: 48rpx;
			}
			.tipBox{
				height: 80rpx;
			}

			.tips {
				display: inline-block;
				@include tipTxt();
				
			}

			.nextBtn {
				// position: fixed;
				// bottom:98rpx;
				// left: 94rpx;
				// right: 94rpx;
				@include borCol();
				@include font24();
				@include mainCol();
				width: 100%;
				background-color: #260300;
				display: inline-block;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 6rpx;
			}
		}
	}
</style>
