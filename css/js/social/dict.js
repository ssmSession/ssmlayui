$(function() {
    initDict();
    // 给查询按钮绑定事件
    $("#queryDict").click(function() {
        queryDict();
    });
});

// 初始化表格
function initDict() {
    layui.use('table',function() {
        var table = layui.table;
        table.render({
            id : "dict",
            elem : '#dict',
            height : "full-120",
            url : '',
            title : "字典查询",
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
                    title : '字典编号',
                    field : 'dicid',
                    width : '18%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '字典名称',
                    field : 'dicname',
                    width : '22%',
                    align : "center"
                },
                {
                    title : '字典类别',
                    field : 'dictype',
                    width : '18%',
                    align : "center"
                },
                {
                    title : '字典值',
                    field : 'dicvalue',
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
                        var btn='<a href="javascript:addD();" class="layui-btn layui-btn-xs">添加</a>';
                        btn+='&nbsp;<a href="javascript:updateD('+row+');" class="layui-btn layui-btn-danger layui-btn-xs">编辑</a>';
                        btn+='&nbsp;<a href="javascript:deleteD('+row+');" class="layui-btn layui-btn-danger layui-btn-xs">删除</a>';

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
function queryDict() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            "dicname" : $("#dicname").val()
        };
        table.reload('dict', {
            url : 'queryDictAll',
            where : paraments,
            page:{
                curr:1,
            }
        });
    });
}

function addD() {
    layer.open({
        type: 2,
        area: ['1000px', '450px'],
        title: '字典添加',
        anim: 1,
        content:'addDict',
        scrollbar: true,
        shadeClose: true,
        move: false,
        success: function (layero, index) {
            var body = layer.getChildFrame('body',index);//建立父子联系
            /*  var inputList = body.find('#meezksj');
              //$(inputList[1]).val(obj.data.cust_no);
              console.log(inputList)
              $(inputList).val(format(row.meezksj));*/
            var iframeWin = window[layero.find('iframe')[0]['name']];//得到iframe页的窗口对象，执行iframe页的方法：
        }
    });
}
//修改
function updateD(row){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "修改字典",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '920px', '350px' ],
            content : 'updateDict',
            //btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                body.find('#dicid').val(row.dicid)
                body.find('#dicname').val(row.dicname)
                body.find('#dictype').val(row.dictype)
                body.find('#dicvalue').val(row.dicvalue)
            }
        });
    });
}

//删除
function deleteD(row){
    layer.confirm('确认删除名称为' + row.dicname + "的这个字典吗？", function (index, layero) {
        $.ajax({
            url: "deleteDict",
            data: {
                dicid: row.dicid,
            },
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.success)
                    layer.msg(data.message);
                    queryDict();
            }
        });
    });
}

