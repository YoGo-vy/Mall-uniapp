<template>
	<view class="pics">
		
		<!-- 左侧nav -->
		<scroll-view scroll-y="true" class="imgs_nav">
			<view :class="['item',currentIndex==index?'current':'']" v-for="(item,index) in imgCategory" 
			:key='index' @click="getDetail(index,item.id)">
				{{item.title}}
			</view>
		</scroll-view>
		
		<!-- 右侧详细区域 -->
		<scroll-view scroll-y="true" class="content">
			<view class="content_item" v-for="(item,index) in detail">
				<view class="title">
					{{item.title}}
				</view>
				<image @click="showImg(index)" class="img" :src="item.img_url" mode="aspectFit"></image>
				<view class="decription">
					{{item.zhaiyao}}
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgCategory:[],
				currentIndex:3,
				detail:[]
			};
		},
		
		methods:{
			// 获取左侧nav数据
			async getImgCategory(){
				const {data} = await this.$http({
					url:'/api/getimgcategory'
				})
				this.imgCategory = data.message
				
				// 获取默认展示item的右侧detail数据
				this.getDetail(this.currentIndex,17)
			},
			
			// 获取右侧信息数据
			async getDetail(index,id){
				this.currentIndex = index
				const {data} = await this.$http({
					url:'/api/getimages/'+id
				})
				this.detail = data.message
			},
			
			// 预览图片
			showImg(index){
				if(!this.previewImgs.length) {
					return 
				}
				uni.previewImage({
					current:index,
					urls:this.previewImgs,
					success: () => {
						console.log('1')
					}
				})
			}
		},
		
		computed:{
			
			// 预览图片集合
			previewImgs(){
				const imgs = []
				console.log(this.detail)
				if(this.detail.length){
					this.detail.forEach((item)=>{
						imgs.push(item.img_url)
					})
				}
				return imgs
				
			}
		},
		
		created(){
			this.getImgCategory()
		}
	}
</script>

<style lang="less">
// apge页面父盒子高度等于屏幕高度
page{
	height: 100%;
}
.pics {
	height: 100%;
	display: flex;
	& .imgs_nav {
		width: 200rpx;
		height: 100%;
		font-size: 32rpx;
		text-align: center;
		border-right: 1px solid #ccc;
		background-color: #F8F8F8;
		& .item {
			padding: 60rpx 20rpx;
			border-bottom: 1px solid #ccc;
		}
		& .current{
			background-color: #B50E03;
			color: #fff;
		}
	}
	& .content {
		padding-top: 20rpx;
		// height: 100%;
		flex: 1;
		& .content_item {
			text-align: center;
			margin: 50rpx 20rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #aaa;
			& .title {
				width: 66%;
				overflow: hidden;
				// white-space: nowrap;
				// text-overflow: ellipsis;
				margin: 10rpx auto;
				font-size: 32rpx;;
			}
			& .img{
				width: 90%;
			}
			& .decription {
				width: 100%;
				font-size: 30rpx;
				color: #aaa;
			}
		}
	} 
}
</style>
