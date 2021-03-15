$(function () {

    //需求1：ajax获取用户信息，渲染到页面
    //这个功能，后面其他的页面\
    grtUserInfo();


    //2.退出功能
    let layer = layui.layer;
    $("#btnLogout").on('click', function () {
        layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //1.清空本地token
            localStorage.removeItem('myToken');
            //2.页面跳转
            location.href = '/login.html';
            //关闭询问框  框架自带
            layer.close(index);
        });
    })
});

function grtUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('myToken') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 });
            }
            //头像和文字渲染
            renderAvatar(res.data);
        },
        // complete: function (res) {
        //     console.log(res.responseJSON);
        //     //判断如果状态是1 错误信息是身份认证失败  那么就销毁当前
        //     let obj = res.responseJSON;
        //     if (obj.status == 1 && obj.message === "身份认证失败！") {
        //         //跳转到 登录页面 销毁token
        //         localStorage.removeItem('myToken');
        //         location.href = "/login.html";
        //     }
        // }
    });
}

//头像文字渲染封装
function renderAvatar(user) {
    // console.log(user);
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //2.渲染头像;判断图片头像是否存在
    if (user.user_pic == null) {
        //渲染文字头像，隐藏图片头像
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase());
    } else {
        //渲染图片头像，隐藏文字头像
        $('.layui-nav-img').attr("src", user_pic);
        $('.text-avatar').hide();
    }
}

