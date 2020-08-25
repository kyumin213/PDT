<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.Market"></tab-top>
		<view class="content">
			<view class="topBox">
				<view class="topTitle">POO/KL</view>
				<view class="topItem">
					<view class="boxLeft">
						<view>
							<text class="txt1">{{marketPrice}}</text>
							<!-- <text class="txt2">-1.97%</text> -->
							<!-- <image src="../../../static/transition/down.png" class="down"></image> -->
						</view>
						<view class="txt3 mt50">{{languageInfo.volumeHour}}：</view>
						<view class="txt4 pt10">{{market.total}} KL</view>
					</view>
					<view class="boxRight">
						<view>
							<text class="txt3">{{languageInfo.maxHour}}</text>
							<text class="txt6 pt10">{{market.max_price}}</text>
						</view>
						<view class="mt30">
							<text class="txt3">{{languageInfo.minHour}}</text>
							<text class="txt5 pt10">{{market.min_price}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 记录 -->
			<view class="conBox">
				<view class="tabList">
					<text class="tabItem" :class="{tabActive:active=='1'}" @tap="check(1)">{{languageInfo.depth}}</text>
					<text class="tabItem" :class="{tabActive:active=='2'}" @tap="check(2)">{{languageInfo.Deal}}</text>
				</view>
				<view class="listTit list1" v-show="active=='1'">
					<text>{{languageInfo.buyNum}}</text>
					<text>{{languageInfo.price}}</text>
					<text>{{languageInfo.sellNum}}</text>
					<text>{{languageInfo.price}}</text>
				</view>
				<view class="listTit" v-show="active=='2'">
					<text class="item1">{{languageInfo.times}}</text>
					<text class="item2">{{languageInfo.price}}</text>
					<text class="item2">{{languageInfo.nums}}</text>
				</view>
				<scroll-view scroll-y="true" class="scrollHeight">
					<view class="listTit lists list1" v-show="active=='1'">
						<!-- <view class="leftBox"> -->
						<view class="itemsLeft">
							<view class="list-ex" v-for="(item,index) in buyList" :key="index">
								<text>{{item.entrust_num}}</text>
								<text>{{item.entrust_price}}</text>
							</view>
						</view>
						<view class="itemsRight">
							<view class="list-ex" v-for="(item,index) in sellList" :key="index">
								<text>{{item.entrust_num}}</text>
								<text>{{item.entrust_price}}</text>
							</view>
						</view>
						<!-- </view> -->
					</view>
					<view class="listTit lists2" v-show="active=='2'" v-for="(item,index) in lists" :key="index">
						<text class="item1">{{item.create_time}}</text>
						<text class="item2">{{item.trade_price}}</text>
						<text class="item2">{{item.trade_num}}</text>
					</view>
				</scroll-view>
				<view class="btnBox">
					<button hover-class="none" class="btns buy" @tap="backBuy">{{languageInfo.buyIn}}</button>
					<button hover-class="none" class="btns sell ml10" @tap="backBuy">{{languageInfo.sell}}</button>
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
				active: 1,
				buyList: [],
				sellList: [],
				lists: [],
				market:[],
				marketPrice:'',
				type:1,
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad(option) {
			_this = this
			_this.marketPrice = option.price
		},
		onShow() {
			_this.getDepth()
			_this.getTransfer()
			_this.getMarket()
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// tab切换
			check(e) {
				_this.active = e
			},
			// 买入、卖出
			backBuy() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 市场行情
			getMarket(){
				_this.get('api/marketQuotation').then(res=>{
					_this.market = res.data.res[0]
				})
			},
			// 深度
			getDepth() {
				_this.get('api/depth').then(res => {
					if (res.data.code == 200) {
						_this.buyList = res.data.res.buy
						_this.sellList = res.data.res.sell
					}
				})
			},
			// 成交
			getTransfer(){
				let data = {
					type:_this.type
				}
				_this.get('api/newTransfer',data).then(res=>{
					_this.lists = res.data.res
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pt10 {
		padding-top: 10rpx;
	}

	.mt30 {
		margin-top: 30rpx;
	}

	.mt50 {
		margin-top: 50rpx;
	}

	.ml10 {
		margin-left: 10rpx;
	}

	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		padding: 20rpx;
		height: 100%;
		overflow-y: auto;
		box-sizing: border-box;

		.topBox {
			@include borCol();
			@include bgCol();
			border-radius: 10rpx;
			padding: 40rpx 48rpx;
			box-sizing: border-box;

			.topTitle {
				@include colF();
				@include font48();
				font-weight: bold;
				text-align: center;
				padding-bottom: 36rpx;
			}

			.down {
				width: 10rpx;
				height: 28rpx;
			}

			.topItem {
				@include flexBet();
			}

			.txt1 {
				@include font36();
				@include colF();
				font-weight: bold;
			}

			.txt2 {
				@include font24();
				color: #EA2D2D;
				padding: 0 6rpx 0 10rpx;
			}

			.txt3 {
				@include font24();
				@include colA();
			}

			.txt4 {
				@include font24();
				@include colF();
			}

			.boxRight text {
				display: block;
			}

			.txt5 {
				@include font24();
				color: #EA2D2D;
			}

			.txt6 {
				@include font24();
				color: #2DEAB7;
			}
		}

		// 深度列表
		.conBox {
			@include bgCol();
			padding: 40rpx 24rpx;
			margin-top: 20rpx;
			border-radius: 6rpx;
			box-sizing: border-box;
			height: calc(100vh - 480rpx);

			.scrollHeight {
				width: 100%;
				height: calc(100vh - 780rpx);
			}

			.tabList {
				@include cen();
				@include borCol();
				margin-bottom: 20rpx;
				border-radius: 4rpx;
			}

			.tabItem {
				display: inline-block;
				height: 60rpx;
				line-height: 60rpx;
				@include mainCol();
				@include font24();
				width: 50%;
				text-align: center;
			}

			.tabActive {
				background-color: #FFDA7D;
				color: #120407;
				font-weight: bold;
			}

			.listTit {
				@include mainCol();
				@include font24();
				width: 100%;
				text-align: center;
			}

			.listTit text {
				display: inline-block;
				width: 21%;
				height: 56rpx;
				line-height: 56rpx;

			}

			.list1 {
				@include flexBet();
				
			}

			.itemsLeft,
			.itemsRight {
				width: 100%;
				@include colF();
			}

			.list-ex {
				height: 56rpx;
				@include around();
				box-sizing: border-box;
				border-bottom: 1rpx #FFDA7D solid;
				text {
					width: 50%;
					@include cen();
				}
			}

			.list1 text {
				width: 25%;
			}

			.listTit .item1 {
				text-align: center;
				width: 40%;
			}

			.listTit .item2 {
				text-align: center;
				width: 30%;
			}

			.lists2 {
				@include colF();
				border-bottom: 1rpx #FFDA7D solid;
			}

			.btnBox {
				@include flexBet();

				.btns {
					@include font24();
					width: 50%;
					height: 66rpx;
					border-radius: 4rpx;
					font-weight: bold;
				}

				.buy {
					background-color: #FFDA7D;
					color: #120407;
				}

				.sell {
					@include colF();
					background-color: #8A1010;
				}
			}
		}
	}
</style>
