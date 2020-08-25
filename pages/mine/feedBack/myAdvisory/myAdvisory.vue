<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.consult" />
		<view class="content">
			<view class="conBox">
				<view class="mb30 tipTit">
					<view>
						<image src="@/static/me/icon11.png" class="icon11"></image>
					</view>
					<label class="tipTxt">{{languageInfo.toFeedback}}</label>
				</view>
				<textarea class="textBox" maxlength='500' name="textarea" v-model="content" />
				<button class="submitBtn" @tap='submitFeed'>{{languageInfo.submit}}</button>
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
				content:'',
				languageInfo:{}
			}
		},
		components:{
			tabTop
		},
		onLoad(){
			_this = this
		},
		onShow() {
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// 意见反馈
			submitFeed(){
				let con = _this.content
				if(con==''){
					_this.linkTo.$noToast(_this.languageInfo.informationEmpty)
				}else{
					let data = {
						content:con
					}
					_this.post('api/feedback',data).then(res=>{
							uni.showToast({
								icon:'success'
							})
							  setTimeout(() => {
							    uni.navigateBack({
							    	delta:1
							    })
							 }, 500);
					
					}).catch(err=>{
						console.log(err)
					})
				}
			
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mb30{
		margin-bottom: 30rpx;
	}
	.containerBox{
		@include bg();
		height: 100%;
		box-sizing: border-box;
	}
	.content{
		padding: 50rpx 64rpx;
		box-sizing: border-box;
		.conBox{
			width: 100%;
			height: 100%;
			.tipTit{
				@include flexDe();
			}
			.textBox{
				@include bgCol();
				@include borCol();
				@include colF();
				width: 100%;
				height: 300rpx;
				padding: 10rpx;
				font-size: 24rpx;
				margin: auto;
				box-sizing: border-box;
				border-radius: 10rpx;
			}
			.icon11{
				width: 54rpx;
				height: 54rpx;
			}
		}
			.tipTxt{
				@include mainCol();
				@include font24();
				padding-top: 0;
				line-height: 34rpx;
				text-align: left;
			}
		
		.submitBtn{
			@include bgCol();
			@include borCol();
			@include mainCol();
			@include font24();
			position: fixed;
			left: 124rpx;
			right: 124rpx;
			bottom: 80rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 6rpx;
		}
	}

</style>
