var zTreeObj;
var table
var role_id;
$(function () {
    initZtree();
    layui.use('table', function () {
        var table = layui.table;
        iniTbale();
        function iniTbale() {
            table.render({
                elem: '#test'
                ,url:'queryRole'
                ,toolbar: '#toolbarDemo'
                ,title: '用户数据表'
                ,cols: [[
                    {type: 'checkbox', fixed: 'left'}
                    ,{field:'roleid', title:'编号', width:80, fixed: 'left', unresize: true, sort: true}
                    ,{field:'rolename', title:'角色名称', width:120, edit: 'text',templet: function(res){
                            return "<a style='color: #00a0e9' href='javascript:queryModule("+res.roleid+");'>"+res.rolename+"</a>"
                        }}
                    ,{field:'roleremark', title:'角色备注', width:150, edit: 'text'}
                ]]
                ,page: false
            });
        }
        // //头工具栏事件(不知为何无效)
        // table.on('toolbar(test)', function(obj){
        //     var checkStatus = table.checkStatus(obj.config.id);
        //     switch(obj.event){
        //         case 'add':
        //             var data = checkStatus.data;
        //             layer.alert(JSON.stringify(data));
        //             break;
        //         case 'edit':
        //             var data = checkStatus.data;
        //             layer.msg('选中了：'+ data.length + ' 个');
        //             break;
        //         case 'del':
        //             layer.msg(checkStatus.isAll ? '全选': '未全选');
        //             break;
        //     };
        // });
        $("#btn1").click(function () {
            saveRole();
        });
    });
});

//根据Id查询对应的模块信息
function queryModule(roleid) {
    role_id=roleid;
    // console.log(roleid);
    //取消所有选中状态的节点
    zTreeObj.checkAllNodes(false);
    $.ajax({
        url:'queryRoleModuleByRoleId',
        data:{'roleid':roleid},
        dataType:'json',
        type:'post',
        async:false,
        success:function(data){
	  		 // console.log(data);
            //zTreeObj=$.fn.zTree.init($('#authTree'),setting,data);
            //动态设置zTree中CheckBox为选中状态
            for(var i=0;i<data.length;i++){
                //根据id属性的值获取zTree中对应的TreeNode节点
                var node = zTreeObj.getNodeByParam("id",data[i]);
                //设置该TreeNode节点为选中状态
                zTreeObj.checkNode(node, true, false);
            }
        }
    });
}

//保存角色权限（模块信息）
function saveRole() {
    console.log(role_id);
    if(null==role_id||""==role_id){
        layer.alert('请选择角色');
        return false;
    }
    //获取zTree中CheckBox选中状态的节点
    //获取选中节点    getCheckedNodes：默认获取选中状态所有节点
    var nodes = zTreeObj.getCheckedNodes();
    //判断节点是否为空
    if(nodes.length>0){
        var moduleid="";
        //循环获取选中节点的id，并以，隔开
        for(var i=0;i<nodes.length;i++){
            moduleid+=nodes[i].id+",";
        }
        //将最后一个节点的,去除
        moduleid=moduleid.substring(0,moduleid.length-1);
        //console.log(moduleid);
        $.ajax({
            url:'saveRoleModule',
            data:{'roleid':role_id,'perid':moduleid},
            dataType:'json',
            type:'post',
            async:false,
            success:function(data){
//		  		  console.log(data);
                if(data.success){
                    $.messager.alert('警告',data.message);
                    //取消所有选中状态的节点
                    zTreeObj.checkAllNodes(false);
                    //刷新列表
                    $('#tb').datagrid('reload');
                }
                //zTreeObj=$.fn.zTree.init($('#authTree'),setting,data);
            }
        });
    }else{
        $.messager.alert('警告','请选择角色权限信息');
    }
}

var setting={
    check:{
        enable: true, //每个节点上是否显示 CheckBox
        chkStyle:"checkbox", // 添加生效
        chkboxType :{ "Y" : "p", "N" : "s" } //Y:勾选（参数：p:影响父节点），N：不勾（参数s：影响子节点）[p 和 s 为参数]
    },
    data: {
        simpleData: {//简单数据模式
            enable:true,
        }
    }
};

//初始化zTree插件
function initZtree() {
    $.ajax({
        url:'queryModuleList',
        data:{"1":1},
        dataType:'json',
        type:'post',
        async:false,
        success:function(data){
            // console.log(data);
            zTreeObj=$.fn.zTree.init($('#authTree'),setting,data);
        }
    });
}

