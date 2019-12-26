$(function() {
    initML();
    initTables();
    // 给查询按钮绑定事件
    $("#queryMl").click(function() {
        queryMl();
    });
});
function initML(){
    var d = "<option value='0' >请选择类型</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"单位类型"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=repdw]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

// 初始化表格
function initTables() {
    layui.use('table',function() {
        var table = layui.table;
        table.render({
            id : "cyg",
            elem : '#cyg',
            height : "full-120",
            url : '',
            title : "采用稿查询",
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
                    title : '采用稿编号',
                    field : 'repid',
                    width : '18%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '采用稿名称',
                    field : 'repname',
                    width : '22%',
                    align : "center"
                },
                {
                    title : '采用单位',
                    field : 'repdw',
                    width : '18%',
                    align : "center"
                },
                {
                    title : '采用时间',
                    field : 'repdate',
                    width : '18%',
                    align : "center"
                },
                {
                    title : '操作',
                    width : '18%',
                    field : "",
                    align : "center",
                    templet : function(data) {
                        var row = JSON.stringify(data).replace(/\"/g, "'");
                        var btn='<a href="javascript:queryxx('+row+');" class="layui-btn layui-btn-xs">查看详细</a>';
                        btn+='&nbsp;<a href="javascript:deleteMl('+row+');" class="layui-btn layui-btn-danger layui-btn-xs">删除</a>';
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
function queryMl() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            "repid" : $("#repid").val(),
            "repname" : $("#repname").val(),
            "repdw" : $("#repdw").val()
        };
        table.reload('cyg', {
            url : 'Reply/queryReply',
            where : paraments,
            page:{
                curr:1,
            }
        });
    });
}



function queryxx(row){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
           // id : "orderLine",
            title : "采用稿详细",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '920px', '350px' ],
            content : 'Reply/queryMLL',
            btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var body = layer.getChildFrame('body', index);
               // var iframeWin = window[layero.find('iframe')[0]['name']];
              //  iframeWin.initForm(row);
                body.find('#repid').val(row.repid)
                body.find('#repname').val(row.repname)
                body.find('#repdws').val(row.repdw)
                body.find('#repdate').val(row.repdate)
            }
        });
    });
}

//删除
function deleteMl(row){
        layer.confirm('确认删除名称为' + row.repname + "的这个目录？", function (index, layero) {
            $.ajax({
                url: "Reply/deleteReply",
                data: {
                    repid: row.repid,
                    oplgbt: row.repname
                },
                type: "post",
                dataType: "json",
                success: function (data) {
                    layer.msg(data.message);
                    if (data.success)
                        layer.msg(data.message);
                        queryMl();
                }
            });
        });
}

