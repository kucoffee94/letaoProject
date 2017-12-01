$(function () {
  // 去除圆弧进度条
  NProgress.configure({
    showSpinner:false
  });
  // 设置进度条
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxStop(function(){
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });

  // 进行用户信息的判断
  if( location.href.indexOf('login.html') == -1 ){
    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      success:function(data){
        if(data.error == 404){
          location.href = 'login.html';
        }
      }
    });
  }

  // 侧边栏分类管理动画
  $('.categories').on('click', function () {
    $('.category').slideToggle();
  });
  // 头部动画
  var icon_menu = $('.lt_main .icon_menu');
  var icon_logout = $('.lt_main .icon_logout');
  icon_menu.on('click', function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  });

  /*  退出登录模态框 */
  icon_logout.on('click', function () {
    $('.modal').modal('show');
  });
  $('.btn_logout').on('click', function () {
    // 隐藏模态框
    $('.modal').modal('hide');
    // 发送ajax请求
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