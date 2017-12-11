$(function () {

  // 获取本地缓存的数据
  function getHistory() {
    // 获取本地缓存的历史数据
    var history = localStorage.getItem('lt_search_history');
    var arr = JSON.parse(history);
    return arr;
  }
  // 设置本地缓存的数据
  function setHistory(arr) {
    localStorage.setItem('lt_search_history', JSON.stringify(arr));
  }
  var arr = getHistory();
  // 渲染历史数据
  $('.history').html(template('tpl1', { list: arr }));

  // 注册点击事件删除历史数据，重新渲染
  // 单个删除历史数据
  $('.history').on('click', '.btn_delete', function () {
    var id = $(this).data('id');
    mui.confirm('您确定要删除这条历史数据吗？', '温馨提示', ['确定', '取消'], function (e) {
      if (e.index == 0) {
        // 删除数组中指定位置的字符
        arr.splice(id, 1);
        // 设置本地缓存
        setHistory(arr);
        // 获取本地缓存
        arr = getHistory();
        // 渲染缓存
        $('.history').html(template('tpl1', { list: arr }));
      }
    });
  });

  // 添加搜索的历史数据历史数据
  $('.btn_search').on('click', function () {
    var txt = $('.inp_search').val().trim();
     //  input框置空
     $('.inp_search').val('');
    if (txt == '') {
      mui.toast('请输入搜索关键字');
    } else {
      // 判断一下最新搜索的数据是否存在在本地缓存
      if( arr.indexOf(txt)!=-1){
        arr.splice(arr.indexOf(txt),1);
      }
      // 判断十足长度是否大于10 
      if( arr.length>=10){
        arr.pop();
      }
      arr.unshift(txt);
      // 将本地缓存的数据更新
      setHistory(arr);
      // 渲染缓存
      $('.history').html(template('tpl1', { list: arr }));
        // 跳转页面
        location.href = "prolist.html?key="+txt;



    }

  });

  // 清空历史数据
  $('.history').on('click','.btn_empty',function(){
    mui.confirm('您确定要清空历史数据？','温馨提示',['确定','取消'],function(e){
      if( e.index == 0 ){
        arr = [];
         // 设置本地缓存
         setHistory(arr);
         // 获取本地缓存
         arr = getHistory();
         // 渲染缓存
        $('.history').html(template('tpl1', { list: arr }));
      }
    });
  });


});