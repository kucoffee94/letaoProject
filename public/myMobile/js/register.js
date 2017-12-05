$(function(){
  // 获取验证码
  $('.get_code').on('click',function(e){
    e.preventDefault();
     var mobile = $("[name='mobile']").val().trim();
     if( !mobile ){
        mui.toast('请输入手机号');
     }else if( !/^1[345789]\d{9}$/.test(mobile) ){
        mui.toast('请输入正确的手机号');
     }else{
       $.ajax({
         type:'get',
         url:'/user/vCode',
         success:function(data){
          console.log(data.vCode);
         }
       });
     }
  });

  // 点击注册按钮
  $('.btn_regist').on('click',function(e){
    e.preventDefault();

  // 对用户注册信息进行获取
  var username = $("[name='username']").val().trim();
  var password = $("[name='password']").val().trim();
  var repassword = $("[name='repassword']").val().trim();
  var mobile = $("[name='mobile']").val().trim();
  var vCode = $("[name='vCode']").val().trim();

  // 对用户注册信息进行判断
  if( !username ){
    mui.toast('请输入用户名');
    return false;
  }
  if( !password ){
    mui.toast('请输入用户密码');
    return false;
  }
  if( repassword != password ){
    mui.toast('两次输入的密码不一样！');
    return false;
  }
  if( !mobile ){
    mui.toast('请输入手机号');
    return false;
  }
  if( !vCode ){
    mui.toast('请输入验证码');
    return false;
  }

  if( $(".tips").hasClass('now') ){
    $.ajax({
      type:'post',
      url:'/user/register',
      data:$('form').serialize(),
      success:function(data){
        console.log(data);
        if( data.success ){
          location.href = 'login.html';
        }
        if( data.error ){
          mui.toast( data.message );
        }
      }
    });
  }else{
    $(this).addClass('disabled');
  }




  });

  // 判断服务协议选项框是否选中
  $('.tips input').on('click',function(){
    if( $(this).prop('checked') ){
      $('.btn_regist').removeClass('disabled');
      $('.tips').addClass('now');
    }else{
      $('.tips').removeClass('now');
    }
  });

  



});