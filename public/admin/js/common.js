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
        }, 500);
    });
    // 登录的ajax判断
    if ( location.href.indexOf('login.html') == -1) {
        $.ajax({
            type: 'get',
            url: '/employee/checkRootLogin',
            success: function (data) {
                if (data.error == 404 ) {
                    location.href = 'login.html';
                }
            }
        });
    }



    // 公共部分头部导航动画 
    $('.lt_main .glyphicon-align-justify').on('click', function () {
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
    });
    // 分类管理部分二级菜单的下拉
    $('.lt_nav .glyphicon-th-list').parent().on('click', function () {
        $('.cate').slideToggle();
    });

    // 退出功能
    $('.lt_main .glyphicon-share').on('click', function () {
        $('#logout_modal').modal('show')
        $('.btn_logout').off().on('click', function () {
            $('#logout_modal').modal('hide')
            $.ajax({
                type: 'get',
                url: '/employee/employeeLogout',
                success: function (data) {
                    if (data.success) {
                        location.href = 'login.html';
                    }
                }
            });
        });
    });

});