$(function () {
  var currentPage = 1;
  var pageSize = 5;
  // 渲染数据
  var render = function () {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // 模板与数据的结合
        $('tbody').html(template('tpl', data));
        // 渲染分页
        $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / data.size),
          onPageClicked: function (a, b, c, p) {
            //存储当前页面
            currentPage = p;
            // 重新渲染页面
            render();
          }
        });
      }
    });
  }
  render();


  // 二级分类添加分类显示模态框
  $('.add_cate').on('click', function () {
    $('.cate_modal2').modal('show');
  });

  // 获取下拉框中一级菜单的数据
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
      page: currentPage,
      pageSize: 1000
    },
    success: function (data) {
      console.log(data);
      $('.dropdown-menu').html(template('tpl1', data));
    }
  });

  // 下拉框点击选择对应的数据
  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown_text').html($(this).text());
    $('.cate_id').val($(this).data('id'));
    form.data('bootstrapValidator').updateStatus('categoryId','VALID');
  })
// console.log( $("#file_up"));
  // 图片上传显示处理
  $("#file_up").fileupload({
    // 指定响应的格式
    dataType:'json',
    //图片上传成功之后的回调函数
    done:function(e,data){
      console.log(data.result.picAddr);
      $('.img_box>img').attr('src',data.result.picAddr);
      $('.img_box>input').val(data.result.picAddr);
      form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  
  // 表单校验
  var form = $('form');
  form.bootstrapValidator({
    // 默认不校验隐藏框，设为空数组，表示隐藏框也校验
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传一张品牌图片'
          }
        }
      }
    }

  });
  form.on('success.form.bv', function (e) {
    // 阻止默认行为
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:form.serialize(),
      success:function(data){
        if( data.success ){
          //  隐藏模态框
          $('.cate_modal2').modal('hide');
          // 清空表单校验样式和内容
          form.data('bootstrapValidator').resetForm();

          // 清空表单内的隐藏域
          // $("[type='hidden']").val('');

          // 清空二级菜单输入框内容
          $('#add_category').val('');
          form[0].reset();

          // 恢复一级分类内容
          $('.dropdown_text').text('请选择一级分类');
          // 恢复图片
          $('.img_box>img').attr('src',"images/none.png");
          $("[name='brandLogo']").val('');
          // 跳转到第一页刷新页面
          currentPage = 1;
          render();
        }
      }
    });
  });








});