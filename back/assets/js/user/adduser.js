$(function () {
    var form = layui.form
    form.verify({
        xx: function (val) {
            var mm = $('#mm').val()
            if (val !== mm) return '密码不一致'
        },
        youxiang:  [
            /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            '邮箱格式错误'
        ],
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] 
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var data = form.val('add')
        // console.log(data);
        
        
        $.ajax({
            type: 'post',
            url: 'admin/users',
            data: data,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message)
                if (res.status === 0) {
                    location.href = './user-list.html'
                }
            }
        })
    })
})