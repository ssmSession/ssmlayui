$(function() {
    initBSRFL();
    initDWLX();
    initBGFS();
    initGJZT();
    initTable();
    // 给查询按钮绑定事件
    $("#queryCx").click(function() {
        queryCx();
    });
});
function initBSRFL(){
    var d = "<option value='0' >请选择类型</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"报送人身份"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=opbsrsf]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}
function initDWLX(){
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
            $("select[name=opdwllx]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}
function initBGFS(){
    var d = "<option value='0' >请选择类型</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"报关方式"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=opbgfs]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}
function initGJZT(){
    var d = "<option value='0' >请选择类型</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"稿件状态"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=opgjzt]").html(d);
            // form.render('select');//局部渲染select
        }
    });

}



// 初始化表格
function initTable() {
    layui.use('table',function() {
        var table = layui.table;
        table.render({
            id : "cx",
            elem : '#cx',
            height : "full-120",
            url : '',
            title : "社情民意查询",
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
                    title : '稿件状态',
                    field : 'opgjzt',
                    width : '13%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '提交人',
                    field : 'oplgrordw',
                    width : '13%',
                    align : "center"
                },
                {
                    title : '标题',
                    field : 'oplgbt',
                    width : '13%',
                    align : "center"
                },
                {
                    title : '反映人',
                    field : 'opfyr',
                    width : '13%',
                    align : "center"
                },
                {
                    title : '提交时间',
                    field : 'opbssj',
                    width : '13%',
                    align : "center"
                },
                {
                    title : '类别',
                    field : 'opsfgk',
                    width : '13%',
                    align : "center",
                    templet:function(value) {
                        if (value.opsfgk == 0) {
                            return "公开";
                        } else {
                            return "不公开";
                        }
                    }
                        },
                {
                    title : '操作',
                    width : '13%',
                    field : "",
                    align : "center",
                    templet : function(data) {
                        var row = JSON.stringify(data).replace(/\"/g, "'");
                        var btn='<a href="javascript:updateCx('+row+');" class="layui-btn layui-btn-xs">报送</a>';
                        btn+='&nbsp;<a href="javascript:updateTp('+row+');" class="layui-btn layui-btn-danger layui-btn-xs">投票</a>';
                        btn+='&nbsp;<a href="javascript:deleteCx('+row+');" class="layui-btn layui-btn-danger layui-btn-xs">删除</a>';
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
function queryCx() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            "oplgbt" : $("#oplgbt").val(),
            "opbsrsf" : $("#opbsrsf").val(),
            "statr" : $("#statr").val(),
            "end" : $("#end").val(),
            "oplgrordw":$("#oplgrordw").val(),
            "opfyr":$("#opfyr").val(),
            "opid":$("#opid").val(),
            "opdwllx":$("#opdwllx").val(),
            "opbgfs":$("#opbgfs").val(),
            "opgjzt":$("#opgjzt").val()
        };
        table.reload('cx', {
            url : 'queryOpinion',
            where : paraments,
            page:{
                curr:1,
            }
        });
    });
}


//报送
function updateCx(row){
    if(row.opgjzt=='已报送'){
        layer.confirm('已报送，不可以重复操作！！！');
    }else if(row.proid<10) {
        layer.confirm('必须到10票才可以报送，现在有'+row.proid+"票");
    }else{
    layer.confirm('确认报送'+row.opfyr+"这个客户？",function(index, layero){
        $.ajax({
            url : "updateyOpinion",
            data : {
                opid : row.opid,
                oplgbt:row.oplgbt,
                opdwllx:row.opdwllx
            },
            type : "post",
            dataType : "json",
            success:function(data){
                if(data.success)
                    layer.msg(data.message);
                    queryCx();
            }
        });
    });
    }
}

//删除
function deleteCx(row){
    if(row.opgjzt=='已报送'){
        layer.confirm('已报送，不可以删除！！！');
    }else {
        layer.confirm('确认删除' + row.opfyr + "这个客户？", function (index, layero) {
            $.ajax({
                url: "deleteOpinion",
                data: {
                    opid: row.opid
                },
                type: "post",
                dataType: "json",
                success: function (data) {
                    layer.msg(data.message);
                    if (data.success)
                        layer.msg(data.message);
                        queryCx();
                }
            });
        });
    }
}

//投票
function updateTp(row){
    if(row.opgjzt=='已报送'){
        layer.confirm('已报送，不可以投票！！！');
    }else {
        layer.confirm('确认投票给' + row.opfyr + "这个客户？", function (index, layero) {
            $.ajax({
                url: "updateTp",
                data: {
                    opid: row.opid,
                    proid: row.proid
                },
                type: "post",
                dataType: "json",
                success: function (data) {
                    layer.msg(data.message);
                    if (data.success)
                        layer.msg(data.message);
                        queryCx();
                }
            });
        });
    }
}

