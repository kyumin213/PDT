<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.rules"></tab-top>
		<view class="content">
			<view class="itemList">
				<view class="itemBox">
					<view class="titleTop">
						{{languageInfo.communityPromotionIncentive}}
					</view>
					<view class="labelValueBox">
						<text>1.{{languageInfo.test3}} <text class="redText">30%</text> {{languageInfo.test4}}。</text>
						<text>2.{{languageInfo.test5}} <text class="redText">30%</text> {{languageInfo.test6}}。</text>
						<text>3.{{languageInfo.test7}}。</text>
					</view>
				</view>
				<view class="itemBox">
					<view class="titleTop">
						{{languageInfo.personAward}}
					</view>
					<view class="labelValueBox">
						<text>1.{{languageInfo.test8}}。</text>
						<text>2.{{languageInfo.test9}}。</text>
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
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow(){
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
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
		@include flexC();
		padding: 20rpx;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		.itemList{
			.itemBox{
				margin-top: 20rpx;
				padding: 40rpx 30rpx;
				background-color: #120407;
				border: 1rpx solid #FFDA7D;
				border-radius: 10rpx;
				font-weight: 800;
				.titleTop{
					color: #FFFFFF;
					font-size: 34rpx;
					text-align: center;
					margin-bottom: 40rpx;
				}
				.labelValueBox{
					text{
						display: block;
						@include font22();
						text-align: left;
						color: #FFFFFF;
						font-weight: normal;
						line-height: 40rpx;
						.redText{
							@include font28();
							color: #EA2D2D;
							display: inline;
							margin: 0 10rpx;
							font-weight: 800;
						}
					}
				}
			}
		}
	}
</style>
