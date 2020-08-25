<template>
	<view class="containerBox">
		<tab-top id="topBar" left-icon="back" :title="languageInfo.share"></tab-top>
		<view class="content">
			<view class="mainBox">
				<image class="topImg" src="../../../../static/game/promotion/share/title.png"></image>
				<text class="title1">{{languageInfo.makeMoney}}</text>
				<text class="title2">{{languageInfo.InvitationCode}}:<text>{{InvitationCode}}</text></text>
				<view class="eqcodeBox">
					<image class="eqcodeImg" :src="codeImg" mode=""></image>
				</view>
				<text class="bottomTitle">{{languageInfo.scanRegisterDown}}</text>
			</view>
			<view @tap="saveImage" class="btnOut" v-show="btnShow">
				<text>{{languageInfo.saveAlbum}}</text>
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
				InvitationCode:'',
				codeImg:'', //二维码
				invitedCode:'',//邀请码
				languageInfo: {},
				btnShow:true
			}
		},
		components: {
			tabTop
		},
		onLoad() {
			_this = this
			_this.InvitationCode = uni.getStorageSync('code')
		},
		onShow(){
			_this.getCodeImg()
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// 二维码
			getCodeImg(){
				let token = uni.getStorageSync('token');
				// _this.codeImg = 'http://8.129.172.166:7097/api/expandShare?token='+encodeURIComponent(token)	//测试			
				_this.codeImg = 'http://8.210.21.142/api/expandShare?token='+encodeURIComponent(token)	//正式			
			},
			// 截屏保存图片
			// saveImage(){
			// 	const query = uni.createSelectorQuery().in(this);
			// 	query.select('.content').boundingClientRect(data => {
			// 		console.log(JSON.stringify(data));
			// 		let top =  data.top
			// 		let bottom = data.bottom
			// 		let width = data.width
			// 		let height = data.height
			// 		let left = data.left
			// 		let right = data.right
			// 		var pages = getCurrentPages();
			// 		var page = pages[pages.length - 1];  
			// 		console.log("当前页"+pages.length-1);
			// 		var bitmap=null;  
			// 		var currentWebview = page.$getAppWebview();
			// 		bitmap = new plus.nativeObj.Bitmap('amway_img');  
			// 		// 将webview内容绘制到Bitmap对象中  
			// 		currentWebview.draw(bitmap,function(){  
			// 			bitmap.save( "_doc/pdtEqCode.jpg"  
			// 			,{overwrite: true,format:'jpg',quality:100,clip:{top:top + 'px',left:left + 'px',width:width + 'px',height:height + 'px'}}
			// 			,function(i){  
			// 				console.log('保存图片成功：'+JSON.stringify(i));  
			// 				uni.saveImageToPhotosAlbum({  
			// 					filePath: i.target,  
			// 					success: function () {  
			// 						bitmap.clear(); //销毁Bitmap图片  
			// 						uni.showToast({  
			// 							icon:'success',
			// 							mask: false,  
			// 							duration: 1500  
			// 						});  
			// 					}  
			// 				});  
			// 			}  
			// 			,function(e){  
			// 				console.log('保存图片失败：'+JSON.stringify(e));  
			// 			});  
			// 		},function(e){  
			// 			console.log('截屏绘制图片失败：'+JSON.stringify(e));  
			// 		});
			// 	}).exec();
			// },
			saveImage() {
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
		@include flexC();
		padding: 40rpx 50rpx;
		justify-content: space-around;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
		.mainBox{
			// min-height: 844rpx;
			@include flexC();
			@include bgCol();
			justify-content: flex-start;
			align-items: center;
			border: 1rpx solid #FFDA7D;
			border-radius: 6rpx;
			padding: 30rpx 45rpx 60rpx 45rpx;
			box-sizing: border-box;
			.topImg{
				width: 189rpx;
				height: 240rpx;
			}
			.title1,.title2{
				color: #FFDA7D;
			}
			.title1{
				@include font36();
				margin-bottom: 20rpx;
				margin-top: 42rpx;
				text-align: center;
			}
			.title2{
				@include font26();
				margin-bottom: 42rpx;
			}
			.eqcodeBox {
				@include cen();
				width: 100%;
				height: 230rpx;
				margin: 0 auto;
				padding-top: 18rpx;
				padding-bottom: 40rpx;
				border-bottom: 1rpx solid #FFDA7D;
				.eqcodeImg {
					width: 230rpx;
					height: 100%;
				}
			}
			.bottomTitle{
				@include font24();
				color: #FFDA7D;
				margin-top: 20rpx;
			}
		}
		.btnOut{
			@include cen();
			margin: 0 44rpx;
			height: 70rpx;
			margin-bottom: 30rpx;
			background-color: #260300;
			border: 1rpx solid #FFDA7D;
			border-radius: 6rpx;
			@include font26();
			color: #FFDA7D;
		}
	}
</style>
