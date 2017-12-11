$(function () {
  // 查询渲染二级分类
  var currentPage = 1;
  var pageSize = 5;
  var render = function () {
    $.ajax({
      type: 'get',
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // 模板与数据的结合
        $('tbody').html(template('tpl2', data));
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

  // 点击添加分类按钮
  $('.add_cate2').on('click', function () {
    $('#add_cate2').modal('show');
    // 渲染一级分类数据
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: 1000
      },
      success: function (data) {
        console.log(data);
        $('.dropdown-menu').html(template('tpl', data));
      }
    });
  });

  // 下拉框点击选择对应的数据
  $('.dropdown-menu').on('click','li>a',function(){
    var id = $(this).data('id');
    var txt = $(this).text();
    $('.select_first').text( txt );
    $("[name='categoryId']").val(id);
  });
  // 图片上传显示处理
  $('.img_file').fileupload({
    dataType:'json',
    done:function(e,data){
     $('.img').attr('src',data.result.picAddr);
     $("[name='brandLogo']").val(data.result.picAddr);
     form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });
  // 表单校验
  var form = $('form');
  form.bootstrapValidator({
    // 设置校验隐藏框
    excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传一张LOGO图片'
          }
        }
      }
    }
  });    
  form.on('success.form.bv',function(e){
    e.preventDefault();
      $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:form.serialize(),
        success:function( data ){
          if( data.success ){
            $('#add_cate2').modal('hide');
            // 重置表单
            form.data('bootstrapValidator').resetForm();
            $('.select_first').text('请选择一级分类');
            $('.img').attr('src','images/none.png');
            form[0].reset();
            // 刷新到第一页
            current=1;
            render();
          }
        }
      });
    });

}); 