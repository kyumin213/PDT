<template>
	<view class="contentBox">
		<tab-top left-icon="back" :title="languageObj.withdraw">
			<image @tap="goTo('withdrawalRecord/withdrawalRecord')" slot="rightBox" src="../../../static/game/withdrawal/withdrawalRecord.png"
			 style="float: right; width: 58rpx;height: 64rpx;"></image>
		</tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="../../../static/game/withdrawal/withdrawal.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageObj.WithdrawalCurrency}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="typeBox">
					<picker @change="translate" :value="index" :range="currencyItem" mode="selector" style="width: 100%;">
						<input type="text" disabled :placeholder="languageObj.placeChooseCurrency" class="inp" v-model="currency">
						<image src="../../../static/index/icon28.png" class="icon28"></image>
					</picker>
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageObj.WithdrawalAmount}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="typeBox">
					<input type="number" :placeholder="languageObj.placeWithdrawaAnount" @input="checkPrice" class="inp" v-model="topUpNum">
					<text class="rightText" @tap="allIn">{{languageObj.all}}</text>
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageObj.withdrawalAddress}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input :placeholder="languageObj.placeWithdrawaAddress" class="inp" style="margin-bottom: 10rpx;" v-model="wdAddress">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageObj.transtionPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageObj.placeTranstionPwd" class="inp" style="margin-bottom: 10rpx;" v-model="pwd">
				</view>
				<view class="minersPriceBox">
					<text>{{languageObj.MinerFees}}</text>
					<text>{{minersPrice}}POO=1USDT</text>
				</view>
				<view class="exchangeRate mb60">{{languageObj.currentNumber}}<text>{{usdtBalance}}</text></view>
				<view>
					<text class="tips">{{tips}}</text>
				</view>
				<view>
					<text class="nextBtn" @tap="nextSubmit">{{languageObj.ConfirmWithdrawal}}</text>
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
				currency: 'USDT', //币种
				topUpNum: '', //提现金额
				pwd: '', //交易密码
				currencyItem: ['USDT'], // picker选择器选项
				index: 0, // 当前选中值的下标
				minersPrice: '', //矿工费用
				wdAddress: '', // 提现地址
				languageObj:{},
				usdtBalance: ''
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
			_this.getService()
			_this.getCurrentNum()
		},
		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 币种数量
			getCurrentNum() {
				_this.get('api/userCurrency').then(res => {
					let datas = res.data.res
					for (let i in datas) {
						if (datas[i].currency_name == 'USDT') {
							_this.usdtBalance = this.parsNum(datas[i].num)
						}
					}
				})
			},
			// 提现金额不能大于余额
			checkPrice(e) {
				let amount = e.target.value
				let balance = _this.usdtBalance
				if (parseFloat(amount)>parseFloat(balance)) {
					_this.topUpNum = balance
				}
			},
			nextSubmit() {
				let cur = _this.currency
				let topUpNum = _this.topUpNum
				let pwd = _this.pwd
				let address = _this.wdAddress
				if (cur == '' || topUpNum == '' || pwd == '' || address == '') {
					_this.linkTo.$noToast(_this.languageObj.informationEmpty)
				} else {
					_this.post('api/verifyPaymentPassword', {
						payment_password: pwd
					}).then(res => {
						_this.getWithdraw()
					})
				}
			},
			// 手续费
			getService() {
				let data = {
					currency_id: 4,
					type: 1
				}
				_this.get('api/getServerCharge', data).then(res => {
					_this.minersPrice = (res.data.res.price) * 100
				})
			},
			// 提现
			getWithdraw() {
				let data = {
					currency_id: 4,
					url: _this.wdAddress,
					num: _this.topUpNum
				}
				_this.post('api/doWithdraw', data).then(res => {
					uni.showToast({
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: 'withdrawalRecord/withdrawalRecord'
						})
					}, 500)

				})
			},
			// 选择币种
			translate: function(e) {
				_this.index = e.detail.value
				let index = e.detail.value
				_this.currency = this.currencyItem[index]
				console.log(e.detail.value);
				// switch (index){
				// 	case 0:
				// 		this.currency = this.currencyItem[0] + ' (钱包资产余额10.023 PDT)'
				// 		break;
				// 	case 1:
				// 		this.currency = this.currencyItem[1] + ' (钱包资产余额10.023 POO)'
				// 		break;
				// 	default:
				// 		break;
				// }
				// model.animationEvents(this, 0, true, 400);
			},
			// 全部
			allIn() {
				let all = _this.usdtBalance
				_this.topUpNum = all
			}
		}
	}
</script>

<style scoped lang="scss">
	.contentBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;

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
				margin: 60rpx 50rpx 0 50rpx;
				padding: 44rpx 44rpx 60rpx 44rpx;
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

				.minersPriceBox {
					@include borCol();
					@include font20();
					@include mainCol();
					@include cen();
					justify-content: space-between;
					height: 70rpx;
					box-sizing: border-box;
					padding: 0 30rpx;
					color: #FFFFFF;
				}

				.inp {
					@include borCol();
					@include font20();
					@include mainCol();
					color: #FFFFFF;
					height: 70rpx;
					border-radius: 4rpx;
					margin: 30rpx 0 40rpx 0;
				}

				.btmTxt {
					font-size: 18rpx;
					color: #FFFFFF;
				}

				.icon12 {
					width: 28rpx;
					height: 48rpx;
				}

				.tips {
					@include tipTxt();
					display: block;
					margin-top: 60rpx;
					height: 40rpx;
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
				}

				.typeBox {
					position: relative;
				}

				.icon28 {
					position: absolute;
					top: 14rpx;
					right: 20rpx;
					width: 48rpx;
					height: 48rpx;
				}

				.rightText {
					@include font20();
					position: absolute;
					top: 3rpx;
					right: 20rpx;
					width: 48rpx;
					height: 68rpx;
					color: #FFFFFF;
					line-height: 68rpx;
				}

				.exchangeRate {
					@include colF();
					@include font24();
					padding-top: 40rpx;
				}
			}
		}
	}
</style>
