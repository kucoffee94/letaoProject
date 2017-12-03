// 轮播图动画
mui('.mui-slider').slider({
  interval: 500
});

// 区域滚动
mui('.mui-scroll-wrapper').scroll({
  indicators: false
});

// function getParamObj() {
//   // 获取搜索页传递过来的参数  
//   // 注意：url中的参数会进行转码，获取参数时，需要decodeURI解码
//   var search = decodeURI(location.search.trim());//"?key=1"
//   search = search.slice(1);
//   var arr = search.split('&');
//   var obj = {};
//   arr.forEach(function (e, i) {
//     var key = e.split('=')[0];
//     var value = e.split('=')[1];
//     obj[key] = value;
//   });
//   return obj;
// }
// function getParam(key) {
//   return getParamObj()[key];
// }

var Tools = {
  getParamObj: function () {
    // 获取搜索页传递过来的参数  
    // 注意：url中的参数会进行转码，获取参数时，需要decodeURI解码
    var search = decodeURI(location.search.trim());//"?key=1"
    search = search.slice(1);
    var arr = search.split('&');
    var obj = {};
    arr.forEach(function (e, i) {
      var key = e.split('=')[0];
      var value = e.split('=')[1];
      obj[key] = value;
    });
    return obj;
  },
  getParam: function (key) {
    return this.getParamObj()[key];
  }
}


