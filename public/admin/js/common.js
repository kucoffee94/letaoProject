$(function () {
    // 进度条的加载
    // 去进度环
    NProgress.configure({ showSpinner: false });
    $(document).ajaxStart(function () {
        // 进度条开始
        NProgress.start();
    });

    $(document).ajaxStop(function () {
        // 进度结束
        setTimeout(function () {
            NProgress.done();
        }, 5000);
    });
    // 公共部分头部导航动画 
    $('.lt_main .glyphicon-align-justify').on('click',function(){
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
    });
    // 分类管理部分二级菜单的下拉
    $('.lt_nav .glyphicon-th-list').parent().on('click',function(){
        $('.cate').slideToggle();
    });

    // 退出功能
    $('.lt_main .glyphicon-share').on('click',function(){
        $('.modal').modal('show')
        $('.btn_logout').off().on('click',function(){
            console.log(123);
            $.ajax({
                type:'get',
                url:'/employee/employeeLogout',
                success:function(data){
                    if(data.success){
                        location.href = 'login.html';
                    }
                }
            });
        });
    });




    // 导航被点击以后的样式
    // $(".lt_nav li>a").on('click',function(){
        
    //     $(this).add('now');

    // });




});