<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageObj.accountAssets"></tab-top>
		<view class="content">
			<view class="tabList">
				<text class="tabItem" :class="{tabActive:active=='1'}" @tap="check(1)">{{languageObj.accountAssets}}</text>
				<text class="tabItem" :class="{tabActive:active=='2'}" @tap="check(2)">{{languageObj.AssetRecord}}</text>
			</view>
			<!-- 账户资产 -->
			<scroll-view v-show="active == 1" class="scrollView" scroll-y="true">
				<view class="srlBox">
					<view class="itemList">
						<view class="leftTitle">
							<image src="../../../static/game/accountBalance/PDT.png"></image>
							<text>PDT</text>
						</view>
						<view class="rightDetail">
							<text style="margin-bottom: 9rpx;">{{languageObj.totalBalance}}</text>
							<text>{{accountPDT}}</text>
						</view>
					</view>
					<view class="itemList">
						<view class="leftTitle">
							<image src="../../../static/game/accountBalance/POO.png"></image>
							<text>POO</text>
						</view>
						<view class="rightDetail">
							<text style="margin-bottom: 9rpx;">{{languageObj.totalBalance}}</text>
							<text>{{accountPOO}}</text>
						</view>
					</view>
					<view class="itemList">
						<view class="leftTitle">
							<image src="../../../static/game/accountBalance/KL.png"></image>
							<text>KL</text>
						</view>
						<view class="rightDetail">
							<text style="margin-bottom: 9rpx;">{{languageObj.totalBalance}}</text>
							<text>{{accountKL}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 资产记录 -->
			<view v-show="active == 2" class="topTitle">
				<view class="longWidth">{{languageObj.times}}</view>
				<text>{{languageObj.types}}</text>
				<text>{{languageObj.amount}}</text>
			</view>
			<scroll-view v-show="active == 2" class="scrollRecordView" scroll-y="true" @scrolltolower="getmore">
				<view class="srlRecordBox">
					<view class="itemList" v-for="(item,index) in lists" :key="index">
						<view>{{item.create_time}}</view>
						<text>{{item.content}}</text>
						<text v-if="item.type=='1'">+{{item.money}} {{item.currency_name}}</text>
						<text v-if="item.type=='2'">-{{item.money}} {{item.currency_name}}</text>
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
				page: 1,
				rowNum: 20,
				total: 0,
				loadingType:0,
				lists: [], //资产记录
				active: 1,
				accountPDT: '',
				accountPOO: '',
				accountKL: '',
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
		onShow() {
			_this.myAccount()
		},
		onPullDownRefresh() {
			_this.page = 1;
			_this.loadingType = 0
			// _this.lists = [];
			// _this.total = [];
			_this.getFinanLog()
		},
		onReachBottom() {
			let arr = _this.lists.length
			let total = _this.total
			if (arr < total) {
				_this.getmore()
			}
		},
		methods: {
			check(e) {
				_this.active = e
				console.log(e)
				if (e == '2') {
					_this.getFinanLog()
				}
			},
			// 资产记录
			getFinanLog() {
				let data = {
					page: 1,
					rowNum: _this.rowNum
				}
				_this.get('api/financeLog', data).then(res => {
					if (res.data.res.data.length > 0) {
						_this.lists = res.data.res.data
						console.log(res.data.res.total)
						_this.total = res.data.res.total
					}
				})
			},
			//上拉加载
			getmore() {
				let total = _this.total
				
				if(parseFloat(total)>parseFloat(_this.rowNum)){
					let page = _this.page
					page++
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: _this.page,
						rowNum: _this.rowNum
					}
					_this.get('api/financeLog', data).then(res => {
						if (res.data.res.data.length==0) {
							uni.hideNavigationBarLoading(); //关闭加载动画
							_this.loadingType = 1
							return false;
						} else {
							_this.page++
							_this.lists = _this.lists.concat(res.data.res.data); //将数据拼接在一起
							uni.hideNavigationBarLoading(); //关闭加载动画
						}
								
						_this.loadingType = 0; //将loadingType归0重置
								
					})
				}else{
					_this.loadingType = 1
					return;
				}
			
			},
			// 账户资产
			myAccount() {
				_this.get('api/myProperty').then(res => {
					let datas = res.data.res
					for (let i in datas) {
						if (datas[i].currency_id == '1') {
							_this.accountKL = datas[i].num
						}
						if (datas[i].currency_id == '2') {
							_this.accountPOO = datas[i].num
						}
						if (datas[i].currency_id == '3') {
							_this.accountPDT = datas[i].num
						}
					}
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
		padding-bottom: 0;
		height: 100%;
		box-sizing: border-box;

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

		.scrollView {
			min-height: 300rpx;
			flex: 1;
			background-color: rgba(18, 4, 7, .8);

			.srlBox {
				padding: 0 40rpx;
				box-sizing: border-box;

				.itemList {
					@include cen();
					padding: 30rpx 0;
					border-bottom: 1px solid #FFDA7D;
					justify-content: space-between;
					height: 70rpx;

					.leftTitle {
						@include cen();
						width: 150rpx;

						image {
							width: 70rpx;
							height: 70rpx;
						}

						text {
							@include font26();
							color: #FFFFFF;
							margin-left: 20rpx;
						}
					}

					.rightDetail {
						@include flexC();
						@include font22();
						color: #FFFFFF;
						text-align: right;
					}
				}

				.itemList:last-child {
					border-bottom: none;
				}
			}
		}

		.topTitle {
			padding: 20rpx 18rpx;
			@include cen();
			justify-content: space-between;
			border-bottom: 1px solid rgba(255, 218, 125, 1);
			background-color: rgba(18, 4, 7, .8);

			view,
			text {
				@include font24();
				color: rgba(255, 218, 125, 1);
				text-align: center;
			}

			view {
				flex: 1;
			}

			text {
				display: block;
				width: 32%;
			}
		}

		.scrollRecordView {
			min-height: 300rpx;
			flex: 1;
			background-color: rgba(18, 4, 7, .8);

			.srlRecordBox {
				.itemList {
					@include cen();
					justify-content: space-between;
					padding: 0 18rpx;
					border-bottom: 1rpx solid #947d48;

					view,
					text {
						@include font20();
						color: #FFFFFF;
						text-align: center;
						padding: 27rpx 0;
					}

					view {
						flex: 1;
						flex-shrink: 0;
					}


					text {
						display: block;
						width: 32%;
					}
				}
			}
		}

		.longWidth {
			width: 40% !important;
		}
	}
</style>
