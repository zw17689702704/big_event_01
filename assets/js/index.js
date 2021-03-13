$(function () {


    grtUserInfo();
});

function grtUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('myToken') || ''
        },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 });
            }
            //头像和文字渲染
            renderAvatar(res.data);
        }
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