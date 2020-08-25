<template>
	<view class="contentBox">
		<tab-top left-icon="back" title="新建钱包地址"></tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="../../../static/index/icon31.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">地址名称</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="text" placeholder="请输入地址名称" class="inp" v-model="addressName">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">有效地址</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="typeBox">
					<input type="text" placeholder="请输入有效地址" class="inp addInp" v-model="address">
					<image src="../../../static/index/icon30.png" class="icon28" @tap="getCode"></image>
				</view>
				<view>
					<text class="tips">{{tips}}</text>
				</view>
				<view>
					<text class="nextBtn" @tap="nextSubmit">保存</text>
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
				addressName: '', //地址名称
				address: '', //有效地址
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		methods: {
			nextSubmit() {
				let address = _this.address
				let names = _this.addressName
				let data={
					nickname:names,
					address:address
				}
				if(names=='' || address==''){
					_this.linkTo.$noToast('信息不能为空')
				}else{
					_this.post('api/addAddress',data).then(res=>{
						uni.showToast({
							icon:'success'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'../addWallet/addWallet'
							})
						},500)
					})
				}
			},
			// 扫码
			getCode() {
				uni.scanCode({
					success: function(res) {
						_this.address = res.result
					}
				});
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
					height: 60rpx;
					border-radius: 4rpx;
					margin: 30rpx 0 40rpx 0;
					padding: 0 20rpx;
				}
				// .addInp{
				// 	padding: 0 60rpx 0 10rpx;
				// 	box-sizing: border-box;
				// }

				.icon12 {
					width: 28rpx;
					height: 48rpx;
				}

				.tips {
					display: inline-block;
					@include tipTxt();
					height: 80rpx;
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
					top: 6rpx;
					right: 20rpx;
					width: 48rpx;
					height: 48rpx;
				}
				.icon29{
					right: 60rpx;
				}
			}
		}
	}
</style>
