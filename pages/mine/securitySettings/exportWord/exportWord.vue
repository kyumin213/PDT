<template>
	<view class="containerBox">
		<tabTop left-icon="back" :title="languageInfo.ExportMnemonic" />
		<view class="content">
			<view class="tips">
				<image src="@/static/index/icon12.png" class="icon12"></image>
				<text class="tipTitle">{{languageInfo.keepWords}}</text>
				<image src="@/static/index/icon12.png" class="icon12"></image>
			</view>
			<view class="wordItem">
				<view class="items" v-for="(item,index) in wordData" :key='index'>
					<label class="itemTxt">{{item.word}}</label>
				</view>
			</view>
			<view v-show="btnShow">
				<button class="saveTo" @tap="capture">{{languageInfo.saveAlbum}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	var _this
	export default {
		data() {
			return {
				wordData: [],
				test: '',
				languageInfo: {},
				btnShow: true
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this

		},
		onShow() {
			_this.exportWord()
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// 全部助记词
			exportWord() {
				_this.get('api/exportWord').then(res => {
					_this.wordData = res.data.res
				})
			},
			// 保存至相册
			capture() {
				_this.btnShow = false
				setTimeout(() => {
					var pages = getCurrentPages();
					var page = pages[pages.length - 1];
					var bitmap = null;
					var currentWebview = page.$getAppWebview();
					bitmap = new plus.nativeObj.Bitmap('amway_img');
					// 将webview内容绘制到Bitmap对象中  
					currentWebview.draw(bitmap, function() {
						bitmap.save("_doc/a.jpg", {}, function(i) {
							uni.saveImageToPhotosAlbum({
								filePath: i.target,
								success: function() {
									bitmap.clear(); //销毁Bitmap图片  
									uni.showToast({
										icon: 'success',
										mask: false,
										duration: 1500
									});
									_this.btnShow = true
								}
							});
						}, function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
						});
					}, function(e) {
						console.log('截屏绘制图片失败：' + JSON.stringify(e));
					});
				},400)
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
		padding: 78rpx 0;
		box-sizing: border-box;

		.tips {
			@include cen();

			// padding: 72rpx auto;
			.tipTitle {
				@include mainCol();
				// padding-top: 79rpx;
				font-size: 30rpx;
				margin: 0 10rpx;
				box-sizing: border-box;
			}

			.icon12 {
				width: 28rpx;
				height: 48rpx;
			}
		}

		.wordItem {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin: 52rpx 30rpx;
			box-sizing: border-box;
		}

		.items {
			width: 33.3%;
			text-align: center;
			margin-bottom: 28rpx;
			box-sizing: border-box;

			.itemTxt {
				@include borCol();
				@include bgCol();
				display: inline-block;
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 30rpx;
				// border: 2rpx solid #2DEAB7;
				border-radius: 240rpx;
				color: #fff;
				font-size: 24rpx;
			}
		}

		.saveTo {
			@include bgCol();
			@include borCol();
			@include mainCol();
			@include font24();
			position: fixed;
			left: 124rpx;
			right: 124rpx;
			bottom: 82rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 6rpx;
		}
	}
</style>
