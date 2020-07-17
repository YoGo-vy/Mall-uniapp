<template>
	<scroll-view class="news" scroll-y>
		<view class="news_item" v-for="(item, index) in newsList" :key="index" @click="newsDetail(item.id)">
			<image class="img" :src="item.img_url" mode="aspectFit"></image>
			<view class="content">
				<text class="title">{{item.title}}</text>
				<view class="news_msg">
					<text>发表时间：{{item.add_time|dataFormat}}</text>
					<text>浏览 {{item.click}}</text>
				</view>
			</view>
		</view>
		<view v-if="isEnd" class="loading_tips">
			---已无更多数据---
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			// 资讯列表数据
			newsList:[],
			isEnd:true
		};
	},
	methods:{
		async getNewsList(){
			const {data} = await this.$http({
				url:'/api/getnewslist',
				method:'GET'
			})
			this.newsList = data.message
		},
		newsDetail(id){
			uni.navigateTo({
				url:'/pages/news/newsdetail?id='+id
			})
		}
			
	},
	onPullDownRefresh() {
		this.newsList = []
		this.isEnd = false
		setTimeout(()=>{
			this.getNewsList()
			uni.stopPullDownRefresh()
			this.isEnd = true
		},800)
	},
	
	created() {
		this.getNewsList()
	}
}
</script>

<style lang="less">
page {
	height: 100%;
}
.news {
	height: 100%;
	padding: 10rpx 0;
	& .news_item {
		width: 88%;
		display: flex;
		flex-wrap: nowrap;
		padding: 20rpx;
		border-bottom: 1rpx solid #aaa;
		margin: 0 auto;
		& .img {
			width: 200rpx;
			height: 150rpx;
			margin-right: 20rpx;
		}
		& .content {
			padding: 12rpx 0;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			& .title {
				font-size: 30rpx;
			}
			& .news_msg{
				font-size: 26rpx;
				color: #aaa;
				display: flex;
				justify-content: space-between;
				
			}
		}
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
