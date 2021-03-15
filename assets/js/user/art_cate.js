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
})