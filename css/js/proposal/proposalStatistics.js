$(function(){
    initPeriod();
    unclassified();
    unaudited();
    count();
    layui.use(['layer', 'form'], function(){
        var layer = layui.layer
            ,form = layui.form;
    });
    queryData();
    $("#query").click(function () {
        unclassified();
        unaudited();
        count();
        queryData();
    });
});

function queryData() {
    $.ajax({
        url: "Statistics",
        data: {"period":$("#period").val()},
        dataType: "json",
        Type: "post",
        async: false,
        success: function (data) {
            initChart(data);
        }
    });
}

function initChart(data) {
    var myChart = echarts.init($("#chart")[0]);
    option = {
        title: {
            x: 'center',
            text: '提案分类统计图',
        },
        tooltip: {
            trigger: 'item'
        },

        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: true,
                data: data.x
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: true
            }
        ],
        series: [
            {
                name: '提案分类统计图',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: data.data,
                // markPoint: {
                //     tooltip: {
                //         trigger: 'item',
                //         backgroundColor: 'rgba(0,0,0,0)',
                //         formatter: function(params){
                //             return '<img src="'
                //                 + params.data.symbol.replace('image://', '')
                //                 + '"/>';
                //         }
                //     },
                //     data: [
                //         {xAxis:0, y: 25, name:'Line', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
                //         {xAxis:1, y: 25, name:'Bar', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
                //         {xAxis:2, y: 25, name:'Scatter', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
                //         {xAxis:3, y: 25, name:'K', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
                //         {xAxis:4, y: 25, name:'Pie', symbolSize:20, symbol: 'image://../asset/ico/饼状图.png'},
                //         {xAxis:5, y: 25, name:'Radar', symbolSize:20, symbol: 'image://../asset/ico/雷达图.png'},
                //         {xAxis:6, y: 25, name:'Chord', symbolSize:20, symbol: 'image://../asset/ico/和弦图.png'},
                //         {xAxis:7, y: 25, name:'Force', symbolSize:20, symbol: 'image://../asset/ico/力导向图.png'},
                //         {xAxis:8, y: 25, name:'Map', symbolSize:20, symbol: 'image://../asset/ico/地图.png'},
                //         {xAxis:9, y: 25, name:'Gauge', symbolSize:20, symbol: 'image://../asset/ico/仪表盘.png'},
                //         {xAxis:10, y: 25, name:'Funnel', symbolSize:20, symbol: 'image://../asset/ico/漏斗图.png'},
                //     ]
                // }
            }
        ]
    };
    myChart.setOption(option);
}

//届次查询
function initPeriod(){
    var d = "<option value='' ></option>";
    $.ajax({
        url:"queryPeriod",
        data:{},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            // console.log(data);
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].period+"'>"+data[i].period+"</option>";
            }
            $("select[name=period]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

function unclassified() {
    $.ajax({
        url: "unclassified",
        data: {"period":$("#period").val()},
        dataType: "json",
        Type: "post",
        async: false,
        success: function (data) {
            $("#d1").html(data+"件");
        }
    });
}

function unaudited() {
    $.ajax({
        url: "unaudited",
        data: {"period":$("#period").val()},
        dataType: "json",
        Type: "post",
        async: false,
        success: function (data) {
            $("#d2").html(data+"件");
        }
    });
}

function count() {
    $.ajax({
        url: "count",
        data: {"period":$("#period").val()},
        dataType: "json",
        Type: "post",
        async: false,
        success: function (data) {
            $("#d3").html(data+"件");
        }
    });
}