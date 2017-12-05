$(function(){
  // 会员中心页面，用户登录成功以后，获取用户信息
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function(data){
      console.log(data);
      // 进入会员中心页面时，获取不到用户信息时，自动跳转到用户登录页面
      if( data.error == 400 ){
        location.href = 'login.html';
      }
      // 获取到用户信息后渲染数据到会员中心页面
      $('.user_info').html( template('tpl',data) );
    }
  });

  // 点击退出按钮退出登录
  $('.btn_logout>a').on('click',function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function(data){
        if( data.success ){
          location.href = 'login.html';
        }
      }
    });
  });
});