$(function(){
// 进度条的加载
    // 去进度环
    NProgress.configure({showSpinner:false});
    
    // 进度条开始
    NProgress.start();
    // 进度结束
    setTimeout(function(){
        NProgress.done();
    },500);


});