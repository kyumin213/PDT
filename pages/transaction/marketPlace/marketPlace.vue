<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.tradingMarket"></tab-top>
		<view class="content">
			<view class="conTop">
				<view>
					<view class="topTxt1">POO/KL</view>
					<view>
						<text class="txt2">{{marketPrice}}</text>
						<!-- <text class="txt3">-1.97%</text> -->
						<!-- <image src="../../../static/transition/up.png" class="down"></image> -->
						<!-- <image src="../../../static/transition/down.png" class="down"></image> -->
					</view>
				</view>
				<view class="topRight">
					<image src="../../../static/transition/icon7.png" class="icon7"></image>
					<view class="rightTxt" @tap="viewMarket">
						<text>{{languageInfo.viewMarket}}</text>
					</view>
				</view>
			</view>
			<!-- 买入、卖出 -->
			<view class="marketBox">
				<view class="tabList">
					<text class="tabItem" :class="{tabActive:active=='1'}" @tap="check(1)">{{languageInfo.buyIn}}</text>
					<text class="tabItem" :class="{tabSell:active=='2'}" @tap="check(2)">{{languageInfo.sell}}</text>
				</view>
				<view class="placeBox">
					<view class="listLeft">
						<!-- 五档 -->
						<view v-show="types==1">
							<view class="listTitle borBom">
								<text>{{languageInfo.Handicap}}</text>
								<text>{{languageInfo.price}}</text>
								<text>{{languageInfo.nums}}</text>
							</view>
							<view class="items borBom" v-for="(item,index) in lists.buyLists">
								<text>{{item.id}}</text>
								<text>{{item.trade_num}}</text>
								<text>{{item.trade_price}}</text>
							</view>
							<view class="tipTxt" v-show="lists.buyLists.length==0">
								{{languageInfo.noData}}
							</view>
							<view class="newPrice">
								<text class="newTxt" v-if="transPrice!=''">{{languageInfo.LatestTransaction}}</text>
								<text class="newNum">{{transPrice}}</text>
							</view>
							<view class="items borBom" v-for="(item,index) in lists.sellLists" :key='index'>
								<text>{{item.id}}</text>
								<text>{{item.trade_num}}</text>
								<text>{{item.trade_price}}</text>
							</view>

							<view class="bomBtn">
								<text class="btn1" :class="{btn2:types=='1'}" @tap="tabType(1)">{{languageInfo.FifthGear}}</text>
								<text class="btn1" :class="{btn2:types=='2'}" @tap="tabType(2)">{{languageInfo.Detail}}</text>
							</view>
						</view>
						<!-- 明细 -->
						<view v-show="types==2">
							<view class="listTitle borBom">
								<text>{{languageInfo.times}}</text>
								<text>{{languageInfo.price}}</text>
								<text>{{languageInfo.nums}}</text>
							</view>
							<view class="items borBom" v-for="(item,index) in transList" :key='index'>
								<text>{{item.create_time}}</text>
								<text>{{item.trade_num}}</text>
								<text>{{item.trade_price}}</text>
							</view>
							<view class="tipTxt" v-show="transList.length==0">
								{{languageInfo.noData}}
							</view>
							<view class="bomBtn">
								<text class="btn1" :class="{btn2:types=='1'}" @tap="tabType(1)">{{languageInfo.FifthGear}}</text>
								<text class="btn1" :class="{btn2:types=='2'}" @tap="tabType(2)">{{languageInfo.Detail}}</text>
							</view>
						</view>
					</view>
					<view class="listRight">
						<!-- 限价、市价 -->
						<view class="priceItem">
							<view>
								<text class="checkRadio" @tap="checkRadio(1)">
									<text :class="{radioActive:radio=='1'}"></text>
								</text>
							</view>
							<text class="checkTxt">{{languageInfo.LimitPrice}}</text>
							<view>
								<text class="checkRadio ml50" @tap="checkRadio(2)">
									<text :class="{radioActive:radio=='2'}"></text>
								</text>
							</view>
							<text class="checkTxt">{{languageInfo.marketPrice}}</text>
						</view>
						<!-- 价格 -->
						<view>
							<text class="priceTxt">{{languageInfo.price}}</text>
						</view>
						<view class="minPrice" v-show="radio=='2'">
							<text>{{languageInfo.marketPrices}}</text>
						</view>
						<view class="numBox" v-show="radio=='1'">
							<button :disabled="lessDisable" class="less" hover-class="none" @tap="lessNum">-</button>
							<input class="nums" type="number" :placeholder="languageInfo.enterPrice" @input="amountNum" v-model="limitPrice"></input>
							<button class="less" hover-class="none" @tap="addNum">+</button>
						</view>
						<!-- 数量 -->
						<view>
							<text class="priceTxt">{{languageInfo.nums}}</text>
						</view>
						<view class="inpNumBox">
							<input type="number" :placeholder="languageInfo.placeEnterNum" @input="checkNum" class="inpNum" v-model="nums">
							<text class="typeTxt">KL</text>
						</view>
						<!-- 可用 -->
						<view class="useList">
							<view>
								<text class="useTxt1">{{languageInfo.Available}}</text>
								<text class="useNum ml8" v-if="active==1">{{usePoo}} POO</text>
								<text class="useNum ml8" v-else>{{useKl}} KL</text>
							</view>
							<text class="allTxt" @tap="allPoo">{{languageInfo.all}}</text>
						</view>
						<!-- 交易额 -->
						<view class="rightBom">
							<view class="amount">
								<text class="amountTxt">{{languageInfo.TransactionAmount}}</text>
								<view>
									<text class="price">{{allAmount}}</text>
									<text class="types">POO</text>
								</view>
							</view>
							<view>
								<button class="buyIn" v-show="active=='1'" @tap="buyBtn">{{languageInfo.buyIn}}</button>
								<button class="buyIn" v-show="active=='2'" :class="{sellActive:active=='2'}" @tap="buyBtn">{{languageInfo.sell}}</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 支付弹窗 -->
			<uni-popup ref="popup" type="center">
				<view class="modalBox">
					<view @tap="closeModal" class="closeBox">
						<text class="closeIcon"></text>
					</view>
					<view class="modalTit">
						<image src="../../../static/index/icon12.png" class="icon12"></image>
						<text class="title">{{languageInfo.PaymentConfirmation}}</text>
						<image src="../../../static/index/icon12.png" class="icon12"></image>
					</view>
					<view class="pwdTxt">{{languageInfo.enterPayPwd}}</view>
					<view>
						<input type="password" :placeholder="languageInfo.placeEnterPayPwd" v-model="pwd" class="pwdInp">
					</view>
					<view class="tips">
					</view>
					<view><text class="confirBtn mb10" @tap="confirmPay">{{languageInfo.confirmPayment}}</text></view>
					<view><text class="confirBtn" @tap="closeModal">{{languageInfo.cancel}}</text></view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	var _this;
	export default {
		data() {
			return {
				lists: {
					buyLists: [], //买入五档
					sellLists: [] //买入明细
				},
				transPrice: '', //最新成交价
				marketPrice: '', //市场价
				transList: [], //明细
				types: 1,
				active: 1, //买入、卖出
				radio: 1, //限价、市价
				pwd: '', //密码
				nums: '', //数量
				limitPrice: '', //限价价格
				usePoo: '0.000', //可用POO
				useKl: '0.000', //可用KL
				allAmount: '0', //交易额
				lessDisable: false, //限价减按钮
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
			// _this.getTransfter()
			_this.getHand()
			_this.getMarketPrice()
			_this.getAccount()
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// 跳转
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 查看市场详情
			viewMarket(){
				let price = _this.marketPrice
				uni.navigateTo({
					url:'../viewMarket/viewMarket?price='+price
				})
			},
			// 资产
			getAccount() {
				_this.get('api/myProperty').then(res => {
					let datas = res.data.res
					for (let i in datas) {
						if (datas[i].currency_id == '2') {
							_this.usePoo = datas[i].num
							console.log(_this.usePoo)
						}
						if (datas[i].currency_id == '1') {
							_this.useKl = datas[i].num
						} 
					}
				})
			},
			// 市场价
			getMarketPrice() {
				_this.get('api/marketPrice').then(res => {
					_this.marketPrice = res.data.res.market_price
				})
			},
			// 买入、卖出切换
			check(e) {
				_this.active = e
				_this.nums = ''
				_this.limitPrice = ''
				_this.allAmount = '0'
			},
			// 买入类型切换
			tabType(e) {
				_this.types = e
				_this.getTransfter()
			},
			// 盘口
			getHand() {
				_this.get('api/handicap').then(res => {
					if (res.data.code == 200) {
						_this.lists.buyLists = res.data.res.buy
						_this.lists.sellLists = res.data.res.sell
						_this.transPrice = res.data.res.newest_trade_price
					}
				})
			},
			// 交易统计
			getTransfter() {
				let data = {
					type: 2
				}
				_this.get('api/newTransfer', data).then(res => {
					if (res.data.code == 200) {
						_this.transList = res.data.res
					}
				})
			},
			// 可用数量限制
			checkNum(e) {
				let nums = e.target.value
				let use = _this.usePoo
				let price = _this.limitPrice
				if (parseFloat(nums) > parseFloat(use)) {
					_this.nums = use
				}
				if (price != '' && nums != '') {
					_this.allAmount = (parseFloat(price) * parseFloat(nums)).toFixed(3)
				}
			},
			// 全部
			allPoo() {
				_this.nums = _this.usePoo
			},
			// 限价、市价切换
			checkRadio(e) {
				_this.radio = e
			},
			// 买入、卖出
			buyBtn() {
				let num = _this.nums
				let type = _this.radio
				let price = _this.limitPrice
				if (type == '1' && price == '') {
					_this.linkTo.$noToast(_this.languageInfo.placePrice)
				} else if (num == '') {
					_this.linkTo.$noToast(_this.languageInfo.emptyNum)
				} else {
					_this.$refs.popup.open();
				}
			},
			// 买入、卖出
			buyAndSell() {
				let data = {
					entrust_num: _this.nums,
					type: _this.active,
					entrust_price: _this.limitPrice
				}
				_this.post('api/entryOrder', data).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../orderRecord/orderRecord'
							})
						}, 500)
						_this.$refs.popup.close();
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			// 支付密码确认
			confirmPay() {
				let pwd = _this.pwd
				_this.post('api/verifyPaymentPassword', {
					payment_password: pwd
				}).then(res => {
					if (res.data.code == 200) {
						_this.buyAndSell()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			// 弹窗取消
			closeModal() {
				_this.$refs.popup.close();
			},
			//限价价格加
			addNum() {
				let price = _this.limitPrice
				if (price != '') {
					_this.limitPrice = (parseFloat(_this.limitPrice) + 0.001).toFixed(3)
					_this.lessDisable = false
				} else {
					return
				}
			},
			// 限价价格减
			lessNum() {
				let price = _this.limitPrice
				if (parseFloat(price) >= 1 && price != '') {
					_this.limitPrice = (parseFloat(price) - 0.001).toFixed(3)
				} else {
					_this.lessDisable = true
					return
				}
			},
			// 交易额
			amountNum() {
				let price = _this.limitPrice
				let num = _this.nums
				console.log(price)
				console.log(num)
				if (num == '' && price != '') {
					_this.allAmount = parseFloat(price) * 0
				} else if (num != '' && price != '') {
					_this.allAmount = (parseFloat(price) * parseFloat(num)).toFixed(3)
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.borBom {
		border-bottom: 2rpx solid #FFDA7D;
	}

	.ml50 {
		margin-left: 50rpx;
	}

	.ml8 {
		margin-left: 8rpx;
	}

	.mb10 {
		margin-bottom: 10rpx;
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

		.conTop {
			@include flexBet();
			@include borCol();
			@include bgCol();
			border-radius: 10rpx;
			height: 200rpx;
			padding: 0 40rpx 0 48rpx;

			.down {
				width: 10rpx;
				height: 28rpx;
			}

			.topTxt1 {
				@include font36();
				@include colF();
				padding-bottom: 40rpx;
			}

			.txt2 {
				@include font36();
				@include colF();
			}

			.txt3 {
				@include font24();
				color: #2DEAB7;
				margin: 0 10rpx 0 20rpx;
			}

			.topRight {
				@include flexBet();
				position: relative;
				z-index: 1;
				margin-left: 30rpx;
			}

			.rightTxt {
				width: 260rpx;
				height: 62rpx;
				line-height: 62rpx;
				padding: 0 10rpx 0 40rpx;
				@include borCol();
				@include mainCol();
				@include font24();
				background-color: #260300;
				border-radius: 4rpx;
				text-align: center;
				// border: 2rpx solid #FFDA7D;
				box-sizing: border-box;
			}

			.icon7 {
				width: 86rpx;
				height: 110rpx;
				position: absolute;
				z-index: 2;
				left: -46rpx;
				top: -34rpx;
			}
		}

		// 买入
		.marketBox {
			@include bgCol();
			padding: 40rpx 10rpx;
			margin-top: 20rpx;
			border-radius: 6rpx;
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

			.tabSell {
				background-color: #8A1010;
			}

			.placeBox {
				// @include flexBet();
				display: flex;

				.listLeft {
					width: 50%;
					@include borCol();
					border-radius: 6rpx;
					position: relative;
				}

				.listTitle {
					@include around();
					@include mainCol();
					@include font20();
					height: 60rpx;
					line-height: 60rpx;
				}

				.items {
					@include around();
					@include colF();
					@include font20();
					height: 60rpx;
					line-height: 60rpx;

				}

				.items text {
					width: 33.3%;
					text-align: center;
				}

				.newPrice {
					padding: 38rpx 0 8rpx 0;
					width: 100%;
					text-align: center;

					.newTxt {
						@include font20();
						color: #ccc;
					}

					.newNum {
						@include mainCol();
						@include font30();
					}
				}

				.bomBtn {
					position: absolute;
					width: 100%;
					bottom: 20rpx;
					left: 50%;
					transform: translateX(-50%);
					text-align: center;
					margin-top: 20rpx;

					.btn1 {
						display: inline-block;
						width: 134rpx;
						height: 40rpx;
						line-height: 40rpx;
						background-color: #333;
						@include font20();
						@include colF();
						// padding: 0 48rpx;
						border-radius: 4rpx;
						box-sizing: border-box;
					}

					.btn2 {
						background-color: #A22424;
					}
				}

				.listRight {
					width: 50%;
					padding-left: 30rpx;
					box-sizing: border-box;

					.priceItem {
						padding-top: 28rpx;
						@include flexDe();

						.checkTxt {
							@include font24();
							@include colF();
							margin-left: 10rpx;
						}

						.checkRadio {
							display: inline-block;
							width: 30rpx;
							height: 30rpx;
							border-radius: 50%;
							border: 2rpx solid #D8273C;
							position: relative;
						}

						.radioActive {
							display: inline-block;
							position: absolute;
							width: 16rpx;
							height: 16rpx;
							border-radius: 50%;
							background-color: #BD3030;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}

					// 价格
					.priceTxt {
						display: inline-block;
						@include font24();
						@include colF();
						padding: 50rpx 0 30rpx 0;
						box-sizing: border-box;
					}

					.minPrice {
						@include bgCol();
						@include borCol();
						@include font24();
						@include colF();
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
					}

					.numBox {
						@include flexBet();
						@include borCol();
						@include colF();
						height: 70rpx;
					}

					.less {
						@include colF();
						width: 70rpx;
						height: 100%;
						line-height: 70rpx;
						text-align: center;
						padding: 0;
						background-color: #8A1010;
						border-radius: 0;
					}

					.nums {
						@include font24();
						@include colF();
						width: 216rpx;
						height: 100%;
						text-align: center;
						line-height: 70rpx;
						border-left: 2rpx solid #FFDA7D;
						border-right: 2rpx solid #FFDA7D;
					}

					// 数量
					.inpNumBox {
						position: relative;
						height: 70rpx;

						.inpNum {
							@include borCol();
							@include colF();
							@include font20();
							padding: 0 80rpx 0 20rpx;
							height: 70rpx;
							line-height: 70rpx;
							box-sizing: border-box;
						}

						.typeTxt {
							position: absolute;
							right: 20rpx;
							top: 50%;
							transform: translateY(-50%);
							@include font20();
							@include colF();
						}
					}

					// 可用
					.useList {
						@include flexBet();
						@include font20();
						padding-top: 20rpx;
						@include colF();

						.allTxt {
							@include mainCol();
						}
					}

					// 交易额
					.rightBom {
						padding-top: 280rpx;
						box-sizing: border-box;

						.amount {
							@include flexBet();
							@include font24();
							color: #ddd;

							.price {
								@include font24();
								@include mainCol();
							}

							.types {
								margin-left: 10rpx;
							}
						}

						.buyIn {
							@include font24();
							height: 66rpx;
							line-height: 66rpx;
							background-color: #FFDA7D;
							color: #120407;
							border-radius: 4rpx;
							font-weight: bold;
							margin-top: 22rpx;
						}

						.sellActive {
							background-color: #BD3030;
							@include mainCol();
						}
					}
				}
			}
		}

		// 弹窗
		.modalBox {
			@include borCol();
			background-color: #260300;
			border-radius: 14rpx;
			padding: 54rpx 50rpx;
			box-sizing: border-box;
			text-align: center;
			position: relative;
			.closeBox{
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				top: 0;
				right: 0;
			}
			.closeIcon {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				display: inline-block;
				width: 20rpx;
				height: 2rpx;
				background-color: #ccc;
				transform: rotate(45deg);
			}

			.closeIcon::after {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				display: inline-block;
				width: 20rpx;
				height: 2rpx;
				background-color: #ccc;
				transform: rotate(90deg);
			}

			.modalTit {
				@include cen();
			}

			.title {
				@include font30();
				@include mainCol();
				padding: 0 10rpx;
			}

			.icon12 {
				width: 28rpx;
				height: 48rpx;
			}

			.pwdTxt {
				@include font24();
				@include mainCol();
				padding: 40rpx 0 20rpx 0;
			}

			.pwdInp {
				@include borCol();
				@include font20();
				@include mainCol();
				height: 62rpx;
				line-height: 62rpx;
				border-radius: 4rpx;
				margin-bottom: 40rpx;
			}

			.confirBtn {
				display: inline-block;
				width: 440rpx;
				height: 60rpx;
				line-height: 60rpx;
				@include bgCol();
				@include mainCol();
				@include font24();
				@include borCol();
				border-radius: 6rpx;
			}

		}
	}
</style>
