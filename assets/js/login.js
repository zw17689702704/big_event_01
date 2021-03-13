$(function () {
    //入口函数
    $('#link_reg').on("click", function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on("click", function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义验证规则
    const form = layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位，且不能输入空格"
        ],
        //确认密码规则
        repwd: function (value) {
            const pwd = $(".reg-box input[name=password]").val()
            //比较
            if (value !== pwd) {
                return "两次密码输入不一致！"
            }
        }
    });

    //4.注册功能
    const layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message, { icon: 5 });
                //提交成功后处理代码
                layer.msg('注册成功,请登录', { icon: 6 });
                //手动切换到登录
                $('#link_login').click();
                //重置form表单
                $('#form_reg')[0].reset();
            }
        })
    })


    //登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message, { icon: 5 });

                location.href = '/index.html';
                localStorage.setItem('myToken', res.token);
            }
        })
    })
})