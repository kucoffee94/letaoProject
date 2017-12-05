$(function () {
  // 
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",
      down: {
        auto: true,
        callback: function () {
          // 获取所有购物车内的商品信息
          $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            success: function (data) {
              setTimeout(function () {
                if (data.error == 400) {
                  // 说明用户没有登录
                  location.href = 'login.html?renURL=' + location.href;
                }
                // 获取数据后渲染数据
                $('#OA_task_2').html(template('tpl', { list: data }));
                //结束下拉刷新的效果
                mui("#refreshContainer").pullRefresh().endPulldownToRefresh();
              }, 1000);
            }
          });

        }
      }
    }
  });


  // 滑动后点击删除按钮
  $('#OA_task_2').on('tap', '.btn_delete', function () {
    // 获取需要删除的商品的id
    var id = $(this).data('id');
    // 提示框，需要用户确定是否删除该商品
    mui.confirm('您确定要删除该商品？', '温馨提示', ['确定', '取消'], function (e) {
      if (e.index == 0) {
        // 发送ajax请求
        $.ajax({
          type: 'get',
          url: '/cart/deleteCart',
          data: {
            id: [id]      //购物车id 数组
          },
          success: function (data) {
            //触发下拉刷新一次
            if (data.success) {
              mui('#refreshContainer').pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });

  });


  // 滑动后点击编辑按钮
  $('#OA_task_2').on('tap','.btn_edit',function(){
    var data = this.dataset;
    var html = template('tpl2',data);
    // 拼接后的字符串中含有换行，利用replace函数，去除换行
    html = html.replace(/\n/g,'');

    mui.confirm(html,'编辑商品',['确定','取消'],function(e){
      // 重新获取修改后的数据
      data.num = $('.mui-numbox .inp_num').val().trim();
      data.size = $('.proSize>span.now').text();
      // 发送ajax请求，修改数据
      if(e.index==0){
        $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:data,
          success:function(data){
            if( data.success ){
              // 下拉属性数据
              mui('#refreshContainer').pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });

    // 修改尺码手动添加类
    $('.proSize>span').on('click',function(){
      $(this).addClass('now').siblings().removeClass('now');
    });

    // 动态生成的数字输入框，初始化
    mui('.mui-numbox').numbox();

  });


  // 点击复选框后，计算总金额
  $('#OA_task_2').on('change','.ck',function(){
    // if( this.checked ){
    //   var data = this.dataset;
    // }
    // 存储总金额
    var total = 0;
    $(':checked').each(function(i){
      total += $(this).data('price')*$(this).data('num')
    });
    //对总金额进行处理
    total = total.toFixed(2);
    $('.lt_book .lt_total').text(total);

  });

});