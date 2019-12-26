$(function() {
    layui.use([ 'form', 'table' ], function() {
        // 变量定义
        var table = layui.table, form = layui.form;
        //会议考勤情况
        initHY()
        //表格
        initTable()
        // 给查询按钮绑定事件
        $("#btn_queryClient").click(function() {
            //查询方法
            queryClient();
        });
        form.render();
    });
});



// 初始化表格
function initTable() {
    layui.use('table',function() {
        var table = layui.table;
        table.render({
            id : "clientList",
            elem : '#client',
            height : "full-120",
            url : '',
            title : "会议签到",
            page : true,
            limit : 3,
            limit : [3,6,9],
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
                    title : '编号',
                    field : 'recid',
                    width : '8%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '标题',
                    field : 'recbt',
                    width : '13.5%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '类型',
                    field : 'rechy',
                    width : '15%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '会议时间',
                    field : 'recsj',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '履职得分',
                    field : 'recdf',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '履职排行',
                    field : 'recpm',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '操作',
                    width : '20%',
                    field : "",
                    align : "center",
                    templet : function(data) {
                        var row = JSON.stringify(data).replace(/\"/g, "'");
                        var toolbar = null;
                        toolbar='<a href="javascript:queryJLXQ('+ row+ ');" >查看详细</a>';
                        return toolbar;
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

//履职记录类型字典查询
function initHY(){
    var d = "<option value='' >请选择类型</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"类型"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=rechy]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}



//查询
function queryClient() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            //获取文本框值可以用name值或id
            "rechy" : $("#rechy").val(),
            "recbt" : $("input[name=recbt]").val(),
            //获取下拉值必须用ID
            "recdf" : $("#recdf").val(),
        };
        console.log(paraments);
        table.reload('clientList', {
            url : 'record/queryRecord',
            where : paraments
        });
    });
}



//查看详细
function queryJLXQ(row){
    console.log(row);
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "履职记录查看详细",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '780px', '380px' ],
            content : 'meetingJLXQ',
            btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                body.find('#recid').val(row.recid)
                body.find('#recbt').val(row.recbt)
                body.find('#rechy').val(row.rechy)
                body.find('#recsj').val(row.recsj)
                body.find('#recdf').val(row.recdf)
                body.find('#recpm').val(row.recpm)
            }
        });
    });
}

