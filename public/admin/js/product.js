$(function () {
  // 页面初始化数据渲染
  var currentPage = 1;
  var pageSize = 3;
  var render = function () {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
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
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'last':
                return '尾页';
              case 'next':
                return '下一页';
              default:
                return page;
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'last':
                return '尾页';
              case 'next':
                return '下一页';
              default:
                return '跳转到第' + page + '页';
            }
          },
          onPageClicked: function (a, b, c, p) {
            currentPage = p;
            render();
          }
        });
      }

    });
  }
  render();

  // 注册显示添加商品的模态框
  $('.add_pro').on('click', function () {
    $('#product_modal').modal('show');
    // 模态框中的二级分类的渲染
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: 1000
      },
      success: function (data) {
        $('#product_modal .dropdown-menu').html(template('tpl1', data));
        // 选择二级分类的处理
        $('#product_modal .dropdown-menu').on('click', 'a', function () {
          var id = $(this).data('id');
          var txt = $(this).text();
          $('.brand_id').val(id);
          $('.dropdown_text').text(txt);
          form.data('bootstrapValidator').updateStatus('brandId', 'VALID');
        });
      }
    });
  });

  // 上传图片
  var imgs = [];
  $('#file_up').fileupload({
    dateType: 'json',
    done: function (e, data) {
      if (imgs.length == 3) {
        return;
      }
      imgs.push(data.result);
      $('.img_box').append("<img src=" + data.result.picAddr + " width='100' height='100' alt=''>");
      if (imgs.length == 3) {
        form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
      }
    }
  });

  // 模态框中表单校验
  var form = $('form');
  form.bootstrapValidator({
    excluded: [],    // 隐藏域也参加校验
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品的名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须大于0'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品的尺码(32-46)'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的商品尺码(32-46)'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品的价格'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传3张商品图片'
          }
        }
      }
    }
  });

  form.on('success.form.bv', function (e) {
    e.preventDefault();
    // 参数处理
    var pram = form.serialize();
    pram += "&picName1="+imgs[0].picName+"&picAddr1="+imgs[0].picAddr;
    pram += "&picName2="+imgs[1].picName+"&picAddr2="+imgs[1].picAddr;
    pram += "&picName3="+imgs[2].picName+"&picAddr3="+imgs[2].picAddr;
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:pram,
      success:function(data){
        if(data.success){
          // 隐藏模态框
          $('#product_modal').modal('hide');
          form.data('bootstrapValidator').resetForm();
          form[0].reset();
          $("[name='statu']").val('1');
          $('.dropdown_text').text('请选择二级分类');
          $('.img_box>img').remove();
          // 刷新页面
          currentPage = 1;
          render();
        }
      }
    });



  });




});