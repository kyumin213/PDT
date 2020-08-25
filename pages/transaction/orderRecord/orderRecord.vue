<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.orderRecord"></tab-top>
		<view class="content">
			<view class="tabList">
				<text class="tabItem" :class="{tabActive:active=='1'}" @tap="check(1)">{{languageInfo.commissionRecord}}</text>
				<text class="tabItem" :class="{tabActive:active=='2'}" @tap="check(2)">{{languageInfo.TransactionRecord}}</text>
			</view>
			<scroll-view scroll-y="true" class="scrollHeight" @scrolltolower="onScrollTop">
				<view v-show="active=='1'">
					<view class="lists" v-for="(item,index) in lists" :key='index'>
						<view class="listTop">
							<view class="topItem topItem1">
								<view class="topTimes">{{item.create_time}}</view>
								<view class="topTxt">
									<view class="pt32" v-if="item.entrust_price!=''">{{item.entrust_price}}</view>
									<view class="pt32" v-else>---</view>
									<text class="pt20">{{languageInfo.price}}(POO)</text>
								</view>
							</view>
							<view class="topItem">
								<view class="sellTxt" :class="{buyTxt:item.sell_id ==0,sellTxt:item.sell_id >0}">
									<text v-if="item.sell_id>0">{{languageInfo.sell}}</text>
									<text v-if="item.sell_id==0">{{languageInfo.buyIn}}</text>
									<text class="ml10">POO/KL</text>
								</view>
								<view class="topTxt">
									<text class="pt32">{{item.entrust_num}}</text>
									<text class="pt20">{{languageInfo.nums}}(KL)</text>
								</view>
							</view>
							<view class="topItem rightItem">
								<view class="topTxt titRight">{{languageInfo.MarketOrder}}</view>
								<view class="btnBox">
									<text class="confirBtn" :class="{revoke:item.status=='4'}">{{getOrderStatus(item.status)}}</text>
									<!-- <view class="mt10"> -->
										<text class="confirBtn revo mt10" v-if="item.status==1 || item.status==2" @tap="deleteOrder(index)">{{languageInfo.revoke}}</text>
									<!-- </view> -->
								</view>
							</view>
						</view>
						<view class="br"></view>
						<view class="listBom">
							<view class="topItem topItem1">
								<view class="topTimes" v-if="item.avg_price">{{item.avg_price}}</view>
								<view class="topTimes" v-else>--</view>
								<view class="topTxt pt18">
									<text>{{languageInfo.AveragePrice}}(POO)</text>
								</view>
							</view>
							<view class="topItem">
								<view class="topTxt">
									<text v-if="item.total_num">{{item.total_num}}</text>
									<text v-else>--</text>
								</view>
								<view class="topTxt pt18">
									<text>{{languageInfo.DealDone}}(KL)</text>
								</view>
							</view>
							<view class="topItem">
								<view class="topTxt" v-if="item.total_money">{{item.total_money}}</view>
								<view class="topTxt" v-else>--</view>
								<view class="topTxt pt18">
									<text class="allPriceTxt">{{languageInfo.TotalTurnover}}(POO)</text>
								</view>
							</view>
						</view>
					</view>
					<view class="tipTxt" v-show="lists.length==0">
						{{languageInfo.noData}}
					</view>
					<view class="loading-text" v-if="loadingText==1&&lists.length>0">{{languageInfo.theEnd}}</view>
				</view>
				<view v-show="active=='2'">
					<view class="lists" v-for="(item,index) in transList" :key="index">
						<view class="listTop">
							<view class="topItem topItem1">
								<view class="topTimes">{{item.create_time}}</view>
								<view class="topTxt">
									<view class="pt32" v-if="item.trade_price">{{item.trade_price}}</view>
									<view class="pt32" v-else>---</view>
									<text class="pt20">{{languageInfo.price}}(POO)</text>
								</view>
							</view>
							<view class="topItem">
								<view class="sellTxt" :class="{buyTxt:item.sell_id ==0,sellTxt:item.sell_id >0}">
									<text v-if="item.sell_id>0">{{languageInfo.sell}}</text>
									<text v-if="item.sell_id==0">{{languageInfo.buyIn}}</text>
									<text class="ml10">POO/KL</text>
								</view>
								<view class="topTxt">
									<text class="pt32">{{item.trade_num}}</text>
									<text class="pt20">{{languageInfo.nums}}(KL)</text>
								</view>
							</view>
							<view class="topItem">
								<view class="topTxt">{{languageInfo.handFee}}<text class="disBlock" v-if="item.sell_id>0">{{item.sell_fee}}</text><text v-if="item.sell_id==0">{{item.buy_fee}}</text>
									POO</view>
								<view class="topTxt">
									<text class="pt32">{{item.trade_money}}</text>
									<text class="pt20">{{languageInfo.Turnover}}(POO)</text>
								</view>
							</view>
						</view>
					</view>
					<view class="tipTxt" v-show="transList.length==0">
						{{languageInfo.noData}}
					</view>
				</view>
				<view class="loading-text" v-if="loadingText==1&&transList.length>0">{{languageInfo.theEnd}}</view>
			</scroll-view>
		</view>
		<!-- 撤销弹窗 -->
		<uni-popup ref="popup" type="center">
			<view class="box">
				<view class="close" @tap="closeModal"></view>
				<view class="title">{{languageInfo.toCancel}}</view>
				<!-- <view class="input"><input type="password" value="" v-model="password" /></view> -->
				<view class="btns">
					<view class="cancel" @tap="closeModal">{{languageInfo.cancel}}</view>
					<view class="yes" @tap="veriPassword">{{languageInfo.determine}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	var _this;
	export default {
		data() {
			return {
				lists: [], //委托记录
				transList: [], //成交记录
				active: 1,
				status: 1,
				buyStatus: 1,
				orderId: '',
				historyEntrustPage: 1,
				historyEntrustRowNum: 15,
				historyEntrustTotal: 0,
				transferLogPage: 1,
				transferLogRowNum: 15,
				transferLogTotal: 0,
				loadingText: 0,
				languageInfo: {}
			}
		},
		components: {
			tabTop,
			uniPopup
		},
		onLoad() {
			_this = this
		},
		onShow() {
			_this.getHistory()
			_this.transfLog()
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		computed: {
			getOrderStatus(status) {
				return status => {
					const i = status * 1;
					let title = '';
					switch (i) {
						case 1:
							title = _this.languageInfo.processing;
							break;
						case 2:
							title = _this.languageInfo.processing;
							break;
						case 3:
							title = _this.languageInfo.completed;
							break;
						default:
							title = _this.languageInfo.revoked;
					};
					return title
				}
			}
		},
		onPullDownRefresh() {
			_this.loadingText = 0
			//监听用户下拉刷新
			if (_this.active == 1) {
				//委托记录
				_this.historyEntrustPage = 1;
				// _this.lists = [];
				_this.getHistory()
			} else {
				_this.transList = [];
				_this.transferLogPage = 1;
				_this.transfLog();
			}
		},
		methods: {
			onScrollTop() {
				console.log(_this.active)
				//监听上拉
				if (_this.active == 1) {
					//委托记录
					_this.getmoreHistore();
				} else {
					_this.getMoreTrans();
				}
			},
			// tab切换
			check(e) {
				_this.active = e
				_this.loadingText = 0
			},
			// 委托记录
			getHistory() {
				let data = {
					page: 1,
					rowNum: _this.historyEntrustRowNum
				}
				uni.showNavigationBarLoading()
				_this.get('api/historyEntrust', data).then(res => {
					if (res.data.res.data.length>0) {
						_this.lists = res.data.res.data
						_this.historyEntrustTotal = res.data.res.total
					}else{
						_this.lists=[]
					}
					uni.hideNavigationBarLoading(); //关闭加载动画
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				})
			},
			// 成交记录
			transfLog() {
				uni.showNavigationBarLoading()
				let data = {
					page:1,
					rowNum:_this.transferLogRowNum
				}
				_this.get('api/transferLog',data).then(res => {
					let datas = res.data.res.data
					if (datas.length>0) {
						_this.transList = res.data.res.data
						_this.transferLogTotal = res.data.res.total
					}else{
						_this.transList=[]
					}
					uni.hideNavigationBarLoading(); //关闭加载动画
					uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
				})
			},
			// 成交记录上拉
			getMoreTrans() {
				let trTotal = _this.transferLogTotal
				let curPage = _this.transferLogRowNum
				if(parseInt(trTotal)>parseInt(curPage)){
					let page = _this.transferLogPage
					page++
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: page,
						rowNum: _this.transferLogRowNum
					}
					_this.get('api/transferLog', data).then(res => {
						if (res.data.res.data.length == 0) {
							uni.hideNavigationBarLoading(); //关闭加载动画
							_this.loadingText = 1
							return;
						} else {
							_this.transferLogPage++;
							_this.transList = _this.transList.concat(res.data.res.data); //将数据拼接在一起
							uni.hideNavigationBarLoading(); //关闭加载动画
						}
					})
				}else{
					_this.loadingText = 1
					return
				}
		
			},
			// 委托记录上拉加载// 上拉加载
			getmoreHistore() {
				let page = _this.historyEntrustPage
				let total = _this.historyEntrustTotal
				let currPage = _this.historyEntrustRowNum
				if(parseInt(total)>parseInt(currPage)){
					page++
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: page,
						rowNum: _this.historyEntrustRowNum
					}
					
					_this.get('api/historyEntrust', data).then(res => {
						if (res.data.res.data.length == 0) {
							_this.loadingText = 1
							uni.hideNavigationBarLoading(); //关闭加载动画
							return;
						} else {
							_this.historyEntrustPage++;
							_this.lists = _this.lists.concat(res.data.res.data); //将数据拼接在一起
							uni.hideNavigationBarLoading(); //关闭加载动画
						}
					})
				}else{
					_this.loadingText = 1
					return
				}
				
			},
			// 撤销
			deleteOrder(index) {
				_this.orderId = _this.lists[index].id
				_this.$refs.popup.open()
			},
			// 关闭弹窗
			closeModal() {
				_this.$refs.popup.close();
			},
			// 确定撤销
			veriPassword() {
				let orderNum = _this.orderId
				let data = {
					id: orderNum
				}
				_this.post('api/cancelOrder', data).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'success'
						})
						this.$refs.popup.close();
						_this.getHistory()
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pt20 {
		padding-top: 20rpx;
	}

	.pt32 {
		padding-top: 32rpx;
	}

	.pt42 {
		padding-top: 52rpx;
	}

	.pt18 {
		padding-top: 18rpx;
	}

	.ml10 {
		margin-left: 10rpx;
		}
	
	.mt10{
		margin-top: 10rpx;
	}

	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}

	.content {
		padding:20rpx 20rpx 0 20rpx;
		height: 100%;
		overflow-y: auto;
		box-sizing: border-box;

		.scrollHeight {
			width: 100%;
			height: calc(100vh - 200rpx);
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
			@include bgCol();
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

		.lists {
			@include borCol();
			@include bgCol();
			border-radius: 10rpx;
			margin-bottom: 10rpx;

			.listTop {
				display: flex;
				justify-content: space-between;
				align-items: space-between;
				padding: 32rpx 20rpx;
				box-sizing: border-box;
				.sellTxt {
					color: #EA2D2D;
				}

				.buyTxt {
					color: #2DEAB7;
				}

				.confirBtn {
					height: 40rpx;
					line-height: 40rpx;
					padding: 4rpx 16rpx;
					text-align: center;
					@include colF();
					background-color: #EA2D2D;
					border-radius: 4rpx;
					margin-left: 8rpx;
				}

				.revoke {
					background-color: #666666;
				}

				.revo {
					background-color: #D26A12;
				}

				.pending {
					background-color: #06945A;
				}
			}

			.topTxt {
				@include colF();
			}

			.topTxt text {
				display: block;
			}
			.topTxt .disBlock{
				display: inline-block;
			}
			.titRight{
				text-align: center;
			}
			.btnBox{
				height: 100rpx;
				display: flex;
				align-items: flex-end;
				justify-content: center;
				// flex: 1;
				// flex-wrap: wrap;
				box-sizing: border-box;
			}

			.topItem {
				@include font20();
				width: 29%;
				text-align: center;

			}

			.topItem1 {
				width: 33%;
				text-align: center;
			}
			.rightItem{
				width: 38%;
			}

			.topTimes {
				color: #aaa;
			}

			.br {
				width: 100%;
				height: 1rpx;
				background-color: #999;
			}

			.listBom {
				@include flexBet();
				padding: 32rpx 20rpx;
				box-sizing: border-box;
			}
		}

	}

	// 撤销弹窗
	.box {
		background-color: #260300;
		width: 650rpx;
		border-radius: 15rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;

		.close {
			display: inline-block;
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(45deg);
			position: absolute;
			top: 30rpx;
			right: 20rpx;
		}

		.close::after {
			content: '';
			width: 30rpx;
			height: 2rpx;
			background: #fff;
			transform: rotate(90deg);
			position: absolute;
		}

		.title {
			text-align: center;
			color: white;
			font-size: 32rpx;
			margin-bottom: 60rpx;
		}

		.input {
			width: 90%;
			margin: 30rpx auto;
			background: rgba(18, 25, 42, 0.5);
			border: 1px solid rgba(45, 234, 183, 1);
			border-radius: 8rpx;
			text-indent: 10rpx;
			box-sizing: border-box;
			padding: 8rpx 0;
			text-align: center;
			color: #fff;
		}

		.btns {
			width: 80%;
			margin: 0 auto;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				@include borCol();
				border-radius: 4px;
				box-sizing: border-box;
				color: white;
				font-size: 27rpx;
				padding: 15rpx 70rpx;
			}
		}
	}
</style>
