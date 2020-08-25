<script>
	export default {
		globalData:{
			bgm : null, // 背景音乐
			tapMusic : null, // 点击了
			runing : null, // 抽奖时
			timeMusic : null, // 倒计时
			winMusic : null, // 胜利
			looseMusic : null, // 失败
		},
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			plus.navigator.setFullscreen(true);
			plus.device.getInfo({
			 	success:e=>{
			 		console.log(e);
					uni.setStorageSync('uuid',e.uuid);
			 	},
			 	fail:e=>{
			 		console.log(e);
			 	}
			 });
			// #endif
			console.log('App Launch')
			uni.setStorageSync('lang','zh-cn')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './components/zwyCss/zwyCss.css';
	/*每个页面公共css */
	view {
		line-height: 1;
	}

	page {
		background-color: #090909;
		box-sizing: border-box;
		padding-top: calc(var(--status-bar-height) + 88rpx);
		height: 100%;
		overflow-y: auto;
	}

	uni-web-view {
		position: static !important;
	}
	.loading-text{
		@include font24();
		@include colA();
		text-align: center;
		padding: 30rpx 0 50rpx 0;
		box-sizing: border-box;
	}

	// 箭头
	.nextIcon {
		display: inline-block;
		width: 14rpx;
		height: 14rpx;
		border-top: 2rpx solid #FFC950;
		border-right: 2rpx solid #FFC950;
		transform: rotate(45deg);
	}

	// 按钮
	.btn {
		@include borCol();
		@include mainCol();
		@include font26();
		@include bgCol();
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 98rpx;
		height: 70rpx;
		border-radius: 6rpx;
	}

	// 错误提示
	.tips {
		@include font20();
		color: #F52F2F;
		padding-bottom: 18rpx;
	}

	// 暂无数据
	.tipTxt {
		@include font24();
		@include colA();
		text-align: center;
		padding-top: 50%;
		box-sizing: border-box;
	}
</style>
