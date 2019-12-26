$(function() {
    layui.use([ 'form', 'table' ], function() {
        // 变量定义
        var table = layui.table, form = layui.form;
        //类型
        initTYPE()
        //表格
        initTable()
        // 给查询按钮绑定事件
        $("#btn_queryClient").click(function() {
            //查询方法
            queryClient();
        });
        $("#add_notice").click(function() {
            //查询方法
            addNotice();
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
            title : "会议活动查看",
            page : true,
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
                    field : 'notid',
                    width : '8%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '标题',
                    field : 'notbt',
                    width : '13.5%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '类型',
                    field : 'nottype',
                    width : '15%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '提交人',
                    field : 'notren',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '提交时间',
                    field : 'notdate',
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
                        toolbar='<a href="javascript:queryedit('+ row+ ');" >编辑</a>&nbsp;';
                        toolbar+='<a href="javascript:querydel('+ row+ ');" >删除</a>';
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
function initTYPE(){
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
            $("select[name=nottype]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}


//报名
function querydel(row) {
    layer.confirm('确认删除吗?',function(index, layero){
        $.ajax({
            url : "infrm/delNotice",
            data : {
                notid : row.notid,
            },
            type : "post",
            dataType : "json",
            success:function(data){
                if(data.success)
                    layer.msg(data.message);
                queryClient();
            }
        });
    });
}

//查询
function queryClient() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            //获取文本框值可以用name值或id
            "nottype" : $("#nottype").val(),
            "notbt" : $("input[name=notbt]").val(),
            //获取下拉值必须用ID
            "start" : $("#start").val(),
            "end" : $("#end").val(),
        };
        table.reload('clientList', {
            url : 'infrm/queryNotice',
            where : paraments
        });
    });
}


//添加通告
function addNotice(){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title: "添加通知公告",
            type: 2,
            anim: 1,
            offset: 'auto',
            area: ['920px', '350px'],
            content: 'infrmADD',
        });
    });
}



//编辑
function queryedit(row){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "通知管理修改",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '920px', '350px' ],
            content : 'infrmEdit',
            //                         btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                console.log(row);
                var iframeWindow = layero.find('iframe')[0].contentWindow;
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                console.log(row.nottype);
                console.log(row.notxspt);

                body.find('#notid').val(row.notid)
                body.find('#notbt').val(row.notbt)
                body.find('#notinfo').val(row.notinfo)
                body.find('#nottype').val(row.nottype)
                body.find('#notren').val(row.notren)
                body.find('#notxspt').val(row.notxspt)
                //重新渲染
                iframeWindow.layui.form.render();
            }
        });
    });
}

