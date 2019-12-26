$(function() {
    layui.use([ 'form', 'table' ], function() {
        // 变量定义
        var table = layui.table, form = layui.form;
        //类型
        initLX();
        //显示平台
        initXSPT();
        form.render();
    });

});

//会议签到考勤字典查询
function initLX(){
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


//会议签到考勤字典查询
function initXSPT(){
    var d = "<option value='' >请选择显示平台</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"显示平台"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=notxspt]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}