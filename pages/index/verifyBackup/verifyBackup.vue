<template>
	<view class="containerBox">
		<tabTop :title="languageInfo.testBackups" left-icon="back" :open='false'/>
		<view class="content">
			<view class="backups-top">
				<text class="backups-text">{{languageInfo.testBackupsVal}}</text>
			</view>
			<view class="push-box">
				<view class="list" v-for="(item,index) in pushLists" :key='item.id' @tap="hide(index)">
					<text class="itemTxt">{{item.word}}</text>
					<!-- <view class="hide" v-if="item" @tap="hide(index)">X</view> -->
				</view>
			</view>
			<view class="push-box show-box">
				<view class="list" v-for="(item,index) in showLists" v-if="index < 12 && item" :key='item.id' @tap="push(index)">
					<text class="itemTxt">{{item.word}}</text>
				</view>
			</view>
		</view>
		<button class="btns" hover-class="nont" @tap="next">{{languageInfo.complete}}</button>
	</view>
</template>

<script>
	import tabTop from '@/components/tabTop.vue';
	var _this;
	export default{
		components: {tabTop},
		data(){
			return{
				languageInfo:{},
				pushLists:[],
				showLists:[]
			}
		},
		onLoad(){
			_this = this
		},
		onShow(){
			_this.languageInfo = _this.linkTo.showLanguage();
		},
		onReady(){
			_this.getWord();
		},

		methods:{
			// 跳转
			goTo(url){
				_this.linkTo.navTo(url)
			},
			getWord(){
				if(!_this.$store.state.words.res) return;
				const lists = JSON.parse(JSON.stringify(_this.$store.state.words.res));
				console.log(lists)
				let len = lists.length;
				let temp = lists.length
				const newArr = [];
				for(let i =0;i<len;i++){
					const index = Math.floor(Math.random() * temp);
					temp --;
					newArr.push(lists[index]);
					lists.splice(index,1);
				}
				// this.pushLists = this.$store.state.words.res;
				_this.showLists = newArr;
			},
			push(index){
				if(_this.pushLists.length > 11) return;
				_this.showLists[index].index= index;
				console.log(_this.showLists[index])
				_this.pushLists.push(_this.showLists[index]);
				console.log(_this.pushLists)
				delete _this.showLists[index];
			},
			hide(index){
				const len = _this.showLists.length;
				if(!len){
					_this.showLists.push(_this.pushLists[index]);
					return
				};
				const oldIndex = _this.pushLists[index].index;
				_this.$set(_this.showLists,oldIndex,_this.pushLists[index]);
				_this.$nextTick(()=>{
					_this.pushLists.splice(index,1)
				})
				
			},
			postRegister(){
				const len = _this.pushLists.length;
				let word = '';
				for(let i=0;i<len;i++){
					if(i === len -1 ){
						word+= _this.pushLists[i].id;
					}else{
						word+= _this.pushLists[i].id + ',';
					}
				};
				const data = {
					word,
					word_id:_this.$store.state.words.word_id,
					nickname:_this.$store.state.formData.walletName,
					password:_this.$store.state.formData.pwd,
					payment_password:_this.$store.state.formData.payPwd,
					confirm_password:_this.$store.state.formData.confirPwd,
					confirm_payment_password:_this.$store.state.formData.confirPayPwd,
					sgy_address:_this.$store.state.formData.sgy_address,
					imei:uni.getStorageSync('uuid'),
				}
				_this.post('api/register',data).then(res => {
					let token = res.data.res.token
					console.log(token)
					uni.setStorageSync('token',token)
					uni.showToast({
						icon:'success'
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"../index"
						});
					},500)
				})
			},
			next(){
				const len = _this.pushLists.length;
				if(len < 12){
					uni.showToast({
						title:_this.languageInfo.Incorrect,
						icon:'none'
					});
					return
				}
				for(let i =0;i<len;i++){
					if(_this.pushLists[i].id !== _this.$store.state.words.res[i].id){
						uni.showToast({
							title:_this.languageInfo.Incorrect,
							icon:'none'
						});
						return
					}
				};
				_this.postRegister();
			}
		}
	}
</script>

<style lang="scss">
	.containerBox{
		height: 100vh;
		@include bg();
		.content{
			height: 100%;
			padding: 52rpx 36rpx;
			box-sizing: border-box;
			// @include cen();
			flex-direction: column;
			.backups-top{
				width: 100%;
				@include font(30rpx,#FFDA7D);
				box-sizing: border-box;
				text-align: center;
			}
		}
		.push-box{
			// @include size(680rpx,360rpx,none);
			@include bgCol();
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			// margin: 0 30rpx;
			box-sizing: border-box;
			// width: 100%;
			height: 360rpx;
			border-radius: 10rpx;
			padding: 34rpx 0;
			margin-top: 28rpx;
			// box-sizing: border-box;
			.list{
				// position: relative;
				width: 33.3%;
				text-align: center;
				margin-bottom: 26rpx;
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
			.hide{
				position: absolute;
				// border: 1rpx solid #fff;
				box-sizing: border-box;
				width: 30rpx;
				height: 30rpx;
				// @include size(30rpx,30rpx,none);
				border-radius: 50%;
				right: 0;
				top: -15rpx;
				font-size: 18rpx;
				@include cen()
			}
		}
		.push-box>view:nth-of-type(3n+1){
			// margin-left: 41rpx;
		}
		.show-box{
			background: none;
			padding-top: 17rpx;
			// .list:before{
			// 	display: none;
			// }
		}
		.list{
			// width: 33%;
			// text-align: center;
			// margin-bottom: 28rpx;
			// // @include size(160rpx,50rpx,none);
			// // width: 150rpx;
			
			// // padding: 0 32rpx;
			// height: 50rpx;
			// // box-sizing: border-box;
			// @include borCol();
			// border-radius: 25rpx;
			// @include font(24rpx,#fff);
			// @include cen();
			// box-sizing: border-box;
			// margin-top: 32rpx;
			// margin-left: 60rpx;
			// float: left;
		}
		.btns{
			@include font(24rpx,#FFDA7D);
			@include borCol();
			position: fixed;
			left: 124rpx;
			right: 124rpx;
			bottom: 82rpx;
			height: 70;
			line-height: 70rpx;
			border-radius: 6rpx;
			@include bgCol();
		}
	}
</style>
