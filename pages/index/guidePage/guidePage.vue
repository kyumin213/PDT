<template>
	<view class="content">
		<view class="checkLang">
			<picker @change="checkLanguage" :value="index" :range="languageData" mode="selector">
				<image src="../../../static/me/icon1.png" v-show="index=='0'" class="icon1"></image>
				<image src="../../../static/me/en.png" v-show="index=='1'" class="icon1"></image>
			</picker>
		</view>
		<view>
			<image src="../../../static/index/icon23.png" class="icon23"></image>
		</view>
		<view class="items" @tap="goTo('../creatWallet/creatWallet')">
			<image src="../../../static/index/icon24.png" class="icon24"></image>
			<view class="setItemBox">
				<text>{{languageInfo.createWallet}}</text>
			</view>
		</view>
		<view class="items" @tap="goTo('../importWallet/importWallet')">
			<image src="../../../static/index/icon25.png" class="icon24"></image>
			<view class="setItemBox">
				<text>{{languageInfo.importWallet}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				languageData: ['中文', 'English'], //语言
				index:0,
				languageInfo:{}
			}
		},
		onLoad(){
			_this = this
		},
		onShow(){
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		methods: {
			// 跳转
			goTo(url){
				_this.linkTo.navTo(url)
			},
			checkLanguage(e) {
				_this.index = e.detail.value
				let index = e.detail.value
				if (index == 0) {
					uni.setStorageSync('lang', 'zh-cn')
				} else if (index == 1) {
					uni.setStorageSync('lang', 'en-us')
				}
				_this.languageInfo = _this.linkTo.showLanguage();
			},
		}
	}
</script>
<style>
	page {
		background-image: url(../../../static/index/guideBg.png);
		background-size: 100% 100%;
	}
</style>
<style lang="scss" scoped>
	.content{
		text-align: center;
		.checkLang{
			position: relative;
			top: 0;
			right: 50rpx;
			text-align: right;
		}
		.icon1{
			width: 57rpx;
			height: 40rpx;
		}
		.icon23{
			width: 512rpx;
			height: 468rpx;
			margin-bottom: 60rpx;
			margin-top: 138rpx;
		}
		.items{
			@include flexBet();
			position: relative;
			z-index: 1;
			margin-left: 30rpx;
			margin: 0 180rpx 92rpx 226rpx;
		}
		.setItemBox{
			// padding: 0 116rpx;
			width: 342rpx;
			height: 70rpx;
			line-height: 70rpx;
			@include borCol();
			@include mainCol();
			@include font24();
			background-color: #260300;
			box-sizing: border-box;
		}
		.icon24{
			width: 110rpx;
			height: 140rpx;
			position: absolute;
			z-index: 2;
			left: -46rpx;
			top: -60rpx;
		}
	}
</style>
