$(function () {
    let layer = layui.layer;
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
    // 初始化富文本编辑器
    initEditor();


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 4.选择图片
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })

    $('#coverFile').on('change', function (e) {
        let file = e.target.files[0];
        if (file === undefined) {
            return layer.msg("你可以选择一张图片作为封面");
        }
        let newImgURL = URL.createObjectURL(file)
        //先销毁区域的裁剪区域,再重新设置图片区域,之后再创建新的裁剪区域
        $image.cropper('destroy')   //销毁旧的裁剪区域
            .attr('src', newImgURL) //重新设置图片路径
            .cropper(options)     //重新初始化裁剪区域
    });

    //6.参数状态值处理
    let state = "已发布";
    // let state = "";
    // $("#benSave1").on('click', function () {
    //     state = "已发布";
    // })
    $("#btnSave2").on('click', function () {
        state = "草稿";
    })

    // 7.发布文章
    $('#form_pub').on('submit', function (e) {
        e.preventDefault();
        //发布文章是上传文件操作,要使用 FormData 类型的数据
        let fd = new FormData(this);
        fd.append('state', state);

        $image.cropper('getCroppedCanvas', { //创建一个Canvas 画布
            window: 400,
            height: 280
        })
            //将Canvas 画布上的内容,转换为文件对象
            .toBlob(function (blob) {
                //得到文件对象后,进行后续的操作
                fd.append('cover_img', blob);
                //!!!发哦是那个 ajax 要在toBlob()函数里面
                // console.log(...fd);

                publishArticle(fd);
            });
    });

    // 封装，添加文字的方法
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            type: 'POST',
            data: fd,
            //formData类型数据ajax提交，需要设置两个false
            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜你发布成功!');
                location.href = '/article/art_list.html'
            }
        })

    }

})