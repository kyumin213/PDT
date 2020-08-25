<template>
	<view class="contentBox">
		<tab-top left-icon="back" :title="languageInfo.transfer">
			<image slot="rightBox" class="icon35" src="~@/static/index/icon35.png" @tap="goTo('../TransferRecords/TransferRecords')"></image>
		</tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="../../../static/index/icon27.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.chooseCurrency}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="typeBox">
					<picker @change="translate" :value="index" :range="currencyItem" mode="selector" style="width: 100%;">
						<input type="text" disabled :placeholder="languageInfo.placeChooseCurrency" class="inp" v-model="currency">
						<image src="../../../static/index/icon28.png" class="icon28"></image>
					</picker>
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.receiveWalletName}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="text" :placeholder="languageInfo.placeReceiveWalletName" class="inp" v-model="nickName">
					<!-- <image src="../../../static/index/icon29.png" class="icon28 icon29" @tap="goTo('../addressWallet/addressWallet')"></image> -->
					<!-- <image src="../../../static/index/icon30.png" class="icon28" @tap="getCode"></image> -->
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.transferAmount}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="number" :placeholder="languageInfo.placeTransferAmount" @input="checkPrice" class="inp" v-model="amount">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.transtionPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageInfo.placeTranstionPwd" class="inp" v-model="pwd">
					<view class="txt1">{{languageInfo.handFee}}：<text>{{service}}% POO</text></view>
				</view>
				<view class="useBox" v-if="currency=='USDT'">{{languageInfo.availableUsdt}}：{{useUsdt}}</view>
				<view class="useBox" v-if="currency=='PDT'">{{languageInfo.availablePdt}}：{{usePdt}}</view>
			
				<view class="mt40">
					<text class="nextBtn" @tap="nextSubmit">{{languageInfo.nextStep}}</text>
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
				currency: '', //币种
				currencyId: '', //币种ID
				nickName: '', //收款用户昵称
				amount: '', //转账金额
				pwd: '', //交易密码
				languageInfo: {},
				currencyItem: ['PDT', 'USDT'],
				index: 0,
				service:'0',//手续费
				useUsdt:'', //USDT余额
				usePdt:'' //PDT余额
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow(){
			_this.getAccount()
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		// onHide(){
		// 	_this.currency=''
		// 	_this.nickName = ''
		// 	_this.amount = ''
		// 	_this.pwd = ''
		// 	_this.service='0'
		// },
		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 手续费
			getService(){
				let data = {
					currency_id:_this.currencyId,
					type:4
				}
				_this.get('api/getServerCharge',data).then(res=>{
					_this.service = (res.data.res.price)*100
				})
			},
			// 验证转账金额
			checkPrice(e){
				let nums = e.target.value
				if(_this.currency=='USDT'&&parseFloat(nums)>parseFloat(_this.useUsdt)){
					_this.amount = _this.useUsdt
				}else if(_this.currency=='PDT'&&parseFloat(nums)>parseFloat(_this.usePdt)){
					_this.amount = _this.usePdt
				}
			},
			// 下一步
			nextSubmit() {
				let cur = _this.currency
				let names = _this.nickName
				let money = _this.amount
				let pwd = _this.pwd

				if (cur == '' || names == '' || money == '' || pwd == '') {
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				} else {
					_this.post('api/verifyPaymentPassword', {
						payment_password: pwd
					}).then(res => {
							_this.getTrans()
					})
				}
			},
			// 转账
			getTrans() {
				let data = {
					currency_id: _this.currencyId,
					nickname: _this.nickName,
					num: _this.amount
				}
				_this.post('api/transfer', data).then(res => {
					uni.showToast({
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateTo({
							url:'../TransferRecords/TransferRecords'
						})
					}, 500)

				})
			},
			// 选择币种
			translate: function(e) {
				_this.index = e.detail.value
				let index = e.detail.value
				_this.currency = _this.currencyItem[index]
				_this.amount=''
				if (_this.currency == 'PDT') {
					_this.currencyId = 3
				} else if (_this.currency == 'USDT') {
					_this.currencyId = 4
				}
				_this.getService()
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
		}
	}
</script>

<style scoped lang="scss">
	.ml40{
		margin-left: 40rpx;
	}
	.mt40{
		margin-top: 40rpx;
	}
	.contentBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;

		.icon35 {
			width: 58rpx;
			height: 64rpx;
		}

		.content {
			overflow-y: auto;
			height: 100%;

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

				.inp {
					@include borCol();
					@include font20();
					@include colF();
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 4rpx;
					margin: 30rpx 0 40rpx 0;
					padding: 0 20rpx;
				}

				.icon12 {
					width: 28rpx;
					height: 48rpx;
				}

				.tips {
					display: inline-block;
					@include tipTxt();
					height: 80rpx;
				}
				.useBox{
					@include font20();
					@include colF();
					margin-top: 10rpx;
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

				.txt1 {
					@include font20();
					@include colF();
				}

				.typeBox {
					position: relative;
				}

				.icon28 {
					position: absolute;
					top: 50%;
					right: 20rpx;
					width: 48rpx;
					height: 48rpx;
					transform: translateY(-50%);
				}

				.icon29 {
					right: 60rpx;
				}
			}
		}
	}
</style>
