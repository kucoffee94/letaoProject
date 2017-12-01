$(function () {
  var currentPage = 1; //当前页
  var pageSize = 5;   //每页显示的数据数目

  // 发送ajax请求，渲染页面
  var render = function () {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // 模板与数据结合
        $('tbody').html(template('tpl', data));
        // 渲染分页
        $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / data.size),
          onPageClicked: function (a, b, c, p) {
            currentPage = p;
            render();
          }
        });

        // 用户的禁用和启用
        $('tbody').on('click', '.btn', function () {
          var id = $(this).parent().data('id');
          var isDelete = $(this).hasClass('btn-danger')? 0:1;
          // 显示模态框
          $('.user_modal').modal('show');
          $('.btn_sure').off().on('click',function(){
            $.ajax({
              type: 'post',
              url: '/user/updateUser',
              data: {
                id:id,
                isDelete:isDelete
              },
              success:function(data){
                console.log(data);
                if(data.success){
                  // 隐藏模态框
                  $('.user_modal').modal('hide');
                  render();
                }
              }
            });
          });
          
        });
      }

    });
  }
  render();


});