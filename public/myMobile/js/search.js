$(function () {
  //读取本地缓存
  function getStorage() {
    var arr = JSON.parse(localStorage.getItem('history'));
    return arr;
  }

  // 渲染历史记录
  function render() {
    var arr = getStorage();
    $('.lt_history').html(template('tpl', { list: arr }));
  }
  render();


  // setTimeout(function(){
  //   $('.lt_history').html("<div class='lt_loadAnimate'></div>");
  // },1000);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

  // 清空记录
  $('.lt_history').on('click', '.btn_deleteAll', function () {
    mui.confirm('您确定要清空历史记录吗？', '温馨提示', ['取消', '确定'], function (e) {
      if (e.index == 1) {
        localStorage.setItem('history', '[]');
        $('.lt_history ul').remove();
        render();
      }
    })

  });

  // 清除个别的历史记录
  $('.lt_history').on('click', '.btn_delete', function () {
    var id = $(this).data('id');
    mui.confirm('您确定要删除这条记录吗？','温馨提示',['取消','确定'],function(e){
      if( e.index == 1 ){
        var arr = getStorage();
        // 删除数组中的数据
        arr.splice(id, 1);
        // 更新本地缓存中的数据
        localStorage.setItem('history', JSON.stringify(arr));
        render();
      }
    });
  });

  // 添加历史记录
  $('.btn_search').on('click', function () {
    // 获取表单中的数据
    var text = $('.lt_search>input').val().trim();

    // 排除输入框未输入内容就添加数据的可能
    if( text == ''){
      mui.toast('请输入搜索关键字')
      return;
    }
    // 获取表单数据后，重置表单中的数据
    $('.lt_search>input').val('');
    // 获取本地缓存
    var arr = getStorage();

    // 存取表单中的数据在数组中的位置
    var index = arr.indexOf(text);
    //  最近搜索的数据提前
    if (index != -1) {
      arr.splice(index, 1);
    }

    // 判断数组的长度，若大于10，则删除最后一项（及最早的记录）
    if (arr.length > 10) {
      arr.pop();
    }
    // 将最近搜索的数据加入数组中
    arr.unshift(text);

    // 设置本地缓存
    localStorage.setItem('history', JSON.stringify(arr));
    // 重新渲染数据
    render();
    location.href = 'productList.html?key='+ text;
  });








});