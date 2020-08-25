<template>
	<view class="containerBox">
		<tab-top left-icon="back" title="选择收款钱包地址"></tab-top>
		<view class="content">
			<view>
				<scroll-view scroll-y="true" class="scrollHeight">
					<view class="itemList" v-for="(item,index) in lists" :key="index">
						<view>
							<view><text class="addressName">{{item.nickname}}</text></view>
							<view><text class="addressTxt">{{item.token}}</text></view>
						</view>
						<view v-show="active==index">
							<image src="../../../static/index/icon26.png" class="icon26"></image>
						</view>
					</view>
					<view v-if="lists.length==0" class="tipTxt">暂无数据</view>
				</scroll-view>
				<view class="btnBox">
					<button class="btns" hover-class="none" @tap="goTo('../addWalletAddress/addWalletAddress')">新建钱包地址</button>
					<button class="btns" hover-class="none">确定</button>
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
				lists:[],
				active:0
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow(){
			_this.getAddress()
		},
		methods: {
			goTo(url){
				_this.linkTo.navTo(url)
			},
			// 地址列表
			getAddress(){
				_this.get('api/addressList').then(res=>{
					_this.lists = res.data.res
				})
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
		padding: 20rpx 30rpx;
		.scrollHeight{
			width: 100%;
			height: calc(100vh - 376rpx);
		}
		.itemList {
			@include flexBet();
			@include borCol();
			@include bgCol();
			border-radius: 6rpx;
			padding: 30rpx 28rpx;
			margin-bottom: 10rpx;

			.icon26 {
				width: 76rpx;
				height: 96rpx;
			}
			.addressName{
				@include font30();
				@include mainCol();
			}
			.addressTxt{
				@include font24();
				color: #aaa;
			}
		}
		.btnBox{
			position: fixed;
			left: 30rpx;
			right: 30rpx;
			bottom: 98rpx;
			.btns{
				height: 70rpx;
				@include bgCol();
				@include borCol();
				@include mainCol();
				@include font24();
				border-radius: 6rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
