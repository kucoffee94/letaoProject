$(function(){
  var id = Tools.getParam('productId');
  console.log(id);
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function(data){
      console.log(data);
      $('.mui-scroll').html("<div class='lt_loadAnimate'></div>");
      setTimeout(function(){
        // 模板与数据的结合
        $('.mui-scroll').html( template('tpl',data) );
        // 动态重新加载mui插件
        mui('.mui-slider').slider({ 
          interval:500
        });
        mui('.mui-numbox').numbox()
        // 尺码的点击选中
        $('.proSize>span').on('click',function(){
          $(this).addClass('now').siblings().removeClass('now');
        });
      },500);
     
    }
  });
});