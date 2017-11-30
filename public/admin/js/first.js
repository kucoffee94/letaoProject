$(function(){
  // 渲染数据
  var currentPage = 1;//设置当前页
  var pageSize = 5;//页面显示数目
  // 发送ajax请求获取数据
  var render = function(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        $('tbody').html( template('tpl' , data ) );
        // 渲染分页
        $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil( data.total/data.size),
          onPageClicked:function(a,b,c,p){
            currentPage = p;
            render();
          }
        });
      }
    });
  }
  //渲染页面
  render();

  // 点击添加分类按钮，显示模态框
  $('.add_cate').on('click',function(){
    // 显示模态框
    $('.cate_modal').modal('show');

  });
  // 进行表单校验
  var form = $('form');
  form.bootstrapValidator({

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类名称'
          }
        }
      }
    }
  });
  //表单校验完成
  form.on('success.form.bv',function(e){
    // 阻止默认事件
    e.preventDefault();
    // 发送ajax请求
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:form.serialize(),
      success:function(){
        $('.cate_modal').modal('hide');
        // 重置表单，并且会隐藏所有的错误提示和图标
        form.data('bootstrapValidator').resetForm();
        // 重置input框信息
        form[0].reset();
        // 条到第一页显示数据
        currentPage = 1;
        render();
      }
    });

  });

  




});