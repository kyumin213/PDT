<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.more"></tab-top>
		<view class="content">
			<view class="listItem" @tap="stayTuned">
				<view class="items">
					<image src="../../../static/index/icon16.png" class="icon16"></image>
					<text class="itemTxt">{{languageInfo.whitePaper}}</text>
				</view>
				<view>
					<image src="../../../static/index/icon32.png" class="icon32"></image>
				</view>
			</view>
			<view class="listItem mt96" @tap="stayTuned">
				<view class="items">
					<image src="../../../static/index/icon17.png" class="icon16"></image>
					<text class="itemTxt">{{languageInfo.projectIntroduction}}</text>
				</view>
				<view>
					<image src="../../../static/index/icon32.png" class="icon32"></image>
				</view>
			</view>
			<view class="listItem mt96" @tap="stayTuned">
				<view class="items">
					<image src="../../../static/index/icon18.png" class="icon16"></image>
					<text class="itemTxt">{{languageInfo.videoAddress}}</text>
				</view>
				<view>
					<image src="../../../static/index/icon32.png" class="icon32"></image>
				</view>
			</view>
			<view class="listItem mt96" @tap="stayTuned">
				<view class="items">
					<image src="../../../static/index/icon19.png" class="icon16"></image>
					<text class="itemTxt">{{languageInfo.Exchange}}</text>
				</view>
				<view>
					<image src="../../../static/index/icon32.png" class="icon32"></image>
				</view>
			</view>
			<view class="listItem mt96" @tap="stayTuned">
				<view class="items">
					<image src="../../../static/index/icon20.png" class="icon16"></image>
					<text class="itemTxt">{{languageInfo.EcologicalConstruction}}</text>
				</view>
				<view>
					<image src="../../../static/index/icon32.png" class="icon32"></image>
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
		components: {
			tabTop
		},
		onLoad(){
			_this = this
		},
		onShow(){
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		methods: {
			// 敬请期待
			stayTuned(){
				_this.linkTo.$noToast(_this.languageInfo.StayTuned)
			}
		}
	}
</script>

<style scoped lang="scss">
	.mt96{
		margin-top: 96rpx;
	}
	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;

		.content {
			padding: 96rpx 50rpx;
			.listItem {
				@include borCol();
				@include flexBet();
				height: 76rpx;
				border-radius: 6rpx;
				position: relative;
				margin-left: 30rpx;
				padding: 0 20rpx 0 74rpx;
				.items {
					@include flexDe();
				}

				.icon16 {
					width: 110rpx;
					height: 140rpx;
					position: absolute;
					top: -60rpx;
					left: -50rpx;
				}

				.itemTxt {
					@include font24();
					@include mainCol();
				}
				.icon32{
					width: 52rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>
