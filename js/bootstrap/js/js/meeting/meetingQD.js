$(function() {
    layui.use([ 'form', 'table' ], function() {
        // 变量定义
        var table = layui.table, form = layui.form;
        //会议考勤情况
        initKQQK()
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
                    field : 'singid',
                    width : '8%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '委员名称',
                    field : 'name',
                    width : '13.5%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '委员证号',
                    field : 'singwyzh',
                    width : '15%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '入场时间',
                    field : 'singrcsj',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '出场时间',
                    field : 'singccsj',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '考勤情况',
                    field : 'singkqqk',
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
                        toolbar='<a href="javascript:queryQDXQ('+ row+ ');" >查看详细</a>';
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

//会议签到考勤字典查询
function initKQQK(){
    var d = "<option value='' >请选择会议层次</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"考勤情况"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=singkqqk]").html(d);
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
            "name" : $("#name").val(),
            "singwyzh" : $("input[name=singwyzh]").val(),
            //获取下拉值必须用ID
            "singkqqk" : $("#singkqqk").val(),
        };
        console.log(paraments);
        table.reload('clientList', {
            url : 'sing/querySing',
            where : paraments
        });
    });
}



//查看详细
function queryQDXQ(row){
    console.log(row);
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "会议签到查看详细",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '780px', '380px' ],
            content : 'meetingQDXQ',
            btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                body.find('#singid').val(row.singid)
                body.find('#name').val(row.name)
                body.find('#singwyzh').val(row.singwyzh)
                body.find('#singrcsj').val(row.singrcsj)
                body.find('#singccsj').val(row.singccsj)
                body.find('#singkqqk').val(row.singkqqk)
            }
        });
    });
}

