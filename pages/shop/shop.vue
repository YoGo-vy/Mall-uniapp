<template>
	<view class="shop">
		<ShopList :goods='goodsList'></ShopList>
		<view v-show="isLoading" class="loading_tips">
			---正在加载---
		</view>
		<view v-if="isEnd" class="loading_tips">
			---我是有底线的---
		</view>
	</view>
</template>

<script>
import ShopList from '../../components/shoplist.vue'
export default {
	data(){
		return {
			goodsList:[],
			pageindex:1,
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
		async getGoodList(callback){
			const {data} = await this.$http({
				url:'/api/getgoods?pageindex='+this.pageindex
			})
			// 数组结构，追加获取的goods内容
			this.goodsList = [...this.goodsList,...data.message]
			
			// 判断当前后台数据是否已经加载完成
			if(data.message.length <= 0){
				this.isEnd = true
			}
			callback && callback()
		}
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
	
	created(){
		this.getGoodList()
	}
}

</script>

<style style="less">
	.shop {
	background-color: pink;
	padding-top: 20rpx;
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
