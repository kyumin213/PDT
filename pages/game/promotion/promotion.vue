<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageObj.PromotionReward"></tab-top>
		<view class="content">
			<view class="promotionBox">
				<view class="topTitleBox">
					<text class="title" style="padding-right: 100rpx;">{{languageObj.communityAward}}</text>
					<view class="rightBox"  @tap="goTo('rewardRules/rewardRules')">
						<image src="../../../static/game/promotion/bookIcon.png"></image>
						<text>{{languageObj.rules}}</text>
					</view>
				</view>
				<view class="itemBox">
					<view class="leftLabel">
						<text style="margin-right: 10rpx;">{{languageObj.communityLevel}}:</text>
						<text>{{lists.grade}}</text>
					</view>
<!-- 					<view class="rightValue">
						<text style="margin-right: 10rpx;">今日已完成局数:</text>
						<text class="redText">126</text>
					</view> -->
				</view>
				<view class="btnsBox">
					<view class="btnOut" @tap="goTo('./communityLog/communityLog')">
						<text>{{languageObj.communityRecord}}</text>
					</view>
					<view class="btnOut" @tap="goTo('./communityRank/communityRank')">
						<text>{{languageObj.communityRank}}</text>
					</view>
				</view>
			</view>
			<view class="promotionBox">
				<view class="topTitleBox">
					<text class="title" style="padding-right: 100rpx;">{{languageObj.personAward}}</text>
					<view class="rightBox"  @tap="goTo('myExtension/myExtension')">
						<image src="../../../static/game/promotion/bookIcon.png"></image>
						<text>{{languageObj.myDirect}}</text>
					</view>
				</view>
				<view class="itemBox">
					<view class="leftLabel">
						<text style="margin-right: 10rpx;">{{languageObj.allPersonAward}}:</text>
						<text></text>
					</view>
					<view class="rightValue">
						<text class="goldText">{{lists.person_dividend_total}} POO</text>
					</view>
				</view>
				<view class="btnsBox">
					<view class="btnOut"  @tap="goTo('./myLog/myLog')">
						<text>{{languageObj.personRecord}}</text>
					</view>
					<view class="btnOut"  @tap="goTo('./myRank/myRank')">
						<text>{{languageObj.personRank}}</text>
					</view>
				</view>
			</view>
			<view class="shareBox" @tap="goTo('share/share')">
				<view class="leftBox">
					<image src="../../../static/game/promotion/shareIcon.png"></image>
					<view class="labelBox">
						<text class="label1">{{languageObj.shareMyPromotion}}</text>
						<text class="label2">{{languageObj.inviteFriend}}</text>
					</view>
				</view>
				<image src="../../../static/game/promotion/rightIcon.png" class="rightImg"></image>
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
				orePoolBalance: '4675.8953',
				percentage: 5,
				releaseNum:'14753.697',
				lists:[],
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
			_this.getExpand()
		},
		methods: {
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 推广统计
			getExpand(){
				_this.get('api/expandStatistics').then(res=>{
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
		@include flexC();
		padding: 20rpx;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		.promotionBox{
			margin-top: 20rpx;
			background-color: #120407;
			border: 1rpx solid #FFDA7D;
			border-radius: 4rpx;
			padding: 47rpx 29rpx;
			.topTitleBox{
				margin-bottom: 59rpx;
				@include cen();
				justify-content: space-between;
				.title{
					font-size: 36rpx;
					font-weight: 800;
					color: #FFFFFF;
				}
				.rightBox{
					@include cen();
					width: 220rpx;
					height: 56rpx;
					background-color: #260300;
					border: 1rpx solid #FFDA7D;
					border-radius: 4rpx;
					position: relative;
					top: 10rpx;
					image{
						width: 86rpx;
						height: 110rpx;
						position: absolute;
						top: -43rpx;
						left: -55rpx;
					}
					text{
						padding-left: 40rpx;
						padding-right: 20rpx;
						@include font24();
						color: #FFFFFF;
					}
				}
			}
			.itemBox{
				@include cen();
				justify-content: space-between;
				margin-bottom: 59rpx;
				.leftLabel,.rightValue{
					@include font24();
					color: #FFFFFF;
					font-weight: 800;
				}
				.rightValue{
					.redText{
						color: #EA2D2D;
					}
					.goldText{
						@include font26();
						font-weight: normal;
						color: #FFDA7D;
					}
				}
			}
			.btnsBox{
				@include cen();
				justify-content: space-between;
				.btnOut{
					@include cen();
					width: 310rpx;
					height: 60rpx;
					background-color: #260300;
					border: 1rpx solid #FFDA7D;
					border-radius: 6rpx;
					text{
						@include font24();
						color: #FFDA7D;
					}
				}
			}
		}
		.shareBox{
			padding:20rpx 30rpx;
			@include cen();
			margin-top: 30rpx;
			justify-content: space-between;
			background-color: #260300;
			border: 1rpx solid #FFDA7D;
			border-radius: 6rpx;
			.leftBox{
				@include cen();
				image{
					position: relative;
					top: -4rpx;
					width: 77rpx;
					height: 99rpx;
					margin-right: 14rpx;
				}
				.labelBox{
					@include flexC();
					justify-content: center;
					.label1{
						@include font24();
						margin-bottom: 10rpx;
						color: #FFFFFF;
					}
					.label2{
						font-size: 32rpx;
						color: #FFFFFF;
						font-weight: 800;
					}
				}
			}
			.rightImg{
				width: 60rpx;
				height: 60rpx;
			}
			
		}
	}
</style>
