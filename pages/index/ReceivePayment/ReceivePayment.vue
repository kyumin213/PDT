<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.recharge">
			<image slot="rightBox" class="icon37" src="~@/static/index/icon37.png" @tap="goTo('../collectionRecord/collectionRecord')"></image>
		</tab-top>
		<view class="content">
			<view>
				<image src="../../../static/index/icon4.png" class="icon4"></image>
			</view>
			<view class="conBox">
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.chooseCurrency}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="typeBox">
					<picker @change="translate" :value="index" :range="currencyItem" mode="selector" style="width: 100%;">
						<input type="text" disabled :placeholder="languageInfo.placeChooseCurrency" class="inp" v-model="currency">
						<image src="../../../static/index/icon28.png" class="icon28"></image>
					</picker>
				</view>
				<view v-show="currency!=''">
					<image class="codeImg" :src="codeImg"></image>
					<view class="borBom"></view>
					<view>
						<text class="address">{{ethAddress}}</text>
					</view>
					<view class="btnsBox">
						<button v-show="currencyId=='3'" class="btns" hover-class="none" @tap="receiveSub">{{languageInfo.rechargeConfir}}</button>
						<button class="btns mt20" hover-class="none" @tap="copyAddress(ethAddress)">{{languageInfo.copyAddress}}</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 充值确认弹窗 -->
		<uni-popup ref="popup" type="center">
			<view class="modalBox">
				<view @tap="closeModal" class="closeBox">
					<text class="closeIcon" @tap="closeModal"></text>
				</view>
				<view class="modalTit">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="title">{{languageInfo.rechargeConfir}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="pwdTxt">{{languageInfo.enterHash}}</view>
				<view>
					<textarea value="" @input="changeValue" :placeholder="languageInfo.placeEnterHash" v-model="hxValue" class="pwdInp" />
				</view>
				<view class="mt60"><text class="confirBtn" @tap="hxConfir">{{languageInfo.confirm}}</text></view>
				<view><text class="confirBtn mt10" @tap="closeModal">{{languageInfo.cancel}}</text></view>
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
				currencyItem: ['PDT', 'USDT'],
				index: 0,
				currency: '', //币种
				currencyId:'',//币种ID
				currencyType:false,
				codeImg:'',//二维码
				ethAddress:'', //地址
				hxValue:'',//交易哈希
				hxNull:false,
				pwdErr:false,
				languageInfo: {}
			}
		},
		components: {
			tabTop,uniPopup
		},
		onLoad() {
			_this = this
		},
	onShow() {
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// 跳转
			goTo(url){
				_this.linkTo.navTo(url)
			},
			// 奇点地址
			getPdtAddress(){
				_this.get('api/getPDTRechargeAddress').then(res=>{
					_this.ethAddress = res.data.res.pdt_address
				})
			},
			// 复制
			copyAddress(value){
				uni.setClipboardData({
					data: value, // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									icon:'success'
								});
							}
						});
					}
				});
			},
			// 充值确认
			receiveSub(){
				_this.$refs.popup.open()
			},
			// 关闭弹窗
			closeModal(){
				_this.$refs.popup.close()
			},
			// 交易哈希确认
			hxConfir(){
				let hx = _this.hxValue
				if(hx==''){
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				}else{
					_this.post('api/confirmRecharge',{ti_id:hx}).then(res=>{
						uni.showToast({
							icon:'success'
						})
						setTimeout(()=>{
							_this.$refs.popup.close()
							uni.navigateTo({
								url:'../collectionRecord/collectionRecord'
							})
							_this.hxValue = ''
						},1000)
					})
				}
			},
			// 监听值变化
			changeValue(e){
				let nums = e.target.value
				if(nums!=''){
					_this.hxNull = false
				}else{
					_this.hxNull=true
				}
			},
			// 选择币种
			translate: function(e) {
				_this.index = e.detail.value
				let index = e.detail.value
				_this.currency = _this.currencyItem[index]
				if (_this.currency == 'PDT') {
					_this.currencyId = 3
					_this.getPdtAddress()
				} else if (_this.currency == 'USDT') {
					_this.currencyId = 4
					_this.ethAddress = _this.$store.state.userInfo.eth_address
				}
				_this.getCodeImg()
			},
			// 二维码
			getCodeImg(){
				let token = uni.getStorageSync('token');
				// _this.codeImg = 'http://8.129.172.166:7097/api/rechargeQrCode?token='+encodeURIComponent(token)+'&currency_id='+_this.currencyId				
				_this.codeImg = 'http://8.210.21.142/api/rechargeQrCode?token='+encodeURIComponent(token)+'&currency_id='+_this.currencyId				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mt20{
		margin-top: 20rpx;
	}
	.mt10{
		margin-top: 10rpx;
	}
	.mt60{
		margin-top: 60rpx;
	}
	.containerBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;
		.icon37{
			width: 58rpx;
			height: 64rpx;
		}
	}

	.content {
		padding: 50rpx 50rpx;
		box-sizing: border-box;
		text-align: center;
		height: 100%;
		overflow-y: auto;

		.icon4 {
			width: 188rpx;
			height: 240rpx;
		}

		.conBox {
			@include bgCol();
			border-radius: 6rpx;
			margin-top: 54rpx;
			padding: 50rpx 44rpx;
			// height: 920rpx;
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
				@include colF();
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 4rpx;
				margin: 30rpx 0 40rpx 0;
			}

			.icon12 {
				width: 28rpx;
				height: 48rpx;
			}

			.typeBox {
				position: relative;
			}

			.icon28 {
				position: absolute;
				top: 50%;
				right: 20rpx;
				width: 48rpx;
				height: 48rpx;
				transform: translateY(-50%);
			}
		}

		.codeImg {
			width: 250rpx;
			height: 250rpx;
			margin-top: 20rpx;
		}

		.borBom {
			height: 2rpx;
			background-color: #FFDA7D;
			margin: 50rpx 0 22rpx 0;
		}

		.address {
			@include mainCol();
			@include font24();
		}
		.btnsBox{
			padding-top: 112rpx;
		}
		.btns {
			height: 70rpx;
			@include bgCol();
			@include font24();
			@include mainCol();
			@include borCol();
			border-radius: 6rpx;
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
			width: 86%;
			@include borCol();
			@include font20();
			@include colF();
			padding: 30rpx;
			height: 100rpx;
			text-align: left;
			line-height: 36rpx;
			border-radius: 4rpx;
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
</style>
