$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(data){
      $('.lt_left ul').html( template('tpl_left',data) );
       // 接收id
    var id = data.rows[0].id;
    renderCategory(id);
    }
  });
 

  $('.lt_left ul').on('click','li',function(){
    var id = $(this).data('id');
    $(this).addClass('now').siblings().removeClass('now');
    renderCategory(id);
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);
  })
  var renderCategory = function(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(data){
        $('.lt_right ul').html( template('tpl_right',data) );
      }
  
    });
  }
 


});