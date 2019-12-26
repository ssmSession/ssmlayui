var message;
$(function () {
    guid();
    initDict();
    initDict2();
    initDict3();
    layui.use(['form','upload'], function(){
        var form = layui.form;
        var $ = layui.jquery
            , upload = layui.upload;
        //多文件列表示例
        var demoListView = $('#demoList')
            , uploadListIns = upload.render({
            elem: '#testList'
            , url: 'File/upload?fileid='+$("#fileid").val()
            , accept: 'file'
            , multiple: true
            , auto: false
            , size: 200*1024*1024 //限制文件大小，单位 KB
            , bindAction: '#testListAction'
            , choose: function (obj) {
                var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                //读取本地文件
                obj.preview(function (index, file, result) {
                    var tr = $(['<tr id="upload-' + index + '">'
                        , '<td>' + file.name + '</td>'
                        , '<td>' + (file.size / 1024 / 1024).toFixed(1) + 'M</td>'
                        , '<td>等待上传</td>'
                        , '<td>'
                        , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                        , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                        , '</td>'
                        , '</tr>'].join(''));

                    //单个重传
                    tr.find('.demo-reload').on('click', function () {
                        obj.upload(index, file);
                    });

                    //删除
                    tr.find('.demo-delete').on('click', function () {
                        delete files[index]; //删除对应的文件
                        tr.remove();
                        uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    });
                    demoListView.append(tr);
                });
            }
            , done: function (res, index, upload) {
                if (res.code == 0) { //上传成功
                    message=res.code;
                    var tr = demoListView.find('tr#upload-' + index)
                        , tds = tr.children();
                    tds.eq(2).html('<span id="context" style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html(''); //清空操作
                    return ; //删除文件队列已经上传成功的文件
                }
                this.error(index, upload);
            }
            , error: function (index, upload) {
                message=1;
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
            }
        });

        //layui邮编验证
        form.verify({
            postcode: [
                /^[0-9]{6}$/
                ,'请输入正确的邮编'
            ],
            //提案号验证
            mark:function () {
                var verify;
                $.ajax({
                    url: 'queryProposal',
                    data:{"period": $("#period").val(),"next":$("#next").val(),"mark":$("#mark").val()},
                    dataType: "json",
                    Type: "post",
                    async: false,
                    success: function (data) {
                        if(data){
                            verify="提案号已存在";
                        }
                    }
                })
                return verify;
            }
        });

        //提交按钮监听
        $("#bindAction").click(function () {
            // console.log(1);
            if(message==1){
                layer.alert('请确保文件上传成功', {
                    icon: 5,
                    title: "提示"
                });
            }else {
                submit();
            }
        })
        //保存
        $("#save").click(function () {
            // console.log(1);
            if(message==1){
                layer.alert('请确保文件上传成功', {
                    icon: 5,
                    title: "提示"
                });
            }else {
                save();
            }
        })
        //提交方法
        function submit() {
            // 监听提交
            form.on('submit(form)', function(data){
                // console.log(data);
                // layer.msg(JSON.stringify(data.field));
                var datas=data.field;
                datas.prodate=new Date(datas.prodate);
                // if(null==datas.file||""==datas.file){
                //     datas.fileid="";
                // }
                datas.procategory=17;
                datas.prostate=10;
                datas.procase=18;
                $.ajax({
                    url: 'submit',
                    data:data.field,
                    dataType: "json",
                    Type: "post",
                    async: false,
                    success: function (data) {
                        layer.alert(data.message, {
                            icon: 6,
                            title: "提示",
                            yes: function(index, layero){
                                //do something
                                location.reload(false);
                                layer.close(index); //如果设定了yes回调，需进行手工关闭
                            },
                            cancel: function(index, layero){
                                location.reload(false);
                            }
                        });
                    }
                })
                return false;
            });
        }

        //提交方法
        function save() {
            // 监听提交
            form.on('submit(form)', function(data){
                // console.log(data);
                // layer.msg(JSON.stringify(data.field));
                var datas=data.field;
                datas.prodate=new Date(datas.prodate);
                // if(null==datas.file||""==datas.file){
                //     datas.fileid="";
                // }
                datas.procategory=17;
                datas.prostate=12;
                datas.procase="";
                $.ajax({
                    url: 'submit',
                    data:data.field,
                    dataType: "json",
                    Type: "post",
                    async: false,
                    success: function (data) {
                        layer.alert(data.message, {
                            icon: 6,
                            title: "提示",
                            yes: function(index, layero){
                                //do something
                                location.reload(false);
                                layer.close(index); //如果设定了yes回调，需进行手工关闭
                            },
                            cancel: function(index, layero){
                                location.reload(false);
                            }
                        });
                    }
                })
                return false;
            });
        }
        //取消按钮
        $("#reset").click(function () {
            //清空文件
            $("#demoList").remove();
            //提案取消 删除已上传的文件
            $.ajax({
                url: 'File/delete',
                data:{"fileid": $("#fileid").val()},
                dataType: "json",
                Type: "post",
                async: false,
                success: function (data) {
                }
            })
        });
    });
});

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


//uuid
function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    $("#fileid").val(S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}