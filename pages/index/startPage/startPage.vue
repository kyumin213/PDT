<template>
	<view class="content">
		<view class="startBg"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			//APP端
			let token = uni.getStorageSync('token')
			if (token) { // 有token直接进入首页
				setTimeout(function() {
					uni.switchTab({
						url: '../index'
					});
				}, 4000)
			} else {
				setTimeout(function() {
					uni.reLaunch({
						url: '../guidePage/guidePage'
					});
				}, 4000)
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	uni-page-head {
		display: none;
	}
	.content{
		position: absolute;
		top: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		background: #090f18;
		.startBg {
			width: 100%;
			height: 100%;
			// background: url('~@/static/startBg.gif') no-repeat center;
			background-size: cover;
		}
	}
</style>
