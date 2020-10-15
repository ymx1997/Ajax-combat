$(function () {

    // 登录接口获取token
    // $.ajax({
    //     type: 'POST',
    //     url: 'api/login',
    //     data: {
    //         username: 'admin',
    //         password: 'admin',
    //     },
    //     success: function (res) {
    //         console.log(res);
    //         // localStorage.setItem('mytoken', res.token)
    //     }
    // })


    // 获取轮播图列表 并渲染至页面
    // let status;
    function renderSwiper() {
        $.ajax({
            url: 'admin/swipers',
            success: function (res) {
                let html = template('tpl-swiper', res);
                $('tbody').html(html);
                // status = res.data.swiperstatus;
                console.log(res);
                console.log(res.data.swiperstatus);
                // if (res.data.swiperstatus == 1) {
                //     $('.yes').show();
                // } else if (res.data.swiperstatus == 2) {
                //     $('.no').show();
                // }
            }
        })
    }
    renderSwiper();


    // 点击上传按钮 实现图片上传
    $('button:contains("上传图片")').on('click', function () {
        // 触发文件域的上传
        $('input[type=file]').click();
    })

    $('.swiper-form').on('submit', function (e) {
        e.preventDefault();
        // console.log(this.files);
        let fd = new FormData(this);
        // console.log(fd);
        $.ajax({
            type: 'POST',
            url: 'admin/swipers',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                layer.msg(res.message)
                //  console.log(res)
                if (res.status == 0) {
                    renderSwiper();
                }
            }
        })
    })

    $('input[type=file]').on('change', function () {
        $('.swiper-form').submit();
    })

    // 点击删除按钮 删除图片
    $('tbody').on('click', 'button:contains("删除")', function () {
        let id = $(this).data('id');
        layer.confirm('您确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'DELETE',
                url: 'admin/swipers/' + id,
                success: function (res) {
                    layer.msg(res.message);
                    // console.log(res);
                    if (res.status == 0) {
                        renderSwiper();
                    }
                }
            })
            layer.close(index);
        });
    })


    // 点击按钮 切换轮播图状态
    $('tbody').on('click', 'span', function () {
        let id = $(this).data('id');
        let status = $(this).data('status');
        // console.log(status);
        if (status == 1) {
            // 说明是勾选状态
            $.ajax({
                type: 'PUT',
                url: 'admin/swipers/' + id,
                data: { 'status': 2 },
                success: function (res) {
                    // that.hide().siblings().show();
                    layer.msg(res.message);
                    // console.log(res);
                    if (res.status == 0) {
                        renderSwiper();
                    }
                }
            })
        } else if (status == 2) {
            $.ajax({
                type: 'PUT',
                url: 'admin/swipers/' + id,
                data: { 'status': 1 },
                success: function (res) {
                    // that.hide().siblings().show();
                    layer.msg(res.message);
                    // console.log(res);
                    if (res.status == 0) {
                        renderSwiper();
                    }
                }
            })
        }


    })
})

