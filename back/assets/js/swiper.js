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
    $.ajax({
        url: 'admin/swipers',
        success: function (res) {
            let html = template('tpl-swiper', res);
            $('tbody').html(html);
            console.log(res);
        }
    })


    // 点击上传按钮 实现图片上传
    $('button:contains("上传图片")').on('click', function () {
        // 触发文件域的上传
        $('input[type=file]').click();
    })
    $('.swiper-form').on('submit', function (e) {
        e.preventDefault();
        // console.log(this.files);
        let fd = new FormData(this);
        console.log(fd);
        $.ajax({
            type: 'POST',
            url: 'admin/swipers',
            data: {
                // swipers: this.files[0]
                swipers: []
            },
            success: function (res) {
                console.log(res);
            }
        })
    })

})