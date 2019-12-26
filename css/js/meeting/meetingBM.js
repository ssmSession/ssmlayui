$(function() {
    layui.use([ 'form', 'table' ], function() {
        // 变量定义
        var table = layui.table, form = layui.form;
        //会议层次
        initCC()
        //会议承办人
        initCBZ()
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
                    title : "序号",
                    type : 'numbers',
                    align : "center"
                },
                {
                    title : '会议名称',
                    field : 'meemc',
                    width : '10%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '会议主题',
                    field : 'meezt',
                    width : '10%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '会议层次',
                    field : 'meecc',
                    width : '8%',
                    align : "center"
                },
                {
                    title : '会议承办者',
                    field : 'meecbz',
                    width : '6%',
                    align : "center"
                },
                {
                    title : '会议召开时间',
                    field : 'meezksj',
                    width : '10%',
                    align : "center"
                },
                {
                    title : '会议召开地点',
                    field : 'meeaddress',
                    width : '10%',
                    align : "center"
                },
                {
                    title : '参加人员',
                    field : 'meecjry',
                    width : '8%',
                    align : "center"
                },
                {
                    title : '会议联系人',
                    field : 'meelxr',
                    width : '6%',
                    align : "center"
                },
                {
                    title : '会议联系电话',
                    field : 'meetel',
                    width : '10%',
                    align : "center"
                },
                {
                    title : '操作',
                    width : '20%',
                    field : "",
                    align : "center",
                    templet : function(data) {
                        var row = JSON.stringify(data).replace(/\"/g, "'");
                        toolbar = '<a href="javascript:queryBM(' + row + ');" >查看详细</a>&nbsp;';
                        toolbar += '<a href="javascript:addBM(' + row + ');" >报名</a>';
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

//会议层次字典查询
function initCC(){
    var d = "<option value='' >请选择会议层次</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"会议层次"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=meecc]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

//会议承办人字典查询
function initCBZ(){
    var d = "<option value='' >请选择会仪承办人</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"承办人"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=meecbz]").html(d);
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
            "meemc" : $("#meemc").val(),
            "meezt" : $("input[name=meezt]").val(),
            //获取下拉值必须用ID
            "meecc" : $("#meecc").val(),
            "meecbz" : $("#meecbz").val(),
            "start" : $("#start").val(),
            "end" : $("#end").val(),
            "meeaddress" : $("#meeaddress").val(),
            "meelxr" : $("#meelxr").val(),
            "meecjry" : $("#meecjry").val(),
            "meetel" : $("#meetel").val(),
        };
        console.log(paraments);
        table.reload('clientList', {
            url : 'meeting/queryMeeting',
            where : paraments
        });
    });
}


//报名
function addBM(row) {
    if(row.opgjzt=='已报送'){
        layer.confirm('已报送，不可以重复操作！！！');
    }else{
        layer.confirm('确认报名吗?',function(index, layero){
            $.ajax({
                url : "apply/add",
                data : {
                    meeid : row.meeid,
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
}



function queryBM(row){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "会议活动查看详细",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '780px', '400px' ],
            content : 'meetingCKXQ',
            btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                body.find('#meemc').val(row.meemc)
                body.find('#meezt').val(row.meezt)
                body.find('#meecc').val(row.meecc)
                body.find('#meecbz').val(row.meecbz)
                body.find('#meezksj').val(row.meezksj)
                body.find('#meeaddress').val(row.meeaddress)
                body.find('#meecjry').val(row.meecjry)
                body.find('#meelxr').val(row.meelxr)
                body.find('#meetel').val(row.meetel)
                body.find('#meebmrs').val(row.meebmrs)
            }
        });
    });
}
