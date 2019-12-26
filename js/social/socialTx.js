$(function() {
    initDL();
    initXL();
    initSF();
    //uuid
    function guid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        $("#fileid").val(S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }
});









function initDL(){
    var d = "<option value='' >请选择类型</option>";
    $.ajax({
        url:"http://localhost:8080/queryDict",
        data:{"dictype":"单位类型"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
								console.log(data[i].dicname)
            }
            $("select[name=opdwllx]").html(d);
           // form.render('select');//局部渲染select
        }
    });
}
function initXL(){
    var d = "<option value='' >请选择报关方式</option>";
    $.ajax({
        url:"http://localhost:8080/queryDict",
        data:{"dictype":"报关方式"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=opbgfs]").html(d);
            //form.render('select');//局部渲染select
        }
    });
}
function initSF(){
    var d = "<option value='' >请选择报送人身份</option>";
    $.ajax({
        url:"http://localhost:8080/queryDict",
        data:{"dictype":"报送人身份"},
        dataType:"json",
        Type:"post",
        async:false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                d += "<option value='"+data[i].dicid+"'>"+data[i].dicname+"</option>";
            }
            $("select[name=opbsrsf]").html(d);
            //form.render('select');//局部渲染select
        }
    });
}

