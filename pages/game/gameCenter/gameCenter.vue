<template>
	<view class="gameContent">
		<!-- 顶部信息 -->
		<view class="topBarBox">
			<view class="topBarIndex">
				<view class="leftBox" @tap="userInfoShow">
					<image class="userHeader" style="background: #FFFFFF;" :src="userHeader"></image>
					<text class="userNick">{{userNick}}</text>
				</view>
				<view class="goldBox">
					<view class="centerBox">
						<image class="leftImg" src="../../../static/game/gameCenter/POOGold.png"></image>
						<text class="number">{{pooNum}}</text>
					</view>
					<view class="rightBox">
						<image class="leftImg" src="../../../static/game/gameCenter/klGold.png"></image>
						<text class="number">{{klNum}}</text>
					</view>
				</view>
			</view>
			<image @tap="back" class="leaveGame" src="../../../static/game/gameCenter/leave.png"></image>
		</view>
		<view class="middleBox">
			<view class="middleItem" @tap="lowTable" style="margin-bottom: 30rpx;margin-top: 10rpx;">
				<view class="titleBox">
					<image class="itemImg" src="../../../static/game/gameCenter/lowGround.png"></image>
					<!-- 低倍场 -->
					<text class="title">{{languageObj.lowPower}}</text>
				</view>
				<view class="bottomBox">
					<view class="bottomLeftBox">
						<!-- 底注 -->
						<text style="margin-bottom: 10rpx;">{{languageObj.bottomNote}}:<text style="margin-left: 10rpx;">100POO</text></text>
						<!-- 全天开放 固定投注 -->
						<text>{{languageObj.openAllDay}}<text style="margin-left: 10rpx;">{{languageObj.fixedBets}}</text></text>
					</view>
					<view class="rightBtn">
						<!-- 立即匹配 -->
						<text>{{languageObj.matchNow}}</text>
					</view>
				</view>
			</view>
			<view class="middleItem"  @tap="highTable" style="margin-bottom: 5rpx;">
				<view class="titleBox">
					<image class="itemImg itemImg2" src="../../../static/game/gameCenter/highGround.png"></image>
					<!-- 高倍场 -->
					<text class="title title2">{{languageObj.highPower}}</text>
				</view>
				<view class="bottomBox">
					<view class="bottomLeftBox">
						<!-- 底注 -->
						<text style="margin-bottom: 10rpx;">{{languageObj.bottomNote}}:<text style="margin-left: 10rpx;">200POO</text></text>
						<!-- 即时开放 可选倍数 -->
						<text>{{languageObj.instantOpening}}<text style="margin-left: 10rpx;">{{languageObj.optionalMultiple}}</text></text>
					</view>
					<view class="rightBtn">
						<!-- 立即匹配 -->
						<text class="goldColor">{{languageObj.matchNow}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomBar">
			<!-- 底部选项 -->
			<view class="bottomItemBox">
				<!-- <view class="bottomItem" @tap="inviteBindShow">
					<image class="itemImage" src="../../../static/game/gameCenter/invite.png"></image>
					<text class="itemTitle">邀请绑定</text>
				</view> -->
				<view class="bottomItem" @tap="gameRecordShow">
					<image class="itemImage" src="../../../static/game/gameCenter/record.png"></image>
					<!-- 游戏记录 -->
					<text class="itemTitle">{{languageObj.gameRecord}}</text>
				</view>
				<view class="bottomItem" @tap="gameSettingsShow">
					<image class="itemImage" src="../../../static/game/gameCenter/settings.png"></image>
					<!-- 游戏设置 -->
					<text class="itemTitle">{{languageObj.gameSettings}}</text>
				</view>
			</view>
			<!-- 左下角合约特权 -->
			<view class="lb_contract" @tap="contractPrivilegeShow">
				<!-- 合约特权 -->
				<text>{{languageObj.contractual}}</text>
			</view>
		</view>
		<!-- 个人信息弹窗 -->
		<view v-if="userInfo" class="mineInfo popUpOut" :class="[userInfo?'showPopUp':'']">
			<!-- 右上角关闭按钮 -->
			<view class="closeBtn" @tap="userInfo = false"></view>
			<view class="popTitle">
				<!-- 个人详情 -->
				<text>{{languageObj.personalDetails}}</text>
			</view>
			<view class="scrollBox">
				<view class="infoBox">
					<image class="header" style="background: #FFFFFF;" :src="userHeader"></image>
					<view class="rightBox">
						<view class="item1">
							<!-- 昵称 -->
							<text class="infoText">{{languageObj.nickname}}：{{userNick}}</text>
							<!-- 账号 -->
							<text style="margin-right: 58rpx;">{{languageObj.account}}ID：{{userId}}</text>
						</view>
						<view class="item2">
							<!-- 称号 -->
							<text class="infoText">{{languageObj.title}}：{{userTitle}}</text>
							<!-- 矿工费用奖励系数 -->
							<text>{{languageObj.rewardCoefficient}}：{{minerCost}}%</text>
						</view>
					</view>
				</view>
				<view class="balanceBox">
					<view class="centerBox">
						<image class="leftImg" src="../../../static/game/gameCenter/pdtDiamond.png"></image>
						<text class="number">{{pooNum}}</text>
					</view>
					<view class="rightBox">
						<image class="leftImg" src="../../../static/game/gameCenter/klGold.png"></image>
						<text class="number">{{klNum}}</text>
					</view>
				</view>
				<view class="statisticsBox">
					<view class="text1">
						<!-- <text>已玩游戏局数总计：{{minNumberOfGameAll}}</text> -->
						<!-- 今日已进行局数 -->
						<text>{{languageObj.numberOfToday}}：{{finished}}</text>
						<!-- 今日游戏可玩局数 -->
						<text>{{languageObj.numberOfAvailableToday}}：{{canPlay}}</text>
					</view>
					<view class="text2">
						<!-- 获得竞拍率 -->
						<text>{{languageObj.winningAuctionRate}}：{{pickRate}}%</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 合约特权弹窗 -->
		<view v-if="contractPrivilege" class="mineInfo" :class="[contractPrivilege?'showPopUp':'']">
			<!-- 右上角关闭按钮 -->
			<view class="closeBtn" @tap="contractPrivilege = false"></view>
			<!-- 左上角返回 -->
			<view v-show="contractRule || lockedBody" class="backBtn" @tap="backContractPrivilege"></view>
			<view class="popUpOut" v-show="contractPrivilegeContent">
				<view class="popTitle">
					<!-- 合约特权 -->
					<text>{{languageObj.contractual}}</text>
				</view>
				<view class="scrollBox">
					<view v-if="!noContract" class="txtItem">
						<view class="contractLevel">
							<!-- 合约等级 -->
							<text class="label">{{languageObj.contractGrade}}: </text>
							<image class="levelImg" src="../../../static/game/gameCenter/contractLevel.png"></image>
							<text class="levelNum">{{contractLevel}}</text>
						</view>
						<view class="numberOfGame">
							<!-- 今日已进行局数 -->
							<text class="label"  style="margin-left: 20rpx;">{{languageObj.numberOfToday}}: </text>
							<text>{{todayNumberOfGame}}</text>
						</view>
					</view>
					<view v-if="!noContract" class="txtItem">
						<view class="numberOfGame">
							<!-- 合约每日游戏局数 -->
							<text class="label">{{languageObj.gamesPerDay}}: </text>
							<text>{{hasGameNumber}} {{languageObj.game}}</text>
						</view>
					</view>
					<view v-if="!noContract" class="txtItem">
						<view class="numberOfGame">
							<!-- 合约到期时间 -->
							<text class="label">{{languageObj.expirationTime}}: </text>
							<text>{{expirationTime}}</text>
						</view>
					</view>
					<view v-if="noContract" class="txtItem">
						<view class="numberOfGame">
							<!-- 暂无锁仓信息 -->
							<text class="label">{{languageObj.noLock}}</text>
						</view>
					</view>
					<view class="txtItem txtItem2" style="padding-right: 20rpx;">
						<view class="btmbtn" @tap="lockedBodyShow">
							<!-- 合约锁仓PDT，获取更多游戏次数 -->
							<text>{{languageObj.contractLockUp}}</text>
						</view>
						<!-- 合约规则 -->
						<text @tap="contractRuleShow">{{languageObj.contractRules}}</text>
						<image @tap="contractRuleShow" class="questionIcon" src="../../../static/game/gameCenter/questionIcon.png"></image>
					</view>
				</view>
			</view>
			<view class="popUpOut" v-show="contractRule">
				<view class="popTitle">
					<!-- 合约规则 -->
					<text>{{languageObj.contractRules}}</text>
				</view>
				<view class="scrollBox">
					<view class="contractRuleContent">
						<!-- 新注册用户可体验试玩一局 -->
						<!-- <text>1.{{languageObj.newRegisteredUsers}}</text> -->
						<!-- 用户需进行合约锁仓才能玩游戏，锁仓不同的金额，对应不同的合约 等级，每个等级每天游戏赠予游戏局数和合约的有效天数都不相同 -->
						<text>1.{{languageObj.usersNeedToLockUp}}</text>
						<!-- 合约等级 -->
						<text>2.{{languageObj.contractGrade}}</text>
						<!-- 合约 周期 天 每日游戏局数 局-->
						<text v-for="item in contractRule">{{item.contract_name}}: {{languageObj.contract}}{{item.pdt_num}}PDT,{{languageObj.cycle}}{{item.day_num}}{{languageObj.day}},{{languageObj.gamesPerDay}}{{item.lun_num}}{{languageObj.game}}</text>
						<!-- <text>V2: 合约10000PDT,周期35推天,每日游戏局数100局</text>
						<text>V3: 合约18000PDT,周期60推天,每日游戏局数200局</text>
						<text>V4: 合约34000PDT,周期90推天,每日游戏局数400局</text>
						<text>V5: 合约46000PDT,周期150推天,每日游戏局数500局</text> -->
					</view>
				</view>
			</view>
			<view class="popUpOut" v-if="lockedBody">
				<view class="popTitle">
					<!-- 合约锁仓 -->
					<text>{{languageObj.contractLockUp}}</text>
				</view>
				<view :style="{overflow:showDropdownList?'hidden':'auto'}" class="scrollBox">
					<view class="lockedBodyContent">
						<view class="selectBox">
							<!-- 锁仓金额 -->
							<text class="label">{{languageObj.lockUpAmount}}</text>
							<view class="dropDownBox" @click.stop="showDropdown">
								<text style="margin-left: 28rpx;">{{currentSelectName}}PDT</text>
								<image class="selectRight" src="../../../static/game/gameCenter/selectTriangle.png" image>
									<dropdown style="width: 100%;" :currentValue="currentSelectIndex" v-show="showDropdownList" :list="contractList"
									 @select="select" @close="show = false"></dropdown>
							</view>
						</view>
						<view class="canUseBalance">
							<!-- 可用余额 -->
							<text>{{languageObj.availableBalance}}: <text> {{pdtNum}} PDT</text></text>
						</view>
						<view class="confirmLock" @tap="confirmLock">
							<!-- 确定锁仓 -->
							<text>{{languageObj.lockUp}}</text>
						</view>
						<!-- 锁仓记录 -->
						<view class="leftTitle">
							{{languageObj.lockUpRecord}}
						</view>
						<view class="lockListTitle">
							<!-- 锁仓时间 -->
							<text>{{languageObj.lockTime}}</text>
							<!-- 锁仓金额 -->
							<text>{{languageObj.lockUpAmount}}</text>
						</view>
						<view class="lockList">
							<view class="lockItem" v-for="item in contractReacordList">
								<text>{{item.create_time}}</text>
								<text>{{Number(item.lock_num)}} PDT</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 游戏设置 -->
		<view v-if="gameSettings" class="mineInfo popUpOut" :class="[gameSettings?'showPopUp':'']">
			<!-- 右上角关闭按钮 -->
			<view class="closeBtn" @tap="gameSettings = false"></view>
			<view class="popTitle">
				<!-- 游戏设置 -->
				<text>{{languageObj.gameSettings}}</text>
			</view>
			<view class="scrollBox">
				<view class="settingsBox">
					<view @tap="backgroundMuisc" class="settingItem">
						<!-- 背景音乐 -->
						<text class="leftLabel">{{languageObj.backgroundMusic}}</text>
						<view class="switchBox">
							<!-- 关闭 -->
							<text>{{languageObj.OFF}}</text>
							<!-- 开启 -->
							<text>{{languageObj.ON}}</text>
							<view :style="{left:!bgMusic?'-8rpx':'92rpx'}" class="switchBg"></view>
						</view>
					</view>
					<view @tap="gameMuiscSwitch" class="settingItem">
						<!-- 游戏音乐 -->
						<text class="leftLabel">{{languageObj.gameMusic}}</text>
						<view class="switchBox">
							<!-- 关闭 -->
							<text>{{languageObj.OFF}}</text>
							<!-- 开启 -->
							<text>{{languageObj.ON}}</text>
							<view :style="{left:!gameMuisc?'-8rpx':'92rpx'}" class="switchBg"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 游戏记录 -->
		<view v-if="gameRecord" class="mineInfo popUpOut" :class="[gameRecord?'showPopUp':'']">
			<!-- 右上角关闭按钮 -->
			<view class="closeBtn" @tap="gameRecord = false"></view>
			<view class="popTitle">
				<!-- 游戏记录 -->
				<text>{{languageObj.gameRecord}}</text>
			</view>
			<view class="scrollBox">
				<view class="gameRecordBox">
					<view class="gameRecordTitle">
						<!-- 时间 -->
						<text>{{languageObj.time}}</text>
						<!-- 类型 -->
						<text class="text2">{{languageObj.type}}</text>
						<!-- 金额 -->
						<text class="text2">{{languageObj.amountOfMoney}}</text>
					</view>
					<scroll-view class="gameRecordList" scroll-y="true" @scrolltolower="gameRecordListScroll">
							<view class="gameListItem" v-for="item in gameRecordList">
								<text>{{item.create_time}}</text>
								<text class="text2">{{item.content}}</text>
								<text class="text2">{{item.money}} {{item.currency_name}}</text>
							</view>
							<view class="loadingMore">
								<aLoadMore :status="gameRecordLoadStatus" color="#FFFFFF" mode="loading1"></aLoadMore>
							</view>
					</scroll-view>
					<!-- <view class="gameRecordList" @scroll="gameRecordListScroll($event)">
						<view class="gameListItem" v-for="item in gameRecordList">
							<text>{{item.create_time}}</text>
							<text class="text2">{{item.content}}</text>
							<text class="text2">{{item.money}} {{item.currency_name}}</text>
						</view>
						<view class="loadingMore">
							<aLoadMore :status="gameRecordLoadStatus" color="#FFFFFF" mode="loading1"></aLoadMore>
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<!-- 邀请绑定 -->
		<view v-if="inviteBind" class="mineInfo" :class="[inviteBind?'showPopUp':'']">
			<!-- 右上角关闭按钮 -->
			<view class="closeBtn" @tap="inviteBind = false"></view>
			<!-- 左上角返回 -->
			<view v-show="extensionRecord" class="backBtn" @tap="backinviteBindMain"></view>
			<view class="popUpOut" v-show="inviteBindMain">
				<view class="popTitle">
					<text>邀请绑定</text>
				</view>
				<view class="inviteContentBox">
					<view class="inviteContentItem">
						<text class="leftLabel">我的邀请码</text>
						<view class="myInviteCodeBox">
							<text>{{invitedCode}}</text>
							<view @tap="copyInviteCode" class="copyBtn">
								{{copyName}}
							</view>
						</view>
					</view>
					<view class="inviteContentItem">
						<text class="leftLabel">邀请关系</text>
						<view class="myInviteCodeBox">
							<view class="relationship">
								{{invitationBind==1?'已绑定':'未绑定'}}
							</view>
						</view>
					</view>
					<view class="inviteContentItem">
						<text class="leftLabel">我的社群 : {{allPeople}}</text>
						<view class="myInviteCodeBox">
							<view class="people">
								<image class="onePeople" src="../../../static/game/gameCenter/onePeople.png"></image>
								<text>{{onePeople}}人</text>
								<image class="manyPeople" src="../../../static/game/gameCenter/manyPeople.png"></image>
								<text>{{manyPeople}}人</text>
							</view>
						</view>
					</view>
					<view class="seeExtensionRecord" @tap="seeExtensionRecord">
						<text>点击查看推广记录 >></text>
					</view>
				</view>
			</view>
			<view class="popUpOut" v-if="extensionRecord">
				<view class="popTitle">
					<text>推广记录</text>
				</view>
				<view class="inviteContentBox">
					<view class="inviteContentItem">
						<text class="leftLabel">已获得收益累计</text>
						<view class="myInviteCodeBox">
							<view class="redItem">
								{{profitPOO}} POO
							</view>
							<view class="redItem">
								{{profitKL}} KL
							</view>
						</view>
					</view>
					<view class="inviteContentItem">
						<text class="leftLabel">已获得门票反馈累计</text>
						<view class="myInviteCodeBox">
							<view class="redItem">
								{{admissionTicket}} PDT
							</view>
						</view>
					</view>
					<view class="extensionTitle">
						<text>时间</text>
						<text class="text2">类型</text>
						<text class="text2">金额</text>
					</view>
					
					<scroll-view class="extensionList" scroll-y="true" @scrolltolower="personExpandLogListScroll">
						<view class="extensionItem" v-for="item in personExpandLogList">
							<text>{{item.create_time}}</text>
							<text class="text2">{{item.num}}{{currency[item.currency_id]}}</text>
							<text class="text2">10.112 PDT</text>
						</view>
						<view class="loadingMore">
							<aLoadMore :status="personExpandLogLoadStatus" color="#FFFFFF" mode="loading1"></aLoadMore>
						</view>
					</scroll-view>
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
	import Dropdown from '../../../components/dropdown/index.vue'
	import aLoadMore from "@/components/a_loadMore/a_loadMore";
	export default {
		data() {
			return {
				currency: {
					"1": "KL",
					"2": "POO",
					"3": "PDT",
					"4": "USDT"
				}, //币种
				userNick: '', // 昵称
				userHeader: '', //用户头像地址
				userTitle: '', // 称号
				userId: '', // 账号Id
				minerCost: '', // 矿工费用奖励系数
				pooNum: 0, // poo
				klNum: 0, // kl
				pdtNum:0,// pdt
				todayNumberOfGame: 0, // 合约今日已进行局数
				pickRate: 0, // 获得竞拍率
				canPlay: 0, // 个人信息今日可玩局数
				finished: 0, // 个人信息今日已进行局数
				minNumberOfGameAll:0,//个人总局数
				contractLevel: 4, //合约等级
				hasGameNumber: 0, //每日游戏局数赠与
				expirationTime: '2020-08-19 00:00:00', // 合约到期时间
				invitedCode: '', //我的邀请码,
				invitationBind: '', //邀请关系
				onePeople: 0, // 个人人数
				manyPeople: 0, // 团队人数
				allPeople: 0, // 总人数
				profitPOO: 0, //推广收益PDT
				profitKL: 0, //推广收益KL
				admissionTicket: 0, //门票反馈累计
				contractList: [], // 合约列表
				currentSelectName: '请选择合约', //当前的选择
				currentSelectIndex: 0, //当前选择的下标
				currentSelectId: 0, //当前选择的Id
				showDropdownList: false, //下拉选择flag
				userInfo: false, // 个人信息弹窗显示
				contractPrivilege: false, //合约特权弹窗显示
				contractPrivilegeContent: false, //合约内容显示
				contractRule: false, //合约规则
				lockedBody: false, //合约锁仓
				gameSettings: false, //游戏设置
				gameRecord: false, //游戏记录
				inviteBind: false, //邀请绑定
				inviteBindMain: false, // 邀请绑定第一页
				extensionRecord: false, // 推广记录页
				bgMusic: false, // 背景音乐设置
				gameMuisc: false, // 游戏音乐
				copyName: '复制', // 复制按钮名称
				errorText: '123123123', //错误提示信息
				errorTips: false, // 错误提示框显示隐藏
				errorDtime: 2000, // 错误提示框显示时间
				gameRecordPage: 1, // 游戏记录当前页
				gameRecordRowNum: 15, // 游戏记录每页条数
				gameRecordLastPage: 2, // 游戏记录最后页数
				gameRecordHasMore: true, // 游戏记录是否还有更多数据
				gameRecordList: [], // 游戏记录数据
				gameRecordLoadStatus: 'loading', //游戏记录底部提示状态
				contractReacordList: [], // 合约记录 数据
				personExpandLogPage: 1, // 合约记录当前页
				personExpandLogRowNum: 15, // 合约记录每页条数
				personExpandLogLastPage: 2, // 合约记录最后页数
				personExpandLogHasMore: true, // 合约记录是否还有更多数据
				personExpandLogList: [], // 合约记录数据
				personExpandLogLoadStatus: 'loading', //合约记录底部提示状态
				is_open_socket: false, // socket是否正常打开
				contractRuleList:[],// 合约规则列表
				noContract:true,// 没有合约
				languageObj:{},// 语言
				canClick:true,// 限制点击
			}
		},
		onShow() {
			this.userNick = uni.getStorageSync('nickname')
			// 调用请求个人信息方法
			this.getUserInfo()
			// 调用用户资产接口
			this.getUserCurrency()
			// 获取背景音乐开关状态
			let bgm = uni.getStorageSync('bgm')
			if(bgm === ''|| bgm == undefined || bgm == null){
				uni.setStorageSync('bgm',this.bgMusic)
			}else{
				this.bgMusic = bgm
			}
			// 获取游戏音效开关状态
			let gameMuisc = uni.getStorageSync('gameMuisc')
			if(gameMuisc === ''|| gameMuisc == undefined || gameMuisc == null){
				uni.setStorageSync('gameMuisc',this.gameMuisc)
			}else{
				this.gameMuisc = gameMuisc
			}
			this.closeSocket()
			getApp().globalData.bgm = uni.createInnerAudioContext()
			getApp().globalData.bgm.loop = true
			getApp().globalData.bgm.volume = 0.7
			getApp().globalData.bgm.src = '../../../static/game/gameCenter/bgm.mp3'
			this.musicControl.bgmMInit()
			getApp().globalData.tapMusic = uni.createInnerAudioContext()
			getApp().globalData.tapMusic.src = '../../../static/game/gameCenter/tapMusic.mp3'
			getApp().globalData.tapMusic.onEnded(()=>{
				this.musicControl.bgmPlay()
			})
			this.musicControl.tapMusicMInit()
			this.musicControl.bgmPlay()
		},
		onHide() {
			this.musicControl.bgmStop()
		},
		onLoad() {
			console.log(getCurrentPages());
			// 获取语言
			let lgeType = uni.getStorageSync('lang')
			if(lgeType == 'zh-cn'){
				this.languageObj = this.language2.ChinaLanguage
			}else{
				this.languageObj = this.language2.EnglisghLanguage
			}
			this.closeSocket()
		},
		onUnload() {
			this.musicControl.bgmStop()
		},
		methods: {
			back() {
				this.closeSocket()
				uni.navigateBack({
					delta: 1
				});
			},
			// 请求个人信息
			getUserInfo() {
				this.get('api/myGameDetails', '',false).then(res => {
					if (res.data.code == 200) {
						let info = res.data.res
						this.userHeader = info.image
						if(this.userHeader==''){
							this.userHeader = '../../../static/me/head2.png'
						}
						this.userTitle = info.level
						this.userId = info.ID
						this.minerCost = info.bonus_coefficient
						this.minNumberOfGameAll = info.gameTotal
						this.pickRate = info.winRate
						this.canPlay = info.lun_num
						this.finished = info.today_num
					} else {
						this.showErrorTips(res.data.message)
					}
				})
			},
			// 进入低倍场
			lowTable() {
				if(this.canClick){
					this.canClick = false
					setTimeout(()=>{
						this.canClick = true
					},5000)
					this.musicControl.tapMusicPlay()
					// 连接WebSocket
					this.openSocket()
					// 监听连接打开
					this.mainSocketTask.onOpen((res) => {
						this.is_open_socket = true;
						let token = uni.getStorageSync('token')
						let language = uni.getStorageSync('lang')
						let type = 1
						let params = 'token=' + token +'&lang='+ language +'&type='+ type
						// 注：只有连接正常打开中 ，才能正常成功发送消息
						this.mainSocketTask.send({
							data: params,
							async success() {},
						});
						// 注：只有连接正常打开中 ，才能正常收到消息
						this.mainSocketTask.onMessage((res) => {
							let resData = JSON.parse(res.data)
							if(resData.error == 0){
								uni.navigateTo({
								    url: 'gameLowTable/gameLowTable?socket=true'
								});
							}else if(resData.hasOwnProperty('winner')){
									console.log('提前返回1');
									// 调用子页面方法
							}else{
								this.showErrorTips(resData.msg)
							}
						});
					})
					this.mainSocketTask.onClose(() => {
						console.log("已经被关闭了")
					})
				}
			},
			highTable(){
				// 该功能全力开发中
				this.showErrorTips(this.languageObj.fullDevelopment+'....')
				console.log(typeof true);
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				let _this = this
				if(this.mainSocketTask != null){
					this.mainSocketTask.close({
						success(res) {
							_this.is_open_socket = false;
							console.log("关闭成功", res)
						},
						fail(err) {
							console.log("关闭失败", err)
						}
					})
				}
			},
			// 邀请绑定
			inviteBindShow() {
				this.popUpInit(['inviteBind', 'inviteBindMain'])

				// 请求邀请绑定接口
				this.get('api/inviteBindingDetails', '',false).then(res => {
					if (res.data.code == 200) {
						let info = res.data.res
						this.invitedCode = info.inviteCode
						this.invitationBind = info.is_bind
						this.allPeople = info.team
						this.onePeople = info.direct
						this.manyPeople = info.indirect
					} else {
						this.showErrorTips(res.data.message)
					}
				})

				setTimeout(() => {
					this.inviteBind = true
					this.inviteBindMain = true
				}, 100)
			},
			// 游戏记录
			gameRecordShow() {
				this.musicControl.tapMusicPlay()
				this.popUpInit(['gameRecord'])
				this.gameRecordPage = 1
				this.gameRecordList = []
				this.gameRecordHasMore = true
				this.gameRecordHasMore = true
				this.gameRecordLoadStatus = 'loading'
				this.getGameRecord()
				setTimeout(() => {
					this.gameRecord = true
				}, 100)
			},
			// 游戏记录列表滚动触底
			gameRecordListScroll() {
				this.getGameRecord()
			},
			// 游戏记录请求
			getGameRecord() {
				if (this.gameRecordHasMore) {
					let params = {
						page: this.gameRecordPage,
						rowNum: this.gameRecordRowNum
					}
					// 请求游戏记录数据
					this.get('api/myGameLog', params,false).then(res => {
						if (res.data.code == 200) {
							let info = res.data.res
							if (this.gameRecordPage == 1 && info.data.length == 0) {
								this.gameRecordLoadStatus = 'noData'
							}
							this.gameRecordPage = this.gameRecordPage + 1
							this.gameRecordLastPage = info.last_page
							this.gameRecordList = this.gameRecordList.concat(info.data)
							if (this.gameRecordPage > this.gameRecordLastPage) {
								//没有更多页数了
								this.gameRecordHasMore = false
								this.gameRecordLoadStatus = 'normal'
							}
						} else {
							this.showErrorTips(res.data.message)
						}
					})
				}
			},
			// 游戏设定
			gameSettingsShow() {
				this.musicControl.tapMusicPlay()
				this.popUpInit(['gameSettings'])
				setTimeout(() => {
					this.gameSettings = true
				}, 100)
			},
			// 初始化其他弹窗
			popUpInit(exclude) {
				let switchList = ['userInfo', 'contractPrivilege', 'contractRule', 'lockedBody',
					'gameSettings', 'gameRecord', 'inviteBind', 'inviteBindMain', 'extensionRecord'
				]
				exclude.map(item => {
					let idx = switchList.indexOf(item)
					switchList.splice(idx, 1)
				})
				switchList.map(item => {
					this[item] = false
				})
			},
			// 个人信息弹窗显示
			userInfoShow() {
				this.musicControl.tapMusicPlay()
				this.popUpInit(['userInfo'])
				setTimeout(() => {
					this.userInfo = true
				}, 100)
			},
			// 调用用户资产接口
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
							if(item.currency_name == 'PDT'){
								this.pdtNum = this.parsNum(item.num)
							}
						})
					} else {
						this.showErrorTips(res.data.message)
					}
				})
			},
			// 合约特权弹窗显示
			contractPrivilegeShow() {
				this.musicControl.tapMusicPlay()
				this.popUpInit(['contractPrivilege', 'contractPrivilegeContent'])
				// 请求我的合约详情接口
				this.get('api/myContractDetails', '',false).then(res => {
					if (res.data.code == 200) {
						let info = res.data.res
						if((typeof info=='object')&&info.constructor==Array){
							if(info.length==0){
								this.noContract = true
							}
						}else{
							this.noContract = false
							this.contractLevel = info.contract_grade
							this.todayNumberOfGame = info.today_num
							this.hasGameNumber = info.day_num
							this.expirationTime = info.expire_time
						}
					} else {
						this.showErrorTips(res.data.message)
					}
				})
				setTimeout(() => {
					this.contractPrivilege = true
					this.contractPrivilegeContent = true
				}, 100)
			},
			// 合约规则弹窗显示
			contractRuleShow() {
				// 请求合约规则
				this.get('api/contractRule', '',false).then(res => {
					if (res.data.code == 200) {
						this.contractRule = res.data.res
					} else {
						this.showErrorTips(res.data.message)
					}
				})
				this.contractPrivilegeContent = false
				this.contractRule = true
			},
			// 显示合约锁仓弹窗
			lockedBodyShow() {
				// 请求可用余额
				this.getUserCurrency()
				// 请求合约列表
				this.get('api/contract', '',false).then(res => {
					if (res.data.code == 200) {
						let conList = res.data.res
						conList.map((item, index) => {
							item['name'] = item.pdt_num
							item['value'] = index
						})
						this.contractList = conList
						this.currentSelectName = conList[0].name
						this.currentSelectId = conList[0].id
					} else {
						this.showErrorTips(res.data.message)
					}
				})
				// 请求合约记录
				this.contractRecord()
				this.contractPrivilegeContent = false
				this.lockedBody = true
			},
			// 请求合约记录
			contractRecord() {
				// 请求合约记录数据
				this.get('api/myContract', '',false).then(res => {
					if (res.data.code == 200) {
						let info = res.data.res
						this.contractReacordList = res.data.res
					} else {
						this.showErrorTips(res.data.message)
					}
				})
			},
			// 返回合约特权
			backContractPrivilege() {
				this.contractRule = false
				this.lockedBody = false
				this.contractPrivilegeContent = true
			},
			// 下拉选择 返回value
			select(value) {
				this.currentSelectIndex = value
				this.currentSelectId = this.contractList[value].id
				this.currentSelectName = this.contractList[value].name
			},
			// 显示下拉选项
			showDropdown() {
				this.showDropdownList = !this.showDropdownList
			},
			// 确认锁仓
			confirmLock() {
				console.log(uni.getStorageSync('uuid'));
				// 调用购买合约
				this.post('api/buyContract', {
					contract_id: this.currentSelectId
				},false).then(res => {
					if (res.data.code == 200) {
						// 锁仓成功
						this.showErrorTips(this.languageObj.lockUpSuccessfully)
						this.getUserCurrency()
						this.contractRecord()
						// 合约信息
						this.get('api/myContractDetails', '',false).then(res => {
							if (res.data.code == 200) {
								let info = res.data.res
								if((typeof info=='object')&&info.constructor==Array){
									if(info.length==0){
										this.noContract = true
									}
								}else{
									this.noContract = false
									this.contractLevel = info.contract_grade
									this.todayNumberOfGame = info.today_num
									this.hasGameNumber = info.day_num
									this.expirationTime = info.expire_time
								}
							} else {
								this.showErrorTips(res.data.message)
							}
						})
						// let info = res.data.res
					} else {
						this.showErrorTips(res.data.message)
					}
				})
			},
			// 背景音乐设置
			backgroundMuisc() {
				this.bgMusic = !this.bgMusic
				uni.setStorageSync('bgm',this.bgMusic)
				if(this.bgMusic === false){
					this.musicControl.bgmStop()
				}else{
					getApp().globalData.bgm = null
					getApp().globalData.bgm = uni.createInnerAudioContext()
					getApp().globalData.bgm.loop = true
					getApp().globalData.bgm.volume = 0.8
					getApp().globalData.bgm.src = '../../../static/game/gameCenter/bgm.mp3'
					this.musicControl.bgmMInit()
					this.musicControl.bgmPlay()
				}
			},
			// 游戏音乐设置
			gameMuiscSwitch() {
				this.gameMuisc = !this.gameMuisc
				uni.setStorageSync('gameMuisc',this.gameMuisc)
			},
			// 复制邀请码
			copyInviteCode() {
				uni.setClipboardData({
					data: this.invitedCode,
					success: () => {
						uni.hideToast();
						this.copyName = '已复制'
						setTimeout(() => {
							this.copyName = '复制'
						}, 5000)
					}
				});
			},
			//返回推广第一页
			backinviteBindMain() {
				this.inviteBindMain = true
				this.extensionRecord = false
			},
			// 显示推广记录
			seeExtensionRecord() {
				this.personExpandLogRecord()
				this.inviteBindMain = false
				this.extensionRecord = true
			},
			// 获取推广记录数据
			personExpandLogRecord() {
				if (this.personExpandLogHasMore) {
					let params = {
						expand_type: 1,
						page: this.personExpandLogPage,
						rowNum: this.personExpandLogRowNum
					}
					// 请求个人推广记录数据
					this.get('api/personExpandLog', params,false).then(res => {
						if (res.data.code == 200) {
							let info = res.data.res
							this.profitPOO = Number(info.POO)
							this.profitKL = Number(info.KL)
							if (this.personExpandLogPage == 1 && info.list.length == 0) {
								this.personExpandLogLoadStatus = 'noData'
							}
							this.personExpandLogPage = this.personExpandLogPage + 1
							this.personExpandLogLastPage = info.list.last_page
							this.personExpandLogList = this.personExpandLogList.concat(info.list.data)
							if (this.personExpandLogPage >= this.personExpandLogLastPage) {
								//没有更多页数了
								this.personExpandLogHasMore = false
								this.personExpandLogLoadStatus = 'normal'
							}
						} else {
							this.showErrorTips(res.data.message)
						}
					})
				}
			},
			// 推广记录滚动
			personExpandLogListScroll(event) {
				// console.log('推广记录触底');
			},
			// 错误提示框显示
			showErrorTips(text) {
				this.errorText = text
				this.errorTips = true
				setTimeout(() => {
					this.errorTips = false
				}, this.errorDtime)
			}
		},
		beforeDestroy() {
			// this.closeSocket();
		},
		components: {
			'Dropdown': Dropdown,
			"aLoadMore": aLoadMore
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
		background: url('../../../static/game/gameCenter/gameCenterBg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		transform: rotate(90deg) translate(-50%, -50%);
		transform-origin: left top;

		.topBarBox {
			position: relative;

			.topBarIndex {
				width: 80%;
				height: 126rpx;
				box-sizing: border-box;
				padding: 0 100rpx;
				padding-bottom: 20rpx;
				margin: 0 auto;
				background: url('../../../static/game/gameCenter/topBar.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				@include cen();
				justify-content: space-around;

				.leftBox {
					@include cen();

					.userHeader {
						width: 76rpx;
						height: 76rpx;
						margin-right: 22rpx;
						border: 1rpx solid #FFF597;
						border-radius: 50%;
					}

					.userNick {
						@include font24();
						color: #FFF597;
					}
				}

				.goldBox {
					@include cen();

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
							width: 90rpx;
							height: 70rpx;
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
							width: 72rpx;
							height: 72rpx;
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

		.middleBox {
			@include flexC();
			justify-content: space-around;
			align-items: flex-end;
			box-sizing: border-box;
			height: 100%;
			padding-right: 169rpx;
			padding-bottom: 251rpx;

			.middleItem {
				flex: 1;
				width: 548rpx;
				background: linear-gradient(to bottom, #A20004, #5D0405);
				transform: skew(-15deg);
				box-shadow: 0 0 30rpx #101010;
				border-radius: 12rpx;

				.titleBox {
					transform: skew(15deg);
					display: flex;
					height: 50%;
					justify-content: flex-start;
					align-items: flex-end;

					.itemImg {
						width: 237rpx;
						height: 169rpx;
						margin-right: 30rpx;
						position: relative;
						top: 25rpx;
					}

					.itemImg2 {
						transform: rotate(0deg);
						width: 185rpx;
						height: 172rpx;
						margin-left: 20rpx;
						margin-right: 65rpx;
						top: 20rpx;
					}

					.title {
						font-size: 70rpx;
						font-weight: bold;
						font-style: italic;
						color: #FFFFFF;
						text-shadow: 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 1px 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 1px 0px 0 #600606, 1px 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 1px 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 1px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0 0 0 #600606;
					}

					.title2 {
						font-size: 70rpx;
						font-weight: bold;
						font-style: italic;
						color: #FFF597;
						text-shadow: 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 4rpx 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 4rpx 1px 0 #600606, 4rpx -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 4rpx 0px 0 #600606, 4rpx 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 4rpx 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 4rpx 0 #600606, 1px 1px 0 #600606, 1px -4rpx 0 #600606, -4rpx -4rpx 0 #600606, -4rpx 1px 0 #600606, 1px 0px 0 #600606, 1px 0px 0 #600606, -4rpx 0px 0 #600606, -4rpx 0px 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 4rpx 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 4rpx 0 #600606, 0px 1px 0 #600606, 0px -4rpx 0 #600606, 0px -4rpx 0 #600606, 0px 1px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0px 0px 0 #600606, 0 0 0 #600606;
					}
				}

				.bottomBox {
					height: 50%;
					@include cen();
					justify-content: flex-start;
					transform: skew(15deg);

					.bottomLeftBox {
						min-width: 220rpx;
						@include flexC();
						@include font20();
						justify-content: center;
						align-items: flex-start;
						color: #FFF597;
						margin-left: 60rpx;
					}

					.rightBtn {
						@include cen();
						@include font30();
						margin-left: 20rpx;
						background: #42030A;
						width: 200rpx;
						height: 50rpx;
						border-radius: 50rpx;
						font-weight: bold;
						color: #FFFFFF;
						margin-top: 10rpx;
					}
				}
			}
		}

		.bottomBar {
			width: 100%;
			height: 155rpx;
			position: absolute;
			bottom: 0;
			background: url('../../../static/game/gameCenter/bottomBar.png');
			background-repeat: no-repeat;
			background-size: cover;
		}

		.lb_contract {
			@include cen();
			width: 188rpx;
			height: 188rpx;
			background: url('../../../static/game/gameCenter/contractBtn.png');
			background-repeat: no-repeat;
			background-size: cover;
			position: absolute;
			left: 20rpx;
			bottom: 16rpx;

			text {
				padding-top: 66rpx;
				@include font24();
				font-weight: bold;
				text-shadow: 0 0 10rpx #101010;
				color: #FFF597;
			}
		}

		.bottomItemBox {
			position: absolute;
			bottom: 0;
			right: 0;
			height: 115rpx;
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			box-sizing: border-box;
			padding-right: 144rpx;

			.bottomItem {
				@include cen();
				margin-left: 60rpx;

				.itemImage {
					width: 92rpx;
					height: 92rpx;
					margin-right: 15rpx;
				}

				.itemTitle {
					@include font26();
					color: #FFF597;
					font-weight: bold;
					text-shadow: 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1px 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1px 0px 0 #760607, 1px 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1px 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0 0 0 #760607;
				}
			}
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

		.mineInfo {
			@include flexC();
			width: 962rpx;
			height: 614rpx;
			background: url('../../../static/game/gameCenter/popUpBg.png');
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
				background: url('../../../static/game/gameCenter/popUpClose.png');
				background-repeat: no-repeat;
				background-size: cover;
			}

			.backBtn {
				width: 56rpx;
				height: 56rpx;
				position: absolute;
				left: 53rpx;
				top: 51rpx;
				background: url('../../../static/game/gameCenter/popUpBack.png');
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
				margin-bottom: 60rpx;
			}

			.infoBox {
				@include cen();
				margin-bottom: 28rpx;

				.header {
					width: 90rpx;
					height: 90rpx;
					border: 4rpx solid #FFF597;
					border-radius: 50%;
					margin-right: 35rpx;
				}

				.rightBox {
					@include cen();

					.item1,
					.item2 {
						@include flexC();
						@include font26();
						justify-content: center;
						align-items: flex-start;
						color: #FFFFFF;
						font-weight: bold;

						.infoText {
							margin-bottom: 11rpx;
						}
					}

					.item2 {
						margin-left: 20rpx;
						align-items: flex-end;
					}
				}
			}

			.balanceBox {
				@include cen();
				margin-bottom: 32rpx;

				.centerBox {
					@include cen();
					width: 240rpx;
					height: 50rpx;
					background: #650003;
					border-radius: 40rpx;
					position: relative;
					margin-right: 64rpx;
					margin-left: 64rpx;

					.leftImg {
						width: 90rpx;
						height: 70rpx;
						position: absolute;
						left: -45rpx;
					}

					.number {
						@include font26() color: #FFF597;
					}
				}

				.rightBox {
					@include cen();
					width: 240rpx;
					height: 50rpx;
					background: #650003;
					border-radius: 40rpx;
					position: relative;

					.leftImg {
						width: 72rpx;
						height: 72rpx;
						position: absolute;
						left: -36rpx;
					}

					.number {
						@include font26() color: #FFF597;
					}
				}
			}

			.statisticsBox {
				padding: 37rpx 50rpx;
				box-sizing: border-box;
				width: 706rpx;
				height: 146rpx;
				border: 3rpx solid #FFF597;
				margin: 0 auto;
				overflow: auto;

				.text1 {
					margin-bottom: 29rpx;
				}

				.text1,
				.text2 {
					@include cen();
					@include font22();
					font-weight: bold;
					color: #FFFFFF;
					justify-content: space-between;
				}
			}

			.txtItem {
				padding: 0 20rpx;
				@include cen();
				@include font26();
				margin-bottom: 34rpx;
				color: #FFFFFF;
				font-weight: bold;
				justify-content: center;
				align-items: flex-end;
				.label {
					margin-right: 14rpx;
				}

				.levelNum {
					margin-left: 6rpx;
					color: #FFF597;
					text-shadow: 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1rpx 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1rpx 1px 0 #760607, 1rpx -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1rpx 0px 0 #760607, 1rpx 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1rpx 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1rpx 0 #760607, 1px 1px 0 #760607, 1px -1rpx 0 #760607, -1rpx -1rpx 0 #760607, -1rpx 1px 0 #760607, 1px 0px 0 #760607, 1px 0px 0 #760607, -1rpx 0px 0 #760607, -1rpx 0px 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1rpx 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1rpx 0 #760607, 0px 1px 0 #760607, 0px -1rpx 0 #760607, 0px -1rpx 0 #760607, 0px 1px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0px 0px 0 #760607, 0 0 0 #760607;
				}

				.levelImg {
					width: 44rpx;
					height: 43rpx;
				}

				.btmbtn {
					@include cen();
					@include font24();
					width: 411rpx;
					height: 71rpx;
					background: url('../../../static/game/gameCenter/buttonBg.png');
					background-repeat: no-repeat;
					background-size: cover;
					color: #FFF597;
					margin-right: 20rpx;
				}

				.questionIcon {
					width: 36rpx;
					height: 36rpx;
					margin-left: 20rpx;
				}
			}

			.txtItem2 {
				justify-content: center;
				align-items: center;
			}

			.contractRuleContent {
				padding: 0 118rpx;
				color: #FFFFFF;
				@include font20();

				text {
					display: block;
					line-height: 34rpx;
				}
			}

			.lockedBodyContent {
				@include font26();
				padding: 0 130rpx;
				color: #FFFFFF;
				font-weight: bold;

				.selectBox {
					.label {
						font-size: 26rpx;
					}

					@include cen();
					justify-content: space-between;

					.dropDownBox {
						font-weight: normal;
						width: 340rpx;
						height: 50rpx;
						position: relative;
						background: linear-gradient(to bottom, #A00708, #6B0507);
						line-height: 50rpx;
						border-radius: 8rpx;
						z-index: 100;

						.selectRight {
							width: 25rpx;
							height: 15rpx;
							position: absolute;
							top: 20rpx;
							right: 26rpx;
						}
					}
				}

				.canUseBalance {
					font-size: 18rpx;
					text-align: right;
					padding: 18rpx 0;
					padding-right: 10rpx;
					font-weight: normal;
					position: relative;
					z-index: 5;
				}

				.confirmLock {
					@include font26();
					background: url('../../../static/game/gameCenter/buttonBg.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					padding: 26rpx 0;
					text-align: center;
					color: #FFF597;
					margin-bottom: 30rpx;
					position: relative;
					z-index: 5;
				}

				.leftTitle {
					position: relative;
					z-index: 5;
					margin-bottom: 20rpx;
				}

				.lockListTitle {
					@include cen();
					font-weight: normal;
					background: #910707;
					padding: 10rpx 16rpx;
					border-radius: 8rpx;
					position: relative;
					z-index: 5;

					text {
						display: block;
						width: 50%;
						text-align: center;
						color: #FFFFFF;
					}
				}

				.lockList {
					max-height: 330rpx;
					overflow: auto;
					width: 100%;
					position: relative;
					z-index: 5;

					.lockItem {
						@include cen();
						padding: 16rpx 16rpx;

						text {
							font-weight: normal;
							display: block;
							width: 50%;
							text-align: center;
							color: #FFFFFF;
						}
					}
				}
			}

			// 游戏设置
			.settingsBox {
				@include flexC();
				position: absolute;
				width: 100%;
				top: 40%;
				transform: translateY(-40%);

				.settingItem {
					margin-bottom: 30rpx;
					@include cen();

					.leftLabel {
						text-align: center;
						min-width: 240rpx;
						color: #FFFFFF;
						font-weight: bold;
						@include font26();
						margin-right: 50rpx;
					}

					.switchBox {
						@include cen();
						width: 200rpx;
						height: 50rpx;
						background-color: #340608;
						position: relative;

						text {
							@include font26();
							font-weight: bold;
							display: block;
							width: 50%;
							height: 100%;
							color: #FFF597;
							text-align: center;
							line-height: 50rpx;
						}

						.switchBg {
							width: 116rpx;
							height: 64rpx;
							background: url('../../../static/game/gameCenter/switchBg.png');
							background-repeat: no-repeat;
							background-size: 100% 100%;
							position: absolute;
							left: -8rpx;
							transition: left .3s;
						}
					}
				}
			}

			// 游戏记录
			.gameRecordBox {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				@include flexC();
				padding: 0 56rpx;

				.gameRecordTitle {
					@include cen();
					justify-content: space-between;
					background: #910707;
					border-radius: 8rpx;
					padding: 11rpx 21rpx;

					text {
						@include font22();
						display: block;
						width: 33%;
						text-align: center;
						color: #FFFFFF;
					}
				}

				.gameRecordList {
					flex: 1;
					min-height: 100rpx;
					padding: 24rpx 21rpx;
					padding-top: 0;
					margin-top: 24rpx;
					.gameListItem {
						@include cen();
						justify-content: space-between;
						border-radius: 8rpx;
						padding: 11rpx 0;

						text {
							@include font22();
							display: block;
							width: 33%;
							text-align: center;
							color: #FFFFFF;
						}
					}
				}
			}

			// 邀请绑定
			.inviteContentBox {
				@include flexC();
				height: 100%;
				min-width: 690rpx;
				margin: 0 auto;

				.inviteContentItem {
					@include cen();
					justify-content: space-between;
					margin-bottom: 40rpx;
					min-height: 40rpx;

					.leftLabel {
						@include font26();
						font-weight: bold;
						color: #FFFFFF;
					}

					.myInviteCodeBox {
						@include cen();
						min-width: 260rpx;
						justify-content: flex-end;

						text {
							@include font26();
							color: #FFFFFF;
						}

						.copyBtn,
						.relationship,
						.redItem {
							min-width: 100rpx;
							height: 40rpx;
							line-height: 40rpx;
							@include font26();
							color: #FFF597;
							font-weight: bold;
							background: #910707;
							padding: 6rpx;
							border-radius: 8rpx;
							text-align: center;
							margin-left: 30rpx;
						}

						.relationship {
							width: 260rpx;
							height: 40rpx;
							margin-left: 0rpx;
						}

						.redItem {
							width: auto;
							padding: 12rpx 15rpx;
							color: #FFFFFF;
						}

						.people {
							@include cen();
							justify-content: space-around;
							width: 260rpx;
							height: 40rpx;
							background: #910707;
							padding: 6rpx;
							border-radius: 8rpx;

							text {
								color: #FFF597;
								font-weight: bold;
							}

							.onePeople {
								width: 20rpx;
								height: 24rpx;
							}

							.manyPeople {
								width: 30rpx;
								height: 24rpx;
							}
						}
					}
				}

				.extensionTitle {
					@include cen();
					justify-content: space-between;
					background: #910707;
					border-radius: 8rpx;
					padding: 11rpx 21rpx;

					text {
						@include font22();
						display: block;
						width: 40%;
						text-align: center;
						color: #FFFFFF;
					}

					.text2 {
						width: 30%;
					}
				}

				.extensionList {
					flex: 1;
					min-height: 100rpx;
					padding: 24rpx 21rpx;
					padding-top: 0;
					margin-top: 14rpx;

					.extensionItem {
						@include cen();
						justify-content: space-between;
						border-radius: 8rpx;
						padding: 11rpx 0;

						text {
							@include font22();
							display: block;
							width: 40%;
							text-align: center;
							color: #FFFFFF;
						}

						.text2 {
							width: 30%;
						}
					}
				}

				.seeExtensionRecord {
					@include font26();
					background: url('../../../static/game/gameCenter/buttonBg.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					padding: 26rpx 0;
					text-align: center;
					color: #FFF597;
					margin-bottom: 30rpx;
				}
			}
		}
	}

	.popUpOut {
		@include flexC();
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

	.noDataTip {
		@include font20();
		text-align: center;
		margin-top: 10rpx;
		color: #FFFFFF;
	}
</style>
