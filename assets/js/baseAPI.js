//$.ajaxPrefilter() 可以调用 $.get() $.post() $.ajax() 立即处理
// 接受到Ajax 响应一会，也会触动这个方法；

//模拟 开发服务器路径地址

let baseURL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function (options) {

    options.url = baseURL + options.url;
})