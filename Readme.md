# 社区商城（uni-app小程序）
>基于uni-app开发社区商城服务，实现应用商城服务中心，热门推荐，社区资讯，商城分类导航，商品详情展示，购物车结算，订单管理，个人账户管理等功能模块




```
npm install

```



```
npm run serve

```



```
npm run build

```





## 项目目录结构



```


│  App.vue                              
│  main.js                              //入口函数
│  manifest.json
│  pages.json
│  Readme.md                            //全局样式变量
│  uni.scss
│  vue.config.js                        //Vue配置文件
│
├─components
│  		│shoplist.vue                   //拆分商品列表展示组件
│  		│
│  		├─uni-goods-nav
│  		│
│  		└─uni-icons
├─pages
│  		├─category                      //商品分类
│  		│     	└─category.vue
│  		├─contact
│  		│      	└─contact.vue           //about
│ 	 	├─index
│  		│    	└─index.vue             //首页 
│  		├─news                          //资讯列表、资讯详情
│  		│    	├─news.vue          
│  		│     	└─newsdetail.vue    
│  		├─personal                      //用户中心
│  		│      	└─personal.vue
│  		├─pics
│  		│     └─pics.vue
│  		├─shop                          //商品列表、商品详细
│  		│     ├─goodsdetail.vue
│  		│     └─shop.vue
│  		└─shopCar                       //购物车
│          	  └─shopCar.vue
└─static                                //静态资源
  		├─font
 		├─icon
  		└─imgs
```




