$(function () {
    // 获取数据，模板引擎渲染页面
    // 封装一个获取数据、渲染页面的函数
    function render() {
        // 发送ajax请求
        $.ajax({
            url: 'admin/comments',
            type: 'GET',
            success: function (res) {
                let html = template('comment-tpl', res);
                $('tbody').html(html);
            }
        })
    }
    // 调用一次
    render();

    // 注册模板过滤器 -- 处理日期格式
    template.defaults.imports.dateFormat = function (str) {
        let date = new Date(str);
        // 获取年月日
        let y = date.getFullYear();
        let m = addZero(date.getMonth() + 1);
        let d = addZero(date.getDate());
        return y + '-' + m + '-' + d;
    }

    // 补零函数
    function addZero(n) {
        return n < 10 ? '0' + n : n
    }

    // 删除评论功能
    $('tbody').on('click', 'button:contains("删除")', function () {
        // 获取id
        let id = $(this).data('id');
        // console.log(id);
        // 使用layer.confirm 询问框
        layer.confirm('Are you sure？', { icon: 3, title: '温馨提示', btn: ['狠心删除', '容我三思'] }, function (index) {
            // 发送ajax请求
            $.ajax({
                url: 'admin/comments/' + id,
                type: 'DELETE',
                success: function (res) {
                    // 无论成功与否，给出提示
                    layer.msg(res.message);
                    if (res.status === 0) {
                        // 渲染一次页面
                        render();
                    }
                }
            })
            // 关闭弹层
            layer.close(index);
        }, function (index) {
            layer.close(index);
        })
    })
})