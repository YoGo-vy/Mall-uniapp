<template>
	<view class="content">
		
		<!-- 轮播图 -->
		<swiper class="nav-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="800" circular>
			<swiper-item v-for="(item ,index) in swiperImgs" :key='index' >
				<image :src="item.img" mode=""></image>
			</swiper-item>
		</swiper>
		
		<!-- nav -->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navIcon" :key='index' @click="go(item.path)">
				<view :class="['iconfont' ,item.icon]"></view>
				<text>{{item.text}}</text>
			</view>
		</view>
		
		<!-- 热门商品 -->
		<view class="hot_goods">
			<view class="title">
				当前推荐
			</view>
			<!-- 商品列表 -->
			<ShopList :goods='goodsList'></ShopList>
			
			<!-- tips -->
			<view v-show="isLoading" class="loading_tips">
				---正在加载---
			</view>
			<view v-if="isEnd" class="loading_tips">
				---我是有底线的---
			</view>
		</view>
	</view>
</template>

<script>
import ShopList from '../../components/shoplist.vue'
export default {
	data:function(){
		return {
			swiperImgs:[],
			navIcon:[
					{
						text:'商城热卖',
						icon:'icon-ziyuan',
						path:'/pages/shop/shop'
					},
					{
						text:'社区图片',
						icon:'icon-tupian',
						path:'/pages/pics/pics'
					},
					{
						text:'学习视频',
						icon:'icon-shipin',
						path:'/pages/videos/videos'
						
					},
					{
						text:'联系我们',
						icon:'icon-guanyuwomen',
						path:'/pages/contact/contact'
					}
				],
				
			// 上滑分页信息
			pageindex:1,
			goodsList:[],
			
			// 下拉加载状态
			isLoading:false,
			// 已加载所有数据
			isEnd:false
		}
	},
	components:{
		ShopList
	},
	methods:{
		// 获取轮播图数据
		async getSwiperImgs(){
			// 使用二次封装uni.request()
			const {data} = await this.$http({
				url:'/api/getlunbo'
			})
			this.swiperImgs = data.message
		},
		
		// 获取热门商品列表数据
		async getGoodList(callback){
			const {data} = await this.$http({
				url:'/api/getgoods?pageindex='+this.pageindex,
				method:'GET'
			})
			this.goodsList = [...this.goodsList,...data.message]
			if(data.message.length <= 0) {
				this.isEnd = true
			}
			callback && callback()
		},
		
		// nav路由跳转
		go(path){
			uni.navigateTo({
				url:path
			})
		},
		
		// 监听下拉刷新
		onPullDownRefresh(){
			this.pageindex = 1
			this.goodsList = []
			this.isEnd = false
			// 重新获取list内容
			setTimeout(()=>{
				// 回调函数形式，当完成新的数据请求，结束下拉刷新状态
				this.getGoodList(()=>{
					uni.stopPullDownRefresh()
				})
			},800)
		},
		
		// 监听上滑触底
		onReachBottom() {
			if(this.isEnd){
				// 到达底部，已无更过数据
				return 
			}
			this.pageindex +=1
			this.isLoading = true
			setTimeout(()=>{
				this.getGoodList(()=>{
					this.isLoading = false
				})
			},800)
		},
		
		
	},
	
	// 组件创建
	created() {
		this.getSwiperImgs()
		this.getGoodList()
	},
	
}
</script>

<style lang="less">
.nav-swiper {
	height: 380rpx;
	& image{
		width: 100%;
		height: 100%;
	}
}
.nav {
	display: flex;
	justify-content: center;
	& .nav-item {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		font-size: 30rpx;
		& .iconfont {
			margin: 15rpx 0;
			width: 120rpx;
			height: 120rpx;
			background-color: #B50E03;
			border-radius: 50%;
			line-height: 120rpx;
			font-size: 50rpx;
			color: #fff;
		}
		& .icon-tupian {
			font-size: 40rpx;
		}
	}
}
.hot_goods {
	background-color: pink;
	overflow: hidden;
	& .title{
		height: 90rpx;
		font-size: 50rpx;
		letter-spacing: 20rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
		margin: 8rpx 0;
		color: #B50E03;
		text-align: center;
		
	}
}
.loading_tips {
		margin: 50rpx 0 0;
		padding-bottom: 60rpx;
		color: #B50E03;
		text-align: center;
		font-size: 30rpx;
		letter-spacing: 10rpx;
		font-weight: bold;
	}

</style>
