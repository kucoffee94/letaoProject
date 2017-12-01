$(function(){
// 登录表单校验（初始化）
var form = $('form');
 form.bootstrapValidator({
   feedbackIcons:{
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
   },
   fields:{
     username:{
       validators:{
         notEmpty:{
           message:'用户名不能为空'
         },
         callback:{
           message:'用户名不存在'
         }
       }
     },
     password:{
       validators:{
        notEmpty:{
          message:'密码不能为空'
        },
        stringLength:{
          min:6,
          max:12,
          message:'用户密码在6-12位之间'
        },
        callback:{
          message:'用户名不存在'
        }
       }
     }

   }

 });

// 注册表单验证成功事件
form.on('success.form.bv',function(e){

  // 阻止默认事件
  e.preventDefault();
  // 发送ajax请求
  $.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    data:form.serialize(),
    success:function(data){
     if( data.success ){
      location.href = 'index.html'
     }
     if( data.error == 1000 ){
      form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
     }else if(data.error == 1001){
      form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
     }
    
    }
  });
});

// 注册重置按钮事件
$('.btn_reset').on('click',function(){
  form.data('bootstrapValidator').resetForm();
});






});