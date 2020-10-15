$(function () {
    // 获取链接列表
    function getlinks() {
        $.ajax({
            url: 'admin/links',
            success: function (res) {
                // console.log(res);
                let html = template('tpl-links', res);
                $('tbody').html(html);
            }
        })
    }
    getlinks();

    // -----------------------添加链接--------------------
    // 弹出层
    let addindex;
    $('.addlink').on('click', function () {
        let html = $('#tpl-add').html();
        addindex = layer.open({
            title: '添加友情链接',
            type: 1,
            content: html,
            area: ['500px', '350px']
        });
    })

    // 点击上传图片
    $('body').on('click', '.addimage', function () {
        $('.addpic').click();
    })
    // 图片预览
    $('body').on('change', '.addpic', function () {
        // console.log(this.files[0]);

        let url = URL.createObjectURL(this.files[0]);
        $('.prev').attr('src', url);
    })

    // 提交添加数据
    $('body').on('submit', '.addform', function (e) {
        e.preventDefault();
        let data = new FormData(this);
        $.ajax({
            type: 'POST',
            url: 'admin/links',
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    layer.close(addindex);
                    getlinks();
                }
            }
        })
    })

    // ------------------编辑链接-----------------
    let editindex;
    let id;
    // 点击编辑按钮弹出链接信息
    $('body').on('click', '.btn-edit', function () {
        id = $(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'admin/links/' + id,
            success: function (res) {
                // console.log(res);
                // 完成数据回填
                let html = template('tpl-edit', res.data);
                // 弹出编辑链接信息框
                editindex = layer.open({
                    title: '编辑友情链接',
                    type: 1,
                    content: html,
                    area: ['500px', '350px']
                });
            }
        })
    })
    // 提交编辑后的数据
    $('body').on('submit', '.editform', function (e) {
        e.preventDefault();
        let data = new FormData(this);
        $.ajax({
            type: 'PUT',
            url: 'admin/links/' + id,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    layer.close(editindex);
                    getlinks();
                }
            }
        })
    });

    // ------------删除-------------
    $('body').on('click', '.btn-del', function () {
        let delid = $(this).data('id');
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function (index) {

            $.ajax({
                type: 'DELETE',
                url: 'admin/links/' + delid,
                success: function (res) {
                    // console.log(res);
                    layer.msg(res.message);
                    if (res.status === 0) {

                        getlinks();
                    }
                }
            })

            layer.close(index);
        });
    })
})
