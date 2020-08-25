<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.loginPwdModify"></tab-top>
		<view class="content">
			<view class="iconBox">
				<image src="@/static/me/icon8.png" class="icon11"></image>
			</view>
			<view class="itemBox">
				<view class="items">
					<image src="@/static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.oldPwd}}</text>
					<image src="@/static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageInfo.placeOldPwd" class="inp" v-model="oldPwd">
				</view>
				<view class="items">
					<image src="@/static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.newPwd}}</text>
					<image src="@/static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" @input="changeLogoPwd(newPwd)" :placeholder="languageInfo.placeNewPwd" class="inp" v-model="newPwd">
				</view>
				<view class="items">
					<image src="@/static/index/icon12.png" class="icon12"></image>
					<text class="itemTxt">{{languageInfo.confirmNewPwd}}</text>
					<image src="@/static/index/icon12.png" class="icon12"></image>
				</view>
				<view>
					<input type="password" :placeholder="languageInfo.placeConfirNewPwd" class="inp" v-model="confirNewPwd">
				</view>
				<view class="tipBox">
					<text class="tips" v-show="logoPwdValid">{{languageInfo.formatPwd}}</text>
					<text class="tips" v-show="confirNewPwd!=''&&newPwd!=confirNewPwd">{{languageInfo.twoPwd}}</text>
				</view>
				<view>
					<text class="nextBtn" @tap="confirmBtn">{{languageInfo.confirmChange}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	var _this
	export default {
		data() {
			return {
				logoPwdValid:false,
				oldPwd:'',//旧密码
				newPwd:'',//新密码
				confirNewPwd:'',//确认新密码
				languageInfo:{}
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
			// 密码验证
			changeLogoPwd(value) {
				const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/
				if (reg.test(value)) {
					_this.logoPwdValid = false
				} else {
					_this.logoPwdValid = true
				}
			},
			// 确认修改
			confirmBtn(){
				let old = _this.oldPwd
				let pwd = _this.newPwd
				let pwds = _this.confirNewPwd
				let data ={
					old_password:old,
					password:pwd,
					confirm_password:pwds
				}
				if(old==''|| pwd==''||pwds==''){
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				}else{
					_this.post('api/changeLoginPassword',data).then(res=>{
						uni.showToast({
							icon:'success'
						})
						uni.removeStorageSync('token')
						setTimeout(()=>{
							uni.reLaunch({
								url:'../../../index/importWallet/importWallet'
							})
						},500)
					})
				}
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
		.itemBox{
			margin: 60rpx 50rpx;
			padding: 44rpx 44rpx;
			@include bgCol();
			border-radius: 6rpx;
			text-align: center;
			box-sizing: border-box;
			// height: calc(100vh - 480rpx);
			.items{
				@include cen();
				.itemTxt{
					@include font30();
					@include mainCol();
					margin: 0 10rpx;
				}
			}
			.inp{
				@include borCol();
				@include font20();
				@include mainCol();
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 4rpx;
				margin: 30rpx 0 40rpx 0;
			}
			.icon12{
				width: 28rpx;
				height: 48rpx;
			}
			.tipBox{
				height: 80rpx;
			}
			.tips{
				display: inline-block;
				@include tipTxt();
			}
			.nextBtn{
				@include borCol();
				@include font24();
				@include mainCol();
				background-color: #260300;
				display: inline-block;
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 6rpx;
			}
		}
	}
</style>
