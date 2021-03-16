$(function () {
    //1.文章类别列表展示
    iniArtCateList();
    //封装函数用于引擎模板的使用
    function iniArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                console.log(res);
                //状态判断
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //获取不用弹框
                let htmlStr = template('tpl-art-cate', { data: res.data });
                $('tbody').html(htmlStr);
            }
        })
    }

    //2.显示添加文章分类列表
    let indexAdd = null;
    let layer = layui.layer;
    $('#btnAdd').on("click", function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html(),
        });
    })
    //3.用事件代理  添加文章分类
    $('body').on('submit', '#form-add', function (e) {
        //阻止表单默认提交
        e.preventDefault();

        //发送ajax
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //因为我们添加成功了，所以要重新渲染页面中的数据
                iniArtCateList();
                layer.msg("恭喜你添加成功", { icon: 6 });
                layer.close(indexAdd);
            }
        })
    })


    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html(),
        })

        // 4.2获取Id 发送ajax 获取数据 ，渲染到页面
        let Id = $(this).attr("data-id");
        $.ajax({
            url: '/my/article/cates/' + Id,
            method: 'GET',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('form-edit', res.data);
            }
        })
    })

    // 4.用事件代理完成 修改文章
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                iniArtCateList();
                layer.msg("恭喜你修改文章成功", { icon: 6 });
                layer.close(indexEdit);
            }
        })
    })

    //5.删除事件
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        //对话框
        layer.confirm('是否要删除?', { icon: 3, title: '提示' }, function (index) {

            $.ajax({
                url: '/my/article/deletecate/' + Id,
                type: 'GET',
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message, { icon: 5 });
                    }
                    iniArtCateList();
                    layer.msg('恭喜你删除成功');
                    //close 关闭
                    // layer.close(index);
                }
            })
        });
    })
})