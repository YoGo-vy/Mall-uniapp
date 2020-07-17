<template>
	<view>
		<!-- 商品轮播图 -->
		<swiper class="goods_swiper" :indicator-dots="true" :autoplay="false" :duration="1000">
			<swiper-item v-for="(item,index) in swiperImgs" :key="index">
				<image class="goodsimg" :src="item.src" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<!-- 商品参数 -->
		<view class="goods_params">
			<view class="price">
				<text class="new_price">￥{{goodsParams.sell_price}}</text>
				<text><del>￥{{goodsParams.market_price}}</del></text>
			</view>
			<view class="title">
				<text>{{goodsParams.title}}</text>
			</view>
			<view class="goods_no">
				<text>货号：{{goodsParams.goods_no}}</text>
				<text>库存：{{goodsParams.stock_quantity}}</text>
			</view>
		</view>
		<!-- 商品介绍 -->
		<view class="introduction">
			<view class="title">
				详细介绍
			</view>
			<view class="goods_title" v-html="goodsIntroduce.title">
				<!-- <rich-text :nodes="goodsIntroduce.title"></rich-text> -->
			</view>
			<view class="goods_introduce" v-html="goodsIntroduce.content">
				<!-- <rich-text :nodes="goodsIntroduce.content"></rich-text> -->
			</view>
		</view>
		
		<!-- 加入购物车 -->
		<view class="addCart">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="service($event)" @buttonClick="buttonClick($event)" />
		</view>
	</view>
</template>

<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				// 当前goods商品id
				goodsId:0,
				// 商品轮播图片url
				swiperImgs:[],
				// 商品参数
				goodsParams:{},
				// 商品细节介绍
				goodsIntroduce:{},
				options: [
					{
				            icon: 'headphones',
				            text: '在线客服'
				        },  {
				            icon: 'cart',
				            text: '我的购物车',
				            info: 2
				        }],
				        buttonGroup: [{
				          text: '加入购物车',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        },
				        {
				          text: '立即购买',
				          backgroundColor: '#ffa200',
				          color: '#fff'
				        }
					]}
		},
		components:{
			uniGoodsNav
		},
		methods:{
			// 获取商品轮播图片
			async getSwiperImgs(){
				const {data} = await this.$http({
					url:'/api/getthumimages/'+this.goodsId,
					method:'GET'
				})
				this.swiperImgs = data.message
				console.log(this.swiperImgs)
			},
			
			// 获取商品参数
			async getGoodsParams(){
				const {data} = await this.$http({
					url:'/api/goods/getinfo/'+this.goodsId
				})
				this.goodsParams = data.message[0]
				
				console.log(this.goodsParams)
			},
			
			// 获取商品参数
			async getGoodsIntroduce(){
				const {data} = await this.$http({
					url:'/api/goods/getdesc/'+this.goodsId
				})
				this.goodsIntroduce = data.message[0]
				console.log(this.goodsIntroduce)
			},
			
			// 添加购物车组件事件绑定
			service (e) {
				uni.showToast({
				  title: `点击${e.content.text}`,
				  icon: 'none'
				})
			  },
			buttonClick (e) {
				/* 
				console.log(e)
				
				content:
				backgroundColor: (...)
				color: (...)
				text: (...)
				__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
				get backgroundColor: ƒ reactiveGetter()
				set backgroundColor: ƒ reactiveSetter(newVal)
				get color: ƒ reactiveGetter()
				set color: ƒ reactiveSetter(newVal)
				get text: ƒ reactiveGetter()
				set text: ƒ reactiveSetter(newVal)
				__proto__: Object
				index: 0,
				 */
				if(e.index){
					uni.showToast({
						title:'购买商品'
					})
				}else{
					uni.showToast({
						title:'添加购物车，info +1'
					})
					this.options[1].info++
				}
			  }
			
		},
		created() {
			this.getSwiperImgs()
			this.getGoodsParams()
			this.getGoodsIntroduce()
		},
		onLoad(option) {
			this.goodsId = option.id
		}
	}
</script>

<style lang="less">
.goods_swiper {
	width: 750rpx;
	height: 700rpx;
	& .goodsimg {
		width: 100%;
		height: 100%;
	}
}
.goods_params {
	font-size: 30rpx;
	padding: 30rpx;
	& .price {
		font-size: 36rpx;
		color: #ccc;
		& .new_price {
			color: #B50E03;
			margin-right: 20rpx;
			font-weight: bold;
		}
	}
	& .title {
		font-size: 34rpx;
		margin: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #ccc;
	}
	& .goods_no {
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		// border-bottom: 1rpx solid #ccc;
		color: #aaa;
		& text {
			margin: 10rpx;
		}
	}
}
.introduction {
	font-size: 30rpx;
	margin-top: 10rpx;
	border-top: 2rpx solid #ccc;
	padding: 0 20rpx;
	& .title {
		color: #B50E03;
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin: 60rpx 0;
	}
	& .goods_title {
		font-size: 36rpx;
		font-weight: bold;
		margin: 60rpx;
	}
	
}
.addCart {
	position:fixed;
	width: 100%;
	bottom: 0;
}
</style>
