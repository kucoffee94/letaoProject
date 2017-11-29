// 柱形图
var myChart = echarts.init(document.querySelector('.lt_main_bar'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
        data:['人数']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [123, 123, 362, 234, 110, 230]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 饼形图
var myChart1 = echarts.init(document.querySelector('.lt_main_pie'));

// 指定图表的配置项和数据
var option = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','乔丹','新百伦','李宁','阿迪']
    },
    series : [
        {
            name: '销售量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'乔丹'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿迪'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option);