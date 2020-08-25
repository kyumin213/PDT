<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageObj.MiningPool"></tab-top>
		<view class="content">
			<!-- 矿池余额 -->
			<view class="topMain">
				<view class="mainBox">
					<text class="title">{{languageObj.poolBalance}}</text>
					<text class="balance">{{orePoolBalance}}</text>
				</view>
				<view class="rightTopBox">
					<view class="rightTopBg">
						<text class="rightText">{{percentage}}%</text>
					</view>
					<text class="rightTitle">{{languageObj.ReleaseFactor}}</text>
				</view>
				<view class="leftBmBox">
					<view class="leftBmBg">
						<text class="leftBmText">{{languageObj.GrandTotal}}</text>
					</view>
					<text class="leftBmNum">{{releaseNum}}</text>
				</view>
			</view>
			<!-- 释放记录 -->
			<view class="topTitle">
				<text>{{languageObj.ReleaseRecord}}</text>
			</view>
			<scroll-view class="scrollRecordView" scroll-y="true" @scrolltolower="getmore">
				<view class="srlRecordBox">
					<view class="itemList" v-for="(item,index) in lists" :key="index">
						<text>{{item.create_time}}</text>
						<view>
							<text class="price">{{item.prize_num}}</text>
							<text>PDT</text>
						</view>
					</view>
				</view>
				<view class="tipTxt" v-show="lists.length==0">
					{{languageObj.noData}}
				</view>
				<view class="loading-text" v-show="loadingType==1 && lists.length>0">{{languageObj.theEnd}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	var _this;
	export default {
		data() {
			return {
				orePoolBalance: '', //余额
				percentage: 0, //释放系数
				releaseNum:'',//已累计释放
				lists:[],
				loadingType:0,//到底啦
				page:1,
				rowNum:15,
				total:0,
				languageObj:{}
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
			_this.getReleaseInfo()
			_this.getReaseLog()
		},
		onPullDownRefresh() {
			_this.getReaseLog()
		},
		methods: {
			// 释放信息
			getReleaseInfo(){
				_this.get('api/releaseInfo').then(res=>{
					_this.orePoolBalance = this.parsNum(res.data.res.kl)
					_this.percentage = parseFloat(res.data.res.release_sale * 100)
					_this.releaseNum = this.parsNum(res.data.res.release_kl) 
				})
			},
			// 释放记录
			getReaseLog(){
				let data = {
					page:1,
					rowNum:_this.rowNum
				}
				_this.get('api/releaseLog',data).then(res=>{
					if(res.data.res.data.length>0){
						_this.lists = res.data.res.data
						_this.total = res.data.res.total
					}
				})
			},
			//上拉加载
			getmore() {
				let page = _this.page
				page++
				uni.showNavigationBarLoading(); //显示加载动画
				let data = {
					page: page,
					rowNum: _this.rowNum
				}
				_this.get('api/releaseLog', data).then(res => {
					if (res.data.res.data.length==0) {
						uni.hideNavigationBarLoading(); //关闭加载动画
						_this.loadingType = 1
						return false;
					} else {
						_this.lists = _this.lists.concat(res.data.res.data); //将数据拼接在一起
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
			
					_this.loadingType = 0; //将loadingType归0重置
			
				})
			},
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
		padding-bottom: 0;
		height: 100%;
		box-sizing: border-box;

		.topMain {
			@include cen();
			position: relative;
			width: 100%;
			height: 560rpx;

			.mainBox {
				@include flexC();
				width: 493rpx;
				height: 454rpx;
				background: url(../../../static/game/orePool/oreMain.png);
				background-repeat: no-repeat;
				background-size: cover;
				justify-content: center;
				align-items: center;

				.title {
					color: #FFDA7D;
					@include font22();
					padding-top: 30rpx;
					margin-bottom: 11rpx;
				}

				.balance {
					@include font40();
					font-weight: 800;
					background: linear-gradient(to bottom, #FFDD65, #FF550A);
					-webkit-background-clip: text;
					color: transparent;
				}
			}

			.rightTopBox {
				position: absolute;
				right: 10rpx;
				top: 0rpx;

				.rightTopBg {
					width: 143rpx;
					height: 180rpx;
					background: url(../../../static/game/orePool/oreItem.png);
					background-repeat: no-repeat;
					background-size: cover;
					position: relative;

					.rightText {
						position: absolute;
						width: 100%;
						font-weight: 800;
						@include font40();
						background: linear-gradient(to bottom, #FFDD65, #FF550A);
						-webkit-background-clip: text;
						color: transparent;
						bottom: 40rpx;
						text-align: center;
					}
				}

				.rightTitle {
					display: block;
					color: #FFDA7D;
					@include font20();
					text-align: center;
					margin-top: 10rpx;
				}
			}

			.leftBmBox {
				position: absolute;
				left: 10rpx;
				bottom: 20rpx;

				.leftBmBg {
					width: 143rpx;
					height: 180rpx;
					background: url(../../../static/game/orePool/oreItem.png);
					background-repeat: no-repeat;
					background-size: cover;
					position: relative;
					z-index: 9;

					.leftBmText {
						position: absolute;
						width: 72rpx;
						font-weight: 800;
						@include font22();
						background: linear-gradient(to bottom, #FFDD65, #FF550A);
						-webkit-background-clip: text;
						color: transparent;
						left: 50%;
						transform: translateX(-50%);
						bottom: 35rpx;
						text-align: center;
					}
				}

				.leftBmNum {
					position: absolute;
					white-space: nowrap;
					display: block;
					height: 56rpx;
					border: 1px solid #FFDA7D;
					background: #260300;
					color: #FFDA7D;
					@include font20();
					text-align: right;
					margin-top: 10rpx;
					bottom: 35rpx;
					left: 100rpx;
					z-index: 2;
					border-radius: 6rpx;
					line-height: 54rpx;
					padding-right: 20rpx;
					padding-left: 40rpx;
					box-sizing: border-box;
				}
			}
		}

		.topTitle {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx 18rpx;
			text-align: center;
			border-top-right-radius: 10rpx;
			border-top-left-radius: 10rpx;
			border: 1rpx solid #947d48;
			background-color: #120407;

			text {
				@include font28();
				color: rgba(255, 218, 125, 1);
				text-align: center;
			}
		}

		.scrollRecordView {
			min-height: 300rpx;
			flex: 1;
			background-color: #120407;
			border: 1rpx solid #947d48;
			border-top: none;
			box-sizing: border-box;

			.srlRecordBox {
				.itemList {
					padding: 28rpx 22rpx;
					@include cen();
					justify-content: space-between;
					border-bottom: 1rpx solid #947d48;

					view {
						@include cen();

						.price {
							color: #FFDA7D;
							margin-right: 10rpx;
						}
					}

					text {
						@include font22();
						color: #FFFFFF;
						display: block;
					}
				}
			}
		}
	}
</style>
