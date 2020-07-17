<template>
	<view>
		<image class="img" src="../../static/imgs/contact.jpg" mode=""></image>
		<view class="call" @click="call()">
			联系电话： 1234567890 (点击拨打)
		</view>
		<view class="address">
			地址: 江西省南昌市红谷滩区赣江中大道秋水广场
		</view>
		<map class="map" scale="13" :latitude="location.latitude" :longitude="location.longitude"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				location:{
					latitude:28.688404,
					longitude:115.869317
				}
			}
		},
		methods:{
			call(){
				uni.makePhoneCall({
					phoneNumber:'1234567890'
				})
			}
		}
	}
</script>

<style lang="less">
.img {
	width: 750rpx;
	height: 360rpx;
}
.call , .address {
	margin: 20rpx 50rpx 0;
	padding-bottom: 30rpx;
	border-bottom: 1px solid #ccc;
	text-align: center;
	font-size: 30rpx;
	color: #aaa;
}
.map {
	margin-top: 20rpx;
	width: 750rpx;
	height: 400rpx;
}
</style>
