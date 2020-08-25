<template>
	<view class="contentBox">
		<tab-top left-icon="back" :title="languageObj.exchange">
			<image @tap="goTo('topUpRecord/topUpRecord')" slot="rightBox" src="../../../static/game/topUp/record.png" style="float: right; width: 58rpx;height: 64rpx;"></image>
		</tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="../../../static/game/topUp.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageObj.ExchangeCurrency}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="typeBox">
					<picker @change="translate" :value="index" :range="currencyItem" mode="selector" style="width: 100%;">
						<input type="text" disabled :placeholder="languageObj.placeChooseCurrency" class="inp" v-model="currency">
						<image src="../../../static/index/icon28.png" class="icon28"></image>
					</picker>
				</view>
		<!-- 		<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">兑换币种</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<view class="inp">
						<text class="currencyType">POO</text>
						<text class="tipGray">(钱包资产余额10.023 POO)</text>
					</view>
					<input class="inp" v-model="topUpType">
				</view> -->
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageObj.ExchangeAmount}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="number" :placeholder="languageObj.placeExchangeAmount" @input="changePrice" class="inp" v-model="topUpNum">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageObj.transtionPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageObj.placeTranstionPwd" class="inp" v-model="pwd">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt" v-if="currency=='USDT'">{{languageObj.Available}}POO</text>
					<text class="itemTxt" v-else>{{languageObj.Available}}USDT</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="number" disabled class="inp" style="margin-bottom: 14rpx;" v-model="canGetPOO">
				</view>
				<view class="exchangeRate mb20">{{languageObj.exchangeRate}} 1 USDT= 7.0 POO</view>
				<view class="exchangeRate mb60">{{languageObj.currentNumber}}<text v-if="currency=='USDT'">{{usdtBalance}}</text><text v-if="currency=='POO'">{{pooBalance}}</text></view>
				<view class="tipsBox">
					<text class="tips">{{tips}}</text>
				</view>
				<view>
					<text class="nextBtn" @tap="nextSubmit">{{languageObj.ConfirmExchange}}</text>
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
				currencyId:'',//币种ID
				topUpNum: '', //兑换金额
				pwd: '', //交易密码
				getKLNum: '50', //可获得KL
				currencyItem: ['USDT', 'POO'], // picker选择器数据
				index: '', // picker选择器当前选中值的下标
				canGetPOO: '', // 可获得POO
				topUpType:'POO (钱包资产余额10.023 POO)',
				tips:'',
				usdtBalance:'',//usdt余额
				pooBalance:'',//poo余额,
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
		onShow(){
			_this.getCurrentNum()
		},
		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 兑换金额不能大于余额
			checkNum(e){
				let nums = e.target.value
				let usdt = _this.usdtBalance
				let poo = _this.pooBalance
				if(_this.currency == 'POO' && parseFloat(nums)>parseFloat(poo)){
					_this.topUpNum = poo
				}if(_this.currency == 'USDT' && parseFloat(nums)>parseFloat(usdt)){
					_this.topUpNum = usdt
				}
			},
			// 币种数量
			getCurrentNum(){
				_this.get('api/userCurrency').then(res=>{
					let datas = res.data.res
					for (let i in datas) {
						if (datas[i].currency_name == 'USDT') {
							_this.usdtBalance = this.parsNum(datas[i].num)
						}if(datas[i].currency_name == 'POO'){
							_this.pooBalance = this.parsNum(datas[i].num)
						}
					}
				})
			},
			// 可获得币种
			changePrice(e){
				let nums = e.target.value
				let usdt = _this.usdtBalance
				let poo = _this.pooBalance
				if(_this.currency == 'POO' && parseFloat(nums)>parseFloat(poo)){
					_this.topUpNum = poo
					_this.canGetPOO = (parseFloat(poo)/7).toFixed(4)
				}else if(_this.currency == 'USDT' && parseFloat(nums)>parseFloat(usdt)){
					_this.topUpNum = usdt
					_this.canGetPOO = (parseFloat(usdt)*7).toFixed(4)
				}
				else if(_this.currency=='POO'){
					_this.canGetPOO = (parseFloat(nums)/7).toFixed(4)
				}else if(_this.currency=='USDT'){
					_this.canGetPOO = (parseFloat(nums)*7).toFixed(4)
				}
			},
			// 确认兑换按钮
			nextSubmit(){
				let curr = _this.currency
				let money = _this.topUpNum
				let pwd = _this.pwd
				if(curr=='' || money==''||pwd==''){
					_this.linkTo.$noToast(_this.languageObj.informationEmpty)
				}else{
					_this.post('api/verifyPaymentPassword', {
						payment_password: pwd
					}).then(res => {
						_this.getConversion()
					})
				}
			},
			// 兑换成功
			getConversion(){
				let data = {
					currency_id:_this.currencyId,
					num:_this.topUpNum
				}
				_this.post('api/conversion',data).then(res=>{
					uni.showToast({
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateTo({
							url:'topUpRecord/topUpRecord'
						})
					}, 500)
				})
			},
			// 选择币种
			translate: function(e) {
				_this.index = e.detail.value
				let index = e.detail.value
				_this.currency = _this.currencyItem[index]
				_this.canGetPOO=''
				_this.topUpNum = ''
				if (_this.currency == 'POO') {
					_this.currencyId = 2
				} else if (_this.currency == 'USDT') {
					_this.currencyId = 4
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.mb60{
		margin-bottom: 60rpx;
	}
	.mb20{
		margin-bottom: 20rpx;
	}
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

				.inp {
					@include borCol();
					@include font20();
					@include mainCol();
					height: 70rpx;
					border-radius: 4rpx;
					margin: 30rpx 0 40rpx 0;
					color: #FFFFFF;
					@include cen();
					.tipGray{
						font-size: 18rpx;
						color: #AAAAAA;
					}
				}

				.icon12 {
					width: 28rpx;
					height: 48rpx;
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
			}
		}
	}
	.exchangeRate{
		@include font20();
		color: #FFFFFF;
	}
	
	.tipsBox {
		// height: 32rpx;
		padding: 0 0 20rpx 0;
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
</style>
