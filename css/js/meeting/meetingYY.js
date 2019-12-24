$(function() {
    layui.use([ 'form', 'table' ], function() {
        // 变量定义
        var table = layui.table, form = layui.form;
        //会议考勤情况
        initHFQK()
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
            title : "会议签到",
            page : true,
            limit : 3,
            limit : [3,6,9],
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
                    title : '编号',
                    field : 'advid',
                    width : '8%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '标题',
                    field : 'meemc',
                    width : '13.5%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '回复情况',
                    field : 'advqk',
                    width : '15%',
                    sort : true,
                    align : "center"
                },
                {
                    title : '回复时间',
                    field : 'advsj',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '回复人',
                    field : 'advhf',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '履职人',
                    field : 'advzr',
                    width : '15%',
                    align : "center"
                },
                {
                    title : '操作',
                    width : '20%',
                    field : "",
                    align : "center",
                    templet : function(data) {
                        var row = JSON.stringify(data).replace(/\"/g, "'");
                        console.log(data.advqk)
                        var toolbar = null;
                        if(data.advqk=="已回复"){
                            toolbar='<a href="javascript:queryYYXQ('+ row+ ');" >查看详细</a>&nbsp;';
                            return toolbar;
                        }else{
                            toolbar='<a href="javascript:queryYYXQ('+ row+ ');" >查看详细</a>&nbsp;';
                            toolbar+='<a href="javascript:queryQKHF('+ row+ ');" >回复</a>';
                            return toolbar;
                        }
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

//会议签到考勤字典查询
function initHFQK(){
    var d = "<option value='' >请选择回复情况</option>";
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



//查询
function queryClient() {
    layui.use('table', function() {
        var table = layui.table;
        var paraments = {
            //获取文本框值可以用name值或id
            "meemc" : $("#meemc").val(),
            //获取下拉值必须用ID
            "advqk" : $("#advqk").val(),
        };
        console.log(paraments);
        table.reload('clientList', {
            url : 'advice/queryAdvice',
            where : paraments
        });
    });
}



//查看详细
function queryYYXQ(row){
    console.log(row);
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "异议回复查看详细",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '780px', '380px' ],
            content : 'meetingYYXQ',
            btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);
                body.find('#advid').val(row.advid)
                body.find('#meemc').val(row.meemc)
                body.find('#advqk').val(row.advqk)
                body.find('#advsj').val(row.advsj)
                body.find('#advhf').val(row.advhf)
                body.find('#advzr').val(row.advzr)
            }
        });
    });
}


//编辑
function queryQKHF(row){
    layui.use([ 'layer' ], function() {
        var layer = layui.layer;
        layer.open({
            // id : "orderLine",
            title : "异议回复",
            type : 2,
            anim : 1,
            offset : 'auto',
            area : [ '780px', '350px' ],
            content : 'meetingYYHF',
            //                         btn : [ '返回', '关闭' ],
            success : function(layero, index) {
                var iframeWindow = layero.find('iframe')[0].contentWindow;
                var body = layer.getChildFrame('body', index);
                // var iframeWin = window[layero.find('iframe')[0]['name']];
                //  iframeWin.initForm(row);

                body.find('#advid').val(row.advid)
                body.find('#meemc').val(row.meemc)
                body.find('#advqk').val(row.advqk)
                body.find('#advsj').val(row.advsj)
                body.find('#advhf').val(row.advhf)
                body.find('#advzr').val(row.advzr)
                //重新渲染
                iframeWindow.layui.form.render();
            }
        });
    });
}

