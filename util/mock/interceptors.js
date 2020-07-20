
// request请求拦截器
// 劫持uniapp请求。---使用装饰者函数 	---（函数职责单一原则，不需要修改请求函数）
// 实现函数、对象的扩展：1.函数继承；2.类的继承；3.原型链+函数混合的继承方式；4.装饰器函数扩展
// 装饰器函数扩展:前置执行函数和后置执行函数
Function.prototype.before = function( fn ){
    var self = this;
    return function(){
        let f = fn.apply( this, arguments );
        if( f ){
            console.log( arguments );
            let opt = arguments[0];
            let index = opt.url.lastIndexOf('/');
            var name = opt.url.substring(index+1);
            console.log(name);
            //这里mock返回， promise函数
            var url =` http://localhost:8080/${name}.json`;
            return mock(url);
        }
        return self.apply( this, arguments );
 
    }
}
function mock( url ){
    return uni.request({
        url: url, //仅为示例，并非真实接口地址。
        data: {
            text: new Date(),
        },
        method: 'GET',
        header: {
            'custom-header': 'hello' //自定义请求头信息
        }
    }).then( function( data ){
        return data[1].data;
    })
}