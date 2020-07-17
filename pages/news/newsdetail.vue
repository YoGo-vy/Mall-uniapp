<template>
	<view class="news">
		<view class="title">
			{{newsData.title}}
		</view>
		<view class="add_time">
			<text>发表时间：{{newsData.add_time|dataFormat}}</text>
			<text>浏览：{{newsData.click}}</text>
		</view>
		<view class="content" v-html="newsData.content">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsId:0,
				newsData:{}
			};
		},
		onLoad(option) {
			this.newsId = option.id
		},
		async created() {
			const {data} = await this.$http({
				url:'/api/getnew/'+this.newsId
			})
			this.newsData = data.message[0]
		}
	}
</script>

<style lang="less">
.news {
	font-size: 30rpx;
	padding: 0 60rpx 200rpx;
	& .title {
		margin: 80rpx 0 60rpx;
		padding: 0 80rpx;
		font-size: 38rpx;
		font-weight: bold;
		text-align: center;
		
	}
	& .add_time {
		display: flex;
		justify-content: space-around;
		color: #aaa;
		margin-bottom: 50rpx;
	}
}

</style>
