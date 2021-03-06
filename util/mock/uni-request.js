	
	// 封装uniapp request
function fetch({ 
    url,
    method = 'GET',
    data,
    showLoading = false,
    header = {
        'content-type': 'application/json'
    },
}) {
	// 加载中：显示透明蒙层
    if (showLoading) {
        uni.showLoading({
            mask: true
        });
    }
	
	// post请求
    if (method.toLowerCase() == 'post') {
        header['content-type'] = 'application/x-www-form-urlencoded'
    }
	
	// 开启异步请求任务
    return new Promise((resolve, reject) => {
        uni.request({
            url, //仅为示例，并非真实接口地址。
            header,
            data: {
                ...data,
				// 本地缓存中异步获取指定内容
                openid: uni.getStorageSync('openid') || '',
                language: uni.getStorageSync('language') || 'en'
            },
            method,
            success: (res) => {
                console.log(url, data, method, res);
                if (res.statusCode == 200) {
                    // if (res.data.status !== 0) {
                    //  uni.showToast({
                    //      icon: "none",
                    //      title: res.data.msg,
                    //      duration: 2000
                    //  })
                    // }
                    resolve(res.data)
                    if (showLoading) {
                        uni.hideLoading();
                    }
                } else {
                    reject(res)
                }
            },
            error(err) {
                reject(err)
                uni.hideLoading();
            }
        });
    })

}