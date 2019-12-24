$(function() {
    initHf();
});
function initHf(){
    var d = "<option value='0' >请选择类型</option>";
    $.ajax({
        url:"queryDict",
        data:{"dictype":"回复部门"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=rephfbm]").html(d);
            // form.render('select');//局部渲染select
        }
    });
}

