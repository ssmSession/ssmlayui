$(function(){
    $('#btn').click(function(){
        Custs();
    });
});


function Custs(){
    $.ajax({
        url:'queryTj',
        data:{"statr" : $("#statr").val(),"end" : $("#end").val()},
        type:'post',
        dataType:'json',
        async:false,
        success:function(data) {
            if (data.success) {
                var opbsrsf = [];
                var count = [];
                $.each(data.data, function (ind, ele) {
                    opbsrsf.push(ele.opbsrsf);
                    count.push(ele.count);
                });
                var chart = Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '社区身份统计'
                    },
                    subtitle: {},
                    xAxis: {
                        crosshair: true,
                        categories: opbsrsf
                    },
                    yAxis: {
                        title: {
                            text: '报送人'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}%'
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{}: </td>' +
                        '<td style="padding:0"><b>{point.y}个</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        colorByPoint: true,
                        name: '报送人',
                        data: count,
                    }],
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    }
                    //下钻 数据  id 必须一致
                });
            }
            },
    });
}