//$.ajaxPrefilter() 可以调用 $.get() $.post() $.ajax() 立即处理
// 接受到Ajax 响应一会，也会触动这个方法；

//模拟 开发服务器路径地址

let baseURL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function (options) {
    //1.手动为url添加路径前缀
    options.url = baseURL + options.url;

    //2.包含 /my/ 路径的请求，就要手动添加Authorization
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('myToken') || ''
        }
    }

    options.complete = function (res) {
        // console.log(res.responseJSON);
        //判断如果状态是1 错误信息是身份认证失败  那么就销毁当前
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message === "身份认证失败！") {
            //跳转到 登录页面 销毁token
            localStorage.removeItem('myToken');
            //页面跳转
            location.href = "/login.html";
        }
    }
})