$(function() {
    layui.use([ 'form', 'table' ], function() {
        // 变量定义
        var table = layui.table, form = layui.form;
        //回复情况
        initYYHF();
        //标题
        initBT();
        form.render();
    });

});

//会议签到考勤字典查询
function initYYHF(){
    var d = "<option value='' >请选择回复状态</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"回复情况"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=advqk]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

//会议签到考勤字典查询
function initBT(){
    var d = "<option value='' >请选择标题</option>";
    $.ajax({
        url:"meeting/dictMeeting",
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].meeid+"'>"+data[i].meezt+"</option>";
            }
            $("select[name=advbt]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}