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
                        var btn='<a class="layui-btn layui-btn-xs" lay-event="edit" href="javascript:edit('+row+');">编辑</a>';
                        btn+='<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" href="javascript:del('+row+');">删除</a>'
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

//编辑
function edit(row){
    var index = layui.layer.open({
        title : "编辑",
        type : 2,
        content : "uIAction_page_user_userEdit",//弹出层页面
        area: ['500px', '560px'],
        success : function(layero, index){
            //获取弹出层标签对象
            var body = layui.layer.getChildFrame('body', index);
            //获取新窗口对象
            var iframeWindow = layero.find('iframe')[0].contentWindow;
            // console.log(row);
            if(row){
                // // 取到弹出层里的元素，并把编辑的内容放进去
                body.find("#proid").val(row.proid);  //将选中的数据的id传到编辑页面的隐藏域，便于根据ID修改数据
                body.find("#period").val(row.period);  //届
                body.find("#next").val(row.next);  //几次会议
                body.find("#mark").val(row.mark);  //几号提案
                body.find("#protype").val(row.xd);//提案类型
                body.find("#proany").val(row.proany);  //案由
                body.find("#protar").val(row.protar);  //第一提案人
                body.find("#promc").val(row.promc);  //名次
                body.find("#prodp").val(row.prodp);  //党派
                body.find("#prowyzh").val(row.prodp);  //委员证号
                body.find("#postcode").val(row.postcode);  //邮政编号
                body.find("#protel").val(row.protel);  //联系电话
                body.find("#prodwjzw").val(row.prodwjzw);  //单位及职务
                body.find("#proemail").val(row.proemail);  //E-mail
                body.find("#protxdz").val(row.protxdz);  //通讯地址
                body.find("#editor").val(row.proany);  //提案内容
                body.find("#demo").val(formatterDate2(row.prodate));  //提案日期
                // console.log(formatterDate2(row.prodate).substring(""));
                if(row.proxgqk=="on"){
                    body.find("#proxgqk").attr("checked", "checked")//相关情况
                }

                //文件显示
                var demoListView = $('#demoList');
                $.ajax({
                    url:"File/queryFile",
                    data:{"fileid":row.fileid},
                    dataType:"json",
                    Type:"post",
                    async:false,
                    success:function(data){
                        // console.log(eval(data));
                        for(var i=0;i<data.length;i++){
                            var tr = $(['<tr id="upload-' + i + '">'
                                , '<td>' + data[i].realName + '</td>'
                                , '<td>' + (data[i].filesize / 1024 / 1024).toFixed(1) + 'M</td>'
                                , '</tr>'].join(''));
                            body.find("#demoList").append(tr);
                        }
                    }
                });

                body.find("#fileid").val(row.fileid);  //文件
                body.find("#procbdw").val(row.xd1);  //承办单位
                body.find("#prolxrxm").val(row.prolxrxm);  //提案联系人
                body.find("#prolxrdw").val(row.prolxrdw);  //提案联系人单位
                body.find("#prolxrdh").val(row.prolxrdh);  //提案联系人电话
                body.find("#joinid").val(row.joinid);  //提案联系人电话
                body.find("#prostate").val(row.xd3);  //提案状态
                body.find("#procategory").val(row.xd2);  //办理情况
                body.find("#procase").val(row.xd4);  //提案类别
                // 记得重新渲染表单
                // form.render();
                //重新渲染
                iframeWindow.layui.form.render();
            }
            setTimeout(function(){
                layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                    tips: 3
                });
            },500)
        }
    });
    layui.layer.full(index);//设置弹出层布满窗口
    //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
    $(window).on("resize",function(){
        // layui.layer.full(window.sessionStorage.getItem("index"));
    })
}

//删除
function del(row) {
    if(row.prostate=="未提交"){
        $.ajax({
            url:"deleteProposal",
            data:{"proid":row.proid},
            dataType:"json",
            Type:"post",
            async:false,
            success:function(data){
                if(data.success){
                    layer.alert(data.message, {
                        icon: 1,
                        title: "提示",
                        yes: function(index, layero){
                            //do something
                            initTables("");
                            layer.close(index); //如果设定了yes回调，需进行手工关闭
                        },
                        cancel: function(index, layero){
                            initTables("");
                        }
                    });
                }
            }
        });
    }else{
        layer.alert("未提交才能进行删除操作", {
            icon: 4,
            title: "提示",
        });
    }

}