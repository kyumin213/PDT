<template>
	<view class="containerBox">
		<tab-top left-icon="" :title="languageInfo.transaction"></tab-top>
		<view class="content">
			<!-- 顶部 -->
			<view class="conTop">
				<view class="itemLeft">
					<image src="../../static/transition/icon1.png" class="icon1"></image>
					<view class="accountBox">
						<text class="accountTxt">{{languageInfo.accountAssets}}</text>
						<view>
							<text class="accountNum">{{accountUSDT}}</text>
						</view>
					</view>
				</view>
				<view class="topRight">
					<view class="itemRight mb80" @tap="goTo('marketPlace/marketPlace')">
						<image src="../../static/transition/icon2.png" class="icon2"></image>
						<view class="setItemBox">
							<text>{{languageInfo.tradingMarket}}</text>
						</view>
					</view>
					<view class="itemRight" @tap="goTo('orderRecord/orderRecord')">
						<image src="../../static/transition/icon3.png" class="icon2"></image>
						<view class="setItemBox">
							<text>{{languageInfo.orderRecord}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 交易市场 -->
			<view class="marketBox">
				<text>{{languageInfo.tradingMarket}}</text>
			</view>
			<view class="itemListBox">
				<view class="itemList">
					<view class="listLeft">
						<image src="../../static/transition/icon4.png" class="icon4"></image>
						<text class="curName">PDT</text>
					</view>
					<view class="listRight">
						<view>
							<text>{{languageInfo.totalBalance}}</text>
						</view>
						<view class="mt8">
							<text>{{accountPDT}}</text>
						</view>
					</view>
				</view>
				<view class="br"></view>
				<view class="itemList">
					<view class="listLeft">
						<image src="../../static/transition/icon5.png" class="icon4"></image>
						<text class="curName">POO</text>
					</view>
					<view class="listRight">
						<view>
							<text>{{languageInfo.totalBalance}}</text>
						</view>
						<view class="mt8">
							<text>{{accountPOO}}</text>
						</view>
					</view>
				</view>
				<view class="br"></view>
				<view class="itemList">
					<view class="listLeft">
						<image src="../../static/transition/icon6.png" class="icon4"></image>
						<text class="curName">KL</text>
					</view>
					<view class="listRight">
						<view>
							<text>{{languageInfo.totalBalance}}</text>
						</view>
						<view class="mt8">
							<text>{{accountKL}}</text>
						</view>
					</view>
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
				accountUSDT:'',
				accountPDT:'',
				accountPOO:'',
				accountKL:'',
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad(){
			_this = this
		},
		onShow(){
			_this.myAccount()
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// 跳转
			goTo(url){
				_this.linkTo.navTo(url)
			},
			// 我的资产
			myAccount(){
				_this.get('api/myProperty').then(res=>{
					let datas = res.data.res
					for (let i in datas) {
						if (datas[i].currency_id == '1') {
							_this.accountKL = datas[i].num
						}
						if (datas[i].currency_id == '2') {
							_this.accountPOO = datas[i].num
						}
						if (datas[i].currency_id == '3') {
							_this.accountPDT = datas[i].num
						}
						if (datas[i].currency_id == '4') {
							_this.accountUSDT = datas[i].num
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.mb80 {
		margin-bottom: 80rpx;
	}
	.mt8{
		margin-top: 8rpx;
	}

	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		.conTop {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			padding-top: 20rpx;

			.itemLeft {
				position: relative;
				width: 280rpx;
				margin-right: 54rpx;
				.accountBox {
					text-align: center;
					position: absolute;
					top: 190rpx;
					left: 50%;
					transform: translateX(-50%);
					.accountTxt {
						display: inline-block;
						@include mainCol();
						@include font24();
						margin-bottom: 10rpx;
					}

					.accountNum {
						@include font36();
						font-family: 'Impact';
						background-image: -webkit-linear-gradient(bottom, #FF550A, #FFDD65);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}

			.topRight {
				margin-bottom: 20rpx;
			}

			.icon1 {
				width: 280rpx;
				height: 370rpx;
			}

			.itemRight {
				@include flexBet();
				position: relative;
				z-index: 1;
				margin-left: 30rpx;
			}

			.setItemBox {
				width: 260rpx;
				height: 60rpx;
				line-height: 60rpx;
				padding:0 20rpx 0 60rpx;
				text-align: center;
				@include borCol();
				@include mainCol();
				@include font24();
				background-color: #260300;
				border-radius: 6rpx;
				box-sizing: border-box;
			}

			.icon2 {
				width: 100rpx;
				height: 130rpx;
				position: absolute;
				z-index: 2;
				left: -46rpx;
				top: -50rpx;
			}
		}

		// 交易市场
		.marketBox {
			@include font30();
			@include mainCol();
			@include bgCol();
			@include borCol();
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			margin: 92rpx 30rpx 0 30rpx;
			border-radius: 6rpx;
		}
		.itemListBox{
			margin: 0 30rpx;
			@include bgCol();
			opacity: .8;
			padding: 0 30rpx;
			border-radius: 8rpx;
		}

		.itemList {
			@include flexBet();
			padding: 34rpx 0;
			.icon4 {
				width: 60rpx;
				height: 60rpx;
			}
			.listLeft{
				@include flexDe();
				.curName{
					@include font26();
					@include colF();
					margin-left: 20rpx;
				}
			}
			.listRight{
				@include font24();
				@include colF();
				text-align: right;
			}
			
		}
		.br{
			width: 100%;
			height: 1rpx;
			background-color: #FFDA7D;
		}
	}
</style>
