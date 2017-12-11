$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var render = function () {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        $('tbody').html(template('tpl', data));
        // 分页渲染
        $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / data.size),
          onPageClicked: function (a, b, c, p) {
            currentPage = p;
            render();
          }
        });
      }
    });
  }
  render();

  // 表单验证
  var form = $('form');
  form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  });
  form.on('success.form.bv', function (e) {
    e.preventDefault();
   
  });
   // 添加分类
   $('.add_cate1').on('click', function () {
    $('#add_cate1').modal('show');
    $('.add_first').on('click',function(){
      $.ajax({
        type:'post',
        url:"/category/addTopCategory",
        data:form.serialize(),
        success:function(data){
          if(data.success){
            //隐藏模态框
            $('#add_cate1').modal('hide');
            currentPage = 1;
            render();
          }
        }
      });
    });

  });


});