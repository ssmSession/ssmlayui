$(function() {
    initHf();
    initTables();
    // 给查询按钮绑定事件
    $("#queryHf").click(function() {
        queryHf();
    });
});
function initHf(){
    var d = "<option value='0' >请选择类型</option>";
    $.ajax({
        url:"http://localhost:8080/queryDict",
        data:{"dictype":"回复部门"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=rephfbm]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

// 初始化表格
function initTables() {
    layui.use('table',function() {
        var table = layui.table;
        table.render({
            id : "hf",
            elem : '#hf',
            height : "full-120",
            url : '',
            title : "社情民意回复查询",
            page : true,
            limit:3,
            limits:[3,6,9],
            method : "post",
            text : {
                none : '对不起，暂无此类数据'
            },

            request : {
                pageName : 'page',
                limitName : 'rows'
            },
            cols : [ [ // 表头
                {
                    title : "序号",
                    type : 'numbers',
                    align : "center"
                },
                {
                    title : '编号',
                    field : 'repid',
                    width : '16%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '回复标题',
                    field : 'repdorr',
                    width : '18%',
                    align : "center"
                },
                {
                    title : '对应社情民意',
                    field : 'repname',
                    width : '18%',
                    align : "center"
                },
                {
                    title : '回复单位',
                    field : 'repdw',
                    width : '14%',
                    align : "center"
                },
                {
                    title : '回复时间',
                    field : 'repdates',
                    width : '16%',
                    align : "center"
                },
                {
                    title : '操作',
                    width : '14%',
                    field : "",
                    align : "center",
                    templet : function(data) {
                        var row = JSON.stringify(data).replace(/\"/g, "'");
                        var btn='<a href="javascript:queryhf('+row+');" class="layui-btn layui-btn-xs">民意回复</a>';
                        return btn;
                    }
                }
            ] ],
            done : function(res, curr, count) {
                if(res.success==false)
                    layer.msg(res.message);
            }
        });
    });
}


// 查询
function queryHf() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            "repid" : $("#repid").val(),
            "repdorr" : $("#repdorr").val(),
            "rephfbm" : $("#rephfbm").val()
        };
        table.reload('hf', {
            url : 'http://localhost:8080/Reply/queryReplyHf',
            where : paraments,
            page:{
                curr:1,
            }
        });
    });
}



function queryhf(row){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "民意回复",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '1150px', '450px' ],
            content : 'meetsign.html',
            //btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                //获取新窗口对象
                var iframeWindow = layero.find('iframe')[0].contentWindow;
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                body.find('#repid').val(row.repid)
                body.find('#repname').val(row.repname)
                body.find('#repdates').val(row.repdates)
                body.find('#rephfbm').val(row.rephfbm)
                body.find('#repdorr').val(row.repdorr)
                //重新渲染
                iframeWindow.layui.form.render();
            }
        });
    });
}


