<template>
	<view class="contentBox">
		<tab-top left-icon="back" :title="languageInfo.addWallet"></tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="../../../static/index/icon11.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.walletName}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="text" @blur="checkName" :placeholder="languageInfo.placeWalletName" class="inp" v-model="walletName">
				</view>
				<!-- <view class="tipsBox"> -->
					<text class="tips" v-show="namesShow">{{languageInfo.walletNameFormat}}</text>
				<!-- </view> -->
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.setPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" @input="changeLogoPwd(pwd)" :placeholder="languageInfo.placeEnterformatPwd" class="inp" v-model="pwd">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.confirPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageInfo.placeConfirPwd" class="inp" v-model="confirPwd">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.setPayPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" @input="changeLogoPwd(payPwd)" :placeholder="languageInfo.placeEnterformatPwd" class="inp" v-model="payPwd">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.confirmPayPwd}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageInfo.placeConfirPayPwds" class="inp" v-model="confirPayPwd">
				</view>
				<view class="items">
					<image src="../../../static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.singularityAddress}}</text>
					<image src="../../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="text" @blur="checkAddress" :placeholder="languageInfo.placeSingularityAddress" class="inp" v-model="address">
				</view>
				<view class="tipsBox">
					<text class="tips">{{tips}}</text>
					<text class="tips" v-show="addressShow">{{languageInfo.addressFormat}}</text>
					<text class="tips" v-show="confirPayPwd!=''&&payPwd!=confirPayPwd">{{languageInfo.twoPayPwd}}</text>
					<text class="tips" v-show="confirPwd!=''&&pwd!=confirPwd">{{languageInfo.twoPwd}}</text>
					<text class="tips" v-show="logoPwdValid">{{languageInfo.formatPwd}}</text>
				</view>
				<view>
					<text class="nextBtn" @tap="nextSubmit">{{languageInfo.nextStep}}</text>
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
				walletName: '', //钱包名称
				pwd: '', //密码
				confirPwd: '', //确认密码
				payPwd: '', //支付密码
				confirPayPwd: '', //确认支付密码
				address:'',//奇点地址
				tips: '', //提示
				logoPwdValid: false,
				languageInfo: {},
				addressShow:false,
				namesShow:false
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow(){
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		methods: {
			// 验证钱包名称
			checkName(){
				let names = _this.walletName
				if(names.length<3){
					_this.namesShow = true
				}else{
					_this.namesShow = false
				}
			},
			// 验证奇点地址
			checkAddress(){
				let values = _this.address
				console.log(values.length)
				let reg = /^r[A-Za-z0-9]{33}$/
				if(reg.test(values)){
					_this.addressShow = false
				}else{
					_this.addressShow = true
				}
			},
			// 登录密码验证
			changeLogoPwd(value) {
				const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/
				if (reg.test(value)) {
					_this.logoPwdValid = false
				} else {
					_this.logoPwdValid = true
				}
			},
			// 下一步
			nextSubmit() {
				let names = _this.walletName
				let pwd = _this.pwd
				let pwds = _this.confirPwd
				let pay = _this.payPwd
				let pays = _this.confirPayPwd
				let address = _this.address
				let formData = {
					walletName: names,
					pwd: pwd,
					confirPwd: pwds,
					payPwd: pay,
					confirPayPwd: pays,
					sgy_address:address
				}
				if (names == '' || pwd == '' || pwds == '' || pay == '' || pays == ''||address=='') {
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				} else if(pwd!=pwds || pay!=pays || _this.addressShow || _this.namesShow){
					return
				}
				else{
					_this.$store.commit('SET_FORMDATA', formData);
					uni.navigateTo({
						url: '../backupTips/backupTips'
					})
				}
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
			height: 100%;
			overflow-y: auto;

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
				margin: 60rpx 50rpx;
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

				.tipsBox {
					// height: 32rpx;
					padding: 0 0 20rpx 0;
				}

				.tips {
					// display: inline-block;
					display: block;
					@include tipTxt();
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
			}
		}
	}
</style>
