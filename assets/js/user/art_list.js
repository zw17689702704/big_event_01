$(function () {
    // 向模板引擎中导入, 变量/函数
    template.defaults.imports.dateFormat = function (dateStr) {
        let dt = new Date(dateStr);
        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());

        return `${y}-${m}-${d}-${hh}:${mm}:${ss}`;
    }
    // 在个位数的左侧填充 0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //1.初始化文章列表(后面还要用,封装成函数)    
    let q = {
        pagenum: 1, //页数
        pagesize: 2, //每页显示多少条
        cate_id: "",  //筛选的内容
        state: "",  //筛选状态的内容
    }

    let layer = layui.layer;
    initTabel();
    //封装
    function initTabel() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                let htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr);

                //分页封装函数加入在 初始化里面
                renderPage(res.total);
            }
        })
    }

    //初始化文章分类
    let form = layui.form;
    initCate();
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //渲染
                let htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }


    //4.筛选功能
    // 在form 的提交事件上做  筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        let state = $('[name=state]').val();
        let cate_id = $('[name=cate_id]').val();
        //赋值  
        q.state = state;
        q.cate_id = cate_id;
        //渲染
        initTabel();
    })

    //5.分页
    let laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
            limit: q.pagesize,//每页显示几条
            count: total, //数据总数，从服务端得到
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'refresh', 'skip'],
            limits: [2, 5, 10],
            jump: function (obj, first) {
                if (!first) {
                    //讲页码值赋予 q.pagenum
                    q.pagenum = obj.curr;
                    //将页面内容个数赋予 q.pagesize 
                    q.pagesize = obj.limit;
                    //渲染
                    initTabel();
                }
            }
        });
    }

    //6.删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('是否要删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + Id,
                type: 'GET',
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message, { icon: 5 });
                    }
                    initTabel();
                    layer.msg('恭喜你删除成功');
                    //页面汇总删除按钮个数等于1,页码大于1
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    //if($('tbody tr').length==1 &&q.pagenum>1) q.pagenum--;
                    //因为删除成功后要重新渲染页面
                    initTabel();
                }
            })
            layer.close(index);
        })
    })
})