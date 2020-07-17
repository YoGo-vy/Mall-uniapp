module.exports = {  
	// 配置使用全局less变量预置
	/* 
    css: {  
        loaderOptions: {  
            less: {  
                javascriptEnabled: true,  
                modifyVars: {  
                    'hack': `true; @import "${require('path').resolve(process.cwd(),'./src').replace(/\\/g,'\\\\')}/variables.less";`  
                }  
            }  
        }  
    }
	 */ 
	
	/* 
	css: {
	    loaderOptions: {
			
	      sass: {
	        prependData: `@import "~@/assets/name.scss";`// 改为自己路径
	      },
	      scss: {
	        prependData: `@import "~@/variables.scss";`  // 改为自己路径
	      },
		 
	      less:{
	        globalVars: {
	          primary: '#B50E03',
			  // $base_color: '#B50E03'
	        }
	      }
	    }
	  }
	  */
	  
}  