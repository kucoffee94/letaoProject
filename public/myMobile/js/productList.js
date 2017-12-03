$(function () {
  var key = Tools.getParam('key');
  // 搜索框中显示需要搜索的商品名
  $('.lt_search>input').val(key);
  // 封装渲染的函数
  function render() {

    // 对参数进行处理
    var param = {};
    param.proName = $('.lt_search>input').val();
    param.page = 1;
    param.pageSize = 100;

    var nows = $('.lt_nav>a.now');
    if (nows.length == 1) {
      var value = nows.children('span').hasClass('fa-angle-down') ? 2 : 1;
      var type = nows.data('type');
      param[type] = value;
    }

    $('.product').html(" <div class='lt_loadAnimate'></div>");
    // 发送ajax
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function (data) {
        console.log(data);
        setTimeout(function(){
          $('.product').html(template('tpl', data));
        },1000);

      }
    });
  }
  render();

  // 导航部分点击切换样式
  $('.lt_nav>a[data-type]').on('click', function () {
    // 小箭头切换
    if ($(this).hasClass('now')) {
      $(this).children('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      $(this).siblings().children('span').addClass('fa-angle-down').removeClass('fa-angle-up');
    }
    $(this).addClass('now').siblings().removeClass('now');
    render();
  });
  // 点击搜索框以后搜索数据
  $('.btn_search').on('click', function () {
    render();
  });
});