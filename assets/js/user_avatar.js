$(function () {
    let $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    $image.cropper(options);
    //2.点击按钮，选择图片
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })


    let layer = layui.layer;
    //3.选择图片后,修改裁剪区域
    $('#file').on('change', function (e) {
        //e.target 如果此事件为冒泡执行，e.target指向的就是目标阶段的执行
        let file = e.target.files[0];
        if (file === undefined || file === null) return layui.layer.msg("你必须选择一张图片");
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') //销毁的裁剪区域
            .attr('src', newImgURL) //重新设置图片路径
            .cropper(options)   //重新初始化裁剪区域
    })

    //4.修改头像
    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        // console.log(dataURL);
        // console.log(typeof dataURL);
        //ajax 发送
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: { avatar: dataURL },
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您，更换头像成功')
                window.parent.getUserInfo();
            }
        })
    })
})