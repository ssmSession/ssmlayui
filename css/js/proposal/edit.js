var message;
$(function () {
    initDict4();
    layui.use(['form','upload'], function() {
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
        });

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
                // console.log(datas.prostate);
                // datas.procategory=17;
                datas.prostate=10;
                datas.procase=18;
                if(datas.prostate==12){
                    $.ajax({
                        url: 'updateProposal',
                        data:data.field,
                        dataType: "json",
                        Type: "post",
                        async: false,
                        success: function (data) {
                            if(data.success) {
                                layer.alert(data.message, {
                                    icon: 6,
                                    title: "提示",
                                    yes: function (index, layero) {
                                        //do something
                                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                        parent.layer.close(index);
                                        window.parent.location.reload();
                                        layer.close(index); //如果设定了yes回调，需进行手工关闭
                                    },
                                    cancel: function (index, layero) {
                                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                        parent.layer.close(index);
                                        window.parent.location.reload();
                                    }
                                });
                            }
                        }
                    })
                }else{
                    layer.alert("未提交才能进行编辑操作", {
                        icon: 4,
                        title: "提示",
                    });
                }
                return false;
            });
        }

        //审核
        $("#check").click(function () {
           check();
        });

    });
});

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

//审核
function check() {
    if($("#prostate").val()==10){
        $.ajax({
            url:"updateState",
            data:{"proid":$("#proid").val()},
            dataType:"json",
            Type:"post",
            async:false,
            success:function(data){
               if(data.success){
                layer.alert(data.message, {
                    icon: 6,
                    title: "提示",
                    yes: function(index, layero){
                        //do something
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index);
                        window.parent.location.reload();
                        layer.close(index); //如果设定了yes回调，需进行手工关闭
                    },
                    cancel: function(index, layero){
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index);
                        window.parent.location.reload();
                    }
                });
               }
            }
        });
    }else {
        layer.alert("已提交才能进行审核操作", {
            icon: 4,
            title: "提示",
        });
    }
}