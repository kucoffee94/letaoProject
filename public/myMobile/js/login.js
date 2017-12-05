$(function () {
  // 注册登录事件
  $('.btn_login').on('click', function () {
    var username = $("[name='username']").val().trim();
    var password = $("[name='password']").val().trim();
    //  判断用户输入的数据是否为空
    if ( !username ) {
      mui.toast('请输入用户名');
      return false;
    }
    if( !password ){
      mui.toast('请输入用户密码');
      return false;
    }
    // 发送ajax请求，判断用户是否合法
    $.ajax({
      type:'post',
      url:'/user/login',
      data:$('form').serialize(),
      success:function(data){
        if( data.error ){
          mui.toast(data.message)
        }
        if( data.success ){
          if( location.search.indexOf('?renURL=') == -1 ){
            location.href = 'user.html';
          }else{
            var search = location.search.replace('?renURL=','');
            location.href = search;
          }
          
        }
      }
    });



  });

});