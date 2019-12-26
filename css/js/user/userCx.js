$(function() {
    initUser();
    // 给查询按钮绑定事件
    $("#userCx").click(function() {
        userCx();
    });
});

// 初始化表格
function initUser() {
    layui.use('table',function() {
        var table = layui.table;
        table.render({
            id : "user",
            elem : '#user',
            height : "full-120",
            url : '',
            title : "用户管理",
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
                    title : '帐号',
                    field : 'username',
                    width : '18%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '姓名',
                    field : 'name',
                    width : '18%',
                    align : "center"
                },
                {
                    title : '性别',
                    field : 'sex',
                    width : '18%',
                    align : "center"
                },
                {
                    title : '手机号码',
                    field : 'tel',
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
                        var btn='<a href="javascript:addUser();" class="layui-btn layui-btn-xs">添加</a>';
                        btn+='&nbsp;<a href="javascript:updateUser('+row+');" class="layui-btn layui-btn-danger layui-btn-xs">修改</a>';
                        btn+='&nbsp;<a href="javascript:deleteUser('+row+');" class="layui-btn layui-btn-danger layui-btn-xs">删除</a>';
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
function userCx() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            "name" : $("#names").val()
        };
        table.reload('user', {
            url : 'queryUserPager',
            where : paraments,
            page:{
                curr:1,
            }
        });
    });
}

//添加
function addUser(){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "添加用户",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '780px', '400px' ],
            content : 'userAdd',
            //btn : [ '返回', '关闭' ],
            success : function(layero, index) {
            }
        });
    });
}

//修改
function updateUser(row){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "修改用户",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '780px', '400px' ],
            content : 'userUpdate',
            //btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var iframeWindow = layero.find('iframe')[0].contentWindow;
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                body.find('#username').val(row.username)
                body.find('#password').val(row.password)
                body.find('#name').val(row.name)
                body.find('#sex').val(row.sex)
                body.find('#age').val(row.age)
                body.find('#tel').val(row.tel)
                body.find('#roleid').val(row.roleid)
                body.find('#id').val(row.id)
                //重新渲染
                iframeWindow.layui.form.render();
            }
        });
    });
}

//删除
function deleteUser(row){
        layer.confirm('确认删除' + row.username + "这个用户？", function (index, layero) {
            $.ajax({
                url: "deleteUser",
                data: {
                    id: row.id
                },
                type: "post",
                dataType: "json",
                success: function (data) {
                    layer.msg(data.message);
                    if (data.success)
                        layer.msg(data.message);
                         userCx();
                }
            });
        });
}