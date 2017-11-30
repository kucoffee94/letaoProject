$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var render = function () {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // 绑定模板和数据
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
  // 页面开始加载时渲染数据
  render();

  // 禁用启用事件
  $('tbody').on('click', '.btn', function () {
    // 显示用户模态框
    $('#user_modal').modal('show');
    // 存储传输的数据
    var id = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    $('.btn_user').off().on('click', function () {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (data) {
          if (data.success){
            //  隐藏模态框
            $('#user_modal').modal('hide');
            render();
          }

        }
      });
    });

  });


});