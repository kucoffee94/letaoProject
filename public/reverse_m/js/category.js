$(function(){
  // 发送ajax请求,获取分类
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(data){
      console.log(data);
      $('.category_name').html( template('tpl1',data) );
    }
  });


  // 发送ajax请求，获取品牌信息
  // 获取分类信息
  var id = 1;
  var render =function(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id : id
      },
      success:function( data ){
        console.log(data);
        $('.category_main').html( template('tpl2',data) );
      }
    });
  }
  render();

  // 给侧边栏注册点击事件
  $('.category_name').on('click','li>a',function(){
    id = $(this).data('id');
    $(this).addClass('now').parent().siblings().children().removeClass('now');;
    render();
  });

});