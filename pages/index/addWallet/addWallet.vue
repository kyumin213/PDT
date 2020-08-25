<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.addWallet"></tab-top>
		<view class="content">
			<view class="itemBox" @tap="goTo('../creatWallet/creatWallet')">
				<image src="../../../static/index/icon21.png" class="icon21"></image>
				<view class="createWallet">
					<text>{{languageInfo.createWallet}}</text>
				</view>
			</view>
			<view class="itemBox" @tap="goTo('../importWallet/importWallet')">
				<image src="../../../static/index/icon22.png" class="icon21"></image>
				<view class="createWallet">
					<text>{{languageInfo.importWallet}}</text>
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
				languageInfo: {}
			}
		},
		components:{
			tabTop
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.containerBox{
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}
	.content{
		padding: 98rpx 54rpx;
		.itemBox{
			@include bgCol();
			@include borCol();
			text-align: center;
			border-radius: 6rpx;
			padding: 20rpx 0 48rpx 0;
			margin-bottom: 30rpx;
			.icon21{
				width: 304rpx;
				height: 278rpx;
			}
			.createWallet{
				@include mainCol();
				@include font30();
			}
		}
	}

</style>
