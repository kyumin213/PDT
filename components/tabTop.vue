<template>
	<view>
	<!-- 	<view class="headTop">
			<uni-nav-bar @clickRight="clickRight" :class="{box:open}"  class="box" :color="color" :left-icon="leftIcon" status-bar :right-text="rightText" :title="title"></uni-nav-bar>
			<view class="rightBox">
				<slot name="rightBox" />
			</view>
		</view> -->
		<view class="headTop" @clickRight="clickRight">
			<view class="leftBox">
				<uni-icons :type="leftIcon" size="24"  @tap="back"/>
			</view>
			<view>
				<text class="logoTxt ml20">{{title}}</text>
			</view>
			<view class="rightBox">
				<slot name="rightBox" />
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		props:{
			leftIcon:{
				default:'back'
			},
			rightText:{
				default:''
			},
			title:{
				default:'导航栏组件'
			},
			color:{
				default:'#fff'
			},
			open:{
				//是否隐藏头部背景图
				default:true,
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			back(){
				uni.navigateBack();
			},
			clickLeft(){
				this.$emit('');
				//console.log('111')
			},
			clickRight(){
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	.box{
		width: 100%;
		/* background-color: rgba(0,0,0,.6); */
	}
	.headTop {
		position: fixed;
		top: 0;
		width: 100%;
		height: calc(var(--status-bar-height) + 88rpx);
		// padding-top: 20rpx;
		// padding-top: calc(var(--status-bar-height) + 50rpx);
		padding-top: calc(var(--status-bar-height));
		// padding-left: 30rpx; 
		/*  #ifdef APP-PLUS */
		padding-bottom: 40rpx;
		/*  #endif  */
		box-sizing: border-box;
		display: flex;
		justify-content:center;
		align-items: center;
		z-index: 10;
		background: #090909;
		.leftBox{
			display: flex;
			align-items: center;
			padding-top: 8rpx;
			position: absolute;
			left: 20rpx;
		}
		.logoIcon {
			width: 32rpx;
			height: 36rpx;
			margin-right: 8rpx;
		}
		
		.logoTxt {
			color: #FF4729;
			font-weight: bold;
			font-size: 35rpx;
			text-align: center;
		}
		.rightBox{
			position: absolute;
			right: 40rpx;
		}
	}

</style>
