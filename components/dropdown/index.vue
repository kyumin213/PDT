<template>
    <view class="dropdown">
        <view class="dropdown-mask"
        @click="handlerMask"
        ></view>
        <view class="ul">
            <view 
            class="li"
			:class="[item.value == currentValue?'active':'']"
            v-for="item in list" 
            :key="item.value"
            @click="handlerItem(item.value)"
            >
                {{item.name}}
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name:'dropdown',
    props:{
        list:{
            type:Array,
            default:() => ([])
        },
		currentValue:{
			type:Number,
			default:0
		}
    },
    methods:{
        handlerItem(value) {
            this.$emit('select',value)
        },
        handlerMask() {
            this.$emit('close')
        },
    }
}
</script>

<style scoped lang="scss">
.dropdown {
    position: absolute;
    z-index:99999999999;
    .ul {
        position:relative;
        z-index: 99999999999;
        list-style: none ;
        background-color: #410204;
        border-radius: 4rpx;
        padding-left: 0;
        border-top: 1px solid #410204;
        border-bottom: 1px solid #410204;
		max-height: 214rpx;
		overflow: auto;
        box-shadow: 10rpx 10rpx 20rpx rgba(224, 32, 32, 0.2);
		box-sizing: border-box;
        .li{
            color: #FFFFFF;
            padding: 25rpx 28rpx;
            border-bottom: 1px solid #410204;
            border-left: 1px solid #410204;
            border-right: 1px solid #410204;
			background-color: #91060a;
            font-size: 24rpx;
        }
        .li:last-child{
            border-bottom: none;
        }
    }
    .dropdown-mask {
        top: 0;
        left: 0;
        position: fixed;
        width: 100vh;
        height: 100vw;
        z-index: 99999999999;
        touch-action: none;
    }
	.active{
        background-color: #6f0306 !important;
	}
}
</style>