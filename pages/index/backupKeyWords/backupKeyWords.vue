<template>
	<view class="contentBox">
		<tabTop left-icon="back" :title="languageInfo.backupMnemonic" />
		<view class="content">
			<view class="tips">{{languageInfo.backupOrder}}</view>
			<view class="wordItem">
				<view class="items" v-for="(item,index) in lists" :key='item.id'>
					<label class="itemTxt">{{item.word}}</label>
				</view>
			</view>
			<view>
				<button class="saveTo" hover-class="none" @tap="goTo('../verifyBackup/verifyBackup')">{{languageInfo.nextStep}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue'
	var _this;
	export default {
		data() {
			return {
				lists:[],
				test: '',
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
			_this.getWord();
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			// 跳转
			goTo(url){
				_this.linkTo.navTo(url)
			},
			// 获取助记词
			getWord(){
				_this.get('api/word')
				.then(res => {
					_this.lists = res.data.res.res;
					_this.$store.commit('SET_WORDS',res.data.res);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

	.contentBox {
		@include bg();
		height: 100%;
		.content{
			padding-top: 72rpx;
			box-sizing: border-box;
		}
		.tips {
			@include mainCol();
			@include font30();
			padding-bottom:70rpx;
			text-align: center;
			font-family: 'PingFang-SC-Regular';
			box-sizing: border-box;
		}

		.wordItem {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin: 0 30rpx;
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
				border-radius: 240rpx;
				color: #fff;
				font-size: 24rpx;
			}
		}

		.saveTo {
			@include mainCol();
			@include borCol();
			@include font24();
			position: fixed;
			left: 124rpx;
			right: 124rpx;
			bottom: 82rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 6rpx;
			background-color: #260300;
		}
	}
</style>
