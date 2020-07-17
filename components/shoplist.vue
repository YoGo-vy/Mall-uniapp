<template>
	<!-- 商品列表 -->
	<view class="shop_list">
		<view class="shop_item" v-for="(item, index) in goods" :key='index' @click="goodsDetail(item.id)">
			<image :src="item.img_url" mode=""></image>
			<view class="price">
				<text>￥{{item.sell_price}}</text>
				<text class="old_price">￥{{item.market_price}}</text>
			</view>
			<view class="decription">
				<text>{{item.zhaiyao}}</text>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		props:{
			goods:Array
		},
		data(){
			return {
				
			}
		},
		methods:{
			goodsDetail(id){
				// 路由跳转，路由传参
				uni.navigateTo({
					url:'/pages/shop/goodsdetail?id='+id
				})
				
			}
		}
	}
</script>

<style lang="less">
	.shop_list {
		display: flex;
		flex-wrap: wrap;
		margin: 0 18rpx;
		justify-content: space-between;
		& .shop_item {
			width: 350rpx;
			margin: 5rpx 0;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			& image {
				width: 260rpx;
				height: 300rpx;
				margin: 15rpx;
			}
			& .price {
				font-size: 30rpx;
				color: #B50E03;
				margin-top: 10rpx;
				& .old_price {
					font-size: 23rpx;
					color: #ccc;
					margin-left: 10rpx;
				}
			}
			& .decription {
				font-size: 26rpx;
				text-align: center;
				margin: 10rpx;
			}
		}
	}
</style>
