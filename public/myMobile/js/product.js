$(function () {
  var id = Tools.getParam('productId');
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function (data) {
      console.log(data);
      $('.mui-scroll').html("<div class='lt_loadAnimate'></div>");
      setTimeout(function () {
        // 模板与数据的结合
        $('.mui-scroll').html(template('tpl', data));
        // 动态重新加载mui插件
        mui('.mui-slider').slider({
          interval: 500
        });
        mui('.mui-numbox').numbox()
        // 尺码的点击选中
        $('.proSize>span').on('click', function () {
          $(this).addClass('now').siblings().removeClass('now');
        });
      }, 500);

    }
  });


  // 商品加入购物车
  $('.btn_addCart').on('click', function () {
    var size = $('.proSize>span.now').text();
    var num = $('.proNum .inp_num').val();
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:id,
        size:size,
        num:num 
      },
      success:function(data){
        console.log(data);
        if(data.error == 400 ){
          location.href = 'login.html?renURL='+location.href;
        }
        
        if(data.success){
          mui.confirm('加入购物车成功','温馨提示',['去购物车','继续逛逛'],function(e){
            if( e.index == 0 ){
              location.href = 'cart.html'
            }
          });
          
        }
      }
    });

  });




});