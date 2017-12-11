$(function(){
  var currentPage = 1;
  var pageSize = 5;
  // 渲染页面数据
  var render = function(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        console.log(data);
        $('tbody').html(template('tpl2',data) );
        // 渲染分页
        $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          itemTexts:function(type, page, current){
            switch(type){
              case 'first':
                return  '首页';
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
          // 页码的title属性
          ipTitles:function( type, page, current){
            switch(type){
              case 'first':
                return  '首页';
              case 'prev':
                return '上一页';
              case 'last':
                return '尾页';
              case 'next':
                return '下一页';
              default:
                return '跳转到第'+ page +'页';
            }
          },
          totalPages:Math.ceil(data.total/data.size),
          onPageClicked:function(a,b,c,p){
            // 重新渲染页面
            currentPage = p;
            render();
          }
        });
      }
    });
  }
  render();

  // 添加分类，显示模态框
  $('.add_pro').on('click',function(){
    $('#add_pro').modal('show');
     // 渲染二级分类
     $.ajax({
       type:'get',
       url:'/category/querySecondCategoryPaging',
       data:{
         page:currentPage,
         pageSize:100
       },
       success:function(data){
        console.log(data);
        $('.dropdown-menu').html( template('tpl',data) );
       }
     });
  });

  // 表单校验
  var form = $('form');
  form.bootstrapValidator({
    excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入库存数量'
          },
          regexp:{
            regexp:/^\d*$/,
            message:'请输入库存数量'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码(32-50)'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入正确的尺码(例如:32-50)'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品价格'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品价格'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传3张商品图片'
          }
        }
      }
    }
  });



  // 模态框中数据处理
  //  点击选择二级分类
  $('.dropdown-menu').on('click','li>a',function(){
    var id = $(this).data('id');
    var txt = $(this).text();
    $('.select_second').text(txt);
    $("[name='brandId']").val(id);
    form.data('bootstrapValidator').updateStatus('brandId','VALID');
  });
  // 点击上传图片
  var img = [];
  $('.img_file').fileupload({
    dataType:'json',
    done:function(e,data){
      if( img.length >= 3 ){
          return;
      }
      console.log(img.length);
      img.push(data.result);
      $('.creat_img').append("<img src='"+ data.result.picAddr +"' alt=''>");
     if( img.length == 3){
      form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
     }else{
      form.data('bootstrapValidator').updateStatus('brandLogo','INVALID');
     }
    }
  });

  // 注册表单验证成功事件
  form.on('success.form.bv',function(e){
    e.preventDefault();
      // 点击添加商品信息
      // 参数处理 &picName1="1.jpg"&picAddr1="images/1.jpg"
      var pram = form.serialize();
      pram += '&picName1='+img[0].picName+"&picAddr1="+img[0].picAddr;
      pram += '&picName2='+img[1].picName+"&picAddr2="+img[1].picAddr;
      pram += '&picName3='+img[2].picName+"&picAddr3="+img[2].picAddr;
      // 发送ajax请求
      $.ajax({
        type:'post',
        url:'/product/addProduct',
        data:pram,
        success:function(data){
          if(data.success){
            // 隐藏模态框
            $('#add_pro').modal('hide');
            // 清空表单数数据
            form.data('bootstrapValidator').resetForm();
            form[0].reset();
            $('.select_second').text("请选择二级分类");
            $("[name='brandId']").val('');
            $('.creat_img>img').remove();
            currentPage=1;
            render();
          }
        }
      });

  });






});