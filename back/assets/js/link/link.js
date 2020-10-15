$(function () {
    // 获取链接列表
    // function getlinks() {
    //     $.ajax({
    //         url: 'admin/links',
    //         success: function (res) {
    //             // console.log(res);
    //             let html = template('tpl-links', res);
    //             $('tbody').html(html);
    //         }
    //     })
    // }
    // getlinks();

    // // -----------------------添加链接--------------------
    // // 弹出层
    // let addindex;
    // $('.addlink').on('click', function () {
    //     let html = $('#tpl-add').html();
    //     addindex = layer.open({
    //         title: '添加友情链接',
    //         type: 1,
    //         content: html,
    //         area: ['500px', '350px']
    //     });
    // })

    // // 点击上传图片
    // $('body').on('click', '.addimage', function () {
    //     $('.addpic').click();
    // })
    // // 图片预览
    // $('body').on('change', '.addpic', function () {
    //     // console.log(this.files[0]);

    //     let url = URL.createObjectURL(this.files[0]);
    //     $('.prev').attr('src', url);
    // })

    // // 提交添加数据
    // $('body').on('submit', '.addform', function (e) {
    //     e.preventDefault();
    //     let data = new FormData(this);
    //     $.ajax({
    //         type: 'POST',
    //         url: 'admin/links',
    //         data: data,
    //         contentType: false,
    //         processData: false,
    //         success: function (res) {
    //             console.log(res);
    //             if (res.status === 0) {
    //                 layer.close(addindex);
    //                 getlinks();
    //             }
    //         }
    //     })
    // })

    $.ajax({
        url: 'api/login',
        type: 'POST',
        data: {
            username: 'admin',
            password: 'admin'
        },
        success: function (res) {
            console.log(res);
        }
    })
})
