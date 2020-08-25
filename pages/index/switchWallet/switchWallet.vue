<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.switchWallet"></tab-top>
		<view class="content">
			<scroll-view scroll-y="true" class="scrollHeight">
				<view class="userList" @tap="selectUser(index)" v-for="(item,index) in lists" :key="index">
					<view class="listLeft">
						<image class="headImg" v-if="item.image!=''" :src='item.image'></image>
						<image class="headImg" v-else :src='suprizeImg'></image>
						<text class="nameTxt">{{item.nickname}}</text>
					</view>
					<view>
						<image src="../../../static/index/icon26.png" class="icon26" v-show="names==item.nickname"></image>
					</view>
				</view>
			</scroll-view>
			<view>
				<button class="btn" hover-class="none" @tap="goTo('../addWallet/addWallet')">{{languageInfo.addWallet}}</button>
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
				select: -1,
				lists: [],
				suprizeImg: '',
				names: '',
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
		},
		onShow() {
			_this.getMyAccount()
			_this.randerPic()
			_this.names = uni.getStorageSync('nickname')
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 切换账号
			selectUser(index) {
				_this.select = index
				let names = _this.lists[index].nickname
				_this.names = _this.lists[index].nickname
				let imei = uni.getStorageSync('uuid')
				let data = {
					nickname: names,
					imei: imei
				}
				_this.post('api/accountICR', data).then(res => {
					let token = res.data.res.token
					uni.setStorageSync('token', token)
					uni.showToast({
						icon:'success'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '../../index/index'
						})
					}, 500)
				})

			},
			// 默认头像
			randerPic() {
				this.tagHash = {
					"1": {
						headUrl: '../../../static/me/head2.png'
					},
					"2": {
						headUrl: '../../../static/me/head3.png'
					},
					"3": {
						headUrl: '../../../static/me/head4.png'
					}
				};
				let randomKeys = ["1", "2", "3"];
				let index = Math.floor(Math.random() * 3);
				_this.suprizeImg = _this.tagHash[randomKeys[index]].headUrl;
			},
			// 账户列表
			getMyAccount() {
				let imei = uni.getStorageSync('uuid')
				let data = {
					imei: imei
				}
				_this.get('api/myAccount').then(res => {
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
	}

	.content {
		padding: 20rpx 30rpx;

		.scrollHeight {
			width: 100%;
			height: calc(100vh - 290rpx);
		}

		.userList {
			@include flexBet();
			@include borCol();
			@include bgCol();
			padding: 20rpx 30rpx;
			border-radius: 6rpx;
			margin-bottom: 20rpx;

			.headImg {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background-color: #ccc;
			}

			.listLeft {
				@include flexDe();
			}

			.icon26 {
				width: 76rpx;
				height: 96rpx;
			}

			.nameTxt {
				@include mainCol();
				@include font30();
				margin-left: 20rpx;
			}
		}
	}
</style>
