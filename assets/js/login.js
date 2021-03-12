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
    // const layer = layui.layer;
    // $('#form_reg').on('submit', function (e) {
    //     e.preventDefault();
    //     $.$.ajax({
    //         url: 'http://api-breakingnews-web.itheima.net/',
    //         type: 'post',
    //         data: {
    //             username: $('.reg-box[name=username]').val(),
    //             password: $('.reg-box[name=password]').val(),
    //         },
    //         success: (res) => {
    //             console.log(res);
    //         }
    //     })
    // })
})