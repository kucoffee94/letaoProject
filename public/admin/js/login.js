$(function(){
    var form = $('form');
//表单校验功能
  //1. 用户名不能为空
  //2. 密码不能为空
  //3. 密码长度是6-12
    form.bootstrapValidator({
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //设置校验字段
        fields:{
            username:{
                //配置username所有的校验规则
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
                        message:'密码长度在6-12之间'
                    },
                    callback:{
                        message:'密码不正确'
                    }
                }
            }
        }
    });
    form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:form.serialize(),
            success:function(data){
                if(data.success){
                    location.href('index.html');
                }
                if(data.error == 1000 ){
                  form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(data.error == 1001 ){
                    form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                  }
            }
        });
    });
    
    // 重置的功能
    $('button[type=reset]').on('click',function(){
        var validator = form.data('bootstrapValidator');
        validator.resetForm();
    });


});