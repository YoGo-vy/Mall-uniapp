
const BaseUrl = 'http://localhost:8082'

export const http = (option)=>{
	// pormise二次封装:
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BaseUrl+option.url,
			method:option.method || 'Get',
			data:option.data || {},
			success: (res) => {
				if(res.data.status !== 0){
					// 后台数据请求失败，结束返回
					return uni.showToast({
						title:'获取后台数据失败'
					})
					// return resolve(res) 不执行，promise对象操作获取不到异步请求结果
					// resolve(res)
				}
				// 请求成功
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口发生错误'
				})
				reject(err)
			}
		})
	})
}