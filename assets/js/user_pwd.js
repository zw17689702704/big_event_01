$(function () {
    // 1.定义密码规则
    let form = layui.form;
    form.verify({
        //密码
        //新密码
        //确认密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6-12位,且不能出现空格'
        ],
        samePwd: function (value) {
            //新密码和原密码一致后报错
            if (value == $('[name = oldPwd]').val()) {
                return "新密码和原密码不能一致";
            }
        },
        //确认新密码(必须和新密码一致)
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return "确认新密码必须和新密码一致";
            }
        }
    })

    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res.message);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("恭喜你，密码修改成功", { icon: 6 });
                $('.layui-form')[0].reset();
            }
        })
    })
})