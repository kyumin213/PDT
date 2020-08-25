<template>
	<view class="contentBox">
		<tab-top left-icon="" :title="languageInfo.mine"></tab-top>
		<!-- 头像 -->
		<view class="content">
			<!-- 等级 -->
			<view class="levelBox">
				<view class="levelItem">
					<image v-if="lists.is_originator=='1'" lazy-load="true" src="../../static/me/icon2.png" class="icon2"></image>
					<image v-if="lists.is_originator=='2'" lazy-load="true" src="../../static/me/icon15.png" class="icon2"></image>
					<view class="levelTxt">{{languageInfo.creator}}</view>
				</view>
				<view class="levelItem">
					<view>
						<image class="headIcon" mode="aspectFill" @tap="upload" :src="lists.image" v-if="lists.image!=''"></image>
						<image class="headIcon" @tap="upload" v-else :src="suprizeImg"></image>
					</view>
					<view class="mt20">
						<text class="userName">{{lists.nickname}}</text>
					</view>
				</view>
				<view class="levelItem">
					<view class="levelNumBox">
						<image v-if="lists.level=='0' && lang == 'zh-cn'" src="../../static/me/level0.png" class="icon2"></image>
						<image v-if="lists.level=='0' && lang == 'en-us'" src="../../static/me/level0En.png" class="icon2"></image>
						<image v-if="lists.level!='0'" src="../../static/me/icon14.png" class="icon2"></image>
						<text v-if="lists.level=='1'" class="levelNum">1</text>
						<text v-if="lists.level=='2'" class="levelNum">2</text>
						<text v-if="lists.level=='3'" class="levelNum">3</text>
						<text v-if="lists.level=='4'" class="levelNum">4</text>
					</view>
					<!-- <view class="levelTxt">薯条一段</view> -->
					<view class="levelTxt">{{getOrderStatus(lists.level)}}</view>
				</view>
			</view>
			<!-- 设置 -->
			<view class="setList">
				<view class="setBox">
					<!-- 安全设置 -->
					<view class="setItem" @tap="goTo('securitySettings/securitySettings')">
						<image src="../../static/me/icon4.png" class="icon4"></image>
						<view class="setItemBox">
							<text>{{languageInfo.SecuritySettings}}</text>
						</view>
					</view>
					<!-- 关于我们 -->
					<view class="setItem" @tap="stayTuned">
						<image src="../../static/me/icon5.png" class="icon4"></image>
						<view class="setItemBox">
							<text>{{languageInfo.aboutUs}}</text>
						</view>
					</view>
					<!-- 消息中心 -->
					<view class="setItem" @tap="goTo('../index/messageCenter/messageCenter')">
						<image src="../../static/me/icon6.png" class="icon4"></image>
						<view class="setItemBox">
							<text>{{languageInfo.messageCenter}}</text>
						</view>
					</view>
					<!-- 意见反馈 -->
					<view class="setItem" @tap="goTo('feedBack/feedBack')">
						<image src="../../static/me/icon7.png" class="icon4"></image>
						<view class="setItemBox">
							<text>{{languageInfo.Feedback}}</text>
						</view>
					</view>
					<!-- 切换语言 -->
					<view class="setItem">
						<picker @change="checkLanguage" :value="index" :range="languageData" mode="selector" style="width: 100%;">
							<image src="../../static/me/icon12.png" class="icon4"></image>
							<view class="setItemBox">
								<text>{{languageInfo.SwitchLanguage}}</text>
							</view>
						</picker>
					</view>
					<!-- 退出登录 -->
					<view class="setItem" @tap="goTo('../index/switchWallet/switchWallet')">
						<image src="../../static/me/icon13.png" class="icon4"></image>
						<view class="setItemBox">
							<text>{{languageInfo.switchWallet}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退出弹窗 -->
		<!-- 修改确认弹窗 -->
		<uni-popup ref="popup" type="center">
			<view class="modalBox">
				<view @tap="closeModal">
					<text class="closeIcon"></text>
				</view>
				<view class="modalTit">
					<image src="../../static/index/icon12.png" class="icon12"></image>
					<text class="title">{{languageInfo.signOut}}</text>
					<image src="../../static/index/icon12.png" class="icon12"></image>
				</view>
				<view class="pwdTxt">{{languageInfo.logOutTip}}</view>
				<view><text class="confirBtn" @tap="outConfir">{{languageInfo.confirmExit}}</text></view>
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
				languageData: ['中文', 'English'], //语言
				index: 0,
				suprizeImg:'',//默认头像
				userName: '',
				lists: [],
				lang:'',
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
			_this.getInfo()
			_this.randerPic()
			_this.lang = uni.getStorageSync('lang')
			_this.languageInfo = _this.linkTo.showLanguage()
		},
		computed: {
			getOrderStatus(status) {
				return status => {
					const i = status * 1;
					let title = '';
					switch (i) {
						case 1:
							title = _this.languageInfo.Afries;
							break;
						case 2:
							title =  _this.languageInfo.frenchTwo;
							break;
						case 3:
							title =  _this.languageInfo.FrenchThree;
							break;
						case 4:
							title =  _this.languageInfo.FourFrenchFries;
							break;
						default:
							title =  _this.languageInfo.experienceUser;
					};
					return title
				}
			}
		},
		methods: {
			goTo(url) {
				_this.linkTo.navTo(url)
			},
			// 敬请期待
			stayTuned(){
				_this.linkTo.$noToast(_this.languageInfo.StayTuned)
			},
			// 默认头像
			randerPic() {
				this.tagHash = {
					"1": {
						headUrl: '../../static/me/head2.png'
					},
					"2": {
						headUrl: '../../static/me/head3.png'
					},
					"3": {
						headUrl: '../../static/me/head4.png'
					}
				};
				let randomKeys = ["1", "2", "3"];
				let index = Math.floor(Math.random() * 3);
				_this.suprizeImg = _this.tagHash[randomKeys[index]].headUrl;
			},
			// 导航语言切换
			checkLang() {
				uni.setTabBarItem({
					index: 0,
					text: _this.languageInfo.assets
				});
				uni.setTabBarItem({
					index: 1,
					text: _this.languageInfo.transaction
				});
				uni.setTabBarItem({
					index: 2,
					text: _this.languageInfo.game
				});
				uni.setTabBarItem({
					index: 3,
					text: _this.languageInfo.mine
				});
			},
			// 个人信息
			getInfo() {
				_this.get('api/myInfo').then(res => {
					_this.lists = res.data.res
				})
			},
			checkLanguage(e) {
				let _this = this
				_this.index = e.detail.value
				let index = e.detail.value
				if (index == 0) {
					uni.setStorageSync('lang', 'zh-cn')
					_this.lang = 'zh-cn'
				} else if (index == 1) {
					uni.setStorageSync('lang', 'en-us')
					_this.lang = 'en-us'
				}
				_this.languageInfo = _this.linkTo.showLanguage();
				_this.checkLang()
			},
			// 退出登录
			outLogin() {
				_this.$refs.popup.open()
			},
			// 取消退出
			closeModal() {
				_this.$refs.popup.close()
			},
			// 确认退出
			outConfir() {
				_this.post('api/loginOut').then(res => {
					uni.showToast({
						icon: 'success'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '../index/guidePage/guidePage'
						})
						uni.removeStorageSync('token')
					}, 500)
				})
			},
			// 上传头像图片
			upload: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths[0];
						let token = uni.getStorageSync("token");
						let languageType = uni.getStorageSync('lang')
						if (token) {
							const uploadTask = uni.uploadFile({
								// url: 'http://8.129.172.166:7097/api/uploadPicture',
								url: 'http://8.210.21.142/api/uploadPicture',//正式
								filePath: tempFilePaths,
								name: 'image',
								header: {
									token: token,
									lang: languageType
								},
								success: function(resFile) {
									let result = JSON.parse(resFile.data);
									if (result.code == 200) {
										_this.lists.image = result.res.image
										uni.showToast({
											icon: 'success'
										})
									} else {
										uni.showToast({
											title: result.message,
											icon: 'none'
										})
									}
								}
							});
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mb104 {
		margin-bottom: 104rpx;
	}

	.mt20 {
		margin-top: 20rpx;
	}

	.mt10 {
		margin-top: 10rpx;
	}

	.contentBox {
		@include bg();
		height: 100%;
		box-sizing: border-box;

		.content {
			padding-top: 72rpx;
			box-sizing: border-box;
		}

		// 等级
		.levelBox {
			@include cen();

			.levelItem {
				width: 33.3%;
				text-align: center;

				.headIcon {
					width: 150rpx;
					height: 150rpx;
					border: 4rpx solid #fff;
					border-radius: 50%;
					background: #ccc;
				}

				.userName {
					@include font30();
					@include mainCol();
				}

				.levelNumBox {
					width: 94rpx;
					margin: 0 auto;
					position: relative;

					.levelNum {
						@include font24();
						color: #FFFF35;
						font-family: 'Impact';
						position: absolute;
						top: 74rpx;
						right: 26rpx;
					}
				}

				.icon2 {
					width: 94rpx;
					height: 120rpx;
				}

				.levelTxt {
					@include colF();
					@include font24();
					margin-top: 20rpx;
				}
			}
		}

		// 设置
		.setList {
			@include bgCol();
			padding: 0 0 48rpx 0;
			margin: 50rpx 30rpx;
			border-radius: 10rpx;
			opacity: .8;
			box-sizing: border-box;
		}

		.setBox {
			@include flexDe();
			flex-wrap: wrap;

			.setItem {
				// @include flexBet();
				// position: relative;
				text-align: center;
				z-index: 1;
				margin-top: 40rpx;
				// margin-left: 30rpx;
				width: 33.3%;
			}

			.setItemBox {
				// padding: 22rpx 78rpx;
				// @include borCol();
				@include mainCol();
				@include font24();
				// background-color: #260300;
				// box-sizing: border-box;
			}

			.icon4 {
				width: 124rpx;
				height: 160rpx;
				// position: absolute;
				// z-index: 2;
				// left: -46rpx;
				// top: -50rpx;
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

			.closeIcon {
				position: absolute;
				top: 26rpx;
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
				@include font30();
				@include mainCol();
				padding: 72rpx 0 40rpx 0;
				font-weight: bold;
			}

			.pwdInp {
				@include borCol();
				@include font20();
				@include mainCol();
				height: 60rpx;
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
