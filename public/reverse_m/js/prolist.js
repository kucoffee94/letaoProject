$(function () {
  //获取地址栏参数
  var key = location.search.split('=')[1];
  // 设置搜索框的数据
  $('.inp_search').val(key);

  // ajax请求数据
  var render = function () {
    // 查询的参数处理
    var options = {};
    options.proName = $('.inp_search').val().trim();
    options.page = 1;
    options.pageSize = 100;

    // 判断当前是否有排序要求
    var nows = $('.sort_nav li a.now');
    if (nows.length == 1) {
      var type = nows.data('type');
      var value = nows.children('span').hasClass('mui-icon-arrowdown') ? 2 : 1;
      options[type] = value;
    }
    // 发送ajax请求
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: options,
      success: function (data) {
        console.log(data);
        $('.pro_list').html(template('tpl1', data));
      }
    });
  }
  render();

  // 给导航部分的li 注册点击事件
  $(".sort_nav a[data-type]").on('click', function () {

    if ($(this).hasClass('now')) {
      $(this).children('span').toggleClass('mui-icon-arrowdown').toggleClass('mui-icon-arrowup');
    }
    $(this).parent().siblings().find('span').addClass('mui-icon-arrowdown').removeClass('mui-icon-arrowup');
    $(this).addClass('now').parent().siblings().children('a').removeClass('now');

    // 发送ajax请求
    render();
  });


  // 当前页面的搜索按钮注册点击事件
  $('.btn_search').on('click',function(){
    render();
  });




});