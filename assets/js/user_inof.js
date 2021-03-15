$(function () {
    // 1.校验规则定义
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.trim().length < 1 || value.trim().length > 6) {
                return "用户名称必须在 1~6位之间！"
            }
        }
    })


    // 2.展示用户信息(后面这个功能还要用，)
    let layer = layui.layer;
    initUserInof();
    function initUserInof() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //成功后渲染用户信息
                form.val("formUserInof", res.data);
            }
        })
    }

    //3.重置
    $("#btnReset").on('click', function (e) {
        e.preventDefault();
        //用上面的用户渲染方法实现
        initUserInof();
    })

    //4.修改提交
    $('form').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //成功后提示
                layer.msg("修改成功！", { icon: 6 });

                //此时的window指的是user_inof.html
                // console.log(window);
                // console.log(window.parent);
                window.parent.getUserInfo();
            }
        })
    })
})