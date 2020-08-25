let bgm = null
let tapMusic = null
let runing = null
let timeMusic = null
let winMusic = null
let looseMusic = null
let bgmMInit = function(){
	bgm = getApp().globalData.bgm
}
let tapMusicMInit = function(){
	tapMusic = getApp().globalData.tapMusic
}
let runingMInit = function(){
	runing = getApp().globalData.runing
}
let timeMusicMInit = function(){
	winMusic = getApp().globalData.winMusic
	looseMusic = getApp().globalData.looseMusic
}
let winMusicMInit = function(){
	winMusic = getApp().globalData.winMusic
}
let numPars = function(num){
	let res = ((num * 10) / 10).toFixed(1)
	if(res<0){
		res = 0
	}
	if(res>1){
		res = 1
	}
	return res
}

// bgm.loop = true
// bgm.volume = 0
// bgm.src = '../../static/game/gameCenter/bgm.mp3'
// bgm.onError((res) => {
// });
// bgm.onPlay(function(){
// })

// tapMusic.src = '../static/game/gameCenter/tapMusic.mp3'

// runing.loop = true
// runing.volume = 0
// runing.src = '../static/game/gameCenter/runing.mp3'


// timeMusic.loop = true
// timeMusic.src = '../static/game/gameCenter/timeMusic.mp3'

// winMusic.src = '../static/game/gameCenter/winMusic.mp3'

// looseMusic.src = '../static/game/gameCenter/looseMusic.mp3'

let bgmPlayInterval = null
let bgmPauseInterval = null
let runingPlayInterval = null
let runingStopInterval = null
let bgmSwitch= function(){
	return uni.getStorageSync('bgm')
}
let gameMusicSwitch = function(){
	return uni.getStorageSync('gameMuisc')
}

let bgmPlay = function() {
	console.log(bgmSwitch());
	if(bgmSwitch()){
		getApp().globalData.bgm.play()
	}
}
let bgmPause = function() {
	getApp().globalData.bgm.pause()
}
let bgmStop = function() {
	getApp().globalData.bgm.stop()
}
let tapMusicPlay = function(){
	if(gameMusicSwitch()){
		getApp().globalData.tapMusic.stop()
		getApp().globalData.tapMusic.play()
	}
}
// 抽奖时暂停背景音乐，抽奖停止时继续播放背景音乐
let runingPlay = function() {
	if(bgmSwitch()){
		getApp().globalData.runing.play()
	}
}
let runingStop = function() {
	if(getApp().globalData.runing != null){
		getApp().globalData.runing.stop()
	}
}
let timeMusicPlay = function(){
	if(gameMusicSwitch()){
		getApp().globalData.timeMusic.play()
	}
}

let timeMusicStop = function(){
	getApp().globalData.timeMusic.stop()
}
let winMusicPlay = function(){
	if(gameMusicSwitch()){
		getApp().globalData.winMusic.play()
	}
}
let winMusicStop = function (){
	if(getApp().globalData.winMusic != null){
		getApp().globalData.winMusic.stop()
	}
}

let looseMusicPlay = function(){
	if(gameMusicSwitch()){
		looseMusic.play()
	}
}

export default {
	bgmMInit,
	tapMusicMInit,
	runingMInit,
	timeMusicMInit,
	winMusicMInit,
	winMusic,
	bgmPlay,
	bgmPause,
	bgmStop,
	tapMusicPlay,
	runingPlay,
	runingStop,
	timeMusicPlay,
	timeMusicStop,
	winMusicPlay,
	winMusicStop
}
