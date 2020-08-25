<template>
	<view class="contentBox">
		<tab-top left-icon="back" :title="languageInfo.backTip"></tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="../../../static/index/icon13.png" class="icon13"></image>
			</view>
			<view class="conBox">
				<view class="titBox">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="titTxt">{{languageInfo.backupMnemonic}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="tipTxts">{{languageInfo.tips}}</view>
				<view class="tips">
					{{languageInfo.backupValue}}
				</view>
				<view class="itemList" v-for="(item,index) in lists" :key='index'>
					<view>
						<image src="../../../static/index/icon14.png" class="icon14"></image>
					</view>
					<view>
						<text class="itemTxt">{{item.txt}}</text>
					</view>
				</view>
				<view>
					<text class="nextBtn" @tap="next">{{languageInfo.nextStep}}</text>
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
				languageInfo:{},
				lists:[],
			}
		},
		components:{
			tabTop
		},
		onLoad(){
			_this = this
		},
		onShow(){
			_this.languageInfo = _this.linkTo.showLanguage();
			_this.lists = _this.languageInfo.backupListVal;
		},
		methods: {
			next(){
				uni.navigateTo({
					url:'../backupKeyWords/backupKeyWords'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.contentBox{
	@include bg();
	height: 100%;
	.content{
		height: 100%;
		overflow-y: auto;
		box-sizing: border-box;
		.iconBox{
			@include cen();
			margin-top: 50rpx;
			.icon13{
				width: 188rpx;
				height: 240rpx;
			}
		}
		.conBox{
			margin: 50rpx 50rpx;
			@include bgCol();
			border-radius: 6rpx;
			text-align: center;
			padding: 56rpx  58rpx 56rpx 80rpx;
			box-sizing: border-box;
			.icon12{
				width: 28rpx;
				height: 48rpx;
			}
			.icon14{
				width: 20rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
			.titBox{
				@include cen();
			}
			.titTxt{
				@include mainCol();
				@include font30();
				margin: 0 10rpx;
			}
			.tipTxts{
				@include colF();
				@include font30();
				margin: 60rpx 0 40rpx 0;
			}
			.tips{
				@include font24();
				color: #FF4729;
				margin-bottom: 60rpx;
			}
			.itemList{
				display: flex;
				align-items: flex-start;
				text-align: left;
			}
			.itemTxt{
				line-height: 48rpx;
				@include colF();
				@include font20();
			}
			.nextBtn{
				@include font24();
				@include mainCol();
				@include borCol();
				background-color: #260300;
				width: 100%;
				display: inline-block;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 6rpx;
				margin-top: 200rpx;
			}
		}
	}
}
</style>
