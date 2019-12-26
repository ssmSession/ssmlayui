document.write("<script language=javascript src='js/common.js'></script>");
$(function () {
    initPeriod();
    initDict();
    initDict2();
    initDict3();
    initDict4();
    layui.use(['form','laydate','table'], function() {
        var form = layui.form;
        var wheres;
        initTables(wheres);
        //查询
        $("#query").click(function () {
            wheres = {
                "period":$("#period").val(),
                "mark":$("#mark").val(),
                "protype":$("#protype").val(),
                "procbdw":$("#procbdw").val(),
                "procategory":$("#procategory").val(),
                "prostate":$("#prostate").val()
            };
            initTables(wheres);
        });
    });
});

// 初始化表格
function initTables(wheres) {
        var table = layui.table;
        table.render({
            id : "tb",
            elem : '#tb',
            height : "full-113",
            url : 'queryProposalPager',
            title : "提案查询",
            page : true,
            where:wheres,
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
                    title : "提案号",
                    field : 'mark',
                    align : "center",
                    width : '10%',
                    sort : true,
                },
                {
                    title : '提案类型',
                    field : 'protype',
                    width : '10%',
                    align : "center"
                },
                {
                    title : '提案类别',
                    field : 'procategory',
                    width : '10%',
                    align : "center"
                },
                {
                    title : '案由',
                    field : 'proany',
                    width : '20%',
                    align : "center"
                },
                {
                    title : '提案者',
                    field : 'protar',
                    width : '7%',
                    align : "center"
                },
                {
                    title : '办理单位',
                    field : 'procbdw',
                    width : '10%',
                    align : "center"
                },
                {
                    title : '办理情况',
                    field : 'procase',
                    width : '7%',
                    align : "center"
                },
                {
                    title : '提案状态',
                    field : 'prostate',
                    width : '7%',
                    align : "center"
                },
                {
                    title : '操作',
                    width : '10%',
                    field : "",
                    align : "center",
                    templet : function(data) {
                        // console.log(data);
                        var row = JSON.stringify(data).replace(/\"/g, "'");
                        var btn='<a class="layui-btn layui-btn-xs layui-btn-warm" lay-event="edit" href="javascript:edit('+row+');">附议</a>';
                        return btn;
                    }
                }
            ] ],
            done : function(res, curr, count) {
                if(res.success==false)
                    layer.msg(res.message);
            }
        });
}

//届次查询
function initPeriod(){
    var d = "<option value='' ></option>";
    $.ajax({
        url:"queryPeriod",
        data:{},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            // console.log(data);
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].period+"'>"+data[i].period+"</option>";
            }
            $("select[name=period]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

//字典查询
function initDict(){
    var d = "<option value='' ></option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"proposal"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            // console.log(data);
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=protype]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

//字典查询
function initDict2(){
    var d = "<option value='' ></option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"procbdw"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            // console.log(data);
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=procbdw]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

//字典查询
function initDict3(){
    var d = "<option value='' ></option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"category"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            // console.log(data);
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=procategory]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

//字典查询
function initDict4(){
    var d = "<option value='' ></option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"state"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            // console.log(data);
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=prostate]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}


// function edit(row) {
//     $.ajax({
//         url:"queryDict",
//         data:{"dictype":"state"},
//         dataType:"json",
//         Type:"post",
//         async:false,
//         success:function(data){
//             // console.log(data);
//             for(var i=0;i<data.length;i++){
//                 d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
//             }
//             $("select[name=prostate]").html(d);
//             // form.render('select');//局部渲染select
//         }
//     });
// }