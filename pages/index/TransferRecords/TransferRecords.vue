<template>
	<view class="containerBox">
		<tab-top left-icon="back" :title="languageInfo.transferRecord"></tab-top>
		<view class="content">
			<view class="topBox">
				<view class="setItem">
					<image src="@/static/index/icon36.png" class="icon36"></image>
					<view class="setItemBox">
						<text>{{languageInfo.transferRecord}}</text>
					</view>
				</view>
			</view>
			<!-- 列表 -->
			<view class="listBox">
				<view class="itemTit">
					<text class="titItems">{{languageInfo.times}}</text>
					<text class="titItems">{{languageInfo.amount}}</text>
				</view>
				<scroll-view scroll-y="true" class="scrollHeight" @scrolltolower="getMore">
					<view class="listItem" v-for="(item,index) in lists" :key='index'>
						<text class="items">{{item.create_time}}</text>
						<text class="items" v-if="item.currency_id=='3'">-{{item.num}} PDT</text>
						<text class="items" v-else>-{{item.num}} USDT</text>
					</view>
					<view class="tipTxt" v-if="lists.length==0">{{languageInfo.noData}}</view>
					<view class="loading-text" v-if="loadingType==1">{{languageInfo.theEnd}}</view>
				</scroll-view>
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
				loadingType:0,
				page:1,
				rowNum:20,
				total:0,
				lists:[],
				languageInfo: {}
			}
		},
		components: {
			tabTop
		},
		onLoad(){
			_this = this
		},
		onShow(){
			_this.getList()
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		methods: {
			getList(){
				let data={
					page:1,
					rowNum:_this.rowNum,
				}
				_this.get('api/transferList',data).then(res=>{
					let datas = res.data.res.data
					if(datas.length>0){
						_this.lists = datas
						_this.total = res.data.res.total
					}
				})
			},
			// 上拉加载更多
			getMore(){
				let total = _this.total
				let currPage = _this.rowNum
				if(parseInt(total)>parseInt(currPage)){
					let page = _this.page
					page++
					uni.showNavigationBarLoading(); //显示加载动画
					let data = {
						page: page,
						rowNum: _this.rowNum
					}
					_this.get('api/transferList', data).then(res => {
						if (res.data.res.data.length == 0) {
							_this.loadingType = 1;
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						} else {
							_this.page++
							_this.lists = _this.lists.concat(res.data.res.data); //将数据拼接在一起
							uni.hideNavigationBarLoading(); //关闭加载动画
						}
					
						_this.loadingType = 0; //将loadingType归0重置
					
					})
				}else{
					_this.loadingType = 1
					return
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
	.content{
		height: 100%;
		overflow-y: auto;
		padding: 30rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		.topBox{
			@include cen();
			padding-top: 88rpx;
			padding-bottom: 64rpx;
			box-sizing: border-box;
		}
		.setItem{
			@include flexBet();
			position: relative;
			z-index: 1;
			margin-left: 30rpx;
		}
		.setItemBox{
			width: 276rpx;
			height: 80rpx;
			line-height: 80rpx;
			// padding: 0 20rpx 0 78rpx;
			@include borCol();
			@include mainCol();
			@include font24();
			background-color: #260300;
			border-radius: 6rpx;
			text-align: center;
			box-sizing: border-box;
		}
		.icon36{
			width: 118rpx;
			height: 148rpx;
			position: absolute;
			z-index: 2;
			left: -70rpx;
			bottom: -6rpx;
		}
		// 列表
		.listBox{
			@include bgCol();
			@include borCol();
			border-bottom: none;
			border-radius: 6rpx;
			.scrollHeight{
				width: 100%;
				// min-height: 300rpx;
				flex: 1;
				height: calc(100vh - 416rpx);
			}
			.itemTit{
				@include flexBet();
				@include mainCol();
				@include font24();
				height: 70rpx;
				border-bottom: 1rpx solid #FFDA7D;
				.titItems{
					width: 50%;
					text-align: center;
				}
			}
			.listItem{
				@include flexBet();
				@include colF();
				@include font20();
				height: 70rpx;
				border-bottom: 1rpx solid #FFDA7D;
				.items{
					width: 50%;
					text-align: center;
				}
			}
		}
	}
</style>
