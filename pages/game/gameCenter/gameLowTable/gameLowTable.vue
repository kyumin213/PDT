<template>
	<view class="gameContent">
		<!-- 顶部信息 -->
		<view class="topBarBox">
			<view class="autoGameBox">
				<!-- 自动游戏 -->
				<text class="autoGameTitle">{{languageObj.automaticGames}}</text>
				<view class="autoGameSwitchBox" @tap="autoGameSwitch">
					<!-- 关闭 -->
					<text class="OFF">{{languageObj.OFF}}</text>
					<!-- 开启 -->
					<text class="ON">{{languageObj.ON}}</text>
					<image :style="{left:!autoGameOn?'0rpx':'65rpx'}" class="switchBtn" src="../../../../static/game/gameCenter/switchBtn.png"></image>
				</view>
			</view>
			<view class="topBarIndex">
				<view class="goldBox">
					<view class="centerBox">
						<image class="leftImg" src="../../../../static/game/gameCenter/POOGold.png"></image>
						<text class="number">{{pooNum}}</text>
					</view>
					<view class="rightBox">
						<image class="leftImg" src="../../../../static/game/gameCenter/klGold.png"></image>
						<text class="number">{{klNum}}</text>
					</view>
				</view>
			</view>
			<image @tap="leaveGame = true;" class="leaveGame" src="../../../../static/game/gameCenter/leave.png"></image>
		</view>
		<!-- 礼花 -->
		<sanshuiFireworks v-if="successfulAuction"></sanshuiFireworks>
		<view class="userBox">
			<view v-show="userBoxAllShow" class="outMainUserBox" :class="['position'+(index+1),!showUsers?'positionout'+(index+1):'']" v-for="(item,index) in player">
				<view class="userInfoBox" :class="[currentLight == index+1 && gameingBox && award!=null ?'lightUser':'',index+1 == award && showAnimate?'zwyHover1 zwyHover2 lightUserGet':'']"
				 >
				 <!-- :style="{opacity:currentLight == item && showAnimate?'1':''}" -->
				 <!-- 游戏用户 -->
					<view class="topBg">{{languageObj.gameUsers}}</view>
					<view class="btmBox">
						<text>{{item.nickname}}</text>
						<view class="moneyBox">
							<image src="../../../../static/game/gameCenter/POOGold.png"></image>
							<view class="money">100</view>
						</view>
					</view>
					<view v-if="userWagerBoxShow" :class="[index+1 ==4 || index+1 == 5?'leftRewardBox':'rightRewardBox']">
						<view class="multipleBox">
							<text>X1</text>
							<image src="../../../../static/game/gameCenter/gameLowTable/multipleIcon.png"></image>
						</view>
						<!-- <view class="rewardBox">
							<image src="../../../../static/game/gameCenter/klGold.png"></image>
							<text class="money">100</text>
						</view> -->
					</view>
					<view class="borderOuter"></view>
				</view>
			</view>
		</view>
		<!-- 中间部分 -->
		<view class="middleBox">
			<!-- 开始下注 -->
			<view v-show="startWager" class="startWagerBox">
				<view class="startWagerButton">
					<!-- 开始下注 -->
					<text>{{languageObj.startBetting}}</text>
				</view>
				<view class="clockBox">
					<view class="clockItem">
						<text>{{startWagerTime}}</text>
					</view>
					<!-- 下注中 -->
					<text class="Wagering">{{languageObj.betsAreOn}}</text>
				</view>
			</view>
			<!-- 匹配中 -->
			<view v-show="matching" class="gameingBox">
				<view class="gameingButton">
					<!-- 匹配中 -->
					<text>{{languageObj.matching}}</text>
				</view>
			</view>
			<!-- 下注 100 选择 -->
			<view v-show="startWagerSelectBox" class="startWagerSelectBox">
				<view class="startWagerButton">
					<!-- 下注 -->
					<text>{{languageObj.wager}}</text>
				</view>
				<view class="startWagerButton">
					<text>100</text>
				</view>
			</view>
			<!-- 停止下注 -->
			<view v-show="endWagerBox" class="endWagerBox">
				<view class="endWagerButton">
					<!-- 停止下注 -->
					<text>{{languageObj.stopBetting}}</text>
				</view>
			</view>
			<!-- 游戏进行中 -->
			<view v-show="gameingBox" class="gameingBox">
				<view class="gameingButton">
					<!-- 游戏进行中 -->
					<text>{{languageObj.gameInProgress}}</text>
				</view>
			</view>
			<!-- 竞拍成功 -->
			<view v-show="successfulAuction" class="mineInfo popUpOut" :class="[successfulAuction?'showPopUp':'']">
				<!-- 右上角关闭按钮 -->
				<view class="closeBtn" @tap="successfulAuctionTap"></view>
				<view class="popTitle">
					<!-- 竞拍成功 -->
					<text>{{languageObj.successfulAuction}}</text>
				</view>
				<view class="scrollBox auctionBox">
					<view class="auctionMoneyBox">
						<text style="margin-right: 12rpx;">{{auctionMoney}}</text>
						<text>{{auctionCurrency}}</text>
					</view>
					<!-- 恭喜 竞拍成功-->
					<view class="auctionUserBox">
						{{languageObj.congratulations}} {{auctionUser}} {{languageObj.successfulAuction}}
					</view>
				</view>
			</view>
			<!-- 奖品结算 -->
			<view v-show="settlement" class="mineInfo popUpOut" :class="[settlement?'showPopUp':'']">
				<!-- 右上角关闭按钮 -->
				<!-- <view class="closeBtn" @tap="settlement = false"></view> -->
				<view class="popTitle">
					<!-- 奖品结算 -->
					<text>{{languageObj.prizeSettlement}}</text>
				</view>
				<view class="scrollBox settlementBox">
					<view class="topBox">
						<!-- 我的奖品 -->
						<text>{{languageObj.myPrize}}</text>
						<text>{{myPrize}} {{myCurrency}}</text>
					</view>
					<view class="bottomBox">
						<!-- 其余奖品 -->
						<view class="title">{{languageObj.otherPrizes}}</view>
						<view class="prizeListBox">
							<view class="prizeItemBox" v-for="item in outherPrizeList">
								<image v-show="item.currency == 'KL'" style="margin: 0 5rpx;" class="prizeImg" src="../../../../static/game/gameCenter/klGold.png"></image>
								<image v-show="item.currency == 'POO'" class="prizeImg prizeImg2" src="../../../../static/game/gameCenter/POOGold.png"></image>
								<!-- <view class="prizeImg"></view> -->
								<text class="prizeMoney">{{item.award}} {{item.currency}}</text>
							</view>
						</view>
					</view>
					<view class="btnsBox">
						<view @tap="gameContinue" class="btns">
							<!-- 继续游戏 -->
							<text>{{languageObj.continue}}</text>
							<text v-show="secondNumShow" class="secondNum">{{secondNum}}S</text>
						</view>
						<!-- 不玩了休息一下 -->
						<view @tap="leaveGameTap" class="btns">
							{{languageObj.sitBack}}
						</view>
					</view>
				</view>
			</view>

			<!-- 离开游戏 -->
			<view v-show="leaveGame" class="mineInfo popUpOut" :class="[leaveGame?'showPopUp':'']">
				<!-- 右上角关闭按钮 -->
				<view class="closeBtn" @tap="leaveGame = false"></view>
				<view class="popTitle">
					<!-- 离开游戏 -->
					<text>{{languageObj.leave}}</text>
				</view>
				<view class="scrollBox leaveGameBox">
					<!-- 确定离开游戏 -->
					<view class="leaveGameTitle">
						{{languageObj.MakeSureToLeave}}
					</view>
					<view class="btnsBox">
						<view @tap="leaveGameTap" class="btns">
							<!-- 确定 -->
							<text>{{languageObj.confirm}}</text>
						</view>
						<!-- 再玩一会 -->
						<view @tap="leaveGame = false;" class="btns">
							{{languageObj.playMore}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 错误提示 -->
		<view class="errorTipsBox" v-show="errorTips">
			<text>{{errorText}}</text>
		</view>
	</view>
</template>

<script>
	import sanshuiFireworks from "@/components/sanshui-fireworks/index";
	export default {
		components: {
			sanshuiFireworks
		},
		data() {
			return {
				player: [{"uid":4,"fd":0,"nickname":"prx","award":50,"currency":"KL"},{"uid":"6","fd":18,"nickname":"ewqewqewqewqewqeqweqwe","award":"9.75","currency":"POO"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"\ubc18\u6674N\u82b1e\u6674c"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"C\u79d2e\u82b1V\u6c34q"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"\u30baj\ub300x\u4e50\u6708\u6674A\ub300"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"xDWU\u9633\u6708\u4e86"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"j\u308axu\u6b64\u308a"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"\u8865\u3092\u6570\u9093ml"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"\u706ba\u9999z\u7f8e\u65b9A\u6570h"},{"uid":0,"fd":0,"award":"9.75","currency":"POO","nickname":"\u5bf9y\ud305g\ub300\u5b88\u4e2d\u6674Z"}], //玩家
				pooNum: '0', // poo
				klNum: '0', // kl
				startWagerTime: 10, // 开始下注倒计时
				startWager: false, //开始下注
				startWagerInterval:null,// 开始下注倒计时
				startWagerSelectBox: false, // 下注 100 选择
				endWagerBox: false, // 停止下注
				gameingBox: false, // 游戏进行中
				currentLight: 1, // 当前索引值
				speed: 1000, // 时间->速度
				diff: 200, // 加速基数
				slowDiff: 250, // 减速基数
				award: null, // 中奖的人
				time: 0, // 当前时间戳
				timer: null, // 定时器
				minRunNum: 60, // 最少移动
				currentRunNum: 0, // 当前移动次数
				showAnimate: false, //显示中奖动画
				successfulAuction: false, //竞拍成功弹窗
				successfulAuctionTimeout:null,// 竞拍成功TimeOut
				auctionUser: '', //竞拍成功用户
				auctionMoney: '', //竞拍成功奖励
				auctionCurrency: '', //竞拍币种
				settlement: false, // 奖品结算
				myPrize:'',// 我的奖品
				outherPrizeList:[],//其余奖品
				myCurrency:'',// 我的奖品币种
				secondNum: 5, //继续游戏倒计时
				secondNumShow:true,//继续游戏倒计时显示隐藏
				countDownInterval: null, // 倒计时interve
				leaveGame: false, //离开游戏弹窗
				autoGameOn: true, //自动游戏开关
				errorTips: false, // 错误提示框显示隐藏
				errorText: '', // 错误提示内容
				is_open_socket: false, // socket是否正常打开
				matching: true, // 匹配中显示隐藏
				showUsers:false,//显示所有用户
				userBoxAllShow:false,// 显示所有用户动画开关
				userWagerBoxShow:true,// 用户下注信息显示
				myId:'',// 用户ID
				languageObj:'',// 语言
				timeOut1:null,
				timeOut2:null,
				isFirst:true,
			}
		},
		onShow() {
			this.getUserCurrency()
			if(getApp().globalData.runing && this.successfulAuction != true && this.settlement != true){
				this.musicControl.runingPlay()
			}
			// 获取是否自动游戏
			let autoOn = uni.getStorageSync('autoGameOn')
			if(autoOn === ''|| autoOn == undefined || autoOn == null){
				uni.setStorageSync('autoGameOn',this.autoGameOn)
			}else{
				this.autoGameOn = autoOn
			}
		},
		onHide() {
			this.musicControl.runingStop()
			this.musicControl.winMusicStop()
		},
		onLoad(option) {
			// 获取语言
			let lgeType = uni.getStorageSync('lang')
			if(lgeType == 'zh-cn'){
				this.languageObj = this.language2.ChinaLanguage
			}else{
				this.languageObj = this.language2.EnglisghLanguage
			}
			uni.setKeepScreenOn({
			    keepScreenOn: true
			});
			this.is_open_socket = option.socket
			// 第一次游戏
			if (this.is_open_socket) {
				this.startGameFun('first')
			}
			
			if(this.mainSocketTask != null){
				this.createSockeMessage()
			}
			setTimeout(()=>{
				getApp().globalData.runing = uni.createInnerAudioContext()
				getApp().globalData.runing.volume = 0.4
				getApp().globalData.runing.loop = true
				getApp().globalData.runing.src = '../../../../static/game/gameCenter/runing.mp3'
				this.musicControl.runingMInit()
				this.musicControl.runingPlay()
			},1000)
		},
		onUnload() {
			uni.setKeepScreenOn({
			    keepScreenOn: false
			});
			this.closeSocket()
			clearTimeout(this.timer);
			clearInterval(this.countDownInterval)
			clearTimeout(this.timeOut2)
			clearTimeout(this.timeOut1)
			if(getApp().globalData.winMusic){
				this.musicControl.winMusicStop()
				getApp().globalData.winMusic.destroy()
				getApp().globalData.winMusic = null
			}
			
			if(getApp().globalData.runing){
				this.musicControl.runingStop()
				getApp().globalData.runing.destroy()
				getApp().globalData.winMusic = null
			}
		},
		mounted() {},
		beforeDestroy() {
			// 清除interval
			clearTimeout(this.timer);
			this.closeSocket()
			clearInterval(this.countDownInterval)
			this.secondNumShow = false
			this.countDownInterval = null
			this.secondNum = 5
		},
		methods: {
			leaveGameTap() {
				this.closeSocket()
				// this.musicControl.tapMusicPlay()
				// getApp().globalData.tapMusic.play()
				// 清除interval
				clearInterval(this.countDownInterval)
				this.secondNumShow = false
				this.countDownInterval = null
				this.secondNum = 5
				clearTimeout(this.timer);
				this.closeSocket()
				// 离开游戏
				uni.navigateBack({
					delta: 1
				});
			},
			// 开始抽奖
			start() {
				this.time = Date.now();
				this.move();
			},
			// 开始转动
			move() {
				this.timer = setTimeout(() => {
					this.currentLight++;
					this.currentRunNum++
					if (this.currentLight > 10) {
						this.currentLight = 1;
					}
					// 若抽中的奖品id存在，且大于或等于最少转动次数则开始减速转动
					if (this.award && this.currentRunNum - (this.award) >= this.minRunNum && (Date.now() - this.time) / 1000 > 2) {
						if(this.award>3){
							if (this.award-this.currentLight <= 4 && this.award-this.currentLight>0) {
								this.speed += this.slowDiff; // 转动减速
							}
						}else{
							if (this.award-this.currentLight <= -6) {
								this.speed += this.slowDiff; // 转动减速
							}
						}
						// 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来
						if (
							(Date.now() - this.time) / 1000 > 4 &&
							this.award == this.currentLight && this.currentRunNum >= this.minRunNum
						) {
							clearTimeout(this.timer);
							// 结束
							this.currentRunNum = 0
							this.musicControl.runingStop()
							// getApp().globalData.runingMusic.stop()
							setTimeout(() => {
								this.showAnimate = true
								getApp().globalData.winMusic = uni.createInnerAudioContext()
								getApp().globalData.winMusic.volume = 0.4
								getApp().globalData.winMusic.src = '../../../../static/game/gameCenter/winMusic.mp3'
								this.musicControl.winMusicMInit()
								this.musicControl.winMusicPlay()
								getApp().globalData.winMusic.onEnded(()=>{
									this.musicControl.runingPlay()
								})
								// getApp().globalData.winMusic.play()
								setTimeout(() => {
									this.showAnimate = false
									this.successfulAuction = true
									this.successfulAuctionTimeout = setTimeout(()=>{
										// 隐藏用户下注信息
										this.showSettlementBox()
									},6000)
								}, 2000)
							}, 1000)
							return;
						}
					} else {
						// 若抽中的奖品不存在，则加速转动
						this.speed -= this.diff;
						if (this.speed < 50) {
							this.speed = 50
						}
					}
					this.move();
				}, this.speed);
			},
			// 继续游戏倒计时
			countDown() {
				this.secondNumShow = true
				this.countDownInterval = setInterval(() => {
					let second = this.secondNum
					second--
					if (second == 0) {
						// 倒计时结束
						// 清除interval
						clearInterval(this.countDownInterval)
						this.secondNumShow = false
						this.countDownInterval = null
						this.secondNum = 5
						// 自动继续游戏
						if(this.autoGameOn){
							this.gameContinue()
						}
					} else {
						this.secondNum = second
					}
				}, 1000)
			},
			// 点击继续
			gameContinue(){
				if(this.secondNumShow){
					return
				}
				this.userWagerBoxShow = false
				// 自动游戏
				// 关闭继续游戏倒计时
				// 关闭倒计时
				// 清除interval
				clearInterval(this.countDownInterval)
				this.secondNumShow = false
				this.countDownInterval = null
				// this.musicControl.tapMusicPlay()
				this.luckInit()
				this.gameingBox = false
				this.settlement = false
				this.matching = true
				this.startGameFun('second')
			},
			// 抽奖初始化方法
			luckInit(){
				this.currentLight= 1 // 当前索引值
				this.speed= 1000 // 时间->速度
				this.diff= 150 // 加速基数
				this.slowDiff= 250 // 减速基数
				this.award= null // 中奖的人
				this.time= 0 // 当前时间戳
				this.timer= null // 定时器
				this.minRunNum= 40 // 最少移动
				this.currentRunNum= 0 // 当前移动次数
			},
			// 开始游戏的方法
			startGameFun(gameType){
				if(gameType != 'first'){
					this.closeSocket()
					// console.log('发送一次');
					// 连接WebSocket
					this.openSocket()
					// 监听连接打开
					this.mainSocketTask.onOpen((res) => {
						// console.log('发送消息');
						this.is_open_socket = true;
						let token = uni.getStorageSync('token')
						let language = uni.getStorageSync('lang')
						let type = 1
						let params = 'token=' + token +'&lang='+ language +'&type='+ type
						// 注：只有连接正常打开中 ，才能正常成功发送消息
						this.mainSocketTask.send({
							data: params,
							async success() {
							},
						});
						this.createSockeMessage()
						// 注：只有连接正常打开中 ，才能正常收到消息
						// this.mainSocketTask.onMessage((res) => {
						// 	console.log('相应1');
						// 	let resData = JSON.parse(res.data)
						// 	if(resData.error == 0){
						// 		this.matching = true
						// 		this.timeOut1 = setTimeout(()=>{
						// 			console.log('触发了延时socket1');
						// 			this.isFirst = false
						// 			this.gameStartSocket('')
						// 		},600000)
						// 	}else if(resData.hasOwnProperty('winner')){
						// 		console.log('提前返回2');
						// 		this.gameStartSocket(res)
						// 	}else{
						// 		var pages = getCurrentPages(); //当前页面栈  
						// 		var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象  
						// 		beforePage.$vm.showErrorTips(resData.msg); //触发父页面中的方法change()  
						// 		this.closeSocket()
						// 		uni.navigateBack({
						// 			delta: 1
						// 		});
						// 	}
						// });
					})
				}else{
					if(this.mainSocketTask != null){
						this.timeOut2 = setTimeout(()=>{
							// console.log('触发了延时socket2');
							this.isFirst = true
							this.gameStartSocket(true)
						},5000)
					}
				}
			},
			// create socket消息监听
			createSockeMessage(){
				// console.log('创建消息监听');
				// 注：只有连接正常打开中 ，才能正常收到消息
				this.mainSocketTask.onMessage((res) => {
					let resData = JSON.parse(res.data)
					if(resData.error == 0){
						console.log('响应权限');
						this.matching = true
						this.timeOut1 = setTimeout(()=>{
							// console.log('触发了延时socket1');
							this.isFirst = false
							this.gameStartSocket(false)
						},5000)
					}else if(resData.hasOwnProperty('winner')){
						console.log('响应winner');
						clearTimeout(this.timeOut1)
						clearTimeout(this.timeOut2)
						this.gameStartSocket(res)
					}else{
						console.log('响应没有权限');
						var pages = getCurrentPages(); //当前页面栈  
						var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象  
						beforePage.$vm.showErrorTips(resData.msg); //触发父页面中的方法change()  
						this.closeSocket()
						uni.navigateBack({
							delta: 1
						});
					}
				});
			},
			// 参数标识是否是第一次
			// 如果第一次就从开始下注展示
			// 如果不是第一次就从匹配中开始
			gameStartSocket(res){
				let token = uni.getStorageSync('token')
				let language = uni.getStorageSync('lang')
				let type = 2
				let params = 'token=' + token + '&lang=' + language + '&type=' + type
				if(typeof res == 'boolean'){
					// console.log('不等空');
					if(res === true){
						// console.log('正常请求1');
						// 注：只有连接正常打开中 ，才能正常成功发送消息
						this.mainSocketTask.send({
							data: params,
							async success() {
							},
						});
					}else{
						// console.log('正常请求2');
						// 注：只有连接正常打开中 ，才能正常成功发送消息
						this.mainSocketTask.send({
							data: params,
							async success() {
							},
						});
					}
				}else{
					let resData = JSON.parse(res.data)
					if ( resData.hasOwnProperty('winner')) {
						// console.log('得到赢家');
						this.onMessageStart(res)
					}
				}
			},
			onMessageStart(res){
					this.closeSocket()
					let isFirst = this.isFirst
					let resData = JSON.parse(res.data)
					if (resData.hasOwnProperty('winner')) {
						// 随机座位
						let winnerDask = Math.floor(Math.random() * 10); // 赢家座位
						this.award = winnerDask + 1
						let playerDask = []
						for(let i in resData.losser){
							playerDask.push(resData.losser[i])
						}
						if (winnerDask != 9) {
							playerDask.splice(winnerDask, 0, resData.winner[0]);
						} else {
							playerDask.push(resData.winner[0]);
						}
						this.player = playerDask
						this.auctionUser = resData.winner[0].nickname //竞拍成功用户
						this.auctionMoney = resData.winner[0].award //竞拍成功奖励
						this.auctionCurrency = resData.winner[0].currency //竞拍币种
						this.closeSocket()
						if(isFirst == true){
							this.showUsers = true
							this.userBoxAllShow = true
							//游戏进行中
							setTimeout(() => {
								this.matching = false
								this.gameingBox = true
								setTimeout(()=>{
									this.start()
								},1000)
							}, 4000)
						}else{
							this.matching = false
							this.startToGaming()
						}
					}
			},
			// 开始下注 -> 游戏中流程
			startToGaming(){
				// 开始下注
				this.showUsers = true
				this.startWager = true
				getApp().globalData.timeMusic = uni.createInnerAudioContext()
				getApp().globalData.timeMusic.loop = true
				getApp().globalData.timeMusic.src = '../../../../static/game/gameCenter/timeMusic.mp3'
				this.musicControl.timeMusicMInit()
				// getApp().globalData.tapMusic.stop()
				this.musicControl.timeMusicPlay()
				// getApp().globalData.timeMusic.play()
				this.startWagerInterval = setInterval(() => {
					let second = this.startWagerTime
					second--
					if (second == 0) {
						this.musicControl.timeMusicStop()
						this.musicControl.runingPlay()
						// getApp().globalData.timeMusic.stop()
						// 倒计时结束
						// 清除interval
						clearInterval(this.startWagerInterval)
						this.startWagerInterval = null
						this.startWagerTime = 10
						// 关闭开始下注 显示 下注 100
						this.startWager = false
						this.startWagerSelectBox = true
						setTimeout(() => {
							// 关闭下注 100 显示用户下注信息 打开停止下注
							this.userWagerBoxShow = true
							this.startWagerSelectBox = false
							this.endWagerBox = true
							setTimeout(()=>{
								// 关闭下停止下注 打开游戏进行中
								this.endWagerBox = false
								this.gameingBox = true
								setTimeout(()=>{
									this.start()
								},1000)
							},3000)
						}, 3000)
					} else {
						this.startWagerTime = second
					}
				}, 1000)
			},
			autoGameSwitch() {
				this.autoGameOn = !this.autoGameOn
				uni.setStorageSync('autoGameOn',this.autoGameOn)
				// 在结算界面打开自动游戏
				if(this.autoGameOn && this.settlement){
					this.gameContinue()
				}
				if(!this.autoGameOn && this.settlement){
					clearInterval(this.countDownInterval)
					this.secondNumShow = false
					this.countDownInterval = null
					this.secondNum = 5
				}
			},
			// 调用用户资产接口 pdt kl
			getUserCurrency() {
				this.get('api/userCurrency', '',false).then(res => {
					if (res.data.code == 200) {
						let info = res.data.res
						info.map(item => {
							if (item.currency_name == 'KL') {
								this.klNum = this.parsNum(item.num)
							}
							if (item.currency_name == 'POO') {
								this.pooNum = this.parsNum(item.num)
							}
						})
					} else {
						this.showErrorTips(res.data.message)
					}
				})
			},
			// 错误提示框显示
			showErrorTips(text) {
				this.errorText = text
				this.errorTips = true
				setTimeout(() => {
					this.errorTips = false
				}, this.errorDtime)
			},
			// 显示结算并开始倒计时
			showSettlementBox(){
				// 查询我的奖励
				this.outherPrizeList = []
				if(this.myId === ''){
					this.myId = uni.getStorageSync('_USERID')
				}
				console.log('我的id',this.myId);
				this.player.map(item=>{
					// console.log('遍历id',item.uid,this.myId);
					if(item.uid == this.myId){
						// console.log('匹配ID',item.uid);
						this.myPrize = item.award
						this.myCurrency = item.currency
					}else{
						this.outherPrizeList.push(item)
					}
				})
				// 更新当前余额
				this.getUserCurrency()
				this.successfulAuction = false
				this.settlement = true
				this.showUsers = false
				setTimeout(()=>{
					this.userWagerBoxShow = false
				},2000)
				// this.musicControl.bgmPlay()
				// 判断是否自动开始
				// 开始继续游戏倒计时
				this.countDown()
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				let _this = this
				if(this.mainSocketTask != null){
					this.mainSocketTask.close({
						success(res) {
							// console.log('关闭成功2');
							_this.is_open_socket = false;
						},
						fail(err) {
							console.log(err);
							// console.log('关闭失败2');
						}
					})
				}
			},
			// 竞拍成功提示关闭
			successfulAuctionTap(){
				clearTimeout(this.successfulAuctionTimeout)
				this.showSettlementBox()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goldColor {
		color: #FFF597;
	}

	.gameContent {
		position: fixed;
		top: 50%;
		left: 50%;
		box-sizing: border-box;
		background: #FFFFFF;
		width: 100vh;
		height: 100vw;
		background: url('../../../../static/game/gameCenter/gameLowTable/tableBg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		transform: rotate(90deg) translate(-50%, -50%);
		transform-origin: left top;

		.topBarBox {
			position: relative;

			.autoGameBox {
				position: absolute;
				@include cen();
				left: 42rpx;
				top: 18rpx;

				.autoGameTitle {
					@include font22();
					font-weight: bold;
					color: #FFF8BB;
					text-shadow: 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 1px 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 1px 0px 0 #600606, 1px 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 1px 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 1px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0 0 0 #600606;
				}

				.autoGameSwitchBox {
					width: 132rpx;
					padding: 0 10rpx;
					height: 62rpx;
					margin-left: 10rpx;
					@include cen();
					position: relative;
					background: url(../../../../static/game/gameCenter/buttonRadius.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;

					.ON,
					.OFF {
						width: 50%;
						text-align: center;
						align-items: center;
						@include font22();
						font-weight: bold;
					}

					.ON {
						color: #FFF597;
					}

					.OFF {
						color: #B41B1B;
					}

					.switchBtn {
						width: 84rpx;
						height: 58rpx;
						position: absolute;
						left: 0;
						top: 4rpx;
						transition: .5s;
					}
				}
			}

			.topBarIndex {
				width: 780rpx;
				height: 80rpx;
				box-sizing: border-box;
				padding: 0 100rpx;
				padding-bottom: 10rpx;
				margin: 0 auto;
				background: url('../../../../static/game/gameCenter/topBar.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				@include cen();
				justify-content: space-around;

				.goldBox {
					@include cen();
					margin-left: 32rpx;

					.centerBox {
						@include cen();
						width: 240rpx;
						height: 50rpx;
						background: #500609;
						border-radius: 40rpx;
						box-shadow: inset 0rpx 0rpx 30rpx #2b0104;
						position: relative;
						margin-right: 64rpx;

						.leftImg {
							width: 78rpx;
							height: 61rpx;
							position: absolute;
							left: -45rpx;
							// top: -10rpx;
						}

						.number {
							@include font26() color: #FFF597;
						}
					}

					.rightBox {
						@include cen();
						width: 240rpx;
						height: 50rpx;
						background: #500609;
						border-radius: 40rpx;
						box-shadow: inset 0rpx 0rpx 30rpx #2b0104;
						position: relative;

						.leftImg {
							width: 59rpx;
							height: 56rpx;
							position: absolute;
							left: -36rpx;
							// top: -12rpx;
						}

						.number {
							@include font26() color: #FFF597;
						}
					}
				}
			}

			.leaveGame {
				width: 90rpx;
				height: 90rpx;
				position: absolute;
				right: 43rpx;
				top: 18rpx;
			}
		}

		.userBox {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 0 50rpx;
			position: relative;

			.uTop,
			.uMid,
			.ubottom {
				margin-top: 20rpx;
				@include cen();
				width: 100%;
				height: 120rpx;

			}

			.outMainUserBox {
				display: inline-block;
				height: 128rpx;
				width: 220rpx;
			}

			.userInfoBox {
				display: inline-block;
				height: 108rpx;
				width: 190rpx;
				padding: 6rpx 10rpx 14rpx 10rpx;
				background: rgba(57, 0, 2, 0.8);
				border: 1rpx solid rgba(182, 0, 9, 1);
				border-radius: 10rpx;

				.topBg {
					width: 100%;
					height: 40rpx;
					background: url('../../../../static/game/gameCenter/gameLowTable/cardTop.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					text-align: center;
					line-height: 40rpx;
					color: #FFFFFF;
					@include font20();
					margin: 0 auto;
				}

				.btmBox {
					width: 100%;
					min-height: 68rpx;
					@include flexC();
					flex: 1;
					justify-content: space-around;
					align-items: center;
					color: #FFFFFF;
					@include font24();
					text{
						width: 100%;
						height: 34rpx;
						display: block;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						text-align: center;
					}
					.moneyBox{
						width: 100%;
						@include cen();
						image {
							display: block;
							width: 40rpx;
							height: 30rpx;
							flex-shrink: 0;
							margin-right: 10rpx;
							position: relative;
							top: 2rpx;
						}
						.money{
							display: inline-block;
						}
					}
				}

				.rightRewardBox,
				.leftRewardBox {
					@include flexC();
					justify-content:center;
					width: 120rpx;
					height: 120rpx;
					position: absolute;
					right: -120rpx;
					opacity: 0;
					transform: translateX(-120rpx);
					top: 6rpx;

					.multipleBox {
						@include cen();

						text {
							font-weight: bold;
							font-size: 36rpx;
							background-image: -webkit-linear-gradient(bottom, #FDFFB5, #E9C646);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}

						image {
							width: 53rpx;
							height: 53rpx;
							margin-left: 12rpx;
						}
					}

					.rewardBox {
						@include cen();
						justify-content: flex-start;
						margin-bottom: 16rpx;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-left: 10rpx;
							margin-right: 10rpx;
						}

						text {
							color: #EFD5A3;
							@include font20();
						}
					}
				}

				.leftRewardBox {
					left: -120rpx;
					transform: translateX(120rpx);
					animation: leftRewardBox .5s;
					animation-fill-mode: forwards;
				}
				.rightRewardBox{
					animation: rightRewardBox .5s;
					animation-fill-mode: forwards;
				}
				@keyframes leftRewardBox{
					from{
						transform: translateX(120rpx);
						opacity: 0;
					}
					to{
						transform: translateX(0);
						opacity: 1;
					}
				}
				@keyframes rightRewardBox{
					from{
						transform: translateX(-120rpx);
						opacity: 0;
					}
					to{
						transform: translateX(0);
						opacity: 1;
					}
				}
			}

			.uTop {
				justify-content: space-around;
				margin-bottom: 30rpx;
			}

			.uMid {
				justify-content: space-between;
			}

			.ubottom {
				justify-content: space-around;
				margin-top: 40rpx;
			}
		}

		.middleBox {
			width: 600rpx;
			height: 300rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 9999;

			// 开始下注
			.startWagerBox {
				margin-top: 70rpx;

				.startWagerButton {
					@include cen();
					margin: 0 auto;
					width: 460rpx;
					height: 131rpx;
					background: url('../../../../static/game/gameCenter/gameLowTable/radiusBg.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					font-size: 70rpx;
					font-weight: bold;
					color: #FFF8BB;
					text-shadow: 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 1px 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 1px 0px 0 #600606, 1px 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 1px 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 1px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0 0 0 #600606;
				}

				.clockBox {
					@include cen();
					margin-top: 20rpx;

					.clockItem {
						width: 55rpx;
						height: 59rpx;
						background: url('../../../../static/game/gameCenter/gameLowTable/clock.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						margin-right: 10rpx;

						text {
							display: block;
							text-align: center;
							@include font20();
							padding-top: 24rpx;
							color: #111111;
						}
					}

					.Wagering {
						color: #FFFFFF;
						@include font24();
					}
				}
			}

			// 下注 100 选择
			.startWagerSelectBox {
				@include cen();
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 100%;

				.startWagerButton {
					@include cen();
					margin: 0 auto;
					width: 231rpx;
					height: 100rpx;
					background: url('../../../../static/game/gameCenter/gameLowTable/radiusBg.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					font-size: 48rpx;
					font-weight: bold;
					color: #FFF8BB;
					text-shadow: 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 1px 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 1px 0px 0 #600606, 1px 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 1px 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 1px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0 0 0 #600606;
				}
			}

			// 停止下注
			.endWagerBox {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 100%;

				.endWagerButton {
					@include cen();
					margin: 0 auto;
					width: 460rpx;
					height: 131rpx;
					background: url('../../../../static/game/gameCenter/gameLowTable/radiusBg.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					font-size: 70rpx;
					font-weight: bold;
					color: #FFF8BB;
					text-shadow: 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 1px 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 1px 0px 0 #600606, 1px 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 1px 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 1px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0 0 0 #600606;
				}
			}

			.gameingBox {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 100%;

				.gameingButton {
					@include cen();
					margin: 0 auto;
					width: 460rpx;
					height: 131rpx;
					background: url('../../../../static/game/gameCenter/gameLowTable/radiusBg.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					font-size: 70rpx;
					font-weight: bold;
					color: #FFF8BB;
					text-shadow: 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 1px 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 1px 0px 0 #600606, 1px 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 1px 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 1px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0 0 0 #600606;
				}
			}
		}
	}

	.lightUser {
		border: 1rpx solid rgba(200, 200, 200, 0) !important;
	}

	.userInfoBox>.borderOuter {
		height: 108rpx;
		width: 190rpx;
		padding: 6rpx 10rpx 14rpx 10rpx;
		background-color: rgba(0, 0, 0, 0);
		position: absolute;
		left: 0rpx;
		top: 0rpx;
		border: 6rpx solid rgba(182, 0, 9, 0);
		border-radius: 10rpx;
		transition: .2s;
	}

	.lightUser>.borderOuter {
		border: 4rpx solid #FFFD75;
	}

	.lightUserGet>.borderOuter {
		transition: 0s;
		animation: borderAni 1s infinite;
	}

	@keyframes borderAni {
		0% {
			border-color: #FFFD75;
		}

		20% {
			border-color: rgba(0, 0, 0, 0);
		}

		40% {
			border-color: #FFFD75;
		}

		60% {
			border-color: rgba(0, 0, 0, 0);
		}

		80% {
			border-color: #FFFD75;
		}

		100% {
			border-color: rgba(0, 0, 0, 0);
		}
	}

	.position1 {
		position: absolute;
		top: 20rpx;
		opacity: 0;
		left: 15%;
		animation: positionToprun .8s;
		animation-fill-mode: forwards;
	}
	.positionout1{
			top: 20rpx;
		opacity: 1;
		left: 15%;
		animation: positionToprunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.8s;
	}

	.position2 {
		position: absolute;
		top: 20rpx;
		opacity: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		animation: positionToprun .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.2s;
	}
	.positionout2{
			top: 20rpx;
		opacity: 1;
		left: 0;
		right: 0;
		margin: 0 auto;
		animation: positionToprunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.6s;
	}

	.position3 {
		position: absolute;
		top: 20rpx;
		opacity: 0;
		right: 15%;
		animation: positionToprun .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.4s;
	}
	.positionout3{
			top: 20rpx;
		opacity: 1;
		right: 15%;
		animation: positionToprunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.4s;
	}

	@keyframes positionToprun {
		from {
			top: -100rpx;
			opacity: 0;
		}

		to {
			top: 20rpx;
			opacity: 1;
		}
	}
	
	@keyframes positionToprunout{
		from {
			top: 20rpx;
			opacity: 1;
		}

		to {
			top: -100rpx;
			opacity: 0;
		}
	}

	.position4 {
		position: absolute;
		top: 176rpx;
		right: -100rpx;
		opacity: 0;
		animation: positionRightrun .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.6s;
	}
	.positionout4{
		top: 176rpx;
			right: 50rpx;
		opacity: 1;
		animation: positionRightrunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.2s;
	}

	.position5 {
		position: absolute;
		top: 322rpx;
		right: -100rpx;
		opacity: 0;
		animation: positionRightrun .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.8s;
	}
	.positionout5{
		top: 322rpx;
			right: 50rpx;
		opacity: 1;
		animation: positionRightrunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 1s;
	}
	@keyframes positionRightrun {
		from {
			right: -100rpx;
			opacity: 0;
		}

		to {
			right: 50rpx;
			opacity: 1;
		}
	}

	@keyframes positionRightrunout {
		from {
			right: 50rpx;
			opacity: 1;
		}

		to {
			right: -100rpx;
			opacity: 0;
		}
	}

	.position6 {
		position: absolute;
		top: 478rpx;
		right: 15%;
		transform: translateY(100rpx);
		opacity: 0;
		animation: positionBottomrun .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.2s;
	}
	.positionout6{
		top: 478rpx;
		right: 15%;
			transform: translateY(0);
		opacity: 1;
		animation: positionBottomrunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.8s;
	}

	.position7 {
		position: absolute;
		top: 478rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		transform: translateY(100rpx);
		opacity: 0;
		animation: positionBottomrun .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.4s;
	}
	.positionout7{
		top: 478rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
			transform: translateY(0);
		opacity: 1;
		animation: positionBottomrunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.6s;
	}

	.position8 {
		position: absolute;
		top: 478rpx;
		left: 15%;
		transform: translateY(100rpx);
		opacity: 0;
		animation: positionBottomrun .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.6s;
	}
	.positionout8{
		top: 478rpx;
		left: 15%;
			transform: translateY(0);
		opacity: 1;
		animation: positionBottomrunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.4s;
	}

	@keyframes positionBottomrun {
		from {
			transform: translateY(100rpx);
			opacity: 0;
		}

		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes positionBottomrunout {
		from {
			transform: translateY(0);
			opacity: 1;
		}

		to {
			transform: translateY(100rpx);
			opacity: 0;
		}
	}

	.position9 {
		position: absolute;
		top: 322rpx;
		left: -100rpx;
		opacity: 0;
		animation: positionLeftrun .8s;
		animation-fill-mode: forwards;
		animation-delay: 1.8s;
	}
	.positionout9{
		top: 322rpx;
			left: 50rpx;
		opacity: 1;
		animation: positionLeftrunout .8s;
		animation-fill-mode: forwards;
		animation-delay: 0.2s;
	}

	.position10 {
		position: absolute;
		top: 176rpx;
		left: -100rpx;
		opacity: 0;
		animation: positionLeftrun .8s;
		animation-fill-mode: forwards;
		animation-delay: 2s;
	}
	.positionout10{
		top: 176rpx;
			left: 50rpx;
		opacity: 1;
		animation: positionLeftrunout .8s;
		animation-fill-mode: forwards;
	}


	@keyframes positionLeftrun {
		from {
			left: -100rpx;
			opacity: 0;
		}

		to {
			left: 50rpx;
			opacity: 1;
		}
	}
	@keyframes positionLeftrunout {
		from {
			left: 50rpx;
			opacity: 1;
		}

		to {
			left: -100rpx;
			opacity: 0;
		}
	}

	.mineInfo {
		@include flexC();
		width: 962rpx;
		height: 614rpx;
		background: url('../../../../static/game/gameCenter/popUpBg.png');
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		padding: 44rpx;
		padding-bottom: 64rpx;

		.scrollBox {
			flex: 1;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			overflow: auto;
			position: relative;
		}

		.closeBtn {
			width: 56rpx;
			height: 56rpx;
			position: absolute;
			right: 53rpx;
			top: 51rpx;
			background: url('../../../../static/game/gameCenter/popUpClose.png');
			background-repeat: no-repeat;
			background-size: cover;
		}

		.backBtn {
			width: 56rpx;
			height: 56rpx;
			position: absolute;
			left: 53rpx;
			top: 51rpx;
			background: url('../../../../static/game/gameCenter/popUpBack.png');
			background-repeat: no-repeat;
			background-size: cover;
		}

		.popTitle {
			@include cen();
			width: 100%;
			min-height: 70rpx;
			color: #FFF597;
			font-size: 40rpx;
			font-weight: bold;
		}
	}

	// 竞拍成功
	.auctionBox {
		@include flexC();
		justify-content: center;
		align-items: center;

		.auctionMoneyBox {
			font-size: 45rpx;
			color: #FFFFFF;
			margin-bottom: 30rpx;
		}

		.auctionMoneyBox {
			font-size: 45rpx;
			color: #FFFFFF;
			margin-bottom: 30rpx;
			font-weight: bold;
		}

		.auctionUserBox {
			font-size: 30rpx;
			color: #FFFFFF;
			margin-bottom: 30rpx;
			font-weight: bold;
		}
	}

	// 奖品结算
	.settlementBox {
		padding: 20rpx 50rpx;
		padding-bottom: 0;
		@include flexC();
		.topBox {
			margin-top: 20rpx;
			width: 100%;
			background: #910707;
			box-sizing: border-box;
			padding: 12rpx 34rpx;
			border-radius: 8rpx;
			@include cen();
			justify-content: space-between;
			color: #FFFFFF;
			@include font20();
			margin-bottom: 10rpx;
			font-weight: bold;
		}

		.bottomBox {
			display: inline-block;
			flex: 1;
			background: #910707;
			box-sizing: border-box;
			padding: 20rpx 34rpx;
			border-radius: 8rpx;

			.title {
				color: #FFFFFF;
				@include font20();
				margin-bottom: 20rpx;
				font-weight: bold;
			}

			.prizeListBox {
				width: auto;
				height: 160rpx;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: wrap;
				overflow: auto;

				.prizeItemBox {
					width: 33.3%;
					margin-bottom: 10rpx;
					@include cen();
					justify-content: flex-start;

					.prizeImg {
						width: 40rpx;
						height: 40rpx;
						// background: #FFFFFF;
						border-radius: 8rpx;
					}
					.prizeImg2{
						width: 50rpx;
						height: 40rpx;
					}

					.prizeMoney {
						margin-left: 20rpx;
						margin-right: 37rpx;
						color: #FFFFFF;
						@include font20();
					}
				}
			}
		}

		.leaveGameTitle {
			font-size: 44rpx;
			color: #FFFFFF;
			text-align: center;
			margin-top: 80rpx;
			margin-bottom: 52rpx;
		}
	}

	// 离开游戏
	.leaveGameBox {
		@include flexC();
		justify-content: center;
		padding-bottom: 0;
	}

	.leaveGameTitle {
		font-size: 44rpx;
		color: #FFFFFF;
		text-align: center;
		margin-bottom: 52rpx;
	}

	.btnsBox {
		margin-top: 20rpx;
		@include cen();

		.btns {
			@include cen();
			margin: 0 20rpx;
			width: 211rpx;
			height: 71rpx;
			background: url('../../../../static/game/gameCenter/buttonBg.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			@include font20();
			color: #FFF597;
			text-shadow: 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1px 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1px 0px 0 #760607, 1px 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1px 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0 0 0 #760607;

			.secondNum {
				margin-left: 10rpx;
			}
		}
	}

	.errorTipsBox {
		z-index: 9999;
		max-width: 500rpx;
		font-size: 26rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #FFFFFF;
		padding: 20rpx 35rpx;
		text-align: left;
		background: rgba(26, 26, 26, .9);
		border-radius: 8rpx;
	}

	.showPopUp {
		animation: openPopUp .5s;

		@keyframes openPopUp {
			0% {
				opacity: 0;
				top: 100%;
			}

			100% {
				opacity: 1;
				top: 50%;
			}
		}
	}
</style>
